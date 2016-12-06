$(document).ready(function(){
	// Set language
	initLngClickers();
	setLngFromCookie();
	showAcceptCookiesPopup();

	// Get spreadsheet data
	initTabletop(function(){
		/* favs.js */
		var favsMaxHeight = $(screen)[0].availHeight - 200;
		$("aside#favs")[0].style.maxHeight=favsMaxHeight+"px";
		initFavClickers();
		populateFavsFirstTime();

		/* Masonry.js */
		renderResponsiveGrid();
	});
});
