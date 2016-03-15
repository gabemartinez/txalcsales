/*d3.csv("/csv/bev02-23.csv", function (error, data) {

  data.forEach(function(d) {
      d.date = parseDate(d.date);
      if (d.locationcountycode == "071"){
        d.tradename = d.tradename;
        console.log("Name: " + d.tradename + "Address: " + d.locationaddress + "City: " + d.locationcity + "Zip Code: " + d.locationzipcode + "Reported Tax: " + d.reportedtax);
      }
  });

});*/

//--

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

//var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

var valueline = d3.svg.line()
    .x(function(d) { return x(d.tradename); })
    .y(function(d) { return y(d.reportedtax); });

var svg = d3.select(".container")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("/csv/bev02-23.csv", function(error, data) {
    data.forEach(function(d) {
        if (d.locationcountycode == "071"){
        //d.date = parseDate(d.date);
        //d.close = +d.close;
        d.tradename = d.tradename;
        d.tradename = d.reportedtax;
        //console.log("Name: " + d.tradename + "Address: " + d.locationaddress + "City: " + d.locationcity + "Zip Code: " + d.locationzipcode + "Reported Tax: " + d.reportedtax);
        }
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.tradename; }));
    y.domain([0, d3.max(data, function(d) { return d.reportedtax; })]);

    svg.append("path")		// Add the valueline path.
        .attr("class", "line")
        .attr("d", valueline(data));

    svg.append("g")			// Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")			// Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);

});
