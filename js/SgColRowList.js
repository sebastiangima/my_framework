function SgColRowList(){}

SgColRowList.prototype.baseClass='SgControlContainer';
SgColRowList.prototype.getElement = function getElement(k,o){
	return SgColRowList.prototype.base.getElement.call(this,k,o);
}

SgColRowList.prototype.init = function init(){
	// classHelper.extend(this,SgColRowList.prototype.protoParent);
	
	var args = arguments[0] ? arguments[0] : {};
	
	if (args.className)
		args.className = domHelper.mergeClassName(args.className,'sgwinmenu bottom');
	else
		args.className = 'sgwinmenu bottom';
	args.active=0;
	SgColRowList.prototype.base.init.call(this,args);
	
	
	
}
function ISgColRowList(){
	this.init(arguments[0]);
}

classHelper.register(SgColRowList,ISgColRowList);