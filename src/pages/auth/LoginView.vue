<template>
	<q-page class="flex flex-center">
		Login
	</q-page>
</template>

<style>
</style>

<script>
export default {
	name: 'LoginView',
	props: [],
	data() {
		return {
		}
	},
	mounted: function() {

	},
	methods: {
		singleChapterReplaceState: function() {
			// Skip showing the list of chapters because there's only one, go to that only chapter
			this.$router.replace(this.book.url + '/1');
		}
	},
	computed: {
		num_chapters: function() {
			if (this.book === null) {
				return 0;
			}
			if (this.book.num_chapters === 1) {
				this.singleChapterReplaceState();
			}
			return this.book.num_chapters;
		},
		fullPath: function() {
			// This forces a trailing slash onto our url path
			// Since a user can enter our SPA at any location with or without a trailing slash on the url
			// We have to make this consistent
			return this.$route.fullPath.slice(-1) === '/' ? this.$route.fullPath : this.$route.fullPath + '/';
		}
	}
}
</script>
