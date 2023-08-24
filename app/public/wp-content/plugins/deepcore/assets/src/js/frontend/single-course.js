(function ($) {
	$(document).ready(function () {
		// Single course accordion
		$('.llms-course-wrapp').first().show().siblings('.llms-course-wrapp').hide();
		$('.title-llms-course').on('click', function () {
			$(this).next().slideToggle().siblings('.llms-lesson-link').slideUp();
		});
	});
})(jQuery);