import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// import store from '../store/index.js';

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function(/* { store, ssrContext } */) {
	const Router = new VueRouter({
		scrollBehavior: () => ({ y: 0 }),
		routes,

		// Leave these as is and change from quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		mode: process.env.VUE_ROUTER_MODE,
		base: process.env.VUE_ROUTER_BASE
	});

	// Check before each navigation if we are going somewhere temporarily and want to return
	// Like login or register
	// Save our from location, and when we are done logging in or registering then we recall the location
	Router.beforeEach((to, from, next) => {
		if (to.fullPath === '/login' || to.fullPath === '/register') {
			// Make sure we aren't coming from a different "do not remember" route
			if (from.fullPath !== '/login' && from.fullPath !== '/register') {
				window.Store.commit('redirectRoute', from.fullPath);
			}
		}
		next();
	})

	return Router
}
