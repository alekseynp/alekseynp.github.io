// This code is copyright Aleksey Nozdryn-Plotnicki 2013


// KEY PARAMETERS
var ROTATION = 0;

var defaultColours = [
  "#E41A1C",
  "#377EB8",
  "#4DAF4A",
  "#984EA3",
  "#FF7F00",
  "#FFFF33",
  "#A65628",
  "#F781BF",
  "#999999"
];

var numColours = 0;
addColour();
addColour();
addColour();
addColour();


// DECLARATIONS
var myColour = d3.scale.category10();
var depth = 0;

// Scale for user later to create radial coordinates
var x = d3.scale.linear()
  .range([0+(ROTATION/180)*Math.PI,2 * Math.PI+(ROTATION/180)*Math.PI]);

// Automatically run the vis when the page loads
drawVis();

function drawVis()
{
var leaves = [];
var texts = [];

// Gather font sizes from the UI
var fontSize = [ document.getElementById("font1").value,
                 document.getElementById("font2").value,
                 document.getElementById("font3").value,
                 document.getElementById("font4").value ];

// Gather widths from the UI
var widths = [ +document.getElementById("width1").value,
               +document.getElementById("width2").value,
			   +document.getElementById("width3").value,
			   +document.getElementById("width4").value ];

var radii = [ {inner: 45, outer: 45 + widths[0]},
              {inner: 45 + widths[0] + 5, outer: 45 + widths[0] + 5 + widths[1]},
			  {inner: 45 + widths[0] + 5 + widths[1] + 5, outer: 45 + widths[0] + 5 + widths[1] + 5 + widths[2]},
			  {inner: 45 + widths[0] + 5 + widths[1] + 5 + widths[2] + 5, outer: 45 + widths[0] + 5 + widths[1] + 5 + widths[2] + 5 + widths[3]} ];
			  
// Adjust SVG width
width = 2 * (45 + widths[0] + 5 + widths[1] + 5 + widths[2] + 5 + widths[3]);
height = width;
			  
// Gather input colours from the UI
var inputColours = [];
for(var i = 0; i < numColours; i++)
{
  inputColours.push("#" + document.getElementById("colour"+(i+1)).value);
}

// Prepare the colors
var colours = [];
var luminanceInterpolators = [];
for(var i = 0; i < inputColours.length; i++)
{
  var newColour = d3.rgb(inputColours[i]).hsl();
  colours.push(newColour);
  luminanceInterpolators.push(d3.scale.pow().range([newColour.l, newColour.l > 0.8 ? (1-newColour.l)/2 : 0.9]).exponent(0.5));
}
			
// Collect text orientations from the UI
var textDirection = [
  document.getElementById("orientation1").value,
  document.getElementById("orientation2").value,
  document.getElementById("orientation3").value,
  document.getElementById("orientation4").value
];

			
// Clear any existing content in the chart. This effectively resets if drawVis has already been run
document.getElementById("chart").innerHTML="";

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


csv = d3.csv.parse(document.getElementById("dataText").value);

  
  depth = Object.keys(csv[0]).length;
  
  // Add Domain to the colours now that the depth is known
  for(var i = 0; i < inputColours.length; i++)
  {
    luminanceInterpolators[i].domain([0,depth-1]);
  }
  
  var nest = d3.nest();
  
  if(depth>1)
    nest.key(function(d) { return d.L1;});
  if(depth>2)
    nest.key(function(d) { return d.L2;});
  if(depth>3)
    nest.key(function(d) { return d.L3;});
  if(depth>4)
    nest.key(function(d) { return d.L4;});
  if(depth>5)
    nest.key(function(d) { return d.L5;});
  if(depth>6)
    nest.key(function(d) { return d.L6;});
  if(depth>7)
    nest.key(function(d) { return d.L7;});
  
  nest = nest.sortKeys(d3.ascending);
  nest = nest.entries(csv);
  
  for (i=0; i<depth; i++)
  {
    leaves.push([]);
	texts.push([]);
  }

  // Trickle down L1
  for(var i=0; i<nest.length; i++)
    trickleL1(nest[i], nest[i].key);
	
  // Set sizes
  for(i=0; i<nest.length; i++)
    setSizes(nest[i]);

  // Push leaves
  pushLeaves(nest, leaves, 0);
  
  // Calculate running sizes
  for(var i=0; i<leaves.length; i++)
  {
    var runningSize = 0;
    for(var j=0; j<leaves[i].length; j++)
	{
	  leaves[i][j].runningSize = runningSize;
	  runningSize = runningSize + leaves[i][j].size;
	}
  }
     
  x.domain([0,leaves[depth-1].length]);
  
  var scales = [];
  var drawColours = [];

  for(var i = 0; i<depth; i++)
  {
    scales.push(d3.scale.ordinal());
	drawColours.push([]);
	for(var j = 0; j<colours.length; j++)
	{
	  drawColours[i].push([]);
	}
  }
  
   
  for(var i = 0; i<depth; i++)
  {
    for(var j = 0; j<colours.length; j++)
	{
      drawColours[i][j] = d3.hsl(colours[j].h, colours[j].s, luminanceInterpolators[j](i));
	}
  }
  
  for(var i = 0; i<depth; i++)
  {
    scales[i].range(drawColours[i]);
	//alert(drawColours[i]);
  }
  
  for(j=0; j<depth; j++)
  {
    vis.selectAll("path.l"+(j+1)).data(leaves[j])
      .enter()
	  .append("path")
	  .attr("d",
	    d3.svg.arc()
	      .startAngle(function(d,i){return x(j==(depth-1) ? i : d.runningSize);})
          .endAngle(function(d,i){return x(j==(depth-1) ? (i+1) : (d.runningSize + d.size));})
          .innerRadius(function(d) { return radii[j].inner; })
          .outerRadius(function(d) { return radii[j].outer; })
	  )
	  //.attr("fill", function(d) { return myColour(j==0 ? d.key : d.L1);})
	  .attr("fill", function(d) { return scales[j % scales.length](j==0 ? d.key : d.L1);})
	  .attr("transform", "translate(" + [width/2,height/2] + ")")
	  .style("stroke", "#fff")
	  .style("stroke-width", "2px");
	  //.attr("fill-opacity", Math.pow(0.5,j));
	
    if(textDirection[j]=="arc")
    { 	
	  defs.selectAll("path.l"+(j+1)).data(leaves[j])
        .enter().append("path")
        .attr("d", function(d,i){
          var arc = d3.svg.arc()
            .startAngle(x(j==(depth-1) ? i : d.runningSize))
	        .endAngle(x(j==(depth-1) ? (i+1) : (d.runningSize + d.size)))
	        .innerRadius(radii[j].inner + (radii[j].outer - radii[j].inner)/2)
	        .outerRadius(radii[j].inner + (radii[j].outer - radii[j].inner)/2)
	      return arcToCurve(arc());
	    })	
	    .attr("transform", "translate(" + [width/2,height/2] + ")")
	    .attr("id", function(d,i){ return "l"+(j+1)+"-"+i;});
	} else if(textDirection[j]=="radial")
	{
	  defs.selectAll("path.l"+(j+1)).data(leaves[j])
	    .enter().append("path")
        .attr("d", function(d,i){
		  return arcToRadial(d3.svg.arc()
              .innerRadius(radii[j].inner)
	          .outerRadius(radii[j].outer)
	          .startAngle(x(j==(depth-1) ? (i+0.5) : (d.runningSize + d.size/2)))
	          .endAngle(x(j==(depth-1) ? (i+0.5) : (d.runningSize + d.size/2)))()
			, x(j==(depth-1) ? (i+0.5) : (d.runningSize + d.size/2)) > Math.PI ? false : true);
		})
        .attr("transform", "translate(" + [width/2,height/2] + ")")
		.attr("id", function(d,i){ return "l"+(j+1)+"-"+i;});
	}

	texts[j] = vis.selectAll("text.l"+(j+1)).data(leaves[j])
      .enter().append("text")
	    .style("text-anchor", "middle")
		.style("font-size", fontSize[j]+"px")
		.style("font-family", "Calibri")
		.attr("fill", "#000")
	  .append("textPath")
	    .attr("xlink:href", function(d,i){return "#l"+(j+1)+"-"+i;})
	    .attr("startOffset", "50%")
		.style("dominant-baseline", "middle");
	
	texts[j].append("tspan")
	    .text(function(d) { return (j==(depth-1) ? d["L"+depth] : d.key);});
  }
  
  for(var i = 0; i<texts.length; i++)
  {
    for(var j = 0; j<texts[i][0].length; j++)
	{
      var text = d3.select(texts[i][0][j]);
      var path = text.attr("xlink:href");
      var gotPath = document.getElementById(path.substr(1,path.length-1));
      var pathLength = gotPath.getTotalLength();
      var textLength = text.node().getComputedTextLength();

	  // Keep collection of lines
	  var tspans = [];
	  tspans.push(text.select("tspan"));
	  
	  while(textLength > (pathLength-5))
	  {
	    var textCharLength = text.text().length;
		
	    if(textLength>(pathLength-5))
	    {
          var len = Math.max(1,Math.floor((pathLength/textLength)*textCharLength)-1);
          var stringOne = text.text().substr(0,len);
          var lastSpace = stringOne.lastIndexOf(" ");
	      if((lastSpace == -1)||(lastSpace == 0))
	      {
		    lastSpace = len;
		  }
          stringOne = text.text().substr(0,lastSpace);
          var stringTwo = text.text().substr(lastSpace,text.text().length-lastSpace);
          text.select("tspan").text(stringOne);
		  
		  var wrapFontSizeText = text.style("font-size");
		  var wrapFontSizeTextp = wrapFontSizeText.indexOf("p");
		  var wrapFontSize = wrapFontSizeText.substring(0,wrapFontSizeTextp);
		  
		  for(var z = 0; z<tspans.length; z++)
		  {	  
		    tspans[z].attr("dy", tspans.length*-(wrapFontSize/2)+wrapFontSize*z);  
		  }
		  
		  text = vis.append("text")
	        .style("text-anchor", "middle")
		    .style("font-size", text.style("font-size"))
			.style("font-family", text.style("font-family"))
		    .attr("fill", "#000")
	      .append("textPath")
	        .attr("xlink:href", path)
	        .attr("startOffset", "50%")
		    .style("dominant-baseline", "middle");
		
		  var newTspan = text.append("tspan")
		    .text(stringTwo)
		    .attr("dy", tspans.length*(wrapFontSize/2));	  
			
		  tspans.push(newTspan);
		  textLength = text.node().getComputedTextLength();
	    }
	  
	  
	  }
	  
      
	  
	}
  }
  
  // Finally prepare the download link
  var html = d3.select("svg").node().parentNode.innerHTML;
        
  d3.select("#download")
    .attr("href-lang", "image/svg+xml")
    .attr("href", "data:image/svg+xml;base64,\n" + btoa(html));
}




