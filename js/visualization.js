// read in data as example for PM06
d3.csv("data/all_vis.csv").then((data) => {
  //print data to log
  console.log(data.slice(0, 10))
})

// Variables
var margin = { top: 10, right: 30, bottom: 50, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom

// SPACE FOR VIS 1: BAR CHART AND SCATTER PLOT (JUSTIN)

var svg1 = d3
  .select("#vis1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var svg2 = d3
  .select("#vis1b")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var color = d3
  .scaleOrdinal()
  .domain(["Uber", "Lyft"])
  .range(["#000000", "#FF00BF"])

d3.csv("data/all_vis.csv", function (row) {
  // get weekday for each entry
  const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S")
  const formatTime = d3.timeFormat("%a")
  const formatHours = d3.timeFormat("%H")
  const formatMinutes = d3.timeFormat("%M")
  d3Time = parseTime(row.datetime)
  Weekday = formatTime(d3Time)
  Time = +formatHours(d3Time) + +formatMinutes(d3Time) / 60

  // format the data
  return {
    Weekday: Weekday,
    SurgeMultiplier: +row.surge_multiplier,
    Price: +row.price,
    Time: Time,
    CabType: row.cab_type,
    id: row.id,
    Distance: +row.distance,
  }
}).then((data) => {
  //print data to log
  console.log(data.slice(0, 10))

  var bar_color = d3
    .scaleOrdinal()
    .domain(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
    .range([
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#D3D3D3",
      "#000000",
    ])

  // bar chart
  // pseudo-code:
  // -- hard code each of the days of the week's values
  var bar_xaxis = d3
    .scaleBand()
    .domain(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
    .range([0, width])

  svg1
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(bar_xaxis))

  var maxY = 1.016
  let yScale = d3.scaleLinear().domain([1.01, maxY]).range([height, 0])

  svg1
    .append("g")
    .attr("transform", "translate(" + (margin.left - 60) + ",0)")
    .call(d3.axisLeft(yScale))

  var bars = svg1
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return bar_xaxis(d.Weekday) + 10
    })
    .attr("y", function (d) {
      if (d.Weekday == "Sun") {
        return yScale(1.0152755185034568)
      }
      if (d.Weekday == "Mon") {
        return yScale(1.0129874962786543)
      }
      if (d.Weekday == "Tue") {
        return yScale(1.014678831579722)
      }
      if (d.Weekday == "Wed") {
        return yScale(1.0134922631777583)
      }
      if (d.Weekday == "Thu") {
        return yScale(1.0136545810420357)
      }
      if (d.Weekday == "Fri") {
        return yScale(1.013472901385493)
      }
      if (d.Weekday == "Sat") {
        return yScale(1.0148034843928238)
      } else {
        return 0
      }
    })
    .attr("width", bar_xaxis.bandwidth() - 20)
    .attr("height", function (d) {
      if (d.Weekday == "Sun") {
        return height - yScale(1.0152755185034568)
      }
      if (d.Weekday == "Mon") {
        return height - yScale(1.0129874962786543)
      }
      if (d.Weekday == "Tue") {
        return height - yScale(1.014678831579722)
      }
      if (d.Weekday == "Wed") {
        return height - yScale(1.0134922631777583)
      }
      if (d.Weekday == "Thu") {
        return height - yScale(1.0136545810420357)
      }
      if (d.Weekday == "Fri") {
        return height - yScale(1.013472901385493)
      }
      if (d.Weekday == "Sat") {
        return height - yScale(1.0148034843928238)
      }
      return 0
    })
    .attr("fill", "#6E6E6E")
    .attr("fill", function (d) {
      return bar_color(d.Weekday)
    })

  // add titles
  svg1
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", 10)
    .text("Average Surge Multiplier")
    .attr("font-weight", 700)

  // scatter plot
  // pseudo-code:
  // - on hover,
  // - clear the existing scatter plot
  // - trigger the drawing of a scatter plot
  // create Y axis
  let yScale1b = d3.scaleLinear().domain([0, 100]).range([height, 0])

  // add y axis to SVG
  svg2
    .append("g")
    .call(d3.axisLeft(yScale1b))
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.left - 10)
        .attr("y", -40)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(-90)")
        .text("Price per Mile")
    )

  // create X axis
  let xScale = d3.scaleLinear().domain([0, 24]).range([0, width])

  // add x axis to SVG
  svg2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .call((g) =>
      g
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("24-Hour Time")
    )

  //chart title
  svg2
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", 10)
    .text("Friday")
    .attr("font-weight", 700)

  var myCircle1 = svg2
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .filter(function (d) {
      return d.Weekday == "Fri"
    })
    .attr("id", (d) => d.id)
    .attr("cx", function (d) {
      return xScale(d.Time)
    })
    .attr("cy", function (d) {
      return yScale1b(d.Price / d.Distance)
    })
    .attr("r", 2)
    .style("fill", function (d) {
      return color(d.CabType)
    })
    .style("opacity", 0.5)
})

// END OF SPACE FOR VIS 1

// SPACE FOR VIS 2: 2 BAR CHARTS
var svg3 = d3
  .select("#vis2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.csv("data/AvgSurgMult.csv", function (row) {
  
  // format the data
  return {
    Weather: row.weather,
    Value: +row.value,
  }
}).then((data) => {
  
  console.log(data);

  var bar_color = d3
    .scaleOrdinal()
    .domain(["Average", "Drizzle"])
    .range(["#000000", "#288BA8"])

  var bar_xaxis = d3
    .scaleBand()
    .domain(["Average", "Drizzle"])
    .range([0, width])

  svg3
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(bar_xaxis))

  let yScale = d3.scaleLinear().domain([1.0000, 1.040]).range([height, 0])

  svg3
    .append("g")
    .attr("transform", "translate(" + (margin.left - 60) + ",0)")
    .call(d3.axisLeft(yScale))

  var bars = svg3
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .filter(function (d) {
      return (d.Weather == "Average" || d.Weather == "Drizzle");
    })
    .attr("x", function (d) {
      return bar_xaxis(d.Weather) + 10
    })
    .attr("y", function (d) {
      return yScale(d.Value)
    })
    .attr("width", bar_xaxis.bandwidth() - 20)
    .attr("height", (d) => height - yScale(d.Value))
    .attr("fill", function (d) {
      return bar_color(d.Weather)
    })
})

svg3
  .append("text")
  .attr("text-anchor", "middle")
  .attr("x", width / 2)
  .attr("y", 10)
  .text("Average Surge Multiplier")
  .attr("font-weight", 700)

var svg4 = d3
  .select("#vis2b")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.csv("data/AvgPrice.csv", function (row) {
  // format the data
  return {
    Weather: row.weather,
    Value: +row.value,
  }
}).then((data) => {
  var bar_color = d3
    .scaleOrdinal()
    .domain(["Average", "Drizzle"])
    .range(["#000000", "#288BA8"])

  var bar_xaxis = d3
    .scaleBand()
    .domain(["Average", "Drizzle"])
    .range([0, width])

  svg4
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(bar_xaxis))

  let yScale = d3.scaleLinear().domain([16, 17]).range([height, 0])

  svg4
    .append("g")
    .attr("transform", "translate(" + (margin.left - 60) + ",0)")
    .call(d3.axisLeft(yScale))

  var bars = svg4
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .filter(function (d) {
      return d.Weather == "Average" || d.Weather == "Drizzle"
    })
    .attr("x", function (d) {
      return bar_xaxis(d.Weather) + 10
    })
    .attr("y", function (d) {
      return yScale(d.Value)
    })
    .attr("width", bar_xaxis.bandwidth() - 20)
    .attr("height", (d) => height - yScale(d.Value))
    .attr("fill", function (d) {
      return bar_color(d.Weather)
    })
})

svg4
  .append("text")
  .attr("text-anchor", "middle")
  .attr("x", width / 2)
  .attr("y", 10)
  .text("Average Price")
  .attr("font-weight", 700)

// END OF SPACE FOR VIS 2

// SPACE FOR VIS 3: 3 CHARTS
var svg5 = d3
  .select("#vis3")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var svg6 = d3
  .select("#vis3b")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.csv("data/all_vis.csv").then((data) => {
  // Scatterplot 1
  var xKey5 = "distance"
  var yKey5 = "price"

  //Add X axis
  let x5 = d3.scaleLinear().domain([0, 8]).range([0, width])

  svg5
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x5))
    .call((g) =>
      g
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Distance")
    )

  //Add Y axis
  let y5 = d3.scaleLinear().domain([0, 68]).range([height, 0])

  svg5
    .append("g")
    .call(d3.axisLeft(y5))
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Price")
    )

  // Add dots
  var myCircle1 = svg5
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", (d) => d.id)
    .attr("cx", function (d) {
      return x5(d[xKey5])
    })
    .attr("cy", function (d) {
      return y5(d[yKey5])
    })
    .attr("r", 2)
    .style("fill", function (d) {
      return color(d.cab_type)
    })
    .style("opacity", 0.5)

  // Scatterplot 2
  var xKey6 = "datetime"
  var yKey6 = "surge_multiplier"

  //TODO: Add datetime X axis
  const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S")
  var dates = []
  for (let obj of data) {
    dates.push(parseTime(obj.dates))
  }
  console.log(dates)
  let x6 = d3.scaleTime().domain(d3.extent(dates)).range([0, width])

  svg6
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x6))
    .call((g) =>
      g
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Date")
    )

  //Add Y axis
  let y6 = d3.scaleLinear().domain([1, 2]).range([height, 0])

  svg6
    .append("g")
    .call(d3.axisLeft(y6))
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Surge Multiplier")
    )

  // Add dots
  var myCircle2 = svg6
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", (d) => d.id)
    .attr("cx", function (d) {
      return x5(d[xKey6])
    })
    .attr("cy", function (d) {
      return y5(d[yKey6])
    })
    .attr("r", 2)
    .style("fill", function (d) {
      return color(d.cab_type)
    })
    .style("opacity", 0.5)
})

// TODO:
// Location to Count Bar Chart

// END OF SPACE FOR VIS 3
