function SuppaHardWall(){}

SuppaHardWall.prototype.baseClass='SuppaCel'

SuppaHardWall.prototype.getElement = function getElement(k,o){
	return SuppaHardWall.prototype.base.getElement.call(this,k,o);
}

SuppaHardWall.prototype.paint = function paint(){
	SuppaHardWall.prototype.base.paint.call(this)
}	
SuppaHardWall.prototype.init = function init(){
	//classHelper.extend(this,this.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	args.top = (args.row*32)+'px';
	args.left = (args.col*32)+'px';
	args.state = 1;
	this.value = 11;
	
	
	SuppaHardWall.prototype.base.init.call(this,args);
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/hardwall.png', display:'block', parentNode:this.element})
}

function ISuppaHardWall(){
	this.init(arguments[0]);
}

classHelper.register(SuppaHardWall,ISuppaHardWall);
