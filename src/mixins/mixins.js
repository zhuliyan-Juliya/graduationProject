export default {
	data () {
		return {
			bigScreen: screen.availWidth > 1500,
			companyList: [],	//	公司列表
			departmentList: [],	//	部门列表
			categoryList: [],	//	职位分类
			cityList: [],	//	城市分类
		}
	},
	computed: {
		userName () {
			return JSON.parse(localStorage.getItem('userInfo')).nike_name || JSON.parse(localStorage.getItem('userInfo')).real_name
		},
		isManager () {
			return JSON.parse(localStorage.getItem('userInfo')).power !== '2'
		}
	},
	methods: {
		getChooseData () {
			return new Promise(resolve => {
				let task = [
					this.getSelectListOptions('getCompanyList'),
					this.getSelectListOptions('getDepartmentList'),
					this.getSelectListOptions('getCategoryList'),
					this.getSelectListOptions('getCityList'),
				]
				Promise.all(task).then(res => {
					this.companyList = res[0].map(item => {
						return { label: item.name, value: item._id };
					});
					this.departmentList = res[1].map(item => {
						return { label: item.name, value: item._id };
					});
					this.categoryList = res[2].map(item => {
						return { label: item.name, value: item._id };
					});
					this.cityList = res[3].map(item => {
						return { label: item.region_name, value: item._id };
					});
					resolve()
				})
			})
		},
		/**
		* 查询列表数据，返回下拉框选项
		* @param {apiName}  - api名称
		* @returns {Array}	数据列表
		*/
		getSelectListOptions (apiName) {
			return new Promise(resolve => {
				this.$api[apiName]().then(res => {
					if (res.success) {
						resolve(res.data)
					}
				});
			})
		},
		/**
		* 深拷贝	数组 对象 都可以
		* @param {Object} source - 拷贝源对象
		* @returns {Object}
		*/
		deepClone (source) {
			if (typeof source === 'object') {
				let cloneTarget = Array.isArray(source) ? [] : {}
				for (const key in source) {
					cloneTarget[key] = this.deepClone(source[key])
				}
				return cloneTarget
			} else {
				return source
			}
		}
	},
}