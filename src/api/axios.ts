import axios from  "axios"

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
  let auth = res.headers.authonization

  if (auth) {
    auth = auth.replace('Bearer ', '')
    localStorage.setItem("token", auth)
  }


	return res
}, err => {
  return Promise.reject(err)
})

export default Axios