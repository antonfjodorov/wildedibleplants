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
function changeLng(lng) {
	$('.cover .plant').each(function (i,el){
		$el=$(el);
		var id=el.attributes['dataId'].value;
		var name=coverStrings[lng][id]['Name'];
		var text=coverStrings[lng][id]['Text'];
		$el.find('h2').text(name);
		$el.find('p').text(text);
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
	$('.lngClicker').click(function (e){
		e.preventDefault();
		var lng = e.currentTarget.attributes['dataLng'].value;
		changeLng(lng);
	});
}