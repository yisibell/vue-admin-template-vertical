import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout'

/**
* hidden: true                   if `hidden:true` will not show in the Navbar (default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
  }
**/

//tips: 配置的路由表会生成菜单栏

// 导入各模块静态路由表

import Demo from './staticRoutes/demo'

let constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPages/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,   // 不出现在菜单栏
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

];

constantRouterMap = constantRouterMap.concat( Demo )

constantRouterMap.push( { path: '*', redirect: '/404', hidden: true } )

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export {
  constantRouterMap
}
