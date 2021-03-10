import ask from './config'

let baseApiUrl = ''

let helper = {
	// 员工
	getCompanyList (params) {
		return ask.askGet(baseApiUrl + "/api/company/list", params);
	},
	creatCompany (params) {
		return ask.askPost(baseApiUrl + "/api/company/add", params);
	},
	deleteCompany (params) {
		return ask.askDelete(baseApiUrl + "/api/company/delete", params);
	},
	editCompany (params) {
		return ask.askPut(baseApiUrl + "/api/company/edit", params);
	},
	toggleCompanyStatus (params) {
		return ask.askPost(baseApiUrl + "/api/company/status", params);
	}
}

export default helper