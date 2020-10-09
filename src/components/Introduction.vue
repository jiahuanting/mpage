<template>
    <div id="introduction">
        <div class="container">
            <div class="row">
                <div class="article-container p-5">
                    <div class="title pb-5 pl-0">
                        <h1>网站介绍</h1>
                    </div>
                    <div>
                        <p class="text-justify">
                            全球疫情分析预测可视化服务（网址：<a href="http://covid19-report.com/">http://covid19-report.com/</a>）是由北京航空航天大学计算机学院智慧城市课题组（BIGSCity）开发，主要分为三个栏目：全球新冠肺炎疫情预测地图、重点国家疫情指标监控地图、中国复工复产地图，每个栏目每周会定时更新数据。
                        </p>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>一、	全球新冠肺炎疫情预测地图</h4>
                        <p class="text-justify">
                            全球新冠肺炎疫情预测工作是基于中国疫情期间的疫情数据建立的预测模型，利用全球疫情数据来预测全球主要疫情国家（除中国以外）的疫情发展。左边一栏是全球主要疫情国家公布的疫情数据；中间地图部分用不同颜色展示了各个国家的疫情严重程度；中间图表部分是对所选国家的疫情的预测曲线，分别提供了累计确诊预测曲线、在治患者数预测曲线、死亡数预测曲线以及治愈数预测曲线，直观地展示了疫情发展的趋势，通过曲线我们可以看到疫情未来的发展规模以及关键节点的时间范围等模型预测结果；右边一栏列出了未来14天确诊人数以及感染率的预测结果前44名的国家（排名中含除中国外的全球数据）。
                        </p>
                        <div>
                            <a href="/#/forecasting_cn"><img src="static/images/intro/pic_forecast_cn.png" alt="FORECAST" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>二、	疫情指标监控地图</h4>
                        <p class="text-justify">
                            我们持续关注世界范围内的疫情发展状况，并尝试用R value以及Double Index等指标衡量各个国家疫情的严重程度，以期提供一种直观的疫情跟踪指标。R value根据前面多个阶段的确诊人数计算得到，该指标表示一名患者在患病期间感染的人数，衡量病毒的传播能力，如果该指标小于1，则表示疫情正处于缓解过程中，反之亦然。Double Index根据公式“D=过去7日内的累计确诊数/过去7-14日的累计确诊数”计算得出，当该值大于1，说明过去14天内该地区的疫情仍然没有控制住，疫情风险较大；当该值在一段时间内都处于一个较小的位置，则可以判断疫情得到了有效的控制。美国作为全球最大的经济体，同时也是世界范围内疫情最严重的国家，其疫情发展状况对全球抗疫事业有决定性的影响，为此我们重点关注了美国的疫情相关指标。页面结构如图所示，中间地图部分是对各种指标的可视化结果，除上述R value以及Double Index以外，还包含了positive rate和ICU Rate。其中Positive Rate使用公式“P=7日内新增确诊/7日内新增检测”计算得出，用于大致衡量人群中的感染比例，ICU Rate采用华盛顿大学的“卫生指标与评估研究所”（Institute for Health Metrics and Evaluation）的评估结果，使用公式“ICURate=ICU需求量/ICU容量”计算得出，可以衡量当地医疗资源的供给情况。在俄罗斯疫情指标监控地图中，我们引入了与美国同样的指标。
                        </p>
                        <div>
                            <a href="/#/r-value-world"><img src="static/images/intro/pic_r_world.jpg" alt="RESUMPTION" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>三、	中国复工复产地图</h4>
                        <p class="text-justify">
                            中国的复工复产地图利用人口流动数据对城市的缺工以及复工情况进行可视化展示。左边一栏的上方是全国的恢复指数、复工指数以及缺工指数的总体数据，下方是全国各省、市、自治区的复工指数；中间地图部分是以市为粒度展示了复工情况和缺工情况，复工地图中复工指数越小颜色越深复工程度也就越低，缺工地图中缺工指数越大颜色越深表示缺工情况越严重；中间图表部分是所选中的省、市、自治区自2月10号以后复工/缺工指数的历史数据曲线；右边一栏展示了年后人口流入和流出前10的城市。
                        </p>
                        <div>
                            <a href="/#/resumption_cn/"><img src="static/images/intro/pic_resumption_cn.png" alt="R" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>四、	数据介绍</h4>
                        <p class="text-justify">
                            网站所使用的数据在课题组的GitHub（<a href="https://github.com/bigscity/nCov-predict">https://github.com/bigscity/nCov-predict</a>）上每周会进行更新。提供的数据包括：
                        </p>
                        <ul>
                            <li>predict-results：提供了全球新冠肺炎疫情预测数据。</li>
                            <li>lockout：提供了中国的缺工率数据。</li>
                            <li>resumption：提供了中国的复功率数据</li>
                            <li>R_values：给出了由温度和湿度决定的全球新型冠状病毒(COVID-19)大流行的有效再生数。</li>
                        </ul>
                    </div>
                    <div class="pt-3 pb-3">
                        <p>主页链接： <a href="https://www.bigscity.com/">https://www.bigscity.com/</a></p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Introduction",
    }
</script>
<style scoped>
body {
    background-color: #fff;
}

#introduction {
    background: #fff;
    width: auto;
    height: auto;
    font-size: 18px;
}
</style>
