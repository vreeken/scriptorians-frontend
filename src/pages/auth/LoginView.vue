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
			username: null,
			email: null,
			password: null,
			remember: false
		}
	},
	mounted: function() {

	},
	methods: {
		onSubmit: function() {
			this.usernameInUse = false;
			this.emailInUse = false;
			this.$refs.username.validate();
			this.$refs.email.validate();
			this.$refs.password.validate();

			if (this.$refs.username.hasError || this.$refs.email.hasError || this.$refs.password.hasError) {
				this.formHasError = true;
			}
			else if (this.terms !== true) {
				this.$q.notify({
					icon: 'fas fa-exclamation',
					color: 'negative',
					message: 'You need to agree to the terms and conditions'
				});
			}
			else {
				this.ajaxRegister();
			}
		},
		ajaxRegister: function() {
			const _this = this;
			this.$axios.post(this.$urls.auth.login, {
				username: this.username,
				password: this.password,
				remember: this.remember
			}, window.config)
				.then(function(response) {
					if (response.data && response.data.success && response.data.userdata) {
						_this.$store.commit('login', response.data.userdata);
						_this.$q.notify({
							icon: 'fas fa-check',
							color: 'positive',
							message: 'Logged in successfully.'
						});
						if (_this.$store.state.redirectRoute) {
							const route = _this.$store.state.redirectRoute;
							_this.$store.commit('clearRedirectRoute');
							_this.$router.push(route);
						}
					}
					else {
						_this.$q.notify({
							icon: 'far fa-frown',
							color: 'negative',
							message: 'Invalid username or password.'
						});
					}
				})
				.catch(function() {
					_this.$q.notify({
						icon: 'far fa-frown',
						color: 'negative',
						message: 'Invalid username or password.'
					});
				});
		},
		onReset: function() {
			this.username = null;
			this.email = null;
			this.password = null;

			this.$refs.username.resetValidation();
			this.$refs.email.resetValidation();
			this.$refs.password.resetValidation();
		}
	},
	computed: {

	}
}
</script>
