let g = 9.8/60
let dt = 1
let time
let pendules
let center

var sketch = new p5(function( s ) {
    
    s.setup = function() {
        var canvas = s.createCanvas(600, 600)
        canvas.parent('sketch-holder')
        // createCanvas(windowWidth, windowHeight);
        s.pixelDensity(1)
        center = {x:s.width / 2, y:s.height / 2, bx:s.width / 2, by:s.height / 2}
        buffer = s.createGraphics(s.width, s.height)
        buffer.background(255)
        buffer.pixelDensity(1)
        buffer.translate(center.x, center.y)

        new Button(s,"up",50,s.width-100, s.height-150, () => {center.y += 10})
        new Button(s,"down",50,s.width-100, s.height-50, () => {center.y -= 10})
        new Button(s,"right",50,s.width-50, s.height-100, () => {center.x -= 10})
        new Button(s,"left",50,s.width-150, s.height-100, () => {center.x += 10})
        new Button(s,"center",50,s.width-100, s.height-100, () => {center.x = s.width / 2; center.y = s.height / 2})
        curseur = s.createSlider(0, 5, 1,0)
        curseur.position(50,s.height-35)
        new Button(s,"resize",50,0, s.height-50, () => {curseur.value(1)})

        pendules = {
            index: [new Pendule(125),new Pendule(100),new Pendule(80)],
            run: () => {
                for (i=0; i<pendules.index.length; i++) {pendules.index[i].run()}
            },
            play: (bool) => {
                for (i=0; i<pendules.index.length; i++) {pendules.index[i].play(bool)}
            },
            showArm: (bool) => {
                for (i=0; i<pendules.index.length; i++) {pendules.index[i].showArm(bool)}
            },
        }
        pendules.play()
    }
  
    s.draw = function() {
        s.scale(curseur.value())
        s.background(255)
        s.imageMode(s.CORNER)
        s.image(buffer, center.x-center.bx, center.y-center.by, s.width, s.height)
        s.translate(center.x, center.y)
        s.stroke(0)
        s.strokeWeight(2)
    
        pendules.run()
    
        //pendules.index[0].theta1 += 0.01
        //pendules.index[1].theta1 += 0.01
    
        time += dt
        //createDiv(`${pendules.index[0].acceleration1}`)
    };
})