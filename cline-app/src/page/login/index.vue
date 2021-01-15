<template>
  <div class="login">
    <template v-if="login">
      <div class="login_con">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="goHome"
            >登录</el-button>
            <el-button @click="changeRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template v-if="register">
      <div class="login_con">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="goLogin"
            >提交</el-button>
            <el-button @click="changeLogin">已有账号</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import util from '../../util';
import { Message } from 'element-ui';
export default {
  name: "Login",
  data () {
    return {
      login: false,
      register: true,
      form: {
        account: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    changeLogin () {//已有账号切换到登录界面
      this.login = true;
      this.register = false;
    },
    goLogin () {//注册成功后进入登录界面登录
      if (!util.trim(this.form.account) || !util.trim(this.form.password)) {
        Message.warning("账户密码不能为空");
        return null;
      }
      if (this.form.password != this.form.confirmPassword) {
        Message.warning("密码不一致，请重新输入");
        this.form.password = '';
        this.fotm.confirmPassword = '';
      } else {
        window.localStorage.setItem('account', this.form.account);
        window.localStorage.setItem('password', this.form.password);
        //this.$store.commit('getUser', this.form.account);
        this.form.password = '';
        this.form.account = '';
        this.login = true;
        this.register = false;
      }
      //console.log("注册", this.form.password, this.form.account, this.form.confirmPassword);
    },
    goHome () {//登录成功后进入首页
      console.log(account, password, this.form.account, this.form.password)
      let account = window.localStorage.getItem('account');
      let password = window.localStorage.getItem('password');
      if (!util.trim(this.form.account) || !util.trim(this.form.password)) {
        Message.warning('账号或密码不能为空');
        return null;
      }
      if (password === this.form.password && account === this.form.account) {
        this.login = false;
        this.register = false;
        window.localStorage.setItem('loginStatus', 'login');
        this.$store.commit('getUser', this.form.username);
        Message.success('登录成功');
        this.$router.push("/homePage");
        //window.location.href("/homePage");
      } else {
        Message.warning("账号或密码不正确");
      }
    },
    changeRegister () {
      this.form.password = '';
      this.form.account = '';
      this.register = true;
      this.login = false;
    }
  },
  created () {
    //获取路由中的参数
    if (this.$route.params.loginStatus === 'logout') {
      window.localStorage.clear();
      this.$store.commit('getLoginStatus', false);
      return;
    }
    const loginStatus = this.$store.state.loginStatus;
    if (loginStatus) {
      this.login = false;
      this.register = false;
      console.log("您已经是登录状态");
      Message.warning('您已经是登录状态')
      this.$router.push("/homePage");
    }
  }
}
</script>
<style lang="less">
.login {
  height: 100%;
  width: 100%;
  background-image: url(../../assets/images/login_bg.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  .login_con {
    width: 400px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.2);
    .el-form {
      .el-form-item {
        label {
          color: black !important;
        }
        .el-form-item__content {
          margin-left: 120px !important;
        }
      }
    }
  }
}
</style>