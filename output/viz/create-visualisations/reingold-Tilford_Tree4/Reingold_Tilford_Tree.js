// This code is copyright Aleksey Nozdryn-Plotnicki 2013

// Initialise the colour pickers
jscolor.init();

// Automatically run the vis when the page loads
drawVis();

function drawVis()
{	
  // Clear any existing content in the chart. This effectively resets if drawVis has already been run
  document.getElementById("chart").innerHTML="";

  // Collect the parameters from the UI

  // Gather font sizes from the UI
  var fontSizes = [ +document.getElementById("font1").value,
               +document.getElementById("font2").value,
			   +document.getElementById("font3").value,
			   +document.getElementById("font4").value ];
			   
  // Gather circle sizes from the UI
  var circleSizes = [ +document.getElementById("width1").value,
               +document.getElementById("width2").value,
			   +document.getElementById("width3").value,
			   +document.getElementById("width4").value ];
			   
  // Gather inner colours from the UI
  var innerColours = [ document.getElementById("innerColour1").value,
               document.getElementById("innerColour2").value,
			   document.getElementById("innerColour3").value,
			   document.getElementById("innerColour4").value ];

  // Gather outer colours from the UI
  var outerColours = [ document.getElementById("outerColour1").value,
               document.getElementById("outerColour2").value,
			   document.getElementById("outerColour3").value,
			   document.getElementById("outerColour4").value ];
			   
  // Gather SVG width from UI
  var width = document.getElementById("inputWidth").value;
  var height = width;
  var diameter = height;
  
  // Gather outer Padding from UI
  var outerPadding = document.getElementById("outerPadding").value;
  
  // Setting up the SVG
  var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("version", 1.1)
    .attr("xmlns:xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("id", "svg");
  var vis = svg.append("g");
  var defs = svg.append("defs");

  // DRAW THE VIS
  var myRoot = d3.csv.parse(document.getElementById("dataText").value);
var nest = d3.nest();
nest.key(function(d) { return d.L1;});
nest.key(function(d) { return d.L2;});
nest.key(function(d) { return d.L3;});
nest.key(function(d) { return d.L4;});
nest.rollup(function(leaves) { return leaves.length; })
nest = nest.sortKeys(d3.ascending);
nest = nest.entries(myRoot);

var tree = d3.layout.tree()
    .size([360, diameter / 2 - outerPadding*2])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; })
	.children(function(d) { return d.values;});
	
var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
	
vis.attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

  var nodes = tree.nodes({key:"", "values":nest}),
      links = tree.links(nodes);

  var link = vis.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal)
	  .style("fill", "none")
      .style("stroke", "#ccc")
      .style("stroke-width", "1.5px");

  var node = vis.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("circle")
      .attr("r", function(d) { return (d.depth == 0 ? circleSizes[0] : circleSizes[d.depth-1]);} )
	  .style("fill", function(d) { return "#" + innerColours[Math.max(d.depth-1,0)];})
	  .style("stroke", function(d) { return "#" + outerColours[Math.max(d.depth-1,0)];})
	  .style("stroke-width", "1.5px");

  node.append("text")
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(" + ((d.depth == 0 ? circleSizes[0] : circleSizes[d.depth-1]) + 6) + ")" : "rotate(180)translate(-" + (circleSizes[Math.max(d.depth-1,0)] + 6) + ")"; })
      .text(function(d) { return d.key; })
	  .style("font-family", "sans-serif")
	  .style("font-size", function(d) { return fontSizes[d.depth-1] + "px";});

d3.select(self.frameElement).style("height", diameter - 150 + "px");
  

  // Finally prepare the download link
  var html = d3.select("svg").node().parentNode.innerHTML;
        
  d3.select("#download")
    .attr("href-lang", "image/svg+xml")
    .attr("href", "data:image/svg+xml;base64,\n" + btoa(html));
}