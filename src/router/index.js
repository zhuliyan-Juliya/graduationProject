import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
// import About from '../views/About.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/Home',
            name: 'Home',
            // component: Home
            component: () => import(/* webpackChunkName: "Home" */ '../App.vue')
        },
        {
            path: '/Login',
            name: 'Login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '*',
            redirect: '/Home'
        }
    ]
})