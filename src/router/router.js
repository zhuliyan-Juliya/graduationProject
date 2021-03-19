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
					{
						path: 'Department',
						name: 'Department',
						component: () => import('../views/organization/Department.vue'),
					},
					{
						path: 'Workcity',
						name: 'Workcity',
						component: () => import('../views/organization/CityList.vue'),
					},
					{
						path: 'Structure/1',
						name: 'Structure1',
						component: () => import('../views/organization/Structure1.vue'),
					},
					{
						path: 'Structure/2',
						name: 'Structure2',
						component: () => import('../views/organization/Structure2.vue'),
					},
					{
						path: 'Category',
						name: 'Category',
						component: () => import('../views/organization/Category.vue'),
					},
					{
						path: 'Designation',
						name: 'Designation',
						component: () => import('../views/organization/Designation.vue'),
					},
				]
			},
			// 员工管理
			{
				path: 'Staff',
				name: 'Staff',
				component: () => import('../views/staff/Main.vue'),
				children: [
					{
						path: 'Employee',
						name: 'Employee',
						component: () => import('../views/staff/Employee.vue'),
					},
					{
						path: 'Report',
						name: 'Report',
						component: () => import('../views/staff/Report.vue'),
					},
				]
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
				children: [
					{
						path: 'Account',
						name: 'Account',
						component: () => import('../views/system/AccountList.vue'),
					},
				]
			},
		]
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '*',
		redirect: '/Home/Main'
	}

]