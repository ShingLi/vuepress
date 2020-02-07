/*
 * @Author: Jane
 * @Date: 2020-01-29 20:20:02
 * @LastEditTime : 2020-02-03 13:38:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuepress\docs\vue\utils\request.js
 */

import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from 'store/getter'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000
})

const errorTips = error => {
	console.log('err' + error)
	Message({
		type: 'error',
		message: error || 'Error',
		duration: 5000
	})
	return Promise.reject(new Error(error || 'Error'))
}

service.interceptors.request.use(
	config => {
		if (getToken()) {
			config.headers['X-Token'] = getToken()
		}
		return config
	},
	error => {
		return errorTips(error)
	}
)

service.interceptors.response.use(
	res => {
		let { data: { responseCode, responseMsg} } = res
		if (responseCode && responseCode == 0000) {
			return data
		} else {
			if (responseCode && (responseCode == 9999 || responseCode == 8888 || responseCode == 6666)) {
				return errorTips(responseMsg)
			} else {
				console.log('错误状态码' + responseCode)
				return Promise.reject()
			}
		}
	},
	error => {
		return errorTips(error)
	}
)

export default service