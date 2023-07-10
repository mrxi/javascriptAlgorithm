$(function () {
	if (!window.location.origin) {
	    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
// 	// window.location.origin+'/datahunter-service/';
	// 'http://192.168.22.102:8080'+'/datahunter-service/'
// 	var _path ='http://192.168.22.102:8080'+'/datahunter-service/'// window.location.origin+'/datahunter-service/';
	// var new_path = 'http://192.168.23.101:8080/'
	// var new_path = 'http://192.168.22.102:8080//'

	var new_path =window.location.origin+'/'
// 	echarts_2()
draw1Data()
draw4Data();//用户活跃度排名

dalyrc();//档案利用人次

getStore()//获取库房
// // draw6Data();//档案存量走势
setInterval(draw6Data(),100000)
function draw6Data(){

	$.ajax({
		type : 'get',
		url: new_path + 'datahunter-service/viwManage/stockStatistics',
		contentType:"application/json",
		dataType: "json",
		success : function(m) {
			if (m.status){
				
				var content = m.content
				console.log(content,'2112312312312')
				var lbdmCount = content.lbdmCount
				var unitCountMap = content.unitCountMap
				var ztlxCount = content.ztlxCount
				var dz_count =[]
				var zz_count =[]
				$('#pieces').text(content.pieces)
				$('#roll').text(content.roll)
				var html = ''
				for(var i=0;i<lbdmCount.length;i++){
					html += '<ul class="clearfix">'
					html +='<li><h1>'+lbdmCount[i].count+'</h1><span>'+lbdmCount[i].lbdm+'</span></li>'
					html +='<li><h3>'+lbdmCount[i].percentage+'</h3><span>占比</span></li></ul>'			
				}
				html+='<div class="clear"></div>'
				html+='<div class="boxfoot"></div>'

				$('#lbdmCount').html(html)
				ztlxCount.forEach(item => {
					dz_count.push(item.dz_count)
					zz_count.push(item.zz_count)
				});
				daclzs(dz_count,zz_count)
				daclpm(unitCountMap.unitName,unitCountMap.unitCount)


				
			}

			}
		
	});  

}
// //获取密集架
function getStorageShelfList(store_id){
	$.ajax({
		type : 'get',
		url: new_path + 'datahunter-service/data/StorageShelfList/'+store_id,
		contentType:"application/json",
		dataType: "json",
		success : function(m) {
			if (m.status){
				var content = m.content
				var titleInfo =	$('#titleInfo li h1')
				$(titleInfo[0]).text(content[0].groupnum)
				$(titleInfo[1]).text(content[0].ceil+'%')
				$(titleInfo[2]).text(content[0].share)
				if(content[0]&&content[0].data){
					var data =content[0].data
					var html = ''
					for(var i=0;i<data.length;i++){
						html += "<li style='display: flex;padding-left: 26px;align-items: center;justify-content: center;'>"
						if(data[i].state='1'){
							html += "<p></p>"
						}else{
							html += "<p class='toggle'></p>"
						}
						html += "<div style='margin-left: 10px; width:50px'>"
						html +=	"<span>"+data[i].title+"</span>"
						if(data[i].state=='1'){
							html +=	"<h1>正常</h1></div></li>"
						}else{
							html +=	"<h1>非正常</h1></div></li>"
					
						}
						
						
				

					}

					
					
					html+='<div class="boxfoot"></div>'
					$('#sensor').html(html)

				}
				
		
				
				

				


			}
		}
	});  


}
// //获取湿度
function getStoreHumidity(store_id){
	$.ajax({
		type : 'get',
		url: new_path + 'datahunter-service/data/StorageHumidityList/'+store_id,
		contentType:"application/json",
		dataType: "json",
		success : function(m) {
			if (m.status){
				kfsdzst(m.content)

				


			}
		}
	});  
	


}

// //获取温度
function getStoreTemperature(store_id){
	$.ajax({
		type : 'get',
		url: new_path + 'datahunter-service/data/StorageTemperatureList/'+store_id,
		contentType:"application/json",
		dataType: "json",
		success : function(m) {
			if (m.status){
				kfwdzst(m.content)
				

				


			}
		}
	});  
}

function formatParams (str) {
  var arr = window.location.search.split("?")[1].split("&");
  var obj = {};
  for (var i of arr) {
    var itemArr = i.split("=");
    obj[itemArr[0]] = itemArr[1];
  }
  return obj;
}

function getStore(){
	var params = formatParams(window.location.search);
  
	var storeList = []
	$.ajax({
		type : 'get',
		url: new_path + 'datahunter-service/data/StoreList/'+params.unit_id,
		contentType:"application/json",
		dataType: "json",
		success : function(m) {
			if (m.status){
				storeList = m.content
				var i = 0
				getStoreTemperature(storeList[i].store_id)
				getStoreHumidity(storeList[i].store_id)
				getStorageShelfList(storeList[i].store_id)
				setInterval(function(){
					i++
					if(i==storeList.length){
						i = 0
					}
					getStoreTemperature(storeList[i].store_id)
					getStoreHumidity(storeList[i].store_id)
					getStorageShelfList(storeList[i].store_id)
					
					
			
	
				},5000)
				
				


			}
		}
	});  }


// //档案存量排名
function daclpm(xAxisList,seriesData){
	var myChart = echarts.init(document.getElementById('echart_daclpm'));
	option = {
			color: [new echarts.graphic.LinearGradient(
	                0, 0, 0, 1,
	                [
	                    {offset: 0, color: '#34c4f4'},
	                    {offset: 1, color: '#0a7fc4'}
	                ]
	            ),new echarts.graphic.LinearGradient(
	                    0, 0, 0, 1,
	                    [
	                        {offset: 0, color: '#a9d64d'},
	                        {offset: 1, color: '#68bc2c'}
	                    ]
	                ),new echarts.graphic.LinearGradient(
	                        0, 0, 0, 1,
	                        [
	                            {offset: 0, color: '#e9704b'},										    		                          
	                            {offset: 1, color: '#e3431e'}									    		                         
	                        ]
	                    )],
		    xAxis: {
		        type: 'category',
		        data: xAxisList,
		        axisLabel: {
		               //formatter: '{value} %'
		    			 show:true,
						 rotate:70,
		    			 textStyle: {
		     					color: "rgba(255,255,255,.6)",
		                        fontSize: '12',
		                    },
		        },
		        splitLine:{//网格线
			        show:false
			    },
			    axisLine: { //关键设置，不显示X轴线条
				    show: false
			    },
			    axisTick: { //关键设置，坐标轴刻度也不显示
				    show: false
			    },

		    },
		    yAxis: {
		        type: 'value',
		        splitLine:{//网格线
			        show:false
			    },
			    axisLine:{       //y轴
		          show:false
		        },
		        axisLabel:{
		            show:false
		        }
		    },
		    series: [{
		        data: seriesData,
		        type: 'bar',
				barWidth:'20%',
		        label: {
		            show: true,
		            position: 'insideTop'
		        },
		        
		    }]
	};
	myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// //档案利用人次
function dalyrc() {
	var content = '' 
    var seriesValue = [];
	$.ajax({
		type : 'get',
		url: new_path + 'archive-use-service/open/summary',//${unit_id}
		contentType:"application/json",
		dataType: "json",
		success : function(m) {
			if (m.status){
				
				content = m.content
				var basicInfo =	$('#basicInfo li h1')
				$(basicInfo[2]).text(content.total)	
		
				for (var i = 0; i < m.content.useTimes.legendData.length; i++) {
					var seriesDataVal = null;
	
					seriesDataVal = {		            barWidth: 15,//柱状条宽度
						name:m.content.useTimes.legendData[i],
						type:'bar',
						itemStyle: {
							/*normal: {
								show: true,//鼠标悬停时显示label数据
								barBorderRadius: [10, 10, 10, 10],//柱形图圆角，初始化效果
								 color: bgColorList[i]
							}*/
							normal: {
								barBorderRadius: 5,                  		                		                    		
							}
						},
						label: {
							normal: {
								//show: true, //显示数据
								position: 'top'//显示数据位置 'top/right/left/insideLeft/insideRight/insideTop/insideBottom'
							}
						} ,
						//data:arrData
						data:m.content.useTimes.seriesDataList[i]
					};
					seriesValue.push(seriesDataVal);
	
				}

			}
		
			draw3(m.content.useDetail)
			
			buildChart(content.useTimes.legendData, content.useTimes.axisList, seriesValue);

		}
	});
}
function draw3(content){
		var myChart=echarts.init(document.getElementById('echart2'),"macarons");	

	option = {
		title: {
			text: '',
			subtext: '',
			left: 'center'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			textStyle: { //图例文字的样式
				color: 'rgba(255,255,255,.6)',
				fontSize: 12
			},
		},
		series: [
			{
				name: '数量',
				type: 'pie',
				radius: '85%',
				data: content,
				label: {
                    normal: {
                       position: 'inner',
                       show : false
                    }
                  },
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
// // 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
window.addEventListener("resize",function(){
	myChart.resize();
});
}

function buildChart(legendData, axisLabel, seriesValue) {
    var chart = document.getElementById('echart1');
    var echart = echarts.init(chart,"macarons");
    var option = {
    	color: [new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#34c4f4'},
                    {offset: 1, color: '#0a7fc4'}
                ]
            ),new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#a9d64d'},
                        {offset: 1, color: '#68bc2c'}
                    ]
                ),new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#e9704b'},										    		                          
                            {offset: 1, color: '#e3431e'}									    		                         
                        ]
                    )],
    	noDataLoadingOption: {
           text: '暂无数据',
           effect: 'bubble',
           effectOption: {
                         effect: {
                         n: 0
                         }
           }
        },
        title: {
            text: "",//正标题
            x: "10", //标题水平方向位置
            y: "10", //标题竖直方向位置
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#2066a7'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'//阴影，若需要为直线，则值为'line'
            },
            formatter: function (datas) {
//                var res = datas[0].name + '<br/>'
//                for (var i = 0, length = datas.length; i < length; i++) {
//                	var value = datas[i].data == null ? "--" : datas[i].data+ 'G';
//                   res += datas[i].seriesName + '：' 
//                       + value + '<br/>'
//                 }
//                 return res
               }
      
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {show: false}
            }
        },
        legend: {
            data: legendData,
            y: '5%',//图例说明文字设置
            x:'right',
            textStyle: {
				color: "rgba(255,255,255,.6)",
                fontSize: '12',
            }

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            top:'20%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
          		data:axisLabel,
            axisLine: {
                show: true,
             lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                    type: "solid"
                },
            },
    		
            axisTick: {
                show: false,
            },
    		axisLabel:  {
                    interval: 0,
                   // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
     					color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
               //formatter: '{value} %'
    			show:true,
    			textStyle: {
     					color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,.1	)",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                lineStyle: {
                   color: "rgba(255,255,255,.1)",
                }
            }
        }],
        label: {
            normal: { //显示bar数据
                show: true,
                position: 'top'
                //formatter: '{c}%'
            }
        },
        
        series: seriesValue
    };

    echart.setOption(option);
}    

