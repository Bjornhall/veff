var setRadius = function(newRadius){
    if(newRadius < minRad)
        newRadis = minRad;
    else if (newRadius > maxRad)
        newRadius = maxRad;
    radius = newRadius;
    context.lineWidth = radius*2;

    radSpan.innerHTML = newRadius;
}


var minRad = 0.5,
    maxRad = 100,
    defaultRad = 5,
    interval = 1,
    radSpan = document.getElementById('radval'),
    decRad = document.getElementById('decRad'),
    incRad = document.getElementById('incRad');

$('#decRad').on('click', function(){
    setRadius(radius-interval);
});

$('#incRad').on('click', function(){
    setRadius(radius+interval);
});

setRadius(defaultRad);