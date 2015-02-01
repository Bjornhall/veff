var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

// canvas.width = window.innerWidth - 220;
// canvas.height = window.innerHeight;

$(document).ready(function() {
  function setHeight() {
    canvas.width = window.innerWidth - 220;
    canvas.height = window.innerHeight;
    var windowHeight = $(window).innerHeight();
    $('#sidebar').css('min-height', windowHeight);
  };
  setHeight();

  $(window).resize(function() {
    setHeight();
  });
});

var dragging = false;
var radius = 10;
context.lineWidth = radius*2;

/* GlobalVariables */
var starting_x,
    starting_y,
    ending_x,
    ending_y;

var undoShape;

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

    return heightWidth;
}

// Drawing object, stores all shapes in one drawing object
var drawing = {
    shapes: [],
    nextObject: "rectangle",
    nextColor: "black",
    nextLineWidth: "4",
    nextLineColor: "black",

    createRect: function (x,y,endX,endY){
        var r = new Rect(x,y,endX,endY,this.nextColor,this.nextObject,this.nextLineWidth, this.nextLineColor);
        this.shapes.push(r);
    },
    createLine: function(x,y,endX,endY){
        var l = new Line(x,y,endX,endY,this.nextColor,this.nextObject,this.nextLineWidth, this.nextLineColor);
        this.shapes.push(l);
    },
    createCircle: function(x,y,endX,endY){
        var c = new Circle(x,y,endX,endY,this.nextColor,this.nextObject,this.nextLineWidth, this.nextLineColor);
        this.shapes.push(c);
    },

    drawAll: function drawAll() {
        // clearing canvas before drawing all objects
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < drawing.shapes.length; ++i) {
            this.shapes[i].draw();
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

var Pen = Shape.extend({
    constructor : function(startX,startY){
        this.penPath = [];
    },
    draw: function(){
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
        context.fill();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
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

var Circle = Shape.extend({
    draw: function(){
        var radius = Math.abs(this.x - this.endX);
        context.beginPath();
        context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.lineColor;
        context.stroke();
    }
});

var Line = Shape.extend({
    draw: function(){
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.endX, this.endY);
        context.stroke();
    }
});

var engage = function(e){
    dragging = true;
    starting_x = e.offsetX;
    starting_y = e.offsetY;
    ending_x = e.offsetX;
    ending_y = e.offsetY;

    startPoint.x = starting_x;
    startPoint.y = starting_y;

    if(drawing.nextObject === "pencil"){

    }
    else if (drawing.nextObject === "rectangle") {
        var h_w = calcHeightWidth(starting_x,starting_y,ending_x,ending_y);
        drawing.createRect(starting_x,starting_y,ending_x,ending_y);
    }
    else if (drawing.nextObject === "circle") {
        drawing.createCircle(starting_x,starting_y,ending_x,ending_y);
    }
    else if (drawing.nextObject === "line") {
        drawing.createLine(starting_x,starting_y,ending_x,ending_y);
    }
}

var moving = function(e){
    if(dragging){
        if(drawing.nextObject === "pencil"){

        }
        else if (drawing.nextObject === "rectangle") {
            drawing.shapes[drawing.shapes.length - 1].endX = e.offsetX;
            drawing.shapes[drawing.shapes.length - 1].endY = e.offsetY;
            drawing.shapes[drawing.shapes.length - 1].draw();
        }
        else if (drawing.nextObject === "circle") {
            drawing.shapes[drawing.shapes.length - 1].endX = e.offsetX;
            drawing.shapes[drawing.shapes.length - 1].endY = e.offsetY;
            drawing.shapes[drawing.shapes.length - 1].draw();
        }
        else if (drawing.nextObject === "line") {
            drawing.shapes[drawing.shapes.length - 1].endX = e.offsetX;
            drawing.shapes[drawing.shapes.length - 1].endY = e.offsetY;
            drawing.shapes[drawing.shapes.length - 1].draw();
        }
    }
}

var disengage = function(e){
    dragging = false;
    ending_x = e.offsetX;
    ending_y = e.offsetY;

    drawing.shapes[drawing.shapes.length - 1].endX = e.offsetX;
    drawing.shapes[drawing.shapes.length - 1].endY = e.offsetY;

    appendShapesToList();

    drawing.drawAll();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', moving);
canvas.addEventListener('mouseup', disengage);


$(".select-tool").on('click', function(event) {
    drawing.nextObject = $(this).attr("data-tooltype");
});

$(".swatch").click(function(event) {
    drawing.nextColor = $(this).attr("data-colortype");
});

$(".swatch-line").click(function(event) {
    drawing.nextLineColor = $(this).attr("data-colortype");
});
// Virknin er global, þaf að laga
$(".radcontrol").click(function(event) {
    drawing.nextLineWidth = $(".radval").val();
});

$('#clear-btn').on('click', function(){
    if(confirm("Are you sure?")){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawing.shapes = [];
    }
});

$('#undo-btn').on('click', function(){
    undoShape = drawing.shapes.pop();
    drawing.drawAll();
});

$('#redo-btn').on('click', function(){
    // Reyna að koma í veg fyrir að sama objectið sé pushað aftur og aftur í shapes!
    if(JSON.stringify(undoShape) !== JSON.stringify(drawing.shapes[drawing.shapes.length])){
        drawing.shapes.push(undoShape);
    }
    drawing.drawAll();
});

var appendShapesToList = function(){
    $('.list-of-shapes').append('<div class="shape-item">' + drawing.shapes[drawing.shapes.length - 1].type + "-" + drawing.shapes.length +'</div>');
}
