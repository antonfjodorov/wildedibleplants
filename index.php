<?php
/**
 * Executes semi-automatic cron job to sync Google Sheet
 *  -> "semi-automatic" because it is executed only when this file is run
 *  -> "cron" because it checks whether a certain amount has passed before running job
 * If predefined amount of time has passed, then:
 * 1. Downloads Google Sheet (plants database) as JSON, timestamps it and appends to backup folder
 * 2. Creates (if not exists) and points symlink to latest export file. This file will be used as
 *    cached file in order to not call Google Sheet all the time. This is to avoid rate limitation
 *    and have a backup in case Google Sheet messes up.
 * 3. Keeps backup folder under certain size limit by removing files starting from the oldest.
 * 4. Sets current date as last time cron job was run
 */
$settings = array(
	'cron_trigger_after_seconds' => 86400, /* 24h */
	'lastrun_filename' => 'lastrun'
);

function runCronJob(){
	
};
function main(){
	if (file_exists($settings['lastrun_filename'])){
		$lastRun = file_get_contents($settings['lastrun_filename']);
		$now = strtotime(strftime("%F %T"));
		if ($now - $lastRun > $settings['cron_trigger_after_seconds']){
			runCronJob();
		}
	} else {
		runCronJob();
	}
};
// main();
?>

<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Wild, edible and medicinal plants | REALSproject</title>
	<link href='http://fonts.googleapis.com/css?family=Crete+Round|Marmelad' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<!-- build:css -->
	<link rel="stylesheet" href="css/globals.css">
	<link rel="stylesheet" href="css/vendor/slick.css">
	<link rel="stylesheet" href="css/vendor/slick-theme.css">
	<link rel="stylesheet" href="css/header.css">
	<link rel="stylesheet" href="css/favs.css">
	<link rel="stylesheet" href="css/footer.css">
	<link rel="stylesheet" href="css/cookie.css">
	<link rel="stylesheet" href="css/lng.css">
	<link rel="stylesheet" href="css/main.css">
	<!-- endbuild -->
</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="row">
				<div class="nopadding col-xs-2 col-sm-2 col-lg-3">
					<a class="navbar-brand" href="#">
						<img class="logo" src="img/logo-reals-light.png" alt="REALS">
					</a>
				</div>
				<div class="col-xs-8 col-sm-6 col-lg-6">
					<h1 class="text-center lngText" dataContent="heading">Wild, edible plants</h1>
				</div>
				<div class="col-sm-4 col-lg-3 hidden-xs navigation">
					<span class="lngText" dataContent="Section">Section</span>
					<span><a class="scroll lngText" href="#about-reals" dataContent="About REALS">About REALS</a></span>
					<br>
					<span class="lngText" dataContent="Language">Language</span>
					<span><a href="#" class="lngClicker" title="English" dataLng="en">EN</a></span> /
					<span><a href="#" class="lngClicker" title="Svenska" dataLng="se">SE</a></span> /
					<span><a href="#" class="lngClicker" title="Русский" dataLng="ru">RU</a></span>

					<div class="handle handleFavClick">
						<div class="favHandle-show">
							<span class="glyphicon glyphicon-heart"></span>
						</div>
						<div class="favHandle-hide">
							<span class="glyphicon glyphicon-remove"></span>
						</div>
					</div>
				</div>
				<div class="nopadding col-xs-2 visible-xs-block">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>

					<div class="handle handleFavClick">
						<div class="favHandle-show">
							<span class="glyphicon glyphicon-heart"></span>
						</div>
						<div class="favHandle-hide">
							<span class="glyphicon glyphicon-remove"></span>
						</div>
					</div>
				</div>
				<div class="visible-xs-block">
					<div class="collapse navbar-collapse" id="navbar-collapse-1">
						<div class="container">
							<div class="row">
								<div class="col-xs-6">
									<ul class="nav navbar-nav">
										<li class="lngText" dataContent="Section">Section</li>
										<li><a class="scroll lngText collapseAfterClick" href="#" dataContent="Tothetop">To the top</a></li>
										<li><a class="scroll lngText collapseAfterClick" href="#about-reals" dataContent="About REALS">About REALS</a></li>
									</ul>
								</div>
								<div class="col-xs-6">
									<ul class="nav navbar-nav">
										<li class="lngText" dataContent="Language">Language</li>
										<li><a href="#" class="lngClicker collapseAfterClick" dataLng="en">EN</a></li>
										<li><a href="#" class="lngClicker collapseAfterClick" dataLng="se">SE</a></li>
										<li><a href="#" class="lngClicker collapseAfterClick" dataLng="ru">RU</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
	<aside id="favs">
		<header class="lngText" dataContent="Favourites">My Favourites</header>
		<p class="info info-noitems lngText" dataContent="favsNoitems">You have not marked any plants as favourite yet. Do it by clicking on the heart symbol on a plant.</p>
		<p class="info info-hasitems lngText" dataContent="favsHasitems">Click on an item to quickly find it on the website.</p>
		<div id="favsContent">
		</div>
	</aside>
	<div id="cookiesPopup">
		<div class="collapse in cookiesPopupCollapse">
			<span class="lngText" dataContent="cookie1">This site uses cookies.</span>
			<a href=".cookiesPopupCollapse" role="button" data-toggle="collapse"><span class="lngText" dataContent="ReadMore">Read more</span></a>
			<button class="lngText" dataContent="IAccept">I accept</button>
		</div>
		<div class="collapse cookiesPopupCollapse">
			<span class="lngText" dataContent="cookie2">Cookies are used to store your favourite plants and whether you accepted this cookie policy.</span>
			<button class="lngText" dataContent="OkIAccept">Ok, I accept</button>
		</div>
	</div>
	<section id="pic">
		<div class="hw">
			<div class="container">
				<div class="row">
					<h2 class="lngText" dataContent="headerMedi">Medicinal and edible plants in the Nordic region</h2>
				</div>
			</div>
		</div>
	</section>
	<section id="intro">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<p class="lngText" dataContent="intro1">The revered old knowledge about edible plants and natural medicines is getting forgotten.</p>
					<p><span class="lngText" dataContent="intro2.1">But with the help of the</span><a href="http://pfaf.org"><span class="lngText" dataContent="pfaf">Plants For a Future</span></a><span class="lngText" dataContent="intro2.2">database with 7000+ records of beneficial plants, the knowledge stays intact for generations to come.</span></p>
				</div>
				<div class="col-md-6">
					<p class="lngText" dataContent="intro3">The list below is a subset of this large database, depicting plants growing in the Nordic countries.</p>
					<p><span class="lngText" dataContent="intro4.1">The list is under continued dialogue within the</span><a href="http://realsproject.org">REALS</a><span class="lngText" dataContent="intro4.2">project and is conducted by Alexandra Kuliasova (REEN Russia), Antonina Kuliasova (REEN Russia) and Emilia Rekestad</span> (<a href="http://www.permakultur.se"><span class="lngText" dataContent="PermacultureSweden">Permaculture Sweden</span></a>). <span class="lngText" dataContent="intro4.3">Website by</span> <a href="https://github.com/antonfjodorov"><span class="lngText" dataContent="byAntonFjodorov">Anton Fjodorov</span></a>.</p>
				</div>
			</div>
		</div>
	</section>
	<section id="plants-header">
		<div class="container">
			<div class="row">
				<div class="col-md-12 hidden" id="form-plants-header">
				</div>
			</div>
		</div>
	</section>
	<section class="plants collapseAfterTouch" class="container-fluid">
		<div class="container">
			<div id="plantsContent">
				<p class="loading text-center">Please wait, your plants are being harvested ...</p>
			</div>
		</div>
	</section>
	<footer id="about-reals">
		<div class="container">
			<h2 class="lngText" dataContent="About REALS">About REALS</h2>
			<div class="row">
				<div class="col-sm-6">
					<p class="lngText" dataContent="about1">REALS run between September 2013 and August 2016. It was a creative forum and platform for diverse conversations, practical activities, exchange of experience and knowledge, new projects, long lasting friendship and - not the least - dissemination of future solutions for a healthy planet.</p>
				</div>
				<div class="col-sm-6">
					<p><span class="lngText" dataContent="about2">The name stands for Resilient and Ecological Approaches for Living Sustainably. Read more </span> <a href="http://realsproject.org/about"><span class="lngText" dataContent="on the REALS website">on the REALS website</span></a>.</p>
					<p><span class="lngText" dataContent="about3">REALS is financed</span> <a href="https://si.se"><span class="lngText" dataContent="by the Swedish Institute">by the Swedish Institute</span></a>.</p>
				</div>
			</div>
		</div>
	</footer>
	<script type="text/javascript"></script>
	<template id="tpl-plant">
		<div class="plant col-sm-4 col-xs-12 cat-{cat}" id="{id}-plant">
			<a name="{id}"></a>
			<div class="plant-inner">
				<div class="slider">
					{tpl-img}
				</div>
				<div class="header">
					<div id="{id}-lngw_info" class="lngInfo"><span class="lngText" dataContent="QuickInfo">Quick translation</span>:</div>
					<div class="lngw" id="{id}-lngw" dataId="{id}">
						<span id="{id}-lngw_en" class="lngClicker active" dataLng="en" dataId="{id}">en</span>
						<span id="{id}-lngw_se" class="lngClicker" dataLng="se" dataId="{id}">se</span>
						<span id="{id}-lngw_ru" class="lngClicker" dataLng="ru" dataId="{id}">ru</span>
						<span id="{id}-lngw_rut" class="lngClicker" dataLng="rut" dataId="{id}">ru-translit</span>
					</div>
					<div class="fav">
						<span id="{id}-heart" class="glyphicon glyphicon-heart-empty heart" dataId="{id}"></span>
						<span id="{id}-hearthover" class="glyphicon glyphicon-heart hearthover" dataId="{id}"></span>
					</div>
				</div>
				<div class="hw">
					<h2 id="{id}-Name_EN" class="lng en">{Name_EN}</h2>
					<h2 id="{id}-Name_SE" class="lng se">{Name_SE}</h2>
					<h2 id="{id}-Name_RU" class="lng ru">{Name_RU}</h2>
					<h2 id="{id}-Name_RUT" class="lng rut" dataSpeech="{Name_RU}">{Name_RUT}</h2>
					<h3 id="{id}-Name_latin">{Name_latin}</h3>
				</div>
				<div class="pw">
					<h4 class="lngText" dataContent="EdibUse">Edible use</h4>
					<p id="{id}-Edible_use_EN" class="lng en">{Edible_use_EN}</p>
					<p id="{id}-Edible_use_SE" class="lng se">{Edible_use_SE}</p>
					<p id="{id}-Edible_use_RU" class="lng ru">{Edible_use_RU}</p>
					<p id="{id}-Edible_use_RUT" class="lng rut" dataSpeech="{Edible_use_RU}">{Edible_use_RUT}</p>
					<h4 class="lngText" dataContent="MediUse">Medical use</h4>
					<p class="lng en">{Medicinal_use_EN}</p>
					<p class="lng se">{Medicinal_use_SE}</p>
					<p class="lng ru">{Medicinal_use_RU}</p>
					<p class="lng rut" dataSpeech="{Medicinal_use_RU}">{Medicinal_use_RUT}</p>
				</div>
			</div>
		</div>
	</template>
	<template id="tpl-img">
		<div id="{id}-Image_url" class="imgw" style="background-image: url('{Image_url}')" dataImageUrl="{Image_url}">
			<span class="imgsrc">{Image_domain}</span>
		</div>
	</template>
	<template id="tpl-fav">
		<a href="#{id}">
			<div class="fav">
				<img src="{Image_url}">
				<h3 id="{id}-Name_EN_cut" class="lng en">{Name_EN_cut}</h3>
				<h3 id="{id}-Name_SE_cut" class="lng se">{Name_SE_cut}</h3>
				<h3 id="{id}-Name_RU_cut" class="lng ru">{Name_RU_cut}</h3>
				<h3>{Name_latin_cut}</h3>
				<p id="{id}-Edible_use_EN_cut" class="lng en">{Edible_use_EN_cut}</p>
				<p id="{id}-Edible_use_SE_cut" class="lng se">{Edible_use_SE_cut}</p>
				<p id="{id}-Edible_use_RU_cut" class="lng ru">{Edible_use_RU_cut}</p>
			</div>
		</a>
	</template>
	<template id="tpl-plants-header-form">
		<h2 class="heading lngText" dataContent="Categories">Categories</h2>
		<form>
			<div class="row">
				{content}
			</div>
		</form>
		<h2 class="heading lngText" dataContent="Lifespan">Lifespan</h2>
		<div class="row">
			<div class="col-sm-4 lngText" dataContent="(A)nnual">(A)nnual</div>
			<div class="col-sm-4 lngText" dataContent="(B)iennial">(B)iennial</div>
			<div class="col-sm-4 lngText" dataContent="(P)erennial">(P)erennial</div>
		</div>
	</template>
	<template id="tpl-plants-header-form-item">
		<div class="col col-sm-4">
			<input id="{id}" type="checkbox" data-cat="{cat}" checked>
			<label for="{id}">{content}</label>
			<span class="badge">{count}</span>
		</div>
	</template>

	<!-- Scripts -->
	<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	<script src="https://unpkg.com/masonry-layout@4.1/dist/masonry.pkgd.min.js"></script>
	<!-- build:js -->
	<script type="text/javascript" src="js/globals.js"></script>
	<script type="text/javascript" src="js/vendor/tabletop.js"></script>
	<script type="text/javascript" src="js/vendor/cookies-js.min.js"></script>
	<script type="text/javascript" src="js/vendor/artyom.min.js"></script>
	<script type="text/javascript" src="js/vendor/slick.min.js"></script>
	<script type="text/javascript" src="js/tabletop.js"></script>
	<script type="text/javascript" src="js/cookie.js"></script>
	<script type="text/javascript" src="js/favs.js"></script>
	<script type="text/javascript" src="js/lng.js"></script>
	<script type="text/javascript" src="js/masonry.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<!-- endbuild -->
</body>
</html>
