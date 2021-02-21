import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
// import About from '../views/About.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/Home',
            name: 'Home',
            // component: Home
            component: () => import(/* webpackChunkName: "Home" */ '../views/Layout.vue'),
            children: [
                {
                    path: 'Main',
                    name: 'Main',
                    component: () => import('../views/main/Main.vue'),
                }
            ]
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