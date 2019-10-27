var suppliers = null;

$(document).ready(function() {
 	if (!suppliers && $('div.swiper-suppliers').length !== 0) {
 		setTimeout(function() {
			suppliers = new Swiper('div.swiper-suppliers', {
    			loop: true,
 				slidesPerView: 1.4,
 				centeredSlides: true,
 				breakpoints: {
    				481: {
      					slidesPerView: 2
    					},
    				961: {
      					slidesPerView: 3
    					}
    				},
    			navigation: {
    				nextEl: 'div.swiper-suppliers > div.next',
    				prevEl: 'div.swiper-suppliers > div.prev'
  					},
  				slideToClickedSlide: true
				});
			}, 50);
    	}
   	return false;
	});