---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2012-08-14 15:20:37+00:00
layout: post
slug: new-project-global-games-regional-sports-london-2012
title: 'New Project: Global Games, Regional Sports - London 2012'
wordpress_id: 54
categories:
- Projects
tags:
- D3.js
- global-games-regional-sports
- projects
- sports
---

Today I am publishing a project that I have been working on over the last couple of weeks during the 2012 Summer Olympics here in London. The essential question I asked was: If you calculate the weighted geographical midpoint of each sport at the Olympics, do you get an interesting result? I think the answer is yes, and I built a visualisation to support exploring it.

Please find the visualisation here: [http://alekseynp.com/portfolio/global-games-regional-sports-london-2012-olympics.html](http://alekseynp.com/portfolio/global-games-regional-sports-london-2012-olympics.html)

[![](http://alekseynp.com/wp-content/uploads/2012/08/screenshot2.png)](http://alekseynp.com/portfolio/global-games-regional-sports-london-2012-olympics.html)

**Sample Insights**



	
  * Any east/west or north/south participation bias is emphasised in the medal results. For example, a sport that has more eastern participants will have proportionally even more eastern medals. Examples: Badminton, Table Tennis, Archery. There are a few exceptions including Boxing with southern participants and northern winners.

	
  * Athletics have an incredibly wide range of participants and much narrower set of winners, dominated by the United States, pulling the medals point to the West

	
  * Football and Hockey are quite southern sports. At least in the case of Football this is a result of low European participation

	
  * Very few sports have proportionally more southern winners than participants. Of the 32 sports, only six move south when switching from participants to medals: Beach Volleyball, Modern Pentathlon, Rowing, Sailing, Volleyball, Water Polo. This is due in part to the dominance of the United States and China in the games, but is true more generally as more northern countries tend to lead the medals table.

	
  * A lot of sports land where my intuition puts them: Northwestern European tennis, European handball, New world Beach Volleyball

	
  * Some surprises to me: Judo and Taekwondo are surprisingly central. Fencing appears European as well as east-Asian. Surprisingly international: Basketball. Probably not all surprises for all people.


**Data**

2012 Olympic Medals by Country by Sport - [http://www.london2012.com/medals/medal-count/](http://www.london2012.com/medals/medal-count/), scraped manually.
All London 2012 athletes and medal data - [https://docs.google.com/spreadsheet/ccc?key=0AuKpKzUJbSqtdEdDR29BY0JsRDFlbHQ1SVRHcjlsLWc](https://docs.google.com/spreadsheet/ccc?key=0AuKpKzUJbSqtdEdDR29BY0JsRDFlbHQ1SVRHcjlsLWc) for participants data, thank you The Guardian
Latitude and Longitude of Capitals - Mix of sources, primarily Wikipedia

**Technology**

This visualisation uses D3.js ([http://d3js.org/](http://d3js.org/)), a JavaScript framework for SVG. Note that this then requires Firefox, Chrome, Safari, Opera, or IE9. Note that IE8 is explicitly excluded from this list.
