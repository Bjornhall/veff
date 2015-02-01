var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var dragging = false;
var radius = 10;
context.lineWidth = radius*2;

/* GlobalVariables */
var starting_x,
    starting_y,
    ending_x,
    ending_y;

var Point = Base.extend ({
    constructor: function(x,y){
        this.x = x;
        this.y = y;
    }
});

var startPoint = new Point(0,0),
    endPoint = new Point(0,0);

// Calculate height and width
var calcHeightWidth = function(starting_x,starting_y,ending_x,ending_y){
    var heightWidth = [];

    heightWidth[0] = ending_x - starting_x;
    heightWidth[1] = ending_y - starting_y;

    // if(starting_y < ending_y){
    //     heightWidth[0] = ending_y - starting_y;
    // }
    // else if (starting_y > ending_y){
    //     heightWidth[0] = ending_y - starting_y;
    // }
    // if(starting_x < ending_x){
    //     heightWidth[1] = ending_x - starting_x;
    // }
    // else if(starting_x > ending_x){
    //     heightWidth[1] = ending_x - starting_x;
    // }
    return heightWidth;
}

var calcPointHeightWidth = function(PointA, PointB){
    if (PointA.x < PointB.x && PointA.y < PointB.y) {

    }
}

// Drawing object, stores all shapes in one drawing object
var drawing = {
    shapes: [],
    nextObject: "pen",
    nextColor: "black",
    lineWidth: "4",
    nextLineColor: "black",

    createRect: function (x,y,endX,endY){
        var r = new Rect(x,y,endX,endY,this.nextColor,this.lineWidth, this.nextLineColor);
        this.shapes.push(r);
    },

    drawAll: function drawAll() {
        // clearing canvas before drawing all objects
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < drawing.shapes.length; ++i) {
            this.shapes[i].draw();
            console.log(this.shapes[i]);
        }

    }
};

var Shape = Base.extend({
    constructor: function(startX,startY,endX,endY,color,type,lineWidth,lineColor){
        this.x          = startX;
        this.y          = startY;
        this.endX       = endX;
        this.endY       = endY;
        this.color      = color;
        this.type       = type;
        this.lineWidth  = lineWidth;
        this.lineColor  = lineColor;
        this.selected   = false;
    },
    draw: function(context) {
    }
});

var Rect = Shape.extend({
    draw: function(){
        var hw = calcHeightWidth(this.x,this.y,this.endX,this.endY);
        context.beginPath();
        context.rect(this.x, this.y, hw[0], hw[1]);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.lineColor;
        context.stroke();
    }
});

var engage = function(e){
    dragging = true;
    starting_x = e.offsetX;
    starting_y = e.offsetY;
    console.log("Starting X: " + starting_x);
    console.log("Starting Y: " + starting_y);
    startPoint.x = starting_x;
    startPoint.y = starting_y;
    console.log(startPoint);
}

var moving = function(e){
    if(drawing.nextObject === "pencil"){

    }
    else if (drawing.nextObject === "rectangle") {

    }
    else if (drawing.nextObject === "circle") {

    }
    else if (drawing.nextObject === "line") {

    }
}

var disengage = function(e){
    ending_x = e.offsetX;
    ending_y = e.offsetY;

    console.log("Ending X: " + ending_x);
    console.log("Ending Y: " + ending_y);

    var h_w = calcHeightWidth(starting_x,starting_y,ending_x,ending_y);
    console.log("Height: " + h_w[0]);
    console.log("Width: " + h_w[1]);
    drawing.createRect(starting_x,starting_y,ending_x,ending_y);
    drawing.drawAll();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', disengage);
// canvas.addEventListener('mousemove', putPoint);

$(".select-tool").on('click', function(event) {
    drawing.nextObject = $(this).attr("data-tooltype");
});

$(".swatch").click(function(event) {
    drawing.nextColor = $(this).attr("data-colortype");
});

$(".swatch-line").click(function(event) {
    drawing.nextLineColor = $(this).attr("data-colortype");
});

