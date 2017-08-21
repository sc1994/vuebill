<template>
  <div id="app" style="height:100%;">
    <router-view class="router-view"></router-view>
    <tabbar v-if="signstate === 2">
      <tabbar-item link="/add" :selected="pathName=='Add'">
        <img src="../static/img/照相机.png" slot="icon">
        <span slot="label">记账</span>
      </tabbar-item>
      <tabbar-item show-dot :selected="pathName=='Home'" link="/">
        <img src="../static/img/拳头.png" slot="icon">
        <span slot="label">查账</span>
      </tabbar-item>
      <tabbar-item badge="0" link="/self">
        <img src="../static/img/可达鸭.png" slot="icon">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
    <div>
      <confirm v-model="confirm.confirm" :close-on-confirm="confirm.close" :title="confirm.title" @on-confirm="tosignin()">
        <p style="text-align:center;">{{ confirm.msg }}</p>
      </confirm>
      <toast v-model="toast.toast" :type="toast.type">{{ toast.msg }}</toast>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Confirm, Toast } from 'vux'
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      drawerVisibility: true,
      pathName: ''
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    Confirm,
    Toast
  },
  computed: {
    ...mapState([
      'signstate',
      'currentUser',
      'toast',
      'confirm'
    ])
  },
  mounted: function () {
    this.pathName = this.$route.name
    var user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      if ((new Date() - new Date(user.time)) / 1000 / 60 / 60 / 24 > 7) {
        this.$router.push({ path: '/sign' })
      } else {
        if (this.pathName === 'Sign') {
          this.$router.push({ path: '/' })
        }
        this.$store.commit('changeSignstate', 2)
        this.$store.commit('changeCurrentUser', user)
      }
    } else if (!user && this.pathName !== 'Sign') {
      this.$router.push({ path: '/sign' })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background-color: #fbf9fe;
}

body {
  width: 96%;
  margin-left: 2%
}

.btn-sign {
  margin-top: 25px
}

.headshot {
  text-align: center;
  padding-top: 15px;
  color: #fff;
  font-size: 18px;
}

.headshot img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
</style>
