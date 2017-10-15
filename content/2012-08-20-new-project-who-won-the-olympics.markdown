---
author: Aleksey Nozdryn-Plotnicki
date: 2012-08-20 17:35:36+00:00
slug: new-project-who-won-the-olympics
title: 'New Project: Who Won the Olympics?'
---

The 2012 London Summer Olympics are over and the medals are tallied. As it is probably the most nationalistic event of the year, we all look to the medal tables to see how our nation did. So, "Who won the Olympics?". Like any good question, the answer is: It depends.

I've created this visualisation to explore that question: ![](viz/who-won-the-olympics.html)

[![]({filename}/images/screenshot.png)](http://alekseynp.com/portfolio/who-won-the-olympics.html)

It's not as well designed and doesn't have the affordance that I would like, but I'm publishing today in its draft form.

Guidance for usage:
	
  * The 2x2 space is created by valuing Golds between 1 and 10 Silvers and Bronzes between 0 and 1 Silvers. Depending on where you are in the space, the rankings are different.

	
  * Click a country in the rankings table on the right to see their information and thresholds

	
  * Click a region in the chart to see the ranking that corresponds to that combination of Gold and Bronze valuation.

	
  * Cross a red line to turn it blue and increase the ranking of your selected country. Conversely, cross a blue line to turn it red and decrease the ranking.

	
  * When hovering you can also see the rank for your selected country if you were to click

	
  * When hovering, the darker shaded regions are near to your current in terms of rank for your selected country, the lighter are further.

Clearly the United States came top with more golds, more silvers and more medals than anybody else. China is similarly a sure bet for second. In the standard medals table countries are ranked by number of golds with other medals used to break ties. This is convenient for the host nation, Great Britain, who scored lot's of golds and inconvenient for Russia who didn't.

So what about those Silvers and Bronzes? Are they worth something? Is a Gold worth three Silvers? Is a Bronze worth half a Silver? These two parameters, the value of a Gold and the value of a Bronze, enable us to create a two-dimensional space to explore. What are the possible different rankings for a given nation? What ranking corresponds to my valuation of medals?

Interesting insights:
	
  * For Great Britain to come 3rd, they require gold medals to be worth at least nearly 2 silvers, and if bronzes are worth something, golds may need to be worth as much as 4.5 silvers
	
  * Canada is probably most vulnerable to changes in values compared to any other country. With a huge bronze haul and not much else, Canada could rank as low as 36th or as high as 13th, where either gold medals are nearly everything (36th) or all medals are created equal (13th)
	
  * For many countries, an increasing valuation of golds or bronzes is strictly a good thing, but for some, it actually gets more complex. Iran, for example: high valuations of gold and bronze are generally a bad thing for Iran, except when the value of gold is very high