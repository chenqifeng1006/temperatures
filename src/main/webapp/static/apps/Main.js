define([
    'BasePage',
    'Util',
    'Menus',
    'text!../template/main/headerTpl.html',
    'text!../template/main/contentTpl.html'
],
function (BasePage,Util,Menus,headerTpl,contentTpl) {
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
                template:contentTpl,
                callback:function(){
                    Menus.init({
                        parent:$('#leftContent')
                    });
                }
            });
        }
    });
});
