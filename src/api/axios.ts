import axios from  "axios"

const Axios = axios.create({
	baseURL: import.meta.env.BASE_URL,
	headers: {
		"Content-Type": "application/json"
	},
	proxy: {
    protocol: 'http',
    host: '127.0.0.1',
    port: 80,
    // auth: {
      // username: 'mikeymike',
      // password: 'rapunz3l'
    // }
  },
  
})


Axios.interceptors.request.use((config:any) =>{
	return config
}, err => Promise.reject(err))


// Axios.interceptors.response.use((res: any) => {
	// return res
// })

export default Axios