function SgList(){}

SgList.prototype.baseClass='SgControlContainer';
SgList.prototype.getElement = function getElement(k,o){
	return SgList.prototype.base.getElement.call(this,k,o);
}

SgList.prototype.onItemClick = function onItemClick(e,o){
	for (var i=0; i<this.items.length; ++i) {
		if (o.innerHTML == this.items[i].label)
			return this.items[i].onclick(e,o);
	}
	
}
SgList.prototype.init = function init(){
	// classHelper.extend(this,SgList.prototype.protoParent);
	
	var args = arguments[0] ? arguments[0] : {};
	
	if (args.className)
		args.className = domHelper.mergeClassName(args.className,'sglist');
	else
		args.className = 'sglist';
	var items = args.items;
	//delete	args.items
	
	SgList.prototype.base.init.call(this,args);
	var this_=this;
	if (items)
		for (var i=0; i<items.length; ++i) {
		var d=domHelper.div();
		d.innerHTML=items[i].label;
		var item = items[i];
		d.onclick=function(){ this_.onItemClick(event,this); cancelEvent(arguments[0]); return false; };
		this.element.appendChild(d);
	}
	
	
}
function ISgList(){
	this.init(arguments[0]);
}

classHelper.register(SgList,ISgList);
