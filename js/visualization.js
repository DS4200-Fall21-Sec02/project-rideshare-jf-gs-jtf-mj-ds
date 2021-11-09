// read in data as example for PM06
d3.csv('data/all_vis.csv').then((data) => {

	//print data to log
	console.log(data.slice(0,10));


})

// Variables
var margin = { top: 10, right: 30, bottom: 50, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;


// SPACE FOR VIS 1: BAR CHART AND SCATTER PLOT (JUSTIN)

var svg1 = d3
  .select("#vis1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv('data/all_vis.csv', function(row) {

	// get weekday for each entry
	const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S');
	const formatTime = d3.timeFormat('%a');
	const formatHours = d3.timeFormat('%X');
	d3Time = parseTime(row.datetime)
	Weekday = formatTime(d3Time)
	Time = formatHours(d3Time)
	
	// format the data
	return {
		Weekday: Weekday, 
		SurgeMultiplier: +row.surge_multiplier,
		Price: +row.price,
		Time: Time,
		CabType : row.cab_type
	}


	}).then((data) => {

		// bar chart
		// pseudo-code:
		// -- hard code each of the days of the week's values
		


		// scatter plot
		// pseudo-code: 
		// - on hover, 
		// - clear the existing scatter plot
		// - trigger the drawing of a scatter plot


})



// END OF SPACE FOR VIS 1



// SPACE FOR VIS 2: 2 BAR CHARTS






// END OF SPACE FOR VIS 2






// SPACE FOR VIS 3: 3 CHARTS





// END OF SPACE FOR VIS 3