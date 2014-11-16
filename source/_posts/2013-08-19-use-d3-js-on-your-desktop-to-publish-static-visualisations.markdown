---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2013-08-19 00:03:48+00:00
layout: post
slug: use-d3-js-on-your-desktop-to-publish-static-visualisations
title: Use D3.js on your desktop to publish static visualisations
wordpress_id: 637
categories:
- How To
tags:
- D3.js
- d3js
- how to
- Inkscape
---

D3.js is a great tool for creating "Data Drive Documents". As a JavaScript library, its natural primary use is on the web, rendering visualizations in the browser. It can also, however, be used offline on your PC to generate data driven content on a one-off basis. For someone familiar with D3, it can be a rapid and powerful way of scripting data into visual elements for use in a project that will not necessarily be published live and interactive on the web. In this post I will outline my simple method for using D3.js to script elements in static work.

**Use D3.js to render content in the browser**

Use D3 as you normally would to load CSVs and bind data to document elements. It doesn't have to be polished, properly wired together, or compatible with various browsers. This only has to work once, well enough, and on your machine in order to move it on to the next step in your process. It can get whatever polish it needs later in your graphical editing programs. JavaScript in the browser is your chance to do anything in a scripted way that would otherwise be a huge pain. The truth is, you could create all kinds of data visualisations by hand with an infinite amount of time and patience to calculate values and draw rectangles of exactly the right length and shade. But you don't.

Use Firefox. Like the rest of the world I've moved on to Chrome, but I still have Firefox installed on my computer for this purpose. I neither know nor need to know the full technical detail on this, but certain security settings to prevent cross site scripting attacks make it difficult to use D3.js to load CSV data locally from your machine in Chrome and Internet Explorer. There ways around this by running a tiny webserver on your desktop, but I find the simplest thing is to use Firefox which seems to not be quite so picky about its security on this issue.

**Export SVG from the browser**

Now that you've used D3 to render SVG in the browser based on your data, you can reach into that content and extract it and save it off to a file!

Firefox comes with its own inspector, so you don't even have to use Firebug. If you right click on your image and pick Inspect Element, you should gain access to a tree-view of the Document Objecet Model that will allow you to find the code for your svg. It will look like <svg>...stuffhere...</svg>

[![innerhtml](http://alekseynp.github.io/wp-content/uploads/2013/08/innerhtml.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/innerhtml.png)

In this example here, the SVG content we want is "<svg height="1100" width="1100" > .. </svg>. All this is just a bunch of text and we want to get it onto the clipboard. The way we do this is to right-click on the node that contains the SVG and choose Copy Inner HTML. In this case that is the <div id="chart" >.

Now that the SVG is on the clipboard, now what? Open up a text editor (maybe Notepad, maybe Notepad++), paste in the text and save it off as a ".svg" file.

**Use Inkscape to access SVG content**

****There's not really much more to be said here. If you open up your new SVG file with Inkscape, you'll find it malleable and in your hands like any other graphic. Combine, edit, and label. Publish.
