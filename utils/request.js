import store from '@/store'
import config from '@/config'
import {
	getToken
} from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import {
	toast,
	showConfirm,
	tansParams
} from '@/utils/common'

let timeout = 10000
const baseUrl = config.baseUrl


const generateJsonwebToken = (apikey, expSeconds) => {
	const KJUR = require('jsrsasign');
	const [id, secret] = apikey.split('.');
	const now = Math.floor(Date.now() / 1000);
	const exp = now + expSeconds;

	const header = {
		alg: 'HS256',
		"sign_type": "SIGN"
	};
	const payload = {
		api_key: id,
		exp: exp,
		timestamp: now
	};

	const jwt = KJUR.jws.JWS.sign('HS256', JSON.stringify(header), JSON.stringify(payload), secret);
	return jwt;

}
const request = config => {
	let jwt = generateJsonwebToken('babd0063035ea6a014ea6e9a89d94fa9.IizXfjzoknR9FyEg', 3600);

	// 是否需要设置 token
	config.header = config.header || {}
	config.header['Authorization'] = jwt;
	
	return new Promise((resolve, reject) => {
		uni.request({
				method: config.method || 'get',
				timeout: config.timeout || timeout,
				url: config.baseUrl || baseUrl + config.url,
				data: config.data,
				header: config.header,
				dataType: 'json'
			}).then(response => {
				let [error, res] = response
				if (error) {
					toast('后端接口连接异常')
					reject('后端接口连接异常')
					return
				}
				const code = res.data.code || 200
				const msg = errorCode[code] || res.data.msg || errorCode['default']
				if (code === 401) {
					showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
						if (res.confirm) {
							store.dispatch('LogOut').then(res => {
								uni.reLaunch({
									url: '/pages/login'
								})
							})
						}
					})
					reject('无效的会话，或者会话已过期，请重新登录。')
				} else if (code === 500) {
					toast(msg)
					reject('500')
				} else if (code !== 200) {
					toast(msg)
					reject(code)
				}
				resolve(res.data)
			})
			.catch(error => {
				let {
					message
				} = error
				if (message === 'Network Error') {
					message = '后端接口连接异常'
				} else if (message.includes('timeout')) {
					message = '系统接口请求超时'
				} else if (message.includes('Request failed with status code')) {
					message = '系统接口' + message.substr(message.length - 3) + '异常'
				}
				toast(message)
				reject(error)
			})
	})
}

export default request