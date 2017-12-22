import Vue from 'vue'
import App from './App.vue'

import router from './router'

import multiLevelMenu from './components/multi-level-menu/menu.vue';
Vue.component('multi-level-menu', multiLevelMenu);

import menuButton from './components/multi-level-menu/menu-button.vue';
Vue.component('menu-button', menuButton);

new Vue({
  el: '#app',
  render: h => h(App)
});
