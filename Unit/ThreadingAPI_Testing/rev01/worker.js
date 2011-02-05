
var registerFunction;
var removeFunction;

/* event listener */

function msgHandler( e )
{
	var data = e.data;
	switch( data.type )
	{
		case 'command': switch( data.ex )
		{
			case 'start': 
			{
				postMessage('registered function');
				registerFunction = data.regfunc;
				removeFunction = data.refunc; 
				break;
			}

		} break;
	}
	postMessage('KKKKKKKKKKKKKKKKKKKKKKK');

}


this.addEventListener('message', msgHandler, false );


/*############################################'*/

function foofunc()
{
	postMessage('foofunc: I was just called');
}


function init()
{
	registerFunction('foofunc',0);
}


//init();


