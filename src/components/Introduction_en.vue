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
                            This website (<a href="http://covid19-report.com/#/">http://covid19-report.com</a>) was developed by the Beihang University  COVID-19 Research Team, whose members are from Big Data Intelligence Group on Smart City (BIGSCity) lab in School of Computer Science and Engineering of Beihang University. The website provides three visual maps related to the COVID-19 pandemic: Forecast Map of Global Coronavirus (COVID-19) Epidemic, the map of Resumption of work and production in China, and the map of Effective Reproductive Number (R-value) of COVID-19 determined by Temperature and Humidity. The website will update data regularly every day.
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
                        <h4>2.	Resumption of work and production in China</h4>
                        <p class="text-justify">
                            The map of resumption of work and production in China uses population mobility data to visualize the absence of work and resumption of work in cities. 
                        </p>
                        <p class="text-justify">
                            The upper part of the left column shows the general state of China including data such as recovery index, resumption index and absence index. The lower part of the left column lists GDP and resumption index of every province in China. The map part in the middle shows the state of resumption and absence of every city. The darker colors in the map, the smaller the resumption index in the resumption map and the greater absence index in the absence map. The graph part in the middle records the historical data of selected province’s resumption/absence index since February 10th. The right column shows the top 10 cities for population inflow and outflow after the Chinese New Year.
                        </p>
                        <div>
                            <a href="/#resumption/"><img src="static/images/intro/pic_resumption.png" alt="RESUMPTION" width="100%" class="img-rounded p-3"></a>
                        </div>
                    </div>
                    <div class="pt-3 pb-3">
                        <h4>3.	Effective Reproductive Number (R-value) of COVID-19 determined by Temperature and Humidity</h4>
                        <p class="text-justify">
                            The visualization work of this section based on the paper "High Temperature and High Humidity Reduce the Transmission of COVID-19" of the team. For details of this part, you can read this paper. Here is the paper’s link: <a href="https://ssrn.com/abstract=3551767">https://ssrn.com/abstract=3551767</a>.
                        </p>
                        <p class="text-justify">
                            The graph in the left column shows the temperature, humidity and R-value (effective regeneration number) of the past 7 days according to the selected point or area in the map. The below of the graph lists the temperature, humidity and corresponding R-value of major cities in each country in the world. The map part in the middle shows the epidemic risk based on R-value calculated by temperature and humidity of each city. The graph part in the middle gives R-value in every 10 days which is calculated by historical weather data and 2020 weather data. The right column lists the top 20 cities with highest and lowest epidemic risk index, which is calculated by R-value and population size of each city.
                        </p>
                        <div>
                            <a href="/#/r-value"><img src="static/images/intro/r.png" alt="R" width="100%" class="img-rounded p-3">'</a>
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
                        <h4>5.	Others</h4>
                        <p class="text-justify">
                            In addition, the Global COVID-19 epidemic evaluation and prediction report can also be available through the BIGSCity’s homepage.
                        </p>
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
