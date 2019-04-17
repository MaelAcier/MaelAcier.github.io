evolutionGraph = document.getElementById('evolution');
derivativeGraph = document.getElementById('derivative');

window.onload = function () {
    document.getElementById('tab-2').appendChild(derivativeGraph);
};

class Model {
    constructor(nom) {
        this.nom = nom
        this.modelID = modelID++
        models[this.modelID] = this
        this.ids = []
        let def = referenceModels.verhulst.default
        this.generate(def.populations, def.duration, def.step, def.model, def.modelisation, def.args)
    }
    generate(populations, duration, step, model, modelisation, args) {
        var populationsCount = populations.length
        if (this.ids.length !== populationsCount) {
            ids = ids.map(e => { if (e === this.modelID) { return null } else return e })
            this.ids = []
            let k = 0
            while (this.ids.length !== populationsCount) {
                if (ids[k] == null) {
                    this.ids.push(k)
                    ids[k] = this.modelID
                }
                k++
            }
        }
        this.arrayX = [0]
        this.arrayY = Array.from(populations, x => [x || 2])
        this.derivative = Array.from(populations, x => [NaN])

        for (let i = step; i < duration; i += step) {
            this.arrayX.push(i)
            let previousPopulation = [], initialPopulation = []
            for (let j = 0; j < populationsCount; j++) {
                previousPopulation.push(this.arrayY[j][this.arrayY[0].length - 1])
                initialPopulation.push(this.arrayY[j][0])
            }
            let callback = referenceModels[model][modelisation](
                args,
                previousPopulation,
                initialPopulation,
                step,
                i
            )
            let actualPopulation = callback.actual
            let actualDerivative = callback.derivative
            for (let j = 0; j < populationsCount; j++) {
                this.arrayY[j].push(actualPopulation[j])
            }
            if (actualDerivative) {
                for (let j = 0; j < populationsCount; j++) {
                    this.derivative[j].push(actualDerivative[j])
                }
            }
        }
        for (let i = 0; i < populationsCount; i++) {
            traces.evolution[this.ids[i]] = {
                x: this.arrayX,
                y: this.arrayY[i],
                fill: 'tozeroy'
            }
        }
        if (this.derivative.length > 0) {
            for (let i = 0; i < populationsCount; i++) {
                traces.derivative[this.ids[i]] = {
                    x: this.arrayY[i],
                    y: this.derivative[i]
                }
            }
        }
        Plotly.react(evolutionGraph, traces.evolution, layout.evolution)
        Plotly.react(derivativeGraph, traces.derivative, layout.derivative)
    }
}

var referenceModels = {
    malthus: {
        default: {
            populations: [1],
            duration: 1,
            step: 0.001,
            model: "malthus",
            modelisation: "discret",
            args: {r:2}
        },
        discret: (args, previousPopulation) => {
            let previous = previousPopulation[0]
            let actual = previous * args.r
            return { actual: [actual] }
        },
        continu: (args, _previousPopulation, initialPopulation, _dt, t) => {
            let initial = initialPopulation[0]
            let actual = initial * Math.exp(args.r * t)
            return { actual: [actual] }
        }
    },
    verhulst: {
        default: {
            populations: [1],
            duration: 100,
            step: 0.001,
            model: "verhulst",
            modelisation: "discret",
            args: { r: 2.1, K: 100 }
        },
        discret: (args, previousPopulation, _initialPopulation, dt) => {
            let previous = previousPopulation[0]
            let dP = (args.r * previous * (1 - (previous / args.K)))
            return {
                actual: [previous + dP * dt],
                derivative: [dP]
            }
        }
    },
    allee: {},
    leslie: {},
    lotkaVolterra: {
        default: {
            populations: [1, 1],
            duration: 20,
            step: 0.001,
            model: "lotkaVolterra",
            modelisation: "discret",
            args: { r: 2 / 3, alpha: 4 / 3, beta: 1, q: 1 }
        },
        discret: (args, previousPopulation, _initialPopulation, dt) => {
            let previousV = previousPopulation[0]
            let previousP = previousPopulation[1]
            let dV = (args.r * previousV - args.alpha * previousV * previousP)
            let dP = (args.beta * previousV * previousP - args.q * previousP)
            return {
                actual: [previousV + dV * dt, previousP + dP * dt],
                derivative: [dV, dP]
            }
        }
    }
}

let modelID = 0
let ids = []
let models = {}
let traces = {
    evolution: [],
    derivative: []
}
var layout = {
    evolution: {
        title: 'Evolution des populations',
        uirevision: 'true',
        xaxis: { autorange: true },
        yaxis: { autorange: true },
        transition: transition,
    },
    derivative: {
        title: 'Portrait de phase',
        uirevision: 'true',
        xaxis: { autorange: true },
        yaxis: { autorange: true },
        transition: transition
    }
}
var transition = {
    duration: 2000,
    easing: 'cubic-in-out'
}

new Model("Courbe n°1")
models[0].generate([1, 1], 20, 0.001, "lotkaVolterra", "discret", { r: 2 / 3, alpha: 4 / 3, beta: 1, q: 1 })

let nb = 10

/* setInterval(() => {
    if (nb < 50) {
        models[0].generate([1, 1], nb, 0.001, "lotkaVolterra", "discret", { r: 2 / 3, alpha: 4 / 3, beta: 1, q: 1 })
        nb++
        console.log(nb)
    }
}, 100) */

// courbes[0].generate([1], 100, 0.1,"verhulst", "discret", { r: 2.1, K: 200 })


/* function getArrays() {
    let traces = []
    for (i = 0, length = models.length; i < length; i++) {
        for (j = 0, len = models[i].arrayY.length; j < len; j++) {
            traces.push({
                x: models[i].arrayX,
                y: models[i].arrayY[j]
            })
        }
    }
    return traces
}

function getDerivatives() {
    let traces = []
    for (i = 0, length = models.length; i < length; i++) {
        for (j = 0, len = models[i].derivative.length; j < len; j++) {
            traces.push({
                x: models[i].arrayY[j],
                y: models[i].derivative[j]
            })
        }
    }
    return traces
} */


// Plotly.plot(tester, getArrays(), { margin: { t: 0 } }, { responsive: true })

// Plotly.plot(test, getDerivatives(), { margin: { t: 0 } }, { responsive: true })
