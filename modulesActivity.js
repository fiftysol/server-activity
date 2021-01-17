var loaded = false;
var fill = false;

var data = getData();

var command = document.location.search.match(/[?&]cmd=(\S+)/);
command = command ? command[1] : null;

window.onload = function()
{
	fetch("https://cors-anywhere.herokuapp.com/https://discorddb.000webhostapp.com/get?k=&e=json&f=moduleListActivity")
		.then((d) => d.text())
		.then((d) => {
			return "[" + d.slice(0, -1) + "]"
		})
		.then((d) => JSON.parse(d))
		.then((d) => {
			// [ {"#name": qty}, {}, ... ]
			let modules = [ ];

			// Add all modules
			let labels = [ ], totalCountByModule = { };
			for (let registryIndex = 0; registryIndex < d.length; registryIndex++)
			{
				let hasTimestamp = false;
				for (let m in d[registryIndex])
					if (m == "_t")
					{
						labels.push(new Date(d[registryIndex][m] * 1000).toISOString().slice(0, 19));
						hasTimestamp = true;
					}
					else if (!modules[m])
					{
						modules[m] = [ ];
						totalCountByModule[m] = 0;
					}

				if (!hasTimestamp)
					labels.push('-');
			}

			// Add values per registry
			let totalCount = 0;
			for (let registryIndex = 0; registryIndex < d.length; registryIndex++)
			{
				let r = d[registryIndex];
				for (let m in modules)
				{
					let value = r[m] || 0;
					modules[m].push(value);

					totalCountByModule[m] += value;
					totalCount += value;
				}
			}

			let datasets = [ ];
			for (let m of Object.keys(modules).sort())
			{
				let color = randomBrightColor();
				datasets.push({
					label: m,
					backgroundColor: color[1],
					borderColor: color[0],
					data: modules[m]
				})
			}

			data.data.labels = labels;
			data.data.datasets = datasets;
			loaded = create();

			let averageByModule = [ ];
			for (let m in modules)
				averageByModule.push([m, (totalCountByModule[m] / totalCount) * 100]);
			averageByModule.sort((a, b) => { return b[1] - a[1] })

			document.getElementById("percent").innerHTML = averageByModule.map((m) => {
				return `<B>${m[0].padEnd(15, ' ')}</B>: ${m[1].toFixed(3).toString().padStart(7, '0')}%`;
			}).join("<br>");
		});
}
window.onkeypress = function(k){
	if (!loaded) return;
	if (k.keyCode == 32)
		create(fill = !fill);
}
