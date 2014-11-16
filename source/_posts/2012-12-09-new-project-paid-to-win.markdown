---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2012-12-09 16:51:41+00:00
layout: post
slug: new-project-paid-to-win
title: 'New Project: Paid to Win'
wordpress_id: 282
categories:
- Projects
tags:
- D3.js
- data-remix
- projects
- sports
---

Here's one I had ready to go four weeks ago, but the unreliability of my current web provider got the better of me. This is another piece working from the BBC Price of Football Survey data, only this time mashing it up with league tables available from Wikipedia. I ask where you find the cheapest goals and cheapest wins throughout the English and Scottish Football leagues:  

  

[**Paid to Win**](http://alekseynp.github.io/portfolio/paid-to-win.html)  

[![](http://alekseynp.github.io/wp-content/uploads/2012/12/paidtowin.png)](http://alekseynp.github.io/portfolio/paid-to-win.html)  

  

Click through for the interactive version.  

  

This is again quite similar to the [English Football Value for Money](http://alekseynp.github.io/portfolio/english-football-tickets-value-for-money.html) piece I did previously and is mainly just a data remix with an extra dimension to filter on. It's an interesting way to explore a ranking against two parameters at the same time.  

  

Advantages:



	
  * Display a ranking against two parameters simultaneously

	
  * Display both as a ranking as well as relative values. You can easily see both what is higher and lower and also by how much

	
  * Easily compare two teams against both parameters as well as their relative performance against both parameters (i.e. comparing line slopes)

	
  * Easily identify big movers between the two measures


Disadvantages:

	
  * Slightly complex, so requires the reader to figure it out a bit

	
  * Alternative to showing two rankings at once would be to take a design decision to only show one, that which is deemed most important

	
  * Current solution requires hover which is not mobile-friendly

	
  * Solution is D3.js and therefore SVG and thus IE 7- unfriendly


