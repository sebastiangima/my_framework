function SuppaExplotion(){}

SuppaExplotion.prototype.baseClass='SuppaCel'

SuppaExplotion.prototype.getElement = function getElement(k,o){
	return SuppaExplotion.prototype.base.getElement.call(this,k,o);
}

SuppaExplotion.prototype.paint = function paint(){
	SuppaExplotion.prototype.base.paint.call(this)
}	

SuppaCel.prototype.updateImage = function updateImage(){
		this.element.children[this.actual].style.display='none';
    if(this.delta[1]) {	// right
      if (this.delta[1]==-1) {
          this.actual++;
      }
			else {
				if(this.state==0)
					this.actual=8;
				this.actual--;
			}
			this.element.children[this.actual].style.display='block';
    }
}

SuppaExplotion.prototype.init = function init(){
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
	args.name = 'explotion';
	this.value = 10;
	args.cells = {
		freeMov:[0],
		sliceFall:{
			below:[0],
			adyacents:[0]
		}
			
		
	
	};
  this.actual=0;
	SuppaExplotion.prototype.base.init.call(this,args);
  //var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion.png', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion1.png', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion2.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion3.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion4.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion5.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion6.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion7.png', display:'none', parentNode:this.element})
}

function ISuppaExplotion(){
	this.init(arguments[0]);
}

classHelper.register(SuppaExplotion,ISuppaExplotion);
