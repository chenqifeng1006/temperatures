define([
    'BasePage',
    'Util',
    'text!../../template/login/register/headerTpl.html',
    'text!../../template/login/register/contentTpl.html',
    'text!../../template/login/register/footerTpl.html'
],
function (BasePage,Util, headerTpl,contentTpl,footerTpl) {
    return BasePage.extend({
        init:function(options){
            var that = this;
            BasePage.fn.init.call(that, options);
        },
        initPage:function(){
            var that = this;
            that._loadMainPage();
            that._bindEvent();
        },
        _loadMainPage:function(){
            var that = this;
            that.pageContent({
                parent:$('#header'),
                template:headerTpl
            });
            that.pageContent({
                parent:$('#content'),
                template:contentTpl
            });
            that.pageContent({
                parent:$('#footer'),
                template:footerTpl
            })
        },
        _bindEvent:function(){
            var that = this;
            $('#login').click(function(){
                require(['login/Login'],function(Page){
                    new Page({}).initPage();
                });
            });
            $('#register').click(function(){
                var username = $('#username').val(),
                    password1 = $('#password1').val(),
                    password2 = $('#password2').val();
                if(password1 !== password2){
                    that.alert('两次密码不一致')
                }else if(!username || !password1){
                    that.alert('请输入用户名和密码')
                }else{
                    that.post({
                        url:'user/regist',
                        data:{
                            loginId:username,
                            password:password1
                        },
                        success:function(){
                        	require(['login/Login'],function(Page){
                                new Page({}).initPage();
                            });
                        }
                    })
                }
            })
        }
    });
});
