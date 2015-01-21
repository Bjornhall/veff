
// Í JavaScript

var drawing = {
	shapes: [],
	nextObject: "pen",
	nextColor: "black",

	drawAll: function drawAll() {
		for (var i = 0; i < shapes.length; ++i) {
			shapes[i].draw();
		}
	}
};

$(".toolButton").click(function(event) {
	// Assuming there is an attribute on the button element
	// called data-tooltype (could be something other than a button...),
	// and that the attribute contains the name of the tool,
	// i.e. "rect", "circle" etc.
	drawing.nextObject = $(this).attr("data-tooltype");
});

$(".colorButton").click(function(event) {
	// Similar code to the toolButton event handler above
	drawing.nextColor = ...
});

$("#myCanvas").mousedown(function(e) {
	if (nextObject === "rect") {
		// Should draw a rectangle
		drawing.shapes.push( new Rect(drawing.nextColor, e.X, e.Y ));
	} else if (nextObject === "circle") {
		drawing.shapes.push( new Circle(drawing.nextColor, e.X, e.Y ));
	} else if (nextObject === "pen") {
		drawing.shapes.push(new )
	}
});

function Shape() {
	this.x = x;
	this.y = y;
	this.color = color;

	this.isAtPoint = function(x,y) {
		//
	}
}

function Pen(color, x, y) {
	this.draw = function draw () {
		putPoint
	},
	this.isAtPoint = function(x,y) {

	}
}

function Rect(color, x, y) {
	//this.shape = new Shape();
	this.draw = function draw () {
		// TODO: learn about canvas!!!
	},
	this.isAtPoint = function(x,y) {
//		return this.shape.isAtPoint(x,y)
	}
}

Rect.prototype = new Shape();

function Circle() {
	this.draw = function draw() {
		// TODO: learn about canvas!!!
	}
}

Circle.prototype = new Shape();












// var a = new Rect(...);
// console.log(a.x);




