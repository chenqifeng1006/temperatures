define([
        'BasePage',
        'Util',
        'text!../../template/demo/editTpl.html'
    ],
    function (BasePage,Util,editTpl) {
        return BasePage.extend({
            init:function(options){
                var that = this;
                that.parent = options.parent;
                that.id = options.item.id;
                BasePage.fn.init.call(that, options);
            },
            initPage:function(){
                var that = this;
                that._loadMainPage();
                that._bindEvent();
            },
            _loadMainPage:function(){
                var that = this;
                that.ajax({
                    url:'./setting/test1.json',
                    data:{
                        id:that.id
                    },
                    success:function(data){
                        that.pageContent({
                            parent:that.parent,
                            data:data,
                            template:editTpl
                        });
                    }
                });

            },
            _bindEvent:function(){

            }
        });
    });
