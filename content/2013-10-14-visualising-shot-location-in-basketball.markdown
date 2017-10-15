---
author: Aleksey Nozdryn-Plotnicki
date: 2013-10-14 19:30:30+00:00
slug: visualising-shot-location-in-basketball
title: Visualising Shot Location in Basketball
---

Sports is full of spacial data. Data visualizers love this. Take the points and plot them by x and y location. Instantly the data is in a format that we can relate to and gain insight from. Too many data points? Aggregate and count points by region to create a head map or something similar. Want to compare two sets of points? Put two charts side-by-side. All of this is done with NBA shot position, but it has its shortcomings.

At stats.nba.com you can see shot charts like this:

[![short_chart_thumbnail]({filename}/images/short_chart_thumbnail.png)](http://stats.nba.com/playerShotchart.html?PlayerID=201142&viewShots=true&zoneDetails=false&zoneOverlays=false) [![shot_chart_thumbnail2]({filename}/images/shot_chart_thumbnail2.png)](http://stats.nba.com/playerShotchart.html?PlayerID=201142&viewShots=false&zoneDetails=true&zoneOverlays=true&zone-mode=zone)

At hotshotcharts.com you can see shot charts heated by success rate:

[![shot_chart_thumbnail3]({filename}/images/shot_chart_thumbnail3.png)](http://hotshotcharts.com/)

Even at the much (rightly) worshiped New York Times they're doing charts like this:

[![shot_chart_thumbnail4]({filename}/images/shot_chart_thumbnail4.png)](http://www.nytimes.com/interactive/2012/06/11/sports/basketball/nba-shot-analysis.html?_r=0)

**Shotcomings**

I would say that the number one shortcoming of these charts is the difficultly in comparing two sets of points. Take the New York Times piece for example. Try to compare the Heat to the Thunder or the various pairs of players side-by-side. Your eyes will flick back and forth and maybe you'll find a difference, but it's hard and you can't help but feel that you are missing something.

Why? Too much data. The points are not together for easy comparison.

**Solution**

What I am experimenting with is greater use of aggregation in these circumstances. What if we take average positions to aggregate thousands of data points and then plot those averages together to gain insights?

Here is [my first piece](average-made-shot-location-nba-regular-season-2012-13.html) on basketball:

[![final]({filename}/images/final-298x300.png)]({filename}/images/final.png)

Unfortunately the concept of average location is a bit abstract, and thus that creates a greater overhead of effort for the viewer to overcome before they start getting value out of the graphic. However, after that we can start to compare players in a way that we never have before. See the first post [here](http://alekseynp.com/2013/10/13/average-made-shot-location-nba-regular-season-2012-13/).
