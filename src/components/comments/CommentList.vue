<template>
	<div class="comment-list">
		<comment v-for="comment in comments" :key="comment.id" :comment="comment" :postId="postId"></comment>
	</div>
</template>

<script>
export default {
	name: 'CommentList',
	data: function() {
		return {

		}
	},
	props: ['comments'],
	methods: {

	},
	computed: {

	},
	filters: {

	}
}
</script>
