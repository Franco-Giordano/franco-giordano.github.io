var canvas;

var vec, prevVec;

var deltaVec;

const scale = 0.008;

var radians = 0;

var head;

var ants = [];

class Ant {
	
	constructor(startX, startY, gridSize) {
		// startX = Math.ceil(startX/gridSize)*gridSize;
		// startY = Math.ceil(startY/gridSize)*gridSize;

		this.prevVec = createVector(startX, startY);

		this.tipVec = p5.Vector.add(this.prevVec, p5.Vector.fromAngle(random(2*PI),10));

		this.deltaVec = undefined;

		this.head = p5.Vector.sub(this.tipVec,this.prevVec).heading();

		this.radians = 0;
	}

	walk() {

		radians = map(noise(this.tipVec.x*scale, this.tipVec.y*scale), 0, 1, -PI/8, PI/8);

		deltaVec = p5.Vector.fromAngle(this.head - radians, 10);

		this.prevVec = this.tipVec.copy();
		this.tipVec.add(deltaVec);

		this.head = p5.Vector.sub(this.tipVec,this.prevVec).heading();

	}

	draw() {
		point(Math.ceil(this.tipVec.x/10)*10, Math.ceil(this.tipVec.y/10)*10);
	}


}


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style("z-index", -1);

	background(254);
	// vec = createVector(Math.ceil(windowWidth/20) * 10, Math.ceil(windowHeight/20)*10, 10);
	// prevVec = p5.Vector.add(vec, p5.Vector(-10,0));


	for (var i = 0; i < 5; i++) {
		ants.push(new Ant(randomGaussian(windowWidth/2, windowWidth/3), randomGaussian(windowHeight/2, windowHeight/3), 10));
	}


	for (let i = 0; i < windowWidth; i+=10) {
		for (var j = 0; j < windowHeight; j+=10) {
			stroke(map(noise(i*scale,j*scale),0.3,0.6,0,255), 30); // Change the color
			strokeWeight(3); // Make the points 10 pixels in size
			point(i,j);
		}
	}

	strokeWeight(5);
	stroke(210,150);

}

function draw() {

	// head = p5.Vector.sub(vec,prevVec).heading();

	// radians = map(noise(vec.x*scale, vec.y*scale), 0, 1, -PI/8, PI/8);

	// deltaVec = p5.Vector.fromAngle(head - radians, 10);

	// prevVec = vec.copy();
	// vec.add(deltaVec);

	// point(Math.ceil(vec.x/10)*10, Math.ceil(vec.y/10)*10);

	for (var i = 0; i < ants.length; i++) {
		ants[i].walk();
		ants[i].draw();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setup();
}


