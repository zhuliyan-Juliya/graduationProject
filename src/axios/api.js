// 所有接口
import organizationApi from './organizationApi'
import staffApi from './staffApi'

let baseApiUrl = '';


// 基础api
let baseApi = {

};

export default Object.assign({}, baseApi, organizationApi, staffApi)