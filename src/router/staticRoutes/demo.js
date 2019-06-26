
// 静态路由示例

export default [

  {
    path: '/nested',
    component: () => import('@/views/layout'),
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: '/demo2',
    component: () => import('@/views/layout'),
    meta: {
      title: 'demo2'
    },
    children: [
      {
        path: 'demo2-1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        meta: { title: 'demo2-1' },
      }
    ]
  },

  {
    path: '/demo3',
    component: () => import('@/views/layout'),
    meta: {
      title: 'demo3'
    },
    children: [
      {
        path: 'demo3-1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        meta: { title: 'demo3-1' },
      }
    ]
  },
  
  {
    path: '/demo4',
    component: () => import('@/views/layout'),
    meta: {
      title: 'demo4'
    },
    children: [
      {
        path: 'demo4-1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        meta: { title: 'demo4-1' },
      }
    ]
  },
]