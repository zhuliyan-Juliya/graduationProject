// 所有接口
import ask from "./config.js";

let baseApiUrl = '';



let configureApi = {
  testApi (params) {
    return ask.askGet(baseApiUrl + "/test/about/hh", params);
  },
};

export default configureApi