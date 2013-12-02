function SuppaCel(){}

SuppaCel.prototype.baseClass='SgControlContainer'

SuppaCel.prototype.makeExplotion = function makeExplotion(){
	this.state++;
	if (this.state==1) {
		if (this.element.children.length==0){
			var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/explotion1.png', parentNode:this.element})
		}
		else
			this.element.children[0].src ='img/suppaplex/explotion'+(this.state)+'.png';

		for (var i=1; i<this.element.children.length; ++i) {
			this.element.children[i].style.display='none';
		}
		this.element.children[0].style.display='block';
	}
	else
		if (this.element.children.length>0)
		this.element.children[0].src ='img/suppaplex/explotion'+(this.state)+'.png';
	if (this.state==this.steps) {
		this.state=0;
		this.moving=0;
		return [this.row,this.col,this.row,this.col]
	}
}
SuppaCel.prototype.getElement = function getElement(k,o){
	return SuppaCel.prototype.base.getElement.call(this,k,o);
}

SuppaCel.prototype.paint = function paint(){
	SuppaCel.prototype.base.paint.call(this)
}	

SuppaCel.prototype.destroy = function destroy(){
	this.element.parentNode.removeChild(this.element);
}
SuppaCel.prototype.updateImage = function updateImage(){
	if (this.action.type=='explotion')
		return this.makeExplotion();
	var di=0;
	if(this.delta[1]) {	// right
		if (this.delta[1]==-1) {
			di=4;
		}
		this.element.children[this.actual].style.display='none';
		if (di==0) {
			if (this.actual>=4 || this.actual==0) {
				this.actual=1;
			}
			else this.actual++;
			if (this.actual==4) this.actual=0;
		}
		else if (this.actual<4) {
			this.actual = 5;
		}
		else this.actual++;
		if (this.actual==8)
			this.actual=4;
		this.element.children[this.actual].style.display='block';
	}
}

SuppaCel.prototype.keepMoving = function keepMoving(){
	if (this.action.type=='explotion')
		return this.makeExplotion();
	if (this.state==this.steps-1) {
		var args = {};
		this.state=0;
		//this.wait=1;
		args['margin-top']='0px';
		args['margin-left']='0px';
//		args['imageUrl']='suppaplex/vacio.png';
		args['z-index']=0;
		var r=this.row;
		var c=this.col;
		this.row += this.delta[0];
		this.col += this.delta[1];
		
		//args['imageUrl']='suppaplex/player.png';
    
    //styles['margin-left']=this.delta[1]*(32/this.steps)*this.state+'px';
	
		if (this.value==5) {	// si es piedra
			var di=0;
			if(this.delta[1]) {	// right
				if (this.delta[1]==-1) {
					di=4;
				}
				this.element.children[this.actual].style.display='none';
				if (di==0) {
					if (this.actual>3 ) {
						this.actual=0;
					}
					else this.actual++;
					if (this.actual==4) this.actual=0;
				}
				else if (this.actual<4) {
					this.actual = 5;
				}
				else this.actual++;
				if (this.actual==8)
					this.actual=4;
				this.element.children[this.actual].style.display='block';
			}
			
    }
		else if(this.value==6)
			this.updateImage();
    

//		this.data.matriz[this.player.row][this.player.col].value=3;
		this.setv(
			{'z-index':1, 
			left:this.col*32+'px',
			top:this.row*32+'px', 
			'margin-top':'0px', 
			'margin-left':'0px'} 
//			imageUrl:'suppaplex/'+this.name+'.png'}
		);

		// this.data.matriz[r][c].value=0;
		// this.data.matriz[r][c].setv(args);
		
		// this.showData();
		// this.controller.keys.space=1;
		
		// if(this.controller.keys.left || this.controller.keys.right || this.controller.keys.top || this.controller.keys.bottom)
			// this.onTimer();
//			this.action = 'stop';
			return [r,c,this.row,this.col]
	}
	else this.move();
	return false;
	
}

// player actions:
//    0: not moving 
//    1: simple moving (by itself)
//				free objects (player, electrons and forks) -> directions: [left, right, up, down]
//				falling objects (stone, infotrons and orange or red diskets) -> directions: [down]
//		2: composed moving (player pusing movable object)
//				player -> directions [left, right]
//				pushed obect -> directions [left, right] (it be both in the same direction)
//		3: composed moving (falling object, horizontal slice - vertical drop)
//				falling obects (stones, infotrons) -> directions: [left,right] followed [down]
SuppaCel.prototype.sort = function sort(a,b){
		a = arguments[0];
		b=arguments[1];
		if (a.indexCoord>b.indexCoord) return -1;
		if (a.indexCoord==b.indexCoord) return 0;
		return 1;
}

SuppaCel.prototype.setAction = function setAction(args){
	this.action = args;
	
	return;
	switch (args.type) {
		case 0: // not moving
			if (this.action.type != 0) { // moving
				
			}
			this.action.type = 0;					// end movement
			this.action.type = 0;
			
		break;
		case 1: // begin free movement
		break;
		case 2: // end free movement
		break;
		// case 3: // begin complex movement (horizontal slice followed by vertica drop)
		// case 4: // end complex movement
		// case 5: // composed movement (pushing)
		
		
	}
}

SuppaCel.prototype.move = function move(delta){
	var c, styles={};
	if (this.action.type=='explotion')
		return this.makeExplotion();	
	if (!delta) delta = this.delta;
	if (this.state == 0) {
		if(this.stopped>1)this.wait++;
		this.stopped=0;
		if (this.wait-->0) {
			
			return;
		}
	//	this.action = 'moving';
		styles['z-index']=1;
		this.delta = delta;
		if (delta[0]) {
			if (!this.dir) this.dir = 'r';
		}
		else {
			if (delta[1]==1) {
				this.dir = 'r';
			}
			else {
				this.dir = 'l';
			}
			
		}
	}
	if (delta[1]) {	// right
		styles['margin-left']=delta[1]*(32/this.steps)*this.state+'px';
	}
	else if (delta[0]) { // bottom
		styles['margin-top']=delta[0]*(32/this.steps)*this.state+'px';
	}

  this.updateImage();
	this.state++;
//	if (delta[0]==1 && this.frames.vertical==0)
//		styles['imageUrl']='suppaplex/'+this.name+'.png';
//	else
//		styles['imageUrl']='suppaplex/'+this.name+'_'+this.dir+this.state%this.frames.horizontal+'.png';
	domHelper.mapToElement(this.element,styles);
	
}

SuppaCel.prototype.updateIndex = function updateIndex(cols){
	this.indexCoord = this.row * cols + this.col;
}

SuppaCel.prototype.init = function init(){
	//classHelper.extend(this,this.protoParent);
	var args = arguments[0] ? arguments[0] : {}
	this.stopped=0;
	args.className=domHelper.mergeClassName(args.className,'suppacel');
	args.action = {type:0}
	args.top = (args.row*32)+'px';
	args.left = (args.col*32)+'px';
	args.wait=1;
	var this_=this;
	args.onmousedown=function(){
		return this_.handler.onCellClick(arguments[0],arguments[1],this_);
	};
	SuppaCel.prototype.base.init.call(this,args);
}

function ISuppaCel(){
	this.init(arguments[0]);
}

classHelper.register(SuppaCel);
ISuppaCel.prototype=new SuppaCel();