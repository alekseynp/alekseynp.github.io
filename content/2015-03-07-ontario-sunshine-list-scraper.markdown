---
author: Aleksey Nozdryn-Plotnicki
date: 2015-03-07 16:30:00+00:00
slug: ontario-sunshine-list-scraper
title: Ontario Sunshine List Open Scraper
category: Ontario Sunshine List
---

Today I am announcing my open Ontario Sunshine List Scraper released under the MIT License.

**You can download the data directly [here](https://github.com/alekseynp/ontario_sunshine_list/blob/master/output/data.csv).** I will likely move this later.

Anyone can go [here to the GitHub repo](https://github.com/alekseynp/ontario_sunshine_list) and download python code that scrapes the [Ontario Public Sector Salary Disclosure](http://www.fin.gov.on.ca/en/publications/salarydisclosure/pssd/) data into a machine-readable format.

Today's version of the code has two key limitations:

* Only the initial disclosure is scraped. Addenda are not scraped or processed.
* 2015 disclosure has not yet been published or included

Please feel free to fork the repo and build ahead.

Anyone can create their own CSV like this:
```
import ontario_sunshine_list as osl

col = osl.Collector()
col.run('/home/aleksey/data/sunshine/')

scr = osl.Scraper()
df = scr.run('/home/aleksey/data/sunshine/')

cle = osl.Cleaner()
df = cle.run(df)

df.to_csv('/home/aleksey/data.csv', encoding='utf-8')
```
