define([
    'BasePage',
    'Util',
    'List',
    'text!../../template/humidity/listTpl.html'
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
                        name:'创建时间',
                        index:'createtime'
                    },
                    {
                        name:'湿度',
                        index:'humidity'
                    },
                    {
                        name:'单位',
                        index:'unit'
                    },
                    {
                        name:'操作',
                        template:'<a class="edit button">编辑</a><a class="delete button">删除</a>'
                    }
                ],
                url:'humidity/queryPage',
                data:{
                    startNum:0,
                    pageCount:10
                },
                bindEvent:function(){
                    $('.edit',that.parent).click(function(e){
                        var item = that.list.getItemByEventTag(e);
                        require(['humidity/Edit'],function(Page){
                            new Page({
                                parent:that.parent,
                                item:item
                            }).initPage()
                        })
                    });
                    $('.delete',that.parent).click(function(e){
                        var item = that.list.getItemByEventTag(e);
                        if(confirm('确认删除么？')){
                            that.post({
                                url:'humidity/delete',
                                data:{
                                    id:item.id
                                },
                                success:function(){
                                    that.alert('删除成功');
                                    that.list.reload();
                                }
                            });
                        }
                    })
                }
            })
        }
    });
});
