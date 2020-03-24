import Vue from 'vue';
import Router from 'vue-router';
import Resumption from '@/components/Resumption';
import Forecasting from '@/components/Forecasting';
import ResumptionEN from '@/components/Resumption_en';
import ForecastingEN from '@/components/Forecasting_en';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Forecasting',
      component: Forecasting,
      meta: {
        title: "世界疫情预测地图",
      }
    },
    {
      path: '/resumption',
      name: 'Resumption',
      component: Resumption,
      meta: {
        title: "中国复工复产地图",
      }
    },
    {
      path: '/forecasting_en',
      name: 'ForecastingEN',
      component: ForecastingEN,
      meta: {
        title: "Forecast map of world epidemic",
      }
    },
    {
      path: '/resumption_en',
      name: 'ResumptionEN',
      component: ResumptionEN,
      meta: {
        title: "Resumption of work and production in China",
      }
    }
  ]
})
