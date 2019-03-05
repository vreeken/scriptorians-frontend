<template>
	<div class="comment-block">
		<comment-new :parentComment="null" @onSubmitCommentSuccess="replyToComment=false" @onSubmitCommentCancel="replyToComment=false"></comment-new>
		<comment-list :comments="comments"></comment-list>
	</div>
</template>

<script>
export default {
	name: 'CommentBlock',
	data: function() {
		return {
			newRootComment: '',
			newComment: {
				body: '',
				bodyError: '',
				ajaxError: ''
			}
		}
	},
	props: ['comments'],
	mounted: function() {

	},
	methods: {
		submitComment(v, c) {
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

	},
	filters: {

	}
}
</script>