// //档案存量走势
function daclzs(dz_count,zz_count) {
	console.log(dz_count,zz_count,'123131231231')
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart_daclzs'));

option = {
    tooltip: {
    trigger: 'axis',
    axisPointer: {
        lineStyle: {
            color: '#dddc6b'
        }
    }
},
	    legend: {
top:'0%',
    data:['电子','纸质'],
            textStyle: {
       color: 'rgba(255,255,255,.5)',
		fontSize:'12',
    }
},
grid: {
    left: '10',
	top: '30',
    right: '10',
    bottom: '10',
    containLabel: true
},

xAxis: [{
    type: 'category',
    boundaryGap: false,
axisLabel:  {
            textStyle: {
					color: "rgba(255,255,255,.6)",
				fontSize:12,
            },
        },
    axisLine: {
		lineStyle: { 
			color: 'rgba(255,255,255,.2)'
		}

    },

data: ['01', '02', '03', '04', '05', '06', '07', '08', '09','10', '11', '12']

}, {

    axisPointer: {show: false},
    axisLine: {  show: false},
    position: 'bottom',
    offset: 20,

   

}],

yAxis: [{
    type: 'value',
    axisTick: {show: false},
    axisLine: {
        lineStyle: {
            color: 'rgba(255,255,255,.1)'
        }
    },
   axisLabel:  {
            textStyle: {
					color: "rgba(255,255,255,.6)",
				fontSize:12,
            },
        },

    splitLine: {
        lineStyle: {
             color: 'rgba(255,255,255,.1)'
        }
    }
}],
series: [
	{
    name: '电子',
    type: 'line',
     smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
		
        normal: {
			color: '#0184d5',
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(1, 132, 213, 0.4)'
            }, {
                offset: 0.8,
                color: 'rgba(1, 132, 213, 0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
        }
    },
		itemStyle: {
		normal: {
			color: '#0184d5',
			borderColor: 'rgba(221, 220, 107, .1)',
			borderWidth: 12
		}
	},
    data:dz_count

}, 
{
    name: '纸质',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
		
        normal: {
			color: '#00d887',
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 216, 135, 0.4)'
            }, {
                offset: 0.8,
                color: 'rgba(0, 216, 135, 0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
        }
    },
		itemStyle: {
		normal: {
			color: '#00d887',
			borderColor: 'rgba(221, 220, 107, .1)',
			borderWidth: 12
		}
	},
    data:zz_count

}, 

	 ]

};
  
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}


