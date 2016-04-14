define([ 'BasePage', 'Util', 'text!../../template/notice/newTpl1.html',
		'text!../../template/notice/newTpl2.html',
		'text!../../template/notice/newTpl3.html',
		'text!../../template/notice/newTpl4.html',
		'text!../../template/notice/newTpl5.html',
		'text!../../template/notice/newTpl6.html',
		'text!../../template/notice/messageTpl.html' ],
		function(BasePage, Util, newTpl1, newTpl2, newTpl3, newTpl4, newTpl5,
				newTpl6, messageTpl) {
			return BasePage.extend({
				init : function(options) {
					var that = this;
					that.id = options.id;
					that.parent = options.parent;
					BasePage.fn.init.call(that, options);
				},
				initPage : function() {
					var that = this;
					that._loadMainPage();
					that._loadMessagePage();
				},
				_loadMainPage : function() {
					var that = this, tpl;
					if (that.id == 1) {
						tpl = newTpl1
					} else if (that.id == 2) {
						tpl = newTpl2
					} else if (that.id == 3) {
						tpl = newTpl3
					} else if (that.id == 4) {
						tpl = newTpl4
					} else if (that.id == 5) {
						tpl = newTpl5
					} else if (that.id == 6) {
						tpl = newTpl6
					}
					that.pageContent({
						parent : that.parent,
						template : tpl,
						callback : function() {

						}
					})
				},
				_loadMessagePage : function() {
					var that = this;
					that.ajax({
						url : 'message/queryPage',
						data : {
							noticeId : that.id
						},
						success : function(data) {
							that.pageContent({
								parent : $('#messageList'),
								data : data,
								otherData : {
									util : Util
								},
								template : messageTpl,
								callback : function() {
									that._bindEvent();
								}
							})
						}
					})

				},
				_bindEvent : function() {
					var that = this;
					$('#submit').click(
							function() {
								var content = $('#contentText').text()
										|| $('#contentText').val();
								if (!content) {
									that.alert('评论不可为空')
									return false;
								}
								that.post({
									url : 'message/add',
									data : {
										userId : that.getCookie('userId'),
										noticeId : that.id,
										content : content
									},
									success:function(){
										that._loadMessagePage();
									}
								})
							})

				}
			});
		});
