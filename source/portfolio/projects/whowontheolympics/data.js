var checkData;
var checkData2;

var checkText ="";

var chartHeight = 440;
var chartWidth = 440 ;
var chartLeftPadding = 50;
var chartRightPadding = 50;
var chartTopPadding = 20;
var chartBottomPadding = 100;

var minX = 0;
var maxX = 1;
var minY = 1;
var maxY = 10;

var clickedY = 100000000;
var clickedX = 0;

var oldClickedCountryLines;
var oldClickedCountryText;
var oldClickedCountryDominatedBy;
var oldCrosshairs;
var oldClickedCountryIndex;


var lastClipPathId;



var svg = d3.select("#chart").append("svg")
  .attr("height", chartHeight)
  .attr("width", chartWidth);
  
svg.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("id", "clip-rect")
  .attr("x", chartLeftPadding)
  .attr("y", chartTopPadding)
  .attr("width", chartWidth-chartLeftPadding-chartRightPadding)
  .attr("height", chartHeight-chartTopPadding-chartBottomPadding);
  
var chartBody = svg.append("g").attr("clip-path", "url(#clip)");
  	
var x = d3.scale.linear()
  .domain([minX,maxX])
  .range([chartLeftPadding,chartWidth-chartRightPadding]);
	
var y = d3.scale.linear()
  .domain([minY,maxY])
  .range([chartHeight-chartBottomPadding,chartTopPadding]);
  
svg.append("line")
  .attr("x1", chartLeftPadding)
  .attr("y1", chartTopPadding)
  .attr("x2", chartLeftPadding)
  .attr("y2", chartHeight-chartBottomPadding)
  .style("stroke", "#000");
  
svg.append("line")
  .attr("x1", chartWidth - chartRightPadding)
  .attr("y1", chartTopPadding)
  .attr("x2", chartWidth - chartRightPadding)
  .attr("y2", chartHeight-chartBottomPadding)
  .style("stroke", "#000");
  
svg.append("line")
  .attr("x1", chartLeftPadding)
  .attr("y1", chartTopPadding)
  .attr("x2", chartWidth - chartRightPadding)
  .attr("y2", chartTopPadding)
  .style("stroke", "#000");
  
svg.append("line")
  .attr("x1", chartLeftPadding)
  .attr("y1", chartHeight - chartBottomPadding)
  .attr("x2", chartWidth - chartRightPadding)
  .attr("y2", chartHeight - chartBottomPadding)
  .style("stroke", "#000");
  
  
 d3.csv("projects/whowontheolympics/data.csv",function(dataCSV) {
   drawData(dataCSV);
 });
  
