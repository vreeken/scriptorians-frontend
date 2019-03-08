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
			me: null,
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
				console.log(json);
				if (json.token && json.username && json.user_id) {
					state.logged_in = true;
					state.me = {
						username: json.username,
						token: json.token,
						user_id: json.user_id,
						email: json.email
					}
					console.log('logged in as ' + json.username + ', with token: ' + json.token);
					return true;
				}
				return false;
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
