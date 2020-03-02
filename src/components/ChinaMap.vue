<template>
    <div id="content" ref="content">
      <!--初始化Echarts-->
      <div id="mapbox" ref="mapbox"></div>
      <div id="inverse_card" ref="inverse-card">
        <div id="current_city" ref="current_city">
            <h1>
                <Icon type="ios-pin"></Icon>
                {{ current_city }}
            </h1>
            <hr>
        </div>
        <div id="predict" ref="predict"></div>
        <div id="remaining" ref="remaining"></div>
      </div>
    </div>
</template>
  
<script>
import echarts from 'echarts';
import 'echarts/map/js/china.js';

export default {
    name: 'Map',
    data () {
        return {
            prov_data: [],
            current_city: "",
            predict_cases: 0,
            actual_cases: 0,
            remaining_cases: 0,
            xAxisDate: [],
            geoCoordMap: {},
        }
    },
    mounted() {
        // 获取各省确诊病例数以及R0
        this.$axios.get('../../static/prov.json').then((resp)=>{
            this.geoCoordMap = resp.data;
        });
        this.$axios.get('../../static/data.json').then((resp)=>{
            this.prov_data = resp.data.map((item) => {
                return {
                    name: item.name,
                    value: item.value.infect,
                    R0: item.value.R0
                }
            });
            let option = {
                title: {
                    text: "COVID-19国内疫情分析与预测地图",
                    subtext: 'BUAA BIGSCITY Research',
                    sublink: 'http://www.bigscity.com',
                    x: "center",
                    left: 'left',
                    textStyle: {
                        fontSize: 30,
                        color: '#fff',
                    }
                },
                // backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if(params.name.length == 0) {
                            return
                        }
                        let tipString = "";
                        if(params.data.value) {
                            tipString = params.name + "<br />" + "确诊患者数 : " + params.data.value + "<br />" + "R0 : " + params.data.R0
                        } else {
                            tipString = params.name + "数据缺失"
                        }
                        return tipString;
                    },
                },
                visualMap: [
                    {
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
                        seriesIndex:0,
                    },
                    
                ],
                geo: {
                    type: 'map', //设置要渲染的类型
                    map: 'china', //设置地图名称
                    zoom: 1.2, //设置地图初始显示大小
                    label: {
                        //控制对应地区的汉字
                        show: true,
                        color: '#fff',
                        fontSize: 12
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
                            areaColor: '#888',
                        },
                    },
                },
                series: [
                    {
                        type: 'map',
                        geoIndex: 0,
                        data: this.prov_data,
                    },
                    {
                        name: 'R0',
                        type: 'effectScatter',
                        data: this.convertData(),
                        coordinateSystem: "geo", 
                        symbolSize: function (val) {
                            return parseInt(val[2] * 30);
                        },
                        label: {
                            position: 'right',
                            show: false,
                            textStyle: {
                                color: '#fff',
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'purple'
                            }
                        },
                        emphasis: {
                            label: {
                                show: false
                            }
                        },
                    },
                    // {
                    //     name: 'Top 5',
                    //     type: 'effectScatter',
                    //     coordinateSystem: 'bmap',
                    //     data: convertData(data.sort(function (a, b) {
                    //         return b.value - a.value;
                    //     }).slice(0, 6)),
                    //     symbolSize: function (val) {
                    //         return val[2] / 10;
                    //     },
                    //     showEffectOn: 'emphasis',
                    //     rippleEffect: {
                    //         brushType: 'stroke'
                    //     },
                    //     hoverAnimation: true,
                    //     label: {
                    //         formatter: '{b}',
                    //         position: 'right',
                    //         show: true
                    //     },
                    //     itemStyle: {
                    //         color: '#f4e925',
                    //         shadowBlur: 10,
                    //         shadowColor: '#333'
                    //     },
                    //     zlevel: 1
                    // },
                ],
                
            };
            const mycharts = echarts.init(this.$refs.mapbox);
            mycharts.setOption(option);
            
            mycharts.on('click', (params) => { 
                if(params.name == "湖北") {
                    this.activeCity("湖北_不含武汉");
                }
                else if (params.name) {
                    this.activeCity(params.name);
                }
            });
            this.mycharts = mycharts;
        });
        
        this.activeCity("全国_不含湖北");
        // let table = echarts.init(this.$refs.predict);
        // table.setOption(option);

    },
    methods: {
        activeCity(prov) {
            this.$axios.get("../../static/prov/"+prov+".json").then((resp)=> {
                this.current_city = prov;
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
                };
                let table_predict = echarts.init(this.$refs.predict);
                table_predict.setOption(option_predict);
                let table_remaining = echarts.init(this.$refs.remaining);
                table_remaining.setOption(option_remaining);
            }).catch(()=>{
                this.$Message.error("该省市数据尚未处理完成");
                this.$Loading.error();
            });
        },
        convertData() {
            let res = [];
            for(let i = 0; i < this.prov_data.length; i++) {
                let geoCoord = this.geoCoordMap[this.prov_data[i].name];
                if(geoCoord) {
                    res.push({
                        // name: this.prov_data[i].name,
                        name: "",
                        value: geoCoord.concat(this.prov_data[i].R0),
                    })
                }
            }
            return res;
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
        /* background-color: rgb(31, 61, 96); */
        /* background-color: rgb(77, 41, 16); */
        background-color: rgb(11, 53, 102);
        padding: 0px;
        margin: 0px;
    }
    #mapbox {
        position: absolute;
        height: 100%;
        width: 100%;
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
        /* background-color: transparent; */
        text-align: left;
    }
    #current_city {
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
</style>