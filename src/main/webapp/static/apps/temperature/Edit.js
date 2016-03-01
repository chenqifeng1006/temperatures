define([
    'BasePage',
    'Util',
    'text!../../template/temperature/editTpl.html'
],
function (BasePage,Util,editTpl) {
    return BasePage.extend({
        init:function(options){
            var that = this;
            that.parent = options.parent;
            that.item = options.item;
            that.item.createtime = Util.formatDate(new Date(that.item.createtime),'YYYY-MM-DD 00:00')
            that.id = options.item.id;
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
                data:that.item,
                template:editTpl,
                callback:function(){
                    that._bindEvent();
                }
            });
        },
        _bindEvent:function(){
            var that = this;
            $('#submit').click(function(){
                var temperture = $('#temperture').val(),
                    unit = $('#unit').val();
                if(!temperture || !unit){
                    that.alert('信息有误，请重新输入')
                }else{
                    that.item.temperture = temperture;
                    that.item.unit = unit;
                    that.post({
                        url:'temperature/update',
                        data:that.item,
                        success:function(){
                            require(['temperature/List'],function(Page){
                                new Page({parent:$('#rightContent')}).initPage();
                            })
                        }
                    })
                }
            })
        }
    });
});
