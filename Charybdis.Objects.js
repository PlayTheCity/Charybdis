/**
 * 
 *	Charybdis.Objects
 *   (C) Play The City, 2009-2011
 *   http://www.play-the-city.de
 */
 
 
 /* Basic Error - Code Object */
var Error = new function()
 {
	  this.Failed = 'Failed'; // the operation failed  
	  this.Abort = 'Aborted'; // the operation was aborted
	  this.Closed = 'Closed'; // the operation was closed by the application 
 }
 
 
 /*#### Basic Objects ####*/
 
 function BaseObject( fParent )
 {
	
	/* Basic Properties */
	this.Type = 'None';
	this.Abstract = false;
	this.Name = 'None';
	this.Parent = fParent;
	
	//MemoryManager.register();
	
	/* Basic Functions */
	
	this.getName = function()
	{
		return this.Name;
	}
	
	this.getType = function()
	{
		return this.Type;
	}
	
	this.isAbstract = function()
	{
		return this.Abstract;
	}
	
	this.setName = function(fNewName)
	{
		this.Name = fNewName;
	}
	
	this.setType = function(fNewType)
	{
		this.Type = fNewType;
	}
	
	this.setAbstract = function(fBool)
	{
		this.Abstract = fBool;
	}
	
 };
 
 /* a runtime object with one abstract function */
 function RuntimeObject( fParent )
 {
 
 	/* Basic Properties */
	this.Type = 'None';
	this.Abstract = false;
	this.Name = 'None';
	this.Parent = fParent;
	
	//MemoryManager.register();
	
	/* Basic Functions */
	
	this.getName = function()
	{
		return this.Name;
	}
	
	this.getType = function()
	{
		return this.Type;
	}
	
	this.isAbstract = function()
	{
		return this.Abstract;
	}
	
	this.setName = function(fNewName)
	{
		this.Name = fNewName;
	}
	
	this.setType = function(fNewType)
	{
		this.Type = fNewType;
	}
	
	this.setAbstract = function(fBool)
	{
		this.Abstract = fBool;
	}
	
	/* Abstract Functions */
	
	this.setName = function()
	{
		this.Parent.update(time);
	}
	
 };
 
 /* A managed runtime object with 3 different abstract functions */
  function ManagedRuntimeObject( fParent )
 {
 
 	/* Basic Properties */
	this.Type = 'None';
	this.Abstract = false;
	this.Name = 'None';
	this.Parent = fParent;
	
	//MemoryManager.register();
	
	/* Basic Functions */
	
	this.getName = function()
	{
		return this.Name;
	}
	
	this.getType = function()
	{
		return this.Type;
	}
	
	this.isAbstract = function()
	{
		return this.Abstract;
	}
	
	this.setName = function(fNewName)
	{
		this.Name = fNewName;
	}
	
	this.setType = function(fNewType)
	{
		this.Type = fNewType;
	}
	
	this.setAbstract = function(fBool)
	{
		this.Abstract = fBool;
	}
	
	/* Abstract Functions */
	
	this.initialize = function(params)
	{
		this.Parent.initialize(params);
	}
	
	this.destroy = function()
	{
		this.Parent.destroy();
	}
	
	this.update = function(time)
	{
		this.Parent.update(time);
	}
	
 };
 
  function RenderObject( fParent )
 {
 
 	/* Basic Properties */
	this.Type = 'None';
	this.Abstract = false;
	this.Name = 'None';
	this.Parent = fParent;
	
	//MemoryManager.register();
	
	/* Basic Functions */
	
	this.getName = function()
	{
		return this.Name;
	}
	
	this.getType = function()
	{
		return this.Type;
	}
	
	this.isAbstract = function()
	{
		return this.Abstract;
	}
	
	this.setName = function(fNewName)
	{
		this.Name = fNewName;
	}
	
	this.setType = function(fNewType)
	{
		this.Type = fNewType;
	}
	
	this.setAbstract = function(fBool)
	{
		this.Abstract = fBool;
	}this.Abstract = fBool;
	}
	
	/* Abstract Functions */
	
	this.update = function(time)
	{
		this.Parent.update(time);
	}
	
	this.render = function(params)
	{
		this.Parent.render(params);
	}
	
 };
 
  function ManagedRenderObject( fParent )
 {
 
 	/* Basic Properties */
	this.Type = 'None';
	this.Abstract = false;
	this.Name = 'None';
	this.Parent = fParent;
	
	//MemoryManager.register();
	
	/* Basic Functions */
	
	this.getName = function()
	{
		return this.Name;
	}
	
	this.getType = function()
	{
		return this.Type;
	}
	
	this.isAbstract = function()
	{
		return this.Abstract;
	}
	
	this.setName = function(fNewName)
	{
		this.Name = fNewName;
	}
	
	this.setType = function(fNewType)
	{
		this.Type = fNewType;
	}
	
	this.setAbstract = function(fBool)
	{
		this.Abstract = fBool;
	}
	
	/* Abstract Functions */
	
	this.update = function(time)
	{
		this.Parent.update(time);
	}
	
	this.render = function(params)
	{
		this.Parent.render(params);
	}
	
	this.initialize = function(params)
	{
		this.Parent.initialize(params);
	}
	
	this.destroy = function()
	{
		this.Parent.destroy();
	}
	
 };
 