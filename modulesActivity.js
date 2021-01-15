var loaded = false;
var fill = false;

var data = getData();

var command = document.location.search.match(/[?&]cmd=(\S+)/);
command = command ? command[1] : null;

function getGMapRandomColor(alpha) {
	let colorStr = `hsla(${Math.floor(Math.random()*360)}, 100%, 70%, `;
	return [
		colorStr + '1)',
		colorStr + '.3)'
	];
}

window.onload = function()
{
	fetch("https://discorddb.000webhostapp.com/get?k=&e=json&f=moduleListActivity")
		.then((d) => d.text())
		.then((d) => {
			return "[" + d.slice(0, -1) + "]"
		})
		.then((d) => JSON.parse(d))
		.then((d) => {
			// [ {"name": qty}, {}, ... ]
			let modules = [ ];

			// Add all modules
			for (let ls of d)
				for (let m in ls)
					if (!modules[m])
						modules[m] = [ ];

			// Add values per registry
			let labels = [ ];
			for (let registryIndex = 0; registryIndex < Object.keys(modules).length - 1; registryIndex++)
			{
				let r = d[registryIndex];
				for (let m in modules)
					modules[m].push(r[m] || 0);
				labels.push("-");
			}

			let datasets = [ ];
			for (let m in modules)
			{
				let color = getGMapRandomColor(1);
				console.log(color);
				datasets.push({
					label: "#" + m,
					backgroundColor: color[1],
					borderColor: color[0],
					data: modules[m]
				})
			}

			data.data.labels = labels;
			data.data.datasets = datasets;
			loaded = create();
		});
}
window.onkeypress = function(k){
	if (!loaded) return;
	if (k.keyCode == 32)
		create(fill = !fill);
}
