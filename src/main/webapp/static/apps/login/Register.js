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
        }
    });
});