// function echarts_4() {
//         // 基于准备好的dom，初始化echarts实例
//         var myChart = echarts.init(document.getElementById('echart4'));

//     option = {
// 	    tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//             lineStyle: {
//                 color: '#dddc6b'
//             }
//         }
//     },
// 		    legend: {
//     top:'0%',
//         data:['安卓','IOS'],
//                 textStyle: {
//            color: 'rgba(255,255,255,.5)',
// 			fontSize:'12',
//         }
//     },
//     grid: {
//         left: '10',
// 		top: '30',
//         right: '10',
//         bottom: '10',
//         containLabel: true
//     },

//     xAxis: [{
//         type: 'category',
//         boundaryGap: false,
// axisLabel:  {
//                 textStyle: {
//  					color: "rgba(255,255,255,.6)",
// 					fontSize:12,
//                 },
//             },
//         axisLine: {
// 			lineStyle: { 
// 				color: 'rgba(255,255,255,.2)'
// 			}

//         },

//    data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

//     }, {

//         axisPointer: {show: false},
//         axisLine: {  show: false},
//         position: 'bottom',
//         offset: 20,

       

//     }],

//     yAxis: [{
//         type: 'value',
//         axisTick: {show: false},
//         axisLine: {
//             lineStyle: {
//                 color: 'rgba(255,255,255,.1)'
//             }
//         },
//        axisLabel:  {
//                 textStyle: {
//  					color: "rgba(255,255,255,.6)",
// 					fontSize:12,
//                 },
//             },

