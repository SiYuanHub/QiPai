export default {//状态值
  //当前用户账号
  account: window.localStorage.getItem('account'),
  //登录状态
  loginStatus: !!window.localStorage.getItem('loginStatus'),
}