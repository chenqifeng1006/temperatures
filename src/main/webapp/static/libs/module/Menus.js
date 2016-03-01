/**
 * Created with JetBrains WebStorm.
 * User: chenqf
 * Date: 14-09-24
 * Time: ����9:43
 * To change this template use File | Settings | File Templates.
 */

define([
        'Template',
        'json!../setting/leftMenus.json',
        'text!../template/common/menusTpl.html'
    ],
    function (Template,leftMenus,menusTpl) {
        var template = Template.getTemplate(menusTpl,leftMenus)

        return {
            bindEvent:function(){
                $('.menu_head').click(function(){
//                    $(this).toggleClass('current').next('.menu_body').eq(0).slideToggle(300);
//                    if($(this).hasClass('current')){
//                        $(this).find('.right_icon').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-down');
//                    }else{
//                        $(this).find('.right_icon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-left');
//                    }
                	$('.menu_head').removeClass('current');
                    $(this).toggleClass('current');
                    var jsPath = $(this).data('js');	
                    require([jsPath],function(Page){
                        new Page({parent:$('#rightContent')}).initPage();
                    })
                	
                });
                $('.sub_menus').click(function(){
                    $('.sub_menus').removeClass('current');
                    $(this).addClass('current');
                    var jsPath = $(this).data('js');
                    if(jsPath){
                        require([jsPath],function(Page){
                            new Page({parent:$('#rightContent')}).initPage();
                        })
                    }
                });
            },
            init:function(options){
                var parent = options.parent;
                parent.html(template);
                this.bindEvent();
            }
        }

    });
