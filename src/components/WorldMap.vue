<template>
    <div id="content" ref="content">
      <!--初始化Echarts-->
      <div id="mapbox" ref="mapbox"></div>
      <div id="inverse_card" ref="inverse-card" v-show="show_hide">
        <div id="current_coun" ref="current_coun">
            <h1>
                <Icon type="ios-pin"></Icon>
                {{ current_coun }}
            </h1>
            <hr>
        </div>
        <div id="predict" ref="predict"></div>
        <div id="remaining" ref="remaining"></div>
        <div id="statement" ref="statement">
            <p>
                注：本网站由北京航空航天大学计算机学院智慧城市(BIGSCity)课题组完成，受到国家重点研发计划项目"城市多样化场景模式挖掘与态势认知(2019YFB2102103)"支持。
            </p>
        </div>
      </div>
    </div>
</template>
  
<script>
import echarts from 'echarts';
import 'echarts/map/js/world.js';

export default {
    name: 'WorldMap',
    data () {
        return {
            coun_data: [],
            current_coun: "",
            predict_cases: 0,
            actual_cases: 0,
            remaining_cases: 0,
            xAxisDate: [],
            geoCoordMap: {},
            show_hide: false,
        }
    },
    mounted() {
        // 获取各省确诊病例数以及R0
        this.$axios.get('../../static/world_data.json').then((resp)=>{
            this.prov_data = resp.data.map((item) => {
                return {
                    name: item.name,
                    value: item.value.infect,
                }
            }); 
            let option = {
                title: {
                    text: "COVID-19全球疫情分析与预测地图",
                    subtext: 'BUAA BIGSCITY Research',
                    sublink: 'http://www.bigscity.com',
                    x: "center",
                    left: 'left',
                    textStyle: {
                        fontSize: 30,
                        color: '#fff',
                    },
                    top: '20px'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if(params.value) {
                            return params.name + "<br />" + "Number of confirmed cases : " + params.value;
                        } else {
                            return;
                        }
                    }
                },  
                series: [{
                    type: 'map', //设置要渲染的类型
                    map: 'world', //设置地图名称
                    zoom: 1.2, //设置地图初始显示大小
                    roam: true, //设置是否平游和缩放
                    label: {
                    //控制对应地区的汉字
                        show: false,
                        color: '#fff',
                        fontSize: 8
                    },
                    // 控制地图板块的样式
                    itemStyle: {
                        areaColor: 'gray',
                    },
                    // 鼠标移动到板块上以后的样式 把外面的label和itemStyle放进来就行了
                    emphasis: {
                        label: {
                            //控制对应地区的汉字
                            show: true,
                            color: '#fff',
                            fontSize: 18
                        },
                        itemStyle: {
                            areaColor: '#83b5e7',
                        },
                    },
                    data: this.prov_data,
                }],
                visualMap: [{
                    type: 'piecewise',
                    show: true,
                    pieces: [
                        {gt: 5000, label: '累计确诊病例 > 5000'},  
                        {gt: 1000, lte: 5000},        
                        {gt: 500, lte: 1000},
                        {gt: 100, lte: 500},
                        {gt: 50, lte: 100},
                        {gte: 10, lte: 50},
                        {lte: 10, label: '累计确诊病例 < 10'},
                    ],
                    color: ['#d94e5d','#eac736','#50a3ba'],
                    left: 'right',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#fff',
                    },
                }]
            };

            const mycharts = echarts.init(this.$refs.mapbox);
            mycharts.setOption(option);
            
            mycharts.on('click', (params) => { 
                this.activeCountry(params.name);
            });
            this.mycharts = mycharts;
        });
        
    },
    methods: {
        activeCountry(coun) {
            this.$axios.get("../../static/coun/"+coun+".json").then((resp)=> {
                this.current_coun = coun;
                this.predict_cases = resp.data.data.predict.value;
                this.actual_cases = resp.data.data.official_confirmed.value;
                this.remaining_cases = resp.data.data.Remain_confirm.value;
                const dateSeries1 = this.genDateArr(
                    resp.data.data.predict.start_date, 
                    resp.data.data.predict.end_date, 
                    resp.data.data.predict.value
                );
                const dateSeries2 = this.genDateArr(
                    resp.data.data.Remain_confirm.start_date, 
                    resp.data.data.Remain_confirm.end_date, 
                    resp.data.data.Remain_confirm.value
                );
                // 设置表格属性
                let option_predict = {
                    title: {
                        text: "累计病例数",
                        x: 'left',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['预测确诊病例', '真实确诊病例'],
                        orient: 'horizontal',
                        x: 'center',
                        y: 'bottom',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    grid:{
                        x:50,
                        y:50,
                        x2:50,
                        y2:50,
                        borderWidth:1
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar', 'stack']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: {
                            show: false,
                        },
                        data: dateSeries1,
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#fff',
                                width:'2'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff', //坐标轴的具体的颜色
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        show: true,
                        scale: true,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#fff',
                                width:'2'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff', //坐标轴的具体的颜色
                            }
                        },
                    },
                    series: [
                        {
                            name: '预测确诊病例',
                            type: 'line',
                            data: this.predict_cases,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name: '真实确诊病例',
                            type: 'line',
                            data: this.actual_cases,
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                        },
                    ]
                };
                let option_remaining = {
                    title: {
                        text: "确诊存量",
                        x: 'left',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['确诊存量'],
                        orient: 'horizontal',
                        x: 'center',
                        y: 'bottom',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    grid:{
                        x:50,
                        y:50,
                        x2:50,
                        y2:50,
                        borderWidth:1
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dateSeries2,
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#fff',
                                width:'2'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff', //坐标轴的具体的颜色
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        show: true,
                        scale: true,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#fff',
                                width:'2'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff', //坐标轴的具体的颜色
                            }
                        },
                    },
                    series: [
                        {
                            name: '确诊存量',
                            type: 'line',
                            data: this.remaining_cases,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                    ]
                };                let table_predict = echarts.init(this.$refs.predict);
                table_predict.setOption(option_predict);
                let table_remaining = echarts.init(this.$refs.remaining);
                table_remaining.setOption(option_remaining);
                this.show_hide = true;
            }).catch(()=>{
                return;
            });
        },
        genDateArr(start, end, arr) {
            const startDate = +new Date(start);
            const endDate = +new Date(end);
            const N = arr.length - 1;
            const step = parseInt((endDate - startDate) / N);
            let res = [];
            for(let i=0; i<arr.length; i+=1) {
                const now = new Date( + i * step + startDate);
                res.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            }
            return res;
        },
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #content {
        position: absolute;
        height: calc(100% - 60px);
        top: 60px;
        width: 100%;
        background-color: rgb(11, 53, 102);
        padding: 0px;
        margin: 0px;
    }
    #mapbox {
        position: absolute;
        height: calc(100% - 20px);
        width: calc(100% - 20px);
        padding: 0px;
        margin: 0px;
    }
    #inverse_card {
        position: absolute;
        bottom: 10px;
        left: 10px;
        pointer-events: auto;
        border: none;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 0px;
        margin: 0px;
        width: 400px;
        text-align: left;
    }
    #current_coun {
        position: relative;
        height: 70px;
    }
    #predict {
        position: relative;
        left: 10px;
        bottom: 10px;
        width: 400px;
        height: 200px;
    }
    #remaining {
        position: relative;
        left: 10px;
        bottom: 10px;
        width: 400px;
        height: 200px;
    }
    #statement {
        position: relative;
        left: 10px;
        right: 10px;
    }
</style>