//         splitLine: {
//             lineStyle: {
//                  color: 'rgba(255,255,255,.1)'
//             }
//         }
//     }],
//     series: [
// 		{
//         name: '安卓',
//         type: 'line',
//          smooth: true,
//         symbol: 'circle',
//         symbolSize: 5,
//         showSymbol: false,
//         lineStyle: {
			
//             normal: {
// 				color: '#0184d5',
//                 width: 2
//             }
//         },
//         areaStyle: {
//             normal: {
//                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                     offset: 0,
//                     color: 'rgba(1, 132, 213, 0.4)'
//                 }, {
//                     offset: 0.8,
//                     color: 'rgba(1, 132, 213, 0.1)'
//                 }], false),
//                 shadowColor: 'rgba(0, 0, 0, 0.1)',
//             }
//         },
// 			itemStyle: {
// 			normal: {
// 				color: '#0184d5',
// 				borderColor: 'rgba(221, 220, 107, .1)',
// 				borderWidth: 12
// 			}
// 		},
//         data: [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

//     }, 
// {
//         name: 'IOS',
//         type: 'line',
//         smooth: true,
//         symbol: 'circle',
//         symbolSize: 5,
//         showSymbol: false,
//         lineStyle: {
			
//             normal: {
// 				color: '#00d887',
//                 width: 2
//             }
//         },
//         areaStyle: {
//             normal: {
//                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                     offset: 0,
//                     color: 'rgba(0, 216, 135, 0.4)'
//                 }, {
//                     offset: 0.8,
//                     color: 'rgba(0, 216, 135, 0.1)'
//                 }], false),
//                 shadowColor: 'rgba(0, 0, 0, 0.1)',
//             }
//         },
// 			itemStyle: {
// 			normal: {
// 				color: '#00d887',
// 				borderColor: 'rgba(221, 220, 107, .1)',
// 				borderWidth: 12
// 			}
// 		},
//         data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

