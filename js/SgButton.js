function SgButton(){}

SgButton.prototype.baseClass='SgControlContainer'

SgButton.prototype.getElement = function getElement(k,o){
	return SgButton.prototype.base.getElement.call(this,k,o);
}

SgButton.prototype.paint = function paint(){
	SgButton.prototype.base.paint.call(this)
}	
SgButton.prototype.init = function init(){
	//classHelper.extend(this,this.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	args.className=domHelper.mergeClassName(args.className,'sgbutton');

	args.innerHTML = args.caption || 'Vago Ponle Nombre';
	if (args.caption) delete args.caption;
	
	SgButton.prototype.base.init.call(this,args);
}

function ISgButton(){
	
	
	this.init(arguments[0]);
}
classHelper.register(SgButton);
ISgButton.prototype=new SgButton();