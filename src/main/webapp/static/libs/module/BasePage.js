/**
 * 封装页面的共同操作
 */
define([
    'BaseClass'
],
function (BaseClass) {

	"use strict";

    return BaseClass.extend({
    	init:function(options){
			var that = this;
			that.parent = options.parent || $('body');
			BaseClass.fn.init.call(this, options);
			that.bindPageEvent();
    	},
		bindPageEvent:function(){
			var that = this,
				options = this.getPageEvents() || {},
				i,
				fn;
			for(i in options){
				fn = options[i];
				that.parent.off('click',i);
				that.parent.on('click',i,(function(fn){
					return function(e){
						e.stopPropagation();
						fn(e,$(this));
					}
				})(fn,i))
			}
		},
		getPageEvents:function(){
			return {

			}
		}
    });
});