function drawData(dataCSV)
{


  for (var i = 0; i < dataCSV.length; i++)
  {
    dataCSV[i].Gold = +dataCSV[i].Gold;
	dataCSV[i].Silver = +dataCSV[i].Silver;
	dataCSV[i].Bronze = +dataCSV[i].Bronze;
	dataCSV[i].lines = [];
	dataCSV[i].dominatedBy = 0;
	dataCSV[i].rank = 0;
	dataCSV[i].tieRank = 0;
  }
  
  for (var i = 0; i < dataCSV.length; i++)
  {
    for (var j = 0; j < dataCSV.length; j++)
	{
	  var left = dataCSV[i];
	  var right = dataCSV[j];
	  
	  if (left.Gold != right.Gold)
	  {
	    var r1 = (right.Silver - left.Silver) / (left.Gold - right.Gold);
		var r2 = (right.Bronze - left.Bronze) / (left.Gold - right.Gold);
		
		if(left.Gold > right.Gold)
		{
		  if (!((r1 <= 1) && ( (r1 + r2) <= 1)))
		  {
		     var newLine = [{"x" : minX, "r1" : r1, "r2" : r2, "type" : "normal", "dir" : "greaterequal"}, {"x" : maxX, "r1" : r1, "r2" : r2, "type" : "normal", "dir" : "greaterequal"}];
		     dataCSV[i].lines.push(newLine);
		  }
		}
		else if (left.Gold < right.Gold)
		{
		  if (!((r1 < 1)&&((r1+r2)<1)))
		  {
		    var newLine = [{"x" : minX, "r1" : r1, "r2" : r2, "type" : "normal", "dir" : "lesserequal"}, {"x" : maxX, "r1" : r1, "r2" : r2, "type" : "normal", "dir" : "lesserequal"}];
		    dataCSV[i].lines.push(newLine);
		  }
		  else
		  {
		    // Left country is dominated by right country
			left.dominatedBy += 1;
			if(left.Country == "Tunisia")
			  checkText += "," + right.Country;
		  }
		}
	  }
	  else if (left.Gold == right.Gold)
	  {
	    if(left.Bronze != right.Bronze)
		{
		  var r3 = (right.Silver - left.Silver) / (left.Bronze - right.Bronze);
		
		  if(left.Silver > right.Silver)
		  {
		    if(r3 > 1)
			{
			  // Left country is dominated by right country
			  left.dominatedBy += 1;
			  			if(left.Country == "Tunisia")
			  checkText += "," + right.Country;
			}
			else if (r3 < 0)
			{
			  //Right country is dominated by left country
			}
			else
			{
			  var newLine = [{"y" : minY, "r3": r3, "type" : "vertical", "dir" : "greaterequal"}, {"y" : maxY, "r3" : r3, "type" : "vertical", "dir" : "greaterequal"}];
		      dataCSV[i].lines.push(newLine);
			}
		  }
		  else if (left.Silver < right.Silver)
		  {
		    if ( r3 < 0)
		    {
		      // Left country is dominated by right country
			  left.dominatedBy += 1;
			  			if(left.Country == "Tunisia")
			  checkText += "," + right.Country;
		    }
		    else if (r3 < 1)
		    {
		      // Right country is doimnated by left country
		    }
		    else
		    {
		  	  var newLine = [{"y" : minY, "r3": r3, "type" : "vertical", "dir" : "lesserequal"}, {"y" : maxY, "r3" : r3, "type" : "vertical", "dir" : "lesserequal"}];
		      dataCSV[i].lines.push(newLine);
		    }
		  }
		  else if (left.Bronze < right.Bronze)
		  {
		    left.dominatedBy +=1 ;
		  }
	    }
	  }
    }
  }
  
  rank(clickedX, clickedY);
 
  var data = [ [{"x": 0, "y" : 2}, {"x" : 1, "y": 1}], [{"x": 0, "y" : 1}, {"x" : 1, "y": 5}]];
  
  var line = d3.svg.line()
    .x(function(d){return x(d.type == "normal" ? d.x : d.r3);})
	.y(function(d){return y(d.type == "normal" ? d.r1 + d.r2*d.x : d.y);});
 
  var lineGroups = chartBody.selectAll("g.lineGroup").data(dataCSV).enter()
    .append("g")
	  .attr("class", "lineGroup");

  lineGroups.selectAll("path")
	  .data(function(d){return d.lines;})
	.enter().append("path")
	  .attr("d", line)
	  .attr("fill", "none")
	  .style("stroke", "#000")
	  .style("stroke-width", "1px")
	  .style("opacity", 0.25);
	  	  

  clickCountry("Great Britain");
	  
  checkData = dataCSV;
  
  
  var ranking = d3.select("#ranking").append("svg").attr("width", 240).attr("height", 1600);
  
  ranking.append("text")
    .text("Country")
	.attr("x", 20)
	.attr("y", 20)
	.style("font-size", "10px");
  ranking.append("text")
    .text("G")
	.attr("x", 113)
	.attr("y", 20)
	.style("font-size", "10px");
  ranking.append("text")
    .text("S")
	.attr("x", 133)
	.attr("y", 20)
	.style("font-size", "10px");
  ranking.append("text")
    .text("B")
	.attr("x", 153)
	.attr("y", 20)
	.style("font-size", "10px");
  ranking.append("text")
    .text("Score")
	.attr("x", 190)
	.attr("y", 20)
	.style("font-size", "10px");
  
  var rowGroups = ranking.selectAll("g").data(dataCSV).enter()
    .append("g")
	.attr("transform", function(d) {return "translate("+0+"," + ((d.rank + d.tieRank+1)*20)+")";});
	
  rowGroups.append("text")
	.text(function(d){return d.rank + "th - " + d.Country;})
	.attr("class", "rank")
	.attr("x", 0)
	.style("font-size", "10px")
	.on("click", function(){
	  clickCountry(this.textContent.substring(this.textContent.indexOf("-")+2));
	})
	.style("cursor", "pointer");
	
 rowGroups.append("text")
	.text(function(d){return d.Gold;})
	.attr("x", 110)
	.style("font-size", "10px");
	
 rowGroups.append("text")
	.text(function(d){return d.Silver;})
	.attr("x", 130)
	.style("font-size", "10px");
  
  rowGroups.append("text")
	.text(function(d){return d.Bronze;})
	.attr("x", 150)
	.style("font-size", "10px");
	
  rowGroups.append("text")
	.text(function(d){return Math.round(100*d.currentScore)/100;})
	.attr("class", "currentScore")
	.attr("x", 190)
	.style("font-size", "10px");  
  
  
  svg.on("click", function(){
    var mouseX = d3.svg.mouse(this)[0];
	var mouseY = d3.svg.mouse(this)[1];
	
	if (((mouseX >= chartLeftPadding) && (mouseX <= chartWidth - chartRightPadding)) && ((mouseY >= chartTopPadding) && (mouseY <= chartHeight - chartBottomPadding)))
	{  
	  clickedX = x.invert(mouseX);
	  clickedY = y.invert(mouseY);
	  
	  document.getElementById("clickY").innerHTML = Math.round(clickedY*10)/10;
	  document.getElementById("clickX").innerHTML = Math.round(clickedX*10)/10;
	  
      rank(clickedX,clickedY);
	  
	  ranking.selectAll("g").data(dataCSV)
	    .transition().duration(1000)	    
	  .attr("transform", function(d) {return "translate("+0+"," + ((d.rank + d.tieRank+1)*20)+")";});
	  
	  ranking.selectAll("g").data(dataCSV)
	    .selectAll("text.currentScore")
			.text(function(d){return Math.round(100*d.currentScore)/100;});
			
	  ranking.selectAll("g").data(dataCSV)
	    .selectAll("text.rank")
			.text(function(d){return d.rank + "th - " + d.Country;})
	  
	  drawCrosshairs(mouseX,mouseY);
	  
	  var rankToShow = String(dataCSV[oldClickedCountryIndex].rank);
	  var lastChar = (rankToShow.substring(rankToShow.length-1));
	  document.getElementById("clickedCountryRank").innerHTML = rankToShow + ( lastChar == 1 ? "st" : (lastChar == 2 ? "nd" : (lastChar == 3 ? "rd" : "th")));

    }
  });
  
  svg.on("mousemove", function(){
    // Where the mouse currently is 
	var mouseX = d3.svg.mouse(this)[0];
	var mouseY = d3.svg.mouse(this)[1];
	
	// What those values correspond to. Will set later.
	var mouseXVal;
	var mouseYVal;
	
	// Used to count how many countries rank above this one at this current position
	var rankBelow = 0;
	
	// Only proceed if the mouse is actually being moved within the charted area
	if (((mouseX >= chartLeftPadding) && (mouseX <= chartWidth - chartRightPadding)) && ((mouseY >= chartTopPadding) && (mouseY <= chartHeight - chartBottomPadding)))
	{
      mouseXVal = x.invert(mouseX);
	  mouseYVal = y.invert(mouseY);
	 
	
	  var currentPaths = d3.select(oldClickedCountryLines).selectAll("path")[0];
	  for (var i=0; i< currentPaths.length; i++)
      {
        if (compare(mouseXVal, mouseYVal, d3.select(currentPaths[i]).datum()))
		{
		  d3.select(currentPaths[i]).style("stroke", "#00f");
		}
		else
		{
		  d3.select(currentPaths[i]).style("stroke", "#f00");
		  rankBelow += 1;
		}
	  }
	}
	
	//	d3.select("#hover").node().innerHTML = "1 Gold = " + Math.round(100*y.invert(mouseY))/100 + " Silvers<br>1 Bronze = " + Math.round(100*x.invert(mouseX))/100 + " Silvers<BR>" + oldClickedCountryText + " to rank: " + (1 + oldClickedCountryDominatedBy + rankBelow) + " = 1 + " + oldClickedCountryDominatedBy + " + " + rankBelow;
	var rankToShow = String(1 + oldClickedCountryDominatedBy + rankBelow);
	var lastChar = (rankToShow.substring(rankToShow.length-1));
	document.getElementById("hoverCountryRank").innerHTML = rankToShow + ( lastChar == 1 ? "st" : (lastChar == 2 ? "nd" : (lastChar == 3 ? "rd" : "th")));
    document.getElementById("hoverX").innerHTML = Math.round(10*x.invert(mouseX))/10;
	document.getElementById("hoverY").innerHTML = Math.round(10*y.invert(mouseY))/10;
	
	
	chartBody.selectAll("path.tempPath").remove();
	
	for( var i = 0; i < d3.select(oldClickedCountryLines).selectAll("path")[0].length; i++)
    {
      var pathtext;
    
	  var path = (d3.select(oldClickedCountryLines).selectAll("path")[0][i]);
      var data = (d3.select(d3.select(oldClickedCountryLines).selectAll("path")[0][i]).datum());  
 
      if (data[0].type == "normal")
        pathtext = makeClipShape(path, data[0].r1, data[0].r2, aboveLine(data[0].r1, data[0].r2,mouseX,mouseY));
	  else if (data[0].type == "veritcal")
	    pathtext = makeVertClipShape(path, data[0].r3, aboveLine(data[0].r1, data[0].r2,mouseX,mouseY));
  
      chartBody.append("path")
	   .attr("class", "tempPath")
         .attr("d", pathtext)
		 .attr("fill", "#cc5555")
		 .style("stroke", "none");

    }

	var tempPaths = chartBody.selectAll("path.tempPath");
	tempPaths.style("opacity", 1/(tempPaths[0].length+1));
	
	
	function compare(mouseXVal, mouseYVal, line)
	{	  
	  var type = line[0].type;
	  var dir = line[0].dir;
	  
	  if (type == "normal")
	  {
      	 if (dir == "greaterequal")
		   return (mouseYVal >= line[0].r1 + line[0].r2*mouseXVal); 
		 else if (dir == "lesserequal")
		   return (mouseYVal <= line[0].r1 + line[0].r2*mouseXVal);
	  }
	  else if (type == "vertical")
	  {
	    if (dir == "greaterequal")
		  return mouseXVal <= line[0].r3;
		else if (dir == "lesserequal")
		  return mouseXVal >= line[0].r3;
	  }
	  else return false;
	}
  });
  
  
  function clickCountry(countryText)
  {
    var newClickedCountryLines;
  
    for(var i = 0; i < dataCSV.length; i++)
	{
	  if(dataCSV[i].Country == countryText)
	  {
	    d3.select(lineGroups[0][i]).selectAll("path")
          .style("stroke", "#f00")
	      .style("stroke-width", "10px")
	      .style("opacity", 1);
		  
        lineGroups[0][i].parentNode.appendChild(lineGroups[0][i]);
		
		newClickedCountryLines = lineGroups[0][i];
		
		oldClickedCountryDominatedBy = dataCSV[i].dominatedBy;
		
		document.getElementById("clickedCountry").innerHTML = countryText;
		
		var rankToShow = String(dataCSV[i].rank);
		var lastChar = (rankToShow.substring(rankToShow.length-1));
		document.getElementById("clickedCountryRank").innerHTML = rankToShow + ( lastChar == 1 ? "st" : (lastChar == 2 ? "nd" : (lastChar == 3 ? "rd" : "th")));
		
		oldClickedCountryIndex = i;
	  }
	}
	
	if(oldClickedCountryLines != null)
	{	
	  d3.select(oldClickedCountryLines).selectAll("path")
	    .style("stroke", "#000")
	    .style("stroke-width", "1px")
	    .style("opacity", 0.25);
	}
	
	oldClickedCountryLines = newClickedCountryLines;
	oldClickedCountryText = countryText;
  }
  
  function rank(x, y)
  {
    for(var i = 0; i < dataCSV.length; i++)
	  dataCSV[i].currentScore = dataCSV[i].Gold + (dataCSV[i].Silver/y) + ((dataCSV[i].Bronze*x)/y);

    for(var i = 0; i < dataCSV.length; i++)
	{	
	  var left = dataCSV[i];
	  left.rank = 1;
	  left.tieRank = 0;
	  
	  for(var j = 0; j < dataCSV.length; j++)
	  {
	    var right = dataCSV[j];
		if (right.currentScore - left.currentScore > 0.000001)
		  left.rank += 1;
		else if ((right.currentScore - left.currentScore > -0.00001) && (left.Country > right.Country))
		  left.tieRank += 1;
	  }
	}
  }
  
  function drawCrosshairs(x,y)
  {
    var newCrosshairs = svg.append("g");
  
    newCrosshairs.append("circle")
	  .attr("cx", x)
	  .attr("cy", y)
	  .attr("r", "15px")
	  .style("stroke", "#f00")
	  .style("stroke-width", "3px")
	  .attr("fill", "none");
	  
	newCrosshairs.append("line")
	  .attr("x1", x)
	  .attr("y1", y - 7)
	  .attr("x2", x)
	  .attr("y2", y - 21)
	  .style("stroke", "#f00")
	  .style("stroke-width", "3px");
	  
	newCrosshairs.append("line")
	  .attr("x1", x)
	  .attr("y1", y + 7)
	  .attr("x2", x)
	  .attr("y2", y + 21)
	  .style("stroke", "#f00")
	  .style("stroke-width", "3px");
	  
	newCrosshairs.append("line")
	  .attr("x1", x - 7)
	  .attr("y1", y)
	  .attr("x2", x - 21)
	  .attr("y2", y)
	  .style("stroke", "#f00")
	  .style("stroke-width", "3px");
	  
	newCrosshairs.append("line")
	  .attr("x1", x + 7)
	  .attr("y1", y)
	  .attr("x2", x + 21)
	  .attr("y2", y)
	  .style("stroke", "#f00")
	  .style("stroke-width", "3px");
	  
	if (oldCrosshairs != null)
	{
	  oldCrosshairs.remove();
	}
	
	oldCrosshairs = newCrosshairs;
	  
  }
  
  

    
	  

}
 

 
function aboveLine(r1, r2, xpos, ypos)
{
  return y.invert(ypos) >= r1 + r2*x.invert(xpos);
}
 
 
function makeVertClipShape(line, r3, greaterBool)
{
  var pathText = d3.select(line).attr("d");
  var findComma = pathText.indexOf(",");
  var findL = pathText.indexOf("L");
  var originX = pathText.substring(1,findComma);
  var originY = pathText.substring(findComma+1,findL);
  
  if(greaterBool)
  {
    pathText += addB() + addD() + "Z";
  }
  else
  {
    pathText += addA() + addC() + "Z";
  }
  
    
  function addA(){
    return "L" + chartLeftPadding + "," + chartTopPadding;}
  
  function addB(){
    return "L" + (chartWidth - chartRightPadding) + "," + chartTopPadding;}
  
  function addC(){
    return "L" + chartLeftPadding + "," + (chartHeight - chartBottomPadding);}

  function addD(){
    return "L" + (chartWidth - chartRightPadding) + "," + (chartHeight - chartBottomPadding);}

  return pathText;
}

 
function makeClipShape(line, r1, r2, greaterBool)
{
  var pathText = d3.select(line).attr("d");
  var findComma = pathText.indexOf(",");
  var findL = pathText.indexOf("L");
  var originX = pathText.substring(1,findComma);
  var originY = pathText.substring(findComma+1,findL);

  if((r1 >= minY) && (r1 <= maxY))
  {
    if(r1 + r2  > maxY)
	{
	  if(greaterBool)
		pathText += addA() + "Z"; // A + o
	  else
	    pathText += addB() + addD() + addC() + "Z";// B + D + C + o
	}
	else if((r1 + r2 >= minY)&& (r1 + r2) <= maxY)
	{
	  if(greaterBool)
	    pathText += addB() + addA() + "Z";//B + A + 0
	  else
	    pathText += addD() + addC() + "Z";// D + C + o
	}
	else if(r1 + r2 <= minY)
	{
	  if(greaterBool)
	    pathText += addD() + addB() + addA() + "Z"; // D B A o
	  else
	    pathText += addC() + "Z"; // C o
	}
  }
  else if (r1 >= maxY)
  {
    if(r1 + r2 <= minY)
	{
      if(greaterBool)
	    pathText += addD() + addB() + "Z"; //d b o
	  else
	    pathText += addC() = addA() + "Z"; //c a o
	}
	else if ((r1 + r2 >= minY)&&(r1+r2<=maxY))
	{
	  if(greaterBool)
	    pathText += addB() + "Z";// b o
	  else
	    pathText += addD() + addC() + addA() + "Z"; // d c a o
	}
  }
  else if(r1 <= minY)
  {
    if(r1+r2 >= maxY)
	{
	  if(greaterBool)
	    pathText += addA() + addC() + "Z"; //a c o
	  else
	    pathText += addB() + addD() + "Z";  //b d o
	}
	else if ((r1 + r2 >= minY) && (r1 + r2 <= maxY))
	{
	  if(greaterBool)
	    pathText += addB() + addA() + addC() + "Z"; // b a c o
	  else
	    pathText += addD() + "Z"; // d o
	}
  }
  
  function addA(){
    return "L" + chartLeftPadding + "," + chartTopPadding;}
  
  function addB(){
    return "L" + (chartWidth - chartRightPadding) + "," + chartTopPadding;}
  
  function addC(){
    return "L" + chartLeftPadding + "," + (chartHeight - chartBottomPadding);}

  function addD(){
    return "L" + (chartWidth - chartRightPadding) + "," + (chartHeight - chartBottomPadding);}

  return pathText;
}




