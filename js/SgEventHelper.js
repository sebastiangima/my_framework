var eventHelper = (function(){
	var instance = null;
	
	EventHelper.prototype.events;
	
	EventHelper.prototype.onKeyDown = function onKeyDown(e,o){
		var context = sgApp.getFocusContext();
		
		
		if (e.ctrlKey) {
			switch(String.fromCharCode(e.keyCode)) {
				case 'r':
				case 'R':
					sgApp.keybord('rotate');
				break;
				case 't':
				case 'T':
					sgApp.keybord('translate');
				break;
				case 's':
				case 'S':
					sgApp.keybord('scale');
				break;
				case 'x':
				case 'X':
					sgApp.keybord(
			}
		}
	}
	
	EventHelper.prototype.register(eventType,listener,handler,extra){
		if (!this.event[eventType]) this.event[eventType]={};
		if (!this.event[eventType][listener]) this.event[eventType][listener]={};
		if (!this.event[eventType][listener][handler]) this.event[eventType][listener][handler]={};
		this.event[eventType][listener][handler]=extra;
		
	}
	EventHelper.prototype.init = function init(){
		if (!window.addEventListener) {
			window.addEventListener=function(){
				window.addEventListener = window.attachEvent;
			}
		}
		document.body.addEventListener(keydown,eventHelper.onKeyDown,false);
	}
	function EventHelper(){
		this.event={}
	}
	return instance ? instance : instance = new EventHelper();
})()