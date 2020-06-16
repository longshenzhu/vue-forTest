// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/testStore'
import createMessageFunc from './components/message/createMessage.js'
Vue.prototype.$message = createMessageFunc;

import ('@/assets/style/index.scss')
import ('@/assets/fonts/iconfont')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,              //挂载路由
  store,
  render: h=> h(App)
})
