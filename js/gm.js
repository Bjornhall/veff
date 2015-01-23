var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var radius = 10;
var dragging = false;
var hand = "pen"; // types of drawing methods

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



//change this later RECT widht and height
var rectwidth = 200;
var rectheight = 200;


context.lineWidth = radius*2;

var putPoint = function(e){

	if (dragging){

		if(hand === "pen"){
			context.lineTo(e.clientX, e.clientY);
			context.stroke();
			context.beginPath();
			context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
			context.fill();
			context.beginPath();
			context.moveTo(e.clientX, e.clientY);
		}
		else if(hand === "circle"){
			context.beginPath();
		    context.arc(e.clientX, e.clientY, radius, 0, 2 * Math.PI, false);
		    context.fillStyle ='rgba(0, 0, 200, 0)';
		    context.fill();
		    //context.lineWidth = 5;
		    context.strokeStyle;
		    context.stroke();
		}
		else if(hand === "rect"){
			context.beginPath();
      		context.rect(e.clientX, e.clientY, rectwidth, rectheight);
	      	context.fillStyle = 'rgba(0, 0, 200, 0)';
	      	context.fill();
	      	//context.lineWidth = 7;
	      	context.strokeStyle;
	      	context.stroke();
		}

	}	
}

var engage = function(e){
	dragging = true;
	putPoint(e);
}

var disengage = function(){
	dragging = false;
	context.beginPath();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('mousemove', putPoint);





