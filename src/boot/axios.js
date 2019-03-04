import axios from 'axios'

export default async({ Vue }) => {
	axios.defaults.baseURL = 'http://scriptorians.test/api/';
	Vue.prototype.$axios = axios
}
