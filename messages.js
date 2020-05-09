var loaded = false;
var fill = false;

var data = getData();

window.onload = function()
{
	let days = getDate(totalDays, -1, true);
	let today = days[totalDays];
	days.push(getDate(1)[0]);
	data.data.labels = days;

	fetch("https://discorddb.000webhostapp.com/get?k=&e=json&f=serverActivity").then((d) => d.json()).then((d) => {
		let members = [ [ ], [ ] ];

		for (let i = 0; i <= totalDays; i++)
			for (let j = 0; j < 2; j++)
				members[j].push(d[days[i]] ? d[days[i]].c[j] : 0);

		data.data.datasets = [
			{
				label: "Normal Members",
				backgroundColor: hexToRGBA("#009D9D"),
				borderColor: "#009D9D",
				data: members[0]
			},
			{
				label: "Staff Members",
				backgroundColor: hexToRGBA("#FF6961"),
				borderColor: "#FF6961",
				data: members[1]
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