//     }, 
	
// 		 ]

// };
      
//         // 使用刚指定的配置项和数据显示图表。
//         myChart.setOption(option);
//         window.addEventListener("resize",function(){
//             myChart.resize();
//         });
//     }

// //库房温度走势图
function kfwdzst(data){
	var myChart = echarts.init(document.getElementById('echart4'));
	option = {
		    tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		        lineStyle: {
		            color: '#dddc6b'
		        }
		      }
		    },
			legend: {
		    top:'0%',
		    data:[],
		    textStyle: {
		        color: 'rgba(255,255,255,.5)',
			    fontSize:'12',
		        }
		    },
		    grid: {
		        left: '10',
			    top: '30',
		        right: '10',
		        bottom: '10',
		        containLabel: true
		    },

		    xAxis: [{
		        type: 'category',
		        boundaryGap: false,
		        axisLabel:  {
		            textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize:12,
		            },
		        },
		        axisLine: {
				    lineStyle: { 
					    color: 'rgba(255,255,255,.2)'
				    }
		        },
		        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		    }, 
		    {
		        axisPointer: {show: false},
		        axisLine: {  show: false},
		        position: 'bottom',
		        offset: 20,
		    }
		    ],

		yAxis: [{
		    type: 'value',
		    axisTick: {show: false},
		    axisLine: {
		        lineStyle: {
		            color: 'rgba(255,255,255,.1)'
		        }
		    },
		    axisLabel:  {
		            textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize:12,
		            },
		    },
		    splitLine: {
		            lineStyle: {
		               color: 'rgba(255,255,255,.1)'
		        }
		    }
		}],
		series: [
			{
		    name: '',
		    type: 'line',
		    smooth: true,
		    symbol: 'circle',
		    symbolSize: 5,
		    showSymbol: false,
		    lineStyle: {
		        normal: {
					color: '#0184d5',
		            width: 2
		        }
		    },
		    areaStyle: {
		        normal: {
		            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                offset: 0,
		                color: 'rgba(1, 132, 213, 0.4)'
		            }, {
		                offset: 0.8,
		                color: 'rgba(1, 132, 213, 0.1)'
		            }], false),
		            shadowColor: 'rgba(0, 0, 0, 0.1)',
		        }
		    },
			itemStyle: {
				normal: {
					color: '#0184d5',
					borderColor: 'rgba(221, 220, 107, .1)',
					borderWidth: 12
				}
			},
			markLine: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		    data:data
		   }
		 ]
	};
	myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// //库房湿度走势图
function kfsdzst(data){
	var myChart = echarts.init(document.getElementById('echart5'));
	option = {
		    tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		        lineStyle: {
		            color: '#dddc6b'
		        }
		      }
		    },
			legend: {
		    top:'0%',
		    data:[],
		    textStyle: {
		        color: 'rgba(255,255,255,.5)',
			    fontSize:'12',
		        }
		    },
		    grid: {
		        left: '10',
			    top: '30',
		        right: '10',
		        bottom: '10',
		        containLabel: true
		    },

		    xAxis: [{
		        type: 'category',
		        boundaryGap: false,
		        axisLabel:  {
		            textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize:12,
		            },
		        },
		        axisLine: {
				    lineStyle: { 
					    color: 'rgba(255,255,255,.2)'
				    }
		        },
		        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		    }, 
		    {
		        axisPointer: {show: false},
		        axisLine: {  show: false},
		        position: 'bottom',
		        offset: 20,
		    }
		    ],

		yAxis: [{
		    type: 'value',
		    axisTick: {show: false},
		    axisLine: {
		        lineStyle: {
		            color: 'rgba(255,255,255,.1)'
		        }
		    },
		    axisLabel:  {
		            textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize:12,
		            },
		    },
		    splitLine: {
		            lineStyle: {
		               color: 'rgba(255,255,255,.1)'
		        }
		    }
		}],
		series: [
			{
		    name: '',
		    type: 'line',
		    smooth: true,
		    symbol: 'circle',
		    symbolSize: 5,
		    showSymbol: false,
		    lineStyle: {
		        normal: {
					color: '#0184d5',
		            width: 2
		        }
		    },
		    areaStyle: {
		        normal: {
		            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                offset: 0,
		                color: 'rgba(1, 132, 213, 0.4)'
		            }, {
		                offset: 0.8,
		                color: 'rgba(1, 132, 213, 0.1)'
		            }], false),
		            shadowColor: 'rgba(0, 0, 0, 0.1)',
		        }
		    },
			itemStyle: {
				normal: {
					color: '#0184d5',
					borderColor: 'rgba(221, 220, 107, .1)',
					borderWidth: 12
				}
			},
			markLine: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		    data: data
		   }
		 ]
	};
	myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// function echarts_6() {
