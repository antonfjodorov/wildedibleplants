function initTabletop(next){
	//https://docs.google.com/spreadsheets/d/18Y2UVB9ntr1B-SREm749F8V_U428Bt_8eIbliPZttMg/pubhtml?gid=1906710433&single=true
	Tabletop.init({
		key: '18Y2UVB9ntr1B-SREm749F8V_U428Bt_8eIbliPZttMg',
		callback: function(d, t){ showInfo(d, t, next) },
		simpleSheet: true
	});
}
/**
 * Data has been fetched from database, now display it.
 */
function showInfo(tabletopData, tabletopInfo, next) {
	var keys = Object.keys(tabletopData[0]);
	var dataTemplate = $('#tpl-plant').html();
	var $sinkTabletop = $('#plantsContent');
	tabletopData.forEach(function (item, j){
		// 1. Data must be manually confirmed. If not confirmed, go on to next item.
		// 2. Parse data
		// 3. Append item
		if (typeof item["isLive"] === undefined || item["isLive"] === "") return;
		
		var dataHtml = dataTemplate;
		var regexp, classField;
		for (var i = keys.length - 1; i >= 0; i--) {
			regexp = "{"+keys[i]+"}";
			dataHtml = dataHtml.replace(new RegExp(regexp, "g"), item[keys[i]]);
		}

		$sinkTabletop.append(dataHtml);
	});

	next();
}
