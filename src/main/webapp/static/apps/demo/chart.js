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
                    data:{
                    	startTime:Util.formatDate(new Date(),'YYYY-MM-DD 00:00'),
                    	endTime:Util.formatDate(new Date(new Date().getTime()+24*60*60*1000),'YYYY-MM-DD 00:00'),
                    },
                    template:chartTpl,
                    callback:function(){
                    	$('#startTime').datetimepicker({
                            format: 'yyyy-mm-dd hh:ii',
                            autoclose:true,
                            initialDate:new Date('2015-05-05')
                        });
                        $('#endTime').datetimepicker({
                            format: 'yyyy-mm-dd hh:ii',
                            autoclose:true
                        });
                    }
                });
                
            },
            _loadDatePage:function(){

            },
            _loadChart:function(){
                var that = this,
                	myChart = echarts.init(document.getElementById('chart'));
                that.ajax({
                	url:'setting/chart.json',
                	success:function(data){
                		var base = -data.reduce(function (min, val) {
                	        return Math.floor(Math.min(min, val.l));
                	    }, Infinity);
                	    myChart.setOption(option = {
                	        title: {
                	            text: 'Confidence Band',
                	            subtext: 'Example in MetricsGraphics.js',
                	            left: 'center'
                	        },
                	        tooltip: {
                	            trigger: 'axis',
                	            axisPointer: {
                	                animation: false
                	            },
                	            formatter: function (params) {
                	                return params[2].name + '<br />' + params[2].value;
                	            }
                	        },
                	        grid: {
                	            left: '3%',
                	            right: '4%',
                	            bottom: '3%',
                	            containLabel: true
                	        },
                	        xAxis: {
                	            type: 'category',
                	            data: data.map(function (item) {
                	                return item.date;
                	            }),
                	            axisLabel: {
                	                formatter: function (value, idx) {
                	                    var date = new Date(value);
                	                    return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
                	                }
                	            },
                	            splitLine: {
                	                show: false
                	            },
                	            boundaryGap: false
                	        },
                	        yAxis: {
                	            axisLabel: {
                	                formatter: function (val) {
                	                    return (val - base) * 100 + '%';
                	                }
                	            },
                	            splitNumber: 3,
                	            splitLine: {
                	                show: false
                	            }
                	        },
                	        series: [{
                	            name: 'L',
                	            type: 'line',
                	            data: data.map(function (item) {
                	                return item.l + base;
                	            }),
                	            lineStyle: {
                	                normal: {
                	                    opacity: 0
                	                }
                	            },
                	            stack: 'confidence-band',
                	            symbol: 'none'
                	        }, {
                	            name: 'U',
                	            type: 'line',
                	            data: data.map(function (item) {
                	                return item.u - item.l;
                	            }),
                	            lineStyle: {
                	                normal: {
                	                    opacity: 0
                	                }
                	            },
                	            areaStyle: {
                	                normal: {
                	                    color: '#ccc'
                	                }
                	            },
                	            stack: 'confidence-band',
                	            symbol: 'none'
                	        }, {
                	            type: 'line',
                	            data: data.map(function (item) {
                	                return item.value + base;
                	            }),
                	            hoverAnimation: false,
                	            symbolSize: 6,
                	            itemStyle: {
                	                normal: {
                	                    color: '#c23531'
                	                }
                	            },
                	            showSymbol: false
                	        }]
                	    });
                	}
                })
                
            },
            _bindEvent:function(){

            }
        });
    });
