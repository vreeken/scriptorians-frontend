export default async({ Vue }) => {
	const base = 'http://scriptorians.test/';
	const apiBase = 'http://scriptorians.test/api/';

	Vue.prototype.$urls = {
		base: base,
		json: {
			scriptures: base + 'json/scriptures.json',
			scriptures_summary: base + 'json/scriptures_summary.json'
		},
		chapterData: {
			get: apiBase + 'chapter-data'
		},
		comments: {
			submit: apiBase + 'comments/new',
			vote: apiBase + 'comments/vote'
		},
		auth: {
			register: apiBase + 'auth/register',
			login: apiBase + 'auth/login',
			logout: apiBase + 'auth/logout',
			csrf: apiBase + 'auth/csrf'
		}
	}
}
