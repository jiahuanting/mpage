<template>
    <div id="content" ref="content">
      <!--初始化Echarts-->
      <div id="mapbox" ref="mapbox"></div>
      <div id="inverse_card" ref="inverse-card">
        <div id="predict" ref="predict"></div>
        <div id="remaining" ref="remaining"></div>
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
                    }
                },
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        let tipString = "";
                        if(params.data.value) {
                            tipString = params.name + "<br />" + "确诊患者数 : " + params.data.value
                        } else {
                            tipString = params.name + "数据缺失"
                        }
                        return tipString;
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
                        color: 'red',
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
                            color: 'red',
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
                }]
            };
            let mycharts = echarts.init(this.$refs.mapbox);
            mycharts.setOption(option);
            this.mycharts = mycharts;
            this.mycharts.on('click', function (params) {
                alert(params.name);
            });
        });
        // this.activeCountry("全国_不含湖北");
        
    },
    methods: {
        activeCountry(coun) {
            this.$axios.get("../../static/coun/"+coun+".json").then((resp)=> {
                this.predict_cases = resp.data.data.predict.value;
                this.actual_cases = resp.data.data.official_confirmed.value;
                this.remaining_cases = resp.data.data.Remain_confirm.value;
                // 设置表格属性
                let option_predict = {
                    title: {
                        text: "累计病例数",
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['预测确诊病例', '真实确诊病例'],
                        orient: 'horizontal',
                        x: 'center',
                        y: 'bottom',
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
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value',
                        show: true,
                        scale: true,
                        splitLine: {
                            show: false,
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
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['确诊存量'],
                        orient: 'horizontal',
                        x: 'center',
                        y: 'bottom',
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
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value',
                        show: true,
                        scale: true,
                        splitLine: {
                            show: false,
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
        background-color: seashell;
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
        width: 400px;
        padding: 0px;
        margin: 0px;
        width: 300px;
        background-color: transparent;
        text-align: left;
    }
    #predict {
        position: relative;
        left: 10px;
        bottom: 10px;
        width: 300px;
        height: 200px;
    }
    #remaining {
        position: relative;
        left: 10px;
        bottom: 10px;
        width: 300px;
        height: 200px;
    }
</style>