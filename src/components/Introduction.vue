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
                            全球疫情分析预测可视化服务（网址：<a href="http://covid19-report.com/">http://covid19-report.com/</a>）是由北京航空航天大学计算机学院智慧城市课题组（BIGSCity）开发，主要分为3个栏目：全球新冠肺炎疫情预测地图、中国复工复产地图以及全球气候对疫情传播影响等可视化地图，每个栏目每天会定时更新数据。
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
                        <h4>二、	中国复工复产地图</h4>
                        <p class="text-justify">
                            中国的复工复产地图利用人口流动数据对城市的缺工以及复工情况进行可视化展示。左边一栏的上方是全国的恢复指数、复工指数以及缺工指数的总体数据，下方是全国各省、市、自治区的复工指数；中间地图部分是以市为粒度展示了复工情况和缺工情况，复工地图中复工指数越小颜色越深复工程度也就越低，缺工地图中缺工指数越大颜色越深表示缺工情况越严重；中间图表部分是所选中的省、市、自治区自2月10号以后复工/缺工指数的历史数据曲线；右边一栏展示了年后人口流入和流出前10的城市。
                        </p>
                        <div>
                            <a href="/#/resumption_cn"><img src="static/images/intro/pic_resumption_cn.png" alt="RESUMPTION" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>三、	温度与湿度对全球疫情传播的影响</h4>
                        <p class="text-justify">
                            该板块内容是根据团队的文章《High Temperature and High Humidity Reduce the Transmission of COVID-19》进行的可视化工作。关于这一部分工作的详细内容可以阅读这篇文章，文章链接：<a href="https://ssrn.com/abstract=3551767">https://ssrn.com/abstract=3551767</a>.
                        </p>
                        <p class="text-justify">
                            左边一栏上方的曲线图是根据地图中选中的点或区域来展示其近7天的温度、湿度以及R-value数据（有效再生数），下方是全球每个国家的主要城市的温度、湿度以及相应的R-value数据；中间地图部分是根据温度、湿度计算出的R-value来绘制的每个城市的疫情风险地图，还可以通过；中间图表部分是根据历史的气象数据以及2020年气象数据计算出的每十天的R-value值；右边一栏是根据温度、湿度计算出的R-value以及城市的人口规模来对各个城市疫情风险进行排名，这里列出了风险等级最高和最低的前20名城市。
                        </p>
                        <div>
                            <a href="/#r-value"><img src="static/images/intro/r_cn.png" alt="R" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>四、	数据介绍</h4>
                        <p class="text-justify">
                            网站所使用的数据在课题组的GitHub（<a href="https://github.com/bigscity/nCov-predict">https://github.com/bigscity/nCov-predict</a>）上每日会进行更新。提供的数据包括：
                        </p>
                        <ul>
                            <li>predict-results：提供了全球新冠肺炎疫情预测数据。</li>
                            <li>lockout：提供了中国的缺工率数据。</li>
                            <li>resumption：提供了中国的复功率数据</li>
                            <li>R_values：给出了由温度和湿度决定的全球新型冠状病毒(COVID-19)大流行的有效再生数。</li>
                        </ul>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>五、	其他说明</h4>
                        <p class="text-justify">
                            本课题组除了以上数据，还可以通过课题组的主页来获取每日的全球疫情预测与分析报告。
                        </p>
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
