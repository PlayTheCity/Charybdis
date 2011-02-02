/**
 * 
 *	Charybdis.Events
 *   (C) Play The City, 2009-2011
 *   http://www.play-the-city.de
 */

var Browser = new function()
{
	this.Chrome = "Chrome";
	this.Firefox = "Firefox";
	this.InternetExplorer = "Explorer";
	this.Safari = "AppleCrap";
	this.Opera = "Opera";
	
	this.Current = "";
}


/* Browser Detection */
function detectBrowser()
{
	var appName = navigator.appeName; /* the current navigator */
	
	switch (appName)
	{
		"Mozilla": Browser.Current = Browser.Firefox; break;
		"Microsoft Internet Explorer": Browser.Current = Browser.InternetExplorer; break;
		"Chrome": Browser.Current = Browser.Chrome; break;
	}
	
}


// Call the function
detectBrowser();