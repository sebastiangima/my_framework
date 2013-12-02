function SgRowList(){}

SgRowList.prototype.baseClass='SgControlContainer';
SgRowList.prototype.getElement = function getElement(k,o){
	return SgRowList.prototype.base.getElement.call(this,k,o);
}

SgRowList.prototype.init = function init(){
	// classHelper.extend(this,SgRowList.prototype.protoParent);
	
	var args = arguments[0] ? arguments[0] : {};
	
	if (args.className)
		args.className = domHelper.mergeClassName(args.className,'sgwinmenu bottom');
	else
		args.className = 'sgwinmenu bottom';
	args.active=0;
	SgRowList.prototype.base.init.call(this,args);
	
	
	
}
function ISgRowList(){
	this.init(arguments[0]);
}

classHelper.register(SgRowList,ISgRowList);