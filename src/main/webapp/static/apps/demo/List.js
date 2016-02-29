define([
        'BasePage',
        'Util',
        'List',
        'text!../../template/demo/listTpl.html'
    ],
    function (BasePage,Util,List,listTpl) {
        return BasePage.extend({
            init:function(options){
                var that = this;
                that.parent = options.parent;
                BasePage.fn.init.call(that, options);
            },
            initPage:function(){
                var that = this;
                that._loadMainPage();
                that._loadListPage();
            },
            _loadMainPage:function(){
                var that = this;
                that.pageContent({
                    parent:that.parent,
                    template:listTpl
                });
            },
            _loadListPage:function(){
                var that = this;
                that.list = new List().init({
                    parent:$('#demoList',that.parent),
                    colModel:[
                        {
                            name:'价格',
                            index:'price'
                        },
                        {
                            name:'来源',
                            index:'source'
                        },
                        {
                            name:'店铺名',
                            fn:function(data){
                                return data.storeName;
                            }
                        },
                        {
                            name:'操作',
                            template:'<a class="edit button">编辑</a><a class="delete button">删除</a>'
                        }
                    ],
                    url:'./setting/test.json',
                    data:{
                        startNum:0,
                        pageCount:10
                    },
                    bindEvent:function(){
                        $('.edit',that.parent).click(function(e){
                            var item = that.list.getItemByEventTag(e);
                            require(['demo/Edit'],function(Page){
                                new Page({
                                    parent:that.parent,
                                    item:item
                                }).initPage()
                            })
                        });
                        $('.delete',that.parent).click(function(e){
                            var item = that.list.getItemByEventTag(e);
                            console.log(item);
                        })
                    }
                })
            }
        });
    });
