$(document).ready(function () {
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

  // Grid Format 
  var numRows = 10;
  var numCols = 10;

  // Animation 
  var delay = 20;

  /* DEFINE DATA ************************************************************************/
  // Button clicks
  var percentNumber = 47.73;
  drawChartAgain("2015");
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

  // The share of circles that should be highlighted
  function drawChartAgain(year) {
    if (year === "2015") {
      percentNumber = 47.73;
    } else if (year == "2016") {
      percentNumber = 65.37;
    } else if (year == "2017") {
      percentNumber = 51.07;
    } else if (year == "2018") {
      percentNumber = 30.38;
    } else if (year == "2019") {
      percentNumber = 77.86;
    }
    // clear DOM
    $("#pictogram-chart").empty();
    $("#pictogramHeader").empty();
    $("#pictogramHeader").html("<h4 style='color:#008E89'><u>RECYCLE % - " + year + "</u></h4>");
    // Generate the circles data: array of indices + "active" info for each cell in the grid
    var data = [];
    // var year = ["2015", "2016", "2017", "2018", "2019"]
    d3.range(numCols * numRows).forEach(function (d) {
      data.push({ "index": d, "percentNumber": d + 1, "active": d < percentNumber })
    })

    /* CREATE SVG  ************************************************************************/

    // Create SVG container
    var svg = d3.select('#pictogram-chart')
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

  }
  renderBarChart();
  $("#barbtn").click(function (event) {
    event.preventDefault();
    renderBarChart();
  })

  function renderBarChart() {
    var margin = { top: 0, right: 30, bottom: 30, left: 50 },
      width = 460 - margin.left - margin.right,
      height = 320 - margin.top - margin.bottom;

    var greyColor = "#898989";
    var barColor = d3.interpolateInferno(0.4);
    var highlightColor = d3.interpolateInferno(0.3);

    // var formatPercent = d3.format(".0%");

    var svg = d3.select("#barchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.4);
    var y = d3.scaleLinear()
      .range([height, 0]);

    var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(10);
    var yAxis = d3.axisLeft(y).tickSize([]).tickPadding(10);

    var dataset = [{ "year": "2015", "value": 28.4 },
    { "year": "2016", "value": 57 },
    { "year": "2017", "value": 25.9 },
    { "year": "2018", "value": 22.3 },
    { "year": "2019", "value": 10.9 }];

    x.domain(dataset.map(d => { return d.year; }));
    y.domain([0, d3.max(dataset, d => { return d.value + 20; })]);
    // y.domain([0, 1]);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);

    svg.selectAll(".bar")
      .data(dataset)
      .enter().append("rect")
      .attr("class", "bar")
      .on("mouseover", function (d) {
        d3.select(this).attr("transform", "translate(3,3)");
      })
      .on("mouseout", function (d) {
        d3.select(this).attr("transform", "translate(0,0)");
      })
      .on("click", function (d) {
        d3.select(this).attr("id", d.year);
        drawChartAgain(d.year);
      })
      .style("display", d => { return d.value === null ? "none" : null; })
      .style("fill", d => {
        return d.value === d3.max(dataset, d => { return d.value; })
          ? "#0066b2" : "#0066b2"
      })
      .attr("x", d => { return x(d.year); })
      .attr("width", x.bandwidth())
      .attr("y", d => { return height; })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay(function (d, i) {
        return i * 150;
      })
      .attr("y", d => { return y(d.value); })
      .attr("height", d => { return height - y(d.value); });

    svg.selectAll(".label")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "label")
      .style("display", d => { return d.value === null ? "none" : null; })
      .attr("x", (d => { return x(d.year) + (x.bandwidth() / 2) - 8; }))
      .style("fill", d => {
        return d.value === d3.max(dataset, d => { return d.value; })
          ? "#0081C9" : "#0081C9"
      })
      .attr("y", d => { return height; })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay((d, i) => { return i * 150; })
      .text(d => { return (d.value); })
      .attr("y", d => { return y(d.value); })
      .attr("dy", "-.7em")
    // .on("click", function(event) { console.log("I'm clicked") });
  }
});