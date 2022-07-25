import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.less'
import BreadCrumb from '@/components/BreadCrumb.vue'
import TreeTable from 'vue-table-with-tree-grid'

Vue.component('tree-table', TreeTable)
Vue.component('BreadCrumb', BreadCrumb)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
