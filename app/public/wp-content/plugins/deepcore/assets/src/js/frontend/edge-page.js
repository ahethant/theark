( function( $ ) {
	if (window.innerWidth >= 1280) {
		if ($('.wn-edge-onepage').length) {
			var $edge_data_attr = $('div.wn-edge-onepage');
			var edge_data_attr = $edge_data_attr.data();
			$('.wn-edge-onepage').fullpage({

				//Navigation
				menu: '#menu',
				lockAnchors: false,
				navigation: edge_data_attr['navigation'],
				navigationPosition: 'right',
				showActiveTooltip: true,
				slidesNavigation: true,
				slidesNavPosition: 'bottom',

				//Scrolling
				css3: true,
				scrollingSpeed: edge_data_attr['scrollingspeed'],
				autoScrolling: true,
				fitToSection: true,
				fitToSectionDelay: 1000,
				scrollBar: true,
				easing: 'easeInOutCubic',
				easingcss3: 'ease',
				loopBottom: edge_data_attr['loopbottom'],
				loopTop: edge_data_attr['looptop'],
				loopHorizontal: true,
				continuousHorizontal: true,
				scrollHorizontally: true,
				interlockedSlides: true,
				dragAndMove: true,
				offsetSections: true,
				resetSliders: true,
				fadingEffect: true,
				normalScrollElements: '#element1, .element2',
				scrollOverflow: false,
				scrollOverflowReset: true,
				scrollOverflowOptions: null,
				touchSensitivity: 15,
				normalScrollElementTouchThreshold: 5,
				bigSectionsDestination: null,

				//Accessibility
				keyboardScrolling: true,
				animateAnchor: true,
				recordHistory: true,

				//Design
				controlArrows: true,
				verticalCentered: true,
				fixedElements: '.whb-wrap, #footer',
				responsiveWidth: 0,
				responsiveHeight: 0,
				responsiveSlides: true,
				parallax: true,
				parallaxOptions: {
					type: 'reveal',
					percentage: 62,
					property: 'translate'
				},

				//Custom selectors
				sectionSelector: '.wn-section, .elementor-top-section',
				lazyLoading: false,
			});
			$('#fp-nav').find('li').each(function (index) {
				index++;
				$(this).find('span').text(index);


			});
		}
	}
})( jQuery );