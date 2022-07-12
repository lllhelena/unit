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
	// $("input[name='phone']").mask(" +7 (999) 999-99-99");

	$('.js-sort-control').click(function () {
		$(this).toggleClass('catalog-filter__control--opened')
	});

	$('.js-sort-item').click(function () {
		var thisItem = $(this);
		var itemsParent = thisItem.closest('.catalog-filter__content');
		var thisItemDirection = thisItem.find('.sort-item__inp-direction');
		var currentItemChecked = thisItemDirection.is(':checked');
		var filterDirection = $('.js-catalog-filter__direction');
		var filterName = $('.js-catalog-filter__name');


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
		$('.js-sort-control').removeClass('catalog-filter__control--opened');
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

	//TODO: schemes
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

	//TODO: видео плеейр мультитиповый
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


});

