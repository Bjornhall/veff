var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var dragging = false;
var radius = 2;
context.lineWidth = radius*2;

/* GlobalVariables */
var starting_x,
    starting_y,
    ending_x,
    ending_y,
    manni = false;                                                  //draggin true/false gaur

var drawing = {
    shapes: [],
    nextObject: "pencil",
    nextColor: "black",

    createRect: function (x,y,color,width,height){
        var r = new Rect(x,y,color,width,height);
        this.shapes.push(r);
    },

    createPencil: function(x,y, color){                            //create pencil
        console.log("called createPencil");
        var p = new Pencil(x,y);
        this.shapes.push(p);
    },

    drawAll: function drawAll() {
        context.clearRect(0, 0, canvas.width, canvas.height);       //clear canvas bingó
        console.log("cleared canvas");
        for (var i = 0; i < drawing.shapes.length; ++i) {
            this.shapes[i].draw();
        }
    }
};

var Shape = Base.extend({
    constructor: function(x,y,color,width,height){
        this.x          = x;
        this.y          = y;
        this.height     = height;
        this.width      = width;
        this.color      = drawing.nextColor;            //breytti þessu til að fá litina til að halda.
        // this.type       = type;
        this.lineWidth  = context.lineWidth;
        this.selected   = false;
    },
    draw: function(context) {

    }
});

var Rect = Shape.extend({
    draw: function(){
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth;
        context.strokeStyle = this.color;               // þetta er boarder color ? eitthvað sem má bæta við líkt og colors
        context.stroke();
    }
});

var Pencil = Shape.extend({
    path: [],                                                       //create array for the pencil path

    setPoint:function(point)                                        //setPoint function pushes points in array
    {
        this.path.push(point)
    },

    draw: function(){

        context.lineTo(this.x, this.y);
        context.stroke();
        context.beginPath();
        context.arc(this.x, this.y, radius, 0, Math.PI*2);
        context.fill();
        context.beginPath();
        context.moveTo(this.x, this.y);
    }
});

var engage = function(e){
    manni = true;
    //color = "#000";                                                   //óþarfi
    starting_x = e.offsetX;
    starting_y = e.offsetY;
    console.log("Starting X: " + starting_x);
    console.log("Starting Y: " + starting_y);
}

var manuver = function(e){

    if (manni){                                         //manni/manuver er dragging í gamla
        starting_x = e.offsetX;
        starting_y = e.offsetY;
        console.log("manuver X: " + starting_x);
        console.log("manuver Y: " + starting_y);

        currentShape.setPoint({x:starting_x,y:starting_y});         // sendir point inn í setPoint í pencil.

        if(drawing.nextObject === "pencil"){
            //TODO
            drawing.createPencil(starting_x,starting_y,drawing.nextColor);
            drawing.drawAll();
        }
    }
}

var disengage = function(e){
    manni = false;
    ending_x = e.offsetX;
    ending_y = e.offsetY;

    console.log("Ending X: " + ending_x);
    console.log("Ending Y: " + ending_y);

    /* for Rect  ********************************************************* */

    if(starting_x < ending_x){
        var width = ending_x - starting_x;
        console.log(width);
    }
    else if(starting_x > ending_x){
        var width = ending_x - starting_x;
        console.log(width);
    }

    if(starting_y < ending_y){
        var height = ending_y - starting_y;
        console.log(height);
    }
    else if (starting_y > ending_y){
        var height = ending_y - starting_y;
        console.log(height);
    }

    //Choosing  data-tooltype
    if (drawing.nextObject === "rectangle"){
        drawing.createRect(starting_x,starting_y, drawing.nextColor, width, height); //drawing.nexcolor
        drawing.drawAll();
    }
    else if(drawing.nextObject === "pencil"){
        //TODO
        drawing.createPencil(starting_x,starting_y,drawing.nextColor);
        drawing.drawAll();
    }
    else if(drawing.nextObject === "circle"){
        //TODO
    }
    else if(drawing.nextObject === "line"){
        //TODO
    }


    //
    //drawing.createRect(starting_x,starting_y, drawing.nextColor, height, width); //drawing.nexcolor
    //drawing.drawAll();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', manuver);                  //breytti hér
canvas.addEventListener('mouseup', disengage);


$(".select-tool").on('click', function(event) {
    console.log($(this).attr("data-tooltype"));
    drawing.nextObject = $(this).attr("data-tooltype");
});

$(".swatch").click(function(event) {
    console.log($(this).attr("data-colortype"));
    drawing.nextColor = $(this).attr("data-colortype");
});

$(".fa-undo").on('click', function(event) {                 // undo button TODO!!!!
    console.log($(this).attr("data-tooltype"));
    drawing.nextObject = $(this).attr("data-tooltype");
});