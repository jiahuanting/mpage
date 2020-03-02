import Vue from 'vue'
import Router from 'vue-router'
import ChinaMap from '@/components/ChinaMap';
import WorldMap from '@/components/WorldMap';
import Beijing from '@/components/Beijing';
import Risk from '@/components/Risk';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChinaMap',
      component: ChinaMap,
      meta: {
        title: "新型冠状病毒疫情分析与预测地图",
      }
    },
    {
      path: '/worldmap',
      name: 'WorldMap',
      component: WorldMap
    },
    {
      path: '/beijing',
      name: 'Beijing',
      component: Beijing
    },
    {
      path: '/risk',
      name: 'Risk',
      component: Risk
    }
  ]
})
