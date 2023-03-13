import Axios from "./axios";


export function chat(params: any) {
	return Axios.post(params)
}


