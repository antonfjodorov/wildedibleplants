function initLngClickers(){
	$('.lngClicker').on('click', function(e){
		e.preventDefault();
		var lng = e.currentTarget.attributes['dataLng'].value;
		changeLng(lng);
		writeCookie('settings', 'lng', lng);
		renderResponsiveGrid();
	});
	$('.collapseAfterClick').mousedown(function(e){
		$('#navbar-collapse-1').collapse('hide');
	});
	$('.collapseAfterTouch').each(function(i,el){
		el.addEventListener('touchstart', function(e){
			$('#navbar-collapse-1').collapse('hide');
		});
	});
}
/*
 * returns set lng
 */
function changeLng(lng){
	if (lng == "" || lngLanguages.indexOf(lng) == -1){
		lng = lngLanguages[0];
	}
	$('.lngText').each(function (i,el){
		$el=$(el);
		var keyText=el.attributes['dataContent'].value;
		var translation = lngStrings[keyText][lng];
		$el.text(translation);
	});
	
	hideOtherLanguagesThan(lng);
	return lng;
}
function hideOtherLanguagesThan(lng){
	$('.lng').hide();
	$('.lng.'+lng).show();
}
/*
 * Set lng of page.
 * If first time, i.e. no lng in cookie, set page to default lng and update cookie.
 */
function setLngFromCookie(){
	var lng = readCookie('settings', 'lng');
	setlng = changeLng(lng);
	if (lng == "")
		writeCookie('settings', 'lng', setlng);
}
