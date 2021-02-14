var loaded = false;
var fill = false;

var data = getData();

window.onload = function()
{
	let days = getDate(totalDays, -1, true);
	let today = days[totalDays];
	days.push(getDate(1)[0]);
	data.data.labels = days;

	fetch("https://bolo-cors.herokuapp.com/https://discorddb.000webhostapp.com/get?k=&e=json&f=serverActivity").then((d) => d.json()).then((d) => {
		let flow = [ [ ], [ ] ];

		for (let i = 0; i <= totalDays; i++)
			for (let j = 0; j < 2; j++)
				flow[j].push((d[days[i]] && d[days[i]].m) ? d[days[i]].m[j] : 0);

		data.data.datasets = [
			{
				label: "Joined",
				backgroundColor: hexToRGBA("#718BD8"),
				borderColor: "#718BD8",
				data: flow[0]
			},
			{
				label: "Left",
				backgroundColor: hexToRGBA("#DD4546"),
				borderColor: "#DD4546",
				data: flow[1]
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
