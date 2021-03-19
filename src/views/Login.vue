<template>
  <div class="login">
    <h5 class="tit">企业人事管理系统</h5>
    <section class="login_form">
      <div>
        <el-input type="text" v-model.trim="userform.login_name" clearable placeholder="请输入用户名"></el-input>
        <el-input type="password" v-model.trim="userform.login_pwd" placeholder="请输入密码" clearable></el-input>
      </div>
      <el-button type="primary" @click="signIn" class="signIn">Sign in</el-button>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userform: {},
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    signIn() {
      if (!this.check()) return;
      // element 全局loading
      const loading = this.$loading({
        lock: true,
        text: '登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      this.$api.login(this.userform).then(res => {
        if (res.success) {
          this.$router.push({ path: '/Home' });
          this.$message.success('登录成功！');
          localStorage.setItem('token', 'zhuliyanToken');
        }
      });
    },
    check() {
      let key = ['userName', 'userPwd'];
      let ch = ['用户名', '密码'];
      for (let i = 0; i < key.length; i++) {
        if (['', undefined, null].includes(this.userform[key[i]])) {
          this.$message.warning(`请输入关键字 - ${ch[i]}`);
          return false;
        }
      }
      return true;
    },
  },
};
</script>
<style lang='scss' scoped>
div.login {
  height: 100vh;
  width: 100vw;
  background-image: url('~images/bg.jpg');
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h5.tit {
    margin-bottom: 35px;
    color: #fff;
    font-size: 24px;
  }
  .login_form {
    width: 320px;
    height: 162px;
    position: relative;
    /* ::v-deep 解决修改element默认样式问题 */
    ::v-deep .el-input__inner {
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
      letter-spacing: 2px;
      /* 修改 placeholder 样式 */
      &::-webkit-input-placeholder {
        color: #fff;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
    .el-input + div {
      margin-top: 10px;
    }
    .signIn {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 115px;
      letter-spacing: 2px;
      border-radius: 20px;
    }
  }
}
</style>