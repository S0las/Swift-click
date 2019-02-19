class Circle {
	constructor(size) {
		this.x = 0;
		this.y = 0;
		this.size = size;
	}
}

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
var scoreEl = document.getElementById('score');
var score = 0;
var timeEl = document.getElementById('time');
var time = 0;
var tapSound = new Audio('assets/tick.mp3');
var paused = false;
var started = false;

if (Math.floor(screenWidth/10) > 100) {
	var c = new Circle(Math.floor(screenWidth/10));
}
else {
	var c = new Circle(100);
}

function setup() {
	createCanvas(screenWidth, screenHeight);
	background(240);
	frameRate(1);

	fill(0);
	c.x = calculateRandomWidth();
	c.y = calculateRandomHeight();
	ellipse(c.x, c.y, c.size, c.size);
}

function draw() {
	if (started) {
		if (time > 0) {
			time -= 1;
			timeEl.innerHTML = time;
		}
		else {
			document.querySelector('.endWindow').classList.add('open');
			document.getElementById('finalScore').innerHTML = score.toFixed(1);
			started = false;
		}
	}
}

function mouseClicked() {

	if (time > 0) {
		circleRadius = c.size/2;
		distanceFromCenter = Math.sqrt( Math.pow(c.x - mouseX, 2) + Math.pow(c.y - mouseY, 2) );

		if (distanceFromCenter <= circleRadius) {
			// You sniped the circle!
			clear();
			score += 1;
			scoreEl.innerHTML = score.toFixed(1); 
			tapSound.play();

			clear();
			background(240);
			c.x = calculateRandomWidth();
			c.y = calculateRandomHeight();
			ellipse(c.x, c.y, c.size, c.size);
		}
		else {
			// YOU MISSED!
			score -= 0.3;
			scoreEl.innerHTML = score.toFixed(1);
		}
	}

	if (paused) { // run this on first click at the start
		circleRadius = c.size/2;
		distanceFromCenter = Math.sqrt( Math.pow(c.x - mouseX, 2) + Math.pow(c.y - mouseY, 2) );

		if (distanceFromCenter <= circleRadius) {
			time = 30;
			started = true;
			paused = false;

			clear();
			score += 1;
			scoreEl.innerHTML = score.toFixed(1); 
			tapSound.play();

			clear();
			background(240);
			c.x = calculateRandomWidth();
			c.y = calculateRandomHeight();
			ellipse(c.x, c.y, c.size, c.size);
		}
	}

}

function calculateRandomWidth() {
	let multiplier = screenWidth - (60 + c.size/2)*2;

	return Math.floor((Math.random() * multiplier) + (60 + c.size/2));
}
function calculateRandomHeight() {
	let multiplier = screenHeight - (60 + c.size/2)*2;

	return Math.floor((Math.random() * multiplier) + (60 + c.size/2));
}


var startBtn = document.getElementById('start');

startBtn.addEventListener('click', function() {
	document.querySelector('.startingWindow').classList.remove('open');
	paused = true;
});


var replayBtn = document.getElementById('replay');

replayBtn.addEventListener('click', function() {
	document.querySelector('.endWindow').classList.remove('open');
	paused = true;

	score = 0;
	scoreEl.innerHTML = 0;
	timeEl.innerHTML = '30';
});