$(document).ready(function(){
	var sectionPicHeight = $(screen)[0].availHeight - 300;
	$('section#pic')[0].style.height = sectionPicHeight+'px';

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

		/* language */
		initLngClickers();
		setLngFromCookie();

		/**
		 * init slick slider where there are at least 2 images
		 */
		$('.plant-inner .slider:not(:has(.imgw:only-child))').slick({
			// arrows:        false,
			autoplay:      true,
			autoplaySpeed: 20000,
			dots: true,
			fade: true
		});

		/* Masonry.js */
		renderResponsiveGrid();
	});
});