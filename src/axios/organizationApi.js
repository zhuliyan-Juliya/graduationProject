import ask from './config'

let baseApiUrl = ''

let organizationApi = {
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
}

export default organizationApi