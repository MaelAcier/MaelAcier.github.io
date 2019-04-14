function keyPressed() {
	switch(keyCode) {
		case ENTER:
			if(input.value() != ""){
				equation = cleanEquation(input.value())
			}
			else{equation = ["y=0"]}
			break;
		case UP_ARROW:
			adjustment = adjustment == 5 ? 1 : 5
			break;
	}
}

function mouseWheel(event) {
	temp = event.delta
	if(temp > 0){
		zoom += deltaZoom
	}
	else if(temp < 0 && zoom > 2){
		zoom -= deltaZoom
	}
  return false;
}


function mouseDragged() {
    if (w + mouseX - pmouseX>0){
        w = 0
    } else {
        w += mouseX - pmouseX
    }
	h += mouseY - pmouseY
}

function doubleClicked() {
	w = width/2
	h = height/2
}

function setStep() {
	for(key in zooms){
		if(zoom > key){
			step = zooms[key]
			lineStep = quality[key]
			deltaZoom = deltaZooms[key]
		}
	}	
}

function lim(xy, val){
	if(xy == "x"){
		return val*2*zoom + int((width/2-w)/38)
	}
	else{
		return val*2*zoom + int((height/2-h)/38)
	}
}

function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}