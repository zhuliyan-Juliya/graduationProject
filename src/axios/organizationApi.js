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
  toggleCompanyStatus (params) {
    return ask.askPost(baseApiUrl + "/api/company/status", params);
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
  toggleCityStatus (params) {
    return ask.askPost(baseApiUrl + "/api/city/status", params);
  },
  // 部门
  getDepartmentList (params) {
    return ask.askGet(baseApiUrl + "/api/department/list", params);
  },
  creatDepartment (params) {
    return ask.askPost(baseApiUrl + "/api/department/add", params);
  },
  deleteDepartment (params) {
    return ask.askDelete(baseApiUrl + "/api/department/delete", params);
  },
  editDepartment (params) {
    return ask.askPut(baseApiUrl + "/api/department/edit", params);
  },
  toggleDepartmentStatus (params) {
    return ask.askPost(baseApiUrl + "/api/department/status", params);
  },
  // 职类管理
  getCategoryList (params) {
    return ask.askGet(baseApiUrl + "/api/category/list", params);
  },
  creatCategory (params) {
    return ask.askPost(baseApiUrl + "/api/category/add", params);
  },
  deleteCategory (params) {
    return ask.askDelete(baseApiUrl + "/api/category/delete", params);
  },
  editCategory (params) {
    return ask.askPut(baseApiUrl + "/api/category/edit", params);
  },
  toggleCategoryStatus (params) {
    return ask.askPost(baseApiUrl + "/api/category/status", params);
  },
  // 职位管理
  getDesignationList (params) {
    return ask.askGet(baseApiUrl + "/api/designation/list", params);
  },
  creatDesignation (params) {
    return ask.askPost(baseApiUrl + "/api/designation/add", params);
  },
  deleteDesignation (params) {
    return ask.askDelete(baseApiUrl + "/api/designation/delete", params);
  },
  editDesignation (params) {
    return ask.askPut(baseApiUrl + "/api/designation/edit", params);
  },
  toggleDesignationStatus (params) {
    return ask.askPost(baseApiUrl + "/api/designation/status", params);
  },
}

export default organizationApi