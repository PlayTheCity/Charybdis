



function ThreadController( filename )
{
	this.WorkerFile = filename;
	this.Initialized = false;
	//this.WebThread;
	this.LastResult = 0;
	/* Functions */

	this.msgHandler = function(e)
	{
		/*if ( this.Initialized == false )
			return;
		if ( e.type == 'command' )
		{

		}

		if ( e.type == 'function_return' )
		{
			this.LastResult = e.result;
		}*/
		//alert(e);		
	}

	this.getLastResult = function()
	{
		return this.LastResult;
	}

	this.startThread = function()
	{
		this.Initialized = true;
		this.WebThread = new Worker(this.WorkerFile);
		this.WebThread.onmessage = function(event) { 
			//this.msgHandler(event.data);	   
			alert(event.data);
		};
	}

	this.stopThread = function()
	{
		if ( this.Initialized == false )
			return;
		this.Initialized = false;
		this.WebThread.terminate();
	}

	this.callFunction = function( name  )
	{
		if ( this.Initialized == false )
			return;
		this.WebThread.postMessage( { 'type' : 'command', 'ex' : 'call', 'name' : name  } );
	}	


}



