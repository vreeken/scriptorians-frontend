import axios from 'axios'

export default async({ Vue }) => {
	axios.defaults.baseURL = 'http://scriptorians.test/api/';
	// axios.defaults.withCredentials = true;
	Vue.prototype.$axios = axios
}
