


function foofunc()
{
	postMessage('foofunc: I was just called');
}


function callFunction( name )
{
	eval(name+'();');
	//foofunc();
}

function msgHandler( e )
{
//	postMessage('Worker: I just received a message');
	if ( e.type == 'command' )
	{
		switch( e.ex )
		{
			case 'call': callFunction(e.name); break;
		}

	}
}

self.addEventListener('message', function(e) {
  var data = e.data;
  msgHandler(data);
}, false);


