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
    //return {
    //    initPage: function () {
    //        this._initPage();
    //        this._bindEvent();
    //    },
    //    _initPage: function () {
    //        Util.pageContent({
    //            parent: $('body'),
    //            template: mainTpl
    //        })
    //    },
    //    _bindEvent: function () {
    //        Util.bindEvent({
    //            "#logout": $.proxy(this.logout, this),
    //            "#userEvent": $.proxy(this.userHandler, this),
    //            "#diningEvent": $.proxy(this.diningHandler, this)
    //        })
    //    },
    //    logout: function () {
    //        location.reload()
    //    },
    //    userHandler: function () {
    //
    //        require(['user/List'], function (Page) {
    //            Page.initPage();
    //        })
    //
    //    },
    //    diningHandler: function () {
    //        require(['dining/List'], function (Page) {
    //            Page.initPage();
    //        })
    //    }
    //}
});
