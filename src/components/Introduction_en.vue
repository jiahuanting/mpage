<template>
    <div id="introduction">
        <div class="container">
            <div class="row">
                <div class="article-container p-5">
                    <div class="title pb-5 pl-0">
                        <h1>Website Introduction</h1>
                    </div>
                    <div>
                        <p class="text-justify">
                            The visualization service of Global Epidemic Analysis and prediction (<a href="http://covid19-report.com/#/">http://covid19-report.com</a>) was developed by Bigscity, School of Computer Science, Beijing University of Aeronautics and Astronautics, it is divided into three columns: global new pneumonia epidemic forecast map, key national epidemic indicators monitoring map, China’s resumption of production map, each column will regularly update weekly data.
                        </p>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>1.	Forecast Map of Global Coronavirus (COVID-19) Epidemic</h4>
                        <p class="text-justify">
                            This work is based on Beihang University  COVID-19 Research Team’s original prediction model established during COVID-19 epidemic in China. We use global epidemic data to predict the development of COVID-19 pandemic in major outbreak countries except China.
                        </p>
                        <p class="text-justify">
                            The left column lists the data published by the main countries in the world. The map part in the middle shows the severity of each country’s epidemic in different colors. The graph part in the middle is the forecasting curve of epidemic for the selected country, which provides the forecast of confirmed cases, under treatment cases, death cases and cured cases, and shows the trend of the epidemic intuitively. Through the curve, we can see the scale and critical time of epidemic in the future by our prediction results. The right column lists the top 44 countries for the confirmed cases and infection rates in the next 14 days.
                        </p>
                        <div>
                            <a href="/#/forecasting"><img src="static/images/intro/pic_forecast.png" alt="FORECAST" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>2.	Monitor map of epidemic index</h4>
                        <p class="text-justify">
                            We continue to monitor the development of the epidemic worldwide, and try to use indicators such as R value and Double Index to measure the severity of the epidemic in each country in order to provide a visual tracking Index of the epidemic. R value is calculated based on the number of people diagnosed in the previous stages. This indicator represents the number of people infected during a patient’s illness, measures the ability of the virus to spread, and if it is less than 1, it indicates that the epidemic is in remission, and vice versa. Double Index is calculated according to the formula “d = The cumulative number of confirmed cases in the past 7 days/the cumulative number of confirmed cases in the past 7-14 days” . When this value is greater than 1, the epidemic situation in this area has not been brought under control in the past 14 days and the epidemic risk is higher; When the value is in a small position for a period of time, the epidemic situation can be judged to be under effective control. As the largest economy in the world and the most serious epidemic country in the world, the development of the epidemic situation of the United States has a decisive impact on the global anti-epidemic cause. The page structure is shown in figure, and the Middle Map section is the result of visualizing various metrics, including positive Rate and ICU Rate in addition to the R value and Double Index described above. Positive Rate was calculated using the formula “p = new diagnosis within 7 days/new test within 7 days” to approximate the proportion of infections in a population, rate was calculated using the formula “ICURATE = ICU demand/ICU capacity” , based on the results of the Institute for Health Metrics and Evaluation at the University of Washington. In the Russian outbreak indicator monitoring map, we have introduced the same indicator as the United States.
                        </p>
                        <div>
                            <a href="/#/r-value-world"><img src="static/images/intro/pic_r_world.jpg" alt="RESUMPTION" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>3.	Resumption of work and production in China</h4>
                        <p class="text-justify">
                            The map of resumption of work and production in China uses population mobility data to visualize the absence of work and resumption of work in cities. The upper part of the left column shows the general state of China including data such as recovery index, resumption index and absence index. The lower part of the left column lists GDP and resumption index of every province in China. The map part in the middle shows the state of resumption and absence of every city. The darker colors in the map, the smaller the resumption index in the resumption map and the greater absence index in the absence map. The graph part in the middle records the historical data of selected province’s resumption/absence index since February 10th. The right column shows the top 10 cities for population inflow and outflow after the Chinese New Year.
                        </p>
                        <div>
                            <a href="/#/resumption"><img src="static/images/intro/pic_resumption.png" alt="R" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>4.	Data Introduction</h4>
                        <p class="text-justify">
                            The data used on this website will be updated every day on the BIGSCity’s GitHub (<a href="https://github.com/bigscity/nCov-predict">https://github.com/bigscity/nCov-predict</a>). The following are provided:
                        </p>
                        <ul>
                            <li>predict-results: Our prediction about global Coronavirus COVID-19 pandemic.</li>
                            <li>lockout: Data about lockout of China.</li>
                            <li>resumption: Data about resumption of work of China.</li>
                            <li>R_values: Effective Reproductive Number (R-value) determined by temperature and humidity for the global Coronavirus (COVID-19) pandemic.</li>
                        </ul>
                    </div>
                    <div class="pt-3 pb-3">
                        <p>Homepage link: <a href="https://www.bigscity.com/">https://www.bigscity.com/</a></p>
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
