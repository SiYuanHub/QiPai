<template>
  <div id="app">
    <template v-if="show">
      <div class="app_header">
        <div class="header_title">
          <router-link to="/homePage">电商网站首页</router-link>
        </div>
        <div class="shoping_car">
          <span>购物车</span>
        </div>
        <div class="user_name">{{account}}</div>
        <div class="login_out">
          <router-link to='/login'>退出登录</router-link>
        </div>
      </div>
    </template>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      account: this.$store.state.account
    }
  },
  computed: {
    show () {
      console.log(this.$store.state.loginStatus);
      return this.$store.state.loginStatus;
    }
  },
  methods: {
  }
}
</script>

<style lang='less'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.app_header {
  height: 48px;
  widows: 100%;
  line-height: 48px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  .header_title {
    float: left;

    a {
      padding: 0 32px;
      color: #fff !important;
    }
  }
  .login_out {
    float: right;
    margin-right: 20px;
    a {
      color: #fff;
    }
  }
  .user_name {
    float: right;
    margin-right: 20px;
  }
  .shoping_car {
    float: right;
    margin-right: 20px;
    a {
      color: #fff;
    }
  }
}
</style>