function arcToCurve(arc)
{
  var firstL = arc.indexOf("L");
  return arc.substr(0,firstL);
}

function arcToRadial(arc, reverse)
{
  var returnText = arc;
  var firstA = returnText.indexOf("A");
  var firstL = returnText.indexOf("L");
  returnText = returnText.substr(0,firstA) + returnText.substr(firstL, returnText.length);
  var secondA = returnText.indexOf("A");
  returnText = returnText.substr(0,secondA);
  
  if(!reverse)  
    return returnText;
  else
  {
    var indexL = returnText.indexOf("L");
	returnText = "M" + returnText.substr(indexL+1, returnText.length) + "L" + returnText.substr(1,indexL-1);
    return returnText;
  }
	
}

function findDepth(depthArray)
{
  if(depthArray[0].values != null)
  {
	return 1 + findDepth(depthArray[0].values);
  }
  else
  {
    return 1;
  }
}

function setSizes(input)
{
  if(input.values != null)
  {
    var sum = 0;
    for(var i=0; i<input.values.length; i++)
	{
	  sum = sum + setSizes(input.values[i]);
	}
	input.size = sum;
	return sum;
  }
  else
  {
    input.size = 1;
	return 1;
  }
}

function trickleL1(input, L1)
{
  if(input.values != null)
  {
    input.L1 = L1;
    for(var j=0; j<input.values.length; j++)
	{
	  trickleL1(input.values[j], L1);
	}
  }
}

function pushLeaves(array, leavesArray, level)
{
  for(var i=0; i<array.length; i++)
  {
    leavesArray[level].push(array[i]);
	if(level<(depth-1))
	  pushLeaves(array[i].values, leavesArray, level+1);
  }
}

function addColour()
{
  numColours = numColours + 1;
  document.getElementById("coloursList").innerHTML += numColours + ':<input class="color" id="colour' + numColours + '" value="' + defaultColours[(numColours - 1) % defaultColours.length] + '" /><br>';
  jscolor.init();
}