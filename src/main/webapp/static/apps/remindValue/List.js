define([
    'BasePage',
    'Util',
    'List',
    'text!../../template/remindValue/listTpl.html'
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
            that._bindEvent();
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
                        name:'类型',
                        fn:function(data){
                        	if(data.type == 1){
                        		return '温度'
                        	}else if(data.type == 2){
                        		return '湿度'
                        	}
                        }
                    },
                    {
                        name:'警告值',
                        index:'warning'
                    },
                    {
                        name:'严重值',
                        index:'serious'
                    },
                    {
                        name:'操作',
                        template:'<a class="edit button">编辑</a><a class="delete button">删除</a>'
                    }
                ],
                url:'remindValue/queryPage',
                data:{
                    startNum:0,
                    pageCount:10
                },
                bindEvent:function(){
                    $('.edit',that.parent).click(function(e){
                        var item = that.list.getItemByEventTag(e);
                        require(['remindValue/Edit'],function(Page){
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
                                url:'remindValue/delete',
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
        },
        _bindEvent:function(){
        	var that = this;
        	$('#add').click(function(){
        		require(['remindValue/Add'],function(Page){
        			new Page({
        				parent:that.parent
        			}).initPage();
        		})
        	})
        }
    });
});
