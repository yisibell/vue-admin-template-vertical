import router from './router'
import store from './store'
import NProgress from 'nprogress'            // progress bar
import 'nprogress/nprogress.css'             // progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'      // getToken from cookie

NProgress.configure({ showSpinner: false })  // NProgress configuration

const whiteList = ['/login']                 // 不重定向白名单

router.beforeEach((to, from, next) => {

  NProgress.start()

  if (getToken()) {

    if (to.path === '/login') {

      next({ path: '/' })

      // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      NProgress.done() 

    } else {
      if (store.getters.roles.length === 0) {

        // 拉取用户信息
        store.dispatch('GetInfo').then(res => { 
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })

      } else {
        next()
      }
    }

  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {

      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`) 
      NProgress.done()
    }
  }

})

router.afterEach(() => {

  // 结束Progress
  NProgress.done() 
})