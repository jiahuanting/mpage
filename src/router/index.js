import Vue from 'vue';
import Router from 'vue-router';
import Resume from '@/components/Resume';
import World from '@/components/World';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'World',
      component: World,
      meta: {
        title: "世界疫情预测地图",
      }
    },
    {
      path: '/resumption',
      name: 'resumption',
      component: Resume,
      meta: {
        title: "中国复工复产地图",
      }
    }
  ]
})
