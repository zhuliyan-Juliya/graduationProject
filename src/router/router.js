export default [
  {
    path: '/Home',
    name: 'Home',
    // component: Home
    component: () => import(/* webpackChunkName: "Home" */ '../views/Layout.vue'),
    children: [
      {
        path: 'Main',
        name: 'Main',
        component: () => import('../views/main/Main.vue'),
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    redirect: '/Home'
  }
]