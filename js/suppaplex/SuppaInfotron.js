function SuppaInfotron(){}

SuppaInfotron.prototype.baseClass='SuppaCel'

SuppaInfotron.prototype.getElement = function getElement(k,o){
	return SuppaInfotron.prototype.base.getElement.call(this,k,o);
}

SuppaInfotron.prototype.paint = function paint(){
	SuppaInfotron.prototype.base.paint.call(this)
}	


SuppaInfotron.prototype.keepBanish = function keepBanish(){
	this.state++;
	if (this.state==1) {
		this.moving=88;
		while (this.element.children.length) {
			this.element.removeChild(this.element.children[0]);
		}
		var a = {
			imageUrl : 'suppaplex/infotron.png',
			'background-attachment': 'fixed',
			border: 'solid 0px black'
		}
	}
	else {
		var a = {
			border: 'solid '+2*this.state+'px black',
			// top: (+this.element.style.top.replace('px','')+2)+'px',
			// left: (+this.element.style.left.replace('px','')+2)+'px',
			width: (32-this.state*4)+'px',
			height: (32-this.state*4)+'px'
		}
	}
	domHelper.mapToElement(this.element,a);
	this.delta==[0,0];
	if (this.state==8) {
		return true;
		return [this.row,this.col,this.row,this.col];
	}
	
}


SuppaCel.prototype.updateImage = function updateImage(){
    var di=0;
		if (this.action.type=='explotion')
			return this.makeExplotion();
    if(this.delta[0]) {	// right
			return;
		}
		
		if (this.dir=='l') {
			if (this.actual==0)
				this.element.children[0].style.display='none';
			else
				this.element.children[8-this.actual].style.display='none';
		}
		else
			this.element.children[this.actual].style.display='none';
		this.actual++;
		var actual=this.actual;
		if (this.actual==8) {
			actual=this.actual=0;
		}

		if(this.delta[1]==-1) {	// right
			actual = 8-this.actual;
			if(actual==8)	actual=0;
		}
		
    this.element.children[actual].style.display='block';
    
}


SuppaInfotron.prototype.init = function init(){
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
	args.dir = 'r';
	args.steps = 8;
	args.name = 'infotron';
	args.value = 6;
	args.cells = {
		freeMov:[0],
		sliceFall:{
			below:[4,5,6],
			adyacents:[0]
		}
			
		
	
	};
  this.actual=0;
	SuppaInfotron.prototype.base.init.call(this,args);
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/infotron.png', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/infotron_r1.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/infotron_r2.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/infotron_r3.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/infotron_r4.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/infotron_r5.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/infotron_r6.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/infotron_r7.png', display:'none', parentNode:this.element})
}

function ISuppaInfotron(){
	this.init(arguments[0]);
}

classHelper.register(SuppaInfotron,ISuppaInfotron);
