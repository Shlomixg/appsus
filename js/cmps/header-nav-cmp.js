'use strict';

export default {
	template: `
	<header>
        <nav class="container flex align-items-center">
			<div class="btn-toggle-menu hamburger hamburger--collapse" ref="btnToggleMenu" type="button" @click="toggleMenu">
				<span class="hamburger-box">
					<span class="hamburger-inner"></span>
				</span>
			</div>
			<div class="logo flex" @click="$router.push('/')">Appsus</div>
			<!--
            <div class="flex search-wrapper">
                <input class="search-input" type="search" placeholder="Search" onkeypress="isSearch(event, this.value)" />
                <button class="btn btn-search" onclick="search(document.querySelector('.search-input').value)">&#x1F50E;</button>
			</div>
			-->
            <ul class="main-menu clean-list" ref="mainMenu">
                <li>
					<router-link exact to="/" @click.native="toggleMenu">Home</router-link>
                </li>
                <li>
					<router-link to="/email" @click.native="toggleMenu">Email</router-link>
				</li>
				<li>
					<router-link to="/keep" @click.native="toggleMenu">Keeper</router-link>
				</li>
				<li>
					<router-link to="/about" @click.native="toggleMenu">About</router-link>
                </li>
            </ul>
        </nav>
    </header>`,
	methods: {
		toggleMenu() {
			(this.$refs.btnToggleMenu).classList.toggle('is-active');
			(this.$refs.mainMenu).classList.toggle('open');

			var elOpacity = document.querySelector('.menu-opacity');
			elOpacity.classList.toggle('opacity-open');
		}
	}
};