define([
        'BasePage',
        'Util',
        'text!../../template/login/findPassword/headerTpl.html',
        'text!../../template/login/findPassword/contentTpl.html',
        'text!../../template/login/findPassword/footerTpl.html'
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
                })
                that.pageContent({
                    parent:$('#footer'),
                    template:footerTpl
                })
            },
            _bindEvent:function(){
                var that = this;
                $('#register').click(function(){
                    require(['login/Register'],function(Page){
                        new Page({}).initPage();
                    });
                });
                $('#findPassword').click(function(){
                    var username = $('#username').val();
                    that.post({
                        url:'user/forgetPassword',
                        data:{
                            loginId:username
                        },
                        success:function(){
                            that.alert('已将新密码发送至您的邮箱');
                            setTimeout(function(){
                                require(['login/Login'],function(Page){
                                    new Page({}).initPage();
                                });
                            },1000)
                        }
                    })
                })
            }
        });
    });
