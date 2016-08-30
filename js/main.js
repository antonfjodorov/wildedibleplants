$(document).ready(function(){
	changeLng('en');
	hideOtherLanguagesThan('en');

	// Get spreadsheet data
	initTabletop(function(){
	});
});
/**
 * 1. change lng in the .cover
 * 2. change lng in the rest of the document
 */
function changeLng(lng) {
	$cover=$('.cover');
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