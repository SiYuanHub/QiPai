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
            <el-input
              v-model="form.password"
              :type="pwdType"
              placeholder="请输入密码"
            >
              <i
                slot="suffix"
                class="el-icon-view"
                @click="showPwd"
              ></i>
            </el-input>
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
            <el-input
              v-model="form.password"
              :type="pwdType"
              placeholder="请输入密码"
            >
              <i
                slot="suffix"
                class="el-icon-view"
                @click="showPwd"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="form.confirmPassword"
              :type="pwdType"
              placeholder="请输入密码"
            >
              <i
                slot="suffix"
                class="el-icon-view"
                @click="showPwd"
              ></i>
            </el-input>
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
import source from '../../common/source';
import getUserIP from '../../common/source';
export default {
  name: "Login",
  data () {
    return {
      login: false,
      register: true,
      pwdType: 'password',
      IpAddress: '',
      DataType: '7',
      MachName: '',
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
      } else {
        source({
          service: 'WebApi',
          method: 'get',
          url: `BaseWS.asmx/UserLogin?DataType=${this.DataType}&LoginCode=${this.form.account}&PWD=${this.form.password}&IpAddress=${this.IpAddress}&MachName=${this.MachName}`
          //data: JSON.stringify(this.state)
        }, true).then((res) => {
          console.log(res);
          if (res.data.Message.ErrCode == "100") {
            this.login = false;
            this.register = false;
            window.localStorage.setItem('account', this.form.account);
            window.localStorage.setItem('password', this.form.password);
            window.localStorage.setItem('loginStatus', 'login');
            this.$store.commit('getUser', this.form.account);
            this.$store.commit('getLoginStatus', true);
            Message.success('登录成功');
            this.$router.push("/homePage");
            //window.location.href("/homePage");
          } else {
            Message.warning("账号或密码不正确");
          }
        })
      }
    },
    changeRegister () {
      this.form.password = '';
      this.form.account = '';
      this.register = true;
      this.login = false;
    },

    showPwd () {
      this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
      let e = document.getElementsByClassName('el-icon-view')[0];
      this.pwdType == '' ? e.setAttribute('style', 'color: #409EFF') : e.setAttribute('style', 'color: #c0c4cc');
    }
  },
  created () {
    // //获取路由中的参数
    // console.log(this.$route.params.loginStatus);
    // // if (this.$route.params.loginStatus === 'logout') {//加载登录但页面还没有挂载时会调用
    // //   window.localStorage.clear();
    // //   this.$store.commit('getLoginStatus', false);
    // //   return;
    // // }
    // const loginStatus = this.$store.state.loginStatus;
    // if (loginStatus) {
    //   this.login = false;
    //   this.register = false;
    //   console.log("您已经是登录状态");
    //   Message.warning('您已经是登录状态')
    //   this.$router.push("/homePage");
    // }
  },
  mounted () {
    getUserIP(IpAddress => {
      this.IpAddress = IpAddress;
      // this.setState({
      //   IpAddress
      // })
    })
  }
}
</script>
<style lang="less" scoped>
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
        /deep/ .el-form-item__label {
          color: black !important;
        }
        .el-form-item__content {
          margin-left: 120px !important;
          .el-input {
            /deep/ .el-input__suffix {
              padding-top: 2px;
            }
          }
        }
      }
    }
  }
}
</style>