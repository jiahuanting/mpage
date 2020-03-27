import Vue from 'vue';
import Router from 'vue-router';
import ResumptionZH from '@/components/Resumption';
import ForecastingZH from '@/components/Forecasting';
import ResumptionEN from '@/components/Resumption_en';
import ForecastingEN from '@/components/Forecasting_en';

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
      path: '/forecasting_cn',
      name: 'ForecastingZH',
      component: ForecastingZH,
      meta: {
        title: "世界疫情预测地图",
      }
    },
    {
      path: '/resumption_cn',
      name: 'ResumptionZH',
      component: ResumptionZH,
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
    }
  ]
})
