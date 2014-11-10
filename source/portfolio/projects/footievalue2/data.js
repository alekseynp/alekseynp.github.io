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

var poundsFormat = d3.format(".2f");
var poundsFormat2 = d3.format(".0f");

var chartSpacing = 325;

var svg = d3.select("#chart").append("svg")
    .attr("width", 700)
    .attr("height", 455);	
	
var chart = svg.append("g")
  .attr("transform", "translate(" + [50,35] + ")");


var chart2 = svg.append("g")
  .attr("transform", "translate(" + [50 + chartSpacing, 35] + ")");

var chart2y1 = d3.scale.linear().range([0,380]).domain([0.15,0.96]);
var chart2y2 = d3.scale.linear().range([0,380]).domain([1.58,13.56]);
  
var rankLineSpacing = 20;

var nest;


d3.csv("projects/footievalue2/goals_wins.csv", function(csv) {
  
  // Calculate ratios
  for(var i = 0; i < csv.length; i++)
  {
    if(+csv[i]["goalsPerGame"] > 0)
	  csv[i]["poundsPerGoalPerGame"] = +csv[i]["cheapestMatchDayTicket"] / +csv[i]["goalsPerGame"];
	else
	  csv[i]["poundsPerGoalPerGame"] = "-";
	  
	if(+csv[i]["winsPerGame"] > 0)
	  csv[i]["poundsPerWinPerGame"] = +csv[i]["cheapestMatchDayTicket"] / +csv[i]["winsPerGame"];
	else
	  csv[i]["poundsPerWinPerGame"] = "-"; 
  }
  
  // Nest by League
  nest = d3.nest()
    .key(function(d) { return d.League;})
	.entries(csv);
	
  // Do rankings by league
  for(var i = 0; i < nest.length; i++)
  {
    nest[i].values.sort(function(a,b){
	  if(a["poundsPerGoalPerGame"] == "-")
        return 1;
	  if(b["poundsPerGoalPerGame"] == "-")
	    return -1;
	  return +a["poundsPerGoalPerGame"] - b["poundsPerGoalPerGame"];
	});
	for(var j = 0; j < nest[i].values.length; j++)
	  nest[i].values[j]["rankPoundsPerGoalPerGame"] = j + 1;
	  
	nest[i].values.sort(function(a,b){
	  if(a["poundsPerWinPerGame"] == "-")
        return 1;
	  if(b["poundsPerWinPerGame"] == "-")
        return -1;
	  return +a["poundsPerWinPerGame"] - b["poundsPerWinPerGame"];
	});
	for(var j = 0; j < nest[i].values.length; j++)
	  nest[i].values[j]["rankPoundsPerWinPerGame"] = j + 1;
  }
    
  d3.select("#leagueSelect").selectAll("option")
    .data(nest).enter()
    .append("option")
      .attr("value", function(d,i) {return i;})
	  .text(function(d) {return d.key;});
  
  drawData(0);
  
  var chart1Labels = [
    {x: 0, y: -21, text:"Cost per", "text-anchor":"start"},
    {x: 0, y: -10, text:"goal", "text-anchor":"start"},
    {x: 150, y: -21, text:"Cost per", "text-anchor":"end"},
    {x: 150, y: -10, text:"win", "text-anchor":"end"}
  ];
  
  chart.selectAll("text.labels").data(chart1Labels).enter()
    .append("text")
	.attr("x", function(d) {return d.x;})
	.attr("y", function(d) {return d.y;})
	.text(function(d) {return d.text;})
	.style("fill", "#999")
	.style("font-size", "10px")
	.style("text-anchor", function(d) {return d["text-anchor"];});	
	
  var chart2Labels = [
    {x: 0, y: -21, text:"Cost per", "text-anchor":"start"},
	{x: 0, y: -10, text:"goal", "text-anchor":"start"},
	{x: 150, y: -21, text:"Cost per", "text-anchor":"end"},
	{x: 150, y: -10, text:"win", "text-anchor":"end"},
	{x: -30, y: -10, text:"£/goal", "text-anchor":"end"},
	{x: 180, y: -10, text:"£/win", "text-anchor":"start"}
  ];

  chart2.selectAll("text.labels").data(chart2Labels).enter()
    .append("text")
	.attr("x", function(d) {return d.x;})
	.attr("y", function(d) {return d.y;})
	.text(function(d) {return d.text;})
	.style("fill", "#999")
	.style("font-size", "10px")
	.style("text-anchor", function(d) {return d["text-anchor"];});
	
  chart.append("text")
    .text("Rank")
	.attr("x", -20)
	.attr("y", 0)
	.style("fill", "#999")
	.style("font-size", "10px")
	.style("text-anchor", "end");
});


function drawData(NESTENTRY)
{
  chart.selectAll("g").remove();
  chart.selectAll("text.ranks").remove();
  chart2.selectAll("text.y1ticks").remove();
  chart2.selectAll("text.y2ticks").remove();


  rankLineSpacing = (380) / (nest[NESTENTRY].values.length - 1);
  chart2y1.domain([d3.min(nest[NESTENTRY].values, function(d){return d.poundsPerGoalPerGame;}), d3.max(nest[NESTENTRY].values, function(d){return d.poundsPerGoalPerGame;})]);
  chart2y2.domain([d3.min(nest[NESTENTRY].values, function(d){return d.poundsPerWinPerGame;}), d3.max(nest[NESTENTRY].values, function(d){return d.poundsPerWinPerGame;})]);
  
  var groups = chart.selectAll("g").data(nest[NESTENTRY].values).enter()
    .append("g")
	  .on("mouseover", function(d){
	    d3.select(this).selectAll("line.visible").style("stroke", "#f00");
		d3.select(this).selectAll("line.visible").style("stroke-width", "3px");
		d3.select(this).selectAll("text").style("fill", "#000");

		var toolTipText = "";
		toolTipText += "<strong>" + d.Club + "</strong>";
		toolTipText += "<br>Cost of ticket: £" + d.cheapestMatchDayTicket;		
		toolTipText += "<br><u>Cost Per Goal</u>";
		toolTipText += "<br>&#160;&#160;&#160;&#160;Rank: " + d.rankPoundsPerGoalPerGame;
		toolTipText += "<br>&#160;&#160;&#160;&#160;Goals per game: " + d.goalsPerGame;
		toolTipText += "<br>&#160;&#160;&#160;&#160;Ticket cost per goal: £" + (d.poundsPerGoalPerGame == "-" ? "-" : poundsFormat(d.poundsPerGoalPerGame));
		toolTipText += "<br><u>Cost Per Win</u>";
		toolTipText += "<br>&#160;&#160;&#160;&#160;Rank: " + d.rankPoundsPerWinPerGame;
		toolTipText += "<br>&#160;&#160;&#160;&#160;Wins per game: " + d.winsPerGame;
		toolTipText += "<br>&#160;&#160;&#160;&#160;Ticket cost per win: £" + (d.poundsPerWinPerGame == "-" ? "-" : poundsFormat(d.poundsPerWinPerGame));	
		
		tooltip.show(toolTipText);
	  })
      .on("mouseout", function(){
	    d3.select(this).selectAll("line.visible").style("stroke", "#000");
		d3.select(this).selectAll("line.visible").style("stroke-width", "1.5px");
		d3.select(this).selectAll("text").style("fill", "#999");
		tooltip.hide();
	  });
	  
  groups.append("line")
	  .attr("class", "visible")
	  .attr("x1", 0)
	  .attr("y1", function(d) {return (d.rankPoundsPerGoalPerGame-1)*rankLineSpacing;})
	  .attr("x2", 150)
	  .attr("y2", function(d) {return (d.rankPoundsPerWinPerGame-1)*rankLineSpacing;})
	  .style("stroke", "#000")
	  .style("stroke-width", "1.5px");
	  
  groups.append("line")
	  .attr("class", "invisible")
	  .attr("x1", 0)
	  .attr("y1", function(d) {return (d.rankPoundsPerGoalPerGame-1)*rankLineSpacing;})
	  .attr("x2", 150)
	  .attr("y2", function(d) {return (d.rankPoundsPerWinPerGame-1)*rankLineSpacing;})
	  .style("stroke", "#000")
	  .style("stroke-opacity", 0)
	  .style("stroke-width", "10px");	
	  	
  groups.append("line")
    .attr("class", "visible")
    .attr("x1", chartSpacing)
	.attr("x2", chartSpacing + 150)
	.attr("y1", function(d) {return d.poundsPerGoalPerGame == "-" ? chart2y1.range()[1] : chart2y1(d.poundsPerGoalPerGame);})
	.attr("y2", function(d) {return d.poundsPerWinPerGame == "-" ? chart2y2.range()[1] : chart2y2(d.poundsPerWinPerGame);})
	.style("stroke", "#000")
	.style("stroke-width", "1.5px");
	
  groups.append("line")
    .attr("class", "invisible")
    .attr("x1", chartSpacing)
	.attr("x2", chartSpacing + 150)
	.attr("y1", function(d) {return d.poundsPerGoalPerGame == "-" ? chart2y1.range()[1] : chart2y1(d.poundsPerGoalPerGame);})
	.attr("y2", function(d) {return d.poundsPerWinPerGame == "-" ? chart2y2.range()[1] : chart2y2(d.poundsPerWinPerGame);})
	.style("stroke", "#000")
	.style("stroke-opacity", 0)
	.style("stroke-width", "10px");
	
  groups.append("text")
	  .text(function(d) {return d.Club;})
	  .attr("x", 155)
	  .attr("y", function(d) {return (d.rankPoundsPerWinPerGame-1)*rankLineSpacing;})
	  .style("fill", "#999")
	  .style("font-size", "10px");

  var ranks = [];
  for(var i = 0; i < nest[NESTENTRY].values.length; i++)
    ranks.push(i+1);
  
  chart.selectAll("text.ranks").data(ranks).enter()
    .append("text")
	.attr("class", "ranks")
	.text(function(d){return d;})
	.attr("x", -5)
	.attr("y", function(d){return (d-1)*rankLineSpacing + 3;})
	.style("text-anchor", "end")
	.style("font-size", "10px")
	.style("fill", "#999");
		
  var y1Ticks = [];
  var y2Ticks = [];
  for(i = 0; i < 5; i++)
  {
    y1Ticks.push(i*((chart2y1.domain()[1]-chart2y1.domain()[0])/(5-1))+chart2y1.domain()[0]);
    y2Ticks.push(i*((chart2y2.domain()[1]-chart2y2.domain()[0])/(5-1))+chart2y2.domain()[0]);
  }
  
  chart2.selectAll("text.y1ticks")
    .data(y1Ticks).enter()
	.append("text")
	.attr("class", "y1ticks")
	.text(function(d) { return poundsFormat2(d);})
	.attr("x", -5)
	.attr("y", function(d) {return chart2y1(d);})
	.style("fill", "#999")
	.style("font-size", "10px")
	.style("text-anchor", "end");
	
  chart2.selectAll("text.y2ticks")
    .data(y2Ticks).enter()
	.append("text")
	.attr("class", "y2ticks")
	.text(function(d) { return poundsFormat2(d);})
	.attr("x", 155)
	.attr("y", function(d) {return chart2y2(d);})
	.style("fill", "#999")
	.style("font-size", "10px")
	.style("text-anchor", "start");
}


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