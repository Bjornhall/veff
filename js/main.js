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

var drawing = {
    shapes: [],
    nextObject: "pen",
    nextColor: "black",

    createRect: function (x,y,color,height,width){
        var r = new Rect(x,y,color,height,width);
        this.shapes.push(r);
    },

    drawAll: function drawAll() {
        for (var i = 0; i < drawing.shapes.length; ++i) {
            this.shapes[i].draw();
        }
    }
};

var Shape = Base.extend({
    constructor: function(x,y,color, height, width){
        this.x          = x;
        this.y          = y;
        this.height     = height;
        this.width      = width;
        this.color      = color;
        // this.type       = type;
        // this.lineWidth  = lineWidth;
        this.selected   = false;
    },
    draw: function(context) {

    }
});

var Rect = Shape.extend({
    draw: function(){
        context.beginPath();
        context.rect(this.x, this.y, this.height, this.width);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth = 7;
        context.strokeStyle;
        context.stroke();
    }
});

var engage = function(e){
    //dragging = true;
    color = "#000";
    starting_x = e.offsetX;
    starting_y = e.offsetY;
    console.log("Starting X: " + starting_x);
    console.log("Starting Y: " + starting_y);
}

var disengage = function(e){
    ending_x = e.offsetX;
    ending_y = e.offsetY;
    var height = ending_y - starting_y;
    var width = ending_x - starting_x;

    console.log("Ending X: " + ending_x);
    console.log("Ending Y: " + ending_y);


    drawing.createRect(starting_x,starting_y,'#fff', height, width);
    drawing.drawAll();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', disengage);
// canvas.addEventListener('mousemove', putPoint);




$(".select-tool").on('click', function(event) {
    // drawing.nextObject = $(this).attr("data-tooltype");
});

$(".swatch").click(function(event) {
    console.log($(this).attr("data-colortype"));
    // drawing.nextColor = $(this).attr("data-colortype");
});