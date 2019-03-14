<template>
	<div class="comment-list">
		<comment v-for="comment in comments" :key="comment.id" :comment="comment" :verseId="verseId"></comment>
	</div>
</template>

<script>
export default {
	name: 'CommentList',
	data: function() {
		return {

		}
	},
	props: ['comments', 'verseId'],
	methods: {

	},
	computed: {

	},
	filters: {

	}
}
</script>
