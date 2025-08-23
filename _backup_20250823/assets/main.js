/* Carrd Site JS | carrd.co | License: MIT */

(function() {

	// Main.
		var	on = addEventListener,
			off = removeEventListener,
			$ = function(q) { return document.querySelector(q) },
			$$ = function(q) { return document.querySelectorAll(q) },
			$body = document.body,
			$inner = $('.inner'),
			client = (function() {
		
				var o = {
						browser: 'other',
						browserVersion: 0,
						os: 'other',
						osVersion: 0,
						mobile: false,
						canUse: null,
						flags: {
							lsdUnits: false,
						},
					},
					ua = navigator.userAgent,
					a, i;
		
				// browser, browserVersion.
					a = [
						[
							'firefox',
							/Firefox\/([0-9\.]+)/,
							null
						],
						[
							'edge',
							/Edge\/([0-9\.]+)/,
							null
						],
						[
							'safari',
							/Version\/([0-9\.]+).+Safari/,
							null
						],
						[
							'chrome',
							/Chrome\/([0-9\.]+)/,
							null
						],
						[
							'chrome',
							/CriOS\/([0-9\.]+)/,
							null
						],
						[
							'ie',
							/Trident\/.+rv:([0-9]+)/,
							null
						],
						[
							'safari',
							/iPhone OS ([0-9_]+)/,
							function(v) { return v.replace('_', '.').replace('_', ''); }
						]
					];
		
					for (i=0; i < a.length; i++) {
		
						if (ua.match(a[i][1])) {
		
							o.browser = a[i][0];
							o.browserVersion = parseFloat( a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1 );
		
							break;
		
						}
		
					}
		
				// os, osVersion.
					a = [
						[
							'ios',
							/([0-9_]+) like Mac OS X/,
							function(v) { return v.replace('_', '.').replace('_', ''); }
						],
						[
							'ios',
							/CPU like Mac OS X/,
							function(v) { return 0 }
						],
						[
							'ios',
							/iPad; CPU/,
							function(v) { return 0 }
						],
						[
							'android',
							/Android ([0-9\.]+)/,
							null
						],
						[
							'mac',
							/Macintosh.+Mac OS X ([0-9_]+)/,
							function(v) { return v.replace('_', '.').replace('_', ''); }
						],
						[
							'windows',
							/Windows NT ([0-9\.]+)/,
							null
						],
						[
							'undefined',
							/Undefined/,
							null
						]
					];
		
					for (i=0; i < a.length; i++) {
		
						if (ua.match(a[i][1])) {
		
							o.os = a[i][0];
							o.osVersion = parseFloat( a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1 );
		
							break;
		
						}
		
					}
		
					// Hack: Detect iPads running iPadOS.
						if (o.os == 'mac'
						&&	('ontouchstart' in window)
						&&	(
		
							// 12.9"
								(screen.width == 1024 && screen.height == 1366)
							// 10.2"
								||	(screen.width == 834 && screen.height == 1112)
							// 9.7"
								||	(screen.width == 810 && screen.height == 1080)
							// Legacy
								||	(screen.width == 768 && screen.height == 1024)
		
						))
							o.os = 'ios';
		
				// mobile.
					o.mobile = (o.os == 'android' || o.os == 'ios');
		
				// canUse.
					var _canUse = document.createElement('div');
		
					o.canUse = function(property, value) {
		
						var style;
		
						// Get style.
							style = _canUse.style;
		
						// Property doesn't exist? Can't use it.
							if (!(property in style))
								return false;
		
						// Value provided?
							if (typeof value !== 'undefined') {
		
								// Assign value.
									style[property] = value;
		
								// Value is empty? Can't use it.
									if (style[property] == '')
										return false;
		
							}
		
						return true;
		
					};
		
				// flags.
					o.flags.lsdUnits = o.canUse('width', '100dvw');
		
				return o;
		
			}()),
			ready = {
				list: [],
				add: function(f) {
					this.list.push(f);
				},
				run: function() {
					this.list.forEach((f) => {
						f();
					});
				},
			},
			trigger = function(t) {
				dispatchEvent(new Event(t));
			},
			cssRules = function(selectorText) {
		
				var ss = document.styleSheets,
					a = [],
					f = function(s) {
		
						var r = s.cssRules,
							i;
		
						for (i=0; i < r.length; i++) {
		
							if (r[i] instanceof CSSMediaRule && matchMedia(r[i].conditionText).matches)
								(f)(r[i]);
							else if (r[i] instanceof CSSStyleRule && r[i].selectorText == selectorText)
								a.push(r[i]);
		
						}
		
					},
					x, i;
		
				for (i=0; i < ss.length; i++)
					f(ss[i]);
		
				return a;
		
			},
			escapeHtml = function(s) {
		
				// Blank, null, or undefined? Return blank string.
					if (s === ''
					||	s === null
					||	s === undefined)
						return '';
		
				// Escape HTML characters.
					var a = {
						'&': '&amp;',
						'<': '&lt;',
						'>': '&gt;',
						'"': '&quot;',
						"'": '&#39;',
					};
		
					s = s.replace(/[&<>"']/g, function(x) {
						return a[x];
					});
		
				return s;
		
			},
			thisHash = function() {
		
				var h = location.hash ? location.hash.substring(1) : null,
					a;
		
				// Null? Bail.
					if (!h)
						return null;
		
				// Query string? Move before hash.
					if (h.match(/\?/)) {
		
						// Split from hash.
							a = h.split('?');
							h = a[0];
		
						// Update hash.
							history.replaceState(undefined, undefined, '#' + h);
		
						// Update search.
							window.location.search = a[1];
		
					}
		
				// Prefix with "x" if not a letter.
					if (h.length > 0
					&&	!h.match(/^[a-zA-Z]/))
						h = 'x' + h;
		
				// Convert to lowercase.
					if (typeof h == 'string')
						h = h.toLowerCase();
		
				return h;
		
			},
			scrollToElement = function(e, style, duration) {
		
				var y, cy, dy,
					start, easing, offset, f;
		
				// Element.
		
					// No element? Assume top of page.
						if (!e)
							y = 0;
		
					// Otherwise ...
						else {
		
							offset = (e.dataset.scrollOffset ? parseInt(e.dataset.scrollOffset) : 0) * parseFloat(getComputedStyle(document.documentElement).fontSize);
		
							switch (e.dataset.scrollBehavior ? e.dataset.scrollBehavior : 'default') {
		
								case 'default':
								default:
		
									y = e.offsetTop + offset;
		
									break;
		
								case 'center':
		
									if (e.offsetHeight < window.innerHeight)
										y = e.offsetTop - ((window.innerHeight - e.offsetHeight) / 2) + offset;
									else
										y = e.offsetTop - offset;
		
									break;
		
								case 'previous':
		
									if (e.previousElementSibling)
										y = e.previousElementSibling.offsetTop + e.previousElementSibling.offsetHeight + offset;
									else
										y = e.offsetTop + offset;
		
									break;
		
							}
		
						}
		
				// Style.
					if (!style)
						style = 'smooth';
		
				// Duration.
					if (!duration)
						duration = 750;
		
				// Instant? Just scroll.
					if (style == 'instant') {
		
						window.scrollTo(0, y);
						return;
		
					}
		
				// Get start, current Y.
					start = Date.now();
					cy = window.scrollY;
					dy = y - cy;
		
				// Set easing.
					switch (style) {
		
						case 'linear':
							easing = function (t) { return t };
							break;
		
						case 'smooth':
							easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
							break;
		
					}
		
				// Scroll.
					f = function() {
		
						var t = Date.now() - start;
		
						// Hit duration? Scroll to y and finish.
							if (t >= duration)
								window.scroll(0, y);
		
						// Otherwise ...
							else {
		
								// Scroll.
									window.scroll(0, cy + (dy * easing(t / duration)));
		
								// Repeat.
									requestAnimationFrame(f);
		
							}
		
					};
		
					f();
		
			},
			scrollToTop = function() {
		
				// Scroll to top.
					scrollToElement(null);
		
			},
			loadElements = function(parent) {
		
				var a, e, x, i;
		
				// IFRAMEs.
		
					// Get list of unloaded IFRAMEs.
						a = parent.querySelectorAll('iframe[data-src]:not([data-src=""])');
		
					// Step through list.
						for (i=0; i < a.length; i++) {
		
							// Load.
								a[i].contentWindow.location.replace(a[i].dataset.src);
		
							// Save initial src.
								a[i].dataset.initialSrc = a[i].dataset.src;
		
							// Mark as loaded.
								a[i].dataset.src = '';
		
						}
		
				// Video.
		
					// Get list of videos (autoplay).
						a = parent.querySelectorAll('video[autoplay]');
		
					// Step through list.
						for (i=0; i < a.length; i++) {
		
							// Play if paused.
								if (a[i].paused)
									a[i].play();
		
						}
		
				// Autofocus.
		
					// Get first element with data-autofocus attribute.
						e = parent.querySelector('[data-autofocus="1"]');
		
					// Determine type.
						x = e ? e.tagName : null;
		
						switch (x) {
		
							case 'FORM':
		
								// Get first input.
									e = e.querySelector('.field input, .field select, .field textarea');
		
								// Found? Focus.
									if (e)
										e.focus();
		
								break;
		
							default:
								break;
		
						}
		
				// Embeds.
		
					// Get unloaded embeds.
						a = parent.querySelectorAll('unloaded-script');
		
					// Step through list.
						for (i=0; i < a.length; i++) {
		
							// Create replacement script tag.
								x = document.createElement('script');
		
							// Set "loaded" data attribute (so we can unload this element later).
								x.setAttribute('data-loaded', '');
		
							// Set "src" attribute (if present).
								if (a[i].getAttribute('src'))
									x.setAttribute('src', a[i].getAttribute('src'));
		
							// Set text content (if present).
								if (a[i].textContent)
									x.textContent = a[i].textContent;
		
							// Replace.
								a[i].replaceWith(x);
		
						}
		
				// Everything else.
		
					// Create "loadelements" event.
						x = new Event('loadelements');
		
					// Get unloaded elements.
						a = parent.querySelectorAll('[data-unloaded]');
		
					// Step through list.
						a.forEach((element) => {
		
							// Clear attribute.
								element.removeAttribute('data-unloaded');
		
							// Dispatch event.
								element.dispatchEvent(x);
		
						});
		
			},
			unloadElements = function(parent) {
		
				var a, e, x, i;
		
				// IFRAMEs.
		
					// Get list of loaded IFRAMEs.
						a = parent.querySelectorAll('iframe[data-src=""]');
		
					// Step through list.
						for (i=0; i < a.length; i++) {
		
							// Don't unload? Skip.
								if (a[i].dataset.srcUnload === '0')
									continue;
		
							// Mark as unloaded.
		
								// IFRAME was previously loaded by loadElements()? Use initialSrc.
									if ('initialSrc' in a[i].dataset)
										a[i].dataset.src = a[i].dataset.initialSrc;
		
								// Otherwise, just use src.
									else
										a[i].dataset.src = a[i].src;
		
							// Unload.
								a[i].contentWindow.location.replace('about:blank');
		
						}
		
				// Video.
		
					// Get list of videos.
						a = parent.querySelectorAll('video');
		
					// Step through list.
						for (i=0; i < a.length; i++) {
		
							// Pause if playing.
								if (!a[i].paused)
									a[i].pause();
		
						}
		
				// Autofocus.
		
					// Get focused element.
						e = $(':focus');
		
					// Found? Blur.
						if (e)
							e.blur();
		
				// Embeds.
				// NOTE: Disabled for now. May want to bring this back later.
				/*
		
					// Get loaded embeds.
						a = parent.querySelectorAll('script[data-loaded]');
		
					// Step through list.
						for (i=0; i < a.length; i++) {
		
							// Create replacement unloaded-script tag.
								x = document.createElement('unloaded-script');
		
							// Set "src" attribute (if present).
								if (a[i].getAttribute('src'))
									x.setAttribute('src', a[i].getAttribute('src'));
		
							// Set text content (if present).
								if (a[i].textContent)
									x.textContent = a[i].textContent;
		
							// Replace.
								a[i].replaceWith(x);
		
						}
		
				*/
		
			};
		
			// Expose scrollToElement.
				window._scrollToTop = scrollToTop;
	
	// Sections.
		(function() {
		
			var initialSection, initialScrollPoint, initialId,
				header, footer, name, hideHeader, hideFooter, disableAutoScroll,
				h, e, ee, k,
				locked = false,
				title = document.title,
				scrollPointParent = function(target) {
		
					while (target) {
		
						if (target.parentElement
						&&	target.parentElement.tagName == 'SECTION')
							break;
		
						target = target.parentElement;
		
					}
		
					return target;
		
				},
				scrollPointSpeed = function(scrollPoint) {
		
					let x = parseInt(scrollPoint.dataset.scrollSpeed);
		
					switch (x) {
		
						case 5:
							return 250;
		
						case 4:
							return 500;
		
						case 3:
							return 750;
		
						case 2:
							return 1000;
		
						case 1:
							return 1250;
		
						default:
							break;
		
					}
		
					return 750;
		
				},
				doNextScrollPoint = function(event) {
		
					var e, target, id;
		
					// Determine parent element.
						e = scrollPointParent(event.target);
		
						if (!e)
							return;
		
					// Find next scroll point.
						while (e && e.nextElementSibling) {
		
							e = e.nextElementSibling;
		
							if (e.dataset.scrollId) {
		
								target = e;
								id = e.dataset.scrollId;
								break;
		
							}
		
						}
		
						if (!target
						||	!id)
							return;
		
					// Redirect.
						if (target.dataset.scrollInvisible == '1')
							scrollToElement(target, 'smooth', scrollPointSpeed(target));
						else
							location.href = '#' + id;
		
				},
				doPreviousScrollPoint = function(e) {
		
					var e, target, id;
		
					// Determine parent element.
						e = scrollPointParent(event.target);
		
						if (!e)
							return;
		
					// Find previous scroll point.
						while (e && e.previousElementSibling) {
		
							e = e.previousElementSibling;
		
							if (e.dataset.scrollId) {
		
								target = e;
								id = e.dataset.scrollId;
								break;
		
							}
		
						}
		
						if (!target
						||	!id)
							return;
		
					// Redirect.
						if (target.dataset.scrollInvisible == '1')
							scrollToElement(target, 'smooth', scrollPointSpeed(target));
						else
							location.href = '#' + id;
		
				},
				doFirstScrollPoint = function(e) {
		
					var e, target, id;
		
					// Determine parent element.
						e = scrollPointParent(event.target);
		
						if (!e)
							return;
		
					// Find first scroll point.
						while (e && e.previousElementSibling) {
		
							e = e.previousElementSibling;
		
							if (e.dataset.scrollId) {
		
								target = e;
								id = e.dataset.scrollId;
		
							}
		
						}
		
						if (!target
						||	!id)
							return;
		
					// Redirect.
						if (target.dataset.scrollInvisible == '1')
							scrollToElement(target, 'smooth', scrollPointSpeed(target));
						else
							location.href = '#' + id;
		
				},
				doLastScrollPoint = function(e) {
		
					var e, target, id;
		
					// Determine parent element.
						e = scrollPointParent(event.target);
		
						if (!e)
							return;
		
					// Find last scroll point.
						while (e && e.nextElementSibling) {
		
							e = e.nextElementSibling;
		
							if (e.dataset.scrollId) {
		
								target = e;
								id = e.dataset.scrollId;
		
							}
		
						}
		
						if (!target
						||	!id)
							return;
		
					// Redirect.
						if (target.dataset.scrollInvisible == '1')
							scrollToElement(target, 'smooth', scrollPointSpeed(target));
						else
							location.href = '#' + id;
		
				},
				doNextSection = function() {
		
					var section;
		
					section = $('#main > .inner > section.active').nextElementSibling;
		
					if (!section || section.tagName != 'SECTION')
						return;
		
					location.href = '#' + section.id.replace(/-section$/, '');
		
				},
				doPreviousSection = function() {
		
					var section;
		
					section = $('#main > .inner > section.active').previousElementSibling;
		
					if (!section || section.tagName != 'SECTION')
						return;
		
					location.href = '#' + (section.matches(':first-child') ? '' : section.id.replace(/-section$/, ''));
		
				},
				doFirstSection = function() {
		
					var section;
		
					section = $('#main > .inner > section:first-of-type');
		
					if (!section || section.tagName != 'SECTION')
						return;
		
					location.href = '#' + section.id.replace(/-section$/, '');
		
				},
				doLastSection = function() {
		
					var section;
		
					section = $('#main > .inner > section:last-of-type');
		
					if (!section || section.tagName != 'SECTION')
						return;
		
					location.href = '#' + section.id.replace(/-section$/, '');
		
				},
				resetSectionChangeElements = function(section) {
		
					var ee, e, x;
		
					// Get elements with data-reset-on-section-change attribute.
						ee = section.querySelectorAll('[data-reset-on-section-change="1"]');
		
					// Step through elements.
						for (e of ee) {
		
							// Determine type.
								x = e ? e.tagName : null;
		
								switch (x) {
		
									case 'FORM':
		
										// Reset.
											e.reset();
		
										break;
		
									default:
										break;
		
								}
		
						}
		
				},
				activateSection = function(section, scrollPoint) {
		
					var sectionHeight, currentSection, currentSectionHeight,
						name, hideHeader, hideFooter, disableAutoScroll,
						ee, k;
		
					// Section already active?
						if (!section.classList.contains('inactive')) {
		
							// Get options.
								name = (section ? section.id.replace(/-section$/, '') : null);
								disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;
		
							// Scroll to scroll point (if applicable).
								if (scrollPoint)
									scrollToElement(scrollPoint, 'smooth', scrollPointSpeed(scrollPoint));
		
							// Otherwise, just scroll to top (if not disabled for this section).
								else if (!disableAutoScroll)
									scrollToElement(null);
		
							// Bail.
								return false;
		
						}
		
					// Otherwise, activate it.
						else {
		
							// Lock.
								locked = true;
		
							// Clear index URL hash.
								if (location.hash == '#home')
									history.replaceState(null, null, '#');
		
							// Get options.
								name = (section ? section.id.replace(/-section$/, '') : null);
								hideHeader = name ? ((name in sections) && ('hideHeader' in sections[name]) && sections[name].hideHeader) : false;
								hideFooter = name ? ((name in sections) && ('hideFooter' in sections[name]) && sections[name].hideFooter) : false;
								disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;
		
							// Deactivate current section.
		
								// Hide header and/or footer (if necessary).
		
									// Header.
										if (header && hideHeader) {
		
											header.classList.add('hidden');
											header.style.display = 'none';
		
										}
		
									// Footer.
										if (footer && hideFooter) {
		
											footer.classList.add('hidden');
											footer.style.display = 'none';
		
										}
		
								// Deactivate.
									currentSection = $('#main > .inner > section:not(.inactive)');
									currentSection.classList.add('inactive');
									currentSection.classList.remove('active');
									currentSection.style.display = 'none';
		
								// Reset title.
									document.title = title;
		
								// Unload elements.
									unloadElements(currentSection);
		
								// Reset section change elements.
									resetSectionChangeElements(currentSection);
		
								// Clear timeout (if present).
									clearTimeout(window._sectionTimeoutId);
		
									// Event: On Close.
										doEvent(currentSection.id, 'onclose');
		
							// Activate target section.
		
								// Show header and/or footer (if necessary).
		
									// Header.
										if (header && !hideHeader) {
		
											header.style.display = '';
											header.classList.remove('hidden');
		
										}
		
									// Footer.
										if (footer && !hideFooter) {
		
											footer.style.display = '';
											footer.classList.remove('hidden');
		
										}
		
								// Activate.
									section.classList.remove('inactive');
									section.classList.add('active');
									section.style.display = '';
		
									// Event: On Open.
										doEvent(section.id, 'onopen');
		
							// Trigger 'resize' event.
								trigger('resize');
		
							// Update title.
								if (section.dataset.title)
									document.title = section.dataset.title + ' - ' + title;
		
							// Load elements.
								loadElements(section);
		
							// Scroll to scroll point (if applicable).
								if (scrollPoint)
									scrollToElement(scrollPoint, 'instant');
		
							// Otherwise, just scroll to top (if not disabled for this section).
								else if (!disableAutoScroll)
									scrollToElement(null, 'instant');
		
							// Unlock.
								locked = false;
		
						}
		
				},
				doEvent = function(id, type) {
		
					var name = id.split(/-[a-z]+$/)[0], result, i;
		
					if (name in sections
					&&	'events' in sections[name]
					&&	type in sections[name].events) {
		
						for (i in sections[name].events[type]) {
		
							result = (sections[name].events[type][i])();
		
							if (result === false)
								delete sections[name].events[type][i];
		
						}
		
					}
		
				},
				sections = {
					'old-websites': {
						events: {
							onopen: [
								function() { 
									gtag('event', 'page_view', {
										'page_title': 'Old-websites',
										'page_location': 'https://theweb3-ninja.ju.mp/#old-websites',
									});
								},
							],
						},
					},
					'done': {
						events: {
							onopen: [
								function() { 
									gtag('event', 'page_view', {
										'page_title': 'Done',
										'page_location': 'https://theweb3-ninja.ju.mp/#done',
									});
								},
							],
						},
					},
					'home': {
						events: {
							onopen: [
								function() { 
									gtag('event', 'page_view', {
										'page_title': 'Home',
										'page_location': 'https://theweb3-ninja.ju.mp',
									});
								},
							],
						},
					},
				};
		
			// Expose doNextScrollPoint, doPreviousScrollPoint, doFirstScrollPoint, doLastScrollPoint.
				window._nextScrollPoint = doNextScrollPoint;
				window._previousScrollPoint = doPreviousScrollPoint;
				window._firstScrollPoint = doFirstScrollPoint;
				window._lastScrollPoint = doLastScrollPoint;
		
			// Expose doNextSection, doPreviousSection, doFirstSection, doLastSection.
				window._nextSection = doNextSection;
				window._previousSection = doPreviousSection;
				window._firstSection = doFirstSection;
				window._lastSection = doLastSection;
		
			// Override exposed scrollToTop.
				window._scrollToTop = function() {
		
					var section, id;
		
					// Scroll to top.
						scrollToElement(null);
		
					// Section active?
						if (!!(section = $('section.active'))) {
		
							// Get name.
								id = section.id.replace(/-section$/, '');
		
								// Index section? Clear.
									if (id == 'home')
										id = '';
		
							// Reset hash to section name (via new state).
								history.pushState(null, null, '#' + id);
		
						}
		
				};
		
			// Initialize.
		
				// Set scroll restoration to manual.
					if ('scrollRestoration' in history)
						history.scrollRestoration = 'manual';
		
				// Header, footer.
					header = $('#header');
					footer = $('#footer');
		
				// Show initial section.
		
					// Determine target.
						h = thisHash();
		
						// Contains invalid characters? Might be a third-party hashbang, so ignore it.
							if (h
							&&	!h.match(/^[a-zA-Z0-9\-]+$/))
								h = null;
		
						// Scroll point.
							if (e = $('[data-scroll-id="' + h + '"]')) {
		
								initialScrollPoint = e;
								initialSection = initialScrollPoint.parentElement;
								initialId = initialSection.id;
		
							}
		
						// Section.
							else if (e = $('#' + (h ? h : 'home') + '-section')) {
		
								initialScrollPoint = null;
								initialSection = e;
								initialId = initialSection.id;
		
							}
		
						// Missing initial section?
							if (!initialSection) {
		
								// Default to index.
									initialScrollPoint = null;
									initialSection = $('#' + 'home' + '-section');
									initialId = initialSection.id;
		
								// Clear index URL hash.
									history.replaceState(undefined, undefined, '#');
		
							}
		
					// Get options.
						name = (h ? h : 'home');
						hideHeader = name ? ((name in sections) && ('hideHeader' in sections[name]) && sections[name].hideHeader) : false;
						hideFooter = name ? ((name in sections) && ('hideFooter' in sections[name]) && sections[name].hideFooter) : false;
						disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;
		
					// Deactivate all sections (except initial).
		
						// Initially hide header and/or footer (if necessary).
		
							// Header.
								if (header && hideHeader) {
		
									header.classList.add('hidden');
									header.style.display = 'none';
		
								}
		
							// Footer.
								if (footer && hideFooter) {
		
									footer.classList.add('hidden');
									footer.style.display = 'none';
		
								}
		
						// Deactivate.
							ee = $$('#main > .inner > section:not([id="' + initialId + '"])');
		
							for (k = 0; k < ee.length; k++) {
		
								ee[k].className = 'inactive';
								ee[k].style.display = 'none';
		
							}
		
					// Activate initial section.
						initialSection.classList.add('active');
		
							// Event: On Open.
								doEvent(initialId, 'onopen');
		
					// Add ready event.
						ready.add(() => {
		
							// Update title.
								if (initialSection.dataset.title)
									document.title = initialSection.dataset.title + ' - ' + title;
		
							// Load elements.
								loadElements(initialSection);
		
								if (header)
									loadElements(header);
		
								if (footer)
									loadElements(footer);
		
							// Scroll to top (if not disabled for this section).
								if (!disableAutoScroll)
									scrollToElement(null, 'instant');
		
						});
		
				// Load event.
					on('load', function() {
		
						// Scroll to initial scroll point (if applicable).
					 		if (initialScrollPoint)
								scrollToElement(initialScrollPoint, 'instant');
		
					});
		
			// Hashchange event.
				on('hashchange', function(event) {
		
					var section, scrollPoint,
						h, e;
		
					// Lock.
						if (locked)
							return false;
		
					// Determine target.
						h = thisHash();
		
						// Contains invalid characters? Might be a third-party hashbang, so ignore it.
							if (h
							&&	!h.match(/^[a-zA-Z0-9\-]+$/))
								return false;
		
						// Scroll point.
							if (e = $('[data-scroll-id="' + h + '"]')) {
		
								scrollPoint = e;
								section = scrollPoint.parentElement;
		
							}
		
						// Section.
							else if (e = $('#' + (h ? h : 'home') + '-section')) {
		
								scrollPoint = null;
								section = e;
		
							}
		
						// Anything else.
							else {
		
								// Default to index.
									scrollPoint = null;
									section = $('#' + 'home' + '-section');
		
								// Clear index URL hash.
									history.replaceState(undefined, undefined, '#');
		
							}
		
					// No section? Bail.
						if (!section)
							return false;
		
					// Activate section.
						activateSection(section, scrollPoint);
		
					return false;
		
				});
		
				// Hack: Allow hashchange to trigger on click even if the target's href matches the current hash.
					on('click', function(event) {
		
						var t = event.target,
							tagName = t.tagName.toUpperCase(),
							scrollPoint, section;
		
						// Find real target.
							switch (tagName) {
		
								case 'IMG':
								case 'SVG':
								case 'USE':
								case 'U':
								case 'STRONG':
								case 'EM':
								case 'CODE':
								case 'S':
								case 'MARK':
								case 'SPAN':
		
									// Find ancestor anchor tag.
										while ( !!(t = t.parentElement) )
											if (t.tagName == 'A')
												break;
		
									// Not found? Bail.
										if (!t)
											return;
		
									break;
		
								default:
									break;
		
							}
		
						// Target is an anchor *and* its href is a hash?
							if (t.tagName == 'A'
							&&	t.getAttribute('href') !== null
							&&	t.getAttribute('href').substr(0, 1) == '#') {
		
								// Hash matches an invisible scroll point?
									if (!!(scrollPoint = $('[data-scroll-id="' + t.hash.substr(1) + '"][data-scroll-invisible="1"]'))) {
		
										// Prevent default.
											event.preventDefault();
		
										// Get section.
											section = scrollPoint.parentElement;
		
										// Section is inactive?
											if (section.classList.contains('inactive')) {
		
												// Reset hash to section name (via new state).
													history.pushState(null, null, '#' + section.id.replace(/-section$/, ''));
		
												// Activate section.
													activateSection(section, scrollPoint);
		
											}
		
										// Otherwise ...
											else {
		
												// Scroll to scroll point.
													scrollToElement(scrollPoint, 'smooth', scrollPointSpeed(scrollPoint));
		
											}
		
									}
		
								// Hash matches the current hash?
									else if (t.hash == window.location.hash) {
		
										// Prevent default.
											event.preventDefault();
		
										// Replace state with '#'.
											history.replaceState(undefined, undefined, '#');
		
										// Replace location with target hash.
											location.replace(t.hash);
		
									}
		
							}
		
					});
		
		})();
	
	// Browser hacks.
		// Init.
			var style, sheet, rule;
		
			// Create <style> element.
				style = document.createElement('style');
				style.appendChild(document.createTextNode(''));
				document.head.appendChild(style);
		
			// Get sheet.
				sheet = style.sheet;
		
		// Mobile.
			if (client.mobile) {
		
				// Prevent overscrolling on Safari/other mobile browsers.
				// 'vh' units don't factor in the heights of various browser UI elements so our page ends up being
				// a lot taller than it needs to be (resulting in overscroll and issues with vertical centering).
					(function() {
		
						// Lsd units available?
							if (client.flags.lsdUnits) {
		
								document.documentElement.style.setProperty('--viewport-height', '100svh');
								document.documentElement.style.setProperty('--background-height', '100lvh');
		
							}
		
						// Otherwise, use innerHeight hack.
							else {
		
								var f = function() {
									document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
									document.documentElement.style.setProperty('--background-height', (window.innerHeight + 250) + 'px');
								};
		
								on('load', f);
								on('orientationchange', function() {
		
									// Update after brief delay.
										setTimeout(function() {
											(f)();
										}, 100);
		
								});
		
							}
		
					})();
		
			}
		
		// Android.
			if (client.os == 'android') {
		
				// Prevent background "jump" when address bar shrinks.
				// Specifically, this fix forces the background pseudoelement to a fixed height based on the physical
				// screen size instead of relying on "vh" (which is subject to change when the scrollbar shrinks/grows).
					(function() {
		
						// Insert and get rule.
							sheet.insertRule('body::after { }', 0);
							rule = sheet.cssRules[0];
		
						// Event.
							var f = function() {
								rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
							};
		
							on('load', f);
							on('orientationchange', f);
							on('touchmove', f);
		
					})();
		
				// Apply "is-touch" class to body.
					$body.classList.add('is-touch');
		
			}
		
		// iOS.
			else if (client.os == 'ios') {
		
				// <=11: Prevent white bar below background when address bar shrinks.
				// For some reason, simply forcing GPU acceleration on the background pseudoelement fixes this.
					if (client.osVersion <= 11)
						(function() {
		
							// Insert and get rule.
								sheet.insertRule('body::after { }', 0);
								rule = sheet.cssRules[0];
		
							// Set rule.
								rule.style.cssText = '-webkit-transform: scale(1.0)';
		
						})();
		
				// <=11: Prevent white bar below background when form inputs are focused.
				// Fixed-position elements seem to lose their fixed-ness when this happens, which is a problem
				// because our backgrounds fall into this category.
					if (client.osVersion <= 11)
						(function() {
		
							// Insert and get rule.
								sheet.insertRule('body.ios-focus-fix::before { }', 0);
								rule = sheet.cssRules[0];
		
							// Set rule.
								rule.style.cssText = 'height: calc(100% + 60px)';
		
							// Add event listeners.
								on('focus', function(event) {
									$body.classList.add('ios-focus-fix');
								}, true);
		
								on('blur', function(event) {
									$body.classList.remove('ios-focus-fix');
								}, true);
		
						})();
		
				// Apply "is-touch" class to body.
					$body.classList.add('is-touch');
		
			}
	
	// Reorder.
		(function() {
		
			var breakpoints = {
					small: '(max-width: 736px)',
					medium: '(max-width: 980px)',
				},
				elements = $$('[data-reorder]');
		
			// Initialize elements.
				elements.forEach(function(e) {
		
					var desktop = [],
						mobile = [],
						state = false,
						query,
						a, x, ce, f;
		
					// Determine media query via "reorder-breakpoint".
		
						// Attribute provided *and* it's a valid breakpoint? Use it.
							if ('reorderBreakpoint' in e.dataset
							&&  e.dataset.reorderBreakpoint in breakpoints)
								query = breakpoints[e.dataset.reorderBreakpoint];
		
						// Otherwise, default to "small".
							else
								query = breakpoints.small;
		
					// Get desktop order.
						for (ce of e.childNodes) {
		
							// Not a node? Skip.
								if (ce.nodeType != 1)
									continue;
		
							// Add to desktop order.
								desktop.push(ce);
		
						}
		
					// Determine mobile order via "reorder".
						a = e.dataset.reorder.split(',');
		
						for (x of a)
							mobile.push(desktop[parseInt(x)]);
		
					// Create handler.
						f = function() {
		
							var order = null,
								ce;
		
							// Matches media query?
								if (window.matchMedia(query).matches) {
		
									// Hasn't been applied yet?
										if (!state) {
		
											// Mark as applied.
												state = true;
		
											// Apply mobile.
												for (ce of mobile)
													e.appendChild(ce);
		
										}
		
								}
		
							// Otherwise ...
								else {
		
									// Previously applied?
										if (state) {
		
											// Unmark as applied.
												state = false;
		
											// Apply desktop.
												for (ce of desktop)
													e.appendChild(ce);
		
										}
		
								}
		
						};
		
					// Add event listeners.
						on('resize', f);
						on('orientationchange', f);
						on('load', f);
						on('fullscreenchange', f);
		
				});
		
		})();
	
	// Scroll events.
		var scrollEvents = {
		
			/**
			 * Items.
			 * @var {array}
			 */
			items: [],
		
			/**
			 * Adds an event.
			 * @param {object} o Options.
			 */
			add: function(o) {
		
				this.items.push({
					element: o.element,
					triggerElement: (('triggerElement' in o && o.triggerElement) ? o.triggerElement : o.element),
					enter: ('enter' in o ? o.enter : null),
					leave: ('leave' in o ? o.leave : null),
					mode: ('mode' in o ? o.mode : 4),
					threshold: ('threshold' in o ? o.threshold : 0.25),
					offset: ('offset' in o ? o.offset : 0),
					initialState: ('initialState' in o ? o.initialState : null),
					state: false,
				});
		
			},
		
			/**
			 * Handler.
			 */
			handler: function() {
		
				var	height, top, bottom, scrollPad;
		
				// Determine values.
					if (client.os == 'ios') {
		
						height = document.documentElement.clientHeight;
						top = document.body.scrollTop + window.scrollY;
						bottom = top + height;
						scrollPad = 125;
		
					}
					else {
		
						height = document.documentElement.clientHeight;
						top = document.documentElement.scrollTop;
						bottom = top + height;
						scrollPad = 0;
		
					}
		
				// Step through items.
					scrollEvents.items.forEach(function(item) {
		
						var	elementTop, elementBottom, viewportTop, viewportBottom,
							bcr, pad, state, a, b;
		
						// No enter/leave handlers? Bail.
							if (!item.enter
							&&	!item.leave)
								return true;
		
						// No trigger element? Bail.
							if (!item.triggerElement)
								return true;
		
						// Trigger element not visible?
							if (item.triggerElement.offsetParent === null) {
		
								// Current state is active *and* leave handler exists?
									if (item.state == true
									&&	item.leave) {
		
										// Reset state to false.
											item.state = false;
		
										// Call it.
											(item.leave).apply(item.element);
		
										// No enter handler? Unbind leave handler (so we don't check this element again).
											if (!item.enter)
												item.leave = null;
		
									}
		
								// Bail.
									return true;
		
							}
		
						// Get element position.
							bcr = item.triggerElement.getBoundingClientRect();
							elementTop = top + Math.floor(bcr.top);
							elementBottom = elementTop + bcr.height;
		
						// Determine state.
		
							// Initial state exists?
								if (item.initialState !== null) {
		
									// Use it for this check.
										state = item.initialState;
		
									// Clear it.
										item.initialState = null;
		
								}
		
							// Otherwise, determine state from mode/position.
								else {
		
									switch (item.mode) {
		
										// Element falls within viewport.
											case 1:
											default:
		
												// State.
													state = (bottom > (elementTop - item.offset) && top < (elementBottom + item.offset));
		
												break;
		
										// Viewport midpoint falls within element.
											case 2:
		
												// Midpoint.
													a = (top + (height * 0.5));
		
												// State.
													state = (a > (elementTop - item.offset) && a < (elementBottom + item.offset));
		
												break;
		
										// Viewport midsection falls within element.
											case 3:
		
												// Upper limit (25%-).
													a = top + (height * (item.threshold));
		
													if (a - (height * 0.375) <= 0)
														a = 0;
		
												// Lower limit (-75%).
													b = top + (height * (1 - item.threshold));
		
													if (b + (height * 0.375) >= document.body.scrollHeight - scrollPad)
														b = document.body.scrollHeight + scrollPad;
		
												// State.
													state = (b > (elementTop - item.offset) && a < (elementBottom + item.offset));
		
												break;
		
										// Viewport intersects with element.
											case 4:
		
												// Calculate pad, viewport top, viewport bottom.
													pad = height * item.threshold;
													viewportTop = (top + pad);
													viewportBottom = (bottom - pad);
		
												// Compensate for elements at the very top or bottom of the page.
													if (Math.floor(top) <= pad)
														viewportTop = top;
		
													if (Math.ceil(bottom) >= (document.body.scrollHeight - pad))
														viewportBottom = bottom;
		
												// Element is smaller than viewport?
													if ((viewportBottom - viewportTop) >= (elementBottom - elementTop)) {
		
														state =	(
																(elementTop >= viewportTop && elementBottom <= viewportBottom)
															||	(elementTop >= viewportTop && elementTop <= viewportBottom)
															||	(elementBottom >= viewportTop && elementBottom <= viewportBottom)
														);
		
													}
		
												// Otherwise, viewport is smaller than element.
													else
														state =	(
																(viewportTop >= elementTop && viewportBottom <= elementBottom)
															||	(elementTop >= viewportTop && elementTop <= viewportBottom)
															||	(elementBottom >= viewportTop && elementBottom <= viewportBottom)
														);
		
												break;
		
									}
		
								}
		
						// State changed?
							if (state != item.state) {
		
								// Update state.
									item.state = state;
		
								// Call handler.
									if (item.state) {
		
										// Enter handler exists?
											if (item.enter) {
		
												// Call it.
													(item.enter).apply(item.element);
		
												// No leave handler? Unbind enter handler (so we don't check this element again).
													if (!item.leave)
														item.enter = null;
		
											}
		
									}
									else {
		
										// Leave handler exists?
											if (item.leave) {
		
												// Call it.
													(item.leave).apply(item.element);
		
												// No enter handler? Unbind leave handler (so we don't check this element again).
													if (!item.enter)
														item.leave = null;
		
											}
		
									}
		
							}
		
					});
		
			},
		
			/**
			 * Initializes scroll events.
			 */
			init: function() {
		
				// Bind handler to events.
					on('load', this.handler);
					on('resize', this.handler);
					on('scroll', this.handler);
		
				// Do initial handler call.
					(this.handler)();
		
			}
		};
		
		// Initialize.
			scrollEvents.init();
	
	// Scroll tracking.
		var scrollTracking = {
		
			/**
			 * Elements.
			 * @var {array}
			 */
			elements: [],
		
			/**
			 * Adds element(s) to track.
			 * @param {string} selector Selector.
			 */
			add: function(selector) {
		
				var _this = this;
		
				// Step through selector.
					$$(selector).forEach(function(e) {
		
						// Add element.
							_this.elements.push(e);
		
					});
		
			},
		
			/**
			 * Resize handler.
			 */
			resizeHandler: function() {
		
				// Step through tracked elements.
					this.elements.forEach(function(e) {
		
						// Update "element-top" variable.
							e.style.setProperty('--element-top', e.offsetTop);
		
					});
		
			},
		
			/**
			 * Scroll handler.
			 */
			scrollHandler: function() {
		
				// Update "scroll-y" variable.
					document.documentElement.style.setProperty('--scroll-y', window.scrollY);
		
			},
		
			/**
			 * Initializes scroll tracking.
			 */
			init: function() {
		
				var _this = this;
		
				// Scroll handler.
		
					// Bind to scroll event.
						on('scroll', function() {
							_this.scrollHandler();
						});
		
					// Bind to load event.
						on('load', function() {
							_this.scrollHandler();
						});
		
					// Do initial call.
						this.scrollHandler();
		
				// Resize handler.
		
					// Bind to resize event.
						on('resize', function() {
							_this.resizeHandler();
						});
		
					// Bind to load event.
						on('load', function() {
							_this.resizeHandler();
						});
		
					// Do initial call.
						this.resizeHandler();
		
				// Create ResizeObserver on body.
				// This ensures both handlers are called if the body length changes in any way.
					let x = new ResizeObserver(function(entries) {
		
						// Call scroll handler.
							_this.scrollHandler();
		
						// Call resize handler.
							_this.resizeHandler();
		
					});
		
					x.observe($body);
		
			}
		
		};
		
		scrollTracking.init();
	
	// Deferred.
		(function() {
		
			var items = $$('.deferred'),
				loadHandler, enterHandler;
		
			// Handlers.
		
				/**
				 * "On Load" handler.
				 */
				loadHandler = function() {
		
					var i = this,
						p = this.parentElement,
						duration = 375;
		
					// Not "done" yet? Bail.
						if (i.dataset.src !== 'done')
							return;
		
					// Image loaded faster than expected? Reduce transition duration.
						if (Date.now() - i._startLoad < duration)
							duration = 175;
		
					// Set transition duration.
						i.style.transitionDuration = (duration / 1000.00) + 's';
		
					// Show image.
						p.classList.remove('loading');
						i.style.opacity = 1;
		
						setTimeout(function() {
		
							// Clear background image.
								i.style.backgroundImage = 'none';
		
							// Clear transition properties.
								i.style.transitionProperty = '';
								i.style.transitionTimingFunction = '';
								i.style.transitionDuration = '';
		
						}, duration);
		
				};
		
				/**
				 * "On Enter" handler.
				 */
				enterHandler = function() {
		
					var	i = this,
						p = this.parentElement,
						src;
		
					// Get src, mark as "done".
						src = i.dataset.src;
						i.dataset.src = 'done';
		
					// Mark parent as loading.
						p.classList.add('loading');
		
					// Swap placeholder for real image src.
						i._startLoad = Date.now();
						i.src = src;
		
				};
		
			// Initialize items.
				items.forEach(function(p) {
		
					var i = p.firstElementChild;
		
					// Set parent to placeholder.
						if (!p.classList.contains('enclosed')) {
		
							p.style.backgroundImage = 'url(' + i.src + ')';
							p.style.backgroundSize = '100% 100%';
							p.style.backgroundPosition = 'top left';
							p.style.backgroundRepeat = 'no-repeat';
		
						}
		
					// Hide image.
						i.style.opacity = 0;
		
					// Set transition properties.
						i.style.transitionProperty = 'opacity';
						i.style.transitionTimingFunction = 'ease-in-out';
		
					// Load event.
						i.addEventListener('load', loadHandler);
		
					// Add to scroll events.
						scrollEvents.add({
							element: i,
							enter: enterHandler,
							offset: 250,
						});
		
				});
		
		})();
	
	// "On Visible" animation.
		var onvisible = {
		
			/**
			 * Effects.
			 * @var {object}
			 */
			effects: {
				'blur-in': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'filter ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity) {
						this.style.opacity = 0;
						this.style.filter = 'blur(' + (0.25 * intensity) + 'rem)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.filter = 'none';
					},
				},
				'zoom-in': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity, alt) {
						this.style.opacity = 0;
						this.style.transform = 'scale(' + (1 - ((alt ? 0.25 : 0.05) * intensity)) + ')';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'zoom-out': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity, alt) {
						this.style.opacity = 0;
						this.style.transform = 'scale(' + (1 + ((alt ? 0.25 : 0.05) * intensity)) + ')';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'slide-left': {
					type: 'transition',
					transition: function (speed, delay) {
						return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function() {
						this.style.transform = 'translateX(100vw)';
					},
					play: function() {
						this.style.transform = 'none';
					},
				},
				'slide-right': {
					type: 'transition',
					transition: function (speed, delay) {
						return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function() {
						this.style.transform = 'translateX(-100vw)';
					},
					play: function() {
						this.style.transform = 'none';
					},
				},
				'flip-forward': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity, alt) {
						this.style.opacity = 0;
						this.style.transformOrigin = '50% 50%';
						this.style.transform = 'perspective(1000px) rotateX(' + ((alt ? 45 : 15) * intensity) + 'deg)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'flip-backward': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity, alt) {
						this.style.opacity = 0;
						this.style.transformOrigin = '50% 50%';
						this.style.transform = 'perspective(1000px) rotateX(' + ((alt ? -45 : -15) * intensity) + 'deg)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'flip-left': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity, alt) {
						this.style.opacity = 0;
						this.style.transformOrigin = '50% 50%';
						this.style.transform = 'perspective(1000px) rotateY(' + ((alt ? 45 : 15) * intensity) + 'deg)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'flip-right': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity, alt) {
						this.style.opacity = 0;
						this.style.transformOrigin = '50% 50%';
						this.style.transform = 'perspective(1000px) rotateY(' + ((alt ? -45 : -15) * intensity) + 'deg)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'tilt-left': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity, alt) {
						this.style.opacity = 0;
						this.style.transform = 'rotate(' + ((alt ? 45 : 5) * intensity) + 'deg)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'tilt-right': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity, alt) {
						this.style.opacity = 0;
						this.style.transform = 'rotate(' + ((alt ? -45 : -5) * intensity) + 'deg)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'fade-right': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity) {
						this.style.opacity = 0;
						this.style.transform = 'translateX(' + (-1.5 * intensity) + 'rem)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'fade-left': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity) {
						this.style.opacity = 0;
						this.style.transform = 'translateX(' + (1.5 * intensity) + 'rem)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'fade-down': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity) {
						this.style.opacity = 0;
						this.style.transform = 'translateY(' + (-1.5 * intensity) + 'rem)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'fade-up': {
					type: 'transition',
					transition: function (speed, delay) {
						return  'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity) {
						this.style.opacity = 0;
						this.style.transform = 'translateY(' + (1.5 * intensity) + 'rem)';
					},
					play: function() {
						this.style.opacity = 1;
						this.style.transform = 'none';
					},
				},
				'fade-in': {
					type: 'transition',
					transition: function (speed, delay) {
						return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function() {
						this.style.opacity = 0;
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'fade-in-background': {
					type: 'manual',
					rewind: function() {
		
						this.style.removeProperty('--onvisible-delay');
						this.style.removeProperty('--onvisible-background-color');
		
					},
					play: function(speed, delay) {
		
						this.style.setProperty('--onvisible-speed', speed + 's');
		
						if (delay)
							this.style.setProperty('--onvisible-delay', delay + 's');
		
						this.style.setProperty('--onvisible-background-color', 'rgba(0,0,0,0.001)');
		
					},
				},
				'zoom-in-image': {
					type: 'transition',
					target: 'img',
					transition: function (speed, delay) {
						return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function() {
						this.style.transform = 'scale(1)';
					},
					play: function(intensity) {
						this.style.transform = 'scale(' + (1 + (0.1 * intensity)) + ')';
					},
				},
				'zoom-out-image': {
					type: 'transition',
					target: 'img',
					transition: function (speed, delay) {
						return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity) {
						this.style.transform = 'scale(' + (1 + (0.1 * intensity)) + ')';
					},
					play: function() {
						this.style.transform = 'none';
					},
				},
				'focus-image': {
					type: 'transition',
					target: 'img',
					transition: function (speed, delay) {
						return  'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' +
								'filter ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
					},
					rewind: function(intensity) {
						this.style.transform = 'scale(' + (1 + (0.05 * intensity)) + ')';
						this.style.filter = 'blur(' + (0.25 * intensity) + 'rem)';
					},
					play: function(intensity) {
						this.style.transform = 'none';
						this.style.filter = 'none';
					},
				},
				'wipe-up': {
					type: 'animate',
					keyframes: function(intensity) {
		
						return [
							{
								maskSize: '100% 0%',
								maskImage: 'linear-gradient(90deg, black 100%, transparent 100%)',
							},
							{
								maskSize: '110% 110%',
								maskImage: 'linear-gradient(90deg, black 100%, transparent 100%)',
							},
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
							easing: 'ease',
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
						this.style.maskComposite = 'exclude';
						this.style.maskRepeat = 'no-repeat';
						this.style.maskPosition = '0% 100%';
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'wipe-down': {
					type: 'animate',
					keyframes: function(intensity) {
		
						return [
							{
								maskSize: '100% 0%',
								maskImage: 'linear-gradient(90deg, black 100%, transparent 100%)',
							},
							{
								maskSize: '110% 110%',
								maskImage: 'linear-gradient(90deg, black 100%, transparent 100%)',
							},
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
							easing: 'ease',
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
						this.style.maskComposite = 'exclude';
						this.style.maskRepeat = 'no-repeat';
						this.style.maskPosition = '0% 0%';
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'wipe-left': {
					type: 'animate',
					keyframes: function(intensity) {
		
						return [
							{
								maskSize: '0% 100%',
								maskImage: 'linear-gradient(90deg, black 100%, transparent 100%)',
							},
							{
								maskSize: '110% 110%',
								maskImage: 'linear-gradient(90deg, black 100%, transparent 100%)',
							},
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
							easing: 'ease',
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
						this.style.maskComposite = 'exclude';
						this.style.maskRepeat = 'no-repeat';
						this.style.maskPosition = '100% 0%';
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'wipe-right': {
					type: 'animate',
					keyframes: function(intensity) {
		
						return [
							{
								maskSize: '0% 100%',
								maskImage: 'linear-gradient(90deg, black 100%, transparent 100%)',
							},
							{
								maskSize: '110% 110%',
								maskImage: 'linear-gradient(90deg, black 100%, transparent 100%)',
							},
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
							easing: 'ease',
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
						this.style.maskComposite = 'exclude';
						this.style.maskRepeat = 'no-repeat';
						this.style.maskPosition = '0% 0%';
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'wipe-diagonal': {
					type: 'animate',
					keyframes: function(intensity) {
		
						return [
							{
								maskSize: '0% 0%',
								maskImage: 'linear-gradient(45deg, black 50%, transparent 50%)',
							},
							{
								maskSize: '220% 220%',
								maskImage: 'linear-gradient(45deg, black 50%, transparent 50%)',
							},
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
							easing: 'ease',
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
						this.style.maskComposite = 'exclude';
						this.style.maskRepeat = 'no-repeat';
						this.style.maskPosition = '0% 100%';
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'wipe-reverse-diagonal': {
					type: 'animate',
					keyframes: function(intensity) {
		
						return [
							{
								maskSize: '0% 0%',
								maskImage: 'linear-gradient(135deg, transparent 50%, black 50%)',
							},
							{
								maskSize: '220% 220%',
								maskImage: 'linear-gradient(135deg, transparent 50%, black 50%)',
							},
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
							easing: 'ease',
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
						this.style.maskComposite = 'exclude';
						this.style.maskRepeat = 'no-repeat';
						this.style.maskPosition = '100% 100%';
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'pop-in': {
					type: 'animate',
					keyframes: function(intensity) {
		
						let diff = (intensity + 1) * 0.025;
		
						return [
							{
								opacity: 0,
								transform: 'scale(' + (1 - diff) + ')',
							},
							{
								opacity: 1,
								transform: 'scale(' + (1 + diff) + ')',
							},
							{
								opacity: 1,
								transform: 'scale(' + (1 - (diff * 0.25)) + ')',
								offset: 0.9,
							},
							{
								opacity: 1,
								transform: 'scale(1)',
							}
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'bounce-up': {
					type: 'animate',
					keyframes: function(intensity) {
		
						let diff = (intensity + 1) * 0.075;
		
						return [
							{
								opacity: 0,
								transform: 'translateY(' + diff + 'rem)',
							},
							{
								opacity: 1,
								transform: 'translateY(' + (-1 * diff) + 'rem)',
							},
							{
								opacity: 1,
								transform: 'translateY(' + (diff * 0.25) + 'rem)',
								offset: 0.9,
							},
							{
								opacity: 1,
								transform: 'translateY(0)',
							}
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'bounce-down': {
					type: 'animate',
					keyframes: function(intensity) {
		
						let diff = (intensity + 1) * 0.075;
		
						return [
							{
								opacity: 0,
								transform: 'translateY(' + (-1 * diff) + 'rem)',
							},
							{
								opacity: 1,
								transform: 'translateY(' + diff + 'rem)',
							},
							{
								opacity: 1,
								transform: 'translateY(' + (-1 * (diff * 0.25)) + 'rem)',
								offset: 0.9,
							},
							{
								opacity: 1,
								transform: 'translateY(0)',
							}
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'bounce-left': {
					type: 'animate',
					keyframes: function(intensity) {
		
						let diff = (intensity + 1) * 0.075;
		
						return [
							{
								opacity: 0,
								transform: 'translateX(' + diff + 'rem)',
							},
							{
								opacity: 1,
								transform: 'translateX(' + (-1 * diff) + 'rem)',
							},
							{
								opacity: 1,
								transform: 'translateX(' + (diff * 0.25) + 'rem)',
								offset: 0.9,
							},
							{
								opacity: 1,
								transform: 'translateX(0)',
							}
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
				'bounce-right': {
					type: 'animate',
					keyframes: function(intensity) {
		
						let diff = (intensity + 1) * 0.075;
		
						return [
							{
								opacity: 0,
								transform: 'translateX(' + (-1 * diff) + 'rem)',
							},
							{
								opacity: 1,
								transform: 'translateX(' + diff + 'rem)',
							},
							{
								opacity: 1,
								transform: 'translateX(' + (-1 * (diff * 0.25)) + 'rem)',
								offset: 0.9,
							},
							{
								opacity: 1,
								transform: 'translateX(0)',
							}
						];
		
					},
					options: function(speed) {
		
						return {
							duration: speed,
							iterations: 1,
						};
		
					},
					rewind: function() {
						this.style.opacity = 0;
					},
					play: function() {
						this.style.opacity = 1;
					},
				},
			},
		
			/**
			 * Regex.
			 * @var {RegExp}
			 */
			regex: new RegExp('([^\\s]+)', 'g'),
		
			/**
			 * Adds one or more animatable elements.
			 * @param {string} selector Selector.
			 * @param {object} settings Settings.
			 */
			add: function(selector, settings) {
		
				var	_this = this,
					style = settings.style in this.effects ? settings.style : 'fade',
					speed = parseInt('speed' in settings ? settings.speed : 0),
					intensity = parseInt('intensity' in settings ? settings.intensity : 5),
					delay = parseInt('delay' in settings ? settings.delay : 0),
					replay = 'replay' in settings ? settings.replay : false,
					stagger = 'stagger' in settings ? (parseInt(settings.stagger) >= 0 ? parseInt(settings.stagger) : false) : false,
					staggerOrder = 'staggerOrder' in settings ? settings.staggerOrder : 'default',
					staggerSelector = 'staggerSelector' in settings ? settings.staggerSelector : null,
					threshold = parseInt('threshold' in settings ? settings.threshold : 3),
					state = 'state' in settings ? settings.state : null,
					effect = this.effects[style],
					enter, leave, scrollEventThreshold;
		
				// Determine scroll event threshold.
					switch (threshold) {
		
						case 1:
							scrollEventThreshold = 0;
							break;
		
						case 2:
							scrollEventThreshold = 0.125;
							break;
		
						default:
						case 3:
							scrollEventThreshold = 0.25;
							break;
		
						case 4:
							scrollEventThreshold = 0.375;
							break;
		
						case 5:
							scrollEventThreshold = 0.475;
							break;
		
					}
		
				// Determine effect type.
					switch (effect.type) {
		
						default:
						case 'transition':
		
							// Scale intensity.
								intensity = ((intensity / 10) * 1.75) + 0.25;
		
							// Build enter handler.
								enter = function(children, staggerDelay=0) {
		
									var _this = this,
										transitionOrig;
		
									// Target provided? Use it instead of element.
										if (effect.target)
											_this = this.querySelector(effect.target);
		
									// Save original transition.
										transitionOrig = _this.style.transition;
		
									// Apply temporary styles.
										_this.style.setProperty('backface-visibility', 'hidden');
		
									// Apply transition.
										_this.style.transition = effect.transition.apply(_this, [ speed / 1000, (delay + staggerDelay) / 1000 ]);
		
									// Play.
										effect.play.apply(_this, [ intensity, !!children ]);
		
									// Delay.
										setTimeout(function() {
		
											// Remove temporary styles.
												_this.style.removeProperty('backface-visibility');
		
											// Restore original transition.
												_this.style.transition = transitionOrig;
		
										}, (speed + delay + staggerDelay) * 2);
		
								};
		
							// Build leave handler.
								leave = function(children) {
		
									var _this = this,
										transitionOrig;
		
									// Target provided? Use it instead of element.
										if (effect.target)
											_this = this.querySelector(effect.target);
		
									// Save original transition.
										transitionOrig = _this.style.transition;
		
									// Apply temporary styles.
										_this.style.setProperty('backface-visibility', 'hidden');
		
									// Apply transition.
										_this.style.transition = effect.transition.apply(_this, [ speed / 1000 ]);
		
									// Rewind.
										effect.rewind.apply(_this, [ intensity, !!children ]);
		
									// Delay.
										setTimeout(function() {
		
											// Remove temporary styles.
												_this.style.removeProperty('backface-visibility');
		
											// Restore original transition.
												_this.style.transition = transitionOrig;
		
										}, speed * 2);
		
								};
		
							break;
		
						case 'animate':
		
							// Build enter handler.
								enter = function(children, staggerDelay=0) {
		
									var _this = this,
										transitionOrig;
		
									// Target provided? Use it instead of element.
										if (effect.target)
											_this = this.querySelector(effect.target);
		
									// Delay.
										setTimeout(() => {
		
											// Call play handler on target.
												effect.play.apply(_this, [ ]);
		
											// Animate.
												_this.animate(
													effect.keyframes.apply(_this, [ intensity ]),
													effect.options.apply(_this, [ speed, delay ])
												);
		
										}, delay + staggerDelay);
		
								};
		
							// Build leave handler.
								leave = function(children) {
		
									var _this = this,
										transitionOrig;
		
									// Target provided? Use it instead of element.
										if (effect.target)
											_this = this.querySelector(effect.target);
		
									// Animate.
		
										// Create Animation object.
											let a = _this.animate(
												effect.keyframes.apply(_this, [ intensity ]),
												effect.options.apply(_this, [ speed, delay ])
											);
		
										// Play in reverse.
											a.reverse();
		
										// Add finish listener.
											a.addEventListener('finish', () => {
		
												// Call rewind handler on target.
													effect.rewind.apply(_this, [ ]);
		
											});
		
								};
		
							break;
		
						case 'manual':
		
							// Build enter handler.
								enter = function(children, staggerDelay=0) {
		
									var _this = this,
										transitionOrig;
		
									// Target provided? Use it instead of element.
										if (effect.target)
											_this = this.querySelector(effect.target);
		
									// Call play handler on target.
										effect.play.apply(_this, [ speed / 1000, (delay + staggerDelay) / 1000, intensity ]);
		
								};
		
							// Build leave handler.
								leave = function(children) {
		
									var _this = this,
										transitionOrig;
		
									// Target provided? Use it instead of element.
										if (effect.target)
											_this = this.querySelector(effect.target);
		
									// Call rewind handler on target.
										effect.rewind.apply(_this, [ intensity, !!children ]);
		
								};
		
							break;
		
					}
		
				// Step through selected elements.
					$$(selector).forEach(function(e) {
		
						var children, targetElement, triggerElement;
		
						// Stagger in use, and stagger selector is "all children"? Expand text nodes.
							if (stagger !== false
							&&	staggerSelector == ':scope > *')
								_this.expandTextNodes(e);
		
						// Get children.
							children = (stagger !== false && staggerSelector) ? e.querySelectorAll(staggerSelector) : null;
		
						// Initial rewind.
		
							// Determine target element.
								if (effect.target)
									targetElement = e.querySelector(effect.target);
								else
									targetElement = e;
		
							// Children? Rewind each individually.
								if (children)
									children.forEach(function(targetElement) {
										effect.rewind.apply(targetElement, [ intensity, true ]);
									});
		
							// Otherwise. just rewind element.
								else
									effect.rewind.apply(targetElement, [ intensity ]);
		
						// Determine trigger element.
							triggerElement = e;
		
							// Has a parent?
								if (e.parentNode) {
		
									// Parent is an onvisible trigger? Use it.
										if (e.parentNode.dataset.onvisibleTrigger)
											triggerElement = e.parentNode;
		
									// Otherwise, has a grandparent?
										else if (e.parentNode.parentNode) {
		
											// Grandparent is an onvisible trigger? Use it.
												if (e.parentNode.parentNode.dataset.onvisibleTrigger)
													triggerElement = e.parentNode.parentNode;
		
										}
		
								}
		
						// Add scroll event.
							scrollEvents.add({
								element: e,
								triggerElement: triggerElement,
								initialState: state,
								threshold: scrollEventThreshold,
								enter: children ? function() {
		
									var staggerDelay = 0,
										childHandler = function(e) {
		
											// Apply enter handler.
												enter.apply(e, [children, staggerDelay]);
		
											// Increment stagger delay.
												staggerDelay += stagger;
		
										},
										a;
		
									// Default stagger order?
										if (staggerOrder == 'default') {
		
											// Apply child handler to children.
												children.forEach(childHandler);
		
										}
		
									// Otherwise ...
										else {
		
											// Convert children to an array.
												a = Array.from(children);
		
											// Sort array based on stagger order.
												switch (staggerOrder) {
		
													case 'reverse':
		
														// Reverse array.
															a.reverse();
		
														break;
		
													case 'random':
		
														// Randomly sort array.
															a.sort(function() {
																return Math.random() - 0.5;
															});
		
														break;
		
												}
		
											// Apply child handler to array.
												a.forEach(childHandler);
		
										}
		
								} : enter,
								leave: (replay ? (children ? function() {
		
									// Step through children.
										children.forEach(function(e) {
		
											// Apply leave handler.
												leave.apply(e, [children]);
		
										});
		
								} : leave) : null),
							});
		
					});
		
			},
		
			/**
			 * Expand text nodes within an element into <text-node> elements.
			 * @param {DOMElement} e Element.
			 */
			expandTextNodes: function(e) {
		
				var s, i, w, x;
		
				// Step through child nodes.
					for (i = 0; i < e.childNodes.length; i++) {
		
						// Get child node.
							x = e.childNodes[i];
		
						// Not a text node? Skip.
							if (x.nodeType != Node.TEXT_NODE)
								continue;
		
						// Get node value.
							s = x.nodeValue;
		
						// Convert to <text-node>.
							s = s.replace(
								this.regex,
								function(x, a) {
									return '<text-node>' + escapeHtml(a) + '</text-node>';
								}
							);
		
						// Update.
		
							// Create wrapper.
								w = document.createElement('text-node');
		
							// Populate with processed text.
							// This converts our processed text into a series of new text and element nodes.
								w.innerHTML = s;
		
							// Replace original element with wrapper.
								x.replaceWith(w);
		
							// Step through wrapper's children.
								while (w.childNodes.length > 0) {
		
									// Move child after wrapper.
										w.parentNode.insertBefore(
											w.childNodes[0],
											w
										);
		
								}
		
							// Remove wrapper (now that it's no longer needed).
								w.parentNode.removeChild(w);
		
						}
		
			},
		
		};
	
	// Clipboard dialog.
		(function() {
		
			var dialog = null;
		
			/**
			 * Clipboard dialog.
			 */
			class ClipboardDialog {
		
				/**
				 * Dialog element.
				 * @var {DOMElement}
				 */
				$dialog = null;
		
				/**
				 * Close element.
				 * @var {DOMElement}
				 */
				$close = null;
		
				/**
				 * Content element.
				 * @var {DOMElement}
				 */
				$content = null;
		
				/**
				 * Wrapper element.
				 * @var {DOMElement}
				 */
				$wrapper = null;
		
				/**
				 * Lock state.
				 * @var {bool}
				 */
				isLocked = false;
		
				/**
				 * Constructor.
				 */
				constructor() {
		
					// Create dialog element.
						this.$dialog = document.createElement('dialog');
		
						// Set class.
							this.$dialog.classList.add('clipboard');
		
						// Bind "click" handler.
							this.$dialog.addEventListener('click', () => {
		
								// Prevent default.
									event.preventDefault();
									event.stopPropagation();
		
								// Close dialog.
									this.close();
		
							});
		
						// Bind "keydown" handler.
							this.$dialog.addEventListener('keydown', (event) => {
		
								// Hit escape?
									if (event.keyCode == 27) {
		
										// Prevent default.
											event.preventDefault();
											event.stopPropagation();
		
										// Close dialog.
											this.close();
		
									}
		
							});
		
						// Append to body.
							document.body.appendChild(this.$dialog);
		
					// Create wrapper element.
						this.$wrapper = document.createElement('div');
		
						// Set class.
							this.$wrapper.classList.add('wrapper');
		
						// Bind "click" handler.
							this.$wrapper.addEventListener('click', (event) => {
		
								// Prevent default.
									event.preventDefault();
									event.stopPropagation();
		
								// Copy text to clipboard.
									navigator.clipboard.writeText(this.$content.innerText);
		
								// Mark as "copied"
									this.$wrapper.classList.add('copied');
		
								// Close dialog (after delay).
									setTimeout(() => {
										this.close();
									}, 500);
		
							});
		
						// Append to dialog element.
							this.$dialog.appendChild(this.$wrapper);
		
					// Create content element.
						this.$content = document.createElement('p');
		
						// Set class.
							this.$content.classList.add('content');
		
						// Set initial content.
							this.$content.innerText = '-';
		
						// Append to wrapper element.
							this.$wrapper.appendChild(this.$content);
		
					// Create close element.
						this.$close = document.createElement('div');
		
						// Set class.
							this.$close.classList.add('close');
		
						// Bind "click" handler.
							this.$close.addEventListener('click', (event) => {
		
								// Close dialog.
									this.close();
		
							});
		
						// Append to dialog element.
							this.$dialog.appendChild(this.$close);
		
				};
		
				/**
				 * Closes the dialog.
				 */
				close() {
		
					// Locked? Bail.
						if (this.isLocked)
							return;
		
					// Lock dialog.
						this.isLocked = true;
		
					// Unmark dialog element as "active".
						this.$dialog.classList.remove('active');
		
					// Delay.
						setTimeout(() => {
		
							// Close dialog element.
								this.$dialog.close();
		
							// Unmark wrapper element as "copied".
								this.$wrapper.classList.remove('copied');
		
							// Unlock dialog.
								this.isLocked = false;
		
						}, 750);
		
				};
		
				/**
				 * Opens the dialog.
				 * @param {string} content Content.
				 */
				open(content) {
		
					// Locked? Bail.
						if (this.isLocked)
							return;
		
					// Lock dialog.
						this.isLocked = true;
		
					// Set content element to content.
						this.$content.innerText = unescape(content);
		
					// Show dialog element.
						this.$dialog.showModal();
		
					// Delay.
					// Note: Needed by some browsers (eg. Safari).
						setTimeout(() => {
		
							// Mark dialog element as "active".
								this.$dialog.classList.add('active');
		
							// Delay.
								setTimeout(() => {
		
									// Unlock dialog.
										this.isLocked = false;
		
								}, 250);
		
						}, 0);
		
				}
		
			};
		
			window._clipboard = function(event, content) {
		
				// Prevent default.
					event.preventDefault();
		
				// No dialog yet? Create it.
					if (!dialog)
						dialog = new ClipboardDialog;
		
				// Open dialog.
					dialog.open(content);
		
				return false;
		
			};
		
		})();
	
	// Gallery.
		/**
		* Lightbox gallery.
		*/
		function lightboxGallery() {
		
		var _this = this;
		
		/**
		 * ID.
		 * @var {string}
		 */
		this.id = 'gallery';
		
		/**
		 * Wrapper.
		 * @var {DOMElement}
		 */
		this.$wrapper = $('#' + this.id);
		
		/**
		 * Modal.
		 * @var {DOMElement}
		 */
		this.$modal = null;
		
		/**
		 * Modal caption.
		 * @var {DOMElement}
		 */
		this.$modalCaption = null;
		
		/**
		 * Modal image.
		 * @var {DOMElement}
		 */
		this.$modalImage = null;
		
		/**
		 * Modal next.
		 * @var {DOMElement}
		 */
		this.$modalNext = null;
		
		/**
		 * Modal previous.
		 * @var {DOMElement}
		 */
		this.$modalPrevious = null;
		
		/**
		 * Links.
		 * @var {nodeList}
		 */
		this.$links = null;
		
		/**
		 * Lock state.
		 * @var {bool}
		 */
		this.locked = false;
		
		/**
		 * Captions state.
		 * @var {bool}
		 */
		this.captions = null;
		
		/**
		 * Current index.
		 * @var {integer}
		 */
		this.current = null;
		
		/**
		 * Transition delay (must match CSS).
		 * @var {integer}
		 */
		this.delay = 375;
		
		/**
		 * Navigation state.
		 * @var {bool}
		 */
		this.navigation = null;
		
		/**
		 * Mobile state.
		 * @var {bool}
		 */
		this.mobile = null;
		
		/**
		 * Protect state.
		 * @var {bool}
		 */
		this.protect = null;
		
		/**
		 * Zoom interval ID.
		 * @var {integer}
		 */
		this.zoomIntervalId = null;
		
		// Init modal.
			this.initModal();
		
		};
		
		/**
		 * Initialize.
		 * @param {object} config Config.
		 */
		lightboxGallery.prototype.init = function(config) {
		
			var _this = this,
				$links = $$('#' + config.id + ' .thumbnail'),
				navigation = config.navigation,
				captions = config.captions,
				mobile = config.mobile,
				mobileNavigation = config.mobileNavigation,
				scheme = config.scheme,
				protect = ('protect' in config ? config.protect : false),
				i, j;
		
			// Determine if navigation needs to be disabled (despite what our config says).
				j = 0;
		
				// Step through items.
					for (i = 0; i < $links.length; i++) {
		
						// Not ignored? Increment count.
							if ($links[i].dataset.lightboxIgnore != '1')
								j++;
		
					}
		
				// Less than two allowed items? Disable navigation.
					if (j < 2)
						navigation = false;
		
			// Bind click events.
				for (i=0; i < $links.length; i++) {
		
					// Ignored? Skip.
						if ($links[i].dataset.lightboxIgnore == '1')
							continue;
		
					// Bind click event.
						(function(index) {
							$links[index].addEventListener('click', function(event) {
		
								// Prevent default.
									event.stopPropagation();
									event.preventDefault();
		
								// Show.
									_this.show(index, {
										$links: $links,
										navigation: navigation,
										captions: captions,
										mobile: mobile,
										mobileNavigation: mobileNavigation,
										scheme: scheme,
										protect: protect,
									});
		
							});
						})(i);
		
				}
		
		};
		
		/**
		 * Init modal.
		 */
		lightboxGallery.prototype.initModal = function() {
		
			var	_this = this,
				dragStart = null,
				dragEnd = null,
				$modal,
				$modalInner,
				$modalImage,
				$modalNext,
				$modalPrevious;
		
			// Build element.
				$modal = document.createElement('div');
					$modal.id = this.id + '-modal';
					$modal.tabIndex = -1;
					$modal.className = 'gallery-modal';
					$modal.innerHTML = '<div class="inner"><img src="" /></div><div class="caption"></div><div class="nav previous"></div><div class="nav next"></div><div class="close"></div>';
					$body.appendChild($modal);
		
				// Inner.
					$modalInner = $modal.querySelector('.inner');
		
				// Image.
					$modalImage = $modal.querySelector('img');
		
					// Load event.
						$modalImage.addEventListener('load', function() {
		
							// Set maximum dimensions of image element to match image's natural width/height.
								$modalImage.style.setProperty('--natural-width', $modalImage.naturalWidth + 'px');
								$modalImage.style.setProperty('--natural-height', $modalImage.naturalHeight + 'px');
		
							// Mark as done.
								$modal.classList.add('done');
		
							// Delay (wait for visible transition, if not switching).
								setTimeout(function() {
		
									// No longer visible? Bail.
										if (!$modal.classList.contains('visible'))
											return;
		
									// Set loaded.
										$modal.classList.add('loaded');
		
									// Clear switching after delay.
										setTimeout(function() {
											$modal.classList.remove('switching', 'from-left', 'from-right', 'done');
										}, _this.delay);
		
								}, ($modal.classList.contains('switching') ? 0 : _this.delay));
		
						});
		
					// Contextmenu event.
						$modalImage.addEventListener('contextmenu', function() {
		
							// Protected? Prevent default.
								if (_this.protect)
									event.preventDefault();
		
						}, true);
		
					// Dragstart event.
						$modalImage.addEventListener('dragstart', function() {
		
							// Protected? Prevent default.
								if (_this.protect)
									event.preventDefault();
		
						}, true);
		
				// Caption.
					$modalCaption = $modal.querySelector('.caption');
		
				// Navigation.
					$modalNext = $modal.querySelector('.next');
					$modalPrevious = $modal.querySelector('.previous');
		
			// Browser-specific workarounds.
				switch (client.browser) {
		
					case 'safari':
					case 'firefox':
		
						// Eliminate drop shadow on "inner" due to sizing issues.
							$modalInner.style.boxShadow = 'none';
		
						break;
		
					default:
						break;
		
				}
		
			// Methods.
				$modal.show = function(index, offset, direction) {
		
					var item,
						i, j, found;
		
					// Locked? Bail.
						if (_this.locked)
							return;
		
					// No index provided? Use current.
						if (typeof index != 'number')
							index = _this.current;
		
					// Offset provided? Find first allowed offset item.
						if (typeof offset == 'number') {
		
							found = false;
							j = 0;
		
							// Step through items using offset (up to item count).
								for (j = 0; j < _this.$links.length; j++) {
		
									// Increment index by offset.
										index += offset;
		
									// Less than zero? Jump to end.
										if (index < 0)
											index = _this.$links.length - 1;
		
									// Greater than length? Jump to beginning.
										else if (index >= _this.$links.length)
											index = 0;
		
									// Already there? Bail.
										if (index == _this.current)
											break;
		
									// Get item.
										item = _this.$links.item(index);
		
										if (!item)
											break;
		
									// Not ignored? Found!
										if (item.dataset.lightboxIgnore != '1') {
		
											found = true;
											break;
		
										}
		
								}
		
							// Couldn't find an allowed item? Bail.
								if (!found)
									return;
		
						}
		
					// Otherwise, see if requested item is allowed.
						else {
		
							// Check index.
		
								// Less than zero? Jump to end.
									if (index < 0)
										index = _this.$links.length - 1;
		
								// Greater than length? Jump to beginning.
									else if (index >= _this.$links.length)
										index = 0;
		
								// Already there? Bail.
									if (index == _this.current)
										return;
		
							// Get item.
								item = _this.$links.item(index);
		
								if (!item)
									return;
		
							// Ignored? Bail.
								if (item.dataset.lightboxIgnore == '1')
									return;
		
						}
		
					// Mobile? Set zoom handler interval.
						if (client.mobile)
							_this.zoomIntervalId = setInterval(function() {
								_this.zoomHandler();
							}, 250);
		
					// Lock.
						_this.locked = true;
		
					// Current?
						if (_this.current !== null) {
		
							// Clear loaded.
								$modal.classList.remove('loaded');
		
							// Set switching.
								$modal.classList.add('switching');
		
							// Apply direction modifier (if applicable).
								switch (direction) {
		
									case -1:
										$modal.classList.add('from-left');
										break;
		
									case 1:
										$modal.classList.add('from-right');
										break;
		
									default:
										break;
		
								}
		
							// Delay (wait for switching transition).
								setTimeout(function() {
		
									// Set current, src.
										_this.current = index;
										$modalImage.src = item.href;
		
									// Set caption (if applicable).
										if (_this.captions)
											$modalCaption.innerHTML = item.querySelector('[data-caption]').dataset.caption;
		
									// Delay.
										setTimeout(function() {
		
											// Focus.
												$modal.focus();
		
											// Unlock.
												_this.locked = false;
		
										}, _this.delay);
		
								}, _this.delay);
		
						}
		
					// Otherwise ...
						else {
		
							// Set current, src.
								_this.current = index;
								$modalImage.src = item.href;
		
							// Set caption (if applicable).
								if (_this.captions)
									$modalCaption.innerHTML = item.querySelector('[data-caption]').dataset.caption;
		
							// Set visible.
								$modal.classList.add('visible');
		
							// Delay.
								setTimeout(function() {
		
									// Focus.
										$modal.focus();
		
									// Unlock.
										_this.locked = false;
		
								}, _this.delay);
		
						}
		
				};
		
				$modal.hide = function() {
		
					// Locked? Bail.
						if (_this.locked)
							return;
		
					// Already hidden? Bail.
						if (!$modal.classList.contains('visible'))
							return;
		
					// Lock.
						_this.locked = true;
		
					// Clear visible, loaded, switching.
						$modal.classList.remove('visible');
						$modal.classList.remove('loaded');
						$modal.classList.remove('switching', 'from-left', 'from-right', 'done');
		
					// Clear zoom handler interval.
						clearInterval(_this.zoomIntervalId);
		
					// Delay (wait for visible transition).
						setTimeout(function() {
		
							// Clear src.
								$modalImage.src = '';
		
							// Unlock.
								_this.locked = false;
		
							// Focus.
								$body.focus();
		
							// Clear current.
								_this.current = null;
		
						}, _this.delay);
		
				};
		
				$modal.next = function(direction) {
					$modal.show(null, 1, direction);
				};
		
				$modal.previous = function(direction) {
					$modal.show(null, -1, direction);
				};
		
				$modal.first = function() {
					$modal.show(0);
				};
		
				$modal.last = function() {
					$modal.show(_this.$links.length - 1);
				};
		
			// Events.
				$modalInner.addEventListener('touchstart', function(event) {
		
					// Navigation disabled? Bail.
						if (!_this.navigation)
							return;
		
					// More than two touches? Bail.
						if (event.touches.length > 1)
							return;
		
					// Record drag start.
						dragStart = {
							x: event.touches[0].clientX,
							y: event.touches[0].clientY
						};
		
				});
		
				$modalInner.addEventListener('touchmove', function(event) {
		
					var dx, dy;
		
					// Navigation disabled? Bail.
						if (!_this.navigation)
							return;
		
					// No drag start, or more than two touches? Bail.
						if (!dragStart
						||	event.touches.length > 1)
							return;
		
					// Record drag end.
						dragEnd = {
							x: event.touches[0].clientX,
							y: event.touches[0].clientY
						};
		
					// Determine deltas.
						dx = dragStart.x - dragEnd.x;
						dy = dragStart.y - dragEnd.y;
		
					// Doesn't exceed threshold? Bail.
						if (Math.abs(dx) < 50)
							return;
		
					// Prevent default.
						event.preventDefault();
		
					// Positive value? Move to next.
						if (dx > 0)
							$modal.next(-1);
		
					// Negative value? Move to previous.
						else if (dx < 0)
							$modal.previous(1);
		
				});
		
				$modalInner.addEventListener('touchend', function(event) {
		
					// Navigation disabled? Bail.
						if (!_this.navigation)
							return;
		
					// Clear drag start, end.
						dragStart = null;
						dragEnd = null;
		
				});
		
				$modal.addEventListener('click', function(event) {
		
					// Click target was an anchor or spoiler text tag? Bail.
						if (event.target
						&&	(event.target.tagName == 'A' || event.target.tagName == 'SPOILER-TEXT'))
							return;
		
					// Hide modal.
						$modal.hide();
		
				});
		
				$modal.addEventListener('keydown', function(event) {
		
					// Not visible? Bail.
						if (!$modal.classList.contains('visible'))
							return;
		
					switch (event.keyCode) {
		
						// Right arrow, Space.
							case 39:
							case 32:
		
								if (!_this.navigation)
									break;
		
								event.preventDefault();
								event.stopPropagation();
		
								$modal.next();
		
								break;
		
						// Left arrow.
							case 37:
		
								if (!_this.navigation)
									break;
		
								event.preventDefault();
								event.stopPropagation();
		
								$modal.previous();
		
								break;
		
						// Home.
							case 36:
		
								if (!_this.navigation)
									break;
		
								event.preventDefault();
								event.stopPropagation();
		
								$modal.first();
		
								break;
		
						// End.
							case 35:
		
								if (!_this.navigation)
									break;
		
								event.preventDefault();
								event.stopPropagation();
		
								$modal.last();
		
								break;
		
						// Escape.
							case 27:
		
								event.preventDefault();
								event.stopPropagation();
		
								$modal.hide();
		
								break;
		
					}
		
				});
		
				$modalNext.addEventListener('click', function(event) {
					$modal.next();
				});
		
				$modalPrevious.addEventListener('click', function(event) {
					$modal.previous();
				});
		
			// Set.
				this.$modal = $modal;
				this.$modalImage = $modalImage;
				this.$modalCaption = $modalCaption;
				this.$modalNext = $modalNext;
				this.$modalPrevious = $modalPrevious;
		
		};
		
		/**
		 * Show.
		 * @param {string} href Image href.
		 */
		lightboxGallery.prototype.show = function(href, config) {
		
			// Update config.
				this.$links = config.$links;
				this.navigation = config.navigation;
				this.captions = config.captions;
				this.mobile = config.mobile;
				this.mobileNavigation = config.mobileNavigation;
				this.scheme = config.scheme;
				this.protect = config.protect;
		
			// Scheme.
		
				// Remove any existing classes.
					this.$modal.classList.remove('light', 'dark');
		
				// Determine scheme.
					switch (this.scheme) {
		
						case 'light':
							this.$modal.classList.add('light');
							break;
		
						case 'dark':
							this.$modal.classList.add('dark');
							break;
		
						case 'auto':
		
							// Prefers light scheme? Apply light class.
								if (window.matchMedia('(prefers-color-scheme: light)').matches)
									this.$modal.classList.add('light');
		
							// Otherwise, default to dark.
								else
									this.$modal.classList.add('dark');
		
							break;
		
					}
		
			// Navigation.
				if (this.navigation) {
		
					this.$modalNext.style.display = '';
					this.$modalPrevious.style.display = '';
		
					// Mobile navigation.
						if (client.mobile
						&&	!this.mobileNavigation) {
		
							this.$modalNext.style.display = 'none';
							this.$modalPrevious.style.display = 'none';
		
						}
		
				}
				else {
		
					this.$modalNext.style.display = 'none';
					this.$modalPrevious.style.display = 'none';
		
				}
		
			// Captions.
				if (this.captions)
					this.$modalCaption.style.display = '';
				else
					this.$modalCaption.style.display = 'none';
		
			// Protect.
				if (this.protect) {
		
					this.$modalImage.style.WebkitTouchCallout = 'none';
					this.$modalImage.style.userSelect = 'none';
		
				}
				else {
		
					this.$modalImage.style.WebkitTouchCallout = '';
					this.$modalImage.style.userSelect = '';
		
				}
		
			// Mobile.
				if (client.mobile && !this.mobile)
					return;
		
			// Show modal.
				this.$modal.show(href);
		
		};
		
		/**
		 * Zoom handler.
		 */
		lightboxGallery.prototype.zoomHandler = function() {
		
			var threshold = window.matchMedia('(orientation: portrait)').matches ? 50 : 100;
		
			// Zoomed in? Set zooming.
				if (window.outerWidth > window.innerWidth + threshold)
					this.$modal.classList.add('zooming');
		
			// Otherwise, clear zooming.
				else
					this.$modal.classList.remove('zooming');
		
		};
		
		var _lightboxGallery = new lightboxGallery;
	
	// Gallery: gallery02.
		_lightboxGallery.init({
			id: 'gallery02',
			navigation: true,
			captions: false,
			mobile: true,
			mobileNavigation: true,
			scheme: 'auto',
			protect: true,
		});
	
	// Gallery: gallery-old-websites.
		_lightboxGallery.init({
			id: 'gallery-old-websites',
			navigation: true,
			captions: true,
			mobile: true,
			mobileNavigation: true,
			scheme: 'auto',
			protect: true,
		});
	
	// Initialize scroll tracking.
		scrollTracking.add('.container.style3');
	
	// Initialize "On Visible" animations.
		onvisible.add('.image.style1', { style: 'zoom-out-image', speed: 1000, intensity: 0, threshold: 4, delay: 0, replay: false });
		onvisible.add('#image05', { style: 'zoom-out', speed: 1000, intensity: 10, threshold: 4, delay: 0, replay: true });
		onvisible.add('#form01', { style: 'fade-up', speed: 1000, intensity: 2, threshold: 4, delay: 0, replay: false });
		onvisible.add('.gallery.style3', { style: 'blur-in', speed: 750, intensity: 1, threshold: 3, delay: 0, stagger: 125, staggerSelector: ':scope ul > li', replay: false });
		onvisible.add('h1.style1, h2.style1, h3.style1, p.style1', { style: 'fade-in', speed: 1000, intensity: 1, threshold: 4, delay: 0, stagger: 125, staggerSelector: ':scope > *', replay: false });
		onvisible.add('h1.style5, h2.style5, h3.style5, p.style5', { style: 'fade-in', speed: 875, intensity: 5, threshold: 4, delay: 0, replay: false });
		onvisible.add('.gallery.style2', { style: 'blur-in', speed: 750, intensity: 1, threshold: 3, delay: 0, stagger: 125, staggerSelector: ':scope ul > li', replay: false });
		onvisible.add('.buttons.style4', { style: 'fade-up', speed: 1000, intensity: 2, threshold: 4, delay: 0, replay: false });
		onvisible.add('h1.style9, h2.style9, h3.style9, p.style9', { style: 'fade-in', speed: 1000, intensity: 1, threshold: 4, delay: 0, stagger: 125, staggerSelector: ':scope > *', replay: false });
		onvisible.add('h1.style7, h2.style7, h3.style7, p.style7', { style: 'fade-in', speed: 875, intensity: 5, threshold: 4, delay: 0, replay: false });
		onvisible.add('.buttons.style2', { style: 'fade-up', speed: 1000, intensity: 2, threshold: 4, delay: 0, replay: false });
		onvisible.add('.container.style3', { style: 'fade-in', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false });
		onvisible.add('.icons.style1', { style: 'fade-in', speed: 1000, intensity: 0, threshold: 4, delay: 0, stagger: 125, staggerSelector: ':scope > li', replay: false });
		onvisible.add('h1.style4, h2.style4, h3.style4, p.style4', { style: 'fade-in', speed: 1000, intensity: 5, threshold: 4, delay: 0, replay: false });
		onvisible.add('h1.style6, h2.style6, h3.style6, p.style6', { style: 'fade-in', speed: 1000, intensity: 1, threshold: 4, delay: 0, replay: false });
		onvisible.add('.buttons.style5', { style: 'fade-up', speed: 1000, intensity: 2, threshold: 4, delay: 0, replay: false });
	
	// Run ready handlers.
		ready.run();

})();