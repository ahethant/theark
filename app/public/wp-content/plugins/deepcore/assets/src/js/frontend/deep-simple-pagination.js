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
})(jQuery);