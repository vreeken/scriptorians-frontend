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
		for (let i = 0; i < this.chapter.verses.length; i++) {
			this.verses.push({ num: i + 1, text: this.chapter.verses[i], comments: [] });
		}
		this.fetchComments();
	},
	methods: {
		fetchComments: function() {
			const _this = this;
			this.$axios.post(this.$urls.comments.get, {
				v: this.volume.id,
				b: this.book.id,
				c: this.currChapterNumber
			}, window.config)
				.then(function(response) {
					if (response.data && response.data.success) {
						_this.processComments(response.data.comments);
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

			/*
			// This recursive method assigns a "depth" property to each comment
			// The "depth" property is currently just used for DOM formatting
			const processLoop = function(parent) {
				let _this = this;
				parent.children.forEach(function(c) {
					c.depth = parent.depth + 1;
					if (c.children.length) {
						_this.processLoop(c);
					}
				});
			}

			// Assign a "depth" value to each comment using recursion to get all children
			for (let i = 0; i < roots.length; i++) {
				// root parents have a depth of 0
				roots[i].depth = 0;
				// Loop through each child and give it a depth
				processLoop(roots[i]);
			}
			*/

			// Add each root (comment without a parent) to the appropriate verse object
			for (let i = 0; i < roots.length; i++) {
				this.verses[roots[i].verse_id - 1].comments.push(roots[i]);
			}
		}
	},
	computed: {

	}
}
</script>
