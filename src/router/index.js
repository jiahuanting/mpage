import Vue from 'vue'
import Router from 'vue-router'
import ChinaMap from '@/components/ChinaMap';
import WorldMap from '@/components/WorldMap';
import Resumption from '@/components/Resumption';
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
      path: '/resumption',
      name: 'Resumption',
      component: Resumption
    },
    {
      path: '/risk',
      name: 'Risk',
      component: Risk
    }
  ]
})
