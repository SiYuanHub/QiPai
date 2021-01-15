export default {//同步时候的操作方法（例如点击效果的方法）
  getUser (state, account) {
    console.log('username', account)
    state.account = account;
  },
  getLoginStatus (state, flag) {
    state.loginStatus = flag;
  }
}