( function( $ ) {
	$('.widget-tabs').each(function () {
		$(this).find(".tab_content").hide(); //Hide all content
		if (document.location.hash && $(this).find("ul.tabs li a[href='" + document.location.hash + "']").length >= 1) {
			$(this).find("ul.tabs li a[href='" + document.location.hash + "']").parent().addClass("active").show(); //Activate first tab
			$(this).find(document.location.hash + ".tab_content").show(); //Show first tab content
		} else {
			$(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
			$(this).find(".tab_content:first").show(); //Show first tab content
		}
	});
	$("ul.tabs li").on('click', function (e) {
		$(this).parents('.widget-tabs').find("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(this).parents('.widget-tabs').find(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(this).parents('.widget-tabs').find(activeTab).fadeIn(); //Fade in the active ID content
		e.preventDefault();
	});
})( jQuery );