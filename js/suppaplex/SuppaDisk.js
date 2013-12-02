function SuppaDisk(){}

SuppaDisk.prototype.baseClass='SuppaCel'

SuppaDisk.prototype.updateImage = function updateImage(){
	if (this.action.type=='explotion')
		return this.makeExplotion();
	return;
}
SuppaDisk.prototype.getElement = function getElement(k,o){
	return SuppaDisk.prototype.base.getElement.call(this,k,o);
}

SuppaDisk.prototype.paint = function paint(){
	SuppaDisk.prototype.base.paint.call(this)
}	
SuppaDisk.prototype.init = function init(){
	//classHelper.extend(this,this.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	//args.imageUrl='suppaplex/'+src+'.png';
	args.top = (args.row*32)+'px';
	args.left = (args.col*32)+'px';
	args.state = 0;
	args.frames={
		vertical:0,
		horizontal:4
	};
	args.moving = 0;	
	args.delta = [0,0];
	args.directrion = 'r';
	args.steps = 8;

	args.cells = {
		freeMov:[0],
		sliceFall:{
			below:[],
			adyacents:[0]
		}
			
		
	
	};
  this.actual=0;
	SuppaDisk.prototype.base.init.call(this,args);
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/'+this.name+'.png', parentNode:this.element})

}

function ISuppaDisk(){
	this.init(arguments[0]);
}

classHelper.register(SuppaDisk,ISuppaDisk);

function ISuppaDiskO(){
	var args = arguments[0] || {};
	args.name = 'disket_o';
	args.value = 7;
	this.init(args);
}
classHelper.register(SuppaDisk,ISuppaDiskO);

function ISuppaDiskR(){
	var args = arguments[0] || {};
	args.name = 'disket_r';
	args.value = 8;
	this.init(args);
}
classHelper.register(SuppaDisk,ISuppaDiskR);

function ISuppaDiskY(){
	var args = arguments[0] || {};
	args.name = 'disket_y';
	args.value = 9;
	this.init(args);
}
classHelper.register(SuppaDisk,ISuppaDiskY);
