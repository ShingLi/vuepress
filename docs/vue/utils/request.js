/*
 * @Author: shingli
 * @Date: 2020-01-29 20:20:02
 * @LastEditTime : 2020-01-30 21:06:18
 * @LastEditors  : Please set LastEditors
 * @Description: 请求封装
 * @FilePath: \vuepress\docs\vue\utils\request.js
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './utils'
import store from 'store'

const service = axios.create({
	baseURL: process.env.VUE.APP_BASE_API,
	timeout: 5 * 1000
})

service.interceptors.request.use(
	config => {
		if (store.getters.token) {
			// 登陆成功存在 token
			config.headers['X-Toekn'] = getToken()
		}
		return config
	},
	error => {
		console.log('err' + error)
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		let { data } = response
		if (data.responseCode !== '0000') {
			// 9999 token 无效 6666 token 失效 8888 其他地方登陆
			if (data.responseCode == '9999' || data.responseCode == '8888' || data.responseCode == '6666') {
				// what to do ?
				Message({
					type: data.responseCode === 9999 ? 'error' : 'warning',
					message: data.responseMg || 'Error',
					duration: 50000
				})
			}
			return Promise.reject(new Error(data.responseMsg || 'Error'))
		} else return data
	},
	error => {
		console.log('err' + error)
		Message({
			type: 'error',
			message: error,
			duration: 5000
		})
		return Promise.reject(error)
	}
)

export default service
