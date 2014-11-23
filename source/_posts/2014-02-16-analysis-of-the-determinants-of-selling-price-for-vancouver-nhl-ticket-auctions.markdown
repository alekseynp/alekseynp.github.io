---
author: Aleksey Nozdryn-Plotnicki
comments: true
date: 2014-02-16 01:11:10+00:00
layout: post
slug: analysis-of-the-determinants-of-selling-price-for-vancouver-nhl-ticket-auctions
title: Analysis of the determinants of selling price for Vancouver NHL ticket auctions
wordpress_id: 783
categories:
- Case Study
tags:
- auctions
- Case study
- eBay
- hockey
- NHL
- regression
- sports
---

# Introduction


I've been scraping a lot lately. If data is the new oil, then it's time I started pumping it. I came across this old project of mine from a statistics course in my masters program, dated December 15, 2006. Stubhub today should be a goldmine of data and I hope appropriate data and/or analysis is being passed to the leagues to help them set prices.


<blockquote>**Analysis of the determinants of selling price for Vancouver NHL ticket auctions**

Data was collected for a one month period of auctions completed on eBay, a popular internet auction site, for tickets to see the Vancouver Canucks play at home.  The data was analyzed to determine a good regression model for the selling price per ticket. The most significant indicator was face value, but auctions by sellers with higher feedback scores and transactions that are completed longer before a game also finished with a higher price per ticket. Noteworthy insignificant factors were number of tickets in a lot, the feedback percentage rating for the seller, and the length of the auction.</blockquote>





# Findings


My most interesting finding would provide guidance to price setting.


<blockquote>Of most interest is the regular game Upper Bowl IV and Upper Bowl V price categories. The eBay market price difference from Ticketmaster is significant and in the case of Upper Bowl V seats, sizable. This indicates that these tickets are priced well below market demand. It would seem that from the consumer’s perspective Upper Bowl IV and V are indistinguishable and the Canucks should seriously consider charging more for these seats.</blockquote>


I also found that:



	
  * Tickets sold further ahead of game day sold for more. There is a fundamental tension in the market for tickets, a time-valued good (after game day a ticket is worth zero). Some shoppers are will pass on an auction hoping to find a better deal later. Some shoppers are willing to pay more for the certainty of having a ticket now. Some sellers want to unload their tickets now before they become worthless. Some sellers will patiently wait out the buyers in order to fetch a higher price. In my data there was a correlation of 0.3 between minimum bid and time until game day. This is evidence  of patient sellers setting and getting higher prices further ahead of game day.

	
  * Feedback rating was a more important factor than feedback percentage. In the marketplace that I studied where most operators were small-scale with 100% positive feedback, their tickets sold at a higher price if they gathered more positive feedback. On the flip-side, big-time operators with only a little less than 100% feedback did not suffer greatly.

	
  * The number of tickets in a lot did not affect selling price per ticket. You would expect four tickets together to be worth more than two separate pairs, and surely they are, but there was not enough evidence in the data, so it is not a strong impact.

	
  * Length of the auction did not have an effect. Longer auctions presumably get seen by more people and therefore sell for more, unless the market is active enough such that a critical mass of buyers will see auctions of short length.




## 




# How I Did It





	
  1. A scraper was written in C# to collect html pages from eBay of completed auctions for Vancouver Canucks tickets

	
  2. Extensive regular expression matching was done on the auction's free text in order to determine what game the tickets were for, how many tickets there were, and other factors like where the seats were in the stadium

	
  3. Regression models were tried in order to find a good fit

	
  4. Regression coefficients were interpreted to draw conclusions


