

function CCEvent()
{
	this.EventName = "";
	this.IsSemaphore = false;
	this.SemaphoreCounter = 0;
	this.SemaphoreDefault = 0;
	this.Listeners = new Array();
}

function cco_createEvent( fEventname )
{
	var fEvent = new CCEvent();
	fEvent.EventName = fEventname;
	return fEvent;	
}

function cco_createSemaphore( fEventName, fSemaphoreDefault )
{
	var fEvent = new CCEvent();
	fEvent.EventName = fEventName;
	fEvent.IsSemaphore = true;
	fEvent.SemaphoreCounter = 0;
	fEvent.SemaphoreDefault = fSemaphoreDefault;
	return fEvent;
}

function cco_resetSemaphore( fEvent )
{
	fEvent.SemaphoreCounter = 0;
	return fEvent;
}

function cco_callEvent( fEvent )
{
	
	if ( fEvent.IsSemaphore == false )
	{
		for ( var i = 0; fEvent.Listeners.length - 1 >= i; i++ )
		{
			fEvent.Listeners[i].call();	
		}
		
	} else 
	{
		fEvent.SemaphoreCounter += 1;
		if ( fEvent.SemaphoreCounter >= fEvent.SemaphoreDefault )
		{
			fEvent.SemaphoreCounter = 0;
			for ( var i = 0; fEvent.Listeners.length - 1 >= i; i++ )
			{
				fEvent.Listeners[i].call();	
			}
		}	
	}
	
}

/* ToDo:
 * 		- Object Management for the objects -- 0.1.3
 */

var CCObjectManager = new function()
{
	this.Types = new Array();
	this.Objects = new Array();
	this.Events = new Array();
	
	this.registerType = function( fTypeName )
	{
		this.Types.push(fTypeName);
	}
	
	this.isTypeRegistered = function( fTypeName )
	{
		for ( var i = 0; this.Types.length - 1 >= i; i++ )
		{
			if ( this.Types[i] == fTypeName )
				return true;
		}
		return false;
	}
	
	this.secureRegisterType = function( fTypeName )
	{
		if ( this.isTypeRegistered(fTypeName) == false )
			this.registerType(fTypeName);
	}
	
	this.registerEvent = function( fEvent )
	{
		this.Events.push(fEvent);
	}
	
	this.disableEvent = function( fEventName )
	{
		for( var i = 0; this.Events.length - 1 >= i; i++ )
		{
			if ( this.Events[i].EventName == fEventName )
			{
				this.Events[i].EventName = "";
				return true;
			}
		}
		return false;
	}
	
	this.trace = function( fEventName )
	{
		for( var i = 0; this.Events.length - 1 >= i; i++ )
		{
			if ( this.Events[i].EventName == fEventName )
			{
				cco_callEvent( this.Events[i]);
			}
		}
		return false;		
	}
	
}


/* ToDo:
 * 	   - Abstract Connection API 		   -- 0.2.0
 *     - Connect CCJSONStream with MongoDb -- 0.2.0
 *     - ZIP Compression 				   -- 0.2.0
 *     - Threaded Data Stream 			   -- 0.1.3
 */

function CCJSONStream()
{
	this.Data = {}; //Empty JSON Object
	
	this.append = function( key, value )
	{
		var fDat = { key : value };
		this.Data += fDat;
	}
	
	this.has = function( key )
	{
		var fDat = eval("this.Data."+key + ";");
		if ( fDat )
			return true;
		return false;
	} 
}

function CCJSONQuery()
{
	this.Query = new Array();
	
	this.appendRow = function( fName )
	{
		this.Query[this.Query.length] = fName;
	}
	
}

function CCJSONTable( fName )
{
	this.TableName = fName;
	this.Rows = new Array();
	this.RowIdentifer = "Id";
	
	this.appendRow = function( fName )
	{
		this.Rows[this.Rows.length] = fName;
	}
	
}

function CCJSONData( fTable )
{
	this.Rows = fTable.Rows;
	this.RowIdentifer = fTable.RowIdentifer;
	
	this.IdentiferValue = fTable.RowIdentifer;
	this.Values = new Array();
	
	
	this.setIdentifer = function( fValue )
	{
		this.IdentiferValue = fValue;
	}
	
	this.setRowValue = function( fValue, fRow )
	{
		for ( var i = 0; this.Rows.length - 1 >= i; i++ )
		{
			if ( this.Rows[i] == fRow )
			{
				this.Values[i] = fValue;
				return true;
			}
		}
		return false;
	}
	
	this.clear = function()
	{
		delete this.Values;
		delete this.Rows;
	}
}

