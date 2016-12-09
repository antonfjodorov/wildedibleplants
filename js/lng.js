function initLngClickers(){
	$('nav.navbar .lngClicker').on('click', function(e){
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
	$('.plant .lngClicker').on('click', function(e){
		var id = e.currentTarget.attributes['dataId'].value;
		$('#'+id+'-lngw .active').removeClass('active');
		var lng = e.currentTarget.attributes['dataLng'].value;
		$('#'+id+'-lngw_'+lng).addClass('active');
		changeLngOfPlant(lng, id);
		renderResponsiveGrid();
	});
	$('.plant .lngw').on('mouseover', function(e){
		var id = e.currentTarget.attributes['dataId'].value;
		$('#'+id+'-lngw_info').addClass('active');
	});
	$('.plant .lngw').on('mouseleave', function(e){
		var id = e.currentTarget.attributes['dataId'].value;
		$('#'+id+'-lngw_info').removeClass('active');
	});
	$('.plant [dataSpeech]').on('click', function(e){
		var speech = e.currentTarget.attributes['dataSpeech'].value;
		console.log(speech);
		artyom.say(speech);
	});
}
/*
 * Change lng of one plant
 * returns set lng
 */
function changeLngOfPlant(lng, id){
	if (lng == "" || lngLanguages.indexOf(lng) == -1){
		lng = lngLanguages[0];
	}
	$('#'+id+'-plant .lngText').each(function (i,el){
		$el=$(el);
		var keyText=el.attributes['dataContent'].value;
		var translation = lngStrings[keyText][lng];
		$el.text(translation);
	});
	hideOtherLanguagesThanId(lng, id);
	updatePlantLanguageClickersId(lng, id);
	return lng;
}
/*
 * Change lng of whole site
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
	updatePlantLanguageClickers(lng);
	return lng;
}
function hideOtherLanguagesThan(lng){
	$('.lng').hide();
	$('.lng.'+lng).show();
}
function updatePlantLanguageClickers(lng){
	$('.plant .lngClicker').removeClass('active');
	$('.plant .lngClicker[dataLng='+lng+']').addClass('active');
}
function hideOtherLanguagesThanId(lng, id){
	if (lng == 'rut'){
		// Transliterate i.a. Name_RU and insert it in Name_RUT
		var rutObjArr = $('#'+id+'-plant .lng.rut');
		$('#'+id+'-plant .lng.ru').each(function(i, el){
			rutObjArr[i].innerHTML = transliterateRuToLa(el.innerHTML);
		});
	}
	$('#'+id+'-plant .lng').hide();
	$('#'+id+'-plant .lng.'+lng).show();
}
function updatePlantLanguageClickersId(lng, id){
	$('#'+id+'-plant .lngClicker').removeClass('active');
	$('#'+id+'-plant .lngClicker[dataLng='+lng+']').addClass('active');
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
/*
 * Transliterate
 */
var RUSSIAN = {"Ё":"Yo","Й":"J","Ц":"Ts","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"Sh","Щ":"Sch","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"j","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"Y","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"Zh","Э":"E","ф":"f","ы":"y","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"Ch","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"Yu","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};
function transliterateRuToLa(word){
  return word.split('').map(function (char) {
    return RUSSIAN[char] || char;
  }).join("");
}
function populateTransliterations(){
	var keys = Object.keys(lngStrings);
	for (var i = keys.length - 1; i >= 0; i--) {
		lngStrings[keys[i]]['rut'] = transliterateRuToLa(lngStrings[keys[i]]['ru']);
	}
}