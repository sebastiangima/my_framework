function SuppaHole(){}

SuppaHole.prototype.baseClass='SuppaCel'

SuppaHole.prototype.keepBanish = function keepBanish(){
	var result=false;
	this.state++;
	this.delta==[0,0];
	if (this.state==8) {
		result= true;
	}
	var a = {
		imageUrl : 'suppaplex/board'+this.state+'.png'
	}
	domHelper.mapToElement(this.element,a);
	return result;
}

SuppaHole.prototype.getElement = function getElement(k,o){
	return SuppaHole.prototype.base.getElement.call(this,k,o);
}

SuppaHole.prototype.paint = function paint(){
	SuppaHole.prototype.base.paint.call(this)
}	
SuppaHole.prototype.init = function init(){
	//classHelper.extend(this,this.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	args.top = (args.row*32)+'px';
	args.left = (args.col*32)+'px';
	args.state = 1;
	this.value = 0;
	
	SuppaHole.prototype.base.init.call(this,args);
}

function ISuppaHole(){
	this.init(arguments[0]);
}
classHelper.register(SuppaHole,ISuppaHole);
