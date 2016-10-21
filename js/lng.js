function initLngClickers(){
	$('.lngClicker').click(function(e){
		e.preventDefault();
		var lng = e.currentTarget.attributes['dataLng'].value;
		changeLng(lng);
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
function changeLng(lng){
	$('.lngText').each(function (i,el){
		$el=$(el);
		var keyText=el.attributes['dataContent'].value;
		var translation = lngStrings[keyText][lng];
		$el.text(translation);
	});
	
	hideOtherLanguagesThan(lng);
}
function hideOtherLanguagesThan(lng){
	$('.lng').hide();
	$('.lng.'+lng).show();
}
