function SuppaPlayer(){}

SuppaPlayer.prototype.baseClass='SuppaCel'

SuppaPlayer.prototype.getElement = function getElement(k,o){
	return SuppaPlayer.prototype.base.getElement.call(this,k,o);
}

SuppaPlayer.prototype.updateImage = function updateImage(){
  var d=this.state;

	if (this.steps==16) {
		if (this.dir=='r')
			d=12;
		else
			d=11;
		if (this.state==15) {
			if (this.dir=='l')
				d=6;
			else
				d=1;
		}
	}
	else {
		switch(this.state){
			case 0: 
			case 1: 
			case 2: 
			case 3: 
				d=this.state+1;break;
			case 5: d=4;break;
			case 6: d=3;break;
			case 7: d=1;break;
			case 8: d=1;break;
			case 9: d=2;break;
			case 10: d=3;break;
			case 11: d=4;break;
			case 12: d=5;break;
			case 13: d=4;break;
			case 14: d=3;break;
			case 15: d=1;break;
			//case 8: d=0;break;
		}
		switch(this.dir) {
			case 'l': d+=5; break;
			default:this.dir='r';break;
		}
	}
  this.element.children[this.actual].style.display='none';
	this.actual=d;
  this.element.children[d].style.display='block';
}

SuppaPlayer.prototype.keepMoving = function keepMoving(){
	if (this.action.type=='explotion') 
		return this.makeExplotion();
	if (this.state==(this.steps-1)) {
		var args = {};
		args['margin-top']='0px';
		args['margin-left']='0px';
		args['imageUrl']='suppaplex/vacio.png';
		args['z-index']=0;
		var r=this.row;
		var c=this.col;
		this.row += this.delta[0];
		this.col += this.delta[1];
		this.updateImage();
		this.state=0;
		this.setv(
			{'z-index':1, 
			left:this.col*32+'px',
			top:this.row*32+'px', 
			'margin-top':'0px', 
			'margin-left':'0px'}
		);
		this.action.type = 'stop';
		return [r,c,this.row,this.col]
	}
	else this.move();
	return false;
	
}

SuppaPlayer.prototype.move = function move(delta){
	var c, styles={};
	if (this.action.type=='explotion') 
		return this.makeExplotion();
	
	if (!delta) delta = this.delta;
	if (this.state == 0) {
		this.action.type = 'moving';

		styles['z-index']=2;
		this.delta = delta;
		if (delta[0]) {
			if (delta[0]==1) 
				if (!this.dir) 
					this.dir = 'r';
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
	this.updateImage();
	this.state++;
  if(delta[1]) {	// right
    styles['margin-left']=delta[1]*(32/this.steps)*this.state+'px';
	}
	else if (delta[0]) { // bottom
		styles['margin-top']=delta[0]*(32/this.steps)*this.state+'px';
	}

	//styles['imageUrl']='suppaplex/player_'+this.dir+this.state%2+'.png';
	domHelper.mapToElement(this.element,styles);
	
}

SuppaPlayer.prototype.paint = function paint(){
	SuppaPlayer.prototype.base.paint.call(this)
}	

SuppaPlayer.prototype.init = function init(){
	//classHelper.extend(this,this.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	//args.imageUrl='suppaplex/'+src+'.png';
	//args.imageUrl='suppaplex/'+src+'.png';
	args.top = (args.row*32)+'px';
	args.left = (args.col*32)+'px';
	args.infotrons = 0;
	args.bombs = 0;
	args.state = 0;
	args.delta = [0,0];
	args.name = 'player';
	args.dir = '';
	this.actual = 0;
	args.steps = 8;
	this.value = 3;
	args.cells = {
		freeMov:[0,2,6,8],
		pushing:[{obj:5,freeMov:[0]}, {obj:7,freeMov:[0]}, {obj:9,freeMov:[0]}]
		
		}
	SuppaPlayer.prototype.base.init.call(this,args);
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player.png', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_r0.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_r1.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_r2.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_r3.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_r4.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_l0.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_l1.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_l2.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_l3.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_l4.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_lp.png', display:'none', parentNode:this.element})
  var img = domHelper.createElement({tagName:'IMG'},{src:'img/suppaplex/player_rp.png', display:'none', parentNode:this.element})
}

function ISuppaPlayer(){
	this.init(arguments[0]);
}

classHelper.register(SuppaPlayer);
ISuppaPlayer.prototype=new SuppaPlayer();