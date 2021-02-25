<template>
  <div class="tit">
    <span><i :class="cardData.leftIcoClass"></i>{{ cardData.title }}</span>
    <slot name="right">
      <i :class="cardData.rightIcoClass" style="cursor: pointer" @click="reClickEvent"></i>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
    },
  },
  methods: {
    reClickEvent() {
      this.$emit('disClickEvent');
    },
  },
};
</script>
<style lang='less' scoped>
.tit {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  i {
    font-size: 20px;
    vertical-align: middle;
    margin-right: 3px;
    &::before {
      line-height: 40px;
    }
  }
}
</style>