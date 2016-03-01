define([
    'BasePage',
    'Util',
    'Menus',
    'text!../template/main/headerTpl.html',
    'text!../template/main/contentTpl.html'
],
function (BasePage,Util,Menus,headerTpl,contentTpl) {
    return BasePage.extend({
        init:function(options){
            var that = this;
            BasePage.fn.init.call(that, options);
        },
        initPage:function(){
            var that = this;
            that._loadMainPage();
            that._loadEveryTime();
            that._bindEvent();
        },
        _loadMainPage:function(){
            var that = this;
            that.pageContent({
                parent:$('#header'),
                template:headerTpl
            });
            that.pageContent({
                parent:$('#content'),
                template:contentTpl,
                callback:function(){
                    Menus.init({
                        parent:$('#leftContent')
                    });
                }
            });
        },
        _bindEvent:function(){
        	var that = this;
        	$('#personalInfo').click(function(){
        		require(['login/PersonalInfo'],function(Page){
        			new Page({
        				parent:$('#rightContent')
        			}).initPage();
        			Menus.init({
                        parent:$('#leftContent')
                    });
        		})
        	})
        	$('#logout').click(function(){
        		that.removeCookie('loginId');
        		location.reload()
        	})
        },
        _loadEveryTime:function(){
            var that = this;
            Util.everyTime({
                key:'warning',
                time:3000,
                fn:function(){
                    that.ajax({
                        url:'warning/everyTime',
                        success:function(data){
                            var $myModal = $('#myModal'),
                                list = data.list || [],
                                obj1 = Util.getItemByAttrAndValue(list,'type','1')||{},
                                obj2 = Util.getItemByAttrAndValue(list,'type','2')||{},
                                warning1 = Number(obj1.warning) || 0,
                                warning2 = Number(obj2.warning) || 0,
                                serious1 = Number(obj1.serious) || 0,
                                serious2 = Number(obj2.serious) || 0,
                                current1 = data.current1 || 0, //当前温度
                                current2 = data.current2 || 0,//当前湿度
                                noModal = !$myModal.length || $myModal.is(':hidden')
                            //温度严重报警
                            if(serious1 && current1 > serious1 && noModal && that.getCookie('serious1') !== 'true'){
                                that.setCookie('serious1',true);
                                that.window({
                                    title:'温度警报',
                                    content:'<span style="color: red;">当前温度：' + current1 + ',严重警报值：' + serious1 + ',已超出，请检查。</span>',
                                    okFn:function(){

                                    }
                                })
                            }
                            //温度警告
                            else if(warning1 && current1 > warning1 && noModal && that.getCookie('warning1') !== 'true'){
                                that.setCookie('warning1',true);
                                that.window({
                                    title:'温度警报',
                                    content:'当前温度：' + current1 + ',警报值：' + warning1 + ',已超出，请检查。',
                                    okFn:function(){

                                    }
                                })
                            }
                            //湿度严重报警
                            else if(serious2 && current2 > serious2 && noModal && that.getCookie('serious2') !== 'true'){
                                that.setCookie('serious2',true);
                                that.window({
                                    title:'湿度警报',
                                    content:'<span style="color: red;">当前湿度：' + current2 + ',严重警报值：' + serious2 + ',已超出，请检查。</span>',
                                    okFn:function(){

                                    }
                                })
                            }
                            //湿度警告
                            else if(warning2 && current2 > warning2 && noModal && that.getCookie('warning2') !== 'true'){
                                that.setCookie('warning2',true);
                                that.window({
                                    title:'湿度警报',
                                    content:'当前湿度：' + current2 + ',警报值：' + warning2 + ',已超出，请检查。',
                                    okFn:function(){

                                    }
                                })
                            }

                        }
                    });
                }
            })
        }
    });
});
