var graph = new p5( function( s ) {
  
    s.setup = function() {
        canvas = s.createCanvas(500, 600);
        canvas.parent('graph-holder');
        s.pixelDensity(1);
    };
  
    s.draw = function() {
        s.background(255)
        s.stroke(0)
        s.ellipse(200,200,20,20)
    };
});