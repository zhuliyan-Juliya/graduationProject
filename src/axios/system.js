import ask from './config'

let baseApiUrl = ''

let system = {
	// 账号
	getAccountList (params) {
		return ask.askGet(baseApiUrl + "/api/account/list", params);
	},
	creatAccount (params) {
		return ask.askPost(baseApiUrl + "/api/account/add", params);
	},
	deleteAccount (params) {
		return ask.askDelete(baseApiUrl + "/api/account/delete", params);
	},
	editAccount (params) {
		return ask.askPut(baseApiUrl + "/api/account/edit", params);
	},
	toggleAccountStatus (params) {
		return ask.askPost(baseApiUrl + "/api/account/status", params);
	}
}

export default system