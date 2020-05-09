var loaded = false;
var fill = false;

var data = getData();

var command = document.location.search.match(/[?&]cmd=(\S+)/);
command = command ? command[1] : null;

window.onload = function()
{
	let days = getDate(totalDays, -1, true);
	let today = days[totalDays];
	days.push(getDate(1)[0]);
	data.data.labels = days;

	fetch("https://discordbd.000webhostapp.com/get?k=&e=json&f=shadesCommandsActivity").then((d) => d.json()).then((d) => {
		let commands = [ [ ], [ ] ];

		for (let i = 0; i <= totalDays; i++)
			for (let j = 0; j < 2; j++)
				if (!d[days[i]])
					commands[j].push(0);
				else
				{
					let c = 0;
					for (n in d[days[i]][j])
						if (!command || n == command)
							c += d[days[i]][j][n];
					commands[j].push(c);
				}

		data.data.datasets = [
			{
				label: "Game",
				backgroundColor: hexToRGBA("#BE64C4"),
				borderColor: "#BE64C4",
				data: commands[0]
			},
			{
				label: "Server",
				backgroundColor: hexToRGBA("#FFC472"),
				borderColor: "#FFC472",
				data: commands[1]
			}
		];

		loaded = create();
	});
}
window.onkeypress = function(k){
	if (!loaded) return;
	if (k.keyCode == 32)
		create(fill = !fill);
}
