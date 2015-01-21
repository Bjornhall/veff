var drawing = {
    shapes: [],
    nextObject: "pen",
    nextColor: "black",

    drawAll: function drawAll() {
        for (var i = 0; i < shapes.length; ++i) {
            shapes[i].draw(/* TODO: there will be some parameters here...*/);
        }
    }
};

$(".select-tool").on('click', function(event) {
    drawing.nextObject = $(this).attr("data-tooltype");
});

$(".swatch").click(function(event) {
    drawing.nextColor = $(this).attr("data-colortype");
});



