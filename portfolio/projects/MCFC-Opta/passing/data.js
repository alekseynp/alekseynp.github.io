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

var aaviewdata = 0;


var visWidth = 500;
var visHeight = 700;
var topAxisPadding = 25;
var leftAxisPadding = 25;
var rightPadding = 25;
var bottomPadding = 225;

var chartWidth = visWidth - leftAxisPadding - rightPadding;
var chartHeight = visHeight - topAxisPadding - bottomPadding;

var svg = d3.select("#chart").append("svg")
    .attr("width", visWidth)
    .attr("height", visHeight);

 
svg.append("text")
  .text("100% Left")
  .attr("x", leftAxisPadding)
  .attr("y", topAxisPadding - 5)
  .style("font-size", "12px");
  
svg.append("text")
  .text("100% Right")
  .attr("x", leftAxisPadding + chartWidth)
  .attr("y", topAxisPadding - 5)
  .style("text-anchor", "end")
  .style("font-size", "12px");
  
  
var vertAxisLines = [
  { x: leftAxisPadding, id: "vertAxisLeft" },
  { x: leftAxisPadding + chartWidth/2, id: "vertAxisMiddle" },
  { x: leftAxisPadding + chartWidth, id: "vertAxisRight"}
];

var horiAxisLines = [
  { y: topAxisPadding, id: "horiAxisTop" },
  { y: topAxisPadding + chartHeight/2, id: "horiAxisMiddle" },
  { y: topAxisPadding + chartHeight, id: "horiAxisBottom"}
];

svg.selectAll("line.vertAxes")
    .data(vertAxisLines).enter()
  .append("line")
    .attr("class", "vertAxes")
	.attr("x1", function(d){return d.x;})
	.attr("y1", topAxisPadding)
	.attr("x2", function(d){return d.x;})
	.attr("y2", topAxisPadding + chartHeight)
	.style("stroke", "#ccc")
	.style("stroke-width", "1px")
	.style("fill", "none");
	
svg.selectAll("line.horiAxes")
  .data(horiAxisLines).enter()
  .append("line")
    .attr("class", "vertAxes")
	.attr("x1", leftAxisPadding)
	.attr("y1", function(d){return d.y;})
	.attr("x2", leftAxisPadding + chartWidth)
	.attr("y2", function(d){return d.y;})
	.style("stroke", "#ccc")
	.style("stroke-width", "1px")
	.style("fill", "none");
    
svg.append("text")
  .text("100% Forwards")
  .attr("x", leftAxisPadding - 5)
  .attr("y", topAxisPadding)
  .attr("transform", "rotate(270," + [leftAxisPadding - 5, topAxisPadding] + ")")
  .style("text-anchor", "end")
  .style("font-size", "12px");
  
svg.append("text")
  .text("100% Backwards")
  .attr("x", leftAxisPadding - 5)
  .attr("y", topAxisPadding + chartHeight)
  .attr("transform", "rotate(270," + [leftAxisPadding - 5, topAxisPadding + chartHeight] + ")")
  .style("text-anchor", "start")
  .style("font-size", "12px");

var myColour = d3.scale.category10();
//var myColour = d3.scale.ordinal().range(["#377EB8", "#4DAF4A", "#984EA3", "#E41A1C"]);
var xScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, chartWidth]);	
var yScale = d3.scale.linear()
    .domain([0, 1])
    .range([chartHeight, 0]);
var rScale = d3.scale.sqrt()
    .domain([0, 2660])
	.range([0, 10]);
	
var circles;

