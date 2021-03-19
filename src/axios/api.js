// 所有接口
import ask from './config'
import organizationApi from './organizationApi'
import staffApi from './staffApi'
import system from './system'

let baseApiUrl = '';

// 基础api
let baseApi = {
	// 账号
	login (params) {
		return ask.askPost(baseApiUrl + "/api/login", params);
	},
};

export default Object.assign({}, baseApi, organizationApi, staffApi, system)