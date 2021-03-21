export default {
	data () {
		return {
			bigScreen: screen.availWidth > 1500,
		}
	},
	computed: {
		userName () {
			return JSON.parse(localStorage.getItem('userInfo')).nike_name || JSON.parse(localStorage.getItem('userInfo')).real_name
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
	},
}