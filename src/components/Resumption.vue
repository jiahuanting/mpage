<template>
    <div id="content" ref="content">
    <!--初始化Echarts-->
        <div id="mapbox" ref="mapbox"></div>
        <div id="inverse_card_left" ref="inverse_card_left" v-show="show_side_card"></div>
        <div id="inverse_card_right" ref="inverse_card_right" v-show="show_side_card"></div>
        <div id="inverse_card_bottom" ref="inverse_card_bottom" v-show="show_bottom_card"></div>
        <div id="select_button" ref="select_button">
            <ButtonGroup :size="buttonSize" style="float: right;">
                <Button :size="buttonSize" type="primary" @click="switchResumption">
                    <Icon type="ios-arrow-back" />
                    {{ this.$store.state.zh_en === "zh" ? zh.buttonText1 : en.buttonText1 }}
                </Button>
                <Button :size="buttonSize" type="primary" @click="switchLack">
                    {{ this.$store.state.zh_en === "zh" ? zh.buttonText2 : en.buttonText2 }}
                    <Icon type="ios-arrow-forward" />
                </Button>
            </ButtonGroup>
        </div>
    </div>
</template>
  
<script>
import echarts from 'echarts';
// import * as echarts from '../static/echarts.min';
// import 'echarts/map/js/china.js';
import nameMap from '@/assets/NameMapProv';
const config = {
    fontColor: "#fff",
};
const zh = {
    title1: "国内复工指数统计",
    title2: "国内缺工指数统计",
    nav1: "中国疫情地图",
    nav2: "世界疫情地图",
    nav3: "复工情况",
    nav4: "疫情风险预测",
    legendText1: "复工指数",
    legendText2: "缺工指数",
    tooltip1: "2019 复工指数",
    tooltip2: "2020 复工指数",
    tooltip3: "2019 缺工指数",
    tooltip4: "2020 缺工指数",
    tooltip5: "相对指数",
    cardTitle1: " : 近七日迁出去向前十位的城市",
    cardTitle2: " : 近七日迁入来源前十位的城市",
    buttonText1: "复工指数",
    buttonText2: "缺工指数",
    statement: "注：本网站由北京航空航天大学计算机学院智慧城市(BIGSCity)课题组完成，受到国家重点研发计划项目\"城市多样化场景模式挖掘与态势认知(2019YFB2102103)\"支持。",
};
const en = {
    title1: "National Labor Resumption Index",
    title2: "National Labor Shortage Index",
    nav1: "China Epidemic Map",
    nav2: "World Epidemic Map",
    nav3: "Labor Resumption",
    nav4: "Epidemic Risk Forecast",
    legendText1: "Laber Resumption Index",
    legendText2: "Labor Shortage Index",
    tooltip1: "2019 Resumption Index",
    tooltip2: "2020 Resumption Index",
    tooltip3: "2019 Shortage Index",
    tooltip4: "2020 Shortage Index",
    tooltip5: "Relative Index",
    cardTitle1: " : Top 10 Move-out Destination Last Week",
    cardTitle2: " : Top 10 Move-in Source Last Week",
    buttonText1: "Resumption Index",
    buttonText2: "Shortage Index",
    statement: "This website is developed by BIGSCity research group, School of Computer Science, Beihang University, and supported by the National Key Research and Development Program \" Pattern Mining and Situation Recognition of Urban Diversified Scenes (2019YFB2102103)\"",
};


