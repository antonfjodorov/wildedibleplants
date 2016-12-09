$(document).ready(function(){
	showAcceptCookiesPopup();
	populateTransliterations();
	artyom.initialize({
		lang: 'ru-RU',
		debug: false
	});

	// Get spreadsheet data
	initTabletop(function(){
		/* favs.js */
		var favsMaxHeight = $(screen)[0].availHeight - 200;
		$("aside#favs")[0].style.maxHeight=favsMaxHeight+"px";
		initFavClickers();
		populateFavsFirstTime();

		initLngClickers();
		setLngFromCookie();

		/* Masonry.js */
		renderResponsiveGrid();
	});
});