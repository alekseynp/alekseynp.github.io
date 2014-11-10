---
author: admin
comments: true
date: 2013-07-28 17:11:41+00:00
layout: post
slug: how-to-add-a-table-of-values-to-a-boxplot-in-r
title: How to add a table of values to a boxplot in R
wordpress_id: 573
categories:
- How To
tags:
- how to
- R
---

In this post I show how to use R to create a nice boxplot chart with a table showing the boxplot statistics to one side.

As I have[ shown before](http://thinkdatavis.com/2013/06/05/how-to-make-nice-boxplots-with-r/), R can be used to produce nice-looking boxplots, a standard statistical technique that is not a standard chart available in the ubiquitous Microsoft Excel. Boxplots are a useful visualisation, but often your customer will also want to see a table of the values so that they can both see the trend and, for example, look up exact average values. If you try to create this table using Excel PivotTables, you will quickly be disappointed to see that it is not possible to calculate quartiles in a PivotTable. An Excel master will be able to create a bespoke set of formulas to filter the data and utilize the =Percentile() worksheet function, but there must be a better way... and there is.

Here is the demo output using R (click for larger):

[![demo](http://thinkdatavis.com/wp-content/uploads/2013/07/demo-300x120.png)](http://thinkdatavis.com/wp-content/uploads/2013/07/demo.png)

How to create this using R? See further below for my complete script.

Important script elements:







    
    m <span><-</span> <a href="http://inside-r.org/r-doc/base/rbind"><span style="color: #003399; font-weight: bold;">rbind</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    <a href="http://inside-r.org/r-doc/graphics/layout"><span style="color: #003399; font-weight: bold;">layout</span></a><span style="color: #009900;">(</span>m<span style="color: #009900;">)</span>








Rather than using par(mfrow(1,2)) which would create a 1 rows by 2 columns grid of equal size, we can use layout to create a layout with unequal sizes. Using c(1,1,1,2,2) above, we are able to make the size of the chart a 3:2 ratio to the table. If we wanted, we could use c(1,1,1,2) to create a 3:1 ratio.







    
    <span style="color: #666666; font-style: italic;"># initialize the arrays</span>
    <span style="color: #666666; font-style: italic;"># Creates a vector of 17 (there are 17 yeras) NAs that we will fill in later</span>
    means <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    mins <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    maxs <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    lowerq <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    upperq <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    <span style="color: #666666; font-style: italic;"># Creates a vectory of 1997, 1998, 1999,... 2013</span>
    <span style="color: #666666; font-style: italic;"># These are the years at the bottom of the boxplot</span>
    years <span><-</span> <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1997</span><span>:</span><span style="color: #cc66cc;">2013</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Perform this loop once for each value of i from 1997 to 2013</span>
    <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #009900;">(</span>i <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #cc66cc;">1997</span><span>:</span><span style="color: #cc66cc;">2013</span><span style="color: #009900;">)</span>
    <span style="color: #009900;">{</span>
      <span style="color: #666666; font-style: italic;"># Run the boxplot statistics for this year</span>
      boxstats <span><-</span> <a href="http://inside-r.org/r-doc/grDevices/boxplot.stats"><span style="color: #003399; font-weight: bold;">boxplot.stats</span></a><span style="color: #009900;">(</span>
        <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #009900;">[</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #009900;">[</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"year"</span><span style="color: #009900;">]</span><span>==</span>i<span style="color: #339933;">,</span><span style="color: #0000ff;">"price"</span><span style="color: #009900;">]</span><span style="color: #339933;">,</span>  <span style="color: #666666; font-style: italic;"># filters the data for only year that matches i</span>
        <a href="http://inside-r.org/r-doc/stats/coef"><span style="color: #003399; font-weight: bold;">coef</span></a> = <span style="color: #cc66cc;">1.5</span><span style="color: #339933;">,</span> do.conf = <span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #339933;">,</span> do.out = <span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #009900;">)</span>
      <span style="color: #666666; font-style: italic;"># Next 5 lines store the boxplot statistics into our arrays</span>
      <span style="color: #666666; font-style: italic;"># i-1996 trasforms 1997 to 2013 into 1 to 17, these are the indexes in our array</span>
      mins<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">1</span><span style="color: #009900;">]</span>
      lowerq<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">2</span><span style="color: #009900;">]</span>
      means<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">3</span><span style="color: #009900;">]</span>
      upperq<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">4</span><span style="color: #009900;">]</span>
      maxs<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">5</span><span style="color: #009900;">]</span>
    <span style="color: #009900;">}
    
    </span>





The code above utilizes the boxplot.stats() function and then pulls the actual values from the output for use later.











    
    <a href="http://inside-r.org/packages/cran/PerformanceAnalytics"><span>PerformanceAnalytics</span></a><span>:::</span>textplot<span style="color: #009900;">(</span>myBoxStats <span style="color: #666666; font-style: italic;">#data</span>
                                    <span style="color: #339933;">,</span>halign = <span style="color: #0000ff;">"left"</span> <span style="color: #666666; font-style: italic;">#horizontal alignment</span>
                                    <span style="color: #339933;">,</span>valign = <span style="color: #0000ff;">"top"</span> <span style="color: #666666; font-style: italic;">#vertical alignment</span>
                                    <span style="color: #339933;">,</span>row.valign=<span style="color: #0000ff;">"center"</span> <span style="color: #666666; font-style: italic;">#row alignment</span>
                                    <span style="color: #339933;">,</span><a href="http://inside-r.org/packages/cran/mAr"><span>mar</span></a> = <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.1</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;">#margin parameters</span>
                                    <span style="color: #339933;">,</span>show.rownames=<span style="color: #000000; font-weight: bold;">FALSE</span> <span style="color: #666666; font-style: italic;">#omit the record identifiers</span>
    <span style="color: #009900;">)</span>








Using the strangely named PerformanceAnalytics package, this command writes out a graphic table using the data.

Download the data [here ](https://docs.google.com/file/d/0B4hPSKdfKZm1OXcwWDVqZzJkYXM/edit?usp=sharing)if you want to see the script running live on your own computer. Remember to update the setwd at the top of the file to the directory where you saved the data to.

Here is the full script that creates a boxplot graph and includes a table of values to the right:







    
    <span style="color: #666666; font-style: italic;"># Clear all existing variables from memory</span>
    <a href="http://inside-r.org/r-doc/base/rm"><span style="color: #003399; font-weight: bold;">rm</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/list"><span style="color: #003399; font-weight: bold;">list</span></a>=<a href="http://inside-r.org/r-doc/base/ls"><span style="color: #003399; font-weight: bold;">ls</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Set working directory for the csv file</span>
    <a href="http://inside-r.org/r-doc/base/setwd"><span style="color: #003399; font-weight: bold;">setwd</span></a><span style="color: #009900;">(</span><span><span style="color: #0000ff;">"C:</span><span style="color: #000099; font-weight: bold;">\\</span><span><span style="color: #0000ff;">yourDirectory</span></span><span style="color: #000099; font-weight: bold;">\\</span><span style="color: #0000ff;">"</span></span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># load the csv file</span>
    <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a> <span><-</span> <a href="http://inside-r.org/r-doc/utils/read.csv"><span style="color: #003399; font-weight: bold;">read.csv</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"dataForBlog.csv"</span><span style="color: #339933;">,</span> header=<span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #339933;">,</span> sep=<span style="color: #0000ff;">","</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># some code that cleans up the variables so that boxplot will work later</span>
    <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a> <span><-</span> <a href="http://inside-r.org/r-doc/base/data.frame"><span style="color: #003399; font-weight: bold;">data.frame</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/sapply"><span style="color: #003399; font-weight: bold;">sapply</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #339933;">,</span> <a href="http://inside-r.org/r-doc/base/function"><span style="color: #003399; font-weight: bold;">function</span></a><span style="color: #009900;">(</span>x<span style="color: #009900;">)</span> <span style="color: #009900;">{</span> <span style="color: #000000; font-weight: bold;">if</span><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/is.factor"><span style="color: #003399; font-weight: bold;">is.factor</span></a><span style="color: #009900;">(</span>x<span style="color: #009900;">)</span><span style="color: #009900;">)</span> <span style="color: #009900;">{</span>
      <a href="http://inside-r.org/r-doc/base/as.numeric"><span style="color: #003399; font-weight: bold;">as.numeric</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/as.character"><span style="color: #003399; font-weight: bold;">as.character</span></a><span style="color: #009900;">(</span>x<span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    <span style="color: #009900;">}</span> <span style="color: #000000; font-weight: bold;">else</span> <span style="color: #009900;">{</span>
      x
    <span style="color: #009900;">}</span>
    <span style="color: #009900;">}</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Prepare the "device" that this graph will be prepared for -- more standard results</span>
    <span style="color: #666666; font-style: italic;"># than acquired by exporting from the R GUI</span>
    <a href="http://inside-r.org/r-doc/grDevices/png"><span style="color: #003399; font-weight: bold;">png</span></a><span style="color: #009900;">(</span>filename = <span style="color: #0000ff;">"demo.png"</span><span style="color: #339933;">,</span> width = <span style="color: #cc66cc;">800</span><span style="color: #339933;">,</span> height = <span style="color: #cc66cc;">320</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/r-doc/base/units"><span style="color: #003399; font-weight: bold;">units</span></a> = <span style="color: #0000ff;">"px"</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Create a vector and use it to define the layout</span>
    <span style="color: #666666; font-style: italic;"># Here we will have two panels in a ratio of 3:2</span>
    <span style="color: #666666; font-style: italic;"># c(1,2) or c(1,1,2,2) would create two equal panels</span>
    <span style="color: #666666; font-style: italic;"># c(1,1,2) would create two panels in a ratio of 2:1</span>
    m <span><-</span> <a href="http://inside-r.org/r-doc/base/rbind"><span style="color: #003399; font-weight: bold;">rbind</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    <a href="http://inside-r.org/r-doc/graphics/layout"><span style="color: #003399; font-weight: bold;">layout</span></a><span style="color: #009900;">(</span>m<span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Generate the boxplot. Not the focus of this script, so no comments</span>
    <a href="http://inside-r.org/r-doc/graphics/par"><span style="color: #003399; font-weight: bold;">par</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/packages/cran/mAr"><span>mar</span></a>=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">3</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">4</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">4</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    <a href="http://inside-r.org/r-doc/graphics/boxplot"><span style="color: #003399; font-weight: bold;">boxplot</span></a><span style="color: #009900;">(</span>price<span>~</span>year<span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a>=<a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #339933;">,</span> xaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> yaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/r-doc/graphics/frame"><span style="color: #003399; font-weight: bold;">frame</span></a>=<span style="color: #0000ff;">"f"</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/packages/cran/mAr"><span>mar</span></a> = <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> at=<span style="color: #cc66cc;">1</span><span>:</span><span style="color: #cc66cc;">17</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<span style="color: #cc66cc;">1997</span><span>:</span><span style="color: #cc66cc;">2013</span><span style="color: #339933;">,</span> lwd=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> lwd.ticks=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> cex.axis=<span style="color: #cc66cc;">0.5</span><span style="color: #339933;">,</span> mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span> at=<a href="http://inside-r.org/r-doc/base/seq"><span style="color: #003399; font-weight: bold;">seq</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">11000000</span><span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/base/by"><span style="color: #003399; font-weight: bold;">by</span></a>=<span style="color: #cc66cc;">1000000</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<a href="http://inside-r.org/r-doc/base/formatC"><span style="color: #003399; font-weight: bold;">formatC</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/seq"><span style="color: #003399; font-weight: bold;">seq</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">11000000</span><span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/base/by"><span style="color: #003399; font-weight: bold;">by</span></a>=<span style="color: #cc66cc;">1000000</span><span style="color: #009900;">)</span><span style="color: #339933;">,,</span> <a href="http://inside-r.org/r-doc/base/format"><span style="color: #003399; font-weight: bold;">format</span></a>=<span style="color: #0000ff;">"d"</span><span style="color: #339933;">,</span> big.mark=<span style="color: #0000ff;">','</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> las=<span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> cex.axis=<span style="color: #cc66cc;">0.65</span><span style="color: #339933;">,</span> bty=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> lwd=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> lwd.ticks=<span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> tck=<span>-</span><span style="color: #cc66cc;">0.02</span><span style="color: #339933;">,</span> mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.35</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> hadj=<span style="color: #cc66cc;">1</span><span style="color: #009900;">)</span>
    <a href="http://inside-r.org/r-doc/graphics/mtext"><span style="color: #003399; font-weight: bold;">mtext</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/graphics/text"><span style="color: #003399; font-weight: bold;">text</span></a>=<span style="color: #0000ff;">"Price vs. Year"</span><span style="color: #339933;">,</span> side = <span style="color: #cc66cc;">3</span><span style="color: #339933;">,</span> adj=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <a href="http://inside-r.org/r-doc/stats/line"><span style="color: #003399; font-weight: bold;">line</span></a>=<span style="color: #cc66cc;">1.5</span><span style="color: #339933;">,</span> cex=<span style="color: #cc66cc;">1.1</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># initialize the arrays</span>
    <span style="color: #666666; font-style: italic;"># Creates a vector of 17 (there are 17 yeras) NAs that we will fill in later</span>
    means <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    mins <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    maxs <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    lowerq <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    upperq <span><-</span> <a href="http://inside-r.org/r-doc/base/rep"><span style="color: #003399; font-weight: bold;">rep</span></a><span style="color: #009900;">(</span><span style="color: #000000; font-weight: bold;">NA</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">17</span><span style="color: #009900;">)</span>
    <span style="color: #666666; font-style: italic;"># Creates a vectory of 1997, 1998, 1999,... 2013</span>
    <span style="color: #666666; font-style: italic;"># These are the years at the bottom of the boxplot</span>
    years <span><-</span> <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">1997</span><span>:</span><span style="color: #cc66cc;">2013</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Perform this loop once for each value of i from 1997 to 2013</span>
    <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #009900;">(</span>i <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #cc66cc;">1997</span><span>:</span><span style="color: #cc66cc;">2013</span><span style="color: #009900;">)</span>
    <span style="color: #009900;">{</span>
      <span style="color: #666666; font-style: italic;"># Run the boxplot statistics for this year</span>
      boxstats <span><-</span> <a href="http://inside-r.org/r-doc/grDevices/boxplot.stats"><span style="color: #003399; font-weight: bold;">boxplot.stats</span></a><span style="color: #009900;">(</span>
        <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #009900;">[</span><a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #009900;">[</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"year"</span><span style="color: #009900;">]</span><span>==</span>i<span style="color: #339933;">,</span><span style="color: #0000ff;">"price"</span><span style="color: #009900;">]</span><span style="color: #339933;">,</span>  <span style="color: #666666; font-style: italic;"># filters teh data for only year that matches i</span>
        <a href="http://inside-r.org/r-doc/stats/coef"><span style="color: #003399; font-weight: bold;">coef</span></a> = <span style="color: #cc66cc;">1.5</span><span style="color: #339933;">,</span> do.conf = <span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #339933;">,</span> do.out = <span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #009900;">)</span>
      <span style="color: #666666; font-style: italic;"># Next 5 lines store the boxplot statistics into our arrays</span>
      <span style="color: #666666; font-style: italic;"># i-1996 trasforms 1997 to 2013 into 1 to 17, these are the indexes in our array</span>
      mins<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">1</span><span style="color: #009900;">]</span>
      lowerq<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">2</span><span style="color: #009900;">]</span>
      means<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">3</span><span style="color: #009900;">]</span>
      upperq<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">4</span><span style="color: #009900;">]</span>
      maxs<span style="color: #009900;">[</span>i<span>-</span><span style="color: #cc66cc;">1996</span><span style="color: #009900;">]</span> <span><-</span> boxstats<span>$</span>stats<span style="color: #009900;">[</span><span style="color: #cc66cc;">5</span><span style="color: #009900;">]</span>
    <span style="color: #009900;">}</span>
    
    <span style="color: #666666; font-style: italic;"># combine the arrays into a dataframe to pass to textplot later</span>
    myBoxStats <span><-</span> <a href="http://inside-r.org/r-doc/base/data.frame"><span style="color: #003399; font-weight: bold;">data.frame</span></a><span style="color: #009900;">(</span>
      years <span style="color: #666666; font-style: italic;"># first column, unformatted</span>
      <span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/base/format"><span style="color: #003399; font-weight: bold;">format</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/data.frame"><span style="color: #003399; font-weight: bold;">data.frame</span></a><span style="color: #009900;">(</span>mins<span style="color: #339933;">,</span>lowerq<span style="color: #339933;">,</span>means<span style="color: #339933;">,</span>upperq<span style="color: #339933;">,</span>maxs<span style="color: #009900;">)</span><span style="color: #339933;">,</span>scientific=<span style="color: #000000; font-weight: bold;">FALSE</span><span style="color: #339933;">,</span>big.mark=<span style="color: #0000ff;">","</span><span style="color: #339933;">,</span>small.mark=<span style="color: #0000ff;">"."</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;">#format other columns nicely</span>
      <span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># rename the column names so they come out nicely in textplot later</span>
    <a href="http://inside-r.org/r-doc/base/colnames"><span style="color: #003399; font-weight: bold;">colnames</span></a><span style="color: #009900;">(</span>myBoxStats<span style="color: #009900;">)</span> <span><-</span> <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"Year"</span><span style="color: #339933;">,</span><span style="color: #0000ff;">"Minimum"</span><span style="color: #339933;">,</span><span style="color: #0000ff;">"Lower Quartile"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"Average"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"Upper Quartile"</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"Maximum"</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># sets margins to nothing</span>
    <a href="http://inside-r.org/r-doc/graphics/par"><span style="color: #003399; font-weight: bold;">par</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/packages/cran/mAr"><span>mar</span></a>=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Write out the table</span>
    <a href="http://inside-r.org/packages/cran/PerformanceAnalytics"><span>PerformanceAnalytics</span></a><span>:::</span>textplot<span style="color: #009900;">(</span>myBoxStats <span style="color: #666666; font-style: italic;">#data</span>
                                    <span style="color: #339933;">,</span>halign = <span style="color: #0000ff;">"left"</span> <span style="color: #666666; font-style: italic;">#horizontal alignment</span>
                                    <span style="color: #339933;">,</span>valign = <span style="color: #0000ff;">"top"</span> <span style="color: #666666; font-style: italic;">#vertical alignment</span>
                                    <span style="color: #339933;">,</span>row.valign=<span style="color: #0000ff;">"center"</span> <span style="color: #666666; font-style: italic;">#row alignment</span>
                                    <span style="color: #339933;">,</span><a href="http://inside-r.org/packages/cran/mAr"><span>mar</span></a> = <a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.1</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.1</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;">#margin parameters</span>
                                    <span style="color: #339933;">,</span>show.rownames=<span style="color: #000000; font-weight: bold;">FALSE</span> <span style="color: #666666; font-style: italic;">#omit the record identifiers</span>
    <span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># write the output to disk</span>
    <a href="http://inside-r.org/r-doc/grDevices/dev.off"><span style="color: #003399; font-weight: bold;">dev.off</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span>








[Created by Pretty R at inside-R.org](http://www.inside-r.org/pretty-r)