//         // 基于准备好的dom，初始化echarts实例
//         var myChart = echarts.init(document.getElementById('echart6'));

//         var dataStyle = {
// 	normal: {
// 		label: {
// 			show: false
// 		},
// 		labelLine: {
// 			show: false
// 		},
// 		//shadowBlur: 40,
// 		//shadowColor: 'rgba(40, 40, 40, 1)',
// 	}
// };
// var placeHolderStyle = {
// 	normal: {
// 		color: 'rgba(255,255,255,.05)',
// 		label: {show: false,},
// 		labelLine: {show: false}
// 	},
// 	emphasis: {
// 		color: 'rgba(0,0,0,0)'
// 	}
// };
// option = {
// 	color: ['#0f63d6', '#0f78d6', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
// 	tooltip: {
// 		show: true,
// 		formatter: "{a} : {c} "
// 	},
// 	legend: {
// 		itemWidth: 10,
//         itemHeight: 10,
// 		itemGap: 12,
// 		bottom: '3%',
		
// 		data: ['浙江', '上海', '广东', '北京', '深圳'],
// 		textStyle: {
//                     color: 'rgba(255,255,255,.6)',
//                 }
// 	},
	
// 	series: [
// 		{
// 		name: '浙江',
// 		type: 'pie',
// 		clockWise: false,
// 		center: ['50%', '42%'],
// 		radius: ['59%', '70%'],
// 		itemStyle: dataStyle,
// 		hoverAnimation: false,
// 		data: [{
// 			value: 80,
// 			name: '01'
// 		}, {
// 			value: 20,
// 			name: 'invisible',
// 			tooltip: {show: false},
// 			itemStyle: placeHolderStyle
// 		}]
// 	},
// 		{
// 		name: '上海',
// 		type: 'pie',
// 		clockWise: false,
// 		center: ['50%', '42%'],
// 		radius: ['49%', '60%'],
// 		itemStyle: dataStyle,
// 		hoverAnimation: false,
// 		data: [{
// 			value: 70,
// 			name: '02'
// 		}, {
// 			value: 30,
// 			name: 'invisible',
// 			tooltip: {show: false},
// 			itemStyle: placeHolderStyle
// 		}]
// 	}, 
// 		{
// 		name: '广东',
// 		type: 'pie',
// 		clockWise: false,
// 		hoverAnimation: false,
// 		center: ['50%', '42%'],
// 		radius: ['39%', '50%'],
// 		itemStyle: dataStyle,
// 		data: [{
// 			value: 65,
// 			name: '03'
// 		}, {
// 			value: 35,
// 			name: 'invisible',
// 			tooltip: {show: false},
// 			itemStyle: placeHolderStyle
// 		}]
// 	},
// 		{
// 		name: '北京',
// 		type: 'pie',
// 		clockWise: false,
// 		hoverAnimation: false,
// 		center: ['50%', '42%'],
// 		radius: ['29%', '40%'],
// 		itemStyle: dataStyle,
// 		data: [{
// 			value: 60,
// 			name: '04'
// 		}, {
// 			value: 40,
// 			name: 'invisible',
// 			tooltip: {show: false},
// 			itemStyle: placeHolderStyle
// 		}]
// 	}, 
// 		{
// 		name: '深圳',
// 		type: 'pie',
// 		clockWise: false,
// 		hoverAnimation: false,
// 		center: ['50%', '42%'],
// 		radius: ['20%', '30%'],
// 		itemStyle: dataStyle,
// 		data: [{
// 			value: 50,
// 			name: '05'
// 		}, {
// 			value: 50,
// 			name: 'invisible',
// 			tooltip: {show: false},
// 			itemStyle: placeHolderStyle
// 		}]
// 	}, ]
// };
      
