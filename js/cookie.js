/**
 * Read whole cookie as string
 * If optionalKey specified, read key value
 */
function readCookie(cookie, optionalKey){
	var c = Cookies.get(cookie);
	var retval = "";
	if (typeof c !== "undefined" && c != ""){
		if (arguments.length == 2){
			var contents = JSON.parse(c);
			keys = Object.keys(contents);
			if (keys.indexOf(optionalKey) != -1)
				return contents[optionalKey];
			else
				return retval;
		}
		return c;
	}
	return retval;
}
/*
 * Set cookie without overwriting other values in the cookie
 */
function writeCookie(cookie, k, v){
	var c = Cookies.get(cookie);
	if (typeof c === "undefined" || c == ""){
		var d = {};
		d[k] = v;
		var c = JSON.stringify(d);
		Cookies.set('settings', c, { expires:Infinity });
	}
	var contents = JSON.parse(c);
	contents[k] = v;
	var c = JSON.stringify(contents);
	Cookies.set(cookie, c, { expires:Infinity });
}
function showAcceptCookiesPopup(){
	var settingsCookie = Cookies.get('settings');
	if (typeof settingsCookie === "undefined" || settingsCookie == ""){
		$('#cookiesPopup').show();
	}
}
$(document).ready(function(){
	$('#cookiesPopup button').click(function(){
		$('#cookiesPopup').hide();
		writeCookie('settings', 'cookiesAccepted', true);
	});
});