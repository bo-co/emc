var suppliers = null;

$(document).ready(function() {
 	if (!suppliers && $('div.container > article > div.projects > div.swiper-projects').length !== 0) {
 		setTimeout(function() {
			suppliers = new Swiper('div.container > article > div.projects > div.swiper-projects', {
    			loop: true,
 				slidesPerView: 1,
 				centeredSlides: true,
    			navigation: {
    				nextEl: 'div.container > article > div.projects > div.swiper-projects > div.button.next',
    				prevEl: 'div.container > article > div.projects > div.swiper-projects > div.button.prev'
  					},
  				on: {
  					init: function () {
    					$('div.container > article > div.projects > div.description > span').text($('div.container > article > div.projects > div.swiper-projects > ul > li.swiper-slide-active > div > span').text());
    					},
    				transitionStart: function () {
    					$('div.container > article > div.projects > div.description > span').text($('div.container > article > div.projects > div.swiper-projects > ul > li.swiper-slide-active > div > span').text());
    					}
    				},
    			pagination: {
        			el: 'div.container > article > div.projects > div.swiper-projects > div.swiper-pagination',
        			type: 'fraction',
      				}
				});
			}, 50);
    	}
   	return false;
	});