/**
 * Favs uses a virtual view. All objects manipulation happens in the virtual
 * view, then the favs are fully re-rendered.
 */
function initFavClickers(){
	// Show/hide favs panel
	$('.handleFavClick').click(function(e){
		if ($('#favs.is-visible').length){
			$('#favs.is-visible').removeClass('is-visible');
			$('.favHandle-show').show();
			$('.favHandle-hide').hide();
		} else {
			$('#favs').addClass('is-visible');
			$('.favHandle-show').hide();
			$('.favHandle-hide').show();
		}
	});
	// Add to favs
	$('.heart').click(function(e){
		var id = e.currentTarget.attributes['dataId'].value;
		$(e.currentTarget).hide();
		$('#'+id+'-hearthover').show();

		var favsCookie = readCookie('favs');
		if (favsCookie == ""){
			favsCookie = JSON.stringify([id]);
		} else {
			var favs = JSON.parse(favsCookie);
			if (favs.indexOf(id) == -1){
				favs.push(id);
				favsCookie = JSON.stringify(favs);
			}
		}
		Cookies.set('favs', favsCookie, { expires:Infinity });

		appendToFavsVirtualView(id);
		virtualToRealView();

		// Pulse heart
		$('nav .handle').addClass('pulse');
		setTimeout(function() {
			$('nav .handle').removeClass('pulse');
		}, 500);
	});
	/** Remove from favs
	 *  1. Remove from cookie
	 *  2. Remove from virtual view
	 *  3. Update view
	 */
	$('.hearthover').click(function(e){
		var id = e.currentTarget.attributes['dataId'].value;
		$(this).hide();
		$('#'+id+'-heart').show();

		var favsCookie = Cookies.get('favs');
		if (typeof favsCookie !== "undefined"){
			var favs = JSON.parse(favsCookie);
			var ix = favs.indexOf(id);
			if (ix > -1){
				favs.splice(ix, 1);
				favsCookie = JSON.stringify(favs);
			} else {
				console.error('Error: .hearthover click: did not find current hearthover in cookie, id =', id);
			}
		} else {
			favsCookie = JSON.stringify([]);
		}
		Cookies.set('favs', favsCookie, { expires:Infinity });

		removefromFavsVirtualView(id);
		virtualToRealView();
	});
}
var favsVirtualView = {};
function appendToFavsVirtualView(id){
	var obj = extractObjFromId(id);
	var view = createViewFromObj(obj);
	favsVirtualView[id] = view;
}
function removefromFavsVirtualView(id){
	var keys = Object.keys(favsVirtualView);
	var ix = keys.indexOf(id);
	if (ix > -1){
		delete favsVirtualView[keys[ix]];
	}
}
/**
 * Outputs html from virtual view
 */
function virtualToRealView(){
	var keys = Object.keys(favsVirtualView);
	var html = "";
	for (var i = keys.length - 1; i >= 0; i--) {
		html = html + favsVirtualView[keys[i]];
	}
	$('#favsContent').html(html);

	if (Object.keys(favsVirtualView).length){
		$('aside#favs .info-noitems').hide();
		$('aside#favs .info-hasitems').show();
	} else {
		$('aside#favs .info-noitems').show();
		$('aside#favs .info-hasitems').hide();
	}
}
/**
 * 1. Populate favs
 * 2. Fill hearts for all plants that have been marked as favourite
 */
function populateFavsFirstTime(){
	var favsCookie = Cookies.get('favs');
	if (typeof favsCookie === "undefined" || favsCookie == "")
		return;
	var favs = JSON.parse(favsCookie);
	for (var i=0; i<favs.length; i++) {
		appendToFavsVirtualView(favs[i]);
		$('#'+favs[i]+'-heart').hide();
		$('#'+favs[i]+'-hearthover').show();
	}
	virtualToRealView();
}
/**
 *  Extracts necessary info from clicked obj
 */
function extractObjFromId(id){
	var maxL = 25;
	var Image_url = $('#'+id+'-Image_url').attr('dataImageUrl');
	var obj = {
		'id': id,
		'Image_url': Image_url
	};
	var arrItems = ['Name_latin',
					'Name_EN', 'Name_SE', 'Name_RU',
					'Edible_use_EN', 'Edible_use_SE', 'Edible_use_RU'];
	for (var i=0; i<arrItems.length; i++){
		var el = $('#'+id+'-'+arrItems[i])[0];
		var elLen = el.textContent.length;
		if (elLen > maxL){
			obj[arrItems[i]+'_cut'] = el.textContent.substring(0,maxL) + '...';
		} else {
			obj[arrItems[i]+'_cut'] = el.textContent;
		}
	}
	return obj;
}
function createViewFromObj(obj){
	var keys = Object.keys(obj);
	var dataTemplate = $('#tpl-fav').html();
	var colHtml = "";
	colHtml = dataTemplate;
	var regexp;
	for (var i = keys.length - 1; i >= 0; i--) {
		regexp = "{"+keys[i]+"}";
		colHtml = colHtml.replace(new RegExp(regexp, "g"), obj[keys[i]]);
	}
	return colHtml;
}
