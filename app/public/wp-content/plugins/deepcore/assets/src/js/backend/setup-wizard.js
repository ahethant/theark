'use strict';

(function ($) {
	$(document).ready(function () {

		var slug,
			$importer_settings,
			$menu = $('.wsw-menu'),
			$wnSetupWizard = $('#wnSetupWizard');

		// Steps navigation
		$('.wsw-btn-step').find('.wsw-btn').on('click', function (e) {
			e.preventDefault();

			var $this = $(this),
				step = $this.data('step'),
				step_type = $this.data('step-type');

			if (step < 1 || step > 5) {
				return;
			}

			$('.wsw-btn-step').find('.wsw-btn').show();

			if (step == 1 && step_type == 'back' || step == 2 && step_type == 'next') {
				var url = location.href;
				if (url.includes('step')) {
					url = url.slice(0, -1);
					url += step;
				} else {
					url += '&step=' + step;
				}
				location.href = url;
			} else {
				if (typeof slug === 'undefined') {
					alert('Please select a demo');
					return;
				}

				$wnSetupWizard.attr('class', 'wn-setup-wizard wn-sw-step' + step);

				if (step_type == 'next') {
					$this.data('step', step + 1).attr('data-step', step + 1);
					$this.siblings('.wsw-btn').data('step', step - 1).attr('data-step', step - 1);
				} else {
					$this.data('step', step -1).attr('data-step', step - 1);
					$this.siblings('.wsw-btn').data('step', step + 1).attr('data-step', step + 1);
				}

				$importer_settings = $('.wn-lightbox-wrap[slug="' + slug + '"]');

				$('.wn-lightbox-wrap').hide();
				$('.wsw-importer-demo').hide();

				$importer_settings.show();
				$importer_settings.find('.wn-suc-imp-title').hide();
				$importer_settings.find('.wn-suc-imp-content-wrap').hide();

				if (step == 2) {
					$importer_settings.hide();
					$('.wsw-importer-demo').show();
				} else if (step == 3) {
					$importer_settings.find('.wni-settings').find('.wnl-row').hide().end().find('.wnl-row:nth-child(1)').show();
				} else if (step == 4) {
					$importer_settings.find('.wni-settings').find('.wnl-row').hide().end().find('.wnl-row:nth-child(2)').show();
				} else if (step == 5) {
					$importer_settings.find('.wni-settings').find('.wnl-row').hide().end().find('.wnl-row:nth-child(3)').show().end().find('.wnl-row:nth-child(4)').show();
				}
				// next step
				if (step_type == 'next') {
					step++;
					$menu.find('li.active:last').next().addClass('active');
					if (step == 6) {
						$this.hide();
					}
				} else {
					step++;
					$menu.find('li.active:last').removeClass('active');
				}
			}
		});

		// Page Builder
		$('.wn-pagebuilder-wrap').find('label').on('click', function (e) {
			e.preventDefault();

			var item = $(this),
				head = $('head'),
				pgStyle = $('#deep-demo-pg-wizard'),
				$radio_input = item.find('input'),
				$radio_indicator = item.find('.wn-radio-indicator');

			item.closest('.wn-pagebuilder-wrap')
				.find('.wn-radio-control').removeClass('checked').end()
				.find('input').removeAttr('checked').end()
				.find('.wn-radio-indicator').removeClass('checked');

			item.addClass('checked');
			$radio_input.attr('checked', 'checked');
			$radio_indicator.addClass('checked');

			if (item.hasClass('elementor-builder')) {
				pgStyle.remove();
				head.append('<style id="deep-demo-pg-wizard">.wn-plugin[data-plugin-name="Elementor"]{display: block}.wn-plugin[data-plugin-name="WPBakery Page Builder"]{display:none}</style>');
			} else {
				pgStyle.remove();
				head.append('<style id="deep-demo-pg-wizard">.wn-plugin[data-plugin-name="WPBakery Page Builder"]{display: block}.wn-plugin[data-plugin-name="Elementor"]{display:none}</style>');
			}

		});

		$('.wsw-importer-demo').on('click', function() {
			$('#deep-demo-pg-wizard').remove();
			$('.wn-radio-indicator').removeClass('checked');
			$('.wn-radio-control').removeClass('checked');
			$('#visualcomposer').attr('checked', false);
		});

		$('#wnThemeActivate').on('submit', function (e) {
			e.preventDefault();

			var $this = $(this),
				$purchaseCodeInput = $('#wnPurchaseCode'),
				purchaseCodeVal = $purchaseCodeInput.val();

			// Preloader
			$this.prepend('<div class="wna-spinner-wrap"><div class="wna-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');

			$.ajax({
				type: 'POST',
				url: ajaxObject.ajaxUrl,
				data: {
					action: 'wnThemeActivate',
					nonce: ajaxObject.colornonce,
					purchaseCodeVal: purchaseCodeVal
				},
				success: function (response) {
					if (response == 'activate') {
						$this.removeClass('failed');
						$this.addClass('success');
						$('#wnFailedMesaage').html('');
						var url = location.href;
						if (url.includes('step')) {
							url = url.slice(0, -1);
							url += '2';
						} else {
							url += '&step=2';
						}
						location.href = url;
					} else {
						$this.removeClass('success');
						$this.addClass('failed');
						$('#wnFailedMesaage').html(response);
					}
					$this.find('.wna-spinner-wrap').remove();
				}
			});
		});

		// Import demo
		$('.wsw-importer-demo').on('click', function (e) {
			slug = $(this).attr('slug');
			$('.wsw-importer-demo').removeClass('selected').find('input[type=checkbox]').prop('checked', false);
			$(this).addClass('selected').find('input[type=checkbox]').prop('checked', true);
			return true;
		});
	});
})(jQuery);
