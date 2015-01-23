var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var dragging = false;
var radius = 10;
context.lineWidth = radius*2;

var drawing = {
    shapes: [],
    nextObject: "pen",
    nextColor: "black",

    createRect: function (x,y,color,ex,ey){
        var r = new Rect();
        shapes.push(r);
    },

    drawAll: function drawAll() {
        for (var i = 0; i < shapes.length; ++i) {
            shapes[i].draw();
        }
    }
};

$(".select-tool").on('click', function(event) {
    // drawing.nextObject = $(this).attr("data-tooltype");
});

$(".swatch").click(function(event) {
    console.log($(this).attr("data-colortype"));
    // drawing.nextColor = $(this).attr("data-colortype");
});

var Shape = Base.extend({
    constructor: function(x,y,color) {
        this.x = x;
        this.y = y;
        this.color = color;
    },
    draw: function(context) {

    }
});

/* DB SHAPE*/
var ShapeDB = Base.extend({
    constructor: function(x,y,color,type,lineWidth){
        this.x          = x;
        this.y          = y;
        this.endX       = x;
        this.endY       = y;
        this.color      = color;
        this.type       = type;
        this.lineWidth  = lineWidth;
        this.selected   = false;
    }
});

var Rect = Shape.extend({
    draw: function(endX,endY){
        context.beginPath();
        context.rect(this.x, this.y, endX, endY);
        context.fillStyle = this.color;
        context.fill();
        //context.lineWidth = 7;
        context.strokeStyle;
        context.stroke();
    }
});

var engage = function(e){
    //dragging = true;
    color = "#000";
    var r = new Rect(e.offsetX, e.offsetY, color);
}

var disengage = function(e){
    draw(e.offsetX, e.offsetY);
}

canvas.addEventListener('mousedown', engage);
// canvas.addEventListener('mouseup', disengage);
// canvas.addEventListener('mousemove', putPoint);

