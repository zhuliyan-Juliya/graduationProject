<template>
  <div class="card">
    <i :class="data.icoClass"></i>
    <a :href="data.linkUrl">
      <span>
        {{data.title}}&nbsp;<strong>{{data.msgNum}}</strong>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  components: {},

  computed: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.card {
    min-width: 150px;
    background-color: rgb(35, 102, 167);
    display: flex;
    justify-content: space-between;
    height: 56px;
    i,a {
      line-height: 56px;
      font-size: 12px;
      color: #fff;
      span {
        
        strong {
          font-size: 16px;
        }
      }
    }
    a {
      margin-right: 16px;
    }
    i {
      font-size: 40px;
      opacity: .5;
      flex: 1;
      margin-left: 16px;
    }
}
</style>