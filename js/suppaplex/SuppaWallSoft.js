function SuppaWallSoft(){}

SuppaWallSoft.prototype.baseClass='SuppaCel'

SuppaWallSoft.prototype.getElement = function getElement(k,o){
	return SuppaWallSoft.prototype.base.getElement.call(this,k,o);
}

SuppaWallSoft.prototype.paint = function paint(){
	SuppaWallSoft.prototype.base.paint.call(this)
}	
SuppaWallSoft.prototype.init = function init(){
	//classHelper.extend(this,this.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	//args.imageUrl='suppaplex/'+src+'.png';
	args.top = (args.row*32)+'px';
	args.left = (args.col*32)+'px';
	args.state = 1;
	this.value = 4;
	
	SuppaWallSoft.prototype.base.init.call(this,args);
}

function ISuppaWallSoft(){
	this.init(arguments[0]);
}

classHelper.register(SuppaWallSoft);
ISuppaWallSoft.prototype=new SuppaWallSoft();