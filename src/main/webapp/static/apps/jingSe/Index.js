define([
    'BasePage',
    'Util',
    'List',
    'text!../../template/jingSe/indexTpl.html',
    'bxslider'
],
function (BasePage,Util,List,indexTpl) {
    return BasePage.extend({
        init:function(options){
            var that = this;
            that.parent = options.parent;
            BasePage.fn.init.call(that, options);
        },
        initPage:function(){
            var that = this;
            that._loadMainPage();
            
        },
        _loadMainPage:function(){
            var that = this;
            that.pageContent({
                parent:that.parent,
                template:indexTpl,
                callback:function(){
                	$('.bxslider').bxSlider({
//                		mode: 'fade',
                  		captions: true
                	});
                }
            })
        }
    });
});
