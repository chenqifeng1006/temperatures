define([
        'BasePage',
        'Util',
        'text!../../template/demo/chartTpl.html',
        'echarts',
        'datetimepicker'
    ],
    function (BasePage,Util,chartTpl,echarts) {
        return BasePage.extend({
            init:function(options){
                var that = this;
                that.parent = options.parent;
                BasePage.fn.init.call(that, options);
            },
            initPage:function(){
                var that = this;
                that._loadMainPage();
                that._loadDatePage();
                that._loadChart();
                that._bindEvent();
            },
            _loadMainPage:function(){
                var that = this;
                that.pageContent({
                    parent:that.parent,
                    template:chartTpl
                });
            },
            _loadDatePage:function(){
                $('#datetimepicker').datetimepicker();
            },
            _loadChart:function(){
                var myChart = echarts.init(document.getElementById('chart'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            _bindEvent:function(){

            }
        });
    });
