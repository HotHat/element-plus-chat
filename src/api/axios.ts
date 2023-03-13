import axios from  "axios"

const Axios = axios.create({
	baseURL: "",
	headers: {
		"Content-Type": "application/json"
	}
  
})


Axios.interceptors.request.use((config:any) =>{
	return config
}, err => Promise.reject(err))


// Axios.interceptors.response.use((res: any) => {
	// return res
// })

export default Axios