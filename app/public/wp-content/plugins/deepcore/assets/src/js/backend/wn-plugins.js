'use strict';

( function( $ ) {
	$( document ).ready( function() {

		var $plugins = $( '.wn-plugins' ),
			$btn	 = $( '.wn-admin-btn' );

		// install action
		$(document).on( 'click', '.wn-admin-btn[data-plugin-action="install"]', function( e ) {

			e.preventDefault();

			if ( $( '.wn-admin-btn' ).hasClass( 'installing' ) ) {
				return;
			}

			var $this	= $( this ),
				q_href	= $this.attr( 'href' ).split( '&' ),
				data	= {
					'action': 'deep_install_plugin',
					'plugin': q_href[1].substr( q_href[1].lastIndexOf( '=' ) + 1, q_href[1].length ),
					'tgmpa-install': 'install-plugin',
					'tgmpa-nonce': q_href[3].substr( q_href[3].lastIndexOf( '=' ) + 1, q_href[3].length ),
					'page': 'install-required-plugins'
				};

			$this.addClass( 'installing' );

			$btn.css( 'opacity', '0.5' );
			$this.css( 'opacity', '1' );

			$.ajax({
				type: 'GET',
				url: ajaxurl,
				data: data
			}).done(function (response) {
				if ($this.closest('.wsw-install-deep-plus').length) {
					var url = location.href;
					if (url.includes('step')) {
						// Remove current step from url, Add next step from url
						url = url.slice(0, -1);
						url += 2;
					} else {
						url += '&step=2';
					}
					location.href = url;
				}

				$btn.css('opacity', '1');
				if ($this.closest('.wn-plugin').length) {
					$this.closest('.row-actions').replaceWith('<div class="row-actions visible active"><span class="activate"><a href="#" class="button wn-admin-btn">Activated</a></span></div>');
				} else {
					$this.removeClass('installing').attr('data-plugin-action', 'deactivate').attr('href', response.substr(response.lastIndexOf('webnusi') + 6, response.length)).text('Deactivate').closest('.theme').addClass('active');
				}
			}).fail(function () {
				alert('Something went wrong! Reload page and try again.')
			});

		});

		// update action
		$plugins.on('click', '.wn-admin-btn[data-plugin-action="update"]', function (e) {
			e.preventDefault();

			if ($('.wn-admin-btn').hasClass('installing')) {
				return;
			}

			var $this = $(this),
				q_href = $this.attr('href').split('&'),
				data = {
					'action': 'deep_update_plugin',
					'plugin': q_href[1].substr(q_href[1].lastIndexOf('=') + 1, q_href[1].length),
					'tgmpa-update': 'update-plugin',
					'tgmpa-nonce': q_href[3].substr(q_href[3].lastIndexOf('=') + 1, q_href[3].length),
					'page': 'install-required-plugins'
				};

			$this.addClass('installing');

			$btn.css('opacity', '0.5');
			$this.css('opacity', '1');

			$.ajax({
				type: 'GET',
				url: ajaxurl,
				data: data
			}).done(function (response) {
				if ($this.closest('.wsw-install-deep-plus').length) {
					var url = location.href;
					if (url.includes('step')) {
						// Remove current step from url, Add next step from url
						url = url.slice(0, -1);
						url += 2;
					} else {
						url += '&step=2';
					}
					location.href = url;
				}

				$btn.css('opacity', '1');
				$this.closest('.row-actions').find('.update').remove();
				if ($this.closest('.wn-plugin').length) {
					$this.closest('.row-actions').replaceWith('<div class="row-actions visible active"><span class="activate"><a href="#" class="button wn-admin-btn">Activated</a></span></div>');
				} else {
					$this.removeClass('installing').attr('data-plugin-action', 'deactivate').attr('href', response.substr(response.lastIndexOf('webnusi') + 6, response.length)).text('Deactivate').closest('.theme').addClass('active');
				}
			}).fail(function () {
				alert('Something went wrong! Reload page and try again.')
			});
		});

		// activate action
		$(document).on( 'click', '.wn-admin-btn[data-plugin-action="activate"]', function( e ) {

			e.preventDefault();

			if ( $( '.wn-admin-btn' ).hasClass( 'installing' ) ) {
				return;
			}

			var $this	= $( this ),
				q_href	= $this.attr( 'href' ).split( '&' ),
				data	= {
					'action': 'deep_activate_plugin',
					'plugin': q_href[1].substr( q_href[1].lastIndexOf( '=' ) + 1, q_href[1].length ),
					'tgmpa-activate': 'activate-plugin',
					'tgmpa-nonce': q_href[3].substr( q_href[3].lastIndexOf( '=' ) + 1, q_href[3].length ),
				};

			$this.addClass( 'installing' );

			$btn.css( 'opacity', '0.5' );
			$this.css( 'opacity', '1' );

			$.ajax({
				type: 'GET',
				url: ajaxurl,
				data: data,
				success: function( response ) {
					if ($this.closest('.wsw-install-deep-plus').length) {
						var url = location.href;
						if (url.includes('step')) {
							// Remove current step from url, Add next step from url
							url = url.slice(0, -1);
							url += 2;
						} else {
							url += '&step=2';
						}
						location.href = url;
					}

					$btn.css( 'opacity', '1' );
					if ( $this.closest( '.wn-plugin' ).length ) {
						$this.closest( '.row-actions' ).replaceWith( '<div class="row-actions visible active"><span class="activate"><a href="#" class="button wn-admin-btn">Activated</a></span></div>' );
					} else {
						$this.removeClass( 'installing' ).attr( 'data-plugin-action', 'deactivate' ).attr( 'href', response ).text( 'Deactivate' ).closest( '.theme' ).addClass( 'active' );
					}
				}
			});

		});

		// deactivate action
		$plugins.on( 'click', '.wn-admin-btn[data-plugin-action="deactivate"]', function( e ) {

			e.preventDefault();

			if ( $( '.wn-admin-btn' ).hasClass( 'installing' ) ) {
				return;
			}

			var $this	= $( this ),
				q_href	= $this.attr( 'href' ).split( '&' ),
				data	= {
					'action': 'deep_deactivate_plugin',
					'plugin': q_href[1].substr( q_href[1].lastIndexOf( '=' ) + 1, q_href[1].length ),
					'tgmpa-deactivate': 'deactivate-plugin',
					'tgmpa-nonce': q_href[3].substr( q_href[3].lastIndexOf( '=' ) + 1, q_href[3].length ),
				};

			$this.addClass( 'installing' );

			$btn.css( 'opacity', '0.5' );
			$this.css( 'opacity', '1' );

			$.ajax({
				type: 'GET',
				url: ajaxurl,
				data: data,
				success: function( response ) {
					$btn.css( 'opacity', '1' );
					$this.removeClass( 'installing' ).attr( 'data-plugin-action', 'activate' ).attr( 'href', response ).text( 'Activate' ).closest( '.theme' ).removeClass( 'active' );
				}
			});

		});

		$(document).on('click', '.whi-install-plugins', function (e) {
			e.preventDefault();

			var $installPluginsBtn = $(this);
			var $allPlugins = $installPluginsBtn.parent().next('.wn-plugins');
			var plugins = [];

			$allPlugins.find('.wn-plugin:not(:hidden)').each(function (index, element) {
				var $this = $(this);
				var $pluginActionBtn = $this.find('.wn-admin-btn');
				var q_href = $pluginActionBtn.attr('href');
				var pluginAction = $pluginActionBtn.data('plugin-action');

				if (q_href != undefined && q_href != '#') {
					plugins.push({
						elem: $pluginActionBtn[0],
						href: q_href,
						pluginAction: pluginAction
					});
				}
			});

			if (plugins.length) {
				wiInstallPlugins(plugins, $installPluginsBtn);
			} else {
				$installPluginsBtn.css({
					'pointer-events': 'none'
				});
			}
		});

		function wiInstallPlugins(plugins, $installPluginsBtn) {
			if (!plugins.length) {
				$installPluginsBtn.css({
					'pointer-events': 'none'
				});
				return;
			}

			if ($('.wn-admin-btn').hasClass('installing')) {
				return;
			}

			var $this = $(plugins[0]['elem']);
			var pluginAction = plugins[0]['pluginAction'];
			var q_href = $this.attr('href').split('&');
			var data;

			if (pluginAction == 'install') {
				data = {
					'action': 'deep_install_plugin',
					'plugin': q_href[1].substr(q_href[1].lastIndexOf('=') + 1, q_href[1].length),
					'tgmpa-install': 'install-plugin',
					'tgmpa-nonce': q_href[3].substr(q_href[3].lastIndexOf('=') + 1, q_href[3].length),
					'page': 'install-required-plugins'
				};
			} else if (pluginAction == 'activate') {
				data = {
					'action': 'deep_activate_plugin',
					'plugin': q_href[1].substr(q_href[1].lastIndexOf('=') + 1, q_href[1].length),
					'tgmpa-activate': 'activate-plugin',
					'tgmpa-nonce': q_href[3].substr(q_href[3].lastIndexOf('=') + 1, q_href[3].length),
				};
			} else if (pluginAction == 'update') {
				data = {
					'action': 'deep_update_plugin',
					'plugin': q_href[1].substr(q_href[1].lastIndexOf('=') + 1, q_href[1].length),
					'tgmpa-update': 'update-plugin',
					'tgmpa-nonce': q_href[3].substr(q_href[3].lastIndexOf('=') + 1, q_href[3].length),
					'page': 'install-required-plugins'
				};
			} else {
				plugins.shift();
				wiInstallPlugins(plugins, $installPluginsBtn);
			}

			$this.addClass('installing');

			$btn.css('opacity', '0.5');
			$this.css('opacity', '1');

			$.ajax({
				type: 'GET',
				url: ajaxurl,
				data: data
			}).done(function (response) {
				$btn.css('opacity', '1');
				if ($this.closest('.wn-plugin').length) {
					$this.closest('.row-actions').replaceWith('<div class="row-actions visible active"><span class="activate"><a href="#" class="button wn-admin-btn">Activated</a></span></div>');
				} else {
					$this.removeClass('installing').attr('data-plugin-action', 'deactivate').attr('href', response.substr(response.lastIndexOf('webnusi') + 6, response.length)).text('Deactivate').closest('.theme').addClass('active');
				}
				plugins.shift();
				wiInstallPlugins(plugins, $installPluginsBtn);
			}).fail(function () {
				alert('Something went wrong! Reload page and try again.')
			});
		}
	});
})( jQuery );
