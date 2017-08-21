<template>
  <div>
    <p class="headshot">
      <img :src="currentUser.data.src">
    </p>
    <group title="个人信息">
      <cell title="账号">{{currentUser.data.name}}</cell>
      <cell title="密码" value="修改密码" is-link></cell>
      <cell title="上传头像" value="去上传" is-link></cell>
      <cell title="组" value="去设置" is-link></cell>
    </group>
    <div style="height: 25px;"></div>
    <x-button plain type="warn" @click.native="signout">退出登陆</x-button>
  </div>
</template>

<script>
import { XButton, Group, Cell } from 'vux'
import { mapState } from 'vuex'

export default {
  data: function () {
    return {

    }
  },
  methods: {
    signout: function () {
      localStorage.clear()
      this.$router.push({ path: '/sign' })
    }
  },
  computed: {
    ...mapState([
      'currentUser'
    ])
  },
  components: {
    XButton,
    Group,
    Cell
  }
}
</script>

<style>

</style>

