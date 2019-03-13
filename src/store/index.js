import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
	const store = new Vuex.Store({
		state: {
			logged_in: false,
			user: null,
			scriptures: [],
			scripturesSummary: [],
			currVolume: null,
			currBook: null,
			currChapter: null,
			currVerse: null,
			currComment: null,
			chapterData: null,
			redirectRoute: null
		},
		mutations: {
			setScripturesJson(state, json) {
				state.scriptures = json;
			},
			setScripturesSummaryJson(state, json) {
				state.scripturesSummary = json;
			},
			setChapterData(state, o) {
				state.chapterData = o;
			},
			login(state, json) {
				if (json && json.username && json.user_id) {
					state.logged_in = true;
					state.user = {
						username: json.username,
						user_id: json.user_id,
						email: json.email
					}
					console.log('logged in as ' + json.username);

					return true;
				}
				return false;
			},
			logout(state) {
				state.user = null;
				state.logged_in = false;
				console.log('logged out');
			},
			redirectRoute(state, route) {
				state.redirectRoute = route;
			},
			clearRedirectRoute(state) {
				state.redirectRoute = null;
			},
			setCurrVolume(state, o) {
				state.currVolume = o;
			},
			setCurrBook(state, o) {
				state.currBook = o;
			},
			setCurrChapter(state, o) {
				state.currChapter = o;
			},
			setCurrVerse(state, o) {
				state.currVerse = o;
			},
			setCurrComment(state, o) {
				state.currComment = o;
			}
		}
	});

	// Make store accessible from window, mainly for within our router dealing with beforeEach()
	window.Store = store;

	return store
}
