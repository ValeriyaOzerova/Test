$(document).ready(function() {

	$('.mobile-menu').click(function(e){ 
		e.preventDefault();
	  	$('.header__topmenu').slideToggle();
	})
	$(window).resize(function() {
		var wid = $(window).width();
		if(wid > 768) {
			$('.header__topmenu').removeAttr('style');
		}
	});




});

