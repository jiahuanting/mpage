import Vue from 'vue';
import Router from 'vue-router';
import ResumptionCN from '@/components/Resumption';
import ForecastingCN from '@/components/Forecasting';
import ResumptionEN from '@/components/Resumption_en';
import ForecastingEN from '@/components/Forecasting_en';
import WeatherEffects from '@/components/WeatherEffects';
import IntroductionEN from '@/components/Introduction_en';
import IntroductionCN from '@/components/Introduction';
import Papers from '@/components/Papers';
import World from '@/components/World';
import USA from '@/components/USA';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Forecasting_home',
      component: ForecastingEN,
      meta: {
        title: "Forecast Map of Global Coronavirus (COVID-19) Epidemic",
      }
    },
    // introduction
    {
      path: '/introduction',
      name: 'IntroductionEN',
      component: IntroductionEN,
      meta: {
        title: "Forecast Map of Global Coronavirus (COVID-19) Epidemic",
      }
    },
    {
      path: '/introduction_cn',
      name: 'IntroductionCN',
      component: IntroductionCN,
      meta: {
        title: "COVID-2019疫情地图",
      }
    },
    // forecasting
    {
      path: '/forecasting_cn',
      name: 'ForecastingZH',
      component: ForecastingCN,
      meta: {
        title: "世界疫情预测地图",
      }
    },
    {
      path: '/forecasting',
      name: 'ForecastingEN',
      component: ForecastingEN,
      meta: {
        title: "Forecast Map of Global Coronavirus (COVID-19) Epidemic",
      }
    },
    // resumption
    {
      path: '/resumption_cn',
      name: 'ResumptionZH',
      component: ResumptionCN,
      meta: {
        title: "中国复工复产地图",
      }
    },
    {
      path: '/resumption',
      name: 'ResumptionEN',
      component: ResumptionEN,
      meta: {
        title: "Resumption of work and production in China",
      }
    },
    // weather effects
    {
      path: '/weather-effects',
      name: 'Rvalue',
      component: WeatherEffects,
      meta: {
        title: "Effective Reproductive Number of COVID-19 determined by T&H",
      }
    },
    // papers
    {
      path: '/papers',
      name: 'Papers',
      component: Papers,
      meta: {
        title: "Papers",
      }
    },
    // world and usa r-value
    {
      path: '/world-r-value',
      name: 'World',
      component: World,
      meta: {
        title: "World R Value",
      }
    },
    {
      path: '/usa-r-value',
      name: 'USA',
      component: USA,
      meta: {
        title: "USA R Value",
      }
    }

  ]
})
