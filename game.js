var gamePattern = [];

var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keydown(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	userClickedPattern = [];

	level++;
	$("#level-title").text("Level " + level);

	var random = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[random];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
	animatePress(randomChosenColour);
}

function playSound(name) {
	var audio = new Audio("./sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	var activeButton = $("#" + currentColour);
	activeButton.addClass("pressed");
	setTimeout(function () {
		activeButton.removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		var sounds = new Audio("./sounds/wrong.mp3");
		sounds.play();
		var background = $("body");
		background.addClass("game-over");
		setTimeout(function () {
			background.removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startover();
	}
}
function startover() {
	level = 0;
	started = false;
	gamePattern = [];
}
