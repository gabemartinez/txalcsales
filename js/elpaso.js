d3.csv("/csv/bev02-23.csv", function (error, data) {

  // var svg = d3.select(".data-rows")
  //     .append("col-md-12.well");

  data.forEach(function(d) {

    var p = d3.select("#data-rows")
      .selectAll("p")
      .data(data)
      .enter()
      .append("p")
      .text(function (d) { return d.tradename; });

      //d.date = parseDate(d.date);
      //if (d.locationcountycode == "071"){

        //d.tradename = d.tradename;
        //console.log("Name: " + d.tradename + "Address: " + d.locationaddress + "City: " + d.locationcity + "Zip Code: " + d.locationzipcode + "Reported Tax: " + d.reportedtax);
      //}
  });

});
