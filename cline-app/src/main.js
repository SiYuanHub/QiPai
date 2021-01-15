import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui'
import router from './router';
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/reset.css'
import less from 'less';
Vue.use(less);
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
