<template>
	<q-page class="flex flex-center">
		<div v-if="volumes">
			<div v-for="v in volumes" v-bind:key="v.id">
				<router-link :to="fullPath+v.url" v-html="v.title_long" ></router-link>
			</div>
		</div>
	</q-page>
</template>

<style>
</style>

<script>
export default {
	name: 'PageIndex1',
	props: ['state', 'volumes'],
	data() {
		return {
			// registerTitle: REGISTER_TITLE,
		}
	},
	mounted: function() {
		// Event Listeners
		// this.$root.$on('upvote', (p) => { this.upvote(p); });
	},
	methods: {

	},
	computed: {
		fullPath: function() {
			// This forces a trailing slash onto our url path
			// Since a user can enter our SPA at any location with or without a trailing slash on the url
			// We have to make this consistent
			return this.$route.fullPath.slice(-1) === '/' ? this.$route.fullPath : this.$route.fullPath + '/';
		}
	}
}
</script>
