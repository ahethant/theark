( function( $ ) {
	/**
 	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */ 
	var WidgetGoogleMapHandler = function ($scope, $) { 
	
		if ($('.w-map')[0]) {

			$('.w-map').each(function (index, el) {
				var $map = $(this).find('.webnus-google-map'),
					main_map_id = $map.attr('id'),
					map_type_display = $map.attr('data-map-type-display'),
					zoom_control_display = $map.attr('data-map-zoom-control'),
					scrollwheel = $map.attr('data-map-scroll-wheel'),
					street_view = $map.attr('data-map-street-view'),
					scale_control = $map.attr('data-map-scale-control'),
					zoom_map = parseFloat($map.attr('data-map-zoom')),
					bg_color = $map.attr('data-map-background-color'),
					lat_center = parseFloat($map.attr('data-map-latitude-center')),
					lon_center = parseFloat($map.attr('data-map-longitude-center')),
					draggable = $map.attr('data-map-draggable'),
					bg_color = $map.attr('data-map-background-color'),
					map_type = $map.attr('data-map-types'),
					hue = $map.attr('data-map-hue-color'),
					animation = $map.attr('data-map-animation'),
					marker_animation_value = $map.attr('data-map-animation-value'),
					zoom_click = parseFloat($map.attr('data-map-zoom-click')),
					addresses = $map.attr('data-map-addresses'),
					marker_type = $map.attr('data-map-marker-type'),
					marker_color = $map.attr('data-map-marker-color'),
					map_style = $map.attr('data-map-style');

				if ( addresses != '' ) {
					addresses = $map.attr('data-map-addresses').split('|');
				}
				if ( map_type != '' ) {
					var map_type_values = map_type.split(','),
						map_type_values_item = $.makeArray(map_type_values);
				} else {
					var map_type_values_item = ['','','',''];
				}

				// Check boolean
				if (map_type_display == "false") {
					map_type_display = false;
				} else {
					map_type_display = true;
				}

				if (zoom_control_display == "false") {
					zoom_control_display = false;
				} else {
					zoom_control_display = true;
				}

				if (draggable == "false") {
					draggable = false;
				} else {
					draggable = true;
				}

				if (street_view == "false") {
					street_view = false;
				} else {
					street_view = true;
				}

				if (scale_control == "false") {
					scale_control = false;
				} else {
					scale_control = true;
				}


				// init google map
				function initMap() {

					if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 767) {
						var isDraggable = draggable;
					} else {
						var isDraggable = false;
					}

					// Map Styles
					if (map_style === 'light') {
						var map_styles_code = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
							map_type_name = 'Ultra Light';
					} else if (map_style === 'gray') {
						var map_styles_code = [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": "50" }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "lightness": "30" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "lightness": "40" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "lightness": -25 }, { "saturation": -100 }] }],
							map_type_name = 'Subtle Grayscale';
					} else if (map_style === 'black') {
						var map_styles_code = [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }],
							map_type_name = 'Shade of Grey';
					} else if (map_style === 'blue') {
						var map_styles_code = [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }],
							map_type_name = 'Blue water';
					} else {
						var map_styles_code = [{ "stylers": [{ "hue": hue }] }],
							map_type_name = 'Simple';
					}


					var styledMapType = new google.maps.StyledMapType(map_styles_code,
						{ name: map_type_name });

					// Generated Map
					var map = new google.maps.Map(document.getElementById(main_map_id), {
						mapTypeControl: map_type_display,
						zoomControl: zoom_control_display,
						streetViewControl: street_view,
						scaleControl: scale_control,
						zoom: zoom_map,
						backgroundColor: bg_color,
						center: { lat: + lat_center, lng: + lon_center },
						draggable: isDraggable,
						mapTypeControlOptions: {
							mapTypeIds: [map_type_values_item[0], map_type_values_item[1], map_type_values_item[2], map_type_values_item[3], 'google_styled_map']
						},

					});

					if (scrollwheel == 'true') {
						map.setOptions({ scrollwheel: true });
					}

					// Set default map Style
					map.mapTypes.set('google_styled_map', styledMapType);
					map.setMapTypeId('google_styled_map');


					// Marker style
					CustomMarker.prototype = new google.maps.OverlayView();
					CustomMarker.prototype.draw = function () {

						var wn_google_radar = this.div_;
						// Check if wn_google_radar is exist
						if (!wn_google_radar) {
							wn_google_radar = this.div_ = $('' +
								'<div class="wn-google-radar"><div class="radar-dot">' +
								'<div class="radar-centraldot"></div>' +
								'<div class="radar-wave"></div>' +
								'<div class="radar-wave2"></div>' +
								'</div></div>' +
								'')[0];

							wn_google_radar.style.position = 'absolute';
							wn_google_radar.style.paddingLeft = '0px';
							wn_google_radar.style.cursor = 'pointer';

							var panes = this.getPanes();
							panes.overlayImage.appendChild(wn_google_radar);

						}

						if (marker_color != "") {
							$map.find('.radar-wave,.radar-wave2,.radar-centraldot').css({
								backgroundColor: marker_color,
							});
						}
						var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);

						if (point) {
							wn_google_radar.style.left = point.x + 'px';
							wn_google_radar.style.top = point.y + 'px';
						}

					};

					// Remove Overlay if exist
					CustomMarker.prototype.remove = function () {
						if (this.div_) {
							this.div_.parentNode.removeChild(this.div_);
							this.div_ = null;
						}
					};

					CustomMarker.prototype.getPosition = function () {
						return this.latlng_;
					};

					setMarkers(map);
				}

				// call init map function
				initMap();

				function CustomMarker(latlng, map) {
					this.latlng_ = latlng;
					this.setMap(map);
				}
				function setMarkers(map) {
					var items = addresses;

					if (items) {
						items.splice(-1, 1);
					}
					
					if (typeof items != 'undefined') {
						for (var i = 0; i < items.length; i++) {
							var item = $.makeArray(items[i].split(','));
							if (item[4].indexOf(']') !== -1) {
								item[4] = item[4].replace(']', '');
							}
							if (item[0].indexOf('[') !== -1) {
								item[0] = item[0].replace('[', '');
							}
							if (marker_type === "radar") {
								var latlng = new google.maps.LatLng(item[1], item[2]),
									overlay = new CustomMarker(latlng, map),
									marker = new google.maps.Marker({
										map: map,
									});
							} else {
								var marker = new google.maps.Marker({
									map: map,
									position: { lat: + item[1], lng: + item[2] },
									icon: item[3],
									title: item[0],
									content: item[4],
								});
							}

							if (animation === 'true' && marker_animation_value === 'DROP') {
								marker.setAnimation(google.maps.Animation.DROP);
							} else if (animation === 'true' && marker_animation_value === 'BOUNCE') {
								marker.setAnimation(google.maps.Animation.BOUNCE);
							}

							// Allow each marker to have an info window
							google.maps.event.addListener(marker, 'click', (function (marker, index) {
								return function () {
									if (this.content) {
										infoWindow.setContent(this.content);
										infoWindow.open(map, this);
									}
								}
							})(marker, index));

							var infoWindow = new google.maps.InfoWindow({
								content: item[4],
								maxWidth: 250
							}), marker, index;

							marker.addListener('click', function () {
								map.setZoom(zoom_click);
								map.setCenter(marker.position);
							});
						}
					}
				}
			});

		}

	};
	
	// Make sure you run this code under Elementor.
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction('frontend/element_ready/google-maps.default', WidgetGoogleMapHandler);
	} );
} )( jQuery );


