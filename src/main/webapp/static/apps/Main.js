define([
    'BasePage',
    'Util',
    'json!../setting/leftMenus.json',
    'text!../template/main/headerTpl.html',
    'text!../template/main/contentTpl.html'
],
function (BasePage,Util,leftMenus,headerTpl,contentTpl) {
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
                data:leftMenus,
                template:contentTpl
            });


            $("#firstpane p.menu_head").click(function()
            {
                $(this).css({backgroundImage:"url(down.png)"}).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
                $(this).siblings().css({backgroundImage:"url(left.png)"});
            });
        }
    });
});
