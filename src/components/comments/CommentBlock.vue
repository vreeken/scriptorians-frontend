<template>
	<div class="comment-block">
		<comment-new :parentComment="null" @onSubmitCommentSuccess="onSubmitSuccess" @onSubmitCommentCancel="onSubmitCancel" :verseId="verseId"></comment-new>
		<comment-list :comments="comments" :verseId="verseId"></comment-list>
	</div>
</template>

<script>
export default {
	name: 'CommentBlock',
	data: function() {
		return {

		}
	},
	props: ['comments', 'verseId'],
	mounted: function() {

	},
	methods: {
		onSubmitSuccess: function(c) {
			this.comments.unshift(c);
		},
		onSubmitCancel: function() {

		}
	},
	computed: {

	},
	filters: {

	}
}
</script>
