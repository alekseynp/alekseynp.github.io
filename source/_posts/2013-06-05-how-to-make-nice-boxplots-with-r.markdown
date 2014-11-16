---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2013-06-05 03:26:20+00:00
layout: post
slug: how-to-make-nice-boxplots-with-r
title: How to make nice boxplots with R
wordpress_id: 465
categories:
- How To
tags:
- how to
- R
---

Anyone who has tried to create a boxplot in Microsoft Excel will know that there must be a better way. Boxplots are a powerful, standard statistical tool. They aren't that popular in the business community, as they are a little on the technical side, and perhaps this is why they are shunned by Microsoft. In any case, analytics professionals require a reproducible approach for generating good, clean boxplots.

My recent infographic, [Thinking of buying or selling a Peugeot Partner in Chile?](http://alekseynp.github.io/2013/06/01/infographic-thinking-of-buying-or-selling-a-peugeot-partner-in-chile/), I featured two boxplots and here is how I made them.

I used [R](https://www.google.com.pe/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CCoQFjAA&url=http%3A%2F%2Fwww.r-project.org%2F&ei=MFupUa-oDJK40gHAmYH4Dw&usg=AFQjCNFq9BSTD_8y4svhPlIv_58OxEpd5A&sig2=_ziAUMJRWN86JBwlo_VjJw&bvm=bv.47244034,d.dmQ), an open source statistics, analytics, and charting software. It is used extremely widely and many would consider it the de facto standard.

I scraped the data from chileautos.cl and output a CSV file from the process for loading into R. Afterwards I ran the following R script. See the extensive comments in order to understand what it's doing:







    
    <span style="color: #666666; font-style: italic;"># Clear all existing variables from memory</span>
    <a href="http://inside-r.org/r-doc/base/rm"><span style="color: #003399; font-weight: bold;">rm</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/list"><span style="color: #003399; font-weight: bold;">list</span></a>=<a href="http://inside-r.org/r-doc/base/ls"><span style="color: #003399; font-weight: bold;">ls</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Set working directory for the csv file</span>
    <a href="http://inside-r.org/r-doc/base/setwd"><span style="color: #003399; font-weight: bold;">setwd</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"C:<span style="color: #000099; font-weight: bold;">\\</span>Users<span style="color: #000099; font-weight: bold;">\\</span>Aleksey<span style="color: #000099; font-weight: bold;">\\</span>Documents<span style="color: #000099; font-weight: bold;">\\</span>Data Viz<span style="color: #000099; font-weight: bold;">\\</span>projects<span style="color: #000099; font-weight: bold;">\\</span>chileAutos<span style="color: #000099; font-weight: bold;">\\</span>"</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># load the csv file</span>
    <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a> <span><-</span> <a href="http://inside-r.org/r-doc/utils/read.csv"><span style="color: #003399; font-weight: bold;">read.csv</span></a><span style="color: #009900;">(</span><span style="color: #0000ff;">"partners2013-5-29-20-5.csv"</span><span style="color: #339933;">,</span> header=<span style="color: #000000; font-weight: bold;">TRUE</span><span style="color: #339933;">,</span> sep=<span style="color: #0000ff;">","</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># set the output type and size -- good for standardizing outputs</span>
    <a href="http://inside-r.org/r-doc/grDevices/svg"><span style="color: #003399; font-weight: bold;">svg</span></a><span style="color: #009900;">(</span>filename=<span style="color: #0000ff;">"output.svg"</span><span style="color: #339933;">,</span> width=<span style="color: #cc66cc;">6</span><span style="color: #339933;">,</span> height=<span style="color: #cc66cc;">4</span><span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Draw the cord boxplot</span>
    <a href="http://inside-r.org/r-doc/graphics/boxplot"><span style="color: #003399; font-weight: bold;">boxplot</span></a><span style="color: #009900;">(</span>
      price<span>~</span>year<span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># puts price on the y axis and groups by year on the x axis</span>
      <a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a>=<a href="http://inside-r.org/r-doc/utils/data"><span style="color: #003399; font-weight: bold;">data</span></a><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># dataframe to be used</span>
      xaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># suppress the default x axis</span>
      yaxt=<span style="color: #0000ff;">"n"</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># suppress the default y axis</span>
      <a href="http://inside-r.org/r-doc/graphics/frame"><span style="color: #003399; font-weight: bold;">frame</span></a>=<span style="color: #0000ff;">"f"</span> <span style="color: #666666; font-style: italic;"># suppress the plotting frame</span>
      <span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Draw our own x-axis</span>
    <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span>
      <span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># puts the axis at the bottom</span>
      at=<span style="color: #cc66cc;">1</span><span>:</span><span style="color: #cc66cc;">17</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># labels will be placed in the 17 categories</span>
      <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<span style="color: #cc66cc;">1997</span><span>:</span><span style="color: #cc66cc;">2013</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># labels will be for the years</span>
      lwd=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># width of the long axis line is zero, makes invisible</span>
      lwd.ticks=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># width of the etick lines also zero, makes them invisible</span>
      cex.axis=<span style="color: #cc66cc;">0.5</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># offset from the axis of the labels</span>
      mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># middle zero controls distance of labels from axis</span>
      <span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Draw our own y-axis</span>
    <a href="http://inside-r.org/r-doc/graphics/axis"><span style="color: #003399; font-weight: bold;">axis</span></a><span style="color: #009900;">(</span>
      <span style="color: #cc66cc;">2</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># puts the axis on the left</span>
      at=<a href="http://inside-r.org/r-doc/base/seq"><span style="color: #003399; font-weight: bold;">seq</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">11000000</span><span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/base/by"><span style="color: #003399; font-weight: bold;">by</span></a>=<span style="color: #cc66cc;">1000000</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># creates a vector of label locations starting at 0 ever 1 mil to 11 mil</span>
      <a href="http://inside-r.org/r-doc/base/labels"><span style="color: #003399; font-weight: bold;">labels</span></a>=<a href="http://inside-r.org/r-doc/base/formatC"><span style="color: #003399; font-weight: bold;">formatC</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/base/seq"><span style="color: #003399; font-weight: bold;">seq</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">11000000</span><span style="color: #339933;">,</span><a href="http://inside-r.org/r-doc/base/by"><span style="color: #003399; font-weight: bold;">by</span></a>=<span style="color: #cc66cc;">1000000</span><span style="color: #009900;">)</span><span style="color: #339933;">,,</span> <a href="http://inside-r.org/r-doc/base/format"><span style="color: #003399; font-weight: bold;">format</span></a>=<span style="color: #0000ff;">"d"</span><span style="color: #339933;">,</span> big.mark=<span style="color: #0000ff;">','</span><span style="color: #009900;">)</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># similar labels with formatting</span>
      las=<span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># rotate labels to be parallel</span>
      cex.axis=<span style="color: #cc66cc;">0.65</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># offset of labels</span>
      lwd=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># width of the long axis line is zero, makes invisible</span>
      lwd.ticks=<span style="color: #cc66cc;">1</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># tick marks are 1 wide</span>
      tck=<span>-</span><span style="color: #cc66cc;">0.02</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># length of ticks, negative goes out from the plot</span>
      mgp=<a href="http://inside-r.org/r-doc/base/c"><span style="color: #003399; font-weight: bold;">c</span></a><span style="color: #009900;">(</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0.35</span><span style="color: #339933;">,</span><span style="color: #cc66cc;">0</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># 0.35 controls the left-right movemenet of the tick labels</span>
      <span style="color: #009900;">)</span>
    
    <span style="color: #666666; font-style: italic;"># Put our title on</span>
    <a href="http://inside-r.org/r-doc/graphics/mtext"><span style="color: #003399; font-weight: bold;">mtext</span></a><span style="color: #009900;">(</span><a href="http://inside-r.org/r-doc/graphics/text"><span style="color: #003399; font-weight: bold;">text</span></a>=<span style="color: #0000ff;">"Price by Year"</span><span style="color: #339933;">,</span>
          side = <span style="color: #cc66cc;">3</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># Top</span>
          adj=<span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># Combined with top implies left alignment</span>
          <a href="http://inside-r.org/r-doc/stats/line"><span style="color: #003399; font-weight: bold;">line</span></a>=<span style="color: #cc66cc;">1.5</span><span style="color: #339933;">,</span> <span style="color: #666666; font-style: italic;"># Controls what margin line, essentially moves the text up and down</span>
          cex=<span style="color: #cc66cc;">1.1</span> <span style="color: #666666; font-style: italic;"># text size</span>
          <span style="color: #009900;">)</span>
    
    <a href="http://inside-r.org/r-doc/grDevices/dev.off"><span style="color: #003399; font-weight: bold;">dev.off</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span> <span style="color: #666666; font-style: italic;"># writes the SVG file to the working directory</span>








[Created by Pretty R at inside-R.org](http://www.inside-r.org/pretty-r)

What we get from this script:

[![output](http://alekseynp.github.io/wp-content/uploads/2013/06/output-300x200.png)](http://alekseynp.github.io/wp-content/uploads/2013/06/output.png)

What we would get from the default:

[![output_default](http://alekseynp.github.io/wp-content/uploads/2013/06/output_default-300x200.png)](http://alekseynp.github.io/wp-content/uploads/2013/06/output_default.png)

One aspect of this approach to highlight is the SVG device output. By scripting the size of the SVG output and writing it to disk, we take more control over the process, creating a more scripted and reproducible outcome.







    
    <a href="http://inside-r.org/r-doc/grDevices/svg"><span style="color: #003399; font-weight: bold;">svg</span></a><span style="color: #009900;">(</span>filename=<span style="color: #0000ff;">"output.svg"</span><span style="color: #339933;">,</span> width=<span style="color: #cc66cc;">6</span><span style="color: #339933;">,</span> height=<span style="color: #cc66cc;">4</span><span style="color: #009900;">)</span>
    <a href="http://inside-r.org/r-doc/grDevices/dev.off"><span style="color: #003399; font-weight: bold;">dev.off</span></a><span style="color: #009900;">(</span><span style="color: #009900;">)</span>








If you wanted to create 76 such boxplots, say one for each supplier to your company, all to the same size standard, doing so in Excel would be a nightmare. Even flexing VBA, the dimensioning, positioning, alignment, generation, etc. of Excel charts can be very frustrating. Trust me, I've been there. With scripting in R, one could wrap a loop around the above and generate any number of charts to the exact same size, dimensions, etc.