d3.csv("projects/MCFC-Opta/passing/playerPassDir.csv",function(csv) {
		
  aaviewdata = csv;
  
  var vis = svg.append("g")
	.attr("transform", "translate(" + [leftAxisPadding, topAxisPadding] + ")");
	  
  circles = vis.selectAll("circle")
    .data(csv)
	.enter()
	.append("circle")
	  .sort(function(a,b) { return a.total > b.total ? 1 : -1;})
	  .attr("cy", function(d) {return yScale(d.forward);})
	  .attr("cx", function(d) {return xScale(d.left);})
	  .attr("r", function(d) {return rScale(d.total);})
	  .attr("fill", function(d) {return myColour(d.positionID);})
	  .attr("fill-opacity", 0.7)
	  .on("mouseout", tooltip.hide)
	  .on("mouseover", function(d) { tooltip.show("<strong>" + d.playerName + "</strong><BR>" + d.team);});
	 
 });
 
 function highlightTeam(teamname)
 {
   clearSteps();
   if(teamname == "(none)")
   {
     circles.attr("fill-opacity", 0.7)
	  .sort(function(a,b) { return a.total > b.total ? 1 : -1;});
   }
   else
   {
     circles.attr("fill-opacity", function(d) { return 0.8 * (d.team==teamname ? 1 : 0.25);});
	 circles.sort(function(a,b) { return a.team==teamname ? 1 : -1 ; });
   }
   

 }
 
 
 
 
 
 
 drawLegend();
 
 
 
 
 var tooltip=function(){
 var id = 'tt';
 var top = 3;
 var left = 3;
 var maxw = 300;
 var speed = 10;
 var timer = 20;
 var endalpha = 95;
 var alpha = 0;
 var tt,t,c,b,h;
 var ie = document.all ? true : false;
 return{
  show:function(v,w){
   if(tt == null){
    tt = document.createElement('div');
    tt.setAttribute('id',id);
    t = document.createElement('div');
    t.setAttribute('id',id + 'top');
    c = document.createElement('div');
    c.setAttribute('id',id + 'cont');
    b = document.createElement('div');
    b.setAttribute('id',id + 'bot');
    tt.appendChild(t);
    tt.appendChild(c);
    tt.appendChild(b);
    document.body.appendChild(tt);
    tt.style.opacity = 0;
    tt.style.filter = 'alpha(opacity=0)';
    document.onmousemove = this.pos;
   }
   tt.style.display = 'block';
   c.innerHTML = v;
   tt.style.width = w ? w + 'px' : 'auto';
   if(!w && ie){
    t.style.display = 'none';
    b.style.display = 'none';
    tt.style.width = tt.offsetWidth;
    t.style.display = 'block';
    b.style.display = 'block';
   }
  if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
  h = parseInt(tt.offsetHeight) + top;
  clearInterval(tt.timer);
  tt.timer = setInterval(function(){tooltip.fade(1)},timer);
  },
  pos:function(e){
   var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
   var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
   tt.style.top = (u - h) + 'px';
   tt.style.left = (l + left) + 'px';
  },
  fade:function(d){
   var a = alpha;
   if((a != endalpha && d == 1) || (a != 0 && d == -1)){
    var i = speed;
   if(endalpha - a < speed && d == 1){
    i = endalpha - a;
   }else if(alpha < speed && d == -1){
     i = a;
   }
   alpha = a + (i * d);
   tt.style.opacity = alpha * .01;
   tt.style.filter = 'alpha(opacity=' + alpha + ')';
  }else{
    clearInterval(tt.timer);
     if(d == -1){tt.style.display = 'none'}
  }
 },
 hide:function(){
   if(tt != null) {
      clearInterval(tt.timer);
     tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
   }
  }
 };
}();

function drawLegend()
{
  var legendCircles = [1, 2, 4, 6];
  var legendText = ["Goalkeeper", "Defender", "Midfield", "Attacker", "More Passes", "Fewer Passes"];
  var legendSpacing = 70;
  
  var legend = d3.select("#chart").selectAll("svg").append("g");
  
  legend.selectAll("circle")
    .data(legendCircles).enter().append("circle")
    .attr("cx", function(d,i) { return leftAxisPadding + 25 + i  * legendSpacing;})
	.attr("cy", visHeight - bottomPadding + 25)
	.attr("r", 10)
	.attr("fill", function(d) {
	  return myColour(""+d+"");
	});
	
  legend.append("circle")
    .attr("cx", function(d,i) { return leftAxisPadding + 25 + 4  * legendSpacing;})
	.attr("cy", visHeight - bottomPadding + 25)
	.attr("r", 15)
	.attr("fill", "#e3e3e3");
	
      legend.append("circle")
    .attr("cx", function(d,i) { return leftAxisPadding + 25 + 5  * legendSpacing;})
	.attr("cy", visHeight - bottomPadding + 25)
	.attr("r", 5)
	.attr("fill", "#e3e3e3");
	
  legend.selectAll("text")
    .data(legendText).enter().append("text")
	.text(function(d) { return d;})
	.attr("x", function(d,i) { return leftAxisPadding + 25 + 15 + i * legendSpacing;})
	.attr("y", visHeight - bottomPadding + 25)
	.style("font-size", "8px")
	.style("dominant-baseline", "middle");
}

// =================
// STEPPER
// =================

// Stepper data
var stepperTitles = [
  "Introduction",
  "Oddballs",
  "Positions",
  "Team"
  ];
var stepperText = [
  "<p>This chart shows the passing tendency of players in the English Premier League (football) in the 2011-12 season.</p><p>The positions are immediately obvious. Goalkeepers only pass forwards, and attackers struggle to find someone downfield to pass to.</p><p>Midfielders pass more, attackers pass less</p>",
  "<p>We can see the players who are different from their peers. Why do these players have different passing tendencies than others in the same position? Are these players playing their position better than others? Worse? Just differently? Can we learn something material about a player's style from their unusual passing tendency?</p><p>This is a good example of outlier detection, something that Data Visualisation enables.</p>",
  "<p>Goalkeepers appear to be slightly biased towards the left-hand side. A bias that doesn't seem to show in other positions. Is this right-footedness showing through?</p><p>The defenders make a curious arc shape. It seems the wide defenders have more opportunity to pass backwards. Could central defense utilise their keeper more often?</p>",  
  "<p>Slice by team to find your favourite player, or look for interesting patterns in a given team.</p>"
  ];

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

var playersToHighlight = [
  "Reid, Steven",
  "Frei, Kerim",
  "Ward, Stephen",
  "Kevin Davies",
  "Stam, Ronnie",
  "Lennon, Aaron",
  "Song, Alexandre"
  ];


function clearSteps()
{
  var highlightCircles = circles.select(function(d) {
	 for(i=0; i<playersToHighlight.length; i++)
	 {
	   if(d.playerName == playersToHighlight[i])
	   {
		 return this;
	   }
	 }
	 return null;
  })
  .attr("stroke", "#ff0000")
  .attr("stroke-width", "0px");
}

function clearTeam()
{
  var selector = document.getElementById("teamSelect");
  if(selector.value != "(none)")
  {
    selector.value = "(none)";
    selector.onchange();
  }
}
  
function loadStep(stepNum)
{

  updateStepCrumbs(stepNum);

  if (stepNum == 1)
  {
    clearTeam();
    clearSteps();
  }
  else if (stepNum == 2)
  {
    clearTeam();
    clearSteps();
    var highlightCircles = circles.select(function(d) {
	   for(i=0; i<playersToHighlight.length; i++)
	   {
	     if(d.playerName == playersToHighlight[i])
		 {
		   return this;
		 }
	   }
	   return null;
    });
	
  highlightCircles
	.attr("stroke", "#ff0000")
	.attr("stroke-width", "0px")
	.transition()
	  .attr("r", function(d) {return 2*rScale(d.total);})
      .attr("stroke-width", "6px")
	  .duration(2000);
  highlightCircles
	//.style("fill-opacity", 1)
	.transition()
	  .attr("r", function(d) {return rScale(d.total);})
	  .attr("stroke-width", "1px")
	  .duration(2000)
	  .delay(2000);
  }
  else if (stepNum == 3)
  {
    clearTeam();
    clearSteps();
  }
  else if (stepNum == 4)
  {
    clearTeam();
    clearSteps();
    var selector = document.getElementById("teamSelect");
	selector.value = "Arsenal";
	selector.onchange();
  }
  
  document.getElementById("stepperTitle").innerHTML = stepperTitles[stepNum-1];
  document.getElementById("stepperText").innerHTML = stepperText[stepNum-1];
  
  currentStep = stepNum;
}