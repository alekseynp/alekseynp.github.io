---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2013-08-26 21:55:06+00:00
layout: post
slug: how-to-make-a-heat-map-with-hexagons-d3-js-hexbins-js-open-street-map-inkscape-and-paint-net
title: How to make a heat map with hexagons, D3.js, hexbins.js, Open Street Map, Inkscape,
  and Paint.NET
wordpress_id: 655
categories:
- How To
tags:
- D3.js
- d3js
- how to
---

In this post I will be showing how I made my map for the post, [Average age of Brooklyn's buildings mapped](http://alekseynp.github.io/2013/08/17/average-age-of-brooklyns-buildings-mapped/).

[![bk_r5_version4](http://alekseynp.github.io/wp-content/uploads/2013/08/bk_r5_version4-150x150.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/bk_r5_version4.png)

I did it with:



	
  * Completely open source tools

	
  * D3.js and hexbins.js to render in Firefox

	
  * Inkscape and Paint.NET for graphical editing

	
  * Open Street Map for the basemap


**Overall Technique**

The overall technique is based on using D3.js offline in the browser on a one-off basis to create a static visual that you will use elsewhere. I outline the technique here in my post, [Use D3.js on your desktop to publish static visualisations](http://alekseynp.github.io/2013/08/19/use-d3-js-on-your-desktop-to-publish-static-visualisations/)



**Get Data**

You can get the CSV I used [here](http://www.nyc.gov/html/dcp/html/bytes/dwn_pluto_mappluto.shtml). The hexbins.js doesn't do so well with missing values, so I cleaned out all of the records with missing values and re-saved the CSV. Additionally I removed most of the columns which are unnecessary and really bulk up the file.



**Creating the Heat for the Map**

First of all we're going to be using [D3.js](http://d3js.org/) along with [hexbins.js](https://github.com/indiemaps/hexbin-js). You can read a lot about hexbins.js [here](http://indiemaps.com/blog/2011/10/hexbins/).

    
    <code><code><span style="font-family: Consolas, Monaco, monospace;"><span style="line-height: 18px;"><script type="text/javascript" src="d3.v3.js"></script></span>
    </span></code><script src="hexbin.js"></script>
    </code>


Using D3.js as you normally would, and I'm not going to give a complete tutorial on that here...

The full code listing is at the bottom of this post.

First of all, add an SVG to the document. This is probably not the best way to manage widths, margins, etc., but remember this only has to work once and well enough, so elegance of code is not important. Below we have a chart that will be 1100 x 1100 with 50 padding around the outside.

    
    <code>var chartHeight = 1000;
    var chartWidth = 1000;
    
    var svg = d3.select("#chart").append("svg")
      .attr("height", chartHeight+100)
      .attr("width", chartWidth+100)
      .append("g")
        .attr("transform", "translate(50,50)");
    </code>


Now we create two scales to translate the XCoord and YCoord from the Brooklyn data into coordinates in our chart. We are translating 973045 to 0 and 1024202 to chartWidth which is 1000 and using a linear interpolation for x. Similarly for y. Note that this is possibly a HUGE MISTAKE when it comes to dealing with maps. If you're going to work with maps, then you may have to learn about projections. The fundamental thing here is that translating the 3D points on the surface of the earth to 2D points on the surface of a computer screen is not at all straightforward, and you will always have to use a projection of some sort. Here I am using a linear projection which can be fine, but if I combine this later with a basemap that isn't on a linear projection, big, visible errors could be introduced. In this case, the basemap is small enough that those errors aren't big and aren't visible, so it's not a big deal.

    
    <code>var x = d3.scale.linear()
      .range([0, chartWidth])
      .domain([973045,1024202]);
    
    var y = d3.scale.linear()
      .domain([146940, 208432])
      .range([chartHeight, 0]);
    </code>


Now we create the scale that we will be using to create the "heat" in the map. We will use this to control the opacity.  Here we are translating 1870 to 0 opacity and 2013 to 1.

    
    <code>  var opacity = d3.scale.linear()
        .domain([1870, 2013])
        .range([0,1]);    
    </code>


Now we use D3 to load the CSV data as usual. The code that follows later comes from the ellipses below.

    
    <code>d3.csv("bk-xybuild-nomissing.csv",function(data) {
    ...
    });
    </code>


Now we use hexbins.js for the first time. We create a new hexbin that is 1000 x 1000 where the hexagons have a "radius" of 30. We also teach the hexbin how to retrieve the x and y to use when we pass it the data. In this case we will give it values converted by the scales x() and y() that we created above that come from the CSV data.

    
    <code>  var hexbin = d3.hexbin()
        .size([chartWidth, chartHeight])
        .radius(30)
        .x(function(d) {return x(d.XCoord);})
        .y(function(d) {return y(d.YCoord);});
    </code>


Now we run the hexbin algorithm on our data. This will return an object that where every data point has been assigned to a hexagon.

    
    <code>  hexBinsData = hexbin(data);    
    </code>


Now we create a special function that we will use to calculate the average for each hexagon. It takes in d which is the array of data points assigned to the hexagon, and calculated the average of YearBuilt for that hexagon.

    
    <code>  var averageFunction = function(d) {
        var sum = 0;
        for(var i = 0; i < d.length; i++)
        {
          sum += +d[i].YearBuilt;
        }
        return sum/d.length;
      };
    </code>


Finally we do the very normal D3 thing of binding the hexBinsData to hexagon paths in the SVG. We give them a class of hexagon, a path as defined by hexbin.hexagon(), a transform to translate the hexagon by it's x and y coordinate, and a fill colour. Finally we also change the fill-opacity. We use the averageFunction to calculate the average YearBuilt for the hexagon, and then we convert it using our opacity scale to a value between 0 and 1.

    
    <code>  svg.selectAll(".hexagon")
        .data(hexBinsData).enter()
        .append("path")
          .attr("class", "hexagon")
          .attr("d", hexbin.hexagon())
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .style("fill", "#0000FF")
          .style("fill-opacity", function(d) { return opacity(averageFunction(d)); });
    </code>


The result should look something like this:

[![radius_5_400](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_5_400-150x150.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_5_400.png)



**Extract SVG from the Browser**

Use Firefox to copy and paste the SVG that is generated out of the browser, into a text editor, and save it off as an SVG file. I explain more here: [Use D3.js on your desktop to publish static visualisations](http://alekseynp.github.io/2013/08/19/use-d3-js-on-your-desktop-to-publish-static-visualisations/)



**Get a Basemap from Open Street Map**

Open Street Map is great. If you aren't aware of it, then you should be. I tell people it's like "Wikipedia, but for maps" which is accurate enough. I've used Open Street Map to navigate 20,000 km of driving through 7 countries in South America at the time of writing this post, so I can say it's pretty good.

With the heat we created above, we want to layer this on top of a map of Brooklyn.

Go to [http://www.openstreetmap.org](http://www.openstreetmap.org/) and click on the Share icon on the right-hand side.

[![share](http://alekseynp.github.io/wp-content/uploads/2013/08/share.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/share.png)

You will see a menu that allows you to export PNGs from Open Street Map. There are some practical limits to how much detail you are allowed to get based on how large an area you select, but in any case it should be sufficient to make a large-ish map. If not, maybe you'll have to piece together some pieces manually.

[![image](http://alekseynp.github.io/wp-content/uploads/2013/08/image.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/image.png)





**Convert SVG to PNG**

Since our OSM data is in PNG format, we'll want our heat to be as well. We could operate in SVG, but that can be very computer intensive with map data. Open the SVG in Inkscape and convert to a PNG.



**Combine with Paint.NET**

Not much to say here. I took the PNG from OSM, I black-and-white-ed it, then pasted in a layer on top the heat and adjusted it's position and size until it matched the data below. In this instance I was able to line up the water and green space with the data, as there was no BuildYear data for these places. For other data, lining up with the map would be more complicated.



**Done!**

264,534 data points aggregated onto one heatmap of Brooklyn all using free open source tools and nothing specialized for map-making



**Full JavaScript code listing:**

    
    <code>var chartHeight = 1000;
    var chartWidth = 1000;
    
    var svg = d3.select("#chart").append("svg")
      .attr("height", chartHeight+100)
      .attr("width", chartWidth+100)
      .append("g")
        .attr("transform", "translate(50,50)");
    
    var x = d3.scale.linear()
      .range([0, chartWidth])
      .domain([973045,1024202]);
    
    var y = d3.scale.linear()
      .domain([146940, 208432])
      .range([chartHeight, 0]);
    
    d3.csv("bk-xybuild-nomissing.csv",function(data) {
      var hexbin = d3.hexbin()
        .size([chartWidth, chartHeight])
        .radius(30)
      .x(function(d) {return x(d.XCoord);})
      .y(function(d) {return y(d.YCoord);});
    
      var opacity = d3.scale.linear()
        .domain([1870, 2013])
        .range([0,1]);  
    
      hexBinsData = hexbin(data);  
    
      var averageFunction = function(d) {
        var sum = 0;
      for(var i = 0; i < d.length; i++)
      {
        sum += +d[i].YearBuilt;
      }
      return sum/d.length;
      };
    
      svg.selectAll(".hexagon")
        .data(hexBinsData).enter()
      .append("path")
          .attr("class", "hexagon")
          .attr("d", hexbin.hexagon())
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .style("fill", "#0000FF")
          .style("fill-opacity", function(d) { return opacity(averageFunction(d)); });
    });
    </code>
