<template>
	<q-page class="flex content-center">
		<div class="row full-row justify-center">
			<div class="q-pa-md q-ma-md bg-blue-grey-1 shadow-3 registration-form col-md-8">
				<div class="q-gutter-y-md column">
					<div class="registration-title header-font text-primary">Register</div>

					<form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
						<q-input ref="username" v-model="username" label="Username" lazy-rules :rules="[ val => val && val.length > 0 || 'Please choose a Username']">
							<template v-slot:prepend><q-icon name="fas fa-user" /></template>
						</q-input>
						<q-input ref="email" v-model="email" label="Email" type="email" lazy-rules :rules="[ val => val && val.indexOf('.')>0 && val.indexOf('@')>0 && val.indexOf('.') < val.length-1 || 'Please use a valid email' ]">
							<template v-slot:prepend><q-icon name="fas fa-at" /></template>
						</q-input>
						<q-input ref="password" v-model="password" label="Password" type="password" lazy-rules :rules="[ val => val && val.length >= 6 || 'Your password must be at least 6 characters']">
							<template v-slot:prepend><q-icon name="fas fa-key" /></template>
						</q-input>

						<q-toggle v-model="terms" label="I agree to the terms and conditions" />

						<div class="flex">
							<q-btn class="col-grow" label="Register" type="submit" color="primary" />
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
				Already have an account? <q-btn color="secondary" label="Login" to="login" />
			</div>
		</div>
	</q-page>
</template>

<style>
</style>

<script>
export default {
	name: 'RegisterView',
	props: [],
	data() {
		return {
			username: null,
			email: null,
			password: null,
			terms: false
		}
	},
	mounted: function() {

	},
	methods: {
		onSubmit: function() {
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
			this.$axios.post(this.$urls.auth.register, {
				username: this.username,
				email: this.email,
				password: this.password
			}, window.config)
				.then(function(response) {
					if (response.data && response.data.success) {
						_this.$q.notify({
							icon: 'fas fa-check',
							color: 'positive',
							message: 'Submitted'
						});
					}
					else {
						_this.$q.notify({
							icon: 'far fa-frown',
							color: 'negative',
							message: 'Error creating your account. Please try again.'
						});
					}
				})
				.catch(function() {
					_this.$q.notify({
						icon: 'far fa-frown',
						color: 'negative',
						message: 'Error creating your account. Please try again.'
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
