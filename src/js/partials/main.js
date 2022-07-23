/**
 * Функция нужна для бесконечных слайдеров, элементы которых должны открывать fancybox
 *
 * @param mixed sliderSelector ".js-any-slider-init-class" !!!!Обязательно чтобы у слайдера был id
 * @param mixed fancyElementSelector ".js-any-slider-fancy-open-item-class"
 *
 * @return [type]
 */
function initFancyForInfiniteSlick(sliderSelector, fancyElementSelector) {
	$(sliderSelector).each(function () {
		var slider = $(this);
		var sliderId = slider.attr('id');
		if (sliderId && sliderId.length > 0) {
			var selector = '#' + sliderId + ' .slick-slide:not(.slick-cloned)';
			// Init fancybox, skip cloned elements
			$().fancybox({
				selector: selector,
				autoFocus: false,
				backFocus: false
			});

			// Custom click event on cloned elements,
			$(document).on('click', '#' + sliderId + ' .slick-cloned', function (e) {
				$(selector)
					.eq(($(this).attr("data-slick-index") || 0) % $(selector).length)
					.trigger("click.fb-start", { $trigger: $(this) });
				return false;
			});
		}
		else {
			console.log('error slider has no id. Fansybox in this slider not work');
		}
	});
}

$(document).ready(function () {
	$(".js-phone-mask").each(function () {
		var maskOptions = {
			mask: '+{7}(000)000-00-00',
			lazy: false,
			overwrite: true
		};
		var mask = IMask($(this)[0], maskOptions);
	});

	$(".js-phone-mask-lazy").each(function () {
		var maskOptions = {
			mask: '+{7}(000)000-00-00',
			lazy: true,
			overwrite: true
		};
		var mask = IMask($(this)[0], maskOptions);
	});


	// $("input[name='phone']").mask(" +7 (999) 999-99-99");

	$('.js-sort-control').click(function () {
		$(this).toggleClass('catalog-sort__control--opened')
	});

	$('.js-sort-item').click(function () {
		var thisItem = $(this);
		var itemsParent = thisItem.closest('.catalog-sort__content');
		var thisItemDirection = thisItem.find('.sort-item__inp-direction');
		var currentItemChecked = thisItemDirection.is(':checked');
		var filterDirection = $('.js-catalog-sort__direction');
		var filterName = $('.js-catalog-sort__name');


		if (itemsParent.find('.sort-item__inp-type:checked').length > 0) {
			itemsParent.find('.sort-item__inp-direction').prop('checked', true);
			itemsParent.find('.sort-item__inp-type').prop('checked', null);
			if (currentItemChecked) {
				thisItemDirection.prop('checked', null);
				thisItem.find('.sort-item__inp-type').prop('checked', true);
				filterDirection.attr('data-status', 'desc');
			}
			else {
				thisItemDirection.prop('checked', true);
				thisItem.find('.sort-item__inp-type').prop('checked', true);
				filterDirection.attr('data-status', 'asc');
			}
		}
		else {
			thisItem.find('.sort-item__inp-type').prop('checked', true);
			filterDirection.attr('data-status', 'asc');
		}

		filterDirection.attr('data-index', thisItem.index());
		filterName.html(thisItem.find('.sort-item__name').html());
		$('.js-sort-control').removeClass('catalog-sort__control--opened');
	});

	$('[data-fancybox]').fancybox({
		autoFocus: false,
		backFocus: false
	});


	$(".js-project-slider").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		dots: true
	});
	initFancyForInfiniteSlick(".js-project-slider", ".js-project-slider-fancy-item")

	$('.js-schemes-control').click(function () {
		var control = $(this),
			section = control.closest('.schemes-section'),
			fullBlock = section.find('.schemes-full-block'),
			fbItems = fullBlock.find('.schemes-full-item'),
			allControls = section.find('.schemes-control');

		if (!control.hasClass('schemes-control--active')) {
			var indexOfFullPic = parseInt(control.attr('data-index-of-full'));
			fbItems.removeClass('schemes-full-item--active');
			fbItems.eq(indexOfFullPic).addClass('schemes-full-item--active');

			if (allControls.filter('.schemes-control--active').length > 0) {
				allControls.removeClass('schemes-control--active');
			}
			else {
				fullBlock.slideDown(600);
			}
			control.addClass('schemes-control--active');
		}
		else {
			control.removeClass('schemes-control--active');
			fullBlock.slideUp(600);
			fbItems.removeClass('schemes-full-item--active');
		}
	});

	$('.js-accordion-control').on('click', function () {
		if (!$(this).hasClass('accordion-control--active')) {
			$(this).addClass('accordion-control--active');
			$(this).next('.accordion-content').stop(true).slideDown(600);
		}
		else {
			$(this).removeClass('accordion-control--active')
			$(this).next('.accordion-content').stop(true).slideUp(600);

		}
	});

	$('.js-video-play-btn').click(function () {
		var video = $(this).closest('.video');
		var videoInner = video.find('.video__inner');
		var videoType = videoInner.attr('data-type');
		var videoSrc = videoInner.attr('data-src');

		if (!video.hasClass('video--activated')) {
			switch (videoType) {
				case 'mp4':
					videoInner.append('<video id="video" src="' + videoSrc + '" allow="autoplay; fullscreen" controls></video>');
					videoInner.find('video')[0].play();
					break;
				case 'youtube':
					videoInner.append('<iframe src="' + videoSrc + '" allow="autoplay; fullscreen" ></iframe>');

					videoInner.find('iframe')[0].src += "?autoplay=1";
					break;
			}
			video.addClass('video--activated');
		}
	});

	$('.js-tech-tab-controller').on('click', function () {
		var $this = $(this),
			idx = parseInt($this.attr('data-idx')),
			target = $($this.attr('data-target')),
			activeTab = target.find('.tech-info-tab--active');

		if (activeTab.length > 0) {
			if (activeTab.index() !== idx) {
				activeTab.attr('style', '').removeClass('tech-info-tab--active');
				target.find('.tech-info-tab').eq(idx).addClass('tech-info-tab--active');
				$("html, body").stop().animate({ scrollTop: (target.offset().top - $('.site-header').outerHeight()) }, 500, 'swing', function () { });
			}
		}
		else {
			target.find('.tech-info-tab').eq(idx).slideDown(300, function () {
				$(this).addClass('tech-info-tab--active');
				$("html, body").stop().animate({ scrollTop: (target.offset().top - $('.site-header').outerHeight()) }, 500, 'swing', function () { });

			});
		}


	});


	//javascript:history.back()
	/*$('.js-matselect-scroller').each(function () {
		var slider = $(this).slick({
			variableWidth: true,
			arrows: false,
			slidesToScroll: 3,
			infinite: false
		});
		slider.on('wheel', (function (e) {
			e.preventDefault();

			clearTimeout(scroll);
			scroll = setTimeout(function(){scrollCount=0;}, 200);
			if(scrollCount) return 0;
			scrollCount=1;

			if (e.originalEvent.deltaY < 0) {
				$(this).slick('slickNext');
			} else {
				$(this).slick('slickPrev');
			}
		}));
	});*/
	$('.js-matselect-scroller').each(function () {
		var simpleBar = new SimpleBar($(this)[0], {

		});
		var scrollCount;
		$(this).on('wheel', (function (e) {
			e.preventDefault();

			/*clearTimeout(scroll);
			scroll = setTimeout(function () { scrollCount = 0; }, 200);
			if (scrollCount) return 0;
			scrollCount = 1;*/
			var deltaY = -e.originalEvent.wheelDelta * 3;

			var elementToScroll = simpleBar.getScrollElement();
			/*elementToScroll.scrollTo({left: deltaY > 0 ? elementToScroll.scrollLeft + deltaY : elementToScroll.scrollLeft - deltaY, behavior: 'smooth'});*/

			$(elementToScroll).stop(true).animate({
				scrollLeft: (elementToScroll.scrollLeft + deltaY)
			}, 500);
		}));

	});

	$('.js-matselect-tabs-control').on('click', function () {
		var $this = $(this),
			idx = parseInt($this.attr('data-idx')),
			dataTarget = $this.attr('data-target'),
			target = $(dataTarget),
			activeTab = target.find('.matselect-tabs__tab--active');



		if ($(this).hasClass('matselect-tabs-control')) {
			$(this).addClass('matselect-tabs-control--active').siblings().removeClass('matselect-tabs-control--active');
		}
		else {
			$('.matselect-tabs-control[data-idx="' + idx + '"][data-target="' + dataTarget + '"]').addClass('matselect-tabs-control--active').siblings().removeClass('matselect-tabs-control--active');

			$("html, body").stop().animate({ scrollTop: (target.closest('.matselect-tabs-section').offset().top - $('.site-header').outerHeight()) }, 500, 'swing', function () { });
		}

		if (activeTab.index() !== idx) {
			activeTab.attr('style', '').removeClass('matselect-tabs__tab--active');
			target.find('.matselect-tabs__tab').eq(idx).addClass('matselect-tabs__tab--active');
		}

	});


	$('.js-matselect-btn--next-step').on('click', function () {
		var activeStep = $('.material-selections-step--active');
		$("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing', function () {
			activeStep.removeClass('material-selections-step--active').next().addClass('material-selections-step--active');
		});

	});

	$('.js-matselect-btn--prev-step').on('click', function () {

		var $this = $(this),
			activeStep = $('.material-selections-step--active'),
			prevStep = activeStep.prev('.material-selections-step');
		if (prevStep.length > 0) {
			$("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing', function () {
				activeStep.removeClass('material-selections-step--active');
				prevStep.addClass('material-selections-step--active');
			});

		}
		else {
			history.back();
		}
	});



	$('.js-filter-select').each(function (index) {
		var placeholder = $(this).attr('data-placeholder');
		if (placeholder.length > 0) {
			$(this).addClass('filter-select--placeholder-selected');
		}

		$(this).select2({
			language: 'ru',
			theme: 'custom-theme',
			minimumResultsForSearch: Infinity,
			width: '100%',
			dropdownParent: $(this).siblings('.filter-select-items-wrapper')
		}).on('select2:open', function (e) {
			$(this).siblings('.filter-select-items-wrapper').addClass('filter-select-items-wrapper--show');
		}).on('select2:closing', function (e) {
			if ($(this).attr('data-close-anvaliable') !== '1') {
				e.preventDefault();
				var $this = $(this);
				$(this).attr('data-close-anvaliable', '1');
				$(this).siblings('.filter-select-items-wrapper').removeClass('filter-select-items-wrapper--show');
				setTimeout(function () {
					$this.select2('close');
				}, 350);
			}
			else {
				$(this).attr('data-close-anvaliable', '2');
			}
			//$(this).select2('close');

		}).on('select2:select', function (e) {
			$(this).removeClass('filter-select--placeholder-selected');
		});
	});


	flatpickr(".js-flatpickr", {
		monthSelectorType: 'static',
		prevArrow: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.65421 15.0084L4.64587 10L9.65421 4.9917L10.8334 6.17003L7.00004 10.0034L10.8334 13.8367L9.65504 15.0084H9.65421ZM14.175 15.0084L9.16587 10L14.175 4.9917L15.3534 6.17003L11.52 10.0034L15.3534 13.8367L14.1759 15.0084H14.175Z" fill="#828282"/></svg>',
		nextArrow: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.345 15.0084L9.16587 13.8309L12.9992 9.99753L9.16587 6.1642L10.345 4.9917L15.3534 10L10.3459 15.0084H10.345ZM5.82421 15.0084L4.64587 13.8309L8.47921 9.99753L4.64587 6.17003L5.82421 4.9917L10.8334 10L5.82504 15.0084H5.82421Z" fill="#828282"/></svg>',
		"locale": "ru",  // locale for this instance only
		disableMobile: true
	});


	$('.js-open-modal').on('click', function () {
		$.fancybox.open({
			src: $(this).attr('data-src'),

			type: 'inline',
			opts: {
				//speed: 600,
				//transitionDuration: 700,
				autoFocus: false,
				backFocus: false,
				baseClass: 'fancybox-default-modal',
				touch: false,
				smallBtn: false,
				closeExisting: true,
				toolbar: false,
				baseTpl:
					'<div class="fancybox-container" role="dialog" tabindex="-1">' +
					'<div class="fancybox-bg"></div>' +
					'<div class="fancybox-inner">' +

					//'<div class="modal-close" data-fancybox-close><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41L12.59 0Z" fill="#FAFAFA"/></svg></div>' +
					'<div class="fancybox-stage"></div>' +
					'<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
					'</div>' +
					'</div>',

				beforeShow: function (instance, current) {
					setTimeout(function () {
						$('input, select').trigger('refresh');
					}, 1);
				},
				afterClose: function () {
					[]
				}
			}
		});
	});

	$('.js-open-modal-lvl-2-plus').on('click', function () {
		$.fancybox.open({
			src: $(this).attr('data-src'),
			closeExisting: false,
			type: 'inline',
			opts: {
				//speed: 600,
				//transitionDuration: 700,
				autoFocus: false,
				backFocus: false,
				baseClass: 'fancybox-default-modal',
				touch: false,
				smallBtn: false,
				toolbar: false,
				baseTpl:
					'<div class="fancybox-container" role="dialog" tabindex="-1">' +
					'<div class="fancybox-bg"></div>' +
					'<div class="fancybox-inner">' +

					//'<div class="modal-close" data-fancybox-close><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41L12.59 0Z" fill="#FAFAFA"/></svg></div>' +
					'<div class="fancybox-stage"></div>' +
					'<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
					'</div>' +
					'</div>',

				beforeShow: function (instance, current) {
					setTimeout(function () {
						$('input, select').trigger('refresh');
					}, 1);
				},
				afterClose: function () {
					[]
				}
			}
		});
	});


	$('.js-modal-tabs-control').on('click', function () {
		var $this = $(this),
			idx = $this.index(),
			target = $($this.parent().attr('data-target')).find('.modal-tab').eq(idx);


		$this.addClass('modal-tabs-controls__item--active').siblings().removeClass('modal-tabs-controls__item--active');

		target.addClass('modal-tab--active').siblings().removeClass('modal-tab--active');


	});

	$('.js-material-card').on('click', function () {
		var $this = $(this),
			target = $($this.attr('data-target')),
			activeInfoCards = $('.materials-cards').find('.material-card--informative--shown');

		$("html, body").stop().animate({ scrollTop: ($this.closest('.materials-cards').offset().top - $('.site-header').outerHeight()) }, 500, 'swing', function () { });

		if (activeInfoCards.length > 0) {
			activeInfoCards.removeClass('material-card--informative--shown');
			setTimeout(function () {
				activeInfoCards.removeClass('material-card--informative--active');

				$('.materials-cards').removeClass('materials-cards--info-active');
				$this.closest('.materials-cards').addClass('materials-cards--info-active');
				target.addClass('material-card--informative--active');
				setTimeout(function () {
					target.addClass('material-card--informative--shown');
				}, 200);
			}, 200);
		}
		else {
			$this.closest('.materials-cards').addClass('materials-cards--info-active');
			target.addClass('material-card--informative--active');
			setTimeout(function () {
				target.addClass('material-card--informative--shown');
			}, 200);
		}

		$this.addClass('modal-tabs-controls__item--active').siblings().removeClass('modal-tabs-controls__item--active');

		target.addClass('modal-tab--active').siblings().removeClass('modal-tab--active');




	});

	$('.material-card--informative').on('click', function () {
		var $this = $(this);
		$('.materials-cards').removeClass('materials-cards--info-active');
		$this.removeClass('material-card--informative--shown');
		setTimeout(function () {
			$this.removeClass('material-card--informative--active');
		}, 200);
	});
});

