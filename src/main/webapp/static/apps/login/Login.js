define([
    'BasePage',
    'Util',
    'text!../../template/login/login/headerTpl.html',
    'text!../../template/login/login/contentTpl.html',
    'text!../../template/login/login/footerTpl.html'
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
        	$('#login').click(function(){
        		var username = $('#username').val(),
        			password = $('#password').val();
        		that.post({
        			url:'user/login',
        			data:{
        				loginId:username,
        				password:password
        			},
        			success:function(data){
                        that.setCookie('loginId',username);
	        			require(['Main'],function(Page){
	        			    new Page({}).initPage();
	        			});
        			}
        		})
        	});
        	$('#findPassword').click(function(){
				require(['login/FindPassword'],function(Page){
				    new Page({}).initPage();
				});
        	})
        	$('#register').click(function(){
        		require(['login/Register'],function(Page){
	        	    new Page({}).initPage();
	        	});
        	})
        }
    });
});
