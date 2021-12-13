import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const actions = {
	// 获取空气质量
	getAirQuality(context) {
		axios.get('/air/now').then(res => {
			if (res.data.code === 200) {
				context.commit('GETAQI', res.data.now);
			}
		})
	},
	// 获取日月时间
	getSunMoon(context) {
		function sun() {
			return axios.get('/astronomy/sun');
		}

		function moon() {
			return axios.get('/astronomy/moon');
		}
		axios.all([sun(), moon()]).then(axios.spread((res1, res2) => {
			if (res1.data.code === 200 && res2.data.code === 200) {
				let sunRise = new Date(res1.data.sunrise);
				let sunSet = new Date(res1.data.sunset);
				let moonRise = new Date(res2.data.moonrise);
				let moonSet = new Date(res2.data.moonset);
				let moonPhase = res2.data.moonPhase;
				context.commit('GETSUNMOON', [{
					sunRise,
					sunSet,
					moonRise,
					moonSet
				}, moonPhase]);
			}
		}));
	},
	getWeather(context) {
		axios.get('/weather/now').then(res => {
			if (res.data.code === 200) {
				context.commit('GETWEATHER', res.data.now);
			}
		})
	},
	getRain(context) {
		axios.get('/minutely/5m').then(res => {
			if (res.data.code === 200) {
				context.commit('GETRAIN', {
					summary: res.data.summary,
					minutely: res.data.minutely
				});
			}
		})
	},
	getLifeIndex(context) {
		axios.get('/indices/1d').then(res => {
			if (res.data.code === 200) {
				context.commit('GETLIFEINDEX', res.data.daily);
			}
		})
	},
	getHours(context) {
		axios.get('/weather/24h').then(res => {
			if (res.data.code === 200) {
				context.commit('GETHOURS', res.data.hourly);
			}
		})
	}
}
const mutations = {
	GETAQI(state, value) {
		state.air = value;
	},
	GETSUNMOON(state, value) {
		state.SunMoon = value[0];
		state.moonPhase = value[1];
	},
	GETWEATHER(state, value) {
		state.now = value;
	},
	GETRAIN(state, value) {
		state.rain = value;
	},
	GETLIFEINDEX(state, value) {
		state.lifeIndex = value;
	},
	GETHOURS(state, value) {
		state.hours = value;
	}
}

const state = {
	air: null, // 空气质量
	SunMoon: null, // 日月时间
	moonPhase: null, // 月相
	now: null, // 当前天气
	rain: null, // 降水情况
	lifeIndex: null, // 生活指数
	hours: null, // 小时概况
}

export default new Vuex.Store({
	actions,
	mutations,
	state
})