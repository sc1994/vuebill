<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> {{msgSelf}} </h1>
      <h3> {{msg}} </h3>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link link="/add"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Group,
    Cell
  },
  data: function () {
    return {
      msgSelf: 'Hello World!'
    }
  },
  computed: {
    ...mapState([
      'msg'
    ])
  },
  mounted: function () {

  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
