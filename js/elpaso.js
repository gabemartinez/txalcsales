var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 1170 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    return "<strong>Name:</strong> <span style='color:orangered'>" + d.tradename + "</span><br /><strong>City:</strong> <span style='color:orangered'>" + d.locationcity + "</span><br /><strong>Reported Tax:</strong> <span style='color:orangered'>" + d.reportedtax + "</span>";
  });

var svg = d3.select("#main-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("../csv/bev02-23.csv", type, function(error, data) {

    x.domain(data.map(function(d) { return d.tradename; }));
    y.domain([0, d3.max(data, function(d) { return d.reportedtax; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Sales");

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .filter(function(d){ return d.locationcountycode ==  "071"; })
        .attr("class", "bar")
        .attr("x", function(d, i) { return (i*2); })
        .attr("width", 5)
        .attr("y", function(d) { return y(d.reportedtax); })
        .attr("height", function(d) { return height - y(d.reportedtax); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

});

function type(d) {
  d.reportedtax = +d.reportedtax;
  return d;
}
