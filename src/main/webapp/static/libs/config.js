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
        'Util'                  : '../libs/module/Util',

        /**插件**/
        //cookie
        'cookie'				: '../libs/cookie/jquery.cookie',
        'bootstrap'				: '../libs/bootstrap/bootstrap',
        'message'				: '../libs/message/js/messenger.min'

        
    },
    shim: {
    	jquery: {
            exports: '$'
        },
        bootstrap:{
        	deps:[
        	     'jquery',
        	     'css!../libs/bootstrap/bootstrap.min.css',
        	     'css!../libs/bootstrap/bootstrap-theme.min.css'
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





