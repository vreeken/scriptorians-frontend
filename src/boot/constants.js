export default async({ Vue }) => {
	Vue.prototype.$urls = {
		base: 'http://scriptorians.test/api/',
		json: {
			scriptures: 'http://scriptorians.test/json/scriptures.json',
			scriptures_summary: 'http://scriptorians.test/json/scriptures_summary.json'
		},
		comments: {
			get: 'comments/get',
			submit: 'comments/new',
			vote: 'comments/vote'
		},
		auth: {
			register: 'auth/register',
			login: 'auth/login'
		}
	}
}
