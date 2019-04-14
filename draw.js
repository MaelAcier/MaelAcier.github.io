function drawGrid() {
	spaceY = height/zoom
	spaceX = width/zoom
	stroke(0, 120)
	strokeWeight(1)
	noFill()
	val = 100*step
	//drawLine(equation)
	drawVerticals()
	drawHorizontals()
}

function drawAxes() {
	fill(0)
	stroke(0)
	strokeWeight(3)
	line(0, h, width, h)
	// line(w, 0, w, height)	
	line(0, 0, 0, height)	
}

function drawLine(equation, col = color(0)) {
	beginShape()
	for(var i = -val/adjustment; i < val/adjustment; i += lineStep) {
		strokeWeight(2)
		stroke(col)
		noFill()
		if(equation.length == 1){
			plotEquation(equation, i)
		}
		else{
			plotEllipse(equation, i, col)
		}
	}
	endShape()	
}

function drawVerticals() {
	for(var i = -val; i < val; i += step) {
		strokeWeight(1)
		stroke(0, 120)
		line(w + i*spaceY, 0, w + i*spaceY, height)
		
		stroke(0, 200)
		text(toFixed(i,2), w + i*spaceY+5, h-5)
	}		
}

function drawHorizontals() {
	for(var i = -val; i < val; i += step) {
		strokeWeight(1)
		stroke(0, 120)
		line(0, h + i*spaceY, width, h + i*spaceY)
		
		stroke(0, 200)
		// text(toFixed(-i,2), w+5, h + i*spaceY-5)
		text(toFixed(-i,2), 5, h + i*spaceY-5)
	}	
}