



function CCCanvas( context ) {
	
	this.RenderingContext = context;
	this.Initialized = true;
	this.Width = 400;
	this.Height = 400;
	
	this.ClearColorG = 0;
	this.ClearColorB = 0;
	this.ClearColorR = 0;
	
	this.SetClearColor = function( r, g, b) {
		
		this.ClearColorG = g;
		this.ClearColorB = b;
		this.ClearColorR = r;
		
		return true;
	}
	
	this.InitializeScreen = function( width, height ) {
		
		this.Width = width;
		this.Height = height;
		
		this.ClearScreen();
	}
	
	
	this.TextOut = function ( text, x, y, r, g, b, size) {
		this.RenderingContext.font = size + "pt Calibri";
		this.RenderingContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		this.RenderingContext.fillText(text,x,y);
	}
	
	this.DefaultTextOut = function ( text, x, y ) {
		this.RenderingContext.fillText(text,x,y);
	}
	
	this.ClearScreen = function() {
		this.RenderingContext.fillStyle = "rgb(" + this.ClearColorR + "," + this.ClearColorG + "," + this.ClearColorB + ")";
		this.RenderingContext.fillRect(0,0,this.Width,this.Height);
	}
	
	this.FillDefaultRect = function( width, height, x, y ) {
		this.RenderingContext.fillStyle = "rgb(" + this.ClearColorR + "," + this.ClearColorG + "," + this.ClearColorB + ")";
		this.RenderingContext.fillRect(x,y,width,height);		
	}
	
	this.FillRect = function( width, height, x, y, r, g, b ) {
		this.RenderingContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		this.RenderingContext.fillRect(x,y,width,height);				
	}
	
	
	
}
