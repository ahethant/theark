(function ($) {
	"use strict";
	$(document).ready(function () {
		// Woocommerce Mini Cart
		$(document).on('click', '.mini_cart_item .remove', function (event) {
			var $this = $(this),
				$preloader = $('<div class="wn-circle-side-wrap"><div data-loader="wn-circle-side"></div></div>'),
				cartproductid = $this.data('product_id');
			event.preventDefault();
			$preloader.appendTo($(this).closest('.wn-header-woo-cart'));
			$.ajax({
				url: woocommerce_params.ajax_url,
				type: 'POST',
				dataType: 'html',
				data: {
					action: 'wn_woo_ajax_update_cart',
					cart_product_id: cartproductid,
				},
				success: function (data) {
					$('.wn-header-woo-cart-wrap').html(data);
					$preloader.remove();
					$this.closest('.wn-header-woo-cart').slideDown();
					setTimeout(function () {
						$this.find('.wn-ajax-error').remove();
					}, 400);
					var cart_items = $('.wn-count-cart-product').attr('data-items');
					$('span.header-cart-count-icon').text(cart_items);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {}
			});

		});

		// Remove ajax_add_to_cart from button
		$('.single-product .add_to_cart_button').removeClass('ajax_add_to_cart')

		// Woocommerce Add To Cart
		$(document).on('click', '.single-product .add_to_cart_button', function (event) {
			event.preventDefault();
			var $this = $(this),
				$preloader = $('<div class="wn-circle-side-wrap"><div data-loader="wn-circle-side"></div></div>'),
				$cart = $('#webnus-header-builder').find('.whb-screen-view:not(.whb-sticky-view)').find('.wn-header-woo-cart'),
				cartproductid = $this.data('product_id'),
				product_qty = $this.prev().find('input.qty').val(),
				variation_id = $this.parent().find( 'input.variation_id' ).val();

			$("html, body").animate({
				scrollTop: 0
			}, 700);
			$cart.append($preloader);
			if (!$cart.hasClass('open-cart')) {
				$cart.addClass('is-open').slideDown();
			}
			if (!$('#wn-cart-modal-icon').hasClass('open-cart')) {
				$('#wn-cart-modal-icon').addClass('open-cart');
			}

			$.ajax({
				url: woocommerce_params.ajax_url,
				type: 'POST',
				dataType: 'html',
				data: {
					action: 'wn_woo_ajax_add_to_cart',
					product_id: cartproductid,
					quantity: product_qty,
					variation_id: variation_id
				},
				success: function (data) {
					$('.wn-header-woo-cart-wrap').html(data);
					$cart.find('.wn-circle-side-wrap').remove();
					var cart_items = $('.wn-count-cart-product').attr('data-items');
					$('.whb-cart').find('.wn-cart-modal-icon').find('.header-cart-count-icon').text(cart_items).attr('data-cart_count', cart_items);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {}
			});

		});
		// Woocommerce Icon in header
		$('#webnus-header-builder').find('.whb-cart').on('click', '#wn-cart-modal-icon', function (event) {
			event.preventDefault();
			if ($(this).hasClass('open-cart')) {
				$(this).removeClass('open-cart');
				$(this).closest('.whb-cart').removeClass('is-open');
				$(this).closest('.whb-cart').find('.wn-header-woo-cart').addClass('is-open').slideUp(300);
			} else {
				$(this).addClass('open-cart');
				$(this).closest('.whb-cart').addClass('is-open');
				$(this).closest('.whb-cart').find('.wn-header-woo-cart').removeClass('is-open').slideDown(300);
			}
		});
		$(document).on('click', function (e) {
			var target = $(e.target);
			if (e.target.id == 'wn-cart-modal-icon' || e.target.id == 'header-cart-icon' || e.target.id == 'header-cart-count-icon' || target.hasClass('add_to_cart_button') || target.parent().hasClass('add_to_cart_button')) {
				return;
			}

			var target_element = $('#webnus-header-builder').find('.whb-cart').find('#wn-cart-modal-icon');
			if (target_element.hasClass('open-cart')) {
				target_element.removeClass('open-cart');
				target_element.closest('.whb-cart').removeClass('is-open');
				target_element.closest('.whb-cart').find('.wn-header-woo-cart').slideUp(300);
			}
		});
		$(document).on('click', '#wn-header-woo-cart', function (e) {
			e.stopPropagation();
		});
	});
})(jQuery);