export default [
  {
    path: '/Home',
    name: 'Home',
    // component: Home
    component: () => import(/* webpackChunkName: "Home" */ '../views/Layout.vue'),
    redirect: '/Home/Main',
    children: [
      // 工作台
      {
        path: 'Main',
        name: 'Main',
        component: () => import('../views/main/Main.vue'),
      },
      // 组织管理
      {
        path: 'Organization',
        name: 'Organization',
        component: () => import('../views/organization/Main.vue'),
        children: [
          {
            path: 'CompanyList',
            name: 'CompanyList',
            component: () => import('../views/organization/CompanyList.vue'),
          },
        ]
      },
      // 员工管理
      {
        path: 'Staff',
        name: 'Staff',
        component: () => import('../views/staff/Main.vue'),
      },
      // 考勤管理
      {
        path: 'Timecard',
        name: 'Timecard',
        component: () => import('../views/timecard/Main.vue'),
      },
      // 系统设置
      {
        path: 'System',
        name: 'System',
        component: () => import('../views/system/Main.vue'),
      },
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  // {
  //   path: '*',
  //   redirect: '/Home/Main'
  // }

]