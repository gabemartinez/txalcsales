d3.csv("/csv/bev02-23.csv", function (error, data) {

  //var svg = d3.select(".data-rows")
      //.append("col-md-12.well");

  //data.forEach(function(d) {
      //d.date = parseDate(d.date);
      //if (d.locationcountycode == "071"){
        //d.tradename = d.tradename;
        //console.log("Name: " + d.tradename + "Reported Tax: " + d.reportedtax);

        var tr = d3.select("#data-rows")
            .selectAll("div")
            .append("div")
            .attr("class", "row")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "col-md-2")
            .append("h5")
            .text(function(d) {
              d.reportedtax =+ d.reportedtax;
              return d.reportedtax;
            });



      //}
  //});

});
