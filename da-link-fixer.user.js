// ==UserScript==
// @name         Deviantart-Link fixer
// @namespace    https://petschko.org/deviantart/link-fixer
// @description  Fixes the Links in the old Version, which the Eclipse-Team has broken...
// @author       Peter Dragicevic [peter@petschko.org]
// @version      1.0.1
// @encoding     utf-8
// @homepage     https://petschko.org/
// @homepage     https://github.com/Petschko/DA-Link-Fixer
// @licence      https://raw.githubusercontent.com/Petschko/DA-Link-Fixer/master/LICENSE
// @supportURL   https://github.com/Petschko/DA-Link-Fixer/issues
// @contactURL   https://github.com/Petschko/DA-Link-Fixer#contact
// @updateURL    https://github.com/Petschko/DA-Link-Fixer/raw/master/da-link-fixer.user.js
// @downloadURL  https://github.com/Petschko/DA-Link-Fixer/raw/master/da-link-fixer.user.js
// @include      http://deviantart.com/*
// @include      https://deviantart.com/*
// @include      http://*.deviantart.com/*
// @include      https://*.deviantart.com/*
// @grant        unsafeWindow
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';

	const scriptName = 'Deviantart-Link-Fixer';
	const debug = false; // Turns on all kind of messages, rather annoying for daily use, mostly for development, keep it false

	/**
	 * Checks if the user is currently in Eclipse
	 *
	 * @returns {boolean} - User is in Eclipse
	 */
	function isEclipseEnabled() {
		let switchToEclipse = document.getElementById('oh-menu-eclipse-toggle');

		return ! switchToEclipse;
	}

	/**
	 * Cleans the Link from all that junk
	 *
	 * Also helps to improve data-privacy^^
	 *
	 * @param {Element} link - The link which should be purified
	 */
	function cleanupLink(link) {
		if(link.hasAttribute('ping'))
			link.removeAttribute('ping');

		if(link.hasAttribute('data-sigil'))
			link.removeAttribute('data-sigil');

		if(link.hasAttribute('data-meta'))
			link.removeAttribute('data-meta');

		if(link.hasAttribute('target'))
			link.removeAttribute('target');

		if(link.hasAttribute('data-ga_click_event'))
			link.removeAttribute('data-ga_click_event');

		// Download-Button junk (not needed just javascript junk and for tracking also cause the download button to bug)
		if(link.hasAttribute('data-gmiclass'))
			link.removeAttribute('data-gmiclass');

		if(link.hasAttribute('data-download_width'))
			link.removeAttribute('data-download_width');

		if(link.hasAttribute('data-download_height'))
			link.removeAttribute('data-download_height');

		if(link.hasAttribute('data-download_url'))
			link.removeAttribute('data-download_url');

		if(link.hasAttribute('data-dwait-domready'))
			link.removeAttribute('data-dwait-domready');

		if(link.hasAttribute('data-dwait-click'))
			link.removeAttribute('data-dwait-click');

		if(link.hasAttribute('data-dwait-deps'))
			link.removeAttribute('data-dwait-deps');

		if(link.hasAttribute('data-deviationid'))
			link.removeAttribute('data-deviationid');

		if(link.hasAttribute('gmindex'))
			link.removeAttribute('gmindex');
	}

	/**
	 * Fixes broken User-Links
	 */
	function fixUserLinks() {
		let userLinksWrap = document.getElementsByClassName('username-with-symbol');

		for(let i = 0; i < userLinksWrap.length; i++) {
			let a = userLinksWrap[i].getElementsByClassName('username');

			for(let n = 0; n < a.length; n++) {
				// Remove crap from the link (some of them cause a prevent-default and a not found function)
				cleanupLink(a[n]);

				if(debug)
					console.info(scriptName + ': Removed junk from Userlink (User: ' + a[n].innerHTML + ')');
			}
		}
	}

	/**
	 * Purify all DA-Links...
	 */
	function fixAllLinks() {
		let a = document.getElementsByTagName('a');

		for(let i = 0; i < a.length; i++) {
			cleanupLink(a[i]);

			if(debug)
				console.info(scriptName + ': Removed junk from Userlink (User: ' + a[i].innerHTML + ')');
		}
	}

	/**
	 * Runs start tasks on Page load
	 */
	function init() {
		// Exit if the user is on Eclipse
		if(isEclipseEnabled())
			return;

		// Fix the poor links from the old version...
		fixAllLinks();
	}

	// Adds start EventListener
	window[window.addEventListener ? 'addEventListener' : 'attachEvent'](
		window.addEventListener ? 'load' : 'onload', init, false);
})();
