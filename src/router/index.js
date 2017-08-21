import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Add from '@/components/Add'
import Sign from '@/components/Sign'
import Self from '@/components/Self'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/add',
    name: 'Add',
    component: Add
  }, {
    path: '/sign',
    name: 'Sign',
    component: Sign
  }, {
    path: '/self',
    name: 'Self',
    component: Self
  }]
})
