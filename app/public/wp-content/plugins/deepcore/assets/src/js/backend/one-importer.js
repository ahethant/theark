'use strict';

(function ($) {
    $.redux = $.redux || {};

	$.redux.one_importer = function () {
        /**
		 * Open Lightbox (Import Button)
		 *
		 * @author	WEBNUS
		 * @version	4.2.8
		 * @event	click
		 */
		$(document).on('click', '.wrap-importer.theme.not-imported .importer-button', function (e) {
			e.preventDefault();
			var item = $(this),
				$lightbox_wrap = $('.wn-lightbox-wrap'),
				$importer_wrap = item.closest('.wrap-importer'),
				slug = $importer_wrap.attr('slug'),
				$serverConfigAlert = $('#wni-bad-status-message'),
				$currentLightBox = $('.wn-lightbox[slug="' + slug + '"]'),
				$purchaseCodeAlert = $('#wnInvalidPurchaseCode'),
				$lightBoxWrap = $currentLightBox.closest('.wn-lightbox-wrap');

			if ($purchaseCodeAlert.length > 0) {
				var $purchaseCodeAlertClone = $purchaseCodeAlert.clone().show();
				$purchaseCodeAlert.remove();
				$lightbox_wrap.find('.wn-lightbox[slug="' + slug + '"]').children('h2').after($purchaseCodeAlertClone);
			} else if ($serverConfigAlert.length > 0) {
				var $serverConfigAlertClone = $serverConfigAlert.clone().show();
				$serverConfigAlert.remove();
				$lightbox_wrap.find('.wn-lightbox[slug="' + slug + '"]').children('h2').after($serverConfigAlertClone);
			}

			$lightbox_wrap.find('.wn-lightbox[slug="' + slug + '"]').find('.wni-settings').niceScroll({
				scrollbarid: 'wn-lb-content',
				cursorwidth: "10px",
				cursorborder: "0",
				touchbehavior: true,
				autohidemode: false,
				background: "#e7e7e7",
				cursorcolor: "#91989e",
			});

			$lightbox_wrap.find('.wn-lightbox[slug="' + slug + '"]').show().closest('.wn-lightbox-wrap').show();

			$($currentLightBox).find('.wn-import-demo-btn').on('click', function(e) {
				e.preventDefault();
				item = $(this);
				var message = 'By importing the demo content, items such as pages, posts, images, sliders, theme options, widgets and other configurations will be imported. it will take several minutes.';
				var r = confirm(message);
				if (r == false) return;

				$('.wbc-progress-back').show();
				$('.wn-lightbox-wrap').find('i.ti-close').hide();

				item.text('Demo Is Importing');
				$currentLightBox.find('#w-importing').text('Please do not refresh the page until import is complete. The time it takes to import depends on your host configuration and it may take up to 15 minutes, so please be patient.');

				var contents = [];
				$($currentLightBox).find('.wn-checkbox-wrap').each(function(){
					var item = $(this),
						input = item.children('input');

					if (input.attr('checked') == 'checked') {
						contents.push(input.val());
					}
				});

				var data = {
					action: "importing_demo_content",
					nonce: OneImporter.nonce,
					pagebuilder: $('.deep-demo-pg-list').children('li.active').find('span.pg-name').html(),
					demo: $currentLightBox.find('input#demo').val(),
					contents: contents
				};

				$.ajax({
					type: "POST",
					url:  OneImporter.ajax_url,
					data: data,
					success: function( response ) {
						console.log(response);
					},
					error: function( err ){
						console.log(err);
					}
				}).done(function() {
					setTimeout(function(){
						$('.wn-lb-content.wni-settings').hide();
						$lightbox_wrap.find('.wn-lightbox[slug="' + slug + '"]').find('.wn-suc-imp-content-wrap').show();
						$importer_wrap.find('.importer-button:not(#wbc-importer-reimport)').removeClass('button-primary').addClass('button').text('Imported').show();
						$importer_wrap.find('.importer-button').attr('style', '');
						$importer_wrap.addClass('imported active').removeClass('not-imported');
						$importer_wrap.find('#wbc-importer-reimport').hide();
						$lightBoxWrap.find('i.ti-close').show();
						wiSuccessImportMessage(slug);
						resetProgress();
					}, 3000);
				});
				setTimeout(fetchdata,1000);

			});

		});

		/**
		 * Demo Import Setup Wizard
		 *
		 * @author	WEBNUS
		 * @version	4.2.8
		 * @event	click
		 */
		$('.wn-setup-wizard').find('.wn-import-demo-btn').on('click', function(e) {
			e.preventDefault();

			var	message = 'By importing the demo content, items such as pages, posts, images, sliders, theme options, widgets and other configurations will be imported. it will take several minutes.';

			var r = confirm(message);
			if (r == false) return;

			var	importerWrap = $(this).closest('.wn-lightbox'),
				slug = importerWrap.attr('slug'),
				pagebuilder = importerWrap.find('.wn-radio-control.checked').children('input').val();

				pagebuilder = ((pagebuilder)) ? pagebuilder : 'Elementor';

			$('.wsw-btn-step').hide();

			wiImport(slug);

			var contents = [];
			$(importerWrap).find('.wn-checkbox-wrap').each(function(){
				var item = $(this),
					input = item.children('input');

				if (input.attr('checked') == 'checked') {
					contents.push(input.val());
				}
			});

			var data = {
				action: "importing_demo_content",
				nonce: OneImporter.nonce,
				pagebuilder: pagebuilder,
				demo: slug,
				contents: contents
			};

			$.ajax({
				type: "POST",
				url:  OneImporter.ajax_url,
				data: data,
				success: function( response ) {
					console.log(response);
				},
				error: function( err ){
					console.log(err);
				}
			}).done(function() {
				setTimeout(function(){
					$('.loader').hide();
					$('.wn-lb-content.wni-settings').hide();
					$('.wn-lightbox-wrap').find('.wn-lightbox-wrap[slug="' + slug + '"]').find('.wn-suc-imp-content-wrap').show();

					$('.wn-lightbox-wrap').find('.importer-button:not(#wbc-importer-reimport)').removeClass('button-primary').addClass('button').text('Imported').show();
					$('.wn-lightbox-wrap').find('.importer-button').attr('style', '');
					$('.wn-lightbox-wrap').addClass('imported active').removeClass('not-imported');

					$('.wn-lightbox-wrap').find('#wbc-importer-reimport').hide();
					wiSuccessImportMessage(slug);
					resetProgress();
				}, 3000);
			});
			setTimeout(fetchdata,1000);

		});

		function fetchdata(){
			$.ajax({
				url: ProgressData.ajax_url,
				type: 'post',
				success: function(data){
					$('.wbc-progress-bar').attr('style', 'width:'+data+'%');
					$('.wbc-progress-count').text(data+'%');
				},
				error: function(data) {
					console.log(data);
				},
				complete:function(data){
					setTimeout(fetchdata,1000);
				}
			});
		}

		function resetProgress() {
			var data = {
				action: "reset_progress",
				nonce: OneImporter.nonce,
			};

			$.ajax({
				url:  OneImporter.ajax_url,
				type: 'post',
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data) {
					console.log(data);
				}
			});
		}

		function wiSuccessImportMessage(slug) {
			var $currentLightBox = $('.wn-lightbox[slug="' + slug + '"]');
			$currentLightBox.children('h2').hide();
			$currentLightBox.find('.wni-start').hide();
			$currentLightBox.children('.wn-suc-imp-title').fadeIn();
			$currentLightBox.find('.wn-suc-imp-t100').fadeIn();
			$currentLightBox.find('.wn-suc-imp-links').fadeIn();

			$('.wsw-menu').find('li.active:last').next().addClass('active');
			$('.wsw-btn-step').hide();
		}

		$(document).on('click', '.import-risk-btn', function (e) {
			e.preventDefault();
			$('#wni-bad-status-message').fadeOut();
        });

        /**
		 * Close Lightbox
		 *
		 * @author	WEBNUS
		 * @version	4.2.8
		 * @event	click
		 */
		$(document).on('click', '.wn-lightbox-wrap i.ti-close', function () {
			$('.wn-lightbox-wrap').hide();
			$('.wn-checkbox-label').removeClass('checked');
			$('.wn-import-content-wrap').find('input.wn-checkbox-input').attr('checked', false);
        });

		/**
		 * Choose Contents
		 *
		 * @author	WEBNUS
		 * @version	4.2.8
		 * @event	click
		 */
		 $(document).on('click', '.wn-checkbox-label', function () {
			var lable = $(this),
				input = lable.next(),
				allContents = $('.all-contents');

			if (input.val() == 'all') {
				if (lable.hasClass('checked-a')) {
					lable.removeClass('checked-a');
					$('.wn-checkbox-label').removeClass('checked');
					$('.wn-import-content-wrap').find('input.wn-checkbox-input').attr('checked', false);
				} else {
					lable.addClass('checked-a');
					$('.wn-checkbox-label').addClass('checked');
					$('.wn-import-content-wrap').find('input.wn-checkbox-input').attr('checked', true);
				}
			} else {
				if (lable.hasClass('checked')) {
					input.attr('checked', false);
					lable.removeClass('checked');
					allContents.removeClass('checked');
					allContents.attr('checked', false);
				} else {
					input.attr('checked', true);
					lable.addClass('checked');
				}
			}
		});

		function wiImport(slug) {
			var $currentLightBox = $('.wn-lightbox[slug="' + slug + '"]');
			var $lightBoxWrap = $currentLightBox.closest('.wn-lightbox-wrap');
			var $importerSettings = $currentLightBox.find('.wni-settings');
			var $importerStartWrap = $currentLightBox.find('.wn-suc-imp-content-wrap');
			var $importerStartProcess = $currentLightBox.find('.wni-start');
			var $niceScroll = $lightBoxWrap.find('.nicescroll-rails');

			$lightBoxWrap.find('i.ti-close').hide();
			$importerSettings.hide();
			$niceScroll.hide();
			$importerStartWrap.fadeIn();

			$importerStartWrap.find('.wn-suc-imp-t100').hide().end().find('.wn-suc-imp-links').hide();
		}

		// Deep demo category list
		const catListDisplay = $('.demo-show-cat'),
			catList = $('.demo-cat-list'),
			demoLoop = $('.deep-demo-loop'),
			pgMenuDisplay = $('.deep-demo-pg-menu'),
			demoFilter = $('.deep-demo-filter'),
			pgMenu = $('.deep-demo-pg-list'),
			searchInput = $('#deep-demo-search-form');

		// Deep demo filter AJAX
		function DeepDemoFilterAjax() {
			var head = $('head'),
				pgStyle = $('#deep-demo-pg-style'),
				type = demoFilter.find('li.active').children('a').html(),
				category = catList.find('li.active').children('a').html(),
				pageBuilder = pgMenu.children('li.active').find('span.pg-name').html();

			if (type == 'Free') {
				pgMenu.children('li').last().hide();
			} else {
				pgMenu.children('li').last().show();
			}

			if (pageBuilder == 'Elementor') {
				pgStyle.remove();
				head.append('<style id="deep-demo-pg-style">.wn-plugin[data-plugin-name="Elementor"]{display: block}.wn-plugin[data-plugin-name="WPBakery Page Builder"]{display:none}</style>');
			} else if (pageBuilder == 'WPBakery') {
				pgStyle.remove();
				head.append('<style id="deep-demo-pg-style">.wn-plugin[data-plugin-name="WPBakery Page Builder"]{display: block}.wn-plugin[data-plugin-name="Elementor"]{display:none}</style>');
			}

			var data = {
				action: "deep_demo_listings",
				nonce: OneImporter.nonce,
				pageBuilder: pageBuilder,
				type: type,
				category: category,
			};

			$.ajax({
				type: "POST",
				url:  OneImporter.ajax_url,
				data: data,
				success: function(response) {
					demoLoop.html(response);
				},
				error: function(err){
					console.log(err);
				}
			});
		}

		catListDisplay.on('click', function(e){
			e.preventDefault();
			if (catList.hasClass('active')) {
				catList.removeClass('active');
			} else {
				catList.addClass('active');
			}
		});

		catList.children('li').each(function(){
			var item = $(this);

			item.on('click', function(e){
				e.preventDefault();

				var category = item.children('a').html();

				item.addClass('active')
					.siblings().removeClass('active');

				catList.removeClass('active');
				catListDisplay.html(category);

				DeepDemoFilterAjax();
			});
		});

		// Deep demo page builder list
		pgMenuDisplay.on( 'click', function(){
			if (pgMenu.hasClass('active')) {
				pgMenu.removeClass('active');
			} else {
				pgMenu.addClass('active');
			}
		});

		// Deep demo page builder selcet
		pgMenu.children('li').each(function() {
			var item = $(this),
				upSrc, upName,
				pgMenuName = $('.pg-menu-name'),
				pgMenuSrc = $('.pg-menu-src'),
				builder = $('#select-builder');

			item.on('click', function(){
				item.addClass('active')
					.siblings().removeClass('active');

				upSrc = item.children('span.pg-src').html();
				upName = item.children('span.pg-name').html();
				pgMenuSrc.html(upSrc);
				pgMenuName.html(upName);
				builder.val(upName);
				pgMenu.removeClass('active');

				DeepDemoFilterAjax();
			});
		});

		// Deep demo filter
		demoFilter.children('li').each(function(){
			var item = $(this);

			item.on('click', function(e) {
				e.preventDefault();

				item.addClass('active')
					.siblings().removeClass('active');

				DeepDemoFilterAjax();
			});
		});

		// Deep demo search
		searchInput.on('keyup', function(){
			var val = $(this).val(),
				head = $('head'),
				searchStyle = $('#deep-demo-search');

			searchStyle.remove();

			if (val) {
				head.append('<style id="deep-demo-search">.wrap-importer{display: none}.wrap-importer[slug*="'+ val +'"] { display: block; }</style>');
			}
		});
	};

	$(document).ready(function () {
		$.redux.one_importer();
	});
})(jQuery);
