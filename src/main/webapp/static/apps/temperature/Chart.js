define([
        'BasePage',
        'Util',
        'text!../../template/temperature/chartTpl.html',
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
                    template:chartTpl
                });
            },
            _loadDatePage:function(){
            	var that = this;
            	$('#startTime').datetimepicker({
                    format: 'yyyy-mm-dd hh:ii',
                    autoclose:true,
                    initialDate:new Date('2015-05-05')
                });
                $('#endTime').datetimepicker({
                    format: 'yyyy-mm-dd hh:ii',
                    autoclose:true
                });
            },
            _loadChart:function(){
                var that = this,
                	myChart = echarts.init(document.getElementById('chart')),
                	startTime = $('#startTime').val(),
                	endTime = $('#endTime').val();
                that.ajax({
                	url:'temperature/queryChart',
                	data:{
                		startTime:new Date(startTime),
                		endTime:new Date(endTime)
                	},
                	success:function(data){
                		
                		if(!data.length){
                			$('#chart').html('<div class="mt20" style="font-size: 20px;text-align: center;">当前时段无数据！</div>')
                			return ;
                		}
                		
                	    myChart.setOption(option = 
                	    {
                	        title: {
                	            text: '湿度曲线图',
                	            left: 'center'
                	        },
                	        tooltip: {
                	            trigger: 'axis',
                	            axisPointer: {
                	                animation: false
                	            },
                	            formatter: function (params) {
                	                return Util.formatDate(new Date(params[2].name),'MM/DD hh:mm') + '<br />' + params[2].value;
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
                	                return item.createtime;
                	            }),
                	            axisLabel: {
                	                formatter: function (value, idx) {
                	                    var date = new Date(value);
                	                    return Util.formatDate(date,'MM/DD hh:mm');
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
                	                    return val;
                	                }
                	            },
                	            splitNumber: 3,
                	            splitLine: {
                	                show: false
                	            }
                	        },
                	        series: [
	        	                {
	                	            name: 'L',
	                	            type: 'line',
	                	            data: data.map(function (item) {
	                	                return item.temperture;
	                	            }),
	                	            lineStyle: {
	                	                normal: {
	                	                    opacity: 0
	                	                }
	                	            },
	                	            stack: 'confidence-band',
	                	            symbol: 'none'
	                	        }, 
	                	        {
	                	            name: 'U',
	                	            type: 'line',
	                	            data: data.map(function (item) {
	                	                return item.temperture;
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
	                	        }, 
	                	        {
	                	            type: 'line',
	                	            data: data.map(function (item) {
	                	                return item.temperture;
	                	            }),
	                	            hoverAnimation: false,
	                	            symbolSize: 6,
	                	            itemStyle: {
	                	                normal: {
	                	                    color: '#c23531'
	                	                }
	                	            },
	                	            showSymbol: false
	                	        }
                	        ]
                	    });
                	}
                })
                
            },
            _bindEvent:function(){
            	var that = this;
            	$('#search').click(function(){
            		that._loadChart();
            	})
            }
        });
    });
