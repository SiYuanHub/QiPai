<template>
  <div class="home_page">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">商品分类</template>
        <el-submenu index="2-1">
          <template slot="title">品牌</template>
          <el-menu-item index="2-1-1">Apple</el-menu-item>
          <el-menu-item index="2-1-2">Beats</el-menu-item>
          <el-menu-item index="2-1-3">Sonos</el-menu-item>
          <el-menu-item index="2-1-4">B&O</el-menu-item>
          <el-menu-item index="2-1-5">Bose</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">颜色</template>
          <el-menu-item index="2-2-1">白色</el-menu-item>
          <el-menu-item index="2-2-2">金色</el-menu-item>
          <el-menu-item index="2-2-3">红色</el-menu-item>
          <el-menu-item index="2-2-4">蓝色</el-menu-item>
        </el-submenu>
        <el-submenu index="2-3">
          <template slot="title">排序</template>
          <el-menu-item index="2-3-1">默认</el-menu-item>
          <el-menu-item index="2-3-2">销量</el-menu-item>
          <el-menu-item index="2-3-3">价格</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item
        index="3"
        disabled
      >消息中心</el-menu-item>
      <el-menu-item index="4">购物车</el-menu-item>
    </el-menu>
    <div class="app_header">
      <div class="user_name">{{account}}</div>
      <div class="login_out">
        <span @click="loginOut">退出登录</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "homePage",
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      account: this.$store.state.account
    };
  },
  created () {

  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut () {
      this.$store.commit("getLoginStatus", false);
      this.$router.push('/login');
      window.localStorage.clear();
    }
  },
  computed: {
    show () {
      return this.$store.state.loginStatus;
    }
  }
}
</script>
<style lang="less" scoped>
.home_page {
  display: flex;
  flex-direction: row;
  .el-menu-demo {
    width: calc(100% - 200px);
  }
  .app_header {
    height: 60px;
    line-height: 60px;
    width: 200px;
    background-color: rgb(84, 92, 100);
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
      span {
        color: #fff;
        cursor: pointer;
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
}
</style>