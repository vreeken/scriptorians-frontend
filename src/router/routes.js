
const routes = [{
	path: '/',
	component: () => import('layouts/MainTemplate.vue'),
	children: [
		{
			path: '',
			component: () => import('pages/index.vue')
		},
		{
			path: 'scriptures',
			component: () => import('layouts/ScripturesTemplate.vue'),
			children: [
				{
					path: '',
					component: () => import('pages/scriptures/Index.vue')
				},
				{
					path: ':v/',
					component: () => import('pages/scriptures/VolumeView.vue')
				},
				{
					path: ':v/:b',
					component: () => import('pages/scriptures/BookView.vue')
				},
				{
					path: ':v/:b/:c',
					component: () => import('pages/scriptures/ChapterView.vue')
				}
			]
		},
		{
			path: 'register',
			component: () => import('pages/auth/RegisterView.vue')
		},
		{
			path: 'login',
			component: () => import('pages/auth/LoginView.vue')
		}
	]
}];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	})
}

export default routes
