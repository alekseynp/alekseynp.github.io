---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2014-11-22 19:30:18+00:00
layout: post
slug: regressing-my-gas-log
title: Regressing My Gas Log
categories:
- Geek life
tags:
- Regression
---

What mileage does your vehicle get? Well that depends. City or highway? Well what is your fuel efficiency in each? Today I geeked it up and did a regression on my gas log to determine just this. Yes, I keep a gas log. It pleases my inner scientist and it helps me watch for sudden changes in fuel efficiency.

Raw data, **Fill Ups**:
kms | litress | efficiency | est_mix_city | est_mix_highway
--- | --- | --- | --- | ---
420.8 | 46.514 | 11.05370722 | 0.5 | 0.5
576.4 | 59.53 | 10.32789729 | 0 | 1
505.2 | 51.602 | 10.2141726 | 0 | 1
522 | 54.273 | 10.39712644 | 0 | 1
305.3 | 32.433 | 10.62332132 | 0 | 1
1111.4 | 108.578 | 10.73541625 | 0.2 | 0.8
508.1 | 53.112 | 10.45306042 | 0.1 | 0.9
496.4 | 52.4393 | 10.56392023 | 0.1 | 0.9
442.1 | 44.5392 | 10.07446279 | 0 | 1
393.4 | 43.239 | 10.9911032 | 0.1 | 0.9
429.2 | 45.345 | 10.56500466 | 0 | 1
476.7 | 58.217 | 12.21250262 | 0.85 | 0.15

In google docs it is a simple thing to run `=SLOPE(efficiency rows,est_mix_city rows)` and `=INTERCEPT(efficiency rows,est_mix_city rows)` giving me 10.381 and 1.967.

Simple interpretation is then:
- With a city mix of 0 and therefore 100% highway, I would get 10.381 + 1.967*0 = 10.381 L/100 km.
- With a city mis of 1 and therefore 100% city, I would get 10.381 + 1.967*1 = 12.348 L/100 km.

Before you make any snide comments, I drive a two-ton 20-year-old 4x4 diesel van. You'll notice mostly not in the city. It's good at some things, not so good at others.

Yes, there are probably better techniques to get an estimate that perhaps weight bigger fill ups higher, or recognize the small number of data points. But whatever, this was a great way to get to a first estimate.

(Aside: It's interesting that I am happy to use the term "mileage" to describe a statistics that I will measure in L/100km)

###
