

/* Worker Configuration */

var gm = 0;
var gn = 0;


self.addEventListener('message', function(e) {
  var data = e.data;
  gm = data.m;
  gn = data.n;
  var res = ackermann2(gn,gm);
  postMessage(res);
//  postMessage(data.m);
}, false);


/* Worker Functions */

function ackermann2( n, m )
{
	while ( n != 0 )
	{
		if ( m == 0 )
		{
			m = 1;
		} else
		{
			m = ackermann2(n, m - 1);
		}
		n--;
		postMessage(m);
	}
	return m + 1;
}

function ackermann( n, m )
{
	postMessage(m);
	if ( n == 0 )
	{
		return m + 1;
	} 
	if ( m == 0 )
		return ackermann(n-1,1);
	else
		return ackermann(n - 1, ackermann( n, m - 1 ) );

}
