// Import Components globally

import Comment from '../components/comments/Comment.vue';
import CommentBlock from '../components/comments/CommentBlock.vue';
import CommentList from '../components/comments/CommentList.vue';
import CommentEdit from '../components/comments/CommentEdit.vue';
import CommentNew from '../components/comments/CommentNew.vue';

import VerseView from '../components/VerseView.vue';

export default async({ Vue }) => {
	Vue.component('comment', Comment);
	Vue.component('comment-block', CommentBlock);
	Vue.component('comment-list', CommentList);
	Vue.component('comment-edit', CommentEdit);
	Vue.component('comment-new', CommentNew);

	Vue.component('verse-view', VerseView);
}
