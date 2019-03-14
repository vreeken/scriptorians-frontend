<template>
	<div v-bind:class="[bgClass]" class="comment-group">
		<div class="post-comment">
			<div class="comment-vote-btns gt-xs">
				<div>
					{{ comment.upvotes }}
				</div>
				<div class="vote-btn" @click="voteOnComment(comment)" v-bind:class="{'voted': comment.voted==1}">
					<i class="fas fa-thumbs-up"></i>
				</div>
			</div>
			<div>
				<div class="comment-body" v-html="comment.comment"></div>
				<div class="comment-header">
					<div>
						<span class="vote-btn lt-xs" @click="voteOnComment(comment)" v-bind:class="{'voted': comment.voted==1}"><i class="fas fa-thumbs-up"></i></span>
						<span class="comment-score lt-xs" v-bind:title="'+'+comment.upvotes">{{ comment.upvotes }} point<span v-if="comment.upvotes != 1">s</span> - </span>
						<span class="comment-author">Posted by {{ comment.username }}</span>&nbsp;<span class="comment-date">{{ comment.created_at | fromNow }}</span>
					</div>
					<div>
						<span class="comment-reply-btn fake-link" @click="replyToComment == comment ? replyToComment=false : replyToComment=comment">&nbsp;Reply</span>
						<span v-if="comment.username===$store.state.user.username">
							&nbsp;&bull;&nbsp;<span class="comment-edit-btn fake-link" @click="editComment == comment ? editComment=false : editComment=comment">Edit</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<comment-new v-if="replyToComment == comment" :parentComment="comment" @onSubmitCommentSuccess="onSubmitSuccess" @onSubmitCommentCancel="onSubmitCancel" :verseId="verseId"></comment-new>
		<comment-edit v-if="editComment == comment" :comment="comment" :editComment="editComment" @onEditSuccess="editComment=false" @onEditCancel="editComment=false"></comment-edit>
		<comment-list v-if="comment.children.length" v-bind:comments="comment.children" :verseId="verseId"></comment-list>
	</div>
</template>

<script>

export default {
	name: 'Comment',
	data: function() {
		return {
			replyToComment: false,
			editComment: false,
			bgClass: 'cg' + this.comment.depth % 5
		}
	},
	props: ['comment', 'verseId'],
	mounted: function() {

	},
	methods: {
		onSubmitSuccess: function(c) {
			this.comment.children.unshift(c);
			this.replyToComment = false;
		},
		onSubmitCancel: function() {
			this.replyToComment = false;
		},
		voteOnComment(comment) {
			if (!this.$store.state.logged_in) {
				window.rootVue.showError('You must be logged in to vote.');
				return;
			}

			const _this = this;

			this.$axios.post(this.$urls.comments.vote, {
				comment_id: this.comment.id
			})
				.then(function(response) {
					console.log(response);
					console.log(response.data);
					if (response.data && response.data.success) {
						if (response.data.vote === 1) {
							_this.comment.upvotes += 1;
							_this.comment.voted = true;
						}
						else if (response.data.vote === 0) {
							_this.comment.upvotes -= 1;
							_this.comment.voted = false;
						}
					}
					else {
						window.rootVue.showError('Failed to vote. Please try again.');
					}
				})
				.catch(function(error) {
					console.log(error);
					window.rootVue.showError('Failed to vote. Please try again.');
				});
		}
	},
	computed: {
	}
}
</script>
