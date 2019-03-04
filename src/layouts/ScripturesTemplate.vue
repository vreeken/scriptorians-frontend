<template>
	<div>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Scriptures" to="/scriptures" />
				<q-breadcrumbs-el v-if="currVolume" :label="currVolume.title" :to="'/scriptures/'+currVolume.url" />
				<q-breadcrumbs-el v-if="currBook" :label="currBook.title" :to="'/scriptures/'+currVolume.url+'/'+currBook.url" />
				<q-breadcrumbs-el v-if="paramChapter" :label="paramChapter" />
			</q-breadcrumbs>
		</div>
		<router-view class="content-container" v-if="childDataReady" :state="$store.state" :volumes="volumes" :volume="currVolume" :book="currBook" :chapter="currChapter" :currChapterNumber="paramChapter" />
		<q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" />
	</div>
</template>

<script>
import { openURL } from 'quasar'

export default {
	name: 'ScripturesLayout',
	data() {
		return {
			leftDrawerOpen: this.$q.platform.is.desktop,
			scripturesJsonVersion: '0.3',
			childDataReady: false,
			currRoute: null,
			currChapterNumber: null,
			fullPath: null
		}
	},
	mounted: function() {
		// Override the default material icon used by quasar with the fontawesome version
		this.$q.iconSet.arrow.dropdown = 'fas fa-caret-down';

		if (this.$route.params.c) {
			this.currChapterNumber = this.$route.params.c;
			this.currRoute = 'chapter';
		}
		else if (this.$route.params.b) {
			this.currRoute = 'book';
		}
		else if (this.$route.params.v) {
			this.currRoute = 'volume';
		}
		else {
			this.currRoute = 'volumes';
			this.childDataReady = true;
		}

		this.setupScripturesJSON();
	},
	methods: {
		openURL,
		setupScripturesJSON: function() {
			const scripturesJsonVersion = localStorage.getItem('scriptures_json_version');
			if (scripturesJsonVersion !== this.currentScripturesJsonVersion) {
				// console.log('scriptures.json version out of date, fetching new version...');
				this.fetchScripturesJSON();
				this.fetchScripturesSummaryJSON();
				return;
			}

			const scripturesJson = localStorage.getItem('scriptures_json');
			if (scripturesJson === null) {
				// console.log('scriptures.json NOT found in localStorage, fetching...');
				this.fetchScripturesJSON();
			}
			else {
				// console.log('using current version scriptures.json found in localStorage');
				this.$store.commit('setScripturesJson', scripturesJson);
			}

			const scripturesSummaryJson = localStorage.getItem('scriptures_summary_json');
			if (scripturesSummaryJson === null) {
				// console.log('scriptures.json NOT found in localStorage, fetching...');
				this.fetchScripturesJSON();
			}
			else {
				// console.log('using current version scriptures.json found in localStorage');
				this.$store.commit('setScripturesSummaryJson', scripturesSummaryJson);
			}
		},
		fetchScripturesJSON: function() {
			const _this = this;
			this.$axios({ url: 'statics/scriptures.json', baseURL: '' })
				.then(function(response) {
					if (response.data) {
						_this.$store.commit('setScripturesJson', response.data);
						localStorage.setItem('scriptures_json', response.data);
						localStorage.setItem('scriptures_json_version', _this.scripturesJsonVersion);
						// console.log('scriptures.json downloaded from server and saved to localStorage');
					}
					else {
						// TODO handle this error
						console.log('Error');
						console.log(response);
						console.log(response.data);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		fetchScripturesSummaryJSON: function() {
			const _this = this;
			this.$axios({ url: 'statics/scriptures_summary.json', baseURL: '' })
				.then(function(response) {
					if (response.data) {
						_this.$store.commit('setScripturesSummaryJson', response.data);
						localStorage.setItem('scriptures_summary_json', response.data);
						localStorage.setItem('scriptures_json_version', _this.scripturesJsonVersion);
						// console.log('scriptures.json downloaded from server and saved to localStorage');
					}
					else {
						// TODO handle this error
						console.log('Error');
						console.log(response);
						console.log(response.data);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	computed: {
		paramVolume: function() {
			return this.$route.params.v ? this.$route.params.v : null;
		},
		paramBook: function() {
			return this.$route.params.b ? this.$route.params.b : null;
		},
		paramChapter: function() {
			return this.$route.params.c ? this.$route.params.c : null;
		},
		volumes: function() {
			if (this.$store.state.scripturesSummary === null || this.$store.state.scripturesSummary.length === 0) {
				return [];
			}

			return this.$store.state.scriptures_summary;
		},
		currVolumeId: function() {
			if (this.$store.state.scriptures_summary === null || this.$store.state.scripturesSummary.length === 0 || this.paramVolume === null) {
				return null;
			}

			for (let i = 0; i < this.$store.state.scripturesSummary.length; i++) {
				if (this.$store.state.scripturesSummary[i].url === this.paramVolume) {
					return i;
				}
			}

			console.log('Error retrieving volume data from url: ' + this.paramVolume);
			return null;
		},
		currVolume: function() {
			return this.currVolumeId !== null ? this.$store.state.scripturesSummary[this.currVolumeId] : null;
		},
		currBookId: function() {
			if (this.currVolume === null || this.paramBook === null) {
				return null;
			}

			for (let i = 0; i < this.currVolume.books.length; i++) {
				if (this.currVolume.books[i].url === this.paramBook) {
					return i;
				}
			}

			console.log('Error retrieving book data from url: ' + this.paramBook);
			return null;
		},
		currBook: function() {
			return this.currBookId !== null ? this.currVolume.books[this.currBookId] : null;
		},
		currChapterId: function() {
			return this.paramChapter === null ? null : this.paramChapter - 1;
		},
		currChapter: function() {
			if (this.currChapterId === null || this.currVolumeId === null || this.currBookId === null || this.$store.state.scriptures === null || this.$store.state.scriptures.length === 0) {
				return null;
			}

			return this.currChapterId !== null ? this.$store.state.scriptures[this.currVolumeId].books[this.currBookId].chapters[this.currChapterId] : null;
		}
	},
	watch: {
		'$route'(to, from) {
			// Init to false to hide child component until all necessary data has been calculated
			this.childDataReady = false;
			// route change
			if (this.$route.params.c) {
				this.currRoute = 'chapter';
			}
			else if (this.$route.params.b) {
				this.currRoute = 'book';
			}
			else if (this.$route.params.v) {
				this.currRoute = 'volume';
			}
			else {
				this.currRoute = 'volumes';
				this.childDataReady = true;
			}
		},
		currVolume: function() {
			// If we are only on the Volume view page then we have all data necessary (currVolume)
			if (this.currRoute === 'volume') {
				this.childDataReady = true;
			}
		},
		currBook: function() {
			// If we are only on the Book view page then we have all data necessary (currVolume and currBook)
			if (this.currRoute === 'book') {
				this.childDataReady = true;
			}
		},
		currChapter: function() {
			// If we are on the Chapter view page then we have all data necessary (currVolume, currBook, and currChapter)
			if (this.currRoute === 'chapter') {
				this.childDataReady = true;
			}
		}
	}
}
</script>

<style>
.toolbar-subtitle {
	margin-top: -5px;
	margin-left: 2rem;
	font-size: .5em;
	font-style: italic;
}
.header-logo {
	height: 44px;
	width: 44px;
}
</style>
