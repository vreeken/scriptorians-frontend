<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated class="">
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					@click="leftDrawerOpen = !leftDrawerOpen"
					aria-label="Menu"
				>
					<q-icon name="fas fa-bars" />
				</q-btn>

				<router-link to="/">
					<svg class="svg-white header-logo scriptorians-svg">
						<use xlink:href="~assets/scriptorians_icons.svg#logo-book-only"></use>
					</svg>
				</router-link>

				<q-toolbar-title>
					<span class="header-font">Scriptorians</span>
					<div class="toolbar-subtitle">Let us reason together</div>
				</q-toolbar-title>

				<div class="row lt-tablet-hide">
					<q-btn-dropdown stretch flat label="Scriptures">
						<q-list>
							<q-item clickable v-close-menu tabindex="0" to="/scriptures/ot">
								<q-item-section avatar>
									<q-avatar icon="fas fa-book" color="secondary" text-color="white" />
								</q-item-section>
								<q-item-section>
									<q-item-label>The Old Testament</q-item-label>
									<q-item-label caption>February 22, 2016</q-item-label>
								</q-item-section>
							</q-item>
							<q-item clickable v-close-menu tabindex="1" to="/scriptures/nt">
								<q-item-section avatar>
									<q-avatar icon="fas fa-book" color="secondary" text-color="white" />
								</q-item-section>
								<q-item-section>
									<q-item-label>The New Testament</q-item-label>
									<q-item-label caption>February 22, 2016</q-item-label>
								</q-item-section>
							</q-item>
							<q-item clickable v-close-menu tabindex="2" to="/scriptures/bm">
								<q-item-section avatar>
									<q-avatar icon="fas fa-book" color="secondary" text-color="white" />
								</q-item-section>
								<q-item-section>
									<q-item-label>The Book of Mormon</q-item-label>
									<q-item-label caption>February 22, 2016</q-item-label>
								</q-item-section>
							</q-item>
							<q-item clickable v-close-menu tabindex="3" to="/scriptures/dc-testament">
								<q-item-section avatar>
									<q-avatar icon="fas fa-book" color="secondary" text-color="white" />
								</q-item-section>
								<q-item-section>
									<q-item-label>Doctrine &amp; Covenants</q-item-label>
									<q-item-label caption>February 22, 2016</q-item-label>
								</q-item-section>
							</q-item>
							<q-item clickable v-close-menu tabindex="4" to="/scriptures/pgp">
								<q-item-section avatar>
									<q-avatar icon="fas fa-book" color="secondary" text-color="white" />
								</q-item-section>
								<q-item-section>
									<q-item-label>Pearl of Great Price</q-item-label>
									<q-item-label caption>February 22, 2016</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
					<q-separator dark vertical />
					<q-btn stretch flat label="Gospel Questions" to="/questions" />
					<q-separator dark vertical />
					<q-btn stretch flat label="Login" to="/login" />
					<q-separator dark vertical />
					<q-btn stretch flat label="Register" to="/register" />
				</div>

			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			bordered
			content-class="bg-grey-2"
		>
			<q-list>
				<q-item-label header>Scriptures</q-item-label>
				<q-item clickable tag="a" to="/scriptures/ot">
					<q-item-section avatar>
						<q-icon name="fas fa-book" />
					</q-item-section>
					<q-item-section>
						<q-item-label>The Old Testament</q-item-label>
						<q-item-label caption>King James Version</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" to="/scriptures/nt">
					<q-item-section avatar>
						<q-icon name="fas fa-book" />
					</q-item-section>
					<q-item-section>
						<q-item-label>The New Testament</q-item-label>
						<q-item-label caption>King James Version</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" to="/scriptures/bm">
					<q-item-section avatar>
						<q-icon name="fas fa-book" />
					</q-item-section>
					<q-item-section>
						<q-item-label>The Book of Mormon</q-item-label>
						<q-item-label caption>Another Testament of Jesus Christ</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" to="/scriptures/dc-testament">
					<q-item-section avatar>
						<q-icon name="fas fa-book" />
					</q-item-section>
					<q-item-section>
						<q-item-label>The Doctrine &amp; Covenants</q-item-label>
						<q-item-label caption>of the Church of Jesus Christ of Latter Day Saints</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" to="/scriptures/pgp">
					<q-item-section avatar>
						<q-icon name="fas fa-book" />
					</q-item-section>
					<q-item-section>
						<q-item-label>The Pearl of Great Price</q-item-label>
						<q-item-label caption>Revelations and Translations from Joseph Smith</q-item-label>
					</q-item-section>
				</q-item>

				<hr class="q-separator q-separator--horizontal col-grow" style="margin-top: 1rem;" />

				<q-item clickable tag="a" to="/questions">
					<q-item-section avatar>
						<q-icon name="fas fa-question" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Gospel Questions</q-item-label>
						<q-item-label caption>Let us reason together</q-item-label>
					</q-item-section>
				</q-item>

				<hr class="q-separator q-separator--horizontal col-grow" />
				<q-item-label header style="margin-top: 1rem;">Scriptorians.com</q-item-label>
				<q-item clickable tag="a" to="/about">
					<q-item-section avatar>
						<svg class="svg-black" width="40px" height="40px">
							<use href="~assets/scriptorians_icons.svg#logo-book-only"></use>
						</svg>
					</q-item-section>
					<q-item-section>
						<q-item-label>About</q-item-label>
						<q-item-label caption>What is Scriptorians.com?</q-item-label>
					</q-item-section>
				</q-item>

				<q-item clickable tag="a" to="/account">
					<q-item-section avatar>
						<q-icon name="fas fa-user-cog" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Account Setting</q-item-label>
						<q-item-label caption>Manage your Preferences</q-item-label>
					</q-item-section>
				</q-item>

				<q-item clickable tag="a" to="/login">
					<q-item-section avatar>
						<!--<q-icon name="fas fa-sign-in-alt" />-->
						<q-icon name="fas fa-user-check" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Login</q-item-label>
						<q-item-label caption>To an Existing Account</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" to="/register">
					<q-item-section avatar>
						<q-icon name="fas fa-user-plus" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Register</q-item-label>
						<q-item-label caption>Create a New Account</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
	name: 'MainLayout',
	data() {
		return {
			leftDrawerOpen: this.$q.platform.is.desktop
		}
	},
	mounted: function() {

	},
	methods: {
		openURL
	}
}
</script>

<style>
	.toolbar-subtitle {
		margin-top: -5px;
		margin-left: 2rem;
		font-size: .5em;
		font-style: italic;
	}
	.header-logo {
		height: 44px;
		width: 44px;
	}
</style>
