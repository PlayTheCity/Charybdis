
function WorkerBaseClass( _parent )
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



function initWorker( msgHandler  )
	self.addEventListener('message', function(e) {
  	        msgHandler(e);
	};
}

