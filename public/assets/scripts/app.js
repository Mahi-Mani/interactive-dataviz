$(document).ready(function () {
  $("#scu-pictogram").on("click", function (event) {
    event.preventDefault();
    generatePictogram("scu");
  });

  $(".buildingImage").on("click", function (event) {
    event.preventDefault();
    generatePictogram(this.id);
  });

  function generatePictogram(building) {
    /* DEFINE CHART SETTINGNS *************************************************************/

    // Font Style
    var fontFamily = 'Comfortaa', cursive;
    var fontSize = 25;

    // SVG Size & Style
    const width = 350;
    const height = 300;
    const margin = 100;
    const innerWidth = width - (margin)
    const innerHeight = height - (margin)
    var bgColor = 'None';

    // Circle Style
    var fill = '#E3F4F4'
    var inactiveOpacity = 0.22;
    var r = 10;
    var percentNumber;

    // Grid Format 
    var numRows = 10;
    var numCols = 10;

    // Animation 
    var delay = 20;

    /* DEFINE DATA ************************************************************************/
    // Button clicks
    if (building === "scu")
      percentNumber = 8.49;
    else if (building === "benson")
      percentNumber = 5.71;
    else if (building === "facilities")
      percentNumber = 13.03
    else if (building === "graham")
      percentNumber = 8.57
    else if (building === "lc")
      percentNumber = 14.36
    else if (building === "malley")
      percentNumber = 13.57
    else if (building === "swig")
      percentNumber = 6.65
    else if (building === "uv")
      percentNumber = 4.98
    else
      percentNumber = 8.39
    // drawChartAgain("2015");
    // $(".roundBtn").click(function () {
    //   console.log(this.id);
    //   var id = this.id;
    //   if (id === "2015") {
    //     percentNumber = 47.73;
    //     drawChartAgain();
    //   } else if (id == "2016") {
    //     percentNumber = 65.37;
    //     drawChartAgain();
    //   } else if (id == "2017") {
    //     percentNumber = 51.07;
    //     drawChartAgain();
    //   } else if (id == "2018") {
    //     percentNumber = 30.38;
    //     drawChartAgain();
    //   } else if (id == "2019") {
    //     percentNumber = 77.86;
    //     drawChartAgain();
    //   }
    drawChart(percentNumber);
    // The share of circles that should be highlighted
    function drawChart(percentNumber) {
      var dom;
      if (building === "scu") {
        dom = "pictogram-chart";
      } else {
        dom = "pictogram-chart-building";
      }
      // clear DOM
      $("#" + dom).empty();
      // $("#pictogramHeader").empty();
      // Generate the circles data: array of indices + "active" info for each cell in the grid
      var data = [];
      // var year = ["2015", "2016", "2017", "2018", "2019"]
      d3.range(numCols * numRows).forEach(function (d) {
        data.push({ "index": d, "percentNumber": d + 1, "active": d < percentNumber })
      })

      /* CREATE SVG  ************************************************************************/

      // Create SVG container
      var svg = d3.select("#" + dom)
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style('background-color', bgColor);

      // Create axes with ranges referencing the number of rows and columns
      var y = d3.scaleBand()
        .range([0, innerHeight])
        .domain(d3.range(numRows));
      var x = d3.scaleBand()
        .range([0, innerWidth])
        .domain(d3.range(numCols));

      // Create container for the grid
      var circleGrid = svg.append("g")
        .attr("transform", `translate(${margin / 2 + 15}, ${margin / 2 + 20})`);

      // Append circles to grid container & stlyle them accorting to the data & percentNumber
      circles = circleGrid.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("id", function (d) { return "id" + d.index; })
        .attr('cx', function (d) { return x(d.index % numCols); })
        .attr('cy', function (d) { return y(Math.floor(d.index / numCols)); })
        .attr('r', r)
        .attr('fill', fill)
        .attr('opacity', inactiveOpacity)
        // Add transition that highlights one circle at a time
        .transition()
        .delay((d, i) => i * delay)
        .attr('opacity', (d) => d.active ? 1 : inactiveOpacity)

      // Create container for the percentage text
      var textGrid = svg.append('g')
        .attr("transform", `translate(${width - margin / 2}, ${margin / 2})`);

      texts = textGrid.selectAll("text")
        .data(data)
        .enter().append("text")
        .text((d) => d.active ? d.percentNumber + "%" : "")
        .attr("text-anchor", "end")
        .attr('opacity', 0)
        .attr('font-family', fontFamily)
        .attr('fill', fill)
        .attr('font-size', fontSize * 0.8)
        // Add transition that fades in the counter
        .transition()
        .delay((d, i) => i * delay)
        .attr('opacity', 1)
        .attr('font-size', (d) => d.percentNumber < percentNumber ? fontSize * 0.8 : fontSize)
        // Add transition that fades out the counter
        .transition()
        .delay((d, i) => i / delay)
        .attr('opacity', (d) => d.percentNumber < percentNumber ? 0 : 1)
      $("#pictogram-chart-text").html("<h4>So, what happened to all the paper? <a href='/scudonut'>Click here <i class='fa-solid fa-arrow-right'></i></a></h4>")

    }
  }
});



