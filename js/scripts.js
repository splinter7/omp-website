function Music(dir)
{
	this.snd = new Audio(dir);
	this.snd.load();
	this.snd.volume=0.2;
	this.status = "paused";
}	

// play sound effects
Music.prototype.play = function()
{
	obj = this.snd
	var audio = $(obj);
	obj.play();
	
	obj.addEventListener('timeupdate', function (){
		var duration = audio[0].duration;
		var curtime = audio[0].currentTime;
		
		var val = (curtime/duration)*100;		
		$('#bar').css('width', val+'%');
		
		if(val < 100) {
			$(".bar").each(function(i) {
			    fluctuate($(this));
			});
		} else {
			$(".bar").each(function(i) {
			    $(this).clearQueue().stop();
			});
			controlAudio()
	     	}
			
		
	}, false);
	
	this.status = "playing";
}

// stop sound effects
Music.prototype.stop = function()
{
	this.snd.pause();
	this.status = "paused";
}

Music.prototype.getStatus = function()
{
	return this.status;
}
/***********************************************************/

$(function () {
	$('.area'+count).fadeIn('fast');
	controlAudio();
});
/***********************************************************/


function openPage(id) {
	var numDivs = $('.page').length;
	$('.page').fadeOut('fast', function() {
			if( --numDivs > 0 ) return;
			$('.'+id).fadeIn(1000);
			if(id == "contact"){ initialize(); }
	});
}

var song = new Music("audio/choppa.mp3");

function controlAudio() {
	if($('#audioControl').attr('class') == 'audioPlay'){
		$('#audioControl').removeClass('audioPlay');
		$('#audioControl').addClass('audioPause');
		playAudio();
	} else {
		$('#audioControl').addClass('audioPlay');
		$('#audioControl').removeClass('audioPause');
		stopAudio();
	}
}

function stopAudio() {
	song.stop();
}

function playAudio() {
	song.play();
}

function fluctuate(bar) {
     if(song.getStatus() != "paused"){
	var hgt = Math.random() * 10;
	hgt += 1;
	var t = hgt * 10;
	
	bar.animate({
	height: hgt
	}, t, function() {
	   fluctuate($(this));
	});
     } else {
     	     $(".bar").each(function(i) {
		    $(this).clearQueue().stop();
	     });
     }
}

var $carousel = $('#carousel').carousel();
var sites = ['http://www.ompmusicgroup.com', 'http://www.chrisoxygen.com', 'http://www.msrfjamaica.com', 'javascript:void(0);', 'http://ompmusicgroup1.wix.com/anastasis'];
var count = 2; 
$('.highlight').wrap('<a href="'+sites[count-1]+'" target="_blank">');


$('#carousel_prev').on('click', function(ev) {
		$carousel.carousel('prev');		
		$('.area'+count).fadeOut('fast', function() {
				setCount($carousel.carousel('getCurrent'));
				if(count <= 2){
          $('.highlight').wrap('<a href="'+sites[count-1]+'" target="_blank">');
        } else {
          $('.highlight').wrap('<a href="'+sites[count-1]+'" onclick="openPage(\'contact\')">');
        }
				console.log(count);
				$('.area'+count).fadeIn('fast')
		});
});

$('#carousel_next').on('click', function(ev) {
		$carousel.carousel('next');
		$('.area'+count).fadeOut('fast', function() {
				setCount($carousel.carousel('getCurrent'));
				if(count <= 3){
          $('.highlight').wrap('<a href="'+sites[count-1]+'" target="_blank">');
        } else {
          $('.highlight').wrap('<a href="'+sites[count-1]+'" onclick="openPage(\'contact\')">');
        }
				$('.area'+count).fadeIn('fast')
		});
});


function setCount(num) {
	switch(num){
	case 0:
		count = 2;
		break;
	case 1:
		count = 3;
		break;
	case 2:
		count = 4;
		break;
	case 3:
		count = 5;
		break;
	case 4:
		count = 1;
		break;
	}
	
	//console.log(num);
}

function initialize() {
	var myLatlng = new google.maps.LatLng(17.967313,-76.789042);
	var mapOptions = {
	  zoom: 18,
	  center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);		
	
	var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      title:"OMP Music Group"
	});
	
	var infowindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', (function(marker) {
		return function() {
		  infowindow.setContent('<div style="line-height:1.35;overflow:hidden;white-space:nowrap;"><strong>OMP Music Group</strong><br>103 Tower Street<br>Kingston, Jamaica</div>');
		  infowindow.open(map, marker);
		}
	})(marker));
	
	// To add the marker to the map, call setMap();
	marker.setMap(map);
}
