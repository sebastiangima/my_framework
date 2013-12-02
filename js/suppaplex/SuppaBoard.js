function SuppaBoard(){}

SuppaBoard.prototype.baseClass='SuppaCel'

SuppaBoard.prototype.keepBanish = function keepBanish(){
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

SuppaBoard.prototype.getElement = function getElement(k,o){
	return SuppaBoard.prototype.base.getElement.call(this,k,o);
}

SuppaBoard.prototype.paint = function paint(){
	SuppaBoard.prototype.base.paint.call(this)
}	
SuppaBoard.prototype.init = function init(){
	//classHelper.extend(this,this.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	args.imageUrl='suppaplex/board.png';
	args.top = (args.row*32)+'px';
	args.left = (args.col*32)+'px';
	args.state = 1;
	this.value = 2;
	
	SuppaBoard.prototype.base.init.call(this,args);
}

function ISuppaBoard(){
	this.init(arguments[0]);
}

classHelper.register(SuppaBoard);
ISuppaBoard.prototype=new SuppaBoard();