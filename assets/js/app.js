// @TODO: YOUR CODE HERE!


function makeResponsive() {
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  var svgWidth = 0.9 * window.innerWidth;;
  var svgHeight = 0.9 * window.innerHeight;
  var margin = {
      top: 60,
      right: 60,
      bottom: 60,
      left: 60
    };
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;
  var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  let url = 'assets/data/data.csv';
  d3.csv(url).then(function(dataset){
      console.log(dataset)
      // Get numerical values for two variables
      dataset.forEach(function(data) {
          data.income = +data.income;
          data.obesity = +data.obesity;
        })
      // Make scales & Axes
      // X-Axis
      let xScale = d3.scaleLinear()
          .domain([0.95 * d3.min(dataset, d => d.income),1.05 * d3.max(dataset, d => d.income)])
          .range([0,chartWidth])
      var bottomAxis = d3.axisBottom(xScale);
      chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);
      // Axis text
      svg.append("text")             
      .attr("transform",
            "translate(" + (chartWidth/2) + " ," + 
                          (chartHeight + margin.top + 40) + ")")
      .style("text-anchor", "middle")
      .text('Income')

      // Y-Axis
      let yScale = d3.scaleLinear()
          .domain([0.95 * d3.min(dataset, d => d.obesity),1.05 * d3.max(dataset, d => d.obesity)])
          .range([chartHeight,0])
      var leftAxis = d3.axisLeft(yScale);
      chartGroup.append("g")
      .call(leftAxis);
      // Axis Text
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Rate of Obesity");
      
      // Add data points
      let circles = chartGroup.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
        .attr("cx", function (dataset) { return xScale(dataset.income); } )
        .attr("cy", function (dataset) { return yScale(dataset.obesity); } )
        .attr("r", 10)
        .style("fill", "#69b3a2")

      let stateText = chartGroup.selectAll(null)
      .data(dataset)
      .enter()
      .append("text")
        .attr("x", function (dataset) { return xScale(dataset.income); } )
        .attr("y", function (dataset) { return yScale(dataset.obesity); } )
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("font-size", "15px")
        .text(d => d.abbr)
      



    }).catch(function(error) {
            console.log(error)}
    );
  }
makeResponsive()
d3.select(window).on("resize", makeResponsive);