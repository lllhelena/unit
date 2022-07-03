
$(document).ready(function () {
	$('.js-toggle-menu').click(function () {
		$('body').toggleClass('body--side-menu--open');
		$('.js-side-menu-item--open-sub').removeClass('side-menu__item-name--opened-sub')
		.siblings('.side-menu-sub').stop().slideUp(400);

	});

	$('.js-side-menu-item--open-sub').click(function () {
		if($(this).hasClass('side-menu__item-name--opened-sub')){
			$(this).removeClass('side-menu__item-name--opened-sub')
			.siblings('.side-menu-sub').stop().slideUp(400);

		}
		else{
			$(this).addClass('side-menu__item-name--opened-sub')
			.siblings('.side-menu-sub').stop().slideDown(400);
		}
	});

	$(".side-nav-wrap").click(function(e){
		if(e.target != this) return; // only continue if the target itself has been clicked
		$('body').removeClass('body--side-menu--open');
		$('.js-side-menu-item--open-sub').removeClass('side-menu__item-name--opened-sub')
		.siblings('.side-menu-sub').stop().slideUp(400);
	 });

});

