<template>
  <div>
    <p class="headshot">
      <img :src="headshot">
    </p>
    <div style="width: 70%;margin-left: 15%;margin-top:35px">
      <button-tab v-model="currentSign" width="90px">
        <button-tab-item>登陆</button-tab-item>
        <button-tab-item>注册</button-tab-item>
      </button-tab>
    </div>
    <group title="账号">
      <x-input :required="required" :min="namemin" :max="namemax" v-model="name" placeholder="输入账号"></x-input>
    </group>
    <group title="密码">
      <x-input :required="required" type="password" :min="pwdmin" :max="pwdmax" v-model="pwd" placeholder="输入密码6~20位"></x-input>
      <x-input :required="required" type="password" :min="pwdmin" :max="pwdmax" v-model="pwd2" placeholder="确认密码" v-if="signstate==1" :equal-with="pwd"></x-input>
    </group>
    <div class="btn-remember" v-if='signstate == 0'>
      <check-icon :value.sync="rememberMe" type="plain">记住我</check-icon>
    </div>
    <div class="btn-sign">
      <x-button plain @click.native='submitsign()'>{{signstate == 1 ? '注册' : '登陆' }}</x-button>
    </div>
  </div>
</template>

<script>
import { Group, XInput, Blur, Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, XButton, CheckIcon } from 'vux'
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      pwd: '',
      pwdmin: 4,
      pwdmax: 20,
      namemin: 4,
      namemax: 20,
      name: '',
      required: true,
      pwd2: '',
      currentSign: 1,
      rememberMe: false
    }
  },
  methods: {
    changeImg: function (img) {
      this.$store.commit('changeHeadshot', img)
    },
    submitsign: function () {
      if (!this.name) {
        this.$store.commit('changeToast', { toast: true, msg: '请输入用户名~', type: 'warn' })
        return
      }
      if (!this.pwd) {
        this.$store.commit('changeToast', { toast: true, msg: '请输入密码~', type: 'warn' })
        return
      }
      if (this.currentSign === 1) {
        if (this.pwd !== this.pwd2) {
          this.$store.commit('changeToast', { toast: true, msg: '两次密码不一致', type: 'warn' })
          return
        }
        this.$store.dispatch('signup', { name: this.name, pwd: this.pwd })
        this.pwd = ''
        this.pwd2 = ''
      } else {
        this.$store.dispatch('signin', { name: this.name, pwd: this.pwd, remember: this.rememberMe })
      }
    },
    tosignin: function () {
      this.$store.commit('changeConfirm', { confirm: false })
      this.currentSign = 0
      this.pwd = ''
    }
  },
  watch: {
    currentSign: function (newValue) {
      this.$store.commit('changeSignstate', newValue)
    },
    signstate: function (newValue) {
      this.currentSign = newValue
      if (newValue === 2) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/sign' })
      }
    }
  },
  computed: {
    ...mapState([
      'headshot',
      'signstate',
      'confirm',
      'toast'
    ])
  },
  components: {
    XInput,
    Blur,
    Flexbox,
    FlexboxItem,
    Group,
    ButtonTab,
    ButtonTabItem,
    XButton,
    CheckIcon
  }
}
</script>

<style scoped>
.btn-sign {
  margin-top: 25px
}

.btn-remember {
  margin-top: 19px;
  text-align: right;
  padding-right: 20px;
}
</style>
