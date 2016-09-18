$(document).ready(function(){
	// Set language
	initLngClickers();
	changeLng('en');
	hideOtherLanguagesThan('en');

	// enable smooth scrolling
	// initSmoothScroll();

	// Get spreadsheet data
	initTabletop(function(){});
});
/**
 * 1. change lng in the .cover
 * 2. change lng in the rest of the document
 */
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
function initSmoothScroll(){
	$(".scroll").click(function (e){
		var target=this.href.split('#')[1];
		var top = $('#'+target).offset().top;
		$('html,body').animate({ scrollTop:top }, 750, 'swing');
	});
}
function initLngClickers(){
	$('.lngClicker').click(function(e){
		e.preventDefault();
		var lng = e.currentTarget.attributes['dataLng'].value;
		changeLng(lng);
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