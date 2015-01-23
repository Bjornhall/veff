$(document).ready( function(){
        $('#takki').on('click', function(e){
        e.preventDefault();
        $('.stuff').append('<p>Halló</p>');
    });
});

var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var dragging = false;
var radius = 10;
context.lineWidth = radius*2;


var putPoint = function (e){
  if(dragging){
    // Connect previous path to current path
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    // begin drawing
    context.beginPath();
    context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
    context.fill();
    // create a solid line
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);
  }
}

var engage = function(e) {
  dragging = true;
  putPoint(e);
}
var disengage = function() {
  dragging = false;
  context.beginPath();
}
canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);


function createRect() {

}


