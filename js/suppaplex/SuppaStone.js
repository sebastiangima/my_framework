function SuppaStone(){}

SuppaStone.prototype.baseClass='SuppaCel'

SuppaStone.prototype.getElement = function getElement(k,o){
	return SuppaStone.prototype.base.getElement.call(this,k,o);
}

SuppaStone.prototype.paint = function paint(){
	SuppaStone.prototype.base.paint.call(this)
}	

// SuppaStone.prototype.updateImage = function updateImage(){
		// if (this.action.type=='explotion')
			// return this.makeExplotion();
		// this.element.children[this.actual].style.display='none';
    // if(this.delta[1]) {	// right
      // if (this.delta[1]==-1) {
          // this.actual++;
				
      // }
			// else {
				// if(this.state==0)
					// this.actual=8;
				// this.actual--;
			// }
			// this.element.children[this.actual].style.display='block';
    // }
// }

SuppaStone.prototype.init = function init(){
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
	args.name = 'stone';
	this.value = 5;
	args.cells = {
		freeMov:[0],
		sliceFall:{
			below:[4,5,6],
			adyacents:[0]
		}
			
		
	
	};
  this.actual=0;
	SuppaStone.prototype.base.init.call(this,args);
  //var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone.png', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone_r0.png', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone_r1.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone_r2.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone_r3.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone_l0.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone_l1.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone_l2.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/stone_l3.png', display:'none', parentNode:this.element})
}

function ISuppaStone(){
	this.init(arguments[0]);
}

classHelper.register(SuppaStone,ISuppaStone);
	