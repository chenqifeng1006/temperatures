define([
    'BasePage',
    'Util',
    'text!../../template/remindValue/addTpl.html'
],
function (BasePage,Util,editTpl) {
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
                	serious = $('#serious').val(),
                	data = {};
                if(!type || !warning || !serious){
                    that.alert('信息有误，请重新输入')
                }else{
                	data.type = type;
                	data.warning = warning;
                	data.serious = serious;
                    that.post({
                        url:'remindValue/save',
                        data:data,
                        success:function(){
                            require(['remindValue/List'],function(Page){
                                new Page({parent:that.parent}).initPage();
                            })
                        }
                    })
                }
            })
        }
    });
});
