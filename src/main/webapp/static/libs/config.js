require.config({
    baseUrl: 'apps/',
    waitSeconds: 60,
    urlArgs:'t' +  new Date().getTime(),
    paths : {
        'jquery' 				: '../libs/jquery/jquery',
        'async' 				: '../libs/require-async/async',
        'text' 					: '../libs/requirejs-text/text',
        'css' 					: '../libs/require-css/css',
        'json' 					: '../libs/require-json/json',
        'css-builder'			: '../libs/require-css/css-builder',

        'Ajax'                  : '../libs/module/Ajax',
        'Class'                 : '../libs/module/Class',
        'BaseClass'             : '../libs/module/BaseClass',
        'BasePage'              : '../libs/module/BasePage',
        'Template'              : '../libs/module/Template',
        'Menus'                 : '../libs/module/Menus',
        'List'                  : '../libs/module/List',
        'Util'                  : '../libs/module/Util',

        /**插件**/
        //cookie
        'cookie'				: '../libs/cookie/jquery.cookie',
        'bootstrap'				: '../libs/bootstrap/js/bootstrap.min',
        'echarts'               : '../libs/echarts/echarts.min',
        'datetimepicker'        : '../libs/datetimepicker/js/bootstrap-datetimepicker.min',
        'datePicker'            : '../libs/My97DatePicker/WdatePicker',
        'message'				: '../libs/message/js/messenger.min'

        
    },
    shim: {
    	jquery: {
            exports: '$'
        },
        bootstrap:{
        	deps:[
        	     'jquery',
        	     'css!../libs/bootstrap/css/bootstrap.min.css',
        	     'css!../libs/bootstrap/css/bootstrap-theme.min.css'
        	]
        },
        datetimepicker:{
        	deps:[
        	     'jquery',
                'bootstrap',
        	     'css!../libs/datetimepicker/css/bootstrap-datetimepicker.min.css'
        	]
        },
        datePicker:{
        	deps:[
        	    'jquery'
        	]
        },
        message:{
        	deps: [
   				'jquery',
   				'bootstrap',
   				'css!../libs/message/css/messenger.css'
   			]
        },
        cookie : {
        	deps: [
				'jquery'
			]
		}
	},
	
	map: {
	  	  '*': {
	  	    'css' : 'libs/require-css/css.js'		
	  	  }
	}
});
require(['Index'],function(Page){

});





