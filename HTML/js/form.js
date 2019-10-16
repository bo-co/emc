function clear(elements) {
	elements.each(function() {
		if ($(this).val()) {
			$(this).val('');
			}
		if ($(this).next('span').hasClass('selected')) {
			$(this).next('span').removeClass('selected');
			}
		if ($(this).hasClass('error')) {
			$(this).removeClass('error');
			}
		if ($(this).hasClass('success')) {
			$(this).removeClass('success');
			}
		});
	return false;
	}
	
function isName(name) {
	var regex = new RegExp(/^([а-яА-Яa-zA-Z _.-]{3,30})+$/);
	return regex.test(name);
	}

function isEmail(email) {
	var regex = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return regex.test(email);
	}
	
function isPhone(phone) {
	var regex = new RegExp(/^([0-9 )+(-]{18})+$/);
	return regex.test(phone);
	}
	
function isRequire(classname) {
	if ($('div.form.' + classname + ' input.error').length !== 0) {
		if ($('div.form.' + classname + ' > form > div > div > button').hasClass('active')) {
			$('div.form.' + classname + ' > form > div > div > button').removeClass('active');
			}
		}
	else {
		if ($('div.form.' + classname + ' .required > input').length !== $('div.form.' + classname + ' .required > input.success').length) {
			if ($('div.form.' + classname + ' > form > div > div > button').hasClass('active')) {
				$('div.form.' + classname + ' > form > div > div > button').removeClass('active');
				}
			}
		else {
			if (!$('div.form.' + classname + ' > form > div > div > button').hasClass('active')) {
				$('div.form.' + classname + ' > form > div > div > button').addClass('active');
				}
			}
		}
	return false;
	}
	
function isForm(form) {
	$.ajax({
    	type: 'POST',
    	data: $('div.form.' + form + ' > form').serialize(),    
    	url: '/actions/?action=' + form + '&ajax=Y',
    	cache: false,
    	dataType: 'json'
        }).done(function(result) {
        	if (result['status'] === 'success') {
        		$('div.form.' + form).addClass('success');
        		/* yaCounter54748225.reachGoal('order'); 
        		return true; */
        		}
        	else {
        		if (result['field']) {
        			var field = result['field'];
        			if (!$('div.form.' + form + ' > form input[name=' + field + ']').hasClass('error')) {
						$('div.form.' + form + ' > form input[name=' + field + ']').addClass('error');
						}
					}
				console.log(result['error']);
				return false;
        		}
        }).fail(function(result) {
        	console.log('ошибка отправки формы');
        	return false;
        });
	}
	
$(document).ready(function() {
	$('.field').on('propertychange change click keyup input paste', function() {
		var element = this;
		setTimeout(function () {
			if (!$(element).val()) {
				if ($(element).next('span').hasClass('selected')) {
					$(element).next('span').removeClass('selected');
					}
				if ($(element).hasClass('error')) {
					$(element).removeClass('error');
					}
				if ($(element).hasClass('success')) {
					$(element).removeClass('success');
					}
				if ($(element).hasClass('selected')) {
					$(element).removeClass('selected');
					}
				}
			else {
				if (!$(element).next('span').hasClass('selected')) {
					$(element).next('span').addClass('selected');
					}
				if ($(element).parent().hasClass('required')) {
					if ($(element).attr('name') == 'user_name') {
						var result = isName($(element).val());
						}
					if ($(element).attr('name') == 'user_phone') {
						var result = isPhone($(element).val());
						}
					if (!result) {
						if ($(element).hasClass('success')) {
							$(element).removeClass('success');
							}
						$(element).addClass('error');
						}
					else {
						if ($(element).hasClass('error')) {
							$(element).removeClass('error');
							}
						$(element).addClass('success');
						}
					}
				else {
					if ($(element).attr('name') == 'user_email') {
						var result = isEmail($(element).val());
						}				
					if (!result) {
						if ($(element).hasClass('selected')) {
							$(element).removeClass('selected');
							}
						$(element).addClass('error');
						}
					else {
						if ($(element).hasClass('error')) {
							$(element).removeClass('error');
							}
						$(element).addClass('selected');
						}
					}
				}
			isRequire($(element).data('form'));
			}, 100);
		});
	$('span.checkbox').on('click', function() {
		if (!$(this).hasClass('checked')) {
			$(this).addClass('checked');
			$(this).prev('input').prop('checked', true);
			$(this).prev('input').addClass('success');
			}
		else {
			$(this).removeClass('checked');
			$(this).prev('input').prop('checked', false);
			$(this).prev('input').removeClass('success');
			}
		isRequire($(this).data('form'));
		});		

	$('div.form > form > div > div > button').on('click', function() {
		if ($(this).hasClass('active')) {
			$('div.form').addClass('success');
			/* isForm($(this).data('form')); */
			}
		});
	clear($('.field'));
	$('input[type=tel]').inputmask('+7 (999) 999-99-99');
	return false;
	});