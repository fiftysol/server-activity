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
		let members = [ [ ], [ ] ];

		for (let i = 0; i < 30; i++)
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