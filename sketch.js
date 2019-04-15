tester = document.getElementById('tester');
let trace1 = {
	x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }
    
Plotly.plot( tester, [trace1], {
margin: { t: 0 } },{ responsive: true })

test = document.getElementById('test');
	Plotly.plot( test, [{
	x: [1, 2, 3, 4, 5],
	y: [1, 2, 4, 8, 16] }], {
	margin: { t: 0 } } )