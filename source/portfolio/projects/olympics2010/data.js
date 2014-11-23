function getInternetExplorerVersion() {
    var rv = 99; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

if (getInternetExplorerVersion() < 9)
{
  alert("Sorry, but you'll need IE9+ or Chrome/Firefox/Etc. to access this content.");
}


var chartHeight = 500;
var chartWidth = 500;
var chartLeftPadding = 45;
var chartRightPadding = 20;
var chartTopPadding = 25;
var chartBottomPadding = 50;
var chartAxisPadding = 100;
var oldClicked;
var oldClickedText;

var cohortStateID = 1;
var clickedNode;

var x = d3.scale.linear()
    .domain([-55, 50])
	//.domain([-180,180])
    .range([0, chartWidth - chartLeftPadding - chartRightPadding]);	
var y = d3.scale.linear()
    .domain([35, 60])
	//.domain([-90,90])
    .range([chartHeight - chartTopPadding - chartBottomPadding, 0]);

var lineThickness_participants = d3.scale.linear()
  .domain([0,117])
  .range([3,20]);
  
var lineThickness_medals = d3.scale.linear()
  .domain([0,31])
  .range([3,30]);

var bothThickness = [lineThickness_participants,lineThickness_medals];
	
var r_participants = d3.scale.linear()
    .domain([0,11])
	.range([0,10]);

var r_medalists = d3.scale.linear()
    .domain([0,6])
	.range([0,20]);
	
var r_both = [r_participants, r_medalists];

var outerX = d3.scale.linear()
    .domain([-180, 180])
    .range([0, chartWidth - chartLeftPadding - chartRightPadding]);	
var outerY = d3.scale.linear()
    .domain([-90, 90])
    .range([chartHeight - chartTopPadding - chartBottomPadding, 0]);
		
var vis = d3.select("#chart").append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
  .append("g")
    .attr("transform", "translate(" + chartLeftPadding + "," + chartTopPadding + ")");  
   
var chartCore = vis.append("svg")
  .attr("width", chartWidth - chartLeftPadding - chartRightPadding)
  .attr("height", chartHeight - chartTopPadding - chartBottomPadding)
  .attr("x", 0)
  .attr("y", 0);
   
 d3.csv("projects/olympics2010/data.csv",function(csvDetail) {
   drawData(csvDetail);
 });
  
 
function drawData(csvDetail)
{
  // ============================================
  //
  // DATA MANIPULATION
  //
  // ============================================

  var dataDetail = d3.nest()
    .key(function(d) {return d.sportID;})
    .sortKeys(d3.ascending)
    .entries(csvDetail);

  for(var j = 0; j < dataDetail.length; j++)
  {  
    var participantsSum = 0;
	var participantsLatSumProduct = 0;
    var participantsLonSumProduct = 0;
	var medalistsLatSumProduct = 0;
	var medalistsLonSumProduct = 0;
	var medalsSum = 0;

    for(var i = 0; i<dataDetail[j].values.length; i++)
    {
      participantsSum += +dataDetail[j].values[i].participants_Count;
      participantsLatSumProduct += +dataDetail[j].values[i].participants_Count * +dataDetail[j].values[i].Lat;
	  participantsLonSumProduct += +dataDetail[j].values[i].participants_Count * +dataDetail[j].values[i].Lon;
	  
	  medalsSum += +dataDetail[j].values[i].medals_Count;
      medalistsLatSumProduct += +dataDetail[j].values[i].medals_Count * +dataDetail[j].values[i].Lat;
	  medalistsLonSumProduct += +dataDetail[j].values[i].medals_Count * +dataDetail[j].values[i].Lon;	  
	}
		
	dataDetail[j].myLat = [participantsLatSumProduct/participantsSum, medalistsLatSumProduct/medalsSum];
	dataDetail[j].myLon = [participantsLonSumProduct/participantsSum, medalistsLonSumProduct/medalsSum];
	dataDetail[j].myCount = [participantsSum, medalsSum];
	
	for(var i = 0; i<dataDetail[j].values.length; i++)
	{
	  dataDetail[j].values[i].count = [dataDetail[j].values[i].participants_Count, dataDetail[j].values[i].medals_Count];
	}
	
  }
  
  // =====================================================
  
  var nodes = chartCore.selectAll(".coreNodes").data(dataDetail).enter()
    .append("g")
	.attr("class", "coreNode")
	.style("cursor", "pointer")
	.attr("title", function(d) {return d.values[0].Sport;})
	.on("click", function(D) {
      
	  
      vis.selectAll(".lines").remove();
	
	  clickedNode = d3.select(this);
	  textElementOfClickedNode = clickedNode.selectAll("text")[0][0]
	  
	  clickSportInList(textElementOfClickedNode.textContent);
	  if(oldClickedText != null)
	  {
	    oldClickedText.style.fontWeight = "";
	  }
	  oldClickedText = textElementOfClickedNode;
	  textElementOfClickedNode.style.fontWeight = "bold";
	  
	  vis.selectAll("circle")
	    .style("fill", "#55a")
		.style("fill-opacity", 0.25);
	  clickedNode.selectAll("circle")
	    .style("fill", "#c55")
		.style("fill-opacity", 0.9);	
	
	  D.values.sort(function(a,b) { return a.count[cohortStateID] - b.count[cohortStateID]; });
	
      clickedNode.selectAll(".lines").data(D.values).enter()
        .append("line")
     	.attr("class", "lines")
        .attr("x1", function(d) {return x(D.myLon[cohortStateID]);})
	    .attr("y1", function(d) {return y(D.myLat[cohortStateID]);})
	    .attr("x2", function(d) {return outerX(outerLine(d.Lon, d.Lat).x);})
	    .attr("y2", function(d) {return outerY(outerLine(d.Lon, d.Lat).y);})
		.attr("side", function(d) {return outerLine(d.Lon, d.Lat).side;})
        .style("stroke", "#ccc")
        .style("stroke-width", function(d) {return d.count[cohortStateID] > 0 ? bothThickness[cohortStateID](d.count[cohortStateID]) : 0;})
		.style("stroke-linecap", "square")
		.style("stroke-opacity", 0.5)
		.on("mouseover", function(d,i) {
		  if(d.count[cohortStateID] > 0)
		  {
		    vis.append("text")
			  .attr("class", "tempCountry")
			  .attr("x", d3.select(this).attr("x2"))
	  		  .attr("y", d3.select(this).attr("y2"))
	  		  .attr("text-anchor", d3.select(this).attr("side") == "left" ? "start" : (d3.select(this).attr("side") == "right" ? "end" : d3.select(this).attr("x2") < (chartWidth-chartLeftPadding-chartRightPadding)/2 ? "start" : "end"))
			  .attr("dx", d3.select(this).attr("side") == "left" ? -5 : (d3.select(this).attr("side") == "right" ? 5 : 0))
			  .attr("dy", d3.select(this).attr("side") == "top" ? -5 : (d3.select(this).attr("side") == "bottom" ? 15 : 0))
			  .text(d.Country + " - " + d.count[cohortStateID]);
			
		    d3.select(this).style("stroke", "#c00");
		  }
		})
		.on("mouseout", function(d,i) {
		  vis.selectAll(".tempCountry").remove();
		  d3.select(this).style("stroke", "#ccc");
		});
		
		this.parentNode.appendChild(this);
		var circleForFront = clickedNode.selectAll("circle").node();
		circleForFront.parentNode.appendChild(circleForFront);
		var textForFront = clickedNode.selectAll("text").node();
		textForFront.parentNode.appendChild(textForFront);
		
	});
  
	
  nodes.append("circle")
    .attr("class", "coreCircle")
    .attr("cx",function(d) {return x(0);})
    .attr("cy",function(d) {return y(0);})
    .attr("r",function(d) {return r_both[cohortStateID](0);})
	.style("fill", "#55a")
	.style("fill-opacity", 0.25);
  
  nodes.append("text")
    .attr("class", "label")
	.attr("text-anchor", "middle")
	.text(function(d) { return d.values[0].Sport;})
	.attr("x", function(d) {return x(d.myLon[cohortStateID]);})
	.attr("y", function(d) {return y(d.myLat[cohortStateID]);})
  // now we initiate - moving the marks to their position
 
  vis.selectAll(".coreCircle").transition().duration(1000)
    .attr("cx",function(d) {return x(d.myLon[cohortStateID]);})
    .attr("cy",function(d) {return y(d.myLat[cohortStateID]);})
    .attr("r",function(d) {return r_both[cohortStateID](Math.sqrt(+d.myCount[cohortStateID]));})
	
  var list = document.getElementById("sportList");
  
  dataDetail.sort(function(a,b) {return a.values[0].Sport > b.values[0].Sport ? 1 : -1;});
  
  for(var i = 0; i < dataDetail.length; i++)
  {
    list.innerHTML += "<a onClick='clickSport(this.innerHTML)'>" + dataDetail[i].values[0].Sport + "</a>";
    if(i < dataDetail.length-1)
  	  list.innerHTML += ", ";
  }

  }




function clickSportInList(textSport)
{
  var list = document.getElementById("sportList");
  var sportsList = list.getElementsByTagName("a");
  
  for(var i = 0; i < sportsList.length; i++)
  {
  
    if(sportsList.item(i).textContent == textSport)
	{
	  if(oldClicked!=null)
	  {
		oldClicked.style.textDecoration="";
		oldClicked.style.fontWeight="";
	  }
	  oldClicked=sportsList.item(i);
	  sportsList.item(i).style.textDecoration="underline";
	  sportsList.item(i).style.fontWeight="bold";
	}
  }
}

function clearSelection()
{
  if(oldClicked!=null)
  {
  	oldClicked.style.textDecoration="";
	oldClicked.style.fontWeight="";
  }
  
  if(oldClickedText != null)
  {
	oldClickedText.style.fontWeight = "";
  }
  
   vis.selectAll(".lines").remove();
   
   vis.selectAll("circle")
	 .style("fill", "#55a")
	 .style("fill-opacity", 0.25);
}

function clickSport(clickedSport)
{
  clickSportInList(clickedSport);

  var allText = vis.selectAll("text");
  
  for(var i = 0; i < allText[0].length; i++)
  {  
    if(allText[0][i].textContent == clickedSport)
	{
	  var clickme = d3.select(allText[0][i].parentNode);
	  var event = document.createEvent("SVGEvents");
	  
	  event.initEvent("click",true,true);
	  
	  allText[0][i].parentNode.dispatchEvent(event);
	}
  }
}

// ============================================================================
//
// A X E S
//
// ============================================================================

 
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
  .ticks(5);
vis.append("g")
  .attr("transform", "translate(0," + (chartHeight-chartTopPadding-chartBottomPadding) + ")")
  .attr("class", "axis")
  .call(xaxis)
  .selectAll("path.domain")
    .style("stroke", "#ccc")
	.style("fill", "none");
vis.append("g")
  .attr("class", "axis")
  .call(yaxis)
vis.selectAll("g.axis")
  .selectAll("path.domain")
    .style("stroke", "#ccc")
	.style("fill", "none");  
vis.selectAll("g.axis")
  .selectAll("line.tick")
    .style("stroke", "#ccc");
vis.selectAll("g.axis").selectAll("text")
  .style("font-size", "8px")
  .style("fill", "#aaa");
vis.append("line")
  .attr("x1", chartWidth - chartLeftPadding - chartRightPadding)
  .attr("y1", 0)
  .attr("x2", chartWidth - chartLeftPadding - chartRightPadding)
  .attr("y2", chartHeight - chartTopPadding - chartBottomPadding)
  .style("stroke", "#ccc")
  .style("fill", "none");
vis.append("line")
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", chartWidth-chartLeftPadding-chartRightPadding)
  .attr("y2", 0)
  .style("stroke", "#ccc")
  .style("fill", "none");
vis.append("text")
  .text("Longitude")
  .attr("x", (chartWidth - chartLeftPadding - chartRightPadding)/2)
  .attr("y", (chartHeight - chartBottomPadding))
  .style("text-anchor", "middle")
  .style("font-size", "12px")
  .style("fill", "#aaa");
vis.append("text")
  .text("Latitude")
  .attr("x", -30)
  .attr("y", (chartHeight-chartTopPadding-chartBottomPadding)/2)
  .attr("transform", "rotate(-90 -30," + ((chartHeight-chartTopPadding-chartBottomPadding)/2) + ")")
  .style("text-anchor", "middle")
  .style("font-size", "12px")
  .style("fill", "#aaa");
vis.append("text")
  .text("East")
  .attr("x", chartWidth-chartLeftPadding-chartRightPadding)
  .attr("y", -5)
  .style("text-anchor", "end")
  .style("font-size", "12px")
  .style("fill", "#aaa");  
vis.append("text")
  .text("West")
  .attr("x", 0)
  .attr("y", -5)
  .style("text-anchor", "start")
  .style("font-size", "12px")
  .style("fill", "#aaa");
vis.append("text")
  .text("North")
  .attr("x", -8)
  .attr("y", 12)
  .style("text-anchor", "end")
  .style("font-size", "12px")
  .style("fill", "#aaa");
vis.append("text")
  .text("South")
  .attr("x", -8)
  .attr("y", chartHeight-chartTopPadding-chartBottomPadding-5)
  .style("text-anchor", "end")
  .style("font-size", "12px")
  .style("fill", "#aaa");  
  
document.getElementById("medalsText").style.textDecoration="underline";
  
function switchToMedals()
{
  if (cohortStateID == 0)
  {  
    switchthem();
    document.getElementById("participantsText").style.textDecoration="";
	document.getElementById("medalsText").style.textDecoration="underline";
  }
}

function switchToParticipants()
{
  if (cohortStateID == 1)
  {
    switchthem();
	document.getElementById("participantsText").style.textDecoration="underline";
	document.getElementById("medalsText").style.textDecoration="";
  }
}	
	
function switchthem()
{ 
  if (cohortStateID == 0)
  {
    cohortStateID = 1;
  } else {
    cohortStateID = 0;
  }
  
  vis.selectAll(".coreCircle").transition().duration(1000)
    .attr("cx",function(d) {return x(d.myLon[cohortStateID]);})
    .attr("cy",function(d) {return y(d.myLat[cohortStateID]);})
    .attr("r",function(d) {return r_both[cohortStateID](Math.sqrt(+d.myCount[cohortStateID]));});
	
  vis.selectAll(".coreCircle")
    .attr("cx_future",function(d) {return x(d.myLon[cohortStateID]);})
    .attr("cy_future",function(d) {return y(d.myLat[cohortStateID]);})   
	
  vis.selectAll(".label").transition().duration(1000)
	.attr("x", function(d) {return x(d.myLon[cohortStateID]);})
	.attr("y", function(d) {return y(d.myLat[cohortStateID]);})
	
  vis.selectAll(".lines").transition().duration(1000)
    .attr("x1", function(d) {return clickedNode.selectAll(".coreCircle").attr("cx_future");})
	.attr("y1", function(d) {return clickedNode.selectAll(".coreCircle").attr("cy_future");});
	
  vis.selectAll(".lines").transition().duration(1000).delay(1000)	
    .style("stroke-width", function(d) {return d.count[cohortStateID] > 0 ? bothThickness[cohortStateID](d.count[cohortStateID]) : 0;})
}

function outerLine(outerX, outerY)
{
  var drawX;
  var drawY;
  var side;

  if (( outerX > -2 * outerY ) && ( outerX < 2 * outerY))
  {
    drawY = 90;
    drawX = (outerX/outerY)*drawY;
	side = "top";
  }
  if (( outerX < -2 * outerY ) && ( outerX > 2 * outerY))
  {
    drawY = -90;
    drawX = (outerX/outerY)*drawY;
	side = "bottom";
  }
  if (( outerY < -0.5 * outerX) && ( outerY > 0.5 * outerX))
  {
    drawX = -180;
    drawY = (outerY/outerX)*drawX;
	side = "left";
  }
  if (( outerY > -0.5 * outerX) && ( outerY < 0.5 * outerX))
  {
    drawX = 180;
    drawY = (outerY/outerX)*drawX;
	side = "right";
  }
  
  return {"x" : drawX, "y" : drawY, "side" : side};  
}




// =================
// STEPPER
// =================

// Stepper data
var stepperTitles = ["Introduction", "Participants vs. Medals", "Cross-Country Paricipants", "Cross-Country Medals"];
var stepperText = ["<p>The chart is displaying the average longitude/latitude of medals won from the 2010 Vancouver Winter Olympics. Larger bubbles are for sports with more medals.</p><p>Use this chart to learn the geography of sports. Who comes to compete, and who wins?</p>", "<p>Now the chart is showing paricipants. The sports are tightly clustered because there are a broad range of participants from all over the world.</p><p>Ice Hockey is dominated by Northern Europe and North America, so it is at the top.</p><p>Larger bubbles have more participants.</p>", "<p>Cross-Country Skiing is a central sport with many participants from many countries.</p>", "<p>Switching to medals, however, we see that the sport is in actuality dominated by Northern Europe.</p><p>See Biathlon, a related spot, follow the same movement.</p>"];

// Initiate
var currentStep = 1;
updateStepCrumbs(1);
document.getElementById("stepperTitle").innerHTML = stepperTitles[0];
document.getElementById("stepperText").innerHTML = stepperText[0];

function stepNext()
{
  if (currentStep < 4)
  {
    loadStep(currentStep + 1);
  }
}

function stepPrev()
{
  if (currentStep > 1)
  {
    loadStep(currentStep - 1);
  }
}

function updateStepCrumbs(stepNum)
{
  var currentCrumb = document.getElementById("step" + currentStep + "num");
  currentCrumb.style.textDecoration="";
  currentCrumb.style.fontWeight="";
  
  var newCrumb = document.getElementById("step" + stepNum + "num");
  newCrumb.style.textDecoration="underline";
  newCrumb.style.fontWeight="bold";
}

function loadStep(stepNum)
{

  updateStepCrumbs(stepNum);

  if (stepNum == 1)
  {
    clearSelection();
	switchToMedals();
	
	document.getElementById("stepperTitle").innerHTML = stepperTitles[stepNum-1];
    document.getElementById("stepperText").innerHTML = stepperText[stepNum-1];
  }
  else if (stepNum == 2)
  {
    clearSelection();
	switchToParticipants();
	document.getElementById("stepperTitle").innerHTML = stepperTitles[stepNum-1];
    document.getElementById("stepperText").innerHTML = stepperText[stepNum-1];
  }
  else if (stepNum == 3)
  {
	clickSport("Cross-Country Skiing");
	switchToParticipants();
	document.getElementById("stepperTitle").innerHTML = stepperTitles[stepNum-1];
    document.getElementById("stepperText").innerHTML = stepperText[stepNum-1];
  }
  else if (stepNum == 4)
  {
	if (oldClickedText != null)
	{
      clickSport("Cross-Country Skiing");
	}
    else
    {
      clickSport("Cross-Country Skiing");
    }   
    switchToMedals();
    
	document.getElementById("stepperTitle").innerHTML = stepperTitles[stepNum-1];
    document.getElementById("stepperText").innerHTML = stepperText[stepNum-1];
	}
  
  currentStep = stepNum;
}


