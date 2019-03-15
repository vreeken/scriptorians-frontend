<template>
	<div class="verse-container">
		<div class="scripture-font" v-touch-hold.mouse="toggleOptions">
			<span @click="toggleOptions" class="verse-number" v-bind:class="{'has-comments':verse.comments.length}">{{ verse.num }}</span>&nbsp;<span>{{ verse.text }}</span>
		</div>
		<div v-if="showingComments">
			<ul style="" class="post-buttons">
				<li class="post-save">
					<span v-if="verse.faved" class="post-save link" @click="unfaveVerse(verse)"><i class="fas fa-bookmark" /> unfave</span>
					<span v-else class="post-save link" @click="faveVerse(verse)"><i class="far fa-bookmark" /> fave</span>
				</li>
				<li class="post-share">
					<span class="post-share link" @click="shareVerse"><i class="fas fa-share-alt" /> share</span>
				</li>
				<li class="post-report-button">
					<span class="post-report link" @click="reportVerse"><i class="fas fa-exclamation-triangle" /> report</span>
				</li>
			</ul>
			<comment-block  :comments="verse.comments" :verseId="verse.num"></comment-block>
		</div>

		<!--
		<div class="new-comment">
			<div class="error-field" v-if="newComment.bodyError.length>0" v-html="newComment.bodyError"></div>
			<div class="field">
				<div class="control">
					<textarea v-model="newComment.body" id="comment-body" class="textarea" v-bind:class="{'error':newComment.bodyError.length>0}"  type="text" placeholder="Comment" rows="2"></textarea>
				</div>
			</div>
			<div class="button is-block is-info is-large is-fullwidth" @click="submitComment()">Submit Comment</div>
			<div class="error-field" v-if="newComment.ajaxError.length>0" v-html="newComment.ajaxError"></div>
		</div>
		<comment-list :comments="comments" :postId="post.id"></comment-list>
		-->
	</div>
</template>

<script>
export default {
	name: 'VerseView',
	data: function() {
		return {
			showingComments: false
		}
	},
	props: ['verse'],
	mounted: function() {
		// this.$root.$on('submitComment', (b) => { this.submitComment(b); });
	},
	methods: {
		toggleOptions: function({ evt, ...info }) {
			this.showingComments = !this.showingComments;
		},
		submitComment: function() {
			// Make sure user is logged in
			/*
			if (!LOGGED_IN) {
				this.$root.$emit('showLogin', 'You must be logged in to comment');
				return;
			}

			//clear any previous errors
			this.newComment.bodyError = this.newComment.ajaxError = "";

			//Client-side validation, make sure there is a body
			if (this.newComment.body.length == 0) {
				this.newComment.bodyError = "Please include content in your comment";
				return;
			}

			var _this = this;
			axios.post(SUBMIT_COMMENT_URL, {
				post_type: POST_TYPE,
				post_id: this.post.id,
				comment: this.newComment.body,
				parent_id: null
			}, config)
			.then(function (response) {
				console.log(response);
				if (response.data.success) {
					// Create an artificial "comment" object formatted as you would get from the server based off the user's newly submitted comment
					var c = {
						children: [],
						comment: _this.newComment.body,
						created_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
						downvotes: 0,
						upvotes: 1,
						id: response.data.new_id,
						parent_id: null,
						updated_at: moment().format('YYYY-MM-DD HH:mm:ssZ'),
						username: USERNAME,
						voted: 1
					}
					//Add our new comment (now correctly formatted) to the top of our list of comments
					_this.comments.unshift(c);
					//Clear the new comment inputs
					_this.clearNewComment();
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
	}
}
</script>
