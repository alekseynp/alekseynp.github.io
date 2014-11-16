---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2013-07-16 01:34:41+00:00
layout: post
slug: how-i-made-the-sun-shines-fondly-on-ontario-university-presidents
title: 'How I made: The sun shines fondly on Ontario university presidents'
wordpress_id: 555
categories:
- How To
tags:
- how to
- Inkscape
- R
---

In this post I will share my R script that produce the visual from [The sun shines fondly on Ontario university presidents](http://alekseynp.com/2013/07/13/the-sun-shines-fondly-on-ontario-university-presidents/). The visual is a 10 x 3 grid of charts, what might be called small multiples. As you can see, the charts are time series, each with the same context-setting lines, and each with a unique series for a given university.**[
](http://alekseynp.com/wp-admin/post.php?post=546&action=edit)**

[![university presidents](http://alekseynp.com/wp-content/uploads/2013/07/university-presidents-391x1024.png)](http://alekseynp.com/wp-content/uploads/2013/07/university-presidents.png)

I used all open source tools:



	
  * [R](http://www.r-project.org/) – Open source statistical analysis and charting software

	
  * [Inkscape](inkscape.org) – Open source alternative to Adobe Illustrator


The process was:

	
  1. Data Gathering and Analysis – a deep topic for another post

	
  2. CSV as a bridge between analysis tools and charting tools

	
  3. R to generate base chart

	
  4. Inkscape to clean up


The R script generates an SVG that you can load and edit in Inkscape.







    
    <span style="color: #666666; font-style: italic;"># Clear all existing variables from memory</span>
    <a href="http://inside-r.org/r-doc/base/rm"><span style="color: #003399; font-weight: bold;">rm</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/list"><span style="color: #003399; font-weight: bold;">list</span></a>=<a href="http://inside-r.org/r-doc/base/ls"><span style="color: #003399; font-weight: bold;">ls</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Set working directory for the csv file and output file</span>
    <a href="http://inside-r.org/r-doc/base/setwd"><span style="color: #003399; font-weight: bold;">setwd</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"C:<span style="color: #000099; font-weight: bold;">\\</span>Users<span style="color: #000099; font-weight: bold;">\\</span>Aleksey<span style="color: #000099; font-weight: bold;">\\</span>Documents<span style="color: #000099; font-weight: bold;">\\</span>Data Journalism<span style="color: #000099; font-weight: bold;">\\</span>c#<span style="color: #000099; font-weight: bold;">\\</span>salaryDisclosure<span style="color: #000099; font-weight: bold;">\\</span>raceUniversity"</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># load the csv file</span>
    <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a> <span><-</span> <a href="http://inside-r.org/r-doc/utils/read.csv"><span style="color: #003399; font-weight: bold;">read.csv</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"forR.csv"</span><span style="color: #339933;">,</span> header=<span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #339933;">,</span> sep=<span style="color: #0000ff;">","</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># set the output type and size -- good for standardizing outputs</span>
    <span style="color: #666666; font-style: italic;"># this here creates an svg file that is 12 inches by 30 inches</span>
    <span style="color: #666666; font-style: italic;"># I know I know, what does inches mean? Well it's important to R</span>
    <span style="color: #666666; font-style: italic;"># for graphics. You can use the values for scaling</span>
    <a href="http://inside-r.org/r-doc/grDevices/svg"><span style="color: #003399; font-weight: bold;">svg</span></a><span style="color: #009900;">(</span>filename=<span style="color: #0000ff;">"output.svg"</span><span style="color: #339933;">,</span> width=<span style="color: #cc66cc;">12</span><span style="color: #339933;">,</span> height=<span style="color: #cc66cc;">30</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># set up the grid for the graphs</span>
    <span style="color: #666666; font-style: italic;"># mfrom (10,3) defines grid with 10 rows and 3 columns</span>
    <span style="color: #666666; font-style: italic;"># mar defines margins, bottom, left, top, right</span>
    <span style="color: #666666; font-style: italic;"># mgp moves the axis labels around and is currently redundant</span>
    <a href="http://inside-r.org/r-doc/graphics/par"><span style="color: #003399; font-weight: bold;">par</span></a><span style="color: #009900;">(</span>mfrow = <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">10</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">3</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/packages/cran/mAr"><span>mar</span></a> = <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">5</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># My data set has a row for each year, and a column for each</span>
    <span style="color: #666666; font-style: italic;"># university. The universities are the 30th through 58th columns</span>
    <span style="color: #666666; font-style: italic;"># The for loop will execute once for each value 30 to 58</span>
    <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #009900;">(</span>i <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #cc66cc;">30</span><span>:</span><span style="color: #cc66cc;">58</span><span style="color: #009900;">)</span>
    <span style="color: #009900;">{</span>
    
      <span style="color: #666666; font-style: italic;"># initial plot, x is year and y is data$x1, the series for 1st best paid</span>
      <a href="http://inside-r.org/r-doc/graphics/plot"><span style="color: #003399; font-weight: bold;">plot</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span>$</span>Year<span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span>$</span>X1<span style="color: #339933;">,</span>
         type=<span style="color: #0000ff;">"l"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># makes it a line chart</span>
         ylim=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">600000</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># sets the y axis limits</span>
         ylab=<span style="color: #0000ff;">""</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no y axis lavels </span>
         xlab=<span style="color: #0000ff;">""</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no x axis labels</span>
         xaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># suppress x axis</span>
         yaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># suppress y axis</span>
         xaxs=<span style="color: #0000ff;">"i"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no margin within the plotting frame to the left or right</span>
         yaxs=<span style="color: #0000ff;">"i"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># similarly</span>
         lwd=<span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># line width for the line</span>
         <a href="http://inside-r.org/r-doc/base/col"><span style="color: #003399; font-weight: bold;">col</span></a>=<span style="color: #0000ff;">"#999999"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># line color</span>
         <span style="color: #009900;">)</span>
    
      <span style="color: #666666; font-style: italic;"># add the line for the 10th best paid</span>
      <a href="http://inside-r.org/r-doc/graphics/lines"><span style="color: #003399; font-weight: bold;">lines</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span>$</span>Year<span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span>$</span>X10<span style="color: #339933;">,</span>
          lwd=<span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># line width for the line</span>
          <a href="http://inside-r.org/r-doc/base/col"><span style="color: #003399; font-weight: bold;">col</span></a>=<span style="color: #0000ff;">"#999999"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># line color</span>
          <span style="color: #009900;">)</span>
    
      <span style="color: #666666; font-style: italic;"># add a line for the minimum value</span>
      <a href="http://inside-r.org/r-doc/graphics/lines"><span style="color: #003399; font-weight: bold;">lines</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span>$</span>Year<span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span>$</span>MIN<span style="color: #339933;">,</span>
          lwd=<span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># line width</span>
          <a href="http://inside-r.org/r-doc/base/col"><span style="color: #003399; font-weight: bold;">col</span></a>=<span style="color: #0000ff;">"#999999"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># line color</span>
          <span style="color: #009900;">)</span>
    
      <span style="color: #666666; font-style: italic;"># add a custom x-axis</span>
      <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># 1 = at the bottom</span>
         at=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1997</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2002</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2007</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2013</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># vector of value locations for the ticks</span>
         <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1997</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2002</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2007</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2013</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># vector of labels for those ticks</span>
         lwd=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># width of the axis line, 0 makes it go away</span>
         lwd.ticks=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># width of the tick marks, 0 makes it go away</span>
         cex.axis=<span style="color: #cc66cc;">1.6</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># scales the size of the labels</span>
         mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span>
         <span style="color: #009900;">)</span> 
    
      <span style="color: #666666; font-style: italic;"># add a custom y-axis</span>
      <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># 2 = y axis</span>
         at=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">150000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">300000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">450000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">600000</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># vector of value ocations for the ticks</span>
         <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"0"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"150"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"300"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"450"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"600"</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># vector of labels for those ticks</span>
         las=<span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># labels are rotated so they read normally left to right</span>
         cex.axis=<span style="color: #cc66cc;">1.6</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># scales the size of the labels</span>
         bty=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span>
         lwd=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># width of the axis line, 0 makes it go away</span>
         lwd.ticks=<span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># width of the tick marks, 0 makes it go away</span>
         tck=<span>-</span><span style="color: #cc66cc;">0.02</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># tick length</span>
         mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.35</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span>
         hadj=<span style="color: #cc66cc;">1.1</span> <span style="color: #666666; font-style: italic;"># moves the labels left or right</span>
         <span style="color: #009900;">)</span> 
    
      <span style="color: #666666; font-style: italic;"># add the data series for this university</span>
      <a href="http://inside-r.org/r-doc/graphics/lines"><span style="color: #003399; font-weight: bold;">lines</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span>$</span>Year<span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># x is still year as before</span>
            <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #009900;">[</span><span style="color: #339933;">,</span>i<span style="color: #009900;">]</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># this references the ith column of the data</span>
            lwd=<span style="color: #cc66cc;">3</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># line width</span>
            <a href="http://inside-r.org/r-doc/base/col"><span style="color: #003399; font-weight: bold;">col</span></a>=<span style="color: #0000ff;">"#2222dd"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># line colour</span>
            <span style="color: #009900;">)</span>
    
      <span style="color: #666666; font-style: italic;"># add a title to the chart</span>
      <a href="http://inside-r.org/r-doc/graphics/mtext"><span style="color: #003399; font-weight: bold;">mtext</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/graphics/text"><span style="color: #003399; font-weight: bold;">text</span></a>=<a href="http://inside-r.org/r-doc/base/names"><span style="color: #003399; font-weight: bold;">names</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #009900;">)</span><span style="color: #009900;">[</span>i<span style="color: #009900;">]</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># this returns the name of the ith column</span>
            side = <span style="color: #cc66cc;">3</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># top</span>
            adj=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span>
            <a href="http://inside-r.org/r-doc/stats/line"><span style="color: #003399; font-weight: bold;">line</span></a>=<span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># moves it up and down</span>
            cex=<span style="color: #cc66cc;">1.5</span> <span style="color: #666666; font-style: italic;"># scales the size</span>
            <span style="color: #009900;">)</span>
    
    <span style="color: #009900;">}</span>
    
    <span style="color: #666666; font-style: italic;"># saves out the .svg for to disk in the working directory</span>
    <a href="http://inside-r.org/r-doc/grDevices/dev.off"><span style="color: #003399; font-weight: bold;">dev.off</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span><span style="color: #339933;">;</span>








[Created by Pretty R at inside-R.org](http://www.inside-r.org/pretty-r)
