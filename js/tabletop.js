function initTabletop(next){
	/**
	 * Switch between local data and live data from Google Sheets
	 * You can export live data to local file by using export-json.html
	 */
	useLocalData = false;

	if (useLocalData){
		$.get('/data/export18dec2017.json', function(data){
			showInfo(data, null, next);
		});
	} else {
		//https://docs.google.com/spreadsheets/d/18Y2UVB9ntr1B-SREm749F8V_U428Bt_8eIbliPZttMg/pubhtml?gid=1906710433&single=true
		Tabletop.init({
			key: '18Y2UVB9ntr1B-SREm749F8V_U428Bt_8eIbliPZttMg',
			callback: function(d, t){ showInfo(d, t, next) },
			simpleSheet: true
		});
	}
}
function sortTabletopData(tabletopData, lngCode){
	var sortNames = {
		'la': 'Name_latin',
		'en': 'Name_EN',
		'se': 'Name_SE',
		'ru': 'Name_RU'
	};
	tabletopData.sort(function(a,b){return a[sortNames[lngCode]].localeCompare(b[sortNames[lngCode]]);});
	return tabletopData;
}
/**
 * Data has been fetched from database, now display it.
 * 1. Data must be manually confirmed. If not confirmed, go on to next item.
 * 2. Parse data into col
 * 3. Put col into row, repeat until row is filled
 * 4. Append row, repeat until all items parsed
 */
var categories = {};
function showInfo(tabletopData, tabletopInfo, next){
	$('.loading').hide();

	var keys = Object.keys(tabletopData[0]);
	var dataTemplate = $('#tpl-plant').html();
	var $sinkTabletop = $('#plantsContent');
	var tabletopDataLength = tabletopData.length
	var rowHtml = "";
	var colHtml = "";
	tabletopData = sortTabletopData(tabletopData, 'la');
	tabletopData.forEach(function(item,j){
		if (typeof item["isLive"] === undefined || item["isLive"] === "") return;
		colHtml = dataTemplate;
		var regexp;
		for (var i = keys.length - 1; i >= 0; i--) {
			regexp = "{"+keys[i]+"}";
			colHtml = colHtml.replace(new RegExp(regexp, "g"), item[keys[i]]);
		}
		var id = item['Name_latin'].replace(/ /g, '_').replace(/\(/g, '').replace(/\)/g, '');
		colHtml = colHtml.replace(new RegExp('{id}', "g"), id);
		// Add plant category
		var cat = item['Plant category'];
		var hyphenatedCat = cat.replace(/ /g, '-');
		categories[hyphenatedCat] = cat;
		colHtml = colHtml.replace(/{cat}/g, hyphenatedCat);
		
		// Image_url field can contain single or multiple urls (in csv format)
		var imgSplits = item['Image_url'].split(',');
		var imgTemplates = "";
		for (var k = 0; k < imgSplits.length; k++) {
			// Replace {Image_url}
			var imgTemplate = $('#tpl-img').html();
			imgTemplate = imgTemplate.replace(/{Image_url}/g, imgSplits[k]);

			// Replace {Image_domain}
			var imgDomain = imgSplits[k].replace('http://','').replace('https://','').split(/[/?#]/)[0];
			if (imgDomain.split('.').length > 2){
				imgDomain = imgDomain.substring(imgDomain.indexOf('.')+1);
			}
			imgTemplate = imgTemplate.replace(new RegExp('{Image_domain}', "g"), imgDomain);

			imgTemplates += imgTemplate;
		}
		colHtml = colHtml.replace(/{tpl-img}/g, imgTemplates);

		rowHtml = rowHtml + colHtml;
		if ((j+1)%3==0 || j+1==tabletopDataLength){
			rowHtml = '<div class="row">' + rowHtml + '</div>';
			$sinkTabletop.append(rowHtml);
			rowHtml = "";
		}
	});

	showCategoryFilter();
	initCategoryFilter();
	next();
}
function showCategoryFilter(){
	var catKeys = Object.keys(categories);
	var catArr = Object.values(categories);
	var itemTpl = $('#tpl-plants-header-form-item').html();
	var checkboxes = '';
	for (var i = 0; i < catArr.length; i++) {
		var id = 'cb-'+catKeys[i];
		var count = $('.cat-'+catKeys[i]).length || 0;
		var htmlCheckbox = itemTpl;
		htmlCheckbox = htmlCheckbox.replace(/{content}/, catArr[i]);
		htmlCheckbox = htmlCheckbox.replace(/{id}/g, id);
		htmlCheckbox = htmlCheckbox.replace(/{cat}/g, catKeys[i]);
		htmlCheckbox = htmlCheckbox.replace(/{count}/g, count);
		checkboxes += htmlCheckbox;
	}

	var formTpl = $('#tpl-plants-header-form').html();
	formTpl = formTpl.replace(/{content}/, checkboxes);
	
	$('#form-plants-header').html(formTpl);
	$('#form-plants-header').removeClass('hidden');
}
function initCategoryFilter(){
	$('#form-plants-header input[type=checkbox]').on('change', function() {
		var value = $(this).prop('checked');
		var cat   = $(this).attr('data-cat');

		if (value){
			$('.cat-'+cat).show();
		} else {
			$('.cat-'+cat).hide();
		}
		renderResponsiveGrid();
		// $("#myTable tr").filter(function() {
		// 	$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		// });
	});
}