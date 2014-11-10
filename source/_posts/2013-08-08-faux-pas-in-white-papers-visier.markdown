---
author: admin
comments: true
date: 2013-08-08 04:19:26+00:00
layout: post
slug: faux-pas-in-white-papers-visier
title: Faux pas in white papers - Visier
wordpress_id: 610
categories:
- Critique
tags:
- Critique
- White paper
---

[![Gratuitous-pies](http://thinkdatavis.com/wp-content/uploads/2013/08/Gratuitous-pies.png)](http://thinkdatavis.com/wp-content/uploads/2013/08/Gratuitous-pies.png)Over at [FlowingData](http://flowingdata.com/2013/08/07/piemaster/), this "mutant pie chart" was shared as a sinful act in the Data Viz community. It looks very wizzy and innovative, but it breaks nearly every rule in the book:



	
  * The data does not reflect a part-to-whole relationship which is the entire reason to use a pie chart.

	
  * Comparisons are very difficult to make. Without looking at the data labels, can you tell me how much larger the first blue pie is compared to the second? This is partly due to the unnecessary 3-d perspective, but again would be difficult had they been 2-d pie slices.

	
  * If your colours don't mean anything, don't use them


Nathan wasn't, "entirely sure where this came from", and his source, [Steve](https://twitter.com/infoholic/status/363555757175734273/photo/1) tells that it is from "an innovation leader in delivering...analytics...".

Well with the power of Google I'm prepared to out them... This is from [Visier's](http://www.visier.com/) [2012 Survey of Employers:  Workforce Analytics practices, preferences & plans](http://info.visier.com/workforce-analytics-trends-research-report). In the same report you can find more traditional data viz faux pas like 3-d bar charts and more basic 3-d pie charts.

Move forwards one year and the[ 2013 report is available](http://info.visier.com/2013-workforce-analytics-and-planning-survey-report). More of the same gratuitous, unnecessary, and indeed harmful 3-d perspectives, but also another gem.

[![visier](http://thinkdatavis.com/wp-content/uploads/2013/08/visier.png)](http://thinkdatavis.com/wp-content/uploads/2013/08/visier.png)So what's going on here? At first glance (the most important glance) it appears that priorities are... trending... towards other...? Not as bad as the pies, but:



	
  * Why is this a line chart? The categories are the bottom are not ordinal in any way. They are not time. They have no natural ordering. Thus to use a line, and highlight the differences from one to another is not particularly useful.

	
  * The Y-axis should be flipped. According to the sub-title, low values are for high priorities, so they should be higher on the page to match our instincts.

	
  * The gradient-filled background is a nice touch. I'm not sure if the darker background on the left-hand-side gives "Headcount" more weight, or if the better contrast with the data ink on the right-hand-side gives "Other" more weight, but what I do know is that it can't be a good idea and it doesn't make the data any more exciting.

	
  * Ordering: Given that the categories at the bottom are not ordinal, the order is curious. They are suspiciously almost ordered by data value, but not. They should be ordered highest to lowest.


And this is the obligatory part of the post where I spent a tiny amount of time redesigning a better version of what I criticized.

[![visier2](http://thinkdatavis.com/wp-content/uploads/2013/08/visier2.png)](http://thinkdatavis.com/wp-content/uploads/2013/08/visier2.png)

**What should Visier and companies like it learn from this?**

White papers are a channel through which consultancies or other service providers can demonstrate thought leadership, completeness of vision, depth of understanding, experience, competence, etc. It is important that the content of a white paper be good and that it be communicated clearly through well-designed visuals. Additionally, however, as the data visualisation movement gains momentum, it will also be important that your visuals not be poorly enough designed to embarrass you on the global stage that is the internet.

Companies like Visier should consider:



	
  * Contracting a Data Graphics Editor to clean up publications before they go out. This would neither take a lot of time nor would it be overly costly.

	
  * Upskilling their existing in-house editing capability with some data visualisation training


In any case, someone like Aleksey Nozdryn-Plotnicki (me) may be able to provide such a service.
