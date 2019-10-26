var vhCSS = null;

function loadCSS(source, type) {
	var s = document.getElementsByTagName('head')[0],
		sc = document.createElement('link');
		sc.rel = type;
		sc.href = source;
		s.appendChild(sc);
	}
	
function loadJS(source, order) {
	var s = document.getElementsByTagName('head')[0],
		sc = document.createElement('script');
		sc.acync = order;
		sc.src = source;
		s.appendChild(sc);
	}

function resize() {
	if (window.innerWidth < 1201) {
		if (!vhCSS) {
			loadCSS('css/vh.css?' + $.now(), 'stylesheet');
			vhCSS = true;
			}
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		$('.scrollbar-nav').scrollbar();
		}
	else {
		$('.scrollbar-nav').scrollbar('destroy');
		}
	if ($('div.container > article > div.swiper-main').length !== 0) {
		$('div.container > article > div.swiper-main').css({"width" : $(window).width() + "px"});
		}
	if ($('div.container > article > div.suppliers > div > div.swiper-suppliers').length !== 0) {
		$('div.container > article > div.suppliers').css({"width" : $(window).width() + "px"});
		}
	}
	
$(document).ready(function() {
	resize();
	$('div.container > header > ul').on('click', function() {
		if ($('div.container').hasClass('opened')) {
			$('div.container').removeClass('opened');
			}
		else {
			$('div.container').addClass('opened');
			}	
		});
	$('div.container > nav > div > ul > li').hover(function() {
		var position = $(this).position();
    	$('div.container > nav > div > ul > li.choose').css({'width' : $(this).width() + 'px', 'left' : position.left + 'px'});
  		}, function() {
    	$('div.container > nav > div > ul > li.choose').css('width', '0px');
  		});
	$('.move').on('click', function(e) {
		if ($('div.container').hasClass('opened')) {
			$('div.container').removeClass('opened');
			}
		$('html, body').stop().animate({
			scrollTop: $('#' + $(this).data('move')).offset().top - $('div.container > header').outerHeight() + Math.abs($('div.container > header').position().top)
			}, 600);
		e.preventDefault();
		});
	return false;
	});