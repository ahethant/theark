"use strict";

window.onload = function () {
	document.body.style.display = "block";
};

(function ($) {
	$(document).ready(function () {
		$(window).on('load', function () {

			/**
			 * Header Builder - Global Variables
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			// DOM variables
			var $body = $('body');
			var $wrap = $('#wn-header-builder');
			var $sortablePlaces = $wrap.find('.whb-elements-place');
			var $desktopSortablePlaces = $wrap.find('.whb-desktop-panel').find('.whb-columns[data-columns="row1"]').find('.whb-elements-place');
			var $currentElement;
			var $currentModalEdit;

			// Data variables
			var components = whb_localize.components && !Array.isArray(whb_localize.components) ? whb_localize.components : {};
			var editorComponents = whb_localize.editor_components ? whb_localize.editor_components : {};
			var frontendComponents = whb_localize.frontend_components ? whb_localize.frontend_components : {};
			const platforms = {
				"desktop-view": {},
				"tablets-view": {},
				"mobiles-view": {},
			};

			// Position variables
			var currentCell;
			var currentRow;
			var currentPanel;

			// Import button flag
			var importButtonFlag = false;

			// Clipboard element
			var $clipboardElem;


			/**
			 * Header Builder - Helper Functions
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			function whbDebug() {
				console.log('%c Components:', 'font-size: 18px; background: #EC9787; color: #fff;', components);
				console.log('%c Editor Components:', 'font-size: 18px; background: #6F9FD8; color: #fff;', editorComponents);
				console.log('%c Frontend Components:', 'font-size: 18px; background: #ECDB54; color: #fff;', frontendComponents);
			}
			whbDebug();

			// check string is json
			function whbIsJson(str) {
				try {
					JSON.parse(str);
				} catch (e) {
					return false;
				}
				return true;
			}

			function whbIsObject(obj) {
				return obj === Object(obj);
			}

			// Check for emptiness object
			function whbIsEmptyObj(obj) {
				for (var key in obj) {
					return false;
				}
				return true;
			}

			function whbIsFrontendBuilder() {
				if ($body.hasClass('whb-frontend-builder-wrap')) {
					return true;
				}
				return false;
			}


			/**
			 * Header Builder - Editor Preview
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			for (var key in components) {
				if (components.hasOwnProperty(key)) {
					const element = components[key];
					if (key.search('logo') != -1) {
						var elemUniqueID = key.slice('5');
						$wrap.find('.whb-elements-item[data-element="logo"][data-unique-id="' + elemUniqueID + '"]').each(function () {
							var $logo = $(this);
							wp.media.attachment(element.logo).fetch().done(function () {
								$logo.children('a').hide().after('<img class="whb-img-placeholder-el" src="' + this.attributes.url + '" alt="">');
							});
						});
					}
				}
			}


			/**
			 * Header Builder - Frontend Builder Iframe Height
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			var docHeight = $(document).height();
			$('#whbIframe').css('height', docHeight);
			$('#whbIframe').contents().find('a').on('click', function () {
				return false;
			});

			/**
			 * Header Builder - Nice Scroll
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			// $('.whb-frontend-builder').niceScroll({
			// 	cursorborder: "0",
			// 	background: "#e7e7e7",
			// 	cursorcolor: "#91989e",
			// });


			/**
			 * Header Builder - Tab
			 * @author	WEBNUS
			 * @version	1.0.0
			 * @event	Click
			 */
			$wrap.find('.whb-tab-panel' + $wrap.find('.whb-tabs-list').find('li.w-active').find('a').attr('href')).show();
			$wrap.on('click', '.whb-tabs-list a', function (event) {
				event.preventDefault();

				var $this = $(this);
				var $currentTab = $this.parent();
				var $tabs = $this.closest('ul').find('li');
				var $tabUl = $this.closest('ul');

				if (!$currentTab.hasClass('w-active')) {
					// active current navigation
					$tabs.removeClass('w-active');
					$currentTab.addClass('w-active');

					// show panel
					if ($tabUl.hasClass('whb-element-groups')) {
						$wrap.find('.whb-group-panel').hide().end().find('.whb-group-panel[data-id="' + $this.attr('href') + '"]').show();
					} else if ($tabUl.hasClass('whb-styling-groups')) {
						$tabUl.siblings('.whb-styling-group-panel').hide().end().siblings('.whb-styling-group-panel[data-id="' + $this.attr('href') + '"]').show();
					} else if ($tabUl.hasClass('whb-styling-screens')) {
						$wrap.find('.whb-styling-screen-panel').hide().end().find('.whb-styling-screen-panel[data-id="' + $this.attr('href') + '"]').show();
					} else {
						$wrap.find('.whb-tab-panel:not(.whb-group-panel)').hide().end().find('.whb-tab-panel' + $this.attr('href')).fadeIn(300);
					}
				}
			});

			// Toggle device
			$('#whb-desktop-tab, #whb-sticky-tab').on('click', function (e) {
				e.preventDefault();
				$body.removeClass('whb-tablets-device whb-mobiles-device');
				$('.whb-screen-view').hide();
				$('.whb-desktop-view, .whb-sticky-view').show();
			});

			$('#whb-tablets-tab').on('click', function (e) {
				e.preventDefault();
				$body.removeClass('whb-mobiles-device');
				$body.addClass('whb-tablets-device');
				$('.whb-screen-view').hide();
				$('.whb-tablets-view').show();
			});

			$('#whb-mobiles-tab').on('click', function (e) {
				e.preventDefault();
				$body.removeClass('whb-tablets-device');
				$body.addClass('whb-mobiles-device');
				$('.whb-screen-view').hide();
				$('.whb-mobiles-view').show();
			});


			/**
			 * Header Builder - Full Modal
			 * @author	WEBNUS
			 * @version	1.0.0
			 * @event	Click
			 */
			// Show full modal
			$wrap.find('.whb-full-modal-btn').on('click', function (event) {
				event.preventDefault();

				var $this = $(this);
				var modalTarget = $this.data('modal-target');
				var $modal = $wrap.find('.whb-full-modal[data-modal="' + modalTarget + '"]');

				$body.css('overflow', 'hidden');
				$modal.find('textarea').val(' ');
				$modal.fadeIn(200);
			});
			// Hide full modal
			$wrap.find('.whb-full-modal-close').on('click', function (event) {
				event.preventDefault();

				$body.css('overflow', 'initial');
				$wrap.find('.whb-full-modal').hide();
			});

			$wrap.find('.whb-full-modal').on('click', function (event) {
				event.preventDefault();

				$body.css('overflow', 'initial');
				$wrap.find('.whb-full-modal').hide();
			});

			/**
			 * Header Builder - Add Element Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 * @event	Click
			 */
			// Show add element modal
			$wrap.on('click', '.w-add-element', function (event) {
				event.preventDefault();

				var $this = $(this);

				$wrap.find('.whb-elements').show();
				currentPanel = $this.closest('.whb-tab-panel').attr('id'); // desktop-view, tablets-view, mobiles-view, sticky-view
				currentRow = $this.closest('.whb-columns').attr('data-columns'); // topbar, row1, row2, row3
				currentCell = $this.attr('data-align-col'); // left, center, right
			});
			// Hide add element modal
			$wrap.on('click', '.whb-modal-header i, .whb_close', function (event) {
				event.preventDefault();

				$wrap.find('.whb-modal-wrap').hide();
				$wrap.find('.whb-modal-wrap[data-element-target]').remove();
			});
			// Append new element to editor
			$wrap.find('.whb-modal-wrap').on('click', '.whb-elements-item a', function (event) {
				event.preventDefault();

				var $this = $(this);
				var uniqueID = new Date().valueOf();
				var editorIcon = $(this).find('i').attr('class');
				var controlsHtml = `<span class="whb-controls">
										<span class="whb-tooltip tooltip-on-top" data-tooltip="Copy to Clipboard">
											<i class="whb-control whb-copy-btn ti-files"></i>
										</span>
										<span class="whb-tooltip tooltip-on-top" data-tooltip="Settings">
											<i class="whb-control whb-edit-btn sl-pencil"></i>
										</span>
										<span class="whb-tooltip tooltip-on-top" data-tooltip="Hide">
											<i class="whb-control whb-hide-btn ti-eye"></i>
										</span>
										<span class="whb-tooltip tooltip-on-top" data-tooltip="Remove">
											<i class="whb-control whb-delete-btn ti-close"></i>
										</span>
									</span>`;

				if ($this.closest('.whb-elements-item').hasClass('whb-clipboard-item')) {
					var $elem = $this.parent();
					var elemName = $elem.data('element');
					var elemUniqueID = $elem.data('unique-id').toString();
					var elemID = elemName + '_' + elemUniqueID;
					var newElem = elemName + '_' + uniqueID;

					for (const key in components) {
						if (components.hasOwnProperty(key)) {
							const element = $.extend(true, {}, components[key]);
							if (elemID == key) {
								components[newElem] = element;
							}
						}
					}

					$currentElement = $clipboardElem.clone().removeClass('w-col-sm-4').attr({
						'data-unique-id': uniqueID
					}).prepend(controlsHtml);
				} else {
					$currentElement = $this.parent().clone().removeClass('w-col-sm-4').attr({
						'data-unique-id': uniqueID,
						'data-hidden_element': false,
						'data-editor_icon': editorIcon
					}).prepend(controlsHtml);
				}

				$wrap.find('.whb-columns[data-columns="' + currentRow + '"]').find('.whb-col.col-' + currentCell).find('.whb-elements-place').append($currentElement);
				$wrap.find('.whb-modal-wrap').hide();
				whbElementSettings($currentElement, currentPanel, true);
			});


			/**
			 * Header Builder - Copy Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 * @event	Click
			 */
			$wrap.on('click', '.whb-copy-btn', function (event) {
				event.preventDefault();

				var $elem = $(this).closest('.whb-elements-item').clone();

				$clipboardElem = $elem.clone();

				// Remove all clipboard item
				$('.whb-clipboard-item').remove();

				// Create new clipboard item
				$elem.removeClass('ui-sortable-handle').addClass('w-col-sm-4 whb-clipboard-item');
				$elem.children('.whb-controls').remove().end().children('img').remove();
				$elem.children('a').css({
					'display': 'block',
					'background-color': '#e3e3e3'
				});
				$elem.find('i').removeClass('ti-control-record').addClass('ti-clipboard').css('color', '#f60');
				$elem.find('.whb-element-name').text('Paste (Clipboard)');

				// Append clipboard item to elements box
				$('.whb-modal-wrap.whb-elements').find('.whb-modal-contents').prepend($elem);
			});


			/**
			 * Header Builder - Delete Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 * @event	Click
			 */
			$wrap.on('click', '.whb-delete-btn', function (event) {
				event.preventDefault();

				if (confirm('Press OK to delete element, Cancel to leave')) {
					var $elem = $(this).closest('.whb-elements-item');
					var elemName = $elem.data('element');
					var elemUniqueID = $elem.data('unique-id').toString();
					var elemID = elemName + '_' + elemUniqueID;

					currentPanel = $elem.closest('.whb-tab-panel').attr('id'); // desktop-view, tablets-view, mobiles-view, sticky-view
					currentRow = $elem.closest('.whb-columns').attr('data-columns'); // topbar, row1, row2, row3
					currentCell = $elem.closest('.whb-col').attr('data-align-col'); // left, center, right

					// delete from components
					delete components[elemID];

					// delete from editor components
					if (currentPanel == 'sticky-view') {
						var cell = editorComponents[currentPanel][currentRow][currentCell];

						for (var i = 0; i < cell.length; i++) {
							if (cell[i].uniqueId == elemUniqueID) {
								cell.splice(i, 1);
							}
						}
					} else {
						for (var platform_key in platforms) {
							var findInCell = false;
							var panel = editorComponents[platform_key];

							(function () {
								for (var rowKey in panel) {
									var row = panel[rowKey];

									for (var cell_key in row) {
										var cell = row[cell_key];

										for (var i = 0; i < cell.length; i++) {
											if (cell[i].uniqueId == elemUniqueID) {
												cell.splice(i, 1);
												return; // return to anonymous function
											}
										}
									}
								}
							})();
						}
					}

					whbCreateFrontendComponents();
					whbSaveAllData();
					whbDebug();

					$wrap.find('.whb-elements-item[data-element="' + elemName + '"][data-unique-id="' + elemUniqueID + '"]').remove();
				}
			});


			/**
			 * Header Builder - Edit Button
			 *
			 * @author	WEBNUS
			 * @version	1.0.0
			 * @event	Click
			 */
			$wrap.on('click', '.whb-edit-btn', function (event) {
				event.preventDefault();

				var $this = $(this);

				$wrap.find('.whb-modal-wrap').hide();
				$wrap.find('.whb-modal-wrap[data-element-target]').remove();
				$currentElement = $this.closest('.whb-elements-item');
				currentPanel = $this.closest('.whb-tab-panel').attr('id');
				whbElementSettings($currentElement, currentPanel);
			});


			/**
			 * Header Builder - Hidden Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 * @event	Click
			 */
			// row
			$wrap
				.find('.whb-tabs-panels').find('.whb-columns')
				.children('.whb-elements-item[data-hidden_element="true"]')
				.find('i.whb-hide-btn').removeClass('ti-eye').addClass('wn-far wn-fa-eye-slash')
				.closest('.whb-columns').addClass('whb-columns-hidden').css('opacity', '0.45');

			// elements
			$wrap
				.find('.whb-elements-place').find('.whb-elements-item[data-hidden_element="true"]')
				.find('i.whb-hide-btn').removeClass('ti-eye').addClass('wn-far wn-fa-eye-slash');

			$wrap.on('click', '.whb-hide-btn', function (event) {
				event.preventDefault();

				// Get variables
				var $this = $(this);
				var $elem = $this.closest('.whb-elements-item');
				var elemName = $elem.data('element');
				var elemUniqueID = $elem.data('unique-id').toString();
				var elemID = elemName + '_' + elemUniqueID;
				var hidden_element;
				var mustBeHidden;

				// Position of the Current Element
				currentPanel = $elem.closest('.whb-tab-panel').attr('id'); // desktop-view, tablets-view, mobiles-view, sticky-view
				currentRow = $elem.closest('.whb-columns').attr('data-columns'); // topbar, row1, row2, row3
				currentCell = $elem.closest('.whb-col').attr('data-align-col'); // left, center, right

				if (elemName == 'header-area' || elemName == 'sticky-area') {
					// Toggle hidden_element value : ( true | false )
					var hidden_element = editorComponents[currentPanel][currentRow]['settings']['hidden_element'];
					editorComponents[currentPanel][currentRow]['settings']['hidden_element'] = !hidden_element;
					mustBeHidden = !hidden_element;
					$elem.attr('data-hidden_element', !hidden_element).data('hidden_element', !hidden_element);

					// Change row opacity and eye icon
					var $row = $elem.closest('.whb-columns');
					if (mustBeHidden) {
						$this.removeClass('ti-eye').addClass('wn-far wn-fa-eye-slash');
						$row.addClass('whb-columns-hidden').css('opacity', '0.45');
					} else {
						$this.removeClass('wn-far wn-fa-eye-slash').addClass('ti-eye');
						$row.removeClass('whb-columns-hidden').css('opacity', '1');
					}
				} else {
					// Toggle hidden_element value : ( true | false )
					const cell = editorComponents[currentPanel][currentRow][currentCell];
					for (var i = 0; i < cell.length; i++) {
						var element = cell[i];
						if (element.uniqueId == elemUniqueID) {

							element.hidden_element = !element.hidden_element;
							mustBeHidden = element.hidden_element;
							$elem.attr('data-hidden_element', element.hidden_element).data('hidden_element', element.hidden_element);
							break;
						}
					}

					// Change row opacity and eye icon
					if (mustBeHidden) {
						$this.removeClass('ti-eye').addClass('wn-far wn-fa-eye-slash');
						$elem.find('a').css('color', '#888');
						$elem.addClass('whb-columns-hidden').css('opacity', '0.45');
					} else {
						$this.removeClass('wn-far wn-fa-eye-slash').addClass('ti-eye');
						$elem.find('a').css('color', '#0073aa');
						$elem.removeClass('whb-columns-hidden').css('opacity', '1');
					}
				}

				whbCreateFrontendComponents();
				whbSaveAllData();
				whbDebug();
			});


			/**
			 * Header Builder - Save Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 * @event	Click
			 */
			$wrap.on('click', '.whb_save', function (event) {
				event.preventDefault();

				var $save_btn = $(this);
				var elemName = $currentElement.data('element');
				var elemUniqueID = $currentElement.data('unique-id');
				var elemID = elemName + '_' + elemUniqueID;

				// Set field value
				$currentModalEdit.find('.whb-field').each(function () {
					var $this = $(this);
					var $fieldInput = $this.find('.whb-field-input');
					var fieldName = $fieldInput.data('field-name');
					var fieldValue = $fieldInput.val();

					if (fieldValue == '') {
						if (components[elemID].hasOwnProperty(fieldName)) {
							components[elemID][fieldName] = fieldValue;
						}
					} else {
						if (fieldValue != undefined) {
							if (typeof fieldValue == 'string' && fieldValue.indexOf('"') != -1) {
								fieldValue = fieldValue.replace(/"/g, "'");
							}
							components[elemID][fieldName] = fieldValue;
						}
					}
				});

				whbCreateFrontendComponents();
				whbSaveAllData();
				whbDebug();

				// Copy element in all platforms
				var currentElemHtml = $currentElement[0].outerHTML;
				var $currentElements = $wrap.find('.whb-elements-item[data-element="' + elemName + '"][data-unique-id="' + elemUniqueID + '"]');
				$currentElements.each(function () {
					$(this).replaceWith(currentElemHtml);
				});

				// Create preview for text and image field in editor
				$currentElements = $wrap.find('.whb-elements-item[data-element="' + elemName + '"][data-unique-id="' + elemUniqueID + '"]');
				$currentModalEdit.find('.whb-field.whb-placeholder').each(function () {
					var $this = $(this);

					if ($this.hasClass('whb-img-placeholder')) {
						var imageID = $this.find('.whb-field-input').val();

						if (imageID) {
							wp.media.attachment(imageID).fetch().done(function () {
								if (!$currentElements.children('.whb-img-placeholder-el').length > 0) {
									$currentElements.attr('data-img-placeholder', imageID).children('a').hide().after('<img class="whb-img-placeholder-el" src="' + this.attributes.url + '" alt="" />');
								} else {
									$currentElements.children('.whb-img-placeholder-el').attr('src', this.attributes.url);
								}
							});
						} else {
							$currentElements.removeAttr('data-img-placeholder').children('a').show().end().children('.whb-img-placeholder-el').remove();
						}
					}

					if ($this.hasClass('whb-text-placeholder')) {
						var textValue = $this.find('.whb-field-input').val();

						if (textValue.trim()) {
							if (!$currentElements.find('a').find('.whb-text-placeholder-el').length > 0) {
								$currentElements.find('a').find('.whb-element-name').hide().after('<span class="whb-text-placeholder-el">' + textValue + '</span>');
							} else {
								$currentElements.find('a').find('.whb-text-placeholder-el').html(textValue);
							}
						} else {
							$currentElements.find('a').find('span.whb-element-name').show().end().end().find('.whb-text-placeholder-el').remove();
						}
					}
				});

				// Hide modal
				if (!whbIsFrontendBuilder()) {
					$wrap.find('.whb-modal-wrap').hide();
					$wrap.find('.whb-modal-wrap[data-element-target]').remove();
				}
			});


			/**
			 * Header Builder - Element Settings Function
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			function whbElementSettings($currentElement, currentPanel, new_el = false) {
				var elemName = $currentElement.attr('data-element');
				var elemUniqueID = $currentElement.attr('data-unique-id');
				var elemID = elemName + '_' + elemUniqueID;

				if (!components.hasOwnProperty(elemID)) {
					components[elemID] = {};
				}

				// Preloader
				if (!$wrap.children('.whb-spinner-wrap').length > 0) {
					$wrap.prepend('<div class="whb-spinner-wrap"><div class="whb-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
				}

				$.ajax({
					type: 'POST',
					url: whb_localize.ajaxurl,
					data: {
						action: 'whb_get_component_fields',
						el_name: elemName,
						nonce: whb_localize.nonce
					},
					success: function (data) {
						if ($wrap.children('.whb-spinner-wrap').length > 0) {
							$wrap.children('.whb-spinner-wrap').remove();
						}

						$('.wn-header-builder-wrap').append(data);

						$currentModalEdit = $wrap.find('.whb-modal-wrap[data-element-target="' + elemName + '"]');

						// Init tab
						$currentModalEdit.find('.whb-tabs-list').find('li').removeClass('w-active');
						$currentModalEdit.find('.whb-tab-panel').hide();
						$currentModalEdit.find('.whb-tabs-list').find('li:first').addClass('w-active');
						$currentModalEdit.find('.whb-modal-contents').children('.whb-tab-panel:first').show();
						// Styling tab
						var $tabPanels = $currentModalEdit.find('.whb-modal-contents').children('.whb-tab-panel');
						if (currentPanel == 'desktop-view') {
							$tabPanels.find('.whb-tab-panel[data-id="#all"]').show();
						} else if (currentPanel == 'tablets-view') {
							$tabPanels.find('.whb-tab-panel[data-id="#tablets"]').show();
						} else if (currentPanel == 'mobiles-view') {
							$tabPanels.find('.whb-tab-panel[data-id="#mobiles"]').show();
						} else if (currentPanel == 'sticky-view') {
							$tabPanels.find('.whb-tab-panel[data-id="#all"]').show();
						}
						// Show first panel
						$tabPanels.find('.whb-tab-panel').find('.whb-tab-panel:first').show();

						// Show current modal edit
						$currentModalEdit.show();

						// Set fields values
						$currentModalEdit.find('.whb-field').each(function () {
							var $this = $(this);
							var $fieldInput = $this.find('.whb-field-input');
							var fieldName = $fieldInput.data('field-name');
							var fieldStd = $fieldInput.data('field-std');

							fieldStd = (typeof fieldStd != 'undefined') ? fieldStd : '';

							// if statement: update field value
							// else statement: set default data to field
							if ($fieldInput.hasClass('whb-field-textarea')) {
								$fieldInput.val(components[elemID][fieldName]).val( components[elemID][fieldName]);
							} else if (typeof components[elemID][fieldName] != 'undefined') {
								$fieldInput.val(components[elemID][fieldName]);
							} else {
								$fieldInput.val(fieldStd).val(fieldStd);
								if (fieldStd) {
									components[elemID][fieldName] = fieldStd;
								}
							}
						});

						if (new_el) {
							var elemEditorIcon = $currentElement.find('a').find('i').attr('class');
							if (currentPanel == 'sticky-view') {
								editorComponents[currentPanel][currentRow][currentCell].push({
									name: elemName,
									uniqueId: elemUniqueID,
									hidden_element: false,
									editor_icon: elemEditorIcon
								});
							} else {
								for (var platform_key in platforms) {
									editorComponents[platform_key][currentRow][currentCell].push({
										name: elemName,
										uniqueId: elemUniqueID,
										hidden_element: false,
										editor_icon: elemEditorIcon
									});
								}
							}
						}

						// Fields
						whbFields();

						// Dependency
						$currentModalEdit.find('.whb-dependency').on('change', function () {
							whbFieldDependency($(this));
						});
						$currentModalEdit.find('.whb-dependency').trigger('change');

						// Craete|Update element in all platforms (desktop, tablets, mobiles)
						if (new_el) {
							var currentElemHtml = $currentElement[0].outerHTML;
							$('.whb-elements-item[data-element="' + elemName + '"][data-unique-id="' + elemUniqueID + '"]').each(function () {
								$(this).replaceWith(currentElemHtml);
							});
						}

						whbModalDraggable($currentModalEdit[0]);
					}
				});

				whbDebug();
			}


			/**
			 * Header Builder - Field Dependency Function
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			function whbFieldDependency($parent) {
				var dependencyData = $parent.data('dependency');
				var parentValue = $parent.find('.whb-field-input').val();

				$.each(dependencyData, function (val, els) {
					for (var i = 0; i < els.length; i++) {

						var $elem = $currentModalEdit.find('.whb-field-input[data-field-name="' + els[i] + '"]').closest('.whb-field').hide();
						var haveDependency = $elem.attr('class') == 'whb-field w-col-sm-12 whb-dependency' ? true : false;

						if (val == parentValue) {
							$elem.show();
							if (haveDependency) {
								whbFieldDependency($el);
							}
						} else {
							if (haveDependency) {
								$.each($elem.data('dependency'), function (elem_value, elems) {
									for (var i = 0; i < elems.length; i++) {
										$currentModalEdit.find('.whb-field-input[data-field-name="' + elems[i] + '"]').closest('.whb-field').hide();
									}
								});
							}
						}
					} // end for
				});
			}


			/**
			 * Header Builder - Fields Function
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			function whbFields() {
				var $modalWrap = $('.whb-modal-wrap');

				// Switcher field
				$modalWrap.find('.whb-switcher').find('.whb-field-input').on('change', function () {
					var $this = $(this);

					if ($this.is(':checked')) {
						$this.attr('value', 'true');
						$this.attr('checked', 'checked');
					} else {
						$this.attr('value', 'false');
						$this.removeAttr('checked');
					}
				});

				// Attach Image field
				$modalWrap.find('.whb-attach-image').each(function () {
					var frame;
					var $this = $(this);
					var $addImgLink = $this.find('.whb-add-image');
					var $delImgLink = $this.find('.whb-remove-image');
					var $imgContainer = $this.find('.whb-preview-image');

					// ADD IMAGE LINK
					$addImgLink.on('click', function (event) {
						event.preventDefault();

						var $imgIdInput = $this.find('input.whb-attach-image');
						var value = $imgIdInput.val();

						value = value ? value : '';

						// If the media frame already exists, reopen it.
						if (frame) {
							frame.open();
							return;
						}

						// Create a new media frame
						frame = wp.media({
							multiple: false // Set to true to allow multiple files to be selected
						});

						// When an image is selected in the media frame...
						frame.on('select', function () {
							// Get media attachment details from the frame state
							var attachment = frame.state().get('selection').first().toJSON();

							// Send the attachment URL to our custom image input field.
							$imgContainer.html('').append('<img src="' + attachment.url + '" alt="">').css('display', 'block');

							// Send the attachment id to our hidden input
							$imgIdInput.val(attachment.id).trigger('input');

							// Unhide the remove image link
							$delImgLink.show();
						});

						// Finally, open the modal on click
						frame.open();
					});

					// Delete image link
					$delImgLink.on('click', function (event) {
						event.preventDefault();

						var $imgIdInput = $this.find('input.whb-attach-image');

						// Clear out the preview image
						$imgContainer.html('').hide();

						// Hide the delete image link
						$delImgLink.hide();

						// Delete the image id from the hidden input
						$imgIdInput.attr('value', '').trigger('input');
					});
				});

				// Number Unit field
				$modalWrap.find('.whb-number-unit').each(function () {
					var $numberUnit = $(this);
					var $inputNumber = $numberUnit.find('input[type="number"]');
					var $option = $numberUnit.find('.whb-opts').children('span');
					var $fieldInput = $numberUnit.find('.whb-field-input');

					$option.on('click', function (event) {
						event.preventDefault();

						var $this = $(this);
						var unit = $this.data('value');
						var num_val = $inputNumber.val();

						$option.removeClass('whb-active');
						$this.addClass('whb-active');
						if (num_val) {
							$fieldInput.attr('value', num_val + unit).trigger('input');
						}
					});

					$inputNumber.on('change', function (event) {
						event.preventDefault();

						var $this = $(this);
						var unit = $numberUnit.find('.whb-opts').children('span.whb-active').data('value');
						var num_val = $inputNumber.val();

						if (num_val) {
							$fieldInput.attr('value', num_val + unit).trigger('input');
						} else {
							$fieldInput.attr('value', '').trigger('input');
						}
					});
				});

				// Custom Select field
				$modalWrap.find('.whb-custom-select').find('.whb-opts').find('span').on('click', function () {
					var $this = $(this);
					var $customSelect = $this.closest('.whb-custom-select');
					var $option = $customSelect.find('.whb-opts').children('span');
					var $fieldInput = $customSelect.find('.whb-field-input');
					var value = $this.data('value');

					$option.removeClass('whb-active');
					$this.addClass('whb-active');
					$fieldInput.val( value ).trigger('input');
				});

				// Icons field
				$modalWrap.find('.whb-field-icons-wrap').each(function () {
					var $iconsWrap = $(this);
					var $icon = $iconsWrap.find('.wn-icon').find('label');
					var $fieldInput = $iconsWrap.find('.whb-field-input');

					$icon.on('click', function (event) {
						event.preventDefault();

						var $this = $(this);
						var $iconClass = $this.attr('for');

						$icon.removeClass('whb-active');
						$this.addClass('whb-active');
						$fieldInput.attr('value', $iconClass).trigger('input');
					});
				});

				// Color picker
				$modalWrap.find('.whb-color-picker').wpColorPicker();


				/**
				 * Header Builder - Set Value of Field
				 * @version	1.0.0
				 */
				$modalWrap.find('.whb-field').find('.whb-field-input').each(function () {
					var $fieldInput = $(this);

					// Switcher
					if ($fieldInput.hasClass('whb-switcher-field')) {
						if ($fieldInput.val() == 'true') {
							$fieldInput.attr('checked', 'checked').trigger('input');
						} else {
							$fieldInput.removeAttr('checked');
						}
					}

					// Custom Select
					if ($fieldInput.hasClass('whb-field-custom-select')) {
						$fieldInput.siblings('.whb-opts').find('span').each(function () {
							var $this = $(this);
							$this.removeClass('whb-active');
							if ($this.data('value') == $fieldInput.val()) {
								$this.addClass('whb-active');
							}
						});
					}

					// Number Unit
					if ($fieldInput.hasClass('whb-field-number-unit')) {
						var value = $fieldInput.val();

						if (value) {
							var $numberUnit = $fieldInput.closest('.whb-number-unit');
							var $inputNumber = $numberUnit.find('input[type="number"]');
							var $option = $numberUnit.find('.whb-opts').children('span');
							var numberValue = parseFloat(value);
							var valueUnit = value.split(numberValue)[1];

							$inputNumber.val(numberValue).trigger('input');
							$option.each(function () {
								var $this = $(this);
								var unit = $this.data('value');

								$this.removeClass('whb-active');
								if (unit == valueUnit) {
									$this.addClass('whb-active');
								}
							});
						} else {
							$fieldInput.closest('.whb-number-unit').find('input[type="number"]').val('');
						}
					}

					// Icon
					if ($fieldInput.hasClass('whb-icon-field')) {
						var value = $fieldInput.val();
						var $iconsWrap = $fieldInput.closest('.whb-field-icons-wrap');
						var $icon = $iconsWrap.find('.wn-icon').find('label');

						if (value) {
							$icon.removeClass('whb-active');
							$iconsWrap.find('.wn-icon').find('label[for="' + value + '"]').addClass('whb-active');
						} else {
							$icon.removeClass('whb-active');
						}
					}

					// Attach Image
					if ($fieldInput.hasClass('whb-attach-image')) {
						var val = $fieldInput.val();
						var $delImgLink = $fieldInput.siblings('.whb-remove-image');
						var $imgContainer = $fieldInput.siblings('.whb-preview-image');

						if (val && !wp.media.attachment(val).destroyed) {
							if (!$currentModalEdit.find('.whb-modal-contents').find('.whb-spinner-wrap').length > 0) {
								$currentModalEdit.find('.whb-modal-contents').prepend('<div class="whb-spinner-wrap"><div class="whb-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
							}

							wp.media.attachment(val).fetch().always(function () {
								if ($currentModalEdit.find('.whb-modal-contents').find('.whb-spinner-wrap').length > 0) {
									$currentModalEdit.find('.whb-modal-contents').find('.whb-spinner-wrap').remove();
								}
								$imgContainer.html('')
								if (this.attributes.url != undefined) {
									// Send the attachment URL to our custom image input field.
									$imgContainer.append('<img src="' + this.attributes.url + '" alt="">').css('display', 'block');
									// Unhide the remove image link
									$delImgLink.show();
								}
							});
						} else {
							// Clear out the preview image
							$imgContainer.html('').hide();
							// Hide the delete image link
							$delImgLink.hide();
						}
					}
				});
			}


			/**
			 * Header Builder - Drag and Drop Functions
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			// Editor draggable
			function whbEditorDraggable() {
				$sortablePlaces.sortable({
					connectWith: '.whb-elements-place',
					placeholder: 'ui-sortable-placeholder',
					forcePlaceholderSize: true,
					tolerance: 'pointer',
					start: function (event, ui) {
						var $elem = $(ui.item);

						currentPanel = $elem.closest('.whb-tab-panel').attr('id'); // desktop-view, tablets-view, mobiles-view, sticky-view
						currentRow = $elem.closest('.whb-columns').attr('data-columns'); // topbar, row1, row2, row3
						currentCell = $elem.closest('.whb-col').attr('data-align-col'); // left, center, right
					},
					beforeStop: function (event, ui) {
						var $elem = $(ui.item);
						var $els_place = $elem.closest('.whb-elements-place');
						var elemName = $elem.data('element');
						var elemUniqueID = $elem.data('unique-id').toString();
						var elemID = elemName + '_' + elemUniqueID;
						var elemFromCell;

						// Remove element from start cell
						var start_cell_obj = editorComponents[currentPanel][currentRow][currentCell];
						for (var i = 0; i < start_cell_obj.length; i++) {
							if (start_cell_obj[i].uniqueId == elemUniqueID) {
								elemFromCell = start_cell_obj.splice(i, 1);
							}
						}

						// Add element to received cell
						currentRow = $elem.closest('.whb-columns').attr('data-columns'); // topbar, row1, row2, row3
						currentCell = $elem.closest('.whb-col').attr('data-align-col'); // left, center, right
						var new_cell_objs = $els_place.children('.whb-elements-item').map(function (i, el) {
							$elem = $(el);
							return {
								name: $elem.data('element'),
								uniqueId: $elem.data('unique-id').toString(),
								hidden_element: JSON.parse($elem.data('hidden_element')),
								editor_icon: $elem.data('editor_icon'),
							};
						}).get();

						// Update editor components
						editorComponents[currentPanel][currentRow][currentCell] = new_cell_objs;

						whbCreateFrontendComponents();
						whbSaveAllData();
						whbDebug();
					}
				}).disableSelection();
			}
			whbEditorDraggable();

			// Modal draggable
			function whbModalDraggable(element) {
				var pos1 = 0,
					pos2 = 0,
					pos3 = 0,
					pos4 = 0;

				if (element.getElementsByClassName('whb-modal-header')) {
					element.getElementsByClassName('whb-modal-header')[0].onmousedown = whb_drag_mouse_down;
				} else {
					element.onmousedown = whb_drag_mouse_down;
				}

				function whb_drag_mouse_down(e) {
					e = e || window.event;
					pos3 = e.clientX;
					pos4 = e.clientY;
					document.onmouseup = whbCloseModalDraggable;
					document.onmousemove = whbElementDrag;
				}

				function whbElementDrag(e) {
					e = e || window.event;
					pos1 = pos3 - e.clientX;
					pos2 = pos4 - e.clientY;
					pos3 = e.clientX;
					pos4 = e.clientY;
					element.style.top = (element.offsetTop - pos2) + "px";
					element.style.left = (element.offsetLeft - pos1) + "px";
				}

				function whbCloseModalDraggable() {
					document.onmouseup = null;
					document.onmousemove = null;
				}
			}
			whbModalDraggable($('.whb-modal-wrap')[0]);


			/**
			 * Header Builder - Publish Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			$('.redux-action_bar input[name="redux_save"], #whb-publish').on('click', function (e) {
				e.preventDefault();
				// Editor Preloader
				if ($wrap.children('.whb-spinner-wrap').length == 0) {
					$wrap.prepend('<div class="whb-spinner-wrap"><div class="whb-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
				}

				// Frontend Preloader
				var $WHBFrontend = $('#whbIframe').contents().find('#webnus-header-builder');
				// var $WHBFrontend = $('#webnus-header-builder');
				if ($WHBFrontend.children('.whb-spinner-wrap').length == 0) {
					$WHBFrontend.prepend('<div class="whb-spinner-wrap"><div class="whb-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
				}

				$.ajax({
					type: 'POST',
					url: whb_localize.ajaxurl,
					data: {
						action: 'whb_publish',
						nonce: whb_localize.nonce,
						components: JSON.stringify(components),
						editorComponents: JSON.stringify(editorComponents),
						frontendComponents: JSON.stringify(frontendComponents),
					},
					success: function (res) {
						console.log(res);
						// Remove prelaoder
						$wrap.children('.whb-spinner-wrap').remove();
						$WHBFrontend.children('.whb-spinner-wrap').remove();
						if (importButtonFlag) {
							location.reload();
						}
					}
				});
			});


			/**
			 * Header Builder - Collapse Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			$('.whb-action-collapse').on('click', function () {
				var $elem = $(this);
				var $editor = $('.wn-header-builder-wrap.whb-frontend-builder').css('bottom', '-60%');
				var $actions = $('.whb-actions').css('bottom', '0');

				// if: close
				// else: open
				if ($elem.hasClass('whb-open')) {
					$editor.css('bottom', '-60%');
					$actions.css('bottom', '0');
					$elem.removeClass('whb-open')
					$elem.children('i').attr('class', 'ti-arrow-circle-up');
				} else {
					$editor.css('bottom', '0');
					$actions.css('bottom', '60%');
					$elem.addClass('whb-open')
					$elem.children('i').attr('class', 'ti-arrow-circle-down');
				}
			});


			/**
			 * Header Builder - Get Script
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			function whbInjectScriptToIframe(src) {
				var iframeHead = window.frames["whbIframe"].document.getElementsByTagName("head")[0];
				var myScript = document.createElement('script');
				myScript.src = src;
				iframeHead.appendChild(myScript);
			}

			function whbInjectStyleToIframe(styles) {
				var iframeTagStyle = window.frames["whbIframe"].document;
				iframeTagStyle.getElementById('whb-enqueue-dynamic-style').children[0].innerHTML = styles;
			}


			/**
			 * Header Builder - Save All Data Function
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			function whbSaveAllData() {
				var $WHBFrontend = $('#whbIframe').contents().find('#webnus-header-builder');

				// Frontend Preloader
				if ($WHBFrontend.children('.whb-spinner-wrap').length == 0) {
					$WHBFrontend.prepend('<div class="whb-spinner-wrap"><div class="whb-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
				}

				if (whbIsFrontendBuilder()) {
					$('.whb_save').css({
						'background-color': '#4cbf67',
						'box-shadow': '0 3px 10px -3px #4cbf67',
						'border-color': '#4cbf67'
					});
				}

				$.ajax({
					type: 'POST',
					url: whb_localize.ajaxurl,
					data: {
						action: 'whb_save_data',
						nonce: whb_localize.nonce,
						frontendComponents: JSON.stringify(frontendComponents),
					},
					success: function (data) {
						if (whbIsFrontendBuilder()) {
							$('.whb_save').css({
								'background-color': '#07bbe9',
								'box-shadow': '0 3px 10px -3px #07bbe9',
								'border-color': '#07bbe9'
							});

							var $newWHBFrontend = $(data);

							// Frontend Preloader
							if ($newWHBFrontend.children('.whb-spinner-wrap').length == 0) {
								$newWHBFrontend.prepend('<div class="whb-spinner-wrap"><div class="whb-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
							}

							$WHBFrontend[0].outerHTML = $newWHBFrontend[0].outerHTML;
						}

						if (importButtonFlag) {
							$('.redux-action_bar input[name="redux_save"], #whb-publish').trigger('click');
						} else {
							if (whbIsFrontendBuilder()) {
								$.ajax({
									type: 'POST',
									url: whb_localize.ajaxurl,
									data: {
										action: 'whb_live_dynamic_styles',
										nonce: whb_localize.nonce,
									},
									success: function (data) {
										whbInjectStyleToIframe(data);
										$('#whbIframe').contents().find('#webnus-header-builder').children('.whb-spinner-wrap').remove();
									}
								});
							}
						}

						if (whbIsFrontendBuilder()) {
							var path = whb_localize.assets_url + 'src/frontend/';
							var scripts = [
								'whb-jquery-plugins.js',
								'whb-frontend.js',
							];
							whbInjectScriptToIframe(path + scripts[0]);
							whbInjectScriptToIframe(path + scripts[1]);
						}
					}
				});
			}


			/**
			 * Header Builder - Create Frontend Components Function
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			function whbCreateFrontendComponents() {
				frontendComponents = $.extend(true, {}, editorComponents);
				for (var screen_key in frontendComponents) {
					for (var rowKey in frontendComponents[screen_key]) {
						for (var cell_key in frontendComponents[screen_key][rowKey]) {
							var cell = frontendComponents[screen_key][rowKey][cell_key];

							if (cell_key == 'settings') {
								var elemName = cell.element;
								var elemID = cell.uniqueId;
								var component_key = elemName + '_' + elemID;

								if (component_key in components) {
									Object.assign(cell, components[component_key]);
								}
								for (const key in cell) {
									if (cell.hasOwnProperty(key)) {
										const value = cell[key];
										if (key != 'hidden_element' && typeof value === 'boolean') {
											cell[key] = String(value);
										}
									}
								}
							} else {
								if (cell.length != 0) {
									for (var el of cell) {
										var elemName = el.name;
										var elemID = el.uniqueId;
										var component_key = elemName + '_' + elemID;

										if (component_key in components) {
											Object.assign(el, components[component_key]);
										}
										for (const key in el) {
											if (el.hasOwnProperty(key)) {
												const value = el[key];
												if (key != 'hidden_element' && typeof value === 'boolean') {
													el[key] = String(value);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			/**
			 * Header Builder - Import Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			// import button
			$("#whb-import").change(function (e) {
				var file = event.target.files[0];
				var reader = new FileReader();
				reader.onload = onReaderLoad;
				reader.readAsText(file);
			});

			function onReaderLoad(event) {
				whbImport(event.target.result);
			}
			// Import function
			function whbImport(content) {
				if (content && (whbIsJson(content) || whbIsObject(content))) {
					$body.css({
						'height': '1px',
						'overflow': 'hidden'
					}).prepend('<div class="whb-spinner-wrap"><div class="whb-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
					$('#wpwrap').css('display', 'none');
					content = whbIsJson(content) ? JSON.parse(content) : content;
					components = content.whb_data_components;
					editorComponents = content.whb_data_editor_components;
					frontendComponents = content.whb_data_frontend_components;
					importButtonFlag = true;
					whbSaveAllData();
				} else {
					alert('Header import input is empty! That\'s why no data can import.');
				}
			}


			/**
			 * Header Builder - Prebuild Button
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			$wrap.find('.whb-prebuild-item').on('click', function (event) {
				event.preventDefault();
				if (confirm('Your selected header pre-defined will apply on current elements and settings. Are you sure you want to overwrite?')) {
					var fileName = $(this).data('file-name');
					var $modal = $('.whb-full-modal');
					var url = whb_localize.prebuilds_url + fileName;

					$.ajax({
						dataType: "json",
						type: 'POST',
						url: url,
						success: function (data) {
							var content = data;
							whbImport(content);
						}
					});
				}
			});


			/**
			 * Header Builder - Header Type Switcher Button (Vertical|Horizontal)
			 * @author	WEBNUS
			 * @version	1.0.0
			 */
			if (editorComponents['desktop-view']['row1']['settings']['header_type'] == 'vertical') {
				var $panels = $wrap.find('.whb-tabs-panels');
				var $settings = $panels.find('#desktop-view').children('.whb-columns[data-columns="row1"]').children('.whb-elements-item');
				var $headerSwitcher = $('#whb-vertical-header');

				$settings.attr('data-element', 'vertical-area');
				$headerSwitcher.find('span').text('Horizontal Header');
				$panels.addClass('whb-vertical-header-panel');
				$desktopSortablePlaces.sortable({
					axis: 'y'
				});
			}

			$wrap.on('click', '#whb-vertical-header', function (event) {
				event.preventDefault();
				var $this = $(this);
				var $tabs = $('.whb-tabs-list');
				var $panels = $wrap.find('.whb-tabs-panels');
				var $settings = $panels.find('#desktop-view').children('.whb-columns[data-columns="row1"]').children('.whb-elements-item');
				var desktopRow1Settings = editorComponents['desktop-view'].row1.settings;
				var header_type = desktopRow1Settings.header_type;

				if (header_type == 'horizontal') {
					desktopRow1Settings.element = 'vertical-area';
					$settings.attr('data-element', 'vertical-area');
					desktopRow1Settings.header_type = 'vertical';
					$this.find('span').text('Horizontal Header');
					$panels.addClass('whb-vertical-header-panel');
					$desktopSortablePlaces.sortable({
						axis: 'y'
					});
				} else {
					desktopRow1Settings.element = 'header-area';
					$settings.attr('data-element', 'header-area');
					desktopRow1Settings.header_type = 'horizontal';
					$this.find('span').text('Vertical Header');
					$panels.removeClass('whb-vertical-header-panel');
					$desktopSortablePlaces.sortable({
						axis: ''
					});
					$('#wrap').removeClass('whb-header-vertical-toggle');
				}

				whbCreateFrontendComponents();
				whbSaveAllData();
				whbDebug();

				// show desktop panel
				$tabs.find('li').removeClass('w-active');
				$tabs.find('li:first-child').addClass('w-active');
				$('.whb-tab-panel').hide();
				$('#desktop-view').show();
			});

			(function () {
				if ($('.whb-languages').length) {
					$('.whb-languages').niceSelect();
					var $select = $('select.whb-languages');
					$select.change(function () {
						var language = $(this).children("option:selected").val();
						location.replace(window.location.href + '&lang=' + language);
					});
				}
			})();
		});
	}); // end document ready
})(jQuery);