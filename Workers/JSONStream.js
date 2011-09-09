

var Data = {};

function append( key, value)
{
	Data[key] = value;
}

function removeKey( fKey )
{
	var KeyArray = new Array();
	var WorkingStr = "";
	
	
	KeyArray = fKey.split(".");
	
	var SourceString = "delete Data";
	
	for ( var i = 0; KeyArray.length - 1 >= i; i++ )
	{
		SourceString += "['"+ KeyArray[i] + "']";
	}
	
	SourceString += ";"; 
	eval(SourceString);
	
}

function getByKeyValues( fArray )
{
	var results = new Array();
	for ( var i = 0; fArray.length - 1 >= i; i++ )
	{
		var fVar = Data[fArray[i]];
		if ( fVar )
		{
			results.push(Data[fArray[i]]);
		}
	}
	return results;
}

function getData()
{
	var fResult = new Array();
	for ( var i = 0; Data.length - 1 >= i; i++ )
	{
		fResult.push(Data[i]);
	}
	return fResult;
}

onmessage = function(event)
{
	var data = event.data;
	if ( data.msg == "append" )
	{
		var fKeyName = data.Key;
		var fKeyValue = data.Value;
		append( fKeyName, fKeyValue );
	}
	
	if ( data.msg == "appendRow")
	{
		var fKeyName = data.Key;
		var fKeyValue = data.Value;
		append( fKeyName, fKeyValue );		
	}
	
	if ( data.msg == "getSingle")
	{
		var fKey = data.Key;
		var fResults = new Array();
		fResults[0] = Data[fKey];
		postMessage( {
			"msg": "send",
			"Data": fResults
		} );
	}
	
	if ( data.msg == "get")
	{
		var fKeyValues = data.Keys;
		var fResults = getByKeyValues( fKeyValues );
		postMessage( {
			"msg": "send",
			"Data": fResults
		} );
	}
	
	if ( data.msg == "remove" )
	{
		removeKey( data.Key );
	}
	
	if ( data.msg == "getAll")
	{
		postMessage( { "msg" : "send", "Data" : Data });
	}
}

