var p;

function setup() {
  createCanvas(400, 400, WEBGL);
  p = createElement('p',"Z:0"+" X:0"+" Y:0")
}

function draw() {
  background(200);
  rotateZ(radians(rotationZ));
  rotateX(radians(rotationX));
  rotateY(radians(rotationY));
  p.html("Z:"+rotationZ+" X:"+ rotationX+" Y:"+rotationY)
  box(200, 200, 200);
}