export default async({ Vue }) => {
	Vue.prototype.$urls = {
		base: 'http://scriptorians.test/api/',
		comments: {
			get: 'comments/get',
			submit: 'comments/new',
			vote: 'comments/vote'
		}
	}
}
