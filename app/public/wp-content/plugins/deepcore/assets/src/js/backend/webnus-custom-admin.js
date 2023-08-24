'use strict';

(function ($) {
	$(document).ready(function () {
		(function () {
			var wnVcCopyShortcodes = [];
			var parentID;
			// copy
			$(document).on('mouseenter', '.wpb_vc_section .controls_row, .wpb_vc_row .controls_row', function () {
				var $controls = $(this).children('div');
				if ($controls.find('.wn-vc-copy').length == 0) {
					$controls.append('<a href="#" class="vc_control wn-vc-copy" data-wntooltip="Copy to Clipboard"><i class="ti-files"></i></a>');
					$controls.find('.wn-vc-copy').hide().fadeIn('30');
					$controls.find('.wn-vc-copy').on('click', function (e) {
						e.preventDefault();
						var vc_model = window.vc.app.views[$(this).closest('[data-element_type]').attr('data-model-id')].model;
						wnVcCopyShortcodes = [];
						localStorage.setItem('wn_vc_copy_shortcode_wrap', vc_model.get('shortcode'));
						localStorage.setItem('wn_vc_copy_shortcode_wrap_params', JSON.stringify(vc_model.get('params')));
						$.each(window.vc.shortcodes.models, function (indexShortcode, shortcode) {
							var shortcodeParentID = shortcode.attributes.parent_id;
							if (shortcodeParentID != vc_model.id) {
								return;
							}
							wnVcCopyShortcodes.push({
								shortcode: shortcode.get('shortcode'),
								params: JSON.stringify(shortcode.get('params')),
								parent_id: 0,
								id: shortcode.id,
								order: shortcode.get('order')
							});
							parentID = shortcode.id;
							fetch_inner_shortcodes(shortcode);
						});
						localStorage.setItem('wn_vc_copy_shortcodes', JSON.stringify(wnVcCopyShortcodes));
					});
				}
			});

			function fetch_inner_shortcodes(shortcode) {
				if (parentID != shortcode.id) {
					wnVcCopyShortcodes.push({
						shortcode: shortcode.get('shortcode'),
						params: JSON.stringify(shortcode.get('params')),
						parent_id: shortcode.attributes.parent_id,
						id: shortcode.id,
						order: shortcode.get('order')
					});
				}
				_.each(window.vc.shortcodes.where({
					parent_id: shortcode.id
				}), function (shortcode) {
					fetch_inner_shortcodes(shortcode);
				});
			}

			// vc navbar
			var section = '<li class="wn-quick-vc-section" data-wntooltip="Add Section"><a href="#" class="vc_icon-btn vc_navbar-border-right wn-vc-section"><i class="ti-layout-slider"></i></a></li>',
				row = '<li data-wntooltip="Add Row"><a href="#" class="vc_icon-btn vc_navbar-border-right wn-vc-row"><i class="ti-layout-slider-alt"></i></a></li>',
				paste = '<li data-wntooltip="Paste from Clipboard"><a href="#" class="vc_icon-btn vc_navbar-border-right wn-vc-paste"><i class="ti-clipboard"></i></a></li>';
			$('.vc_navbar').find('.vc_navbar-nav').append(section + row + paste);

			$('.vc_navbar').find('.vc_navbar-nav')
				.find('.vc-composer-icon.vc-c-icon-add_element').attr('class', 'sl-plus').closest('li').attr('data-wntooltip', 'Add New Element').end().end()
				.find('.vc-composer-icon.vc-c-icon-add_template').attr('class', 'ti-layout-media-overlay-alt-2').closest('li').attr('data-wntooltip', 'Templates').end().end()
				.find('.vc-composer-icon.vc-c-icon-fullscreen').attr('class', 'sl-frame').closest('li').attr('data-wntooltip', 'Full Screen').end().end()
				.find('.vc-composer-icon.vc-c-icon-fullscreen_exit').attr('class', 'sl-size-actual').closest('li').attr('data-wntooltip', 'Exit Full Screen').end().end()
				.find('.vc-composer-icon.vc-c-icon-cog').attr('class', 'sl-settings').closest('li').attr('data-wntooltip', 'Custom CSS').end().end();

			/**
			 * Lazyload for WPBakery Templates
			 * 
			 * @since 3.3.5
			 */
			if ($('.vc_navbar').find('[data-wntooltip="Templates"]').length) {
				$('.deep-lazy').lazyload();
				$('.vc_navbar').find('[data-wntooltip="Templates"]').on('click', function () {
					var $container = $('.wn-templates-sections');
					setTimeout(function () {
						$container.isotope({}).resize();
					}, 500);
				});
			}

			// paste
			$('.wn-vc-paste').on('click', function (e) {
				e.preventDefault();

				var uniqueID = new Date().getTime();

				// create parent
				var shortcodeWrapName = localStorage.getItem('wn_vc_copy_shortcode_wrap');
				var shortcodeWrapID = vc_guid();
				var shortcodeWrapParams = JSON.parse(localStorage.getItem('wn_vc_copy_shortcode_wrap_params'));
				window.vc.shortcodes.create({
					shortcode: shortcodeWrapName,
					id: shortcodeWrapID,
					parent_id: false,
					cloned: false,
					params: shortcodeWrapParams
				});

				// craete childrens
				var wnShortcodes = JSON.parse(localStorage.getItem('wn_vc_copy_shortcodes'));
				$.each(wnShortcodes, function (indexShortcode, shortcode) {
					var shortcodeName = shortcode.shortcode;
					var shortcodeID = shortcode.id + uniqueID;
					var shortcodeParentID = (shortcode.parent_id == 0) ? shortcodeWrapID : shortcode.parent_id + uniqueID;
					var shortcodeParams = JSON.parse(shortcode.params);
					(shortcodeParams.tab_id != undefined) ? shortcodeParams.tab_id = shortcodeParams.tab_id + uniqueID: '';
					window.vc.shortcodes.create({
						shortcode: shortcodeName,
						id: shortcodeID,
						parent_id: shortcodeParentID,
						cloned: false,
						params: shortcodeParams
					});
				});
			});

			// section
			$('.wn-vc-section').on('click', function (e) {
				e.preventDefault();

				var section_id = vc_guid();
				window.vc.shortcodes.create({
					shortcode: 'vc_section',
					id: section_id,
					parent_id: false,
					cloned: false
				});

				var row_id = new Date().getTime();
				window.vc.shortcodes.create({
					shortcode: 'vc_row',
					id: row_id,
					parent_id: section_id,
					cloned: false,
				});

				var column_id = new Date().getTime();
				window.vc.shortcodes.create({
					shortcode: 'vc_column',
					id: column_id,
					parent_id: row_id,
					cloned: false,
				});
			});

			// row
			$('.wn-vc-row').on('click', function (e) {
				e.preventDefault();

				var row_id = vc_guid();
				window.vc.shortcodes.create({
					shortcode: 'vc_row',
					id: row_id,
					parent_id: false,
					cloned: false
				});

				var column_id = new Date().getTime();
				window.vc.shortcodes.create({
					shortcode: 'vc_column',
					id: column_id,
					parent_id: row_id,
					cloned: false,
				});

			});
		})();

		// Auto update
		$('#wnLicenseType').find('label').on('click', function (e) {
			e.preventDefault();

			var $this = $(this);
			var $radio_input = $this.find('input');
			var $radio_indicator = $this.find('.wn-radio-indicator');

			$this.closest('#wnLicenseType')
				.find('.wn-radio-control').removeClass('checked').end()
				.find('input').removeAttr('checked').end()
				.find('.wn-radio-indicator').removeClass('checked');

			$this.addClass('checked');
			$radio_input.attr('checked', 'checked');
			$radio_indicator.addClass('checked');
		});

		$('#wnThemeActivate').on('submit', function (e) {
			e.preventDefault();

			var $this = $(this);
			var $purchaseCodeInput = $('#wnPurchaseCode');
			var purchaseCodeVal = $purchaseCodeInput.val();
			var purchaseCodeType = $('#wnLicenseType').find('.wn-radio-control.checked').children('input').val();

			// preloader
			$this.prepend('<div class="wna-spinner-wrap"><div class="wna-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');

			$.ajax({
				type: 'POST',
				url: ajaxObject.ajaxUrl,
				data: {
					action: 'wnThemeActivate',
					nonce: ajaxObject.colornonce,
					purchaseCodeVal: purchaseCodeVal,
					purchaseCodeType: purchaseCodeType
				},
				success: function (response) {
					if (response == 'activate') {
						$this.removeClass('failed');
						$this.addClass('success');
						$('#wnFailedMesaage').html('');
					} else {
						$this.removeClass('success');
						$this.addClass('failed');
						$('#wnFailedMesaage').html(response);
					}
					$this.find('.wna-spinner-wrap').remove();
				}
			});
		});

		// redux image select tag name
		$('label.redux-image-select').each(function () {
			var redux_image_select_alt = $(this).find('img').attr('alt');
			$(this).find('img').after('<p class="image-name">' + redux_image_select_alt + '</p>');
		});

		/*
		 Plugin Name: Colorful Categories
		 Description: New Categories widget in the awesome style! Bring colours to your categories widget - make every category in own colour.
		 Version: 2.0.3
		 Author: Loyalty Manufaktur
		 Author URI: http://loyalty.de
		 Text Domain: colorful-categories
		*/

		/**
		 * Class Deep_ColorfulCategories
		 * Colorful categories main plugin
		 */
		var updatePickers = function () {
			if ($.fn.wpColorPicker) {
				$('.colorful-categories-picker').wpColorPicker({
					change: _.throttle(function () {

						$(this).trigger('change');

						var msg = $(this).closest('.column-color').find('.colorful-categories-saving');
						msg.fadeIn();

						$.post(ajaxObject.ajaxUrl, {
							action: 'update_color_options_array',
							termId: $(this).data('term-id'),
							taxonomy: $(this).data('taxonomy'),
							color: $(this).val(),
							colornonce: ajaxObject.colornonce
						}, function () {
							msg.hide();
						});

					}, 2000)
				});
			}
		};
		updatePickers();

		$('.wp-list-table').on('DOMNodeInserted', function () {
			updatePickers();
		});

		$(document).on('change', 'select.kc-param', function (event) {
			if ($(this).val() == '1') {
				$('.field-base-process_item_t2').hide();
				$('.field-base-process_item_t3').hide();
				$('.field-base-process_item').show();
			}

			if ($(this).val() == '2') {
				$('.field-base-process_item').hide();
				$('.field-base-process_item_t3').hide();
				$('.field-base-process_item_t2').show();
			}

			if ($(this).val() == '3') {
				$('.field-base-process_item').hide();
				$('.field-base-process_item_t2').hide();
				$('.field-base-process_item_t3').show();
			}
		});

		$(document).on('change', '.kc-param.m-p-rela', function (event) {

			if ($('.kc-param.m-p-rela').val() == 'type1') {
				$('.field-base-image_item_t3').hide();
				$('.field-base-image_item').show();
			}

			if ($('.kc-param.m-p-rela').val() == 'type2') {
				$('.field-base-image_item_t3').hide();
				$('.field-base-image_item').show();
			}

			if ($('.kc-param.m-p-rela').val() == 'type4') {
				$('.field-base-image_item_t3').hide();
				$('.field-base-image_item').show();
			}

			if ($('.kc-param.m-p-rela').val() == 'type3') {
				$('.field-base-image_item').hide();
				$('.field-base-image_item_t3').show()
			}

			if ($('.kc-param.m-p-rela').val() == '9') {
				$('.field-base-ourteam_item_type10').hide();
				$('.field-base-ourteam_item_type9').show()
			}

			if ($('.kc-param.m-p-rela').val() == '10') {
				$('.field-base-ourteam_item_type9').hide();
				$('.field-base-ourteam_item_type10').show()
			}

			if ($('.kc-param.m-p-rela').val() != '10' && $('.kc-param.m-p-rela').val() != '9') {
				$('.field-base-ourteam_item_type9').hide();
				$('.field-base-ourteam_item_type10').hide()
			}

			if ($('.kc-param.m-p-rela').val() == '1') {
				$('.field-base-testimonial_item_type4').hide();
				$('.field-base-testimonial_item_octa').hide();
				$('.field-base-process_item_t2').hide();
				$('.field-base-process_item').show();
				$('.field-base-testimonial_item').show()
			}

			if ($('.kc-param.m-p-rela').val() == '2') {
				$('.field-base-testimonial_item_type4').hide();
				$('.field-base-testimonial_item_octa').hide();
				$('.field-base-process_item').hide();
				$('.field-base-process_item_t2').show();
				$('.field-base-testimonial_item').show()
			}

			if ($('.kc-param.m-p-rela').val() == '3') {
				$('.field-base-testimonial_item_type4').hide();
				$('.field-base-testimonial_item_octa').hide();
				$('.field-base-testimonial_item').show()
			}

			if ($('.kc-param.m-p-rela').val() == '4') {
				$('.field-base-testimonial_item_type4').show();
				$('.field-base-testimonial_item_octa').hide();
				$('.field-base-testimonial_item').hide()
			}
			if ($('.kc-param.m-p-rela').val() == 'octa') {
				$('.field-base-testimonial_item_octa').show();
				$('.field-base-testimonial_item_type4').hide();
				$('.field-base-testimonial_item').hide()
			}
			if ($('.kc-param.m-p-rela').val() == 'nona') {
				$('.field-base-testimonial_item_two').show();
				$('.field-base-testimonial_item_type4').hide();
				$('.field-base-testimonial_item_octa').hide();
				$('.field-base-testimonial_item').hide()
			}

			if ($('.kc-group-controls li.counter').text() == 'shape_width: ') {
				$('.kc-group-controls li.counter').text('shape: ')
			}

			if ($('.kc-param-row').length > 0) {
				$('textarea').attr('rows', '4');
			}
			if ($('select.kc-param').val() == '1') {
				$('.field-base-process_item_t2').hide();
				$('.field-base-process_item_t3').hide();
				$('.field-base-process_item').show();
			}

			if ($('select.kc-param').val() == '2') {
				$('.field-base-process_item_t2').show();
				$('.field-base-process_item_t3').hide();
				$('.field-base-process_item').hide();
			}

			if ($('select.kc-param').val() == '3') {
				$('.field-base-process_item_t2').hide();
				$('.field-base-process_item_t3').show();
				$('.field-base-process_item').hide();
			}

		});

		if ($('#kc-footers').length > 0) {
			var kc_add_element = $('#kc-footers');
			kc_add_element.insertAfter($("#kc-controls"));
		}

		$('.post-type-mega_menu [data-element="vc_section"]').hide();

		// add id to redux tr tag
		$('tr > td > fieldset').each(function () {
			var fieldset_id = $(this).attr('id');
			$(this).closest('tr').addClass(fieldset_id);
		});

		// King Composer admin label
		function button(data, el) {
			if (data['btn_content'] == null) {
				data['btn_content'] = '';
			}
			return 'Content: ' + data['btn_content'];
		}

		$('#wpadminbar').find('.kc-top-toolbar').find('#kc-bar-undo').find('.fa-reply').attr('class', 'fa-mail-reply');

		/**
		 * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
		 *
		 * @private
		 * @author Todd Motto
		 * @link https://github.com/toddmotto/foreach
		 * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
		 * @callback requestCallback      callback   - Callback function for each iteration.
		 * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
		 * @returns {}
		 */
		var forEach = function (t, o, r) {
			if ("[object Object]" === Object.prototype.toString.call(t))
				for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
			else
				for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
		};

		var hamburgers = document.querySelectorAll(".hamburger");
		if (hamburgers.length > 0) {
			forEach(hamburgers, function (hamburger) {
				hamburger.addEventListener("click", function () {
					this.classList.toggle("is-active");
				}, false);
			});
		}

		(function () {
			$('.wn-admin-qacs-item.preview-btn a').on('click', function (e) {
				e.preventDefault();
				$(this).closest('#wpwrap').find('#submitpost').find('a.preview.button').trigger('click');

			});
			$('.wn-admin-qacs-item.update-btn a').on('click', function (e) {
				e.preventDefault();
				$(this).closest('#wpwrap').find('#submitpost').find('input#publish').trigger('click');
			});
		})();

		// Update
		$('#custom_update').on('click', function (e) {
			e.preventDefault();

			// preloader
			$('.update-now-box').prepend('<div class="wna-spinner-wrap"><div class="wna-spinner" style="top: 25%;"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');

			const data = {
				action: "custom_update",
				nonce: OneImporter.nonce
			};

			$.ajax({
				type: 'POST',
				url: OneImporter.ajax_url,
				data: data,
				success: function (res) {
					console.log(res)
					$('.wna-spinner-wrap').remove();
					$('.update-now-box').remove();
				},
				error: function (res) {
					console.log(res)
					$('.wna-spinner-wrap').remove();
				}
			});
		});

	}); // end document ready
})(jQuery);