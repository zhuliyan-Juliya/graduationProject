import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 浏览器样式初始化
import './assets/css/initialize.css'
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 自定义组件全局注册 - 可以搞成自动化提取 */
import cardC from './components/cardComponents/index';
Vue.use(cardC)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

console.log('系统环境变量',process.env)