//         // 使用刚指定的配置项和数据显示图表。
//         myChart.setOption(option);
//         window.addEventListener("resize",function(){
//             myChart.resize();
//         });
//     }
// //function echarts_31() {
// //        // 基于准备好的dom，初始化echarts实例
// //        var myChart = echarts.init(document.getElementById('fb1')); 
// //option = {
// //   
// //	    title: [{
// //        text: '年龄分布',
// //        left: 'center',
// //        textStyle: {
// //            color: '#fff',
// //			fontSize:'16'
// //        }
// //
// //    }],
// //    tooltip: {
// //        trigger: 'item',
// //        formatter: "{a} <br/>{b}: {c} ({d}%)",
// //position:function(p){   //其中p为当前鼠标的位置
// //            return [p[0] + 10, p[1] - 10];
// //        }
// //    },
// //    legend: {
// //        
// //top:'70%',
// //       itemWidth: 10,
// //        itemHeight: 10,
// //        data:['0岁以下','20-29岁','30-39岁','40-49岁','50岁以上'],
// //                textStyle: {
// //            color: 'rgba(255,255,255,.5)',
// //			fontSize:'12',
// //        }
// //    },
// //    series: [
// //        {
// //        	name:'年龄分布',
// //            type:'pie',
// //			center: ['50%', '42%'],
// //            radius: ['40%', '60%'],
// //                  color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],	
// //            label: {show:false},
// //			labelLine: {show:false},
// //            data:[
// //                {value:1, name:'0岁以下'},
// //                {value:4, name:'20-29岁'},
// //                {value:2, name:'30-39岁'},
// //                {value:2, name:'40-49岁'},
// //                {value:1, name:'50岁以上'},
// //            ]
// //        }
// //    ]
// //};
// //      
// //        // 使用刚指定的配置项和数据显示图表。
// //        myChart.setOption(option);
// //        window.addEventListener("resize",function(){
// //            myChart.resize();
// //        });
// //    }
// //function echarts_32() {
// //        // 基于准备好的dom，初始化echarts实例
// //        var myChart = echarts.init(document.getElementById('fb2'));
// //option = {
// //   
// //	    title: [{
// //        text: '职业分布',
// //        left: 'center',
// //        textStyle: {
// //            color: '#fff',
// //			fontSize:'16'
// //        }
// //
// //    }],
// //    tooltip: {
// //        trigger: 'item',
// //        formatter: "{a} <br/>{b}: {c} ({d}%)",
// //position:function(p){   //其中p为当前鼠标的位置
// //            return [p[0] + 10, p[1] - 10];
// //        }
// //    },
// //    legend: {
// //        
// //    top:'70%',
// //       itemWidth: 10,
// //        itemHeight: 10,
// //        data:['电子商务','教育','IT/互联网','金融','学生','其他'],
// //                textStyle: {
// //           color: 'rgba(255,255,255,.5)',
// //			fontSize:'12',
// //        }
// //    },
// //    series: [
// //        {
// //        	name:'年龄分布',
// //            type:'pie',
// //			center: ['50%', '42%'],
// //            radius: ['40%', '60%'],
// //            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],	
// //            label: {show:false},
// //			labelLine: {show:false},
// //            data:[
// //                {value:5, name:'电子商务'},
// //                {value:1, name:'教育'},
// //                {value:6, name:'IT/互联网'},
// //                {value:2, name:'金融'},
// //                {value:1, name:'学生'},
// //                {value:1, name:'其他'},
// //            ]
// //        }
// //    ]
// //};
// //      
// //        // 使用刚指定的配置项和数据显示图表。
// //        myChart.setOption(option);
// //        window.addEventListener("resize",function(){
// //            myChart.resize();
// //        });
// //    }
// //function echarts_33() {
// //        // 基于准备好的dom，初始化echarts实例
// //        var myChart = echarts.init(document.getElementById('fb3'));
// //option = {
// //	    title: [{
// //        text: '兴趣分布',
// //        left: 'center',
// //        textStyle: {
// //            color: '#fff',
// //			fontSize:'16'
// //        }
// //
// //    }],
// //    tooltip: {
// //        trigger: 'item',
// //        formatter: "{a} <br/>{b}: {c} ({d}%)",
// //position:function(p){   //其中p为当前鼠标的位置
// //            return [p[0] + 10, p[1] - 10];
// //        }
// //    },
// //    legend: {
// //    top:'70%',
// //       itemWidth: 10,
// //        itemHeight: 10,
// //        data:['汽车','旅游','财经','教育','软件','其他'],
// //                textStyle: {
// //            color: 'rgba(255,255,255,.5)',
// //			fontSize:'12',
// //        }
// //    },
// //    series: [
// //        {
// //        	name:'兴趣分布',
// //            type:'pie',
// //			center: ['50%', '42%'],
// //            radius: ['40%', '60%'],
// //                   color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],	
// //            label: {show:false},
// //			labelLine: {show:false},
// //            data:[
// //                {value:2, name:'汽车'},
// //                {value:3, name:'旅游'},
// //                {value:1, name:'财经'},
// //                {value:4, name:'教育'},
// //                {value:8, name:'软件'},
// //                {value:1, name:'其他'},
// //            ]
// //        }
// //    ]
// //};
// //      
// //        // 使用刚指定的配置项和数据显示图表。
// //        myChart.setOption(option);
// //        window.addEventListener("resize",function(){
// //            myChart.resize();
// //        });
// //    }
// //		



