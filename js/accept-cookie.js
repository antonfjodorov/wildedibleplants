/**
 * showAcceptCookiesPopup
 * the mandatory popup for "this site uses cookies"
 */
function showAcceptCookiesPopup(){
	var settingsCookie = Cookies.get('settings');
	if (typeof settingsCookie === "undefined" || settingsCookie == ""){
		$('#cookiesPopup').show();
	}
}
$(document).ready(function(){
	$('#cookiesPopup button').click(function(){
		$('#cookiesPopup').hide();
		var settingsCookie = JSON.stringify({ 'cookiesAccepted':true });
		Cookies.set('settings', settingsCookie, { expires:Infinity });
	});
});