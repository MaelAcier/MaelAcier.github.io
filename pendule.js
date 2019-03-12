var pendule = new p5( function(s) {
    s.setup = function() {
    };
  
    s.draw = function() {
    };
});

let colors = {
    index: Math.floor(Math.random()*6)*60,
    number: 1
}

function palette() {
    if (colors.number>5) return color(`hsl(${Math.floor(Math.random()*360)}, 100%, 50%)`)
    colors.index += 60
    colors.number++
    return pendule.color(`hsl(${colors.index % 360}, 100%, 50%)`)
}

class Pendule {
    constructor(r1,r2,m1,m2,theta1,theta2,omega1,omega2,acceleration1,acceleration2) {
        this.set(r1,r2,m1,m2,theta1,theta2,omega1,omega2,acceleration1,acceleration2)
    }   
    set(r1,r2,m1,m2,theta1,theta2,omega1,omega2,acceleration1,acceleration2) {
        this.r1 = typeof r1 === 'undefined' ? this.r1 || 125 : r1 
        this.r2 = typeof r2 === 'undefined' ? this.r2 || 125 : r2
        this.m1 = typeof m1 === 'undefined' ? this.m1 || 10 : m1
        this.m2 = typeof m2 === 'undefined' ? this.m2 || 10 : m2
        this.theta1 = typeof theta1 === 'undefined' ? this.theta1 || 3 * Math.PI / 4 : theta1
        this.theta2 = typeof theta2 === 'undefined' ? this.theta2 || Math.PI / 2 : theta2
        this.omega1 = typeof omega1 === 'undefined' ? this.omega1 || 0 : omega1
        this.omega2 = typeof omega2 === 'undefined' ? this.omega2 || 0 : omega2
        this.acceleration1 = typeof acceleration1 === 'undefined' ? this.acceleration1 || 0 : acceleration1
        this.acceleration2 = typeof acceleration2 === 'undefined' ? this.acceleration2 || 0 : acceleration2
        this.ptheta1 = Math.PI / 2 // à enlever
        this.ptheta2 = Math.PI / 2 // à enlever
        this.pomega1 = 0 // à enlever
        this.pomega2 = 0 // à enlever
        this.arm = true
        this.playing = false
        this.color = this.color || palette()
    }
    updateEulerCromer() {
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
        this.omega1 += this.acceleration1
        this.omega2 += this.acceleration2
        this.theta1 += this.omega1
        this.theta2 += this.omega2
    }
    calcAcceleration() {
        let num1 = -g * (2 * this.m1 + this.m2) * Math.sin(this.theta1)
        let num2 = -this.m2 * g * Math.sin(this.theta1 - 2 * this.theta2)
        let num3 = -2 * Math.sin(this.theta1 - this.theta2) * this.m2
        let num4 = this.omega2 * this.omega2 * this.r2 + this.omega1 * this.omega1 * this.r1 * Math.cos(this.theta1 - this.theta2)
        let den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.theta1 - 2 * this.theta2))
        this.acceleration1 = (num1 + num2 + num3 * num4) / den

        num1 = 2 * Math.sin(this.theta1 - this.theta2)
        num2 = (this.omega1 * this.omega1 * this.r1 * (this.m1 + this.m2))
        num3 = g * (this.m1 + this.m2) * Math.cos(this.theta1)
        num4 = this.omega2 * this.omega2 * this.r2 * this.m2 * Math.cos(this.theta1 - this.theta2)
        den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.theta1 - 2 * this.theta2))
        this.acceleration2 = (num1 * (num2 + num3 + num4)) / den 
    }
    draw() {
        sketch.fill(0)
        if (this.arm) {
            sketch.line(0, 0, this.x1, this.y1)
            sketch.ellipse(this.x1, this.y1, this.m1/10+10, this.m1/10+10)
            sketch.line(this.x1, this.y1, this.x2, this.y2)
        }
        sketch.fill(this.color)
        sketch.ellipse(this.x2, this.y2, this.m2/10+10, this.m2/10+10)
    }
    plot() {
        if (sketch.frameCount > 1) {
            buffer.stroke(this.color);
            buffer.line(this.px2, this.py2, this.x2, this.y2);
        }
        this.px2 = this.x2;
        this.py2 = this.y2;
    }
    run() {
        this.x1 = this.r1 * Math.sin(this.theta1)
        this.y1 = this.r1 * Math.cos(this.theta1)
        this.x2 = this.x1 + this.r2 * Math.sin(this.theta2)
        this.y2 = this.y1 + this.r2 * Math.cos(this.theta2)
        if(this.playing) {
            this.updateEuler()
            this.calcAcceleration()
            this.plot()
        }
        this.draw()
    }
    showArm(bool) {
        typeof bool === "boolean" ? this.arm = bool : this.arm = true
    }
    play(bool) {
        typeof bool === "boolean" ? this.playing = bool : this.playing = true
    }
}