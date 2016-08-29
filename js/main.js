$(document).ready(function(){
	renderCover('en');
	hideOtherLanguagesThan('en');

	// Get spreadsheet data
	initTabletop(function(){
	});
});
function renderCover(lng) {
	$cover=$('.cover');
	$('.cover .plant').each(function (i,el){
		$el=$(el);
		var id=el.attributes['dataId'].value;
		var name=coverStrings[lng][id]['Name'];
		var text=coverStrings[lng][id]['Text'];
		$el.find('h2').text(name);
		$el.find('p').text(text);
	});

}
function hideOtherLanguagesThan(lng){
	$('.lng').hide();
	$('.lng.'+lng).show();
}