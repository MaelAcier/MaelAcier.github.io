// hljs.initHighlightingOnLoad()

function exportation () {
    Plotly.downloadImage('graph-holder', {
        format: document.getElementById('export-format').value,
        scale: document.getElementById('export-echelle').value,
        width: document.getElementById('export-largeur').value,
        height: document.getElementById('export-hauteur').value,
        filename: 'Simulation'
    });
}


window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");
});

window.setTimeout(() => {
    document.getElementById('code-js').innerHTML = document.getElementById('import-js').contentDocument.firstChild.childNodes[1].firstChild.innerHTML
    // document.getElementById('code-py').innerHTML = document.getElementById('import-py').contentDocument.firstChild.childNodes[1].firstChild.innerHTML

    hljs.initHighlighting()
}, 2000);
