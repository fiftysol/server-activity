var loaded = false;
var fill = false;

var data = getData();

window.onload = function()
{
	let days = getDate(29, -1, true);
	let today = days[29];
	days.push(getDate(1)[0]);
	data.data.labels = days;

	fetch("https://discbotdb.000webhostapp.com/get?k=&f=b_serveractivity").then((d) => d.json()).then((d) => {
		let commands = [ [ ], [ ] ];

		for (let i = 0; i < 30; i++)
			for (let j = 0; j < 2; j++)
				commands[j].push(d[days[i]] ? d[days[i]].b[j] : 0);

		data.data.datasets = [
			{
				label: "Bot",
				backgroundColor: hexToRGBA("#BE64C4"),
				borderColor: "#BE64C4",
				data: commands[0]
			},
			{
				label: "Global",
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