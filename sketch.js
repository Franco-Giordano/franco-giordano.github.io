var canvas;

var deltaVec;
var radians = 0;

const scale = 0.008;

var ants = [];

const myGridSize = 10;

class Ant {
	
	constructor(startX, startY, gridSize) {

		this.gridSize = gridSize

		this.prevVec = createVector(startX, startY);

		this.tipVec = p5.Vector.add(this.prevVec, p5.Vector.fromAngle(random(2*PI),this.gridSize));

		this.head = p5.Vector.sub(this.tipVec,this.prevVec).heading();

		this.actualNoise = 0;
	}

	walk() {

		this.actualNoise = noise(this.tipVec.x*scale, this.tipVec.y*scale)

		radians = map(this.actualNoise, 0, 1, -PI/8, PI/8);

		deltaVec = p5.Vector.fromAngle(this.head - radians, this.gridSize);

		this.prevVec = this.tipVec.copy();
		this.tipVec.add(deltaVec);

		this.head = p5.Vector.sub(this.tipVec,this.prevVec).heading();

	}

	draw() {
		stroke(map(this.actualNoise, 0, 0.6, 150, 220), 150);
		point(Math.ceil(this.tipVec.x/this.gridSize)*this.gridSize, Math.ceil(this.tipVec.y/this.gridSize)*this.gridSize);
	}

}


function setup() {

	frameRate(10);

	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style("z-index", -1);

	background(254);
	// vec = createVector(Math.ceil(windowWidth/20) * 10, Math.ceil(windowHeight/20)*10, 10);
	// prevVec = p5.Vector.add(vec, p5.Vector(-10,0));


	for (var i = 0; i < 13; i++) {
		ants.push(new Ant(randomGaussian(windowWidth/2, windowWidth/5), randomGaussian(windowHeight/2, windowHeight/5), myGridSize));
	}


	for (let i = 0; i < windowWidth; i+=myGridSize) {
		for (var j = 0; j < windowHeight; j+=myGridSize) {
			stroke(map(noise(i*scale,j*scale),0.3,0.6,0,255), 30); // Change the color
			strokeWeight(3); // Make the points 10 pixels in size
			point(i,j);
		}
	}

	strokeWeight(4.5);
}

function draw() {
	for (var i = 0; i < ants.length; i++) {
		ants[i].walk();
		ants[i].draw();
	}
}

function mousePressed() {
	ants.push(new Ant(mouseX, mouseY, myGridSize));
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setup();
}


