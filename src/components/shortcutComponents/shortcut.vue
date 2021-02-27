<template>
  <div class="shortcut">
    <a :href="cardData.disable ? 'javascript:void(0);' : cardData.linkUrl" :target="cardData.disable ? '' : '_blank'" :class="{ disable: cardData.disable }">
      <img width="30" height="40" :src="cardData.imgUrl" />
      <span :class="{ disable: cardData.disable }">{{ cardData.desc }}</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
    },
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.shortcut {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  height: 50px !important;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 50px;
    margin: 0 auto;
    &.disable {
      cursor: not-allowed;
    }
    span {
      height: 18px;
      line-height: 18px;
      &.disable {
        color: #dedede;
      }
    }
  }
}
</style>