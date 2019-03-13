import axios from 'axios'

export default async({ Vue }) => {
	axios.defaults.baseURL = 'http://scriptorians.test/api/';
	let token = document.head.querySelector('meta[name="csrf-token"]');
	axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

	Vue.prototype.$axios = axios
}
