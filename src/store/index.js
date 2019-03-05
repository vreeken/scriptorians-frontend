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
			chapterData: null
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
	})

	return store
}
