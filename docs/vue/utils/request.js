import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
	baseURL: process.env.VUE.APP_BASE_API,
	timeout: 5 * 1000
})

export default service
