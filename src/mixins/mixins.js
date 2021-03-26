export default {
	data () {
		return {
			bigScreen: screen.availWidth > 1500,
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