var el = $('div.container > article > div.industry > ul > li > div > div > svg');

function startCount(element, percent) {
    element.each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: percent
        	}, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now) + '%');
            	}
        	});
    	});
	}

$(document).ready(function() {
	if (el.length !== 0) {
		loadCSS('css/industry.css?' + $.now(), 'stylesheet');
		$(window).scroll(function() {	
			el.each(function() {
				if (!$(this).hasClass('active') && $(window).scrollTop() > $(this).offset().top - $(window).innerHeight() + $(this).outerHeight()/2) {
					$(this).addClass('ring-' + $(this).data('percent'));
					$(this).addClass('active');
					startCount($(this).find('text'), $(this).data('percent'));
					}
				});
			});
		}
	return false;
	});