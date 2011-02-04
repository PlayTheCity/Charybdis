
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
	}
	return m + 1;
}

function ackermann( n, m )
{
	if ( n == 0 )
	{
		return m + 1;
	} 
	if ( m == 0 )
		return ackermann(n-1,1);
	else
		return ackermann(n - 1, ackermann( n, m - 1 ) );

}

