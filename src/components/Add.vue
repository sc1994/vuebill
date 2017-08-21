<template>
  <div>
    <group title="金额">
      <cell>
        <countup :start-val="0" :end-val="total" :duration="1" :decimals="1" class="money"></countup>
      </cell>
      <cell title="百元" primary="content">
        <range :mix="0" :max="15" v-model="hundred" @on-change="getTotal" width="50px"></range>
      </cell>
      <cell title="十元" primary="content">
        <range :mix="0" :max="9" v-model="ten" @on-change="getTotal"></range>
      </cell>
      <cell title="元" primary="content">
        <range :mix="0" :max="9" v-model="yuan" @on-change="getTotal"></range>
      </cell>
      <cell title="角" primary="content">
        <range :mix="0" :max="9" v-model="jiao" @on-change="getTotal"></range>
      </cell>
    </group>
    <divider>
      消费类型
    </divider>
    <checker v-model="type" default-item-class="selected" selected-item-class="selected-item">
      <checker-item v-for="i in currentUser.data.consumeType" :key="i" :value="i">{{i}}</checker-item>
    </checker>
    <divider>
      <span @click="showMore = !showMore">
        没我想要的?
      </span>
    </divider>
    <group v-if="showMore" style="margin-top:-15px">
      <x-input title="新标签" placeholder="请输入你想要的标签" v-model="moreType"></x-input>
    </group>
    <div class="btn-sign">
      <x-button plain @click.native='submitadd()'>记一笔</x-button>
    </div>
  </div>
</template>

<script>
import { Group, Cell, Range, Countup, InlineXNumber, Checker, CheckerItem, Divider, XInput, XButton } from 'vux'
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      hundred: 0,
      ten: 0,
      yuan: 0,
      jiao: 0,
      total: 0,
      type: '',
      showMore: false,
      moreType: ''
    }
  },
  methods: {
    getTotal: function () {
      this.total = this.hundred * 100 + this.ten * 10 + this.yuan + this.jiao / 10
    },
    submitadd: function () {
      if (this.total <= 0) {
        this.$store.commit('changeToast', {
          toast: true,
          msg: '请设置消费金额',
          type: 'warn'
        })
        return
      }
      if (!this.showMore && !this.type) {
        this.$store.commit('changeToast', {
          toast: true,
          msg: '请选择消费类型',
          type: 'warn'
        })
        return
      }
      if (this.showMore && !this.moreType) {
        this.$store.commit('changeToast', {
          toast: true,
          msg: '请输入更多类型',
          type: 'warn'
        })
        return
      }
      this.$store.dispatch('addbill', {
        amount: this.total,
        type: this.showMore ? this.moreType : this.type,
        isMore: this.showMore,
        name: this.currentUser.data.name
      })
      this.hundred = 0
      this.ten = 0
      this.yuan = 0
      this.jiao = 0
      this.total = 0
      this.type = ''
      this.showMore = false
      this.moreType = ''
      this.$store.commit('changeToast', {
        toast: true,
        msg: '记账成功',
        type: 'success'
      })
    },
    getAmountType: function (ind) {
      var field
      switch (parseInt(ind)) {
        case 0:
          field = 'hundred'
          break
        case 1:
          field = 'ten'
          break
        case 2:
          field = 'yuan'
          break
        case 3:
          field = 'jiao'
          break
      }
      return field
    }
  },
  mounted: function () {
    var that = this
    // 为最大值最小值添加点击事件
    setTimeout(function () {
      var minArr = document.getElementsByClassName('range-min')
      var index
      for (index = 0; index < minArr.length; index++) {
        let element = minArr[index]
        element.setAttribute('data-index', index)
        element.onclick = function (n) {
          var field = that.getAmountType(n.target.getAttribute('data-index'))
          if (that[field] > 0) {
            that[field]--
          }
        }
      }
      var maxArr = document.getElementsByClassName('range-max')
      for (index = 0; index < maxArr.length; index++) {
        let element = maxArr[index]
        element.setAttribute('data-index', index)
        element.onclick = function (n) {
          var field = that.getAmountType(n.target.getAttribute('data-index'))
          if (that[field] < parseInt(n.target.innerText, 10)) {
            that[field]++
          }
        }
      }
    }, 1000)
  },
  watch: {
    showMore: function (newValue) {
      if (newValue) {
        this.type = ''
      }
    },
    type: function () {
      this.showMore = false
    }
  },
  computed: {
    ...mapState([
      'currentUser'
    ])
  },
  components: {
    Group,
    Cell,
    Range,
    Countup,
    InlineXNumber,
    Checker,
    CheckerItem,
    Divider,
    XInput,
    XButton
  }
}
</script>

<style>
.money {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 3px;
  color: chocolate;
}

.selected {
  border: 1px solid #ececec;
  padding: 5px 13px;
  margin-left: 6px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.selected-item {
  border: 1px solid green;
}
</style>
