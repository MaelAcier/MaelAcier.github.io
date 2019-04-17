window.onload = function () {
    tester = document.getElementById('tester');
    test = document.getElementById('test');
    document.getElementById('tab-2').appendChild(test);
};

var arrayX = []
arrayY = [10]

function verhulst(r, K) {
    let previous = arrayY_[arrayY_.length - 1]
    arrayY_.push(previous + r * previous * (1 - (previous / K)))
}

function verhulst2(r, K, dt) {
    let previous = arrayY_[arrayY_.length - 1]
    dp = r * previous * (1 - (previous / K)) * dt
    arrayY_.push(previous + dp)
}


function generate(population, duration, step, fun) {
    arrayX_ = [0]
    arrayY_ = [population]
    for (var i = 1; i < duration; i += step) {
        arrayX_.push(i)
        fun(step)
    }
    Plotly.plot(tester, [{ x: arrayX_, y: arrayY_ }], {
        margin: { t: 0 }
    }, { responsive: true })
}

let trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
}
let trace2 = {
    x: [10, -10, -10, 10, 10, 100],
    y: [10, 10, -10, -10, 10, 100]
}

// generate(1,100,1,(step) => verhulst2(2.1,200,step))

// Plotly.plot(test, [trace2], { margin: { t: 0 } }, { responsive: true })
// Plotly.plot( tester, [trace1], {margin: { t: 0 } },{ responsive: true })

var models = {
    malthus: {
        discret: (args, previousPopulation) => {
            let previous = previousPopulation[0]
            let actual = previous * args.r
            return {actual: [actual]}
        },
        continu: (args, _previousPopulation, initialPopulation, _dt, t) => {
            let initial = initialPopulation[0]
            let actual = initial * Math.exp(args.r * t)
            return {actual: [actual]}
        }
    },
    verhulst: {
        discret: (args, previousPopulation,_initialPopulation,dt) => {
            let previous = previousPopulation[0]
            let actual = previous + (args.r * previous * (1 - (previous / args.K)))*dt
            return {actual: [actual]}
        },
        /* pseudoContinu: (args, previous, _initial, dt) => {
            dp = args.r * previous * (1 - (previous / args.K)) * dt
            return previous + dp
        } */
    },
    allee: {},
    leslie: {},
    lotkaVolterra: {
        discret: (args, previousPopulation,_initialPopulation,dt) => {
            let previousV = previousPopulation[0]
            let previousP = previousPopulation[1]
            let dV = (args.r*previousV - args.alpha*previousV*previousP)
            let dP = (args.beta*previousV*previousP - args.q*previousP)
            return {
                actual: [previousV+dV*dt, previousP+dP*dt],
                derivative: [dV,dP]
            }
        }
    }
}

class Courbe {
    constructor(nom) {
        this.nom = nom
    }
    generate(population, duration, step, model, modelisation, args) {
        this.arrayX = [0]
        this.arrayY = Array.from(population, x => [x||2])
        this.derivative = Array.from(population, x => [NaN])
        var populationNumber = population.length
        for (var i = step; i < duration; i += step) {
            this.arrayX.push(i)
            let previousPopulation = [], initialPopulation = []
            for (let j = 0; j < populationNumber; j++) {
                previousPopulation.push(this.arrayY[j][this.arrayY[0].length - 1])
                initialPopulation.push(this.arrayY[j][0])
            }
            let callback = models[model][modelisation](
                args,
                previousPopulation,
                initialPopulation,
                step,
                i
            )
            let actualPopulation = callback.actual
            let actualDerivative = callback.derivative
            for (let j = 0; j < populationNumber; j++) {
                this.arrayY[j].push(actualPopulation[j])
            }
            for (let j = 0; j < populationNumber; j++) {
                this.derivative[j].push(actualDerivative[j])
            }
        }
    }
}

let courbes = [new Courbe("Courbe n°1")]

// courbes[0].generate([1], 100, 0.1,"verhulst", "discret", { r: 2.1, K: 200 })
courbes[0].generate([1,1], 100, 0.001,"lotkaVolterra", "discret", { r: 2/3, alpha:4/3, beta:1, q:1 })

function getArrays() {
    let traces = []
    for (i = 0, length = courbes.length; i < length; i++) {
        for (j = 0, len = courbes[i].arrayY.length; j < len; j++) {
            traces.push({
                x: courbes[i].arrayX,
                y: courbes[i].arrayY[j]
            })
        }
    }
    return traces
}

function getDerivatives() {
    let traces = []
    for (i = 0, length = courbes.length; i < length; i++) {
        for (j = 0, len = courbes[i].derivative.length; j < len; j++) {
            traces.push({
                x: courbes[i].arrayY[j],
                y: courbes[i].derivative[j]
            })
        }
    }
    return traces
}

Plotly.plot(tester, getArrays(), { margin: { t: 0 } }, { responsive: true })

Plotly.plot(test, getDerivatives(), { margin: { t: 0 } }, { responsive: true })
