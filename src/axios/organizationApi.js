import ask from './config'

let baseApiUrl = ''

let organizationApi = {
  // 公司
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
  // 城市
  getCityList (params) {
    return ask.askGet(baseApiUrl + "/api/city/list", params);
  },
  creatCity (params) {
    return ask.askPost(baseApiUrl + "/api/city/add", params);
  },
  deleteCity (params) {
    return ask.askDelete(baseApiUrl + "/api/city/delete", params);
  },
  editCity (params) {
    return ask.askPut(baseApiUrl + "/api/city/edit", params);
  },
}

export default organizationApi