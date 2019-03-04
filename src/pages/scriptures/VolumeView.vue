<template>
	<q-page class="flex flex-center">
		<div v-if="volume && volume.books">
			<div v-for="b in volume.books" v-bind:key="b.id">
				<router-link :to="fullPath+b.url" v-html="b.title" ></router-link>
			</div>
		</div>
	</q-page>
</template>

<style>
</style>

<script>
export default {
	name: 'PageScripturesVolumeView',
	props: ['state', 'volume', 'book', 'chapter'],
	data() {
		return {
		}
	},
	mounted: function() {

	},
	methods: {
		singleBookReplaceState: function() {
			// Skip showing the list of chapters because there's only one, go to that only chapter
			this.$router.replace(this.volume.url + '/' + this.volume.books[0].url);
		}
	},
	computed: {
		num_books: function() {
			if (this.volume === null) {
				return 0;
			}
			if (this.volume.books.length === 1) {
				this.singleBookReplaceState();
			}
			return this.volume.books.length;
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
