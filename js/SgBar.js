function SgBar(){}

SgBar.prototype.baseClass='SgControlContainer'

SgBar.prototype.getElement = function getElement(k,o){
	return SgBar.prototype.base.getElement.call(this,k,o);
}

SgBar.prototype.paint = function paint(){
	SgBar.prototype.base.paint.call(this)
}	
SgBar.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}

	args.type = args.type ? " "+args.type : " left";
	args.className=domHelper.mergeClassName(args.className,'sgbar');
	SgBar.prototype.base.init.call(this,args);
}

function ISgBar(){
	
	
	this.init(arguments[0]);
}
classHelper.register(SgBar);
ISgBar.prototype=new SgBar();