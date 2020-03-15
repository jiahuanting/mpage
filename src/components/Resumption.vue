<template>
    <div id="content" ref="content">
    <!--初始化Echarts-->
        <div id="mapbox" ref="mapbox"></div>
        <div id="inverse_card_left" ref="inverse_card_left" v-show="show_side_card"></div>
        <div id="inverse_card_right" ref="inverse_card_right" v-show="show_side_card"></div>
        <div id="inverse_card_bottom" ref="inverse_card_bottom" v-show="show_bottom_card"></div>
        <div id="show_button" ref="show_button">
            <Button :size="buttonSize" type="primary" @click="showCard">
                {{ this.show_side_card ? this.$store.state.zh_en === "zh" ? zh.buttonText3 : en.buttonText3 : this.$store.state.zh_en === "zh" ? zh.buttonText4 : en.buttonText4 }}

            </Button>
        </div>
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
import nameMap from '@/assets/NameMapProv';

const zh = {
    title1: "中国复工复产地图",
    title2: "中国复工复产地图",
    nav1: "中国疫情地图",
    nav2: "世界疫情地图",
    nav3: "复工复产地图",
    nav4: "疫情风险预测",
    legendText1: "复工指数",
    legendText2: "缺工指数",
    tooltip1: "2019 复工指数",
    tooltip2: "2020 复工指数",
    tooltip3: "2019 缺工指数",
    tooltip4: "2020 缺工指数",
    tooltip5: "恢复指数",
    cardTitle1: "GDP加权复工指数Top10",
    cardTitle2: "GDP加权缺工指数Top10",
    cardTitle3: "全国GDP加权复工指数",
    cardTitle4: "全国GDP加权缺工指数",
    buttonText1: "复工指数",
    buttonText2: "缺工指数",
    buttonText3: "隐藏图表",
    buttonText4: "显示图表",
    statement: "注：本网站由北京航空航天大学计算机学院智慧城市(BIGSCity)课题组完成，受到国家重点研发计划项目\"城市多样化场景模式挖掘与态势认知(2019YFB2102103)\"支持。",
};
const en = {
    title1: "China Map of Labor Resumption",
    title2: "China Map of Labor Resumption",
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
    tooltip5: "Recovery index",
    cardTitle1: "GDP-Weighted Resumption Index",
    cardTitle2: "GDP-Weighted Shortage Index",
    cardTitle3: "GDP-Weighted National Work Resumption Index",
    cardTitle4: "GDP-Weighted National Labor Shortage Index",
    buttonText1: "Resumption Index",
    buttonText2: "Shortage Index",
    buttonText3: "Hide Charts",
    buttonText4: "Show Charts",
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
            this.switchMap(this.viewType);
            this.initSideCard();
            this.switchBottomCard(this.viewType);
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
                    // 复工缺工指数数据在返回数据的"data"里
                    this.fugong = resp.data.fugong;
                    this.quegong = resp.data.quegong;
                    this.GDPWeightedResumption = resp.data.GDPWeightedResumption;
                    this.GDPWeightedShortage = resp.data.GDPWeightedShortage;
                    this.bottomCard_fugong = resp.data.bottomCard_fugong;
                    this.bottomCard_quegong = resp.data.bottomCard_quegong;
                    const myChart = echarts.init(this.$refs.mapbox);
                    this.myChart = myChart;
                    this.switchMap("resumption");
                    this.initSideCard();
                    this.switchBottomCard("resumption");
                })
            })

        },
        switchResumption() {
            this.viewType = "resumption";
            this.switchMap("resumption");
            this.switchBottomCard("resumption");
        },
        switchLack() {
            this.viewType = "lack";
            this.switchMap("lack");
            this.switchBottomCard("lack");
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
            if(map_name == "resumption") {
                // 2020年复工率最小最大值 0.0989 0.855
                let data_resumption = {
                    name: lang.title1,
                    formatter: function(params) {
                        if (params.data) {
                            return params.name + "<br>" + lang.tooltip2 + " : " + params.value;
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 1,
                        calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
                        inRange: {
                            color: ['#FF0000', "#DDDDDD"] //颜色
                        },
                        left: 'left',
                        textStyle: {
                            color: '#fff'
                        },
                    },  
                    data: this.fugong,
                };
                this.myChart.clear();
                this.myChart.setOption(this.base_option(data_resumption));
            } else {
                // 2020相对2019缺工率最小最大值 0.1302 196.0839
                let data_lack = {
                    name: lang.title2,
                    formatter: function(params) {
                        if (params.data) {
                            return params.name + "<br>" + lang.tooltip3 + " : " + params.value;
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 100,
                        calculable: false, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
                        inRange: {
                            color: ['#50a3ba','#d94e5d','#eac736'], //颜色
                        },
                        left: 'left',
                        textStyle: {
                            color: '#fff'
                        },
                        seriesIndex:0,
                    },
                    data: this.quegong,
                }
                this.myChart.clear();
                this.myChart.setOption(this.base_option(data_lack));
            }
        },
        initSideCard() {
            let lang = {};
            if(this.$store.state.zh_en === "zh") {
                lang = this.zh;
            } else {
                lang = this.en;
            }
            let cities_left = [];
            let values_left = [];
            this.GDPWeightedResumption.forEach((item)=>{
                cities_left.push(item.city);
                values_left.push(item.value);
            });
            let data_left = {
                name: lang.cardTitle1,
                key_list: cities_left,
                value_list: values_left,
            }
            let option_left = this.side_card_option(data_left);

            let cities_right = [];
            let values_right = [];
            this.GDPWeightedShortage.forEach((item)=>{
                cities_right.push(item.city);
                values_right.push(item.value);
            })
            let data_right = {
                name: lang.cardTitle2,
                key_list: cities_right,
                value_list: values_right,
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
        switchBottomCard(map_name) {
            let lang = {};
            if(this.$store.state.zh_en === "zh") {
                lang = this.zh;
            } else {
                lang = this.en;
            }
            let opt = {};
            if(map_name == "resumption") {
                opt.title = lang.cardTitle3;
                opt.xAxis = this.bottomCard_fugong.dateList;
                opt.value = this.bottomCard_fugong.value;
            } else {
                opt.title = lang.cardTitle4;
                opt.xAxis = this.bottomCard_quegong.dateList;
                opt.value = this.bottomCard_quegong.value;
            }
            let option = {
                // backgroundColor: '#080b30',
                title: {
                    text: opt.title,
                    textStyle: {
                        align: 'center',
                        color: '#fff',
                        fontSize: 18,
                    },
                    top: '2%',
                    left: 'center',
                },
                grid: {
                    top: '15%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    axisLine: {
                        show: true
                    },
                    splitArea: {
                        // show: true,
                        color: '#f00',
                        lineStyle: {
                            color: '#f00'
                        },
                    },
                    axisLabel: {
                        color: '#fff'
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: false,
                    data: opt.xAxis,
                }],

                yAxis: [{
                    type: 'value',
                    min: 0,
                    // max: 140,
                    splitNumber: 4,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                        margin: 20,
                        textStyle: {
                            color: '#d1e6eb',

                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: {
                    name: opt.name,
                    type: 'line',
                    showAllSymbol: false,
                    symbol: 'circle',
                    symbolSize: 5,
                    lineStyle: {
                        normal: {
                            color: "#6c50f3",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#fff',
                        }
                    },
                    itemStyle: {
                        color: "#6c50f3",
                        borderColor: "#fff",
                        borderWidth: 3,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    tooltip: {
                        show: false
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(108,80,243,0.3)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(108,80,243,0)'
                                }
                            ], false),
                            shadowColor: 'rgba(108,80,243, 0.9)',
                            shadowBlur: 20
                        }
                    },
                    data: opt.value,
                },
            };
            this.show_bottom_card = true;
            let myBottomCard = echarts.init(this.$refs.inverse_card_bottom);
            myBottomCard.setOption(option);
            this.myBottomCard = myBottomCard;
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
        // 显示侧边图表
        showCard() {
            this.show_side_card = this.show_side_card ? false : true;
            this.show_bottom_card = this.show_bottom_card ? false : true;
        },
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
                        fontSize: 18,
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
            let option = {
                timeline: {
                    data: [],
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 2000,
                    left: '20%',
                    right: '20%',
                    top: '3%',
                    width: '60%',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    symbolSize: 10,
                    lineStyle: {
                        color: '#fff'
                    },
                    checkpointStyle: {
                        borderColor: '#777',
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: true,
                        showPrevBtn: true,
                        normal: {
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },

                },
                baseOption: {
                    animation: true,
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    animationDurationUpdate: 1000,
                    animationEasingUpdate: 'cubicInOut',
                    tooltip: {
                        formatter: data.formatter,
                    },
                    geo: {
                        map: "china-cities",
                        roam: true,
                        scaleLimit: {
                            min: 1,
                            max: 10,
                        },
                        zoom: 1.0,
                        label: {
                            normal: {
                                show: false,
                                fontSize: 10,
                                color: "black",
                            },
                        },
                        background: "#aaa",
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
                },
                options: []
            };
            let dateList = [];
            let cityList = data.data.city;
            for(let i = 0; i < data.data.data.length; i++) {
                let temp = data.data.data[i].value;
                dateList.push(data.data.data[i].date);
                let daily = [];
                for(let i = 0; i < temp.length; i++) {
                    daily.push({
                        name: cityList[i],
                        value: temp[i]
                    })
                }
                option.options.push({
                    title: {
                        text: data.name,
                        subtext: '北京航空航天大学智慧城市课题组',
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
                    visualMap: [ data.visualMap ],
                    
                    series: {
                        name: "复工率",
                        type: "map",
                        geoIndex: 0,
                        data: daily,
                    }
                });
            }
            option.timeline.data = dateList;
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
        position: absolute;
        height: calc(100% - 1px);
        width: calc(100% - 1px);
        padding: 0px;
        margin: 0px;
    }
    #inverse_card_left {
        position: absolute;
        width: 350px;
        height: 380px;
        background-color: rgba(0, 0, 0, 0.3);
        top: 100px;
        left: 10px;
        min-width: 350px;
        max-width: 350px;
        z-index: 100;
    }
    #inverse_card_right {
        position: absolute;
        width: 350px;
        height: 380px;
        background-color: rgba(0, 0, 0, 0.3);
        top: 100px;
        right: 10px;
    }
    #inverse_card_bottom {
        position: absolute;
        width: 800px;
        height: 200px;
        background-color: rgba(0, 0, 0, 0.3);
        bottom: 10px;
        left: calc(50% - 400px);
    }
    #select_button {
        position: absolute;
        width: 600px;
        height: 50px;
        right: 1%;
        bottom: 1%;
    }
    #show_button {
        position: absolute;
        width: 100px;
        /*height: 50px;*/
        /*right: 15px;*/
        height: 5%;
        right: 3%;
        top: 10px;
    }
</style>
