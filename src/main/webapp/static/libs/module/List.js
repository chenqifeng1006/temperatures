/**
 * Created with JetBrains WebStorm.
 * User: chenqf
 * Date: 14-09-24
 * Time: ����9:43
 * To change this template use File | Settings | File Templates.
 */

define([
        'Template',
        'Util',
        'text!../template/common/listTpl.html',
        'text!../template/common/listFooterTpl.html',
        'Ajax'
    ],
    function (Template,Util,listTpl,listFooterTpl) {
        var List = function(){};

        List.prototype.init = function(options){
            this.parent = options.parent;
            this.url =  options.url;
            this.data = options.data || {};
            this.ajaxType = options.ajaxType || 'GET';
            this._initStartNum = this.data.startNum || 0;
            this._initPageCount = this.data.pageCount || 0;
            this.startNum = this.data.startNum || 0;
            this.pageCount = this.data.pageCount || 10;
            this.bindEvent = options.bindEvent || function(){};
            this.callback = options.callback || function(){};
            this.colModel = options.colModel || [];
            this.currentData = [];
            this.load();
            return this;
        };
        List.prototype.dealNavPage = function(total){
            this.total = total || 0;
            this.currentPageNum = this.startNum/this.pageCount + 1;
            this.totalPageNum = total%this.pageCount ? Number(String(total/this.pageCount).replace(/^(\d+)\..*/,'$1')) + 1 : total/this.pageCount;
        };
        List.prototype.load = function(){
            var that = this,
                data = $.extend({},that.data,{
                    startNum:that.startNum,
                    pageCount:that.pageCount
                })

            $.tgAjax({
                type:that.ajaxType,
                isList:true,
                url:that.url,
                data:data,
                success:function(data,total){
                    that.currentData = data;
                    that.dealNavPage(total);
                    that.renderPage(data);
                    that.renderFooter();
                    that._bindEvent();
                    that.bindEvent();
                    that.callback();
                }
            })
        };
        List.prototype.renderPage = function(data){
            var that = this,
                template = Template.getTemplate(listTpl,data,{
                colModel:that.colModel
            });
            this.parent.html(template);
        };
        List.prototype.renderFooter = function(){
            var that = this,
                template = Template.getTemplate(listFooterTpl,{
                total:that.total ,
                startNum:that.startNum,
                pageCount:that.pageCount,
                totalPageNum:that.totalPageNum,
                currentPageNum:that.currentPageNum
            });
            $('#nav',this.parent).html(template);
        };
        List.prototype._bindEvent = function(){
            var that = this;
            $('#prePage',that.parent).click(function(){
                if(that.currentPageNum !== 1){
                    that.startNum = that.startNum - that.pageCount;
                    that.load();
                }
            });
            $('#nextPage',that.parent).click(function(){
                if(that.currentPageNum !== that.totalPageNum){
                    that.startNum = that.startNum + that.pageCount;
                    that.load();
                }
            });
        };
        List.prototype.refresh = function(data){
            this.startNum = this._initStartNum;
            this.pageCount = this._initPageCount;
            this.load();
        };
        List.prototype.reload = function(data){
            this.data = data || this.data || {};
            this._initStartNum = this.data.startNum || this._initStartNum;
            this._initPageCount = this.data.pageCount ||this._initPageCount;
            this.startNum = this.data.startNum || this.startNum;
            this.pageCount = this.data.pageCount || this.pageCount;
            this.load();
        };
        List.prototype.getItemById = function(id){
            return Util.getItemById(this.currentData,id);
        };
        List.prototype.getItemByDom = function(dom){
            var $tr = $(dom).closest('listItem'),
                id = $tr.data('id');
            return this.getItemById(id);
        };
        List.prototype.getItemByEventTag = function(e){
            var $tr = $(e.target).closest('.listItem'),
                id = $tr.data('id');
            return this.getItemById(id);
        };

        return List;

    });
