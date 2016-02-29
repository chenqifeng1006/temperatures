define([
    "jquery"
], function($,Util) {

    $.tgAjax = function(options){
        var that = this,
            success = options.success,
            isList = options.isList;
        options.success = function(responseData){
            if(!responseData.success){
                var message = responseData.message || '网络好像不给力呦！';
                options.error && options.error(message)
            }else{
                if(isList){
                    success(responseData.data.list,responseData.data.count);
                }else{
                    success(responseData.data);
                }

            }

        };
        $.ajax(options)
    };

    $.tgPost = function(param) {
        $.tgAjax($.extend({type: "POST"}, param));
    };
});
