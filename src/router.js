import Vue from 'vue'
import VueRouter from 'vue-router'

import multiLevelMenu from './components/multi-level-menu/menu.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: multiLevelMenu }
]

export default new VueRouter({mode: 'history', routes})
