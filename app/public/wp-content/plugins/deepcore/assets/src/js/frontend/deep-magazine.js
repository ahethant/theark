(function ($) {
	$.fn.simplePagination = function (options) {

		var defaults = {
			perPage: 5,
			containerClass: '',
			previousButtonClass: '',
			nextButtonClass: '',
			previousButtonText: 'Previous',
			nextButtonText: 'Next',
			currentPage: 1
		};

		var settings = $.extend({}, defaults, options);

		return this.each(function () {
			var $rows = $('.wn-pagination', this);
			var pages = Math.ceil($rows.length / settings.perPage);

			var container = document.createElement('div');
			var bPrevious = document.createElement('a');
			var bNext = document.createElement('a');
			var of = document.createElement('span');

			bPrevious.innerHTML = settings.previousButtonText;
			bNext.innerHTML = settings.nextButtonText;

			container.className = settings.containerClass;
			bPrevious.className = settings.previousButtonClass;
			bNext.className = settings.nextButtonClass;

			// bPrevious.style.marginRight = '8px';
			// bNext.style.marginLeft = '8px';
			// container.style.textAlign = "center";
			// container.style.marginBottom = '20px';

			container.appendChild(bPrevious);
			container.appendChild( of );
			container.appendChild(bNext);

			$(this).after(container);

			update();

			$(bNext).on('click', function () {
				if (settings.currentPage + 1 > pages) {
					settings.currentPage = pages;
				} else {
					settings.currentPage++;
				}

				setTimeout(update, 2000);
			});

			$(bPrevious).on('click', function () {
				if (settings.currentPage - 1 < 1) {
					settings.currentPage = 1;
				} else {
					settings.currentPage--;
				}

				setTimeout(update, 2000);
			});

			function update() {
				var from = ((settings.currentPage - 1) * settings.perPage) + 1;
				var to = from + settings.perPage - 1;

				if (to > $rows.length) {
					to = $rows.length;
				}

				$rows.hide();
				$rows.slice((from - 1), to).fadeIn('400');

				//of.innerHTML = from + ' to ' + to + ' of ' + $rows.length + ' entries';
				if ($rows.length <= settings.perPage) {
					$(container).hide();
				} else {
					$(container).fadeIn('400');
				}
			}
		});

	}

	function magazin_pagination() {
		$('.magazin-wrap.magazin-1').each(function () {
			$(this).find('.magazin-wrap-content').simplePagination({
				perPage: $(this).closest('.magazin-wrap').data('post_prepage'),
				currentPage: 1,
				containerClass: 'pagination',
				previousButtonClass: "magazine-previous",
				nextButtonClass: "magazine-next",
				previousButtonText: '<i class="icon-arrows-slim-left"></i>',
				nextButtonText: '<i class="icon-arrows-slim-right"></i>',
			});
			$(this).find('.pagination').slice(1).remove();
		});

		$('.magazin-wrap.magazin-2').each(function () {
			$(this).find('.magazin-wrap-content').simplePagination({
				perPage: $(this).closest('.magazin-wrap').data('post_prepage') - 1,
				currentPage: 1,
				containerClass: 'pagination',
				previousButtonClass: "magazine-previous",
				nextButtonClass: "magazine-next",
				previousButtonText: '<i class="icon-arrows-slim-left"></i>',
				nextButtonText: '<i class="icon-arrows-slim-right"></i>',
			});
			$(this).find('.pagination').slice(1).remove();
		});

		$('.magazin-wrap.magazin-3').each(function () {
			$(this).find('.magazin-wrap-content').simplePagination({
				perPage: $(this).closest('.magazin-wrap').data('post_prepage') - 2,
				currentPage: 1,
				containerClass: 'pagination',
				previousButtonClass: "magazine-previous",
				nextButtonClass: "magazine-next",
				previousButtonText: '<i class="icon-arrows-slim-left"></i>',
				nextButtonText: '<i class="icon-arrows-slim-right"></i>',
			});
			$(this).find('.pagination').slice(1).remove();
		});

	}
	magazin_pagination();

	function removepreloader() {
		$('.magazin-wrap').find('.pagination').find('a').on('click', function (e) {

			e.preventDefault();

			var $preloader = $('<div class="wn-circle-side-wrap"><div data-loader="wn-circle-side"></div></div>'),
				$this = $(this);

			$preloader.appendTo($this.closest('.magazin-wrap'));

			setTimeout(function () {
				$preloader.remove();
			}, 2000);
		});
	}
	removepreloader();

	$('.magazin-wrap').each(function () {
		$(this).find('.magazin-cat-nav').find('a').on('click', function (e) {
			e.preventDefault();
			var $this = $(this),
				$preloader = $('<div class="wn-circle-side-wrap"><div data-loader="wn-circle-side"></div></div>'),
				$magazin_wrap = $this.closest('.magazin-wrap'),
				post_name = $magazin_wrap.data('post-name'),
				category_slug = $this.data('cat-slug');

			$preloader.appendTo($this.closest('.magazin-wrap'));
			$.ajax({
				url: deep_localize.deep_ajax,
				type: 'POST',
				data: {
					action: 'deep_magazine_ele_ajax',
					param_category: $this.attr('data-param_category'),
					post_title: $magazin_wrap.attr('data-post_title'),
					post_url: $magazin_wrap.attr('data-post_url'),
					post_number: $magazin_wrap.attr('data-post_number'),
					post_prepage: $magazin_wrap.attr('data-post_prepage'),
					excerpt_value: $magazin_wrap.attr('data-excerpt_value'),
					sort_order: $magazin_wrap.attr('data-sort_order'),
					type: $magazin_wrap.attr('data-type'),
					param_tag: $magazin_wrap.attr('data-param_tag'),
					pagination: $magazin_wrap.attr('data-pagination'),
					uniqid: '',
					reviews: '',
				},
				success: function (data) {

					$magazin_wrap.find('.magazin-cat-nav').find('li').find('a').removeClass("colorf");

					$this.addClass("colorf");

					$magazin_wrap.find('.pagination').remove();

					var $data = $(data).find('.magazin-wrap-content');

					$magazin_wrap.find('.magazin-wrap-content').replaceWith($data);

					magazin_pagination();

					removepreloader();
					$preloader.remove();
				}
			});
		});
	});
})(jQuery);