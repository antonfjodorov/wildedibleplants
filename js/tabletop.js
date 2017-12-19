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
/**
 * Data has been fetched from database, now display it.
 * 1. Data must be manually confirmed. If not confirmed, go on to next item.
 * 2. Parse data into col
 * 3. Put col into row, repeat until row is filled
 * 4. Append row, repeat until all items parsed
 */
function showInfo(tabletopData, tabletopInfo, next){
	$('.loading').hide();

	var keys = Object.keys(tabletopData[0]);
	var dataTemplate = $('#tpl-plant').html();
	var $sinkTabletop = $('#plantsContent');
	var tabletopDataLength = tabletopData.length
	var rowHtml = "";
	var colHtml = "";
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
		var imgDomain = item['Image_url'].replace('http://','').replace('https://','').split(/[/?#]/)[0];
		if (imgDomain.split('.').length > 2){
			imgDomain = imgDomain.substring(imgDomain.indexOf('.')+1);
		}
		colHtml = colHtml.replace(new RegExp('{Image_domain}', "g"), imgDomain);

		rowHtml = rowHtml + colHtml;
		if ((j+1)%3==0 || j+1==tabletopDataLength){
			rowHtml = '<div class="row">' + rowHtml + '</div>';
			$sinkTabletop.append(rowHtml);
			rowHtml = "";
		}
	});

	next();
}
