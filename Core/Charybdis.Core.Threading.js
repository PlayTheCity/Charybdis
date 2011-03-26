

function CCThreadId(fFileName )
{
	this.WebWorker;
	this.FileName = fFileName;
	this.MessageHandler;
}


function cct_startWorker( fThreadId )
{
	fThreadId.WebWorker = new Worker(fThreadId.FileName);
	return fThreadId;
}

function cct_startWorkerMsg( fThreadId, fMessageHandler )
{
	fThreadId.WebWorker = new Worker( fThreadId.FileName );
	fThreadId.MessageHandler = fMessageHandler;
	fThreadId.WebWorker.onmessage = fThreadId.MessageHandler;
	return fThreadId;
}

function cct_sendMessage( fThreadId, fValue )
{
	fThreadId.WebWorker.postMessage(fValue);
	return fThreadId;
}

function cct_setHandler( fThreadId, fHandler )
{
	fThreadId.MessageHandler = fHandler;
	fThreadId.WebWorker.onmessage = fHandler;
	return fThreadId;
}

function cct_clearHandler( fThreadId )
{
	fThreadId.MessageHandler = function() {};
	fThreadId.WebWorker.onmessage = function() {};
	return fThreadId;
}

function cct_terminateWorker( fThreadId )
{
	fThreadId.WebWorker.terminate();
	return fThreadId;
}

function cct_stopWorker( fThreadId )
{
	fThreadId.WebWorker.stop();
	return fThreadId;
}

function cct_startWorker( fThreadId )
{
	fThreadId.WebWorker.start();
	return fThreadId;
}

function cct_setTimeout( fThreadId, fTime )
{
	fThreadId.WebWorker.setTimeout( fTime );
	return fThreadId;
}

function cct_clearTimeout( fThreadId )
{
	fThreadId.WebWorker.clearTimeout();
	return fThreadId;
}

function cct_setInterval( fThreadId, fInterval )
{
	fThreadId.WebWorker.setInterval(fInterval);
	return fThreadId;
}

function cct_clearInterval( fThreadId )
{
	fThreadId.WebWorker.clearInterval();
	return fThreadId;	
}



