( function( $ ) {
	$('.post-gallery-format .gl-img').owlCarousel({
		items: 1,
		nav: true,
		autoplay: true,
		loop: true,
		navText: ["<span class='gl-img-pre'></span>", "<span class='gl-img-nxt'></span>", "", ""],
	});
})( jQuery );