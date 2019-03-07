var p;

function setup() {
  createCanvas(400, 400, WEBGL);
  p = createElement('p',"Z:0"+" X:0"+" Y:0")
}

function draw() {
  background(200);
  let z = rotationZ
  let x = rotationX
  let y = rotationY
  rotateZ(radians(z));
  rotateY(radians(x));
  rotateX(radians(y));
  p.html("zyx \n Z:"+rotationZ+" X:"+ rotationX+" Y:"+rotationY)
  box(200, 200, 200);
}