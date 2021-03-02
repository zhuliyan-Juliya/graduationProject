import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './axios/api'

// 浏览器样式初始化、基础样式
import './assets/css/initialize.css'
import './assets/css/function.less'
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 自定义组件全局注册 - 可以搞成自动化提取 */
import cardC from './components/cardComponents/index';
import cardT from './components/cardTitleComponents/index';
import shortcut from './components/shortcutComponents/index';
Vue.use(cardC)
Vue.use(cardT)
Vue.use(shortcut)
Vue.prototype.$api = api

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

console.log('系统环境变量', process.env)
