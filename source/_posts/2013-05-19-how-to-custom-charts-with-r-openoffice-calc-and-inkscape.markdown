---
author: admin
comments: true
date: 2013-05-19 15:46:31+00:00
layout: post
slug: how-to-custom-charts-with-r-openoffice-calc-and-inkscape
title: 'How to: Custom charts with R, OpenOffice Calc, and Inkscape'
wordpress_id: 395
categories:
- How To
tags:
- how to
- Inkscape
- R
---

In my recent posts analysing the Ontario Public Sector Salary Disclosure, I produced several visuals and I thought I would share how I did it. Custom, high quality, effective, professional, clean, stylish visuals can be difficult to wrestle out of standard analytical software, so here's some guidance on how-to.



<table width="500" ><tr >
<td style="vertical-align:top;" >
[![pathologistsovertime](http://54.214.234.254/wp-content/uploads/2013/05/pathologistsovertime.png)](http://54.214.234.254/wp-content/uploads/2013/05/pathologistsovertime.png)

</td>
<td style="vertical-align:top;" >
[![top4000_raise_2012](http://54.214.234.254/wp-content/uploads/2013/05/top4000_raise_2012.png)](http://54.214.234.254/wp-content/uploads/2013/05/top4000_raise_2012.png)

</td>
<td style="vertical-align:top;" >
[![graphv2](http://54.214.234.254/wp-content/uploads/2013/04/graphv2.png)](http://54.214.234.254/wp-content/uploads/2013/04/graphv2.png)

</td></tr></table>




I used all open source tools:


  * [R](http://www.r-project.org/) – Open source statistical analysis and charting software


  * [OpenOffice Calc](www.openoffice.org) – Open source alternative to Excel


  * [Inkscape](inkscape.org) – Open source alternative to Adobe Illustrator





The process was:


  1. Data Gathering and Analysis – a deep topic for another post


  2. CSV as a bridge between analysis tools and charting tools


  3. R or Calc to generate base chart


  4. Inkscape to clean up





**Charts with R and Inkscape**





**Chart 1: Average Pathologist Salary by List Ranking**  

[![pathologistsovertime](http://54.214.234.254/wp-content/uploads/2013/05/pathologistsovertime.png)](http://54.214.234.254/wp-content/uploads/2013/05/pathologistsovertime.png)






1. Data Gathering and Analysis – was an extensive task undertaken with C# and a topic for another post





2. CSV - In order to bridge from the analysis tool to the charting application (R), I used a simple flat file. If the analysis were done in R, this would obviously not be necessary.  

[![csv_image](http://54.214.234.254/wp-content/uploads/2013/05/csv_image.png)](http://54.214.234.254/wp-content/uploads/2013/05/csv_image.png)





3. R - Load the CSV into R and produce the base chart with the following code. See in-line comments for detail on how it works.




    
    <span style="color: #666666; font-style: italic;"># Clear all existing variables from memory</span>
    <a href="http://inside-r.org/r-doc/base/rm"><span style="color: #003399; font-weight: bold;">rm</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/list"><span style="color: #003399; font-weight: bold;">list</span></a>=<a href="http://inside-r.org/r-doc/base/ls"><span style="color: #003399; font-weight: bold;">ls</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
     
    <span style="color: #666666; font-style: italic;"># Set working directory for the csv file</span>
    <a href="http://inside-r.org/r-doc/base/setwd"><span style="color: #003399; font-weight: bold;">setwd</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"C:<span style="color: #000099; font-weight: bold;">\</span>Users<span style="color: #000099; font-weight: bold;">\</span>Aleksey<span style="color: #000099; font-weight: bold;">\</span>Documents<span style="color: #000099; font-weight: bold;">\</span>Data Journalism<span style="color: #000099; font-weight: bold;">\</span>c#<span style="color: #000099; font-weight: bold;">\</span>salaryDisclosure"</span><span style="color: #009900;">)</span>
     
    <span style="color: #666666; font-style: italic;"># load the csv file</span>
    <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a> <span style=""><-</span> <a href="http://inside-r.org/r-doc/utils/read.csv"><span style="color: #003399; font-weight: bold;">read.csv</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"rankRaiseAalysis.csv"</span><span style="color: #339933;">,</span> header=<span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #339933;">,</span> sep=<span style="color: #0000ff;">","</span><span style="color: #339933;">,</span> as.is=<span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #009900;">)</span>
     
    <span style="color: #666666; font-style: italic;"># take a subest of the data, only the top some</span>
    lessData <span style=""><-</span> <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #009900;">[</span><span style="color: #cc66cc;">1</span><span style="">:</span><span style="color: #cc66cc;">4000</span><span style="color: #339933;">,</span><span style="color: #009900;">]</span>
     
    <span style="color: #666666; font-style: italic;"># x axis is rank</span>
    x <span style=""><-</span> lessData<span style="">$</span>rank
     
    <span style="color: #666666; font-style: italic;"># set up the grid for the graphs</span>
    <span style="color: #666666; font-style: italic;"># mfrom (4,4) defines 4 x 4 grid</span>
    <span style="color: #666666; font-style: italic;"># mar defines margins, bottom, left, top, right</span>
    <span style="color: #666666; font-style: italic;"># mgp moves the axis labels around and is currently redundant</span>
    <a href="http://inside-r.org/r-doc/graphics/par"><span style="color: #003399; font-weight: bold;">par</span></a><span style="color: #009900;">(</span>mfrow = <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">4</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">4</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/packages/cran/mAr"><span style="">mar</span></a> = <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0.1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.5</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.5</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
     
     
    <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #009900;">(</span>i <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #cc66cc;">1998</span><span style="">:</span><span style="color: #cc66cc;">2013</span><span style="color: #009900;">)</span>
    <span style="color: #009900;">{</span>
      <span style="color: #666666; font-style: italic;"># for whatever reason R doesn't do sensible string concatenation</span>
      <span style="color: #666666; font-style: italic;"># this adds X to i to get the string for fetching the variable from the dataframe</span>
      y <span style=""><-</span> paste0<span style="color: #009900;">(</span><span style="color: #0000ff;">"X"</span><span style="color: #339933;">,</span>i<span style="color: #009900;">)</span>
      <a href="http://inside-r.org/r-doc/graphics/plot"><span style="color: #003399; font-weight: bold;">plot</span></a><span style="color: #009900;">(</span>x<span style="color: #339933;">,</span> lessData<span style="color: #009900;">[</span><span style="color: #339933;">,</span>y<span style="color: #009900;">]</span><span style="">*</span><span style="color: #cc66cc;">100</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># also mutiply by 100 to get % values</span>
           type=<span style="color: #0000ff;">"h"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># histogram</span>
           ylim=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">20</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># y-axis limits min 0, max 20</span>
           main=i<span style="">-</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># this is the chart title</span>
           ylab=<span style="color: #0000ff;">""</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no y axis lavels </span>
           xlab=<span style="color: #0000ff;">""</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no x axis labels</span>
           xaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># suppress x axis</span>
           yaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># suppress y axis</span>
           xaxs=<span style="color: #0000ff;">"i"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no margin within the plotting frame to the left or right</span>
           yaxs=<span style="color: #0000ff;">"i"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># similarly</span>
           <a href="http://inside-r.org/r-doc/base/col"><span style="color: #003399; font-weight: bold;">col</span></a>=<span style="color: #0000ff;">"#550000"</span> <span style="color: #666666; font-style: italic;"># plotting colour</span>
           <span style="color: #009900;">)</span>
    <span style="color: #009900;">}</span>
     
    <span style="color: #666666; font-style: italic;"># for the next plot, we don't want the 4x4 grid, so set it back to 1x1</span>
    <a href="http://inside-r.org/r-doc/graphics/par"><span style="color: #003399; font-weight: bold;">par</span></a><span style="color: #009900;">(</span>mfrow=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/packages/cran/mAr"><span style="">mar</span></a>=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">3</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">3</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">3</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">3</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1.5</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.5</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
     
    <a href="http://inside-r.org/r-doc/graphics/plot"><span style="color: #003399; font-weight: bold;">plot</span></a><span style="color: #009900;">(</span>x<span style="color: #339933;">,</span> lessData<span style="">$</span>X2013<span style="">*</span><span style="color: #cc66cc;">100</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># plot only 2013 in this chart, multiply by 100 to get % values</span>
         type=<span style="color: #0000ff;">"h"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;">#histogram</span>
         ylim=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">20</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># y-axis goes from 0 to 20</span>
         ylab=<span style="color: #0000ff;">""</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no y axis labels</span>
         yaxs=<span style="color: #0000ff;">"i"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no margin within the plotting frame to the top or bottom</span>
         yaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># suppress y axis</span>
         xlim=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">4000</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># x-axis goes from 0 to 4000</span>
         xlab=<span style="color: #0000ff;">""</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no x axis labels</span>
         xaxs=<span style="color: #0000ff;">"i"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># no margin within the plotting frame to the left or right</span>
         xaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># suppress the x-axis</span>
         main=<span style="color: #0000ff;">"Year 2012 % Salary Growth For Top 4000 on Sunshine List"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;">#title</span>
         <a href="http://inside-r.org/r-doc/base/col"><span style="color: #003399; font-weight: bold;">col</span></a>=<span style="color: #0000ff;">"#D45500"</span><span style="color: #009900;">)</span>
     
    <span style="color: #666666; font-style: italic;"># add our own axis title</span>
    <a href="http://inside-r.org/r-doc/graphics/title"><span style="color: #003399; font-weight: bold;">title</span></a><span style="color: #009900;">(</span>xlab=<span style="color: #0000ff;">"Rank"</span><span style="color: #339933;">,</span>
          cex.lab = <span style="color: #cc66cc;">1</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># size</span>
     
    <span style="color: #666666; font-style: italic;"># add a custom x-axis</span>
    <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># 1 = at the bottom</span>
         at=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">3000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">4000</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># vector of value locations for the ticks</span>
         <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">3000</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">4000</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># vector of labels for those ticks</span>
     
    <span style="color: #666666; font-style: italic;"># add a custom y-axis</span>
    <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># 2 = y axis</span>
         at=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">10</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">20</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># vector of value ocations for the ticks</span>
         <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"0"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"10"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"20"</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># vector of labels for those ticks</span>
         cex.lab=<span style="color: #cc66cc;">0.5</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># size</span>

[Created by Pretty R at inside-R.org](http://www.inside-r.org/pretty-r)





The following chart is generated by R and can be exported to SVG for loading into Inkscape.  

[![Rplot](http://54.214.234.254/wp-content/uploads/2013/05/Rplot.png)](http://54.214.234.254/wp-content/uploads/2013/05/Rplot.png)





4. Inkscape





Open the file in Inkscape, ungroup the elements and start cleaning:  



  * Colourise


  * Add legends and labels


  * Removal of excess ink for a cleaner look


    * No Y or X axis- lines, these can be visually implied by the ticks


    * No plotting area border, again visually implied by the other elements


  * Better Y and X axis ticks and labels


  * Required extensive use of the object align and distribute features



  
  
  




**Chart 2 – Salary Growth at top of “Sunshine List”**  

[![top4000_raise_2012](http://54.214.234.254/wp-content/uploads/2013/05/top4000_raise_2012.png)](http://54.214.234.254/wp-content/uploads/2013/05/top4000_raise_2012.png)






1. Data Gathering and Analysis – was an extensive task undertaken with C# and a topic for another post





2. CSV - In order to bridge from the analysis tool to the charting application (R), I used a simple flat file. If the analysis were done in R, this would obviously not be necessary.  

[![csv_image2](http://54.214.234.254/wp-content/uploads/2013/05/csv_image2.png)](http://54.214.234.254/wp-content/uploads/2013/05/csv_image2.png)





3. R





Load the CSV into R and produce the base chart with the following code. See in-line comments for detail on how it works.




    
    <span style="color: #666666; font-style: italic;"># Clear all existing variables from memory</span>
    <a href="http://inside-r.org/r-doc/base/rm"><span style="color: #003399; font-weight: bold;">rm</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/list"><span style="color: #003399; font-weight: bold;">list</span></a>=<a href="http://inside-r.org/r-doc/base/ls"><span style="color: #003399; font-weight: bold;">ls</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
     
    <span style="color: #666666; font-style: italic;"># Set working directory for the csv file</span>
    <a href="http://inside-r.org/r-doc/base/setwd"><span style="color: #003399; font-weight: bold;">setwd</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"C:<span style="color: #000099; font-weight: bold;">\</span>Users<span style="color: #000099; font-weight: bold;">\</span>Aleksey<span style="color: #000099; font-weight: bold;">\</span>Documents<span style="color: #000099; font-weight: bold;">\</span>Data Viz<span style="color: #000099; font-weight: bold;">\</span>blogging<span style="color: #000099; font-weight: bold;">\</span>017 - Pathologists follow-up"</span><span style="color: #009900;">)</span>
     
    <span style="color: #666666; font-style: italic;"># load the csv file</span>
    <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a> <span style=""><-</span> <a href="http://inside-r.org/r-doc/utils/read.csv"><span style="color: #003399; font-weight: bold;">read.csv</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"newPathologists.csv"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># csv file</span>
                     header=<span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># varaible names are at the top</span>
                     sep=<span style="color: #0000ff;">","</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># it's commas, it's a csv</span>
                     as.is=<span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #009900;">)</span>
     
    <span style="color: #666666; font-style: italic;"># build a plot with the firs tseries of data against year</span>
    <a href="http://inside-r.org/r-doc/graphics/plot"><span style="color: #003399; font-weight: bold;">plot</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="">$</span>year<span style="color: #339933;">,</span> <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="">$</span>X1.to.25<span style="color: #339933;">,</span>
         type=<span style="color: #0000ff;">"l"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># makes a line plot</span>
         ylim=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">450000</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># sets the range for the y axis</span>
         xaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># supresses the x-axis for customisation later</span>
         lwd=<span style="color: #cc66cc;">3</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># sets the line width</span>
     
    <span style="color: #666666; font-style: italic;"># build our own custom x axis </span>
    <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># puts it at the bottom</span>
         at=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1997</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2002</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2007</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2012</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># position for the ticks</span>
         <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1997</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2002</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2007</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2012</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># labels for those ticks</span>
     
    <span style="color: #666666; font-style: italic;"># use a for loop for the rest of the data, the other 7 series</span>
    <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #009900;">(</span>i <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #cc66cc;">1</span><span style="">:</span><span style="color: #cc66cc;">7</span><span style="color: #009900;">)</span>
    <span style="color: #009900;">{</span>
      <span style="color: #666666; font-style: italic;"># below is my ridiculous solution for string manipulation in R</span>
      <span style="color: #666666; font-style: italic;"># in order to turn 1, 2, 3... into the names of my variables</span>
      y <span style=""><-</span> paste0<span style="color: #009900;">(</span><span style="color: #0000ff;">"X"</span><span style="color: #339933;">,</span>paste0<span style="color: #009900;">(</span><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="">+</span><span style="color: #cc66cc;">25</span><span style="">*</span>i<span style="color: #009900;">)</span><span style="color: #339933;">,</span>paste0<span style="color: #009900;">(</span><span style="color: #0000ff;">".to."</span><span style="color: #339933;">,</span><span style="color: #009900;">(</span><span style="color: #cc66cc;">25</span><span style="">+</span><span style="color: #cc66cc;">25</span><span style="">*</span>i<span style="color: #009900;">)</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
     
      <span style="color: #666666; font-style: italic;"># the lines command adds lines to an existing plot</span>
      <a href="http://inside-r.org/r-doc/graphics/lines"><span style="color: #003399; font-weight: bold;">lines</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="">$</span>year<span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># x is still year</span>
            <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #009900;">[</span><span style="color: #339933;">,</span>y<span style="color: #009900;">]</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># having built y as a string i.e. "X25.to.50", you can refernce it this way</span>
            lwd=<span style="color: #009900;">(</span><span style="color: #cc66cc;">3</span><span style="">-</span><span style="color: #cc66cc;">2</span><span style="">*</span><span style="color: #009900;">(</span>i<span style="">/</span><span style="color: #cc66cc;">7</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># a little function for line width that makes later series thinner</span>
    <span style="color: #009900;">}</span>

[Created by Pretty R at inside-R.org](http://www.inside-r.org/pretty-r)





The following two charts are generated by R and can be exported to SVG for loading into Inkscape.  

[![rankraise part1](http://54.214.234.254/wp-content/uploads/2013/05/rankraise-part1.png)](http://54.214.234.254/wp-content/uploads/2013/05/rankraise-part1.png)  

[![rankraise part2](http://54.214.234.254/wp-content/uploads/2013/05/rankraise-part2.png)](http://54.214.234.254/wp-content/uploads/2013/05/rankraise-part2.png)





4. Inkscape





  * Open the file in Inkscape, ungroup the elements and start cleaning:


  * Customise colours


  * Better titles


  * Grey-out borders and labels to reduce chart clutter



  
  
  




**Chart with OpenOffice Calc and Inkscape**





**Chart 3 – Ontario “Sunshine List” Salary Growth**  

[![graphv2](http://54.214.234.254/wp-content/uploads/2013/04/graphv2.png)](http://54.214.234.254/wp-content/uploads/2013/04/graphv2.png)






1. Data Gathering and Analysis – was an extensive task undertaken with C# and a topic for another post





2. CSV





In order to bridge from the analysis tool to the charting application (R), I used a simple flat file. If the analysis were done in R, this would obviously not be necessary.





3. OpenOffice Calc





Load the CSV into Calc. Create the three bar charts.





4. Inkscape





  * Copy and paste from OpenOffice Calc into Inkscape.


  * Tear up everything, keeping only the bars.


  * Custom labelling, lines, row shading, etc.


  * Extensive use of align and distribute features.
