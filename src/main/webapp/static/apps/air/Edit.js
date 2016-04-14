define([
    'BasePage',
    'Util',
    'text!../../template/air/editTpl.html'
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
                var humidity = $('#air').val(),
                    unit = $('#unit').val();
                if(!humidity || !unit){
                    that.alert('信息有误，请重新输入')
                }else{
                    that.item.humidity = humidity;
                    that.item.unit = unit;
                    that.post({
                        url:'air/update',
                        data:that.item,
                        success:function(){
                            require(['air/List'],function(Page){
                                new Page({parent:$('#rightContent')}).initPage();
                            })
                        }
                    })
                }
            })
        }
    });
});
