import Axios from "./axios";


export function chat(params: any) {
	return Axios.post(params)
}

export function login(email: string, password: string) {
	return Axios.post('/api/store/lz/login', {
		email: email,
		password: password
	})
}


