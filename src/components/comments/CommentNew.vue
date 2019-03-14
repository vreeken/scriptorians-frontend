<template>
	<div>
		<div class="field">
			<div class="control">
				<q-input v-model="newComment.body" :label="parentComment ? 'Reply Comment' : 'New Comment'" outlined autogrow />
				<!-- <textarea v-model="newComment.body" class="child-comment-body textarea" v-bind:class="{'error':newComment.bodyError}" type="text" placeholder="Comment" rows="2"></textarea> -->
			</div>
		</div>
		<div class="comment-buttons">
			<q-btn v-if="newComment.body" color="primary" icon-right="fas fa-arrow-right" @click="replyTo(parentComment)">Submit {{ parentComment ? 'Reply' : 'Top Level Comment' }}</q-btn>
			<q-btn v-if="newComment.body" color="negative" @click="cancelReply()">Cancel</q-btn>
		</div>
		<div class="error-field" v-if="newComment.ajaxError.length>0" v-html="newComment.ajaxError"></div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			newComment: {
				body: '',
				bodyError: false,
				ajaxError: ''
			}
		}
	},
	props: ['parentComment', 'verseId'],
	methods: {
		replyTo: function(comment) {
			if (!this.$store.state.logged_in) {
				window.rootVue.showError('You must be logged in to post a comment.');
				return;
			}

			const _this = this;

			this.$axios.post(this.$urls.comments.submit, {
				volume: this.$store.state.currVolume.id,
				book: this.$store.state.currBook.id,
				chapter: this.$store.state.currChapterNumber,
				verse: this.verseId,
				parent: this.parentComment ? this.parentComment.id : null,
				comment: this.newComment.body
			})
				.then(function(response) {
					console.log(response);
					console.log(response.data);
					if (response.data && response.data.success) {
						window.rootVue.showSuccess('Comment posted.');
						_this.newComment = {
							body: '',
							bodyError: false,
							ajaxError: ''
						}
						var c = response.data.comment;
						c.children = [];
						c.created_at = new Date(Date.now()).toLocaleString();
						c.upvotes = 0;
						// updated_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
						c.depth = _this.parentComment ? _this.parentComment.depth + 1 : 0;
						c.username = _this.$store.state.user.username;

						/*
						if (_this.parentComment) {
							if (!_this.parentComment.children) {
								_this.parentComment.children = [];
							}
							_this.parentComment.children.unshift(c);
						}
						else {

						}
						*/
						_this.$emit('onSubmitCommentSuccess', c);
					}
					else {
						window.rootVue.showError('Failed to post your comment. Please try again.');
					}
				})
				.catch(function(error) {
					console.log(error);
					window.rootVue.showError('Failed to post your comment. Please try again.');
				});
		},
		cancelReply: function() {
			this.newComment = {
				body: '',
				bodyError: false,
				ajaxError: ''
			}
			this.$emit('onSubmitCommentCancel');
		}
		/*
		if (!LOGGED_IN) {
			this.$root.$emit('showLogin', 'You must be logged in to comment');
			return;
		}

		//basic clientside validation
		if (this.newComment.body.length==0) {
			this.newComment.bodyError=true;
			return;
		}
		//Reset any errors
		this.newComment.bodyError=false;
		this.newComment.ajaxError="";

		//For use within Axios scope to gain access to 'this'
		var _this = this;

		console.log(this.postId);
		console.log(POST_TYPE);
		//ajax post
		axios.post(SUBMIT_COMMENT_URL, {
			post_type: POST_TYPE,
			post_id: this.postId,
			comment: this.newComment.body,
			parent_id: comment.id
		}, config)
		.then(function (response) {
			console.log(response);
			if (response.data.success) {
				//Create a new basic 'comment' with the newly submitted into and add to the parent comments list of children
				var c = {
					children: [],
					comment: _this.newComment.body,
					created_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
					downvotes: 0,
					upvotes: 1,
					id: response.data.new_id,
					parent_id: comment.id,
					updated_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
					username: USERNAME,
					voted: 1
				}
				//Add to 0 position of parent's children comments so that it show up on top (near the submit form),
				//if reloaded their comment will be at the end of the list, but this makes things more intuitive
				_this.comment.children.unshift(c);

				//unset the new comment data
				_this.newComment = {
					body: '',
					bodyError: false,
					ajaxError: ''
				}

				//Emit event to let parent (comment group) know the form is done
				_this.$emit('onReplySuccess');
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
	},
	computed: {

	},
	filters: {

	}
}
</script>
