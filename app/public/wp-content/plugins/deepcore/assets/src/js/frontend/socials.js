( function( $ ) {
	$(".wn-social-network .social-main-content a").on('mouseenter', function(){
		$(".wn-social-network").addClass($(this).data("network")).addClass("active");
	})
	.on('mouseleave', function(){
		$(".socialfollow.wn-social-network").removeClass("active dropbox evernote envato feed vine yelp yahoo wordpress soundcloud reddit lastfm spotify tumblr facebook dribbble foursquare flickr github twitter vimeo dribble youtube pinterest google-plus linkedin rss instagram skype other-social");
	});
})( jQuery );