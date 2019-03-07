<template>
	<q-page class="flex content-center">
		<div class="row full-row justify-center">
			<div class="q-pa-md q-ma-md bg-blue-grey-1 shadow-3 registration-form col">
				<div class="q-gutter-y-md column">
					<div class="registration-title header-font text-primary">Login</div>

					<form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
						<q-input ref="username" v-model="username" label="Username" lazy-rules :rules="[ val => val && val.length > 0 || 'Please choose a Username']">
							<template v-slot:prepend><q-icon name="fas fa-user" /></template>
						</q-input>
						<q-input ref="password" v-model="password" label="Password" type="password" lazy-rules :rules="[ val => val && val.length >= 6 || 'Your password must be at least 6 characters']">
							<template v-slot:prepend><q-icon name="fas fa-key" /></template>
						</q-input>

						<q-toggle v-model="remember" label="Remember Me" />

						<div class="flex">
							<q-btn class="col-grow" label="Login" type="submit" color="primary" />
							<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
						</div>
					</form>

				</div>
			</div>
			<div class="q-pa-md q-ma-md bg-blue-grey-1 shadow-3 registration-form col-md-4 lt-sm-hide">
				<div class="q-gutter-y-md column">
					<div class="registration-title header-font text-primary">Member Benefits</div>

					Reading the scriptures and viewing user comments is available to everyone, but here's what registered users also get:
					<ul>
						<li>Vote on user comments</li>
						<li>Submit your own comments</li>
						<li>Personal notes</li>
						<li>Personal Bookmarks</li>
						<li>Track your reading progress</li>
					</ul>

				</div>
			</div>
		</div>
		<div class="row full-row flex flex-center">
			<div>
				Don't have an account yet? <q-btn color="secondary" label="Register" to="register" />
			</div>
			<div class="q-ma-md">
				<q-btn color="secondary" label="Forgot your password?" to="reset-password" />
			</div>
		</div>
	</q-page>
</template>

<style>
</style>

<script>
export default {
	name: 'LoginView',
	props: [],
	data() {
		return {
		}
	},
	mounted: function() {

	},
	methods: {
		singleChapterReplaceState: function() {
			// Skip showing the list of chapters because there's only one, go to that only chapter
			this.$router.replace(this.book.url + '/1');
		}
	},
	computed: {
		num_chapters: function() {
			if (this.book === null) {
				return 0;
			}
			if (this.book.num_chapters === 1) {
				this.singleChapterReplaceState();
			}
			return this.book.num_chapters;
		},
		fullPath: function() {
			// This forces a trailing slash onto our url path
			// Since a user can enter our SPA at any location with or without a trailing slash on the url
			// We have to make this consistent
			return this.$route.fullPath.slice(-1) === '/' ? this.$route.fullPath : this.$route.fullPath + '/';
		}
	}
}
</script>
