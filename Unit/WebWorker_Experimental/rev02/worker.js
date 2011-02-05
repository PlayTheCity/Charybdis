/*



//importScripts('kernel.js');

function MathCalc
{
//	this.base = new WorkerBaseClass(self);


	this.initialize = function()
	{
		//NOTHING
	}

	this.destroy = function()
	{
		//NOTHING
	}

	this.action = function()
	{
//		var res = this.ackermann2( 4,2 );
//		postMessage( { 'type' : 'status', 'ex' : 'finished', 'res' : res  } );
	}

        this.ackermann2 = function( n, m )
        {
		postMessage(m);
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

}

var calc = new MathCalc();*/
//initWorker(calc.base.msgHandler );
postMessage(12);
      
