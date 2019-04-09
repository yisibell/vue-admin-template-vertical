import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import 'babel-polyfill'

import App from './App'
import store from './store'
import router from './router'

import CustomResource from '@/components'  // 自定义公共全局 组件、指令、Vue实例方法

// permission control
import '@/permission' 

Vue.use( CustomResource )

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
