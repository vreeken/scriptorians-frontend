<template>
	<div v-bind:class="[bgClass]" class="comment-group">
		<div class="post-comment">
			<div class="comment-vote-btns not-mobile">
				<div class="vote-arrow up" @click="voteOnComment(1, comment)" v-bind:class="{'voted': comment.voted==1}">
					<i class="fas fa-arrow-alt-circle-up"></i>
				</div>
				<!--
				<div class="vote-arrow down" @click="voteOnComment(0, comment)" v-bind:class="{'voted': comment.voted==0}">
					<i class="fas fa-arrow-alt-circle-down"></i>
				</div>
				-->
			</div>
			<div>
				<div class="comment-body" v-html="comment.comment"></div>
				<div class="comment-header">
					<div>
						<span class="vote-arrow mobile-only-inline up" @click="voteOnComment(1, comment)" v-bind:class="{'voted': comment.voted==1}"><i class="fas fa-arrow-alt-circle-up"></i></span>
						<span class="comment-score" v-bind:title="'+'+comment.upvotes+' -'+comment.downvotes">{{ comment.upvotes-comment.downvotes }} point<span v-if="comment.upvotes-comment.downvotes != 1 && comment.upvotes-comment.downvotes != -1">s</span></span>
						<span class="vote-arrow mobile-only-inline down" @click="voteOnComment(0, comment)" v-bind:class="{'voted': comment.voted==0}"><i class="fas fa-arrow-alt-circle-down"></i></span>
						<span class="comment-author"> - Posted by {{ comment.username }}</span>&nbsp;<span class="comment-date">{{ comment.created_at | fromNow }}</span>
					</div>
					<div>
						<span class="comment-reply-btn fake-link" @click="replyToComment == comment ? replyToComment=false : replyToComment=comment">&nbsp;Reply</span>
						<span v-if="comment.username===me.username">
							&nbsp;&bull;&nbsp;<span class="comment-edit-btn fake-link" @click="editComment == comment ? editComment=false : editComment=comment">Edit</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<comment-new v-if="replyToComment == comment" :comment="comment" :parentComment="this" @onSubmitCommentSuccess="replyToComment=false" @onSubmitCommentCancel="replyToComment=false"></comment-new>
		<comment-edit v-if="editComment == comment" :comment="comment" :editComment="editComment" @onEditSuccess="editComment=false" @onEditCancel="editComment=false"></comment-edit>
		<comment-list v-if="comment.children.length" v-bind:comments="comment.children"></comment-list>
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
	props: ['comment'],
	mounted: function() {

	},
	methods: {
		voteOnComment(v, c) {
			/*
			if (v!=0 && v!=1) { return; }

			var _this = this;
			//ajax post
			axios.post(VOTE_URL, {
				type: POST_TYPE+"_comment",
				id: _this.comment.id,
				vote: v
			}, config)
			.then(function (response) {
				console.log(response);
				if (response.data.success) {
					if (response.data.success == "vote_saved") {
						if (v==1) { _this.comment.upvotes+=1; }
						else if (v==0) { _this.comment.downvotes+=1; }
						_this.comment.voted=v;
					}
					else if (response.data.success == "vote_unchanged") {

					}
					else if (response.data.success == "vote_updated") {
						if (v==1) {
							_this.comment.upvotes+=1;
							_this.comment.downvotes-=1;
						}
						else if (v==0) {
							_this.comment.downvotes+=1;
							_this.comment.upvotes-=1;
						}
						_this.comment.voted=v;
					}
				}
				else {
					//Unknown Error
					_this.newComment.ajaxError = "An error has occurred. Please try again.";
				}
			})
			.catch(function (error) {
				console.log("ERROR");
				console.log(error);
				console.log(error.response.headers);
				console.log(error.response.data);
				//invalid_parameters
				//db_error
				_this.newComment.ajaxError = "An error has occurred. Please try again.";
			});
			*/
		}
	},
	computed: {
		me: function() {
			if (this.$store.state.me && this.$store.state.me.username) {
				return this.$store.state.me.username;
			}
			else {
				return '';
			}
		}
	}
}
</script>
