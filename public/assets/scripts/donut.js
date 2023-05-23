$(document).ready(function () {

  var building = "scu";
  var dom;
  var isClicked = false;
  renderDonutChart(building);

  $(".buildingImage").on("click", function (event) {
    event.preventDefault();
    isClicked = true;
    renderDonutChart(this.id);
  });

  $(".buildingImage").on("mouseover", function (event) {
    event.preventDefault();
    console.log(this.id);
    building = this.id;
    isClicked = false;
    renderDonutChart(building);
  });

  // $(".buildingImage").on("mouseout", function (event) {
  //   event.preventDefault();
  //   if (!isClicked) {
  //     $("#pictogram-chart-building").empty();
  //     $(".buildingName").empty();
  //     $("#donutchartBuilding").empty();
  //   }
  // });

  function renderDonutChart(building) {
    let data = [];
    let colors = ["#1D267D", "#F5F0BB", "#E21818"];

    let sizes = {
      innerRadius: 70,
      outerRadius: 100
    };

    let durations = {
      entryAnimation: 2000
    };
    if (building === "scu") {
      data = [48.95, 0.34, 50.71];
      dom = "donutchart";
      draw(data);
    } else if (building === "benson") {
      data = [36.89, 0.01, 63.10];
      dom = "donutchartBuilding";
      $(".buildingName").html("<h5>PAPER WASTE SORTING: BENSON CENTER</h5>");
      draw(data);
    } else if (building === "facilities") {
      data = [71.70, 0.32, 27.97];
      dom = "donutchartBuilding";
      $(".buildingName").html("<h5>PAPER WASTE SORTING: FACILITIES</h5>");
      draw(data);
    } else if (building === "graham") {
      data = [0, 0, 100];
      dom = "donutchartBuilding";
      $(".buildingName").html("<h5>PAPER WASTE SORTING: GRAHAM</h5>");
      draw(data);
    } else if (building === "lc") {
      data = [77.86, 0, 22.14];
      dom = "donutchartBuilding";
      $(".buildingName").html("<h5>PAPER WASTE SORTING: LEARNING COMMONS</h5>");
      draw(data);
    } else if (building === "malley") {
      data = [93.03, 0.98, 5.99];
      dom = "donutchartBuilding";
      $(".buildingName").html("<h5>PAPER WASTE SORTING: MALLEY</h5>");
      draw(data);
    } else if (building === "swig") {
      data = [0, 0, 100];
      dom = "donutchartBuilding";
      $(".buildingName").html("<h5>PAPER WASTE SORTING: SWIG</h5>");
      draw(data);
    } else if (building === "uv") {
      data = [0, 0, 100];
      dom = "donutchartBuilding";
      $(".buildingName").html("<h5>PAPER WASTE SORTING: UNIVERSITY VILLAS</h5>");
      draw(data);
    } else if (building === "varihall") {
      data = [0, 0, 100];
      dom = "donutchartBuilding";
      $(".buildingName").html("<h5>PAPER WASTE SORTING: VARI HALL</h5>");
      draw(data);
    }

    function draw(data) {
      d3.select("#" + dom).html("");
      var div = d3.select("body").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);
      let generator = d3.pie()
        .sort(null);

      let chart = generator(data);

      let arcs = d3.select("#" + dom)
        .append("g")
        .attr("transform", "translate(100, 100)")
        .selectAll("path")
        .data(chart)
        .enter()
        .append("path")
        .style("fill", (d, i) => colors[i])
        .on("mouseover", function (d, i) {
          d3.select(this).transition()
            .duration('50').attr('opacity', '.55');
          div.transition()
            .duration(50)
            .style("opacity", 1);
          div.html(d.data + "%")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
          console.log(d);
        })
        .on("mouseout", function (d, i) {
          d3.select(this).transition()
            .duration('50').attr('opacity', '1');
          div.transition()
            .duration('50')
            .style("opacity", 0);
        })

      let angleInterpolation = d3.interpolate(generator.startAngle()(), generator.endAngle()());

      let innerRadiusInterpolation = d3.interpolate(0, sizes.innerRadius);
      let outerRadiusInterpolation = d3.interpolate(0, sizes.outerRadius);

      let arc = d3.arc();

      arcs.transition()
        .duration(durations.entryAnimation)
        .attrTween("d", d => {
          let originalEnd = d.endAngle;
          return t => {
            let currentAngle = angleInterpolation(t);
            if (currentAngle < d.startAngle) {
              return "";
            }

            d.endAngle = Math.min(currentAngle, originalEnd);

            return arc(d);
          };
        })

      d3.select("#" + dom)
        .transition()
        .duration(durations.entryAnimation)
        .tween("arcRadii", () => {
          return t => arc
            .innerRadius(innerRadiusInterpolation(t))
            .outerRadius(outerRadiusInterpolation(t));
        });

      generateLegend(data);

      function generateLegend(data) {
        var svg = d3.select("#" + dom)

        // Handmade legend
        svg.append("circle").attr("cx", 220).attr("cy", 100).attr("r", 6).style("fill", "#1D267D")
        svg.append("circle").attr("cx", 220).attr("cy", 130).attr("r", 6).style("fill", "#F5F0BB")
        svg.append("circle").attr("cx", 220).attr("cy", 160).attr("r", 6).style("fill", "#E21818")
        // svg.append("circle").attr("cx", 220).attr("cy", 190).attr("r", 6).style("fill", "#black")
        svg.append("text").attr("x", 240).attr("y", 100).text("Recycling: " + data[0] + "%").style("font-size", "20px").style("fill", "white").attr("alignment-baseline", "middle").attr("id", "text1")
        svg.append("text").attr("x", 240).attr("y", 130).text("Recycling in Compost: " + data[1] + "%").style("font-size", "20px").style("fill", "white").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 240).attr("y", 160).text("Recycling in Landfill: " + data[2] + "%").style("font-size", "20px").style("fill", "white").attr("alignment-baseline", "middle")
        // svg.append("text").attr("x", 240).attr("y", 190).text("No Records Found").style("font-size", "15px").attr("alignment-baseline", "middle")
      }
    }
  }
  $("#donut-chart-text").html("<h4>How did each building sort the paper waste generated at their site? <a href='/building'>Click here <i class='fa-solid fa-arrow-right'></i></a></h4>")

});