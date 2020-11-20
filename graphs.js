
//Scatter

initGraph = function(unemployment){
    
    var margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;


var svg = d3.select("#scatterPlot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .classed("scatter", true)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
      var x = d3.scaleLinear()
    .domain([2000,2019])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([4, 10])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
    
      svg.append('g')
    .selectAll("dot")
    .data(unemployment)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Years); } )
      .attr("cy", function (d) { return y(d.Nmet); } )
      .attr("r", 5)
      .style("fill", "coral")
      .style("opacity", 1)
      .style("stroke", "black")

    svg.append('g')
    .selectAll("dot")
    .data(unemployment)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Years); } )
      .attr("cy", function (d) { return y(d.met); } )
      .attr("r", 5)
      .style("fill", "lime")
      .style("opacity", 1)
      .style("stroke", "black")
      
    
    
.on("mouseenter", function(unemployment){
          
          var xPos = d3.event.pageX
          var yPos = d3.event.pageY
          
          d3.select("#tooltip")
          .classed("hidden", false)
          .style("top", yPos+"px")
          .style("left", xPos+"px")
          
          d3.select("#unemployment1")
          .text("NonMetro Unemployment AVG:"+unemployment.Nmet);
          
          d3.select("#year")
          .text("Year:"+unemployment.Years);
          
      })//tooltip off 
    .on("mouseleave", function(){
          d3.select("#tooltip") 
          .classed("hidden", true);
          
    })
    
    
    
var labels = d3.select("#scatterPlot svg")
    .append("g")
    .classed("labels", true);
    
    labels.append("text")
    .text("Unemployment Trends in Metro and NonMetro Areas")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", margin.top-10)
    
    labels.append("text")
    .text("Year")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", height+(margin.bottom+margin.top-5))
    
    labels.append("g")
    .attr("transform", "translate(20,"+(margin.top+(height/2))+")")
    .append("text")
    .text("% Unemployment")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)")

}

var margin = {top: 40, bottom: 100, right:30, left: 70},
    width = 4000 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
var svg = d3.select("#barChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate("+margin.left+","+margin.top+")");


var success=function(unemployment)
{
    console.table("data", unemployment);
    initGraph(unemployment);
};

var failure= function(error)
{
    
    console.log("Something is wrong", error);
};

var incomePromise=d3.csv("LineGraph.csv");
incomePromise.then(success,failure);

