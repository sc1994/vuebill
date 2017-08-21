// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Router from './router'
import Store from './store'

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  store: Store,
  router: Router,
  render: h => h(App),
  template: '<App/>',
  components: {
    App
  }
})
