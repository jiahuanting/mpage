import Vue from 'vue';
import Router from 'vue-router';
import Resumption from '@/components/Resumption';
import Forecasting from '@/components/Forecasting';

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
      name: 'resumption',
      component: Resumption,
      meta: {
        title: "中国复工复产地图",
      }
    }
  ]
})
