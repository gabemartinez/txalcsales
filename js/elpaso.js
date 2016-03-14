/*d3.select("body").append("span")
    .text("Hello, world!");*/

/*d3.csv("/csv/bev02-23.csv")
    .row(function(d) { return {key: d.key, value: +d.value}; })
    .get(function(error, rows) { console.log(rows); });*/

/*d3.csv("/csv/bev02-23.csv", function(data) {
  console.log(data[0]);
});*/

/*d3.csv("/csv/bev02-23.csv", function (data) {

  data.forEach(function(d) {
    if (d.locationcountycode == "071"){
      d.reportedtax = +d.reportedtax;
    }
  });

  var max = d3.max(data, function(d) { return d.reportedtax; });

  console.log(max);

});*/

/*d3.csv("/csv/bev02-23.csv", function(data) {

  data.forEach(function(d,i) {

    if (d.locationcountycode == "071"){

      console.log(data[i]);

    }

  });*/

//});

/*d3.csv("/csv/bev02-23.csv", function(data) {
    console.log(data);

    var landExtent = d3.extent(data, function(d) { return d.reportedtax; });
    console.log(landExtent);
});*/

d3.csv("/csv/bev02-23.csv", function (error, data) {
  console.log(data); // this will output the data contained in your csv
});