// Axis

xaxis = d3.svg.axis()
  .scale(x)
  .tickSubdivide(true)
  .tickSize(5)
  .ticks(5);
yaxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickSubdivide(true)
  .tickSize(5)
  .ticks(9);
svg.append("g")
  .attr("transform", "translate(0," + (chartHeight-chartBottomPadding) + ")")
  .attr("class", "axis")
  .call(xaxis)
  .selectAll("path.domain")
    .style("stroke", "#ccc")
	.style("fill", "none");
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + chartLeftPadding + "," + 0 + ")")
  .call(yaxis)
svg.selectAll("g.axis")
  .selectAll("path.domain")
    .style("stroke", "#ccc")
	.style("fill", "none");  
svg.selectAll("g.axis")
  .selectAll("line.tick")
    .style("stroke", "#ccc");
svg.selectAll("g.axis").selectAll("text")
  .style("font-size", "8px")
  .style("fill", "#aaa");
  
svg.append("text")
  .text("Bronze Medal Value : Silver Medal Value")
  .attr("x", chartLeftPadding + (chartWidth-chartLeftPadding-chartRightPadding)/2)
  .attr("y", (chartHeight - chartBottomPadding) + 30)
  .style("text-anchor", "middle")
  .style("font-size", "12px")
  .style("fill", "#aaa");
svg.append("text")
  .text("Gold Medal Value : Silver Medal Value")
  .attr("x", chartLeftPadding - 20)
  .attr("y", chartTopPadding + (chartHeight-chartTopPadding-chartBottomPadding)/2)
  .attr("transform", "rotate(-90 " + (chartLeftPadding-20)  + "," + (chartTopPadding + (chartHeight-chartTopPadding-chartBottomPadding)/2) + ")")
  .style("text-anchor", "middle")
  .style("font-size", "12px")
  .style("fill", "#aaa");