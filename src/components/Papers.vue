<template>
    <div id="papers">
        <div class="container">
            <div class="row">
                <div class="papercontainer p-5">
                    <h3 class="text-justify">High Temperature and High Humidity Reduce the Transmission of COVID-19</h3>
                    <h5 style="font-family: Georgia, 'Times New Roman', Times, serif;">Jingyuan Wang, Ke Tang, Kai Feng and Weifeng Lv</h5>
                    <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3551767"><i>Download</i></a>
                    <hr/>
                    <div class="text-justify">
                        <p><strong>One Sentence Summary: </strong>High Temperature and High Humidity Reduce the Transmission of COVID-19.</p>
                        <p><strong>Abstract. </strong>This paper investigates the influence of air temperature and relative humidity on the transmission of COVID-19. After estimating the serial interval of COVID-19 from 105 hand-collected pairs of the virus carrier and the infected, we calculate the daily effective reproductive number, R, for each of all 100 Chinese cities with more than 40 cases. Using the daily R values from January 21 to 23, 2020 as proxies of nonintervened transmission intensity, we find, under a linear regression framework, high temperature and high humidity significantly reduce the transmission of COVID-19, respectively. One-degree Celsius increase in temperature and one percent increase in relative humidity lower R by 0.0225 and 0.0158, respectively. This result is consistent with the fact that the high temperature and high humidity reduce the transmission of influenza and SARS. It indicates that the arrival of summer and rainy season in the northern hemisphere can effectively reduce the transmission of the COVID-19. We also developed a website to provide R of major cities around the world according to their daily temperature and relative humidity: <a href="http://covid19-report.com/#/r-value">http://covid19-report.com/#/r-value</a></p>
                    </div>
                    <div style="text-align: center;">
                        <img src="static/images/paper/r-values-in-march.jpg" alt="" width="60%" class="img-rounded p-3">
                        <p style="font-size: 14px;">Figure 1: R values in March</p>
                    </div>
                    <div style="text-align: center;">
                        <img src="static/images/paper/r-values-in-july.jpg" alt="" width="60%" class="img-rounded p-3">
                        <p style="font-size: 14px;">Figure 2: R values in July</p>
                    </div>

                </div>
                <div class="papercontainer p-5">
                    <h3 class="text-justify">When is the COVID-19 Pandemic Over? Evidence from the Stay-at-home Policy Execution in 106 Chinese Cities</h3>
                    <h5 style="font-family: Georgia, 'Times New Roman', Times, serif;">Jingyuan Wang, Ke Tang, Kai Feng and Weifeng Lv</h5>
                    <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3551767"><i>Download</i></a>
                    <hr/>
                    <div class="text-justify">
                        <p><strong>Abstract. </strong>As more and more countries have employed stay-at-home policy to halt the spread of COVID-19, the effectiveness of this policy has become an important question to both researchers and policymakers. To answer this question, our paper empirically measures the effect of stay-at-home policy on the control of COVID-19. Using the citylevel Baidu Mobility Index, measured by the total number of outside travels per day divided by the resident population, we find that reducing the number of outings can effectively decrease the new-onset cases; a 1% decline in the outing number will reduce about 1% of the new-onset-cases growth rate in 7 days (one serial interval). The critical level is a 50% drop in mobility, in which case the number of new-onset cases is lower than it was 7 days before, and hence the epidemic will gradually disappear holding this policy long enough. A strong stay-at-home policy execution with a short duration has a smaller economic cost than a loose execution with a long duration. For example, the mobility in Wuhan is down 85% after lockdown, in which case we estimate the number of new-onset cases is reduced by 50% in only 12 days.</p>
                    </div>
                    <div style="text-align: center;">
                        <img src="static/images/paper/half-lives.jpg" alt="" width="60%" class="img-rounded p-3">
                        <p style="font-size: 14px;">Figure 1: Half-lives vs. levels of mobility drops (%)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "papers",
    }
</script>
<style scoped>
body {
    background-color: #fff;
}

#papers {
    background: #fff;
    width: auto;
    height: auto;
    font-size: 18px;
}

hr {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  border-color: #EEEEEE -moz-use-text-color #FFFFFF;
  border-style: solid none #aaa;
  border-width: 3px 0;
  margin: 30px 0;
}
</style>