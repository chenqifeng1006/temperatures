define([
    'BasePage',
    'Util',
    'text!../../template/remindValue/editTpl.html'
],
function (BasePage,Util,editTpl) {
    return BasePage.extend({
        init:function(options){
            var that = this;
            that.parent = options.parent;
            that.item = options.item;
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
                var type = $('#type').val(),
                	warning = $('#warning').val(),
                	serious = $('#serious').val();
                if(!type || !warning || !serious){
                    that.alert('信息有误，请重新输入')
                }else{
                    that.item.type = type;
                    that.item.warning = warning;
                    that.item.serious = serious;
                    that.post({
                        url:'remindValue/update',
                        data:that.item,
                        success:function(){
                            require(['remindValue/List'],function(Page){
                                new Page({parent:$('#rightContent')}).initPage();
                            })
                        }
                    })
                }
            })
        }
    });
});
