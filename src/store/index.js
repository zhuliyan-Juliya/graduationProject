import Vue from 'vue';
import Vuex from 'vuex';
import { Loading, Message } from 'element-ui'
import router from '../router'
import api from '../axios/api'

Vue.use(Vuex);

const state = {
	counter: 0,
	userInfo: {}
}

const actions = {
	add: ({ commit }) => {
		return commit('add')
	},
	userInfo: ({ commit }, data) => {
		const loading = Loading.service({
			lock: true,
			text: '登录中...',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)',
		});
		api.login(data).then(res => {
			loading.close();
			if (res.success) {
				router.push({ path: '/Home' });
				Message.success({
					message: '登录成功！',
					duration: 1500
				});
				commit('userInfo', res.data)
			}
		});
	}
}

const mutations = {
	add: (state) => {
		state.counter++
		console.log('state.counter', state.counter)
	},
	removeUserInfo: (state) => {
		state.userInfo = {}
	},
	userInfo: (state, data) => {
		state.userInfo = data
		localStorage.setItem('userInfo', JSON.stringify(data))
	}
}

const getters = {
	getCounter (state) {
		return state.counter
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})