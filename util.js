function hexToRGBA(hex, alpha) {
	let r = parseInt(hex.slice(1, 3), 16),
	g = parseInt(hex.slice(3, 5), 16),
	b = parseInt(hex.slice(5, 7), 16);

	return "rgba(" + r + ", " + g + ", " + b + ", .3)";
}

function randomBrightColor() {
	let colorStr = `hsla(${Math.floor(Math.random()*360)}, 100%, 70%, `;
	return [
		colorStr + '1)',
		colorStr + '.3)'
	];
}

function getDate(quantity = 1, dir = 1, includeCurrent = false) {
	if (includeCurrent)
		quantity++;

	let today = new Date();

	let out = [];
	for (let i = 0; i < quantity; i++)
	{
		if (!(includeCurrent && i == 0))
			today = new Date(today.setDate(today.getDate() + dir));
		out[i] = today.toLocaleDateString("pt-BR");
	}
	if (dir < 0)
		out.reverse();
	return out;
}

function getData() {
	return {
		type: "line",

		data: { },

		options: {
			elements: {
				line: {
					fill: false,
					tension: .2,
					borderWidth: 3,
					pointRadius: 1.5,
					pointHitRadius: 10
				},
			},
			legend: {
				labels: {
					fontColor: "#FFFFFF"
				}
			}
		}
	}
}

let currentChart;
function create(fill)
{
	if (!this.data) return;
	if (!fill)
		fill = this.fill || false;

	data.options.elements.line.fill = fill;
	var ctx = document.getElementById("chart").getContext("2d");
	if (currentChart)
		currentChart.destroy();
	currentChart = new Chart(ctx, data);
	return true;
}

var totalDays = document.location.search.match(/[?&]d=(\d+)/);
totalDays = totalDays ? totalDays[1] - 1 : 29;
