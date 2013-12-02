var output = (function(){
	var instance = null;
	
	IISgOutput.prototype.screen=null;
	
	IISgOutput.prototype.setContent=function setContent(c,replace){
		if (!this.screen) this.init();
		if(typeof(replace)=='undefined')
			replace=true;
		this.screen.setContent(c,replace);
	}
	
	IISgOutput.prototype.init=function init(){
		this.screen=sgApp.newApplication({appname:'Output',forcePosition:'right'});
		this.screen.element.setAttribute('state',1)

		this.screen.saveBox();
	}
	
	
	function IISgOutput(){
		
	}
	
	
	
	return instance ? instance : instance = new IISgOutput();
})()