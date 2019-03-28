<template>
	<q-page class="flex flex-center">
		<div>
			<div class="chapter-header scripture-font">
				{{ book.title_long }}
				<br />
				<small>Chapter {{ currChapterNumber }}</small>
			</div>
			<div class="scripture-container" v-if="verses.length">
				<verse-view v-for="(v, index) in verses" :key="index" :verse="v"></verse-view>
			</div>
		</div>

	</q-page>
</template>

<style>
</style>

<script>
export default {
	name: 'ChapterView',
	props: ['state', 'volume', 'book', 'chapter', 'currChapterNumber'],
	data() {
		return {
			verses: []
		}
	},
	mounted: function() {
		this.$store.commit('setVBC', {
			v: this.volume,
			b: this.book,
			c: this.currChapterNumber
		});

		// Check if we're coming back here and already have chapterData and restore it if we do
		if (this.$store.state.chapterData && this.$store.state.chapterData.vbcId === this.vbcId) {
			// Restore our verses data (which also includes any comments each verse has)
			this.verses = this.$store.state.chapterData.verses;
		}
		else {
			// Clear any existing chapterData from a different chapter
			this.$store.state.chapterData = null;

			// Get all of the appropriate verses and push to our array
			for (let i = 0; i < this.chapter.verses.length; i++) {
				this.verses.push({ num: i + 1, text: this.chapter.verses[i], comments: [] });
			}

			// And get any comments from the server
			this.fetchComments();
		}
	},
	methods: {
		fetchComments: function() {
			const _this = this;

			this.$axios.post(this.$urls.chapterData.get, {
				volume: this.volume.id,
				book: this.book.id,
				chapter: this.currChapterNumber
			})
				.then(function(response) {
					if (response.data && response.data.success) {
						_this.processComments(response.data.comments);
					}
					else {
						window.rootVue.showError('Failed to retrieve comments. Please try again later.');
					}
				})
				.catch(function(error) {
					console.log(error);
					window.rootVue.showError('Failed to retrieve comments. Please try again later.');
				});
		},
		processComments: function(c) {
			// Loop through all the comments and organize them in a parent->child format

			const commentIdMap = {}; // Keeps track of nodes using id as key, for fast lookup
			const roots = []; // Initially set our roots node to an array

			// Loop over data
			c.forEach(function(comment) {
				// A comment's lineage is in this format: ##/##/##, where each # is a comment id
				// Counting the /'s will give us the comment's depth
				comment.depth = comment.lineage.split('/').length - 1;

				// each node will have children, so let's give it a "children" poperty
				comment.children = [];

				// add an entry for this node to the map so that any future children can lookup the parent
				commentIdMap[comment.id] = comment;

				// Does this node have a parent?
				if (comment.parent_id == null) {
					// No, so add it to the array of root nodes
					roots.push(comment);
				}
				else {
					// This node has a parent, so let's look it up using the id
					let parentNode = commentIdMap[comment.parent_id];

					// Let's add the current node as a child of the parent node.
					parentNode.children.push(comment);
				}
			});

			// Add each root (a comment without a parent) to the corresponding verse object
			for (let i = 0; i < roots.length; i++) {
				this.verses[roots[i].verse_id - 1].comments.push(roots[i]);
			}

			// Do any comment sorting here (newest, top, etc)
		}
	},
	beforeDestroy: function() {
		this.$store.commit('setChapterData', {
			vbcId: this.vbcId,
			verses: this.verses
		});
	},
	computed: {
		// A unique to each chapter identifier used to restore state data upon returning to this chapter
		vbcId: function() {
			return this.volume.id + ',' + this.book.id + ',' + this.currChapterNumber;
		}
	}
}
</script>