export default {
    name: 'Resumption',
    data () {
        return {
            current_map: "",
            en: en,
            zh: zh,
            show_side_card: false,
            show_bottom_card: false,
            viewType: "resumption",
            buttonSize: "large",
            current_city: {},
        }
    },
    computed: {
        zh_en_signal: function() {
            return this.$store.state.zh_en;
        }
    },
    watch: {
        zh_en_signal: function(val, oldval) {
            this.initMap();
            this.initSideCard(this.current_city);
        }
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.$axios.get("../../static/map/china-cities.json").then((resp)=>{
                echarts.registerMap("china-cities", resp.data);
                this.$axios.get("../../static/resumption.json").then((resp)=>{
                    this.resumption_data = resp.data.map((item)=>{
                        return {
                            name: item.name,
                            value: item.work_resumption_2020,
                            values: {
                                work_resumption_2019: item.work_resumption_2019,
                                work_resumption_2020: item.work_resumption_2020,
                                ratio: item.ratio,
                                move_in_last_7_days: item.move_in_last_7_days,
                                move_out_last_7_days: item.move_out_last_7_days
                            }
                        }
                    });
                    this.lack_data = resp.data.map((item)=>{
                        return {
                            name: item.name,
                            value: item.lack_of_work_2020,
                            values: {
                                lack_of_work_2019: item.lack_of_work_2019,
                                lack_of_work_2020: item.lack_of_work_2020,
                                move_in_last_7_days: item.move_in_last_7_days,
                                move_out_last_7_days: item.move_out_last_7_days
                            }
                        }
                    });
                    
                    const myChart = echarts.init(this.$refs.mapbox);
                    this.myChart = myChart;
                    this.switchMap("resumption");
                })
            })

        },
        switchResumption() {
            this.switchMap("resumption");
        },
        switchLack() {
            this.switchMap("lack");
        },
        // 先为地图去掉绑定的点击事件再重新设定
        // this.myChart.off("click");
        switchMap(map_name) {
            let lang = {};
            if(this.$store.state.zh_en === "zh") {
                lang = this.zh;
            } else {
                lang = this.en;
            }
            console.log(lang);
            if(map_name == "resumption") {
                // 2020年复工率最小最大值 0.0989 0.855
                let data_resumption = {
                    name: lang.title1,
                    formatter: function(params) {
                        if (params.data) {
                            return params.name + "<br>" + lang.tooltip1 + " : " + params.data.values.work_resumption_2019 + "<br>" + lang.tooltip2 + " : " + params.data.values.work_resumption_2020 + "<br>" + lang.tooltip5 + " : " + params.data.values.ratio;
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 1,
                        calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
                        inRange: {
                            color: ['aqua', 'darkblue'] //颜色
                        },
                        left: 'left',
                        textStyle: {
                            color: '#fff'
                        },
                    },  
                    data: this.resumption_data,
                };
                this.myChart.clear();
                this.myChart.setOption(this.base_option(data_resumption));
                this.myChart.on('click', (params) => {
                    this.initSideCard(params);
                });
            } else {
                console.log("切换到lack of work地图");
                // 2020相对2019缺工率最小最大值 0.1302 196.0839
                let data_lack = {
                    name: lang.title2,
                    formatter: function(params) {
                        if (params.data) {
                            return params.name + "<br>" + lang.tooltip3 + " : " + params.data.values.lack_of_work_2019 + "<br>" + lang.tooltip4 + " : " + params.data.values.lack_of_work_2020;
                        }
                    },
                    visualMap: {
                        type: 'piecewise',
                        show: true,
                        pieces: [
                            {gt: 160, label: lang.legendText2 +' > 160'},  
                            {gt: 120, lte: 160},        
                            {gt: 80, lte: 120},
                            {gt: 40, lte: 80},
                            {gt: 20, lte: 40},
                            {gte: 10, lte: 20},
                            {lte: 10, label: lang.legendText2 + ' < 10'},
                        ],
                        left: 'left',
                        color: ['#d94e5d','#eac736','#50a3ba'],
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#fff',
                        },
                        seriesIndex:0,
                    },
                    data: this.lack_data,
                }
                this.myChart.clear();
                this.myChart.setOption(this.base_option(data_lack));
                this.myChart.on('click', (params) => {
                    this.initSideCard(params);
                });
            }
        },
        initSideCard(params) {
            this.current_city = params;
            let lang = {};
            if(this.$store.state.zh_en === "zh") {
                lang = this.zh;
            } else {
                lang = this.en;
            }
            let key_value_left = this.transformData(params.data.values.move_in_last_7_days);
            let data_left = {
                name: params.name + lang.cardTitle1,
                key_list: key_value_left.key_list,
                value_list: key_value_left.value_list,
            }
            let option_left = this.side_card_option(data_left);

            let key_value_right = this.transformData(params.data.values.move_out_last_7_days)
            let data_right = {
                name: params.name + lang.cardTitle2,
                key_list: key_value_right.key_list,
                value_list: key_value_right.value_list,
            }
            let option_right = this.side_card_option(data_right);

            let myLeftCard = echarts.init(this.$refs.inverse_card_left);
            let myRightCard = echarts.init(this.$refs.inverse_card_right);
            this.show_side_card = true;
            myLeftCard.setOption(option_left);
            myRightCard.setOption(option_right);
            this.myLeftCard = myLeftCard;
            this.myRightCard = myRightCard;
        },
        transformData(dict) {
            let key_list = [];
            let value_list = [];
            dict.forEach(element => {
                key_list.push(element.name);
                value_list.push(element.value);
            });
            return {
                key_list: key_list,
                value_list: value_list,
            }
        },
        // 显示底部图表

        // 返回侧边图表option
        side_card_option(data) {
            let myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
            let option = {
                title: {
                    text: data.name,
                    x: 20,
                    y: 10,
                    textStyle: {
                        color: "#fff",
                        fontSize: 14,
                    }
                },
                // backgroundColor: '#0e2147',
                grid: {
                    left: '11%',
                    top: '12%',
                    right: '20%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    show: false,
                },
                yAxis: {
                    axisTick: 'none',
                    axisLine: 'none',
                    offset: '27',
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '16',
                        }
                    },
                    data: data.key_list,
                },
                series: {
                    name: '条',
                    type: 'bar',
                    yAxisIndex: 0,
                    data: data.value_list,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: '#ffffff',
                                fontSize: '16',
                            }
                        }
                    },
                    barWidth: 12,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var num = myColor.length;
                                return myColor[params.dataIndex % num]
                            },
                        }
                    },
                    z: 2
                },
            }
            return option;
        },
        base_option(data) {
            console.log(data.visualMap);
            let option = {
                title: {
                    text: data.name,
                    subtext: 'BUAA BIGSCITY Research',
                    sublink: 'http://www.bigscity.com',
                    x: "center",
                    left: "left",
                    textStyle: {
                        fontSize: 30,
                        color: '#fff',
                    },
                    top: '20px'
                },
                backgroundColor: "rgb(11, 53, 102)", //背景颜色
                tooltip: {
                    formatter: data.formatter,
                },
                visualMap: [ data.visualMap ],
                geo: {
                    map: "china-cities",
                    roam: true,
                    scaleLimit: {
                        min: 1,
                        max: 10,
                    },
                    zoom: 1.2,
                    label: {
                        normal: {
                            show: false,
                            fontSize: 10,
                            color: "black",
                        },
                    },
                    background: "#aaa",
                    // show: false,
                    emphasis: {
                        label: {
                            //控制对应地区的汉字
                            show: true,
                            color: '#fff',
                            fontSize: 18
                        },
                        itemStyle: {
                            areaColor: '#eee',
                        },
                    },
                },
                series: {
                    name: "复工率",
                    type: "map",
                    geoIndex: 0,
                    data: data.data,
                }
            };
            return option;
        },// base_option
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
        height: calc(100% - 1px);
        width: calc(100% - 1px);
        padding: 0px;
        margin: 0px;
    }
    #inverse_card_left {
        position: absolute;
        width: 400px;
        height: 500px;
        background-color: rgba(0, 0, 0, 0.3);
        top: 100px;
        left: 10px;
    }
    #inverse_card_right {
        position: absolute;
        width: 400px;
        height: 500px;
        background-color: rgba(0, 0, 0, 0.3);
        top: 100px;
        right: 10px;
    }
    #inverse_card_bottom {
        position: absolute;
        width: 800px;
        height: 200px;
        background-color: rgba(0, 0, 0, 0.3);
        bottom: 20px;
        left: calc(50% - 400px);
    }
    #select_button {
        position: absolute;
        width: 400px;
        height: 50px;
        right: 10px;
        bottom: 10px;
    }
</style>