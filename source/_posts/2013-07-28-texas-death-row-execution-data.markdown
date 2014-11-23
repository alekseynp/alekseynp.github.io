---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2013-07-28 03:06:53+00:00
layout: post
slug: texas-death-row-execution-data
title: Texas Death Row Execution Data
wordpress_id: 563
categories:
- Data
tags:
- Data
- Open Data
- Texas Death Row Execution
---

Andy Kirk over at [Visualising Data](http://www.visualisingdata.com/) wrote recently about the [Texas Death Row Education Data](http://www.visualisingdata.com/index.php/2013/07/texas-death-row-execution-data/). Texas has executed it's 500th person since it began executing people again and provides a [wealth of data](http://www.tdcj.state.tx.us/stat/dr_executed_offenders.html) about those people. Andy shared [a working copy the data ](https://docs.google.com/spreadsheet/ccc?key=0ArNsipRBvi69dEUxZHVuRTc4ZlctREdldExsOW5rMUE#gid=0)as scraped from the site. I'm moving the ball forward here by sharing my updated copy of the data.

You can find my dataset here: [get the data](https://docs.google.com/spreadsheet/ccc?key=0AohPSKdfKZm1dE8tZlpZeWtIT1dDckFrTUZucG1sY3c#gid=0)

Much of the data is stored in images and I have not processed those, so this is why there are empty rows. Probably a manual affair, though anyone who is a wiz with OCR (optical character recognition) may want to do this as an exercise.

I have not yet standardised the data. When I have time, I will write regular expressions to standardize the height data, for example.

How I scraped this data is a topic for another post.  I used my weapon of choice, C# and modified code I had written for other projects.
