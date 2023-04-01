import axios from  "axios"
import { ElMessage } from 'element-plus'
import router from '~/router'

const Axios = axios.create({
	baseURL: import.meta.env.BASE_URL,
	headers: {
		"Content-Type": "application/json"
	},
})


Axios.interceptors.request.use((config:any) =>{
  let token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

	return config
}, err => Promise.reject(err))


Axios.interceptors.response.use((res: any) => {
  let auth = res.headers.authorization
  let data = res.data

  if (auth) {
    auth = auth.replace('Bearer ', '')
    localStorage.setItem("token", auth)
  }

  if (data.code !== 200) {
    // not auth
    if (data.code === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        router.replace({ name: 'Login'})
    }

    ElMessage({
      message: data.message,
      type: 'error'
    })
    return Promise.reject(data.message)
  }

	return data
}, err => {
  ElMessage({
    message: err.message,
    type: 'error'
  })
  return Promise.reject(err)
})

export default Axios