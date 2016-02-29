define([
    'BasePage',
    'Util',
    'text!../../template/login/personal/infoTpl.html'
],
function (BasePage,Util, infoTpl) {
    return BasePage.extend({
        init:function(options){
            var that = this;
            that.loginId = that.getCookie('loginId');
            that.parent = options.parent;
            BasePage.fn.init.call(that, options);
        },
        initPage:function(){
            var that = this;
            that._loadMainPage();
        },
        _loadMainPage:function(){
            var that = this;
            that.ajax({
                url:'user/getById',
                data:{
                    loginId:that.loginId
                },
                success:function(data){
                    that.pageContent({
                        parent:that.parent,
                        data:data,
                        template:infoTpl,
                        callback:function(){
                            that._bindEvent();
                        }
                    })
                }
            });
        },
        _bindEvent:function(){
            var that = this;
            $('#submit').click(function(){
                var loginId = $('#loginId').val(),
                    userName = $('#userName').val(),
                    address = $('#address').val(),
                    password1 = $('#password1').val(),
                    password2 = $('#password2').val();
                if(!loginId || !userName || !address || !password1 || !password2){
                    that.alert('信息不可为空')
                }else if(password1 !== password2){
                    that.alert('两次密码不一致')
                }else{
                    that.post({
                        url:'user/update',
                        data:{
                            loginId:loginId,
                            userName :userName,
                            address:address,
                            password:password1
                        },
                        success:function(){
                            that.setCookie('loginId',loginId);
                            require(['Main'],function(Page){
                                new Page({}).initPage();
                            });
                        }
                    })
                }

            });

        }
    });
});
