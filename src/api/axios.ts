import axios from  "axios"
import { ElMessage } from 'element-plus'

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
    ElMessage({
      message: data.message,
      type: 'error'
    })
    return Promise.reject(new Error(data.message))
  }

	return data
}, err => {
  return Promise.reject(err)
})

export default Axios