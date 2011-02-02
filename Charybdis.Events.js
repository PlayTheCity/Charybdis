/**
 * 
 *	Charybdis.Events
 *   (C) Play The City, 2009-2011
 *   http://www.play-the-city.de
 */
 
 
 function Event( fId, fName )
 {
	
	this.Name = fName;
	this.Id = fId;
	this.EventDesc = "Basic Event";
	this.EventListener = ""; // the default event listeners name
	this.HasDefaultEventListener = false; //when there is a default listener this must be true
	
	/* Basic Function */
	this.setName = function( fNewName )
	{
		this.Name = fNewName;
	}
	
	this.getName = function()
	{
		return this.Name;
	}
	
	this.setDescription = function( fDesc )
	{
		this.EventDesc = fDesc;
	}
	
	this.getDescription = function()
	{
		return this.EventDesc;
	}
	
	this.setDefaultListener = function( fListener )
	{
		this.HasDefaultEventListener = true;
		this.EventListener = fListener;
	}
	
	this.getDefaultListener = function()
	{
		if ( this.HasDefaultEventListener == false )
			return Error.Failed;
		return this.EventListener;
	}
	
	this.hasDefaultListener = function()
	{
		return this.HasDefaultEventListener;
	}
	
	this.getId = function()
	{
		return this.Id;
	}
 
 }
 
var SystemEvent = new function()
 {
 
	/* General Events */
	this.FatalErrorEvent = new Event(0,"FatalError");
	this.InputCausedErrorEvent = new Event(6,"InputError");
	this.ConnectionLostErrorEvent = new Event(7,"ConnectionLostError"); 
	
	/* Application Events */
	this.ApplicationAbortedEvent = new Event(1,"ApplicationAborted");
	
	/* Game Events */
	this.GameAbortedEvent = new Event(2,"GameAborted");
	this.GameStartedEvent = new Event(3,"GameStarted");
	this.GameErrorEvent = new Event(4,"GameError");
	this.GameBackgroundEvent = new Event(5,"GameBackground");

 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 