function SgObject(){}

SgObject.prototype.baseClass = null;	

SgObject.prototype.getElement = function getElement(k){
	var e;
	e = document.getElementById(k);
	return e;
	
}

SgObject.prototype.isInstanceOf = function isInstanceOf(k){
	var o=this;
	while (o) {
		if (classHelper.getClassName(o) == k) 
			return true;
		o=o.base;
	}
	return false;
}

SgObject.prototype.destroy = function destroy(){
}

SgObject.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	
	for (var i in args) {
		//if (typeof(this[i]) == 'undefined')
			this[i] = args[i];
	}
	
	// for (var i in SgObject.prototype) {
		// if (typeof(this[i]) != 'undefined' && this[i] instanceof Function)
			// this.constructor.prototype[i]=SgObject.prototype[i];
	// }
}



function ISgObject(){
	this.init(arguments[0]);
}

classHelper.register(SgObject);
ISgObject.prototype = new SgObject()


