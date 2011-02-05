/*


function _WorkerBaseClass( _parent )
{
	this.parentClass = _parent;

	this.initialize = function()
	{
		this.parentClass.initialize();
	}	

	this.destroy = function()
	{
		this.parentClass.destroy();
	}

	this.action = function()
	{
		this.parentClass.action();
	}

	this.msgHandler = function ( e )
	{
		var data = e.data;
		if ( data.type == 'command ' )
		{
			switch( data.ex )
			{
				'start': this.initialize(); break;
				'stop' : this.destroy(); pushMessage( {  'type' : 'command', 'ex' : 'stop'  }  ); break;
				'action' : this.action(); break;
			}
		}
	}

}

*/

function Thread( file )
{
//	this.Id = fId;
	this.ThreadFile = file;
	this.worker; // the worker thread
	this.Initialized = false;	

	this.startThread = function()
	{
		alert(this.ThreadFile);
		this.Initialized = true;
		this.worker = new Worker(this.ThreadFile);
		alert('MMMM');
		this.worker.onmessage = function(event) { document.write('called'); };
		this.worker.postMessage();
	}

	this.pauseThread = function()
	{
		if ( this.Initialized == false )
			return;
		this.worker.postMessage( { 'type' : 'command', 'ex' :  'pause' }   );
	}

	this.stopThread = function()
	{
		if ( this.Initialized == false )
			return;
		this.Initialized = false;
		this.worker.postMessage( { 'type' : 'command', 'ex' : 'stop' });
		this.worker.terminate();
	}

	this.callBasicFunction = function( functionname, params )
	{

		if ( this.Initialized == false )
			return;
		this.worker.postMessage(
			{
				'type' : 'command',
				'ex' : 'call',
				'function_name' : functionname,
				'params' : params,
				'params_count' : params.length
			}		
		);
	}	

	this.setState = function( statename, value )
	{
		if ( this.Initialized == false )
			return;
		this.worker.postMessage( { statename : value   } );
	}

	this.messageHandler = function( eventdata )
	{
		var data = eventdata.data;
		/*if ( data.type == 'command' )
		{
			if ( data.ex == 'stop' )
				this.Worker.terminate();
			if ( data.ex == 'pause' )
				this.Worker.postMessage( {  'type' : 'command', 'ex' : 'pause'  } );
		}*/
		alert(data);
	}
}






