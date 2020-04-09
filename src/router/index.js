import Vue from 'vue';
import Router from 'vue-router';
import ResumptionCN from '@/components/Resumption';
import ForecastingCN from '@/components/Forecasting';
import ResumptionEN from '@/components/Resumption_en';
import ForecastingEN from '@/components/Forecasting_en';
import Rvalue from '@/components/Rvalue';
import IntroductionEN from '@/components/Introduction_en';
import IntroductionCN from '@/components/Introduction';
import Papers from '@/components/Papers';

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
    {
      path: '/forecasting_cn',
      name: 'ForecastingZH',
      component: ForecastingCN,
      meta: {
        title: "世界疫情预测地图",
      }
    },
    {
      path: '/resumption_cn',
      name: 'ResumptionZH',
      component: ResumptionCN,
      meta: {
        title: "中国复工复产地图",
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
    {
      path: '/forecasting_en',
      name: 'ForecastingEN_old',
      component: ForecastingEN,
      meta: {
        title: "Forecast Map of Global Coronavirus (COVID-19) Epidemic",
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
    {
      path: '/resumption_en',
      name: 'ResumptionEN_old',
      component: ResumptionEN,
      meta: {
        title: "Resumption of work and production in China",
      }
    },
    {
      path: '/r-value',
      name: 'Rvalue',
      component: Rvalue,
      meta: {
        title: "Effective Reproductive Number of COVID-19 determined by T&H",
      }
    },
    {
      path: '/papers',
      name: 'Papers',
      component: Papers,
      meta: {
        title: "Papers",
      }
    }
  ]
})
