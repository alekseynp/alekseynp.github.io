---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2013-08-17 04:12:25+00:00
layout: post
slug: average-age-of-brooklyns-buildings-mapped
title: Average age of Brooklyn's buildings mapped
wordpress_id: 622
categories:
- Projects
- Techniques
tags:
- aggregation
- Brooklyn
- map
---

I saw [this](http://bklynr.com/block-by-block-brooklyns-past-and-present/) recently [here](http://www.theatlanticcities.com/neighborhoods/2013/08/interactive-map-day-brooklyns-buildings-are-newer-you-think/6399/). It's a map showing the age of Brooklyn's buildings.

[![bklynr](http://alekseynp.github.io/wp-content/uploads/2013/08/bklynr.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/bklynr.png)

**What do I get from the map?**

Every data point is plotted, so if I were a Brooklyner, I would probably find my street or look up my favourite building. For some people this seems to have reduced confidence in the data quality. Having only ever been half-way across the Brooklyn Bridge, instead I looked at the map to try and find interesting trends. Some are certainly visible, but I found myself wanting a map with some aggregation.

**What I tried.**

So I made this. Yes, a post will follow on how.

[![bk_r5_version4](http://alekseynp.github.io/wp-content/uploads/2013/08/bk_r5_version4-923x1024.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/bk_r5_version4.png)

(click for the huge version)

By showing the average build year for buildings in each hexagon, rather than plotting every single data point, some patterns are more visible. Though I will admit that once you've seen them in the above map, they are often quite visible in the original.

**Hexagon Size**

The size or "radius" of the hexagons is an important parameter of the visualization. As you can see clearly below, our ability to spot patterns of a certain size requires aggregation of a similar size. Compare the first with the last and you'll see.

[![radius_5_400](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_5_400.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_5_400.png)[![radius_10_400](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_10_4001.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_10_4001.png)[![radius_20_400](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_20_400.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_20_400.png)[![radius_30_400](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_30_400.png)](http://alekseynp.github.io/wp-content/uploads/2013/08/radius_30_400.png)



**Aggregation**

While my map is not a compelling improvement on the original, I think it is a nice demonstration of the power of aggregation. Data visualizers can be overly focused on plotting the data directly. Analysts, however, know that you can rarely accomplish anything without some good aggregation. This intersection of data viz and analysis is undeniably interesting.