// /**
//  * 画占比图
//  * @param {String} container 容器
//  * @param {JSON} yData Y轴数据
//  * @param {JSON} ratio 占比数据
//  * @param {JSON} surplus 剩余数据
//  */
 function draw1Data() {
	var content = ''
	$.ajax({
		type : 'post',
		url: new_path + "report-server/statistics/getReportData",
		contentType:"application/json",
		dataType: "json",
		data:'{"stat_type": "home_zcdwzcyh"}',
		success : function(m) {
			if (m.status){
				content = m.content
				var basicInfo =	$('#basicInfo li h1')
				$(basicInfo[0]).text(content.unitList[0].value)
				$(basicInfo[1]).text(content.userList[0].value)	
			}
		}
	});  
}
function draw4Data() {
	var content = ''
	$.ajax({
		type : 'post',
		url: new_path + "report-server/statistics/getReportData",
		contentType:"application/json",
		dataType: "json",
		data:'{"stat_type": "home_yhhy"}',
		success : function(m) {
			if (m.status){
				content = m.content
				draw4(content)

			}
		}
	});  
}

function draw4(content){
	var myChart = echarts.init(document.getElementById('echart3'));
    var option = {
        grid: {
            left: '8%',
            right: '8%',
            bottom: '4%',
            top: 10,
            containLabel: true
        },
        xAxis: {
            show: false
        },
        yAxis: {
            type: 'category',
            inverse: true,
            //城市名称
            data: content.unitList,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
            	show:true,
   			 textStyle: {
    					color: "rgba(255,255,255,.6)",
                       fontSize: '12',
                   }
            },
        },
        series: [
            {
                type: 'bar',
                stack: 'chart',
                z: 3,
                barWidth: '20',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(1,
                            0, 0, 1, [{
                                offset: 0,
                                color: '#2A6BCD'
                            }, {
                                offset: 1,
                                color: '#34F6F8'
                            }])
                    }
                },
                label: {
                    normal: {
                        position: 'right',
                        show: true,
                        color: 'white',
                        formatter: '{c}%'
                    }
                },
                data:content.ceilList
            },
            {
                type: 'bar',
                stack: 'chart',
                barWidth: '20',
                itemStyle: {
                    normal: {
                        color: '#0D2253'
                    }
                },
                data:content.valueList
            }]
    }
    myChart.setOption(option);
}
	
})