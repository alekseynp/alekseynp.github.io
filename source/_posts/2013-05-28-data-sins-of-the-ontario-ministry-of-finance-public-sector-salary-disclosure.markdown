---
author: admin
comments: true
date: 2013-05-28 03:47:59+00:00
layout: post
slug: data-sins-of-the-ontario-ministry-of-finance-public-sector-salary-disclosure
title: Data Sins of the Ontario Ministry of Finance – Public Sector Salary Disclosure
wordpress_id: 457
categories:
- Canada
- Data Journalism
tags:
- Data Journalism
- Ontario Public Sector Salary Disclosure
- Open Data
---

Upfront warning: This article is likely to be only interesting to two types of people, those expecting to work with this data from the Ontario Ministry of Finance, and anyone in a position to demand better.

Apart from their obvious failure to publish the data in clean, machine-readable formats like csv or xls, the Ontario Ministry of Finance is making other important mistakes when making releases for the Public Salary Disclosure.

**Addenda**

The addenda is inconsistently applied to the master, published, available data. For each year an addenda is published, containing changes to the data from when it was published. There are three types of changes: additions, changes, and deletions. As far as I can tell, deletions are acted upon, and are reflected in the published set (this is so for 2012), but changes and additions are not. This is a big problem, because now no clear audit trail exists for the data, and people using the data from different times will disagree on basic facts like the number of employees disclosed.

The inconsistent application of the addenda is also inconsistent. For instance, in 2009, the deletions have not be enacted upon the published data.

Changes are listed with no reference to the original data, so what type of change is not known. In 2012 there were 328 records changed with one or more changes, 1 change of employer, 1 change of surname, 14 changes of given name, 175 changes of position, 135 changes of salary paid, 11 changes of taxable benefits. More disturbingly, 1 where the changed row matched exactly to the original row. Not a good indicator of good data discipline.

In 2012, two supposed additions were in fact changes, one for position and one for employer name. This simple error will have consequences for anyone working, collaborating, or communicating with the data.

**Inconsistent Pagination**



	
  * 2013 disclosure has 1,000 records per page across 104 pages

	
  * 2012 disclosure breaks up organisations (hospitals, colleges, etc.) in irregular chunks across 61 pages

	
  * 2011 disclosure keeps most organisations on a single page, with a few broken into only two pages for a total of 15 pages

	
  * 2010 similar to 2011 and 14 pages


**Inconsistent HTML Format**



	
  * 2013 and 2012 tables contain header information in thead and data in tbody

	
  * 2011 and before tables do not contain tbody, and simply have header information in the first tr


**Inconsistent Location for those seconded to ministries**



	
  * 2013 has it's own page

	
  * Before it was a second table on the last page of ministries


**Other**

Inexplicably, a single record under schoolboards in 2007 has a taxable benefits of “101..92” rather than “$101.92” like the record immediately following it. Yes that's two decimals and no dollar sign. Inexplicably, a single record under other in 2007 has a salary paid of “$115, 448.78”. Yes, there's a space after the comma. Yes, these may seem like small things, but they betray a deeper malpractice. A properly validated and typed data structure would not allow this abnormalities.
