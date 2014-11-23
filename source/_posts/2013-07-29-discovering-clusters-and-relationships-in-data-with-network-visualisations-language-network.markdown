---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2013-07-29 00:16:18+00:00
layout: post
slug: discovering-clusters-and-relationships-in-data-with-network-visualisations-language-network
title: Discovering clusters and relationships in data with network visualisations
  - Language Network
wordpress_id: 588
categories:
- Techniques
tags:
- network
- relationships
---

[Language Network](http://languagenetwork.cotrino.com/) is an excellent demonstration of a technique for exploring a relational data set. Every language has a % strength of similarity to every other and this defines the connections in the network. Using the strength filter and physical layout simulation, one can explore the relationships in the data set and identify clusters. It can be a little difficult to describe, so click through for yourself.

[![language_network](http://alekseynp.com/wp-content/uploads/2013/07/language_network.png)](http://languagenetwork.cotrino.com/)

During my time in consulting, I independently developed a static version of this technique for use in an analysis for a large retailer. Since then I have been in search of the right open data set in order to demonstrate the technique without violating any confidentiality or intellectual property. It pleases me today to have found Language Network via the [d3js examples index](https://github.com/mbostock/d3/wiki/Gallery).

This technique could be used on any data set where the elements have a quantitatively defined strength of relationship and the user has a desire to explore the clustering within. Specifically this could include any correlation matrix or bespoke similarity scoring formula/algorithm. The correlation matrix could be the output of a typical multivariate analysis, or it could be calculated in other ways, correlating time series or profiles/distributions.

I may have a project in the pipeline which will utilise this technique. We will see...
