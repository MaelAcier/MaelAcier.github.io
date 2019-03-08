let g = 9.8/60
let dt = 1
let time
var colors= ['aqua', 'blue', 'fuchsia',
'lime', 'maroon', 'orange', 'purple', 'red', 
'white', 'yellow']
function randomColor() {
    if (colors.length !== 0){
        let n = Math.floor(Math.random() * colors.length)
        return colors.splice(n, 1)[0]
    }
    return '#'+Math.floor(Math.random()*16777215).toString(16)
}


class Pendulum {
    constructor(r1) {
        this.r1 = r1
        this.r2 = 125
        this.m1 = 10
        this.m2 = 10
        this.theta1 = 3 * Math.PI / 4
        this.theta2 = Math.PI / 2
        this.ptheta1 = Math.PI / 2
        this.ptheta2 = Math.PI / 2
        this.omega1 = 0
        this.omega2 = 0
        this.pomega1 = 0
        this.pomega2 = 0
        this.acceleration1 = 0
        this.acceleration2 = 0
        this.arm = true
        this.color = randomColor()
    }
    updateEulerCromer() {
        this.x1 = this.r1 * sin(this.theta1)
        this.y1 = this.r1 * cos(this.theta1)
        this.x2 = this.x1 + this.r2 * sin(this.theta2)
        this.y2 = this.y1 + this.r2 * cos(this.theta2)
        
        let num1 = -g * (2 * this.m1 + this.m2) * sin(this.theta1)
        let num2 = -this.m2 * g * sin(this.theta1 - 2 * this.theta2)
        let num3 = -2 * sin(this.theta1 - this.theta2) * this.m2
        let num4 = this.omega2 * this.omega2 * this.r2 + this.omega1 * this.omega1 * this.r1 * cos(this.theta1 - this.theta2)
        let den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.theta1 - 2 * this.theta2))
        this.acceleration1 = (num1 + num2 + num3 * num4) / den

        num1 = 2 * sin(this.theta1 - this.theta2)
        num2 = (this.omega1 * this.omega1 * this.r1 * (this.m1 + this.m2))
        num3 = g * (this.m1 + this.m2) * cos(this.theta1)
        num4 = this.omega2 * this.omega2 * this.r2 * this.m2 * cos(this.theta1 - this.theta2)
        den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.theta1 - 2 * this.theta2))
        this.acceleration2 = (num1 * (num2 + num3 + num4)) / den

        this.omega1 = this.pomega1 + dt * this.acceleration1
        this.omega2 = this.pomega2 + dt * this.acceleration2
        this.theta1 = this.ptheta1 + dt * this.pomega1
        this.theta2 = this.ptheta2 + dt * this.pomega2
        

        this.ptheta1 = this.theta1
        this.ptheta2 = this.theta2
        this.pomega1 = this.omega1
        this.pomega2 = this.omega2
    }
    updateEuler() {
        this.x1 = this.r1 * sin(this.theta1)
        this.y1 = this.r1 * cos(this.theta1)
        this.x2 = this.x1 + this.r2 * sin(this.theta2)
        this.y2 = this.y1 + this.r2 * cos(this.theta2)
        
        let num1 = -g * (2 * this.m1 + this.m2) * sin(this.theta1)
        let num2 = -this.m2 * g * sin(this.theta1 - 2 * this.theta2)
        let num3 = -2 * sin(this.theta1 - this.theta2) * this.m2
        let num4 = this.omega2 * this.omega2 * this.r2 + this.omega1 * this.omega1 * this.r1 * cos(this.theta1 - this.theta2)
        let den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.theta1 - 2 * this.theta2))
        this.acceleration1 = (num1 + num2 + num3 * num4) / den

        num1 = 2 * sin(this.theta1 - this.theta2)
        num2 = (this.omega1 * this.omega1 * this.r1 * (this.m1 + this.m2))
        num3 = g * (this.m1 + this.m2) * cos(this.theta1)
        num4 = this.omega2 * this.omega2 * this.r2 * this.m2 * cos(this.theta1 - this.theta2)
        den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.theta1 - 2 * this.theta2))
        this.acceleration2 = (num1 * (num2 + num3 + num4)) / den

        this.omega1 += this.acceleration1
        this.omega2 += this.acceleration2
        this.theta1 += this.omega1
        this.theta2 += this.omega2
        
    }
    draw() {
        fill(0)
        if (this.arm) {
            line(0, 0, this.x1, this.y1)
            ellipse(this.x1, this.y1, this.m1, this.m1)
            line(this.x1, this.y1, this.x2, this.y2)
        }
        fill(this.color)
        ellipse(this.x2, this.y2, this.m2, this.m2)
    }
    plot() {
        if (frameCount > 1) {
            buffer.stroke(this.color);
            buffer.line(this.px2, this.py2, this.x2, this.y2);
        }
        this.px2 = this.x2;
        this.py2 = this.y2;
    }
    showArm(bool) {
        typeof bool === "boolean" ? this.arm = bool : this.arm = true
    }
}

var pendules = {
    index: [new Pendulum(125),new Pendulum(100),new Pendulum(80)],
    updateEulerCromer: () => {
        for (i=0; i<pendules.index.length; i++) {pendules.index[i].updateEulerCromer()}
    },
    updateEuler: () => {
        for (i=0; i<pendules.index.length; i++) {pendules.index[i].updateEuler()}
    },
    draw: () => {
        for (i=0; i<pendules.index.length; i++) {pendules.index[i].draw()}
    },
    plot: () => {
        for (i=0; i<pendules.index.length; i++) {pendules.index[i].plot()}
    },
    showArm: (bool) => {
        for (i=0; i<pendules.index.length; i++) {pendules.index[i].showArm(bool)}
    },
}

function setup() {
    createCanvas(500, 600);
    pixelDensity(1);
    cx = width / 2;
    cy = 300;
    buffer = createGraphics(width, height);
    buffer.background(175);
    buffer.translate(cx, cy);
    p = createElement("_")
}

function draw() {
    background(175);
    imageMode(CORNER);
    image(buffer, 0, 0, width, height);
    translate(cx, cy);
    stroke(0);
    strokeWeight(2);

    pendules.updateEuler()
    pendules.draw()
    pendules.plot()

    //pendules.index[0].theta1 += 0.01
    //pendules.index[1].theta1 += 0.01

    time += dt
    //createDiv(`${pendules.index[0].acceleration1}`)
}