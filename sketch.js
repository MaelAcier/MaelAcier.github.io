function setup() {
    let canvas = createCanvas(windowWidth, windowHeight)
    //let canvas = createCanvas(1000, 1000)
    canvas.parent('sketch-holder')
	background(255)
    zoom = 20 // Zoom Level
	// w = width/2
	w = 0
	h = height
	/* equation = ["y = sin(x)"]
	isEllipse = false;
	stored = []
	
	input = createInput();
	input.size(200, 40)
	input.value("y = sin(x)")
  input.position(w - input.width/2, height - 200);
	
	addButton = createButton('+');
	addButton.size(40, 40)
	addButton.position(w - input.width/2 + 200, height - 200)
	addButton.mousePressed(addItem)
	

	adjustment = 1
    */
    
    zooms = {0: 0.1, 2: 1, 20: 1, 40: 2, 60: 5, 100: 10, 150: 20}
    deltaZooms = {0: 2, 2: 2, 20: 2, 40: 2, 60: 5, 100: 10, 150: 20}
    quality = {0: 0.02, 2: 0.05, 20: 0.1, 40: 0.15, 60: 0.25, 100: 0.5, 150: 1} 
    
    var util = UIkit.util;

    util.on(util.$('#toggle-settings'), 'click', function (e) {
        e.preventDefault();
        UIkit.offcanvas('#offcanvas-settings').toggle();
    });
    // UIkit.offcanvas('#offcanvas-settings').toggle();
}

function draw() {
    background(255)
    stroke(0)
    ellipse(windowWidth,0,100,100)
    ellipse(windowWidth/2, windowHeight/2,100,100)

    //textSize(32);
    text('test', 1000, 30);
    
	/* 
    storedBoxes() */
    setStep()
	drawGrid()
	drawAxes()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}