


function ThreadCallbackFunction( func )
{
        this.FunctionPointer = func;
        this.Active = true;
}

function ThreadFunction( funcname, params )
{
	this.FunctionName = funcname;
	this.Parameters = params;
	this.Active = true;
}



function ThreadController( filename, autostart )
{

	/* Variables */
	
	this.DestroyProgress = false;

	this.FileName = filename;
	this.Initialized = false;
	this.WebWorker;

	this.PreCallbacks = new Array(); //before msg-handler
	this.PostCallbacks = new Array(); //after message handler


	this.Functions = new Array(); // all the registered functions
	//this.ParameterCount = new Array(); //how many params per function

	if ( autostart == true )
		this.startThread();

	this.registerFunction = function( funcname, paramscount )
	{
		if ( this.Initialized == false )
			return;
		this.Functions[this.Functions.length + 1] = new ThreadFunction( funcname, paramscount ); 
	}

	this.removeFunction = function( funcname )
	{
		if ( this.Initialized == false )
			return;
		for( var func in this.Functions )
		{
			if ( func.FunctionName == funcname )
			{
				func.Active = false;
			}			
		}

	}

	this.addPreCallback = function( func )
	{
		if ( this.Initialized == false )
			return;
		this.PreCallbacks[this.PreCallbacks.length + 1] = new ThreadCallbackFunction(func);
	}

	this.addPostCallback = function( func )
	{
		if ( this.Initialized == false )
			return;
		this.PostCallbacks[this.PostCallbacks.length + 1] = new ThreadCallbackFunction(func);
	}

	this.removePreCallbackById = function( id )
	{
		if ( this.Initialized == false )	
			return;
		if ( ( id < 0 ) || ( id > this.PreCallbacks.length - 1) )
			return;
		this.PreCallbacks[id].Active = false;
	}

	this.removePostCallbackById = function( id )
	{
		if ( this.Initialized == false )
			return;
		if ( ( (id < 0) || ( id > this.PostCallbacks.length - 1 ))
			return;
		this.PostCallbacks[id].Active = false;
	}

	/* Functions */
	
	this.msgHandler = function(e)
	{
		if ( this.Initialized == false )
			return;
		if ( this.PreCallbacks.length - 1 > 0 )
		{
			for ( var i = 0; this.PreCallbacks.length - 1 >= i; i++ )
			{
				var func = this.PreCallbacks[i];
				func(e);
			}
		}

		switch( e.type )
		{
			case 'command': {
				
				switch( e.ex )
				{
					case 'stop':
					{
						this.DestroyProgress = false;
						this.Initialized = false; 
						this.WebWorker.terminate; 
						break;
					}
					case 'pause': this.pauseThread(); break;
				}
				
				break;
			}
		}
		

		if ( this.PostCallbacks.length - 1 > 0 )
		{
			for ( var i = 0; this.PostCallbacks.length - 1 >= i; i++ )
			{
				var func = this.PostCallbacks[i];
				func(e);
			}
		}
	}


	this.startThread = function()
	{
		this.WebWorker = new Worker(filename);
		this.Initialized = true;
		this.WebWorker.postMessage(
		{
			'type' : 'command',
			'ex' : 'start',
			'parent' : self
		}
		);
	}

	this.destroyThread = function()
	{	
		if ( this.Initialized == false )
			return;
		this.DestroyProgress = true;
		this.WebWorker.postMessage(
		{
			'type' : 'command',
			'ex' : 'stop'
		}
		);
	}

	
}
