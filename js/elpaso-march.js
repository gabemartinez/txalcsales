var margin = {top: 40, right: 20, bottom: 30, left: 60},
    width = 1170 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//var formatPercent = d3.format(".%");
var ourFormat = d3.format(",.2r");

//x axis
var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);

// var x = d3.scale.linear()
//     .range([0, 0]);

// y axis
var y = d3.scale.linear().range([height, 0]);

// x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(ourFormat);

// tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    return "<strong>Name:</strong> <span style='color:orangered'>" + d.tradename + "</span><br /><strong>City:</strong> <span style='color:orangered'>" + d.locationcity + "</span><br /><strong>Reported Tax:</strong> <span style='color:orangered'>$" + d.reportedtax + "</span>";
});

//holder
var svg = d3.select("#main-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("../csv/bev03-24.csv", type, function(error, data) {

  data.forEach(function(d) {
    d.locationcity = d.locationcity;
    d.reportedtax = +d.reportedtax;
  });

    // x domain
    //x.domain([0, 2000]);
    //x.domain(data.map(function(d) { return d.tradename.trim(); }));
    //x.domain(data.map(function(d) { return d.tradename; }));

    // y domain
    //y.domain([0, 20000]);
    //y.domain([0, d3.max(data, function(d) { return d.reportedtax; })]);
    x.domain(data.map(function(d) { return d.locationcity; }));
    y.domain([0, d3.max(data, function(d) { return d.reportedtax; })]);

    // x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // y axis label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("$ales");

    // bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .filter(function(d){ return d.locationcountycode ==  "071"; })
        .filter(function(d){ return d.reportedtax > 0; })
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.locationcity); })
        .attr("x", function(d, i) { return i; })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.reportedtax); })
        .attr("height", function(d) { return height - y(d.reportedtax); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

});

function type(d) {
  d.reportedtax = +d.reportedtax;
  return d;
}
