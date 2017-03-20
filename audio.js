var valeurSon = $(".volume").val();
var fini = false;

$(".player").append('<button class="play control"></button><div class="progress"><div class="currentTime"></div><div class="progressHover"></div><div class="progressPlay"></div></div><div class="temps">00:00:00</div><button class="son control icon-volume-up"></button><input type="range" class="volume" min="0" max="10" value="10">');

function lecture()
{
	var thisAudio = this.parentElement.children[0];
	var boutonPlay = $(this).parents(".player").children(".play");
	var thisProgressPlay = $(this).parents(".player").children(".progress").children(".progressPlay");
	
	if(thisAudio.paused)
	{
		if(fini == true)
		{
			thisProgressPlay.css("width", "0%");
			fini = false;
		}
		
		thisAudio.play();
		boutonPlay.removeClass("icon-play");
		boutonPlay.addClass("icon-pause");
	}
	else
	{
		thisAudio.pause();
		boutonPlay.removeClass("icon-pause");
		boutonPlay.addClass("icon-play");
	}
}

function son()
{
	var thisAudio = this.parentElement.children[0];
	var boutonSon = $(this).parents(".player").children(".son");
	var volume = $(this).parents(".player").children(".volume");
	
	if(thisAudio.muted)
	{
		thisAudio.muted = false;
		boutonSon.removeClass("icon-volume-off");
		boutonSon.addClass("icon-volume-up");
		volume.val(valeurSon);
	}
	else
	{
		valeurSon = volume.val();
		thisAudio.muted = true;
		boutonSon.removeClass("icon-volume-up");
		boutonSon.addClass("icon-volume-off");
		volume.val(0);
	}
}

function volume()
{
	var thisAudio = this.parentElement.children[0];
	var boutonSon = $(this).parents(".player").children(".son");
	var volume = $(this).parents(".player").children(".volume");
	
	if(thisAudio.muted)
	{
		thisAudio.muted = false;
	}
	thisAudio.volume = volume.val() / 10;
	if((volume.val() / 10) == 0)
	{
		boutonSon.removeClass("icon-volume-up");
		boutonSon.addClass("icon-volume-off");
	}
	else
	{
		boutonSon.removeClass("icon-volume-off");
		boutonSon.addClass("icon-volume-up");
	}
}

for(var i = 0; i < $("audio").length; i++)
{
	var boutonPlay = $("audio")[i].parentElement.children[1];
	if($("audio")[i].getAttribute('autoplay') != null)
	{
		boutonPlay.className += " icon-pause";
	}
	else
	{
		boutonPlay.className += " icon-play";
	}
	
	$("audio")[i].addEventListener('timeupdate',function(){
		var thisAudio = this.parentElement.children[0];
		var thisTemps = $(this).parents(".player").children(".temps");
		var thisProgressPlay = $(this).parents(".player").children(".progress").children(".progressPlay");
		
		var time = Math.floor(thisAudio.currentTime);
		
		if(time < 60)
		{
			if(time < 10)
			{
				time = "0" + time;
			}
			thisTemps.text("00:00:" + time);
		}
		else
		{
			var heures = 0;
			if(time >= 3600)
			{
				heures = Math.floor(time / 3600);
			}
			var minutes = Math.floor((time - (heures * 3600)) / 60);
			var secondes = time - (heures * 3600) - (minutes * 60);
			if(minutes < 10)
			{
				minutes = "0" + minutes;
			}
			if(secondes < 10)
			{
				secondes = "0" + secondes;
			}
			if(heures < 10)
			{
				heures = "0" + heures;
			}
			thisTemps.text(heures + ":" + minutes + ":" + secondes);
		}
		
		thisProgressPlay.css("width", ((thisAudio.currentTime / thisAudio.duration) * 100) + "%");
		
	}, false);
	
	$("audio")[i].onended = function() {
		var boutonPlay = $(this).parents(".player").children(".play");
		
		boutonPlay.removeClass("icon-pause");
		boutonPlay.addClass("icon-play");
		fini = true;
	};
}

$(".progress").click(function (e) { 
	var thisAudio = this.parentElement.children[0];
	var thisProgress = $(this).parents(".player").children(".progress");

	var position = ((e.clientX - $(this).offset().left) / parseInt(thisProgress.css("width"), 10));
	thisAudio.currentTime = thisAudio.duration * position;
});

$(".progress").hover(function (e) { 
	
	var thisCurrentTime = $(this).parents(".player").children(".progress").children(".currentTime");
	var thisProgressHover = $(this).parents(".player").children(".progress").children(".progressHover");

	var position = (e.clientX - $(this).offset().left);
	thisCurrentTime.css("display", "block");
	thisProgressHover.css("display", "inline-block");
},
function (e) { 
	var thisCurrentTime = $(this).parents(".player").children(".progress").children(".currentTime");
	var thisProgressHover = $(this).parents(".player").children(".progress").children(".progressHover");

	thisCurrentTime.fadeOut("fast");
	thisProgressHover.fadeOut("fast");
});

$(".progress").mousemove(function (e) {
	var thisAudio = this.parentElement.children[0];
	var thisProgress = $(this).parents(".player").children(".progress");
	var thisCurrentTime = $(this).parents(".player").children(".progress").children(".currentTime");
	var thisProgressHover = $(this).parents(".player").children(".progress").children(".progressHover");
	
	var position = ((e.clientX - $(this).offset().left) / parseInt(thisProgress.css("width"), 10));
	thisCurrentTime.css("margin-left", (e.clientX - $(this).position().left - 31) + "px");
	
	var time = Math.floor(thisAudio.duration * position);
	
	if(time < 60)
	{
		if(time < 10)
		{
			time = "0" + time;
		}
		thisCurrentTime.text("00:00:" + time);
	}
	else
	{
		var heures = 0;
		if(time >= 3600)
		{
			heures = Math.floor(time / 3600);
		}
		var minutes = Math.floor((time - (heures * 3600)) / 60);
		var secondes = time - (heures * 3600) - (minutes * 60);
		if(minutes < 10)
		{
			minutes = "0" + minutes;
		}
		if(secondes < 10)
		{
			secondes = "0" + secondes;
		}
		if(heures < 10)
		{
			heures = "0" + heures;
		}
		thisCurrentTime.text(heures + ":" + minutes + ":" + secondes);
	}
	
	thisProgressHover.css("width", ((e.clientX - $(this).offset().left) / parseInt(thisProgress.css("width"), 10)) * 100 + "%")
});

$(".play").click(lecture);
$(".son").click(son);
$(".volume").click(volume);