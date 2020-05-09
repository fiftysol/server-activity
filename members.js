var loaded = false;
var fill = false;

var data = getData();

window.onload = function()
{
	let days = getDate(totalDays, -1, true);
	let today = days[totalDays];
	days.push(getDate(1)[0]);
	data.data.labels = days;

	data.options.legend = { display: false };

	fetch("https://discordbd.000webhostapp.com/get?k=&e=json&f=serverActivity").then((d) => d.json()).then((d) => {
		let members = [ ];

		for (let i = 0; i <= totalDays; i++)
			members.push(d[days[i]] ? Object.keys(d[days[i]].l).length : 0);

		data.data.datasets = [
			{
				label: "",
				backgroundColor: hexToRGBA("#009D9D"),
				borderColor: "#009D9D",
				data: members
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
