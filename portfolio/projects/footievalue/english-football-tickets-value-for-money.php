<?php include("top.php"); ?>
English Football Tickets: Value For Money
<?php include("middle.php"); ?>

  <script type="text/javascript" src="/projects/footievalue/d3.v2.min.js"></script>

  <style type="text/css">
    
	html * { 
	  font-family: "Arial";
	}
	
	#tt {
	  position:absolute;
	  display:block;
	  background:url(http://thinkdatavis.com/projects/footievalue/tt_left.gif) top left repeat;
	}
	#tttop {
	  display:block;
	  height:5px;
	  margin-left:5px;
	  background:url(http://thinkdatavis.com/projects/footievalue/tt_top.gif) top right no-repeat;
	  overflow:hidden;
	}
	#ttcont {
	  display:block;
	  padding:2px 12px 3px 7px;
	  margin-left:5px;
	  background:#666;
	  color:#fff;
	  font-size:10px;
	}
	#ttbot {
	  display:block;
	  height:5px;
	  margin-left:5px;
	  background:url(http://thinkdatavis.com/projects/footievalue/tt_bottom.gif) top right no-repeat;
	  overflow:hidden;
	}
  </style>

<table style="line-height: 100%; width: 600px; border-bottom: 0px;">
<tr><td style="font-size: 12px; color: #000; border-top: 0px; border-bottom: 0px;">
  The BBC recently released their Price of Football survey for 2012. This leads naturally to the question: Where to get value for money? To answer this, I mashed up the BBC data with Premier League Club Accounts from 2010/11 previously from the Guardian Data Blog. If I want to see valuable players on the pitch, where do I get the best results for what I spend on my ticket? If I buy the cheapest match-day ticket, or the cheapest season ticket, what is the best buy? I did the analysis and produced the following.
  <br><br><br>
</td></tr>
<tr><td style="border-top: 0px; border-bottom: 0px;" width=600>
  <span style="font-size:14px; color: #000;">COST OF TICKET VS. PLAYER SALARY: VALUE FOR MONEY</span><br>
  <span style="line-height: 100%; font-size:10px; color: #888;">Cheapest match-day and season tickets vs. Wage bill; �s you spend per �m they spend</span><br><br>
<center>
  <div id="chart" width="600"></div>
</center>
</td></tr>
<tr><td style="font-size: 10px; color: #aaa; border-top: 0px; border-bottom: 0px;">
Data:<br>
&#160;&#160;&#160;&#160;[<a style="color: #888;" href="http://www.guardian.co.uk/football/datablog/interactive/2012/oct/26/bbc-price-football-mapped">1</a>] - Mapping the BBC's price of football data<br>
&#160;&#160;&#160;&#160;[<a style="color: #888;" href="http://www.guardian.co.uk/news/datablog/2012/may/24/football-premier-league-club-accounts">2</a>] - Premier League club accounts 2010/11: how in debt are they? Get the data<br>
Notes:<br>
&#160;&#160;&#160;&#160;1 - 2010/11 Accounts data compared to 2012/13 ticket prices. There will have been some movement in the meantime<br>
</td></tr>
<tr style="border-bottom: 0px;"><td style="font-size: 12px; color: #000; border-top: 0px; border-bottom: 0px;">
<br><br>
Notice that:
<ul>
  <li>Manchester City offers consistently the best value, Blackpool by far the worst</li>
  <li>Man City, Man United, and Chelsea all leverage lucrative overseas fanbases in order to deliver value-for-money in-stadium</li>
  <li>Arsenal's match-day tickets are good value, but season tickets are poor. Tottenham somewhat similarly</li>
</ul>		
</td></tr></table>

<script type="text/javascript" src="projects/footievalue/data.js"></script>

		
<?php include("bottom.php"); ?>