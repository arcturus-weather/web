import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const actions = {
	// 获取空气质量
	getAirQuality(context) {
		axios.get('/air/now').then(res => {
			if (res.data.code === 200) {
				context.commit('GETAQI', res.data.now)
			}
		})
	}
}
const mutations = {
	GETAQI(state, value) {
		state.air = value;
	}
}
const state = {
	air: {} // 空气质量
}

export default new Vuex.Store({
	actions,
	mutations,
	state
})