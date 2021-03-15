import ask from './config'

let baseApiUrl = ''

let helper = {
	// 员工
	getEmployeeList (params) {
		return ask.askGet(baseApiUrl + "/api/employee/list", params);
	},
	creatEmployee (params) {
		return ask.askPost(baseApiUrl + "/api/employee/add", params);
	},
	deleteEmployee (params) {
		return ask.askDelete(baseApiUrl + "/api/employee/delete", params);
	},
	editEmployee (params) {
		return ask.askPut(baseApiUrl + "/api/employee/edit", params);
	},
	toggleEmployeeStatus (params) {
		return ask.askPost(baseApiUrl + "/api/employee/status", params);
	}
}

export default helper