import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headshot: '../static/img/可达鸭.jpg',
    signstate: 1, // 登陆状态 0:登陆 1:注册 2:登陆成功
    confirm: {
      confirm: false,
      title: '系统提示',
      msg: '确定吗?',
      close: false
    },
    toast: {
      toast: false,
      type: 'success', // success, warn, cancel, text
      msg: ''
    },
    currentUser: {
      time: new Date(),
      data: {}
    } // 当前登陆人
  },
  mutations: {
    changeHeadshot: function (state, data) {
      state.headshot = data
    },
    changeSignstate: function (state, data) {
      state.signstate = data
    },
    changeConfirm: function (state, data) {
      state.confirm.confirm = data.confirm
      if (data.title) state.confirm.title = data.title
      else state.confirm.title = '系统提示'
      if (data.msg) state.confirm.msg = data.msg
      else state.confirm.msg = '确定吗?'
      if (data.close) state.confirm.close = data.close
      else state.confirm.close = false
    },
    changeToast: function (state, data) {
      state.toast.toast = data.toast
      if (data.type) state.toast.type = data.type
      else state.toast.type = 'success'
      state.toast.msg = data.msg
    },
    changeSignsuccess: function (state, data) {
      state.signsuccess = data
    },
    changeCurrentUser: function (state, data) {
      state.currentUser.data = data.data
      if (data.data) state.currentUser.time = data.time
    }
  },
  actions: {
    signup: function ({
      commit
    }, data) {
      Axios.post('/user/signup', data)
        .then(function (res) {
          if (res.data.code === 0) {
            commit('changeConfirm', {
              confirm: true,
              msg: res.data.msg
            })
          } else {
            commit('changeToast', {
              toast: true,
              msg: '注册成功'
            })
            commit('changeSignstate', 0)
          }
        })
    },
    signin: function ({
      commit
    }, data) {
      Axios.post('/user/signin', data)
        .then(function (res) {
          if (res.data.code === 0) {
            commit('changeToast', {
              toast: true,
              msg: '账号或密码错误',
              type: 'warn'
            })
          } else {
            commit('changeSignstate', 2)
            commit('changeCurrentUser', {
              data: res.data.data,
              time: new Date()
            })
            if (data.remember) {
              localStorage.setItem('currentUser', JSON.stringify({
                data: res.data.data,
                time: new Date()
              }))
            }
          }
        })
    },
    addbill: function ({
      commit
    }, data) {
      Axios.post('/addbill', data)
        .then(function (res) {
          if (res.data.code > 0) {
            if (res.data.data) {
              commit('changeCurrentUser', {
                data: res.data.data,
                time: new Date()
              })
              if (localStorage.getItem('currentUser')) {
                localStorage.setItem('currentUser', JSON.stringify({
                  data: res.data.data,
                  time: new Date()
                }))
              }
            }
          }
        })
    }
  }
})