function cco_createThreadedStream( fStream )
{
	var fStream = new CCJSONStream();
	
	/* data members */
	var fSavedData, bData;
	bData = false;
	if ( fStream.Data != {} )
	{
		fSavedData = fStream.Data;
		bData = true;
		fStream.Data = {};
	} 
	fStream.Data = {};
	
	fStream.IsThreaded = true;
	
	/* Message Handler */
	
	var fReceivedEvent = cco_createEvent("___" + Math.floor(Math.random()*11) + Math.floor(Math.random()*1001) + "___" + "ThreadedStream" + "___" + "Received" );
	var fFinishedProcessing = 	cco_createEvent("___" + Math.floor(Math.random()*11) + Math.floor(Math.random()*1001) + "___" + "ThreadedStream" + "___" + "Processing" );
	
	CCObjectManager.registerEvent( fReceivedEvent);
	CCObjectManager.registerEvent( fFinishedProcessing);
	
	fStream.ReceivedEvent = fReceivedEvent;
	fStream.FinishedEvent = fFinishedProcessing;
	
	var fMsg = function( e )
	{
		var dat = e.data;
		if ( dat.msg == "finished" )
		{
			CCObjectManager.trace( afd.EventName );
		} else if ( dat.msg == "send" )
		{
			if ( dat.type != "failed" )
			{
				fStream.Data = dat.Data;
				CCObjectManager.trace( fReceivedEvent.EventName );
			}
		}
	}
	
	/* Events */
	
	fStream.getReceivedEvent = function()
	{
		return this.ReceivedEvent.EventName;
	}
	
	fStream.getFinishedEvent = function()
	{
		return this.FinishedEvent.EventName;
	}
	
	/* Data */
	
	fStream.getReceivedData = function()
	{
		return fStream.Data;
	}
	
	fStream.remove = function( fKey )
	{
		cct_sendMessage(this.Thread, { "msg" : "remove"  ,"Key" : fKey });
	}
	
	/* append */
	fStream.append = function(fName,fValue)
	{
		cct_sendMessage(this.Thread, { "msg" : "append"  ,"Key" : fName ,"Value" : fValue });
	}
	
	fStream.appendRow = function( fRow )
	{
		var fObj = {};
		for ( var i = 0; fRow.Rows.length - 1 >= i; i++ )
		{
			eval("fObj['" + fRow.Rows[i] + "']='" + fRow.Values[i] + "';" );
		}
		cct_sendMessage(this.Thread, { "msg" : "appendRow"  ,"Key" : fRow.IdentiferValue ,"Value" : fObj } )
	}
	
	/* get data */
	fStream.getAll = function()
	{
		cct_sendMessage(this.Thread, { "msg" : "getAll" } );
	}
	
	/* get data */
	fStream.get = function( objects )
	{
			cct_sendMessage( this.Thread, { "msg" : "get", "Keys" : objects.Query });	
	}
	
	fStream.getSingle = function( obj )
	{
			cct_sendMessage( this.Thread, { "msg" : "getSingle", "Key" : obj });			
	}
	
	/* Worker */
	
	var fThread = new CCThreadId("Workers/JSONStream.js");	
	var fThread = cct_startWorkerMsg( fThread, fMsg );
	fStream.Thread = fThread;	
	
	
	return fStream;
}


function CCObject( fObjectName, fTypeId )
{
	
	/* Members */
	this.ObjectName = fObjectName;
	this.ObjectType = fTypeId;
	this.DataStream = new CCJSONStream();
	
	this.IsListening = false;
	
	/* Methods */
	
	this.unlisten = function( fEventName )
	{
		this.IsListening = false;
	}
	
	this.listen = function( fEventName )
	{
		for ( var i = 0; CCObjectManager.Events.length - 1 >= i; i++ )
		{
			if ( CCObjectManager.Events[i].EventName == fEventName )
			{
				CCObjectManager.Events[i].Listeners.push(this);
				return true;
			}
		}
		return false;
	}
	
	this.call = function()
	{
		//MSG Handler
	}
	
	this.isValid = function()
	{
		//tests if the type of the object really exists 
	}
	
	this.appendData = function( fName, fValue )
	{
		this.DataStream.append(fName, fValue);
	}
		
}


