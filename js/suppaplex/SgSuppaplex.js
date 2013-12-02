function SgSuppaplex(){}

SgSuppaplex.prototype.baseClass='SgAppWin';

SgSuppaplex.prototype.getControl = function getControl(k,o){
	return SgSuppaplex.prototype.base.getControl.call(this,k,o);
}

SgSuppaplex.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return SgSuppaplex.prototype.base.getElement.call(this,k,o);
}

SgSuppaplex.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

SgSuppaplex.prototype.initHead = function initHead(){
	//SgSuppaplex.prototype.base.initHead.call (this);
}	

SgSuppaplex.prototype.onKeyUp = function onKeyUp(e){
	var mov = {37:[0,-1],38:[-1,0],39:[0,1],40:[1,0]}
	switch (e.keyCode) {
		case 32:
			this.keys.space = 0; break;
		case 37:
			this.keys.left = 0; break;
		case 38:
			this.keys.top = 0; break;
		case 39:
			this.keys.right = 0; break;
		case 40:
			this.keys.bottom = 0; break;
			
//			this.game.move(mov);
			return true;
		break;
	}
	return false;
}

SgSuppaplex.prototype.onKeyDown = function onKeyDown(e){
	var mov = {37:[0,-1],38:[-1,0],39:[0,1],40:[1,0]}
	switch (e.keyCode) {
		case 77:	// m			// change mode
			this.game.onPanelClick(e,null,{msg:'CHANGEMODE'});
		break;
		case 82:	// r			// reset screen, release all objects
			global.running = false;
			this.game.releaseAll();
		break;
		case 84:	// t
			global.running = e.shiftKey;
		break;
		case 68:	// d
			global.debug = e.shiftKey;
			sgApp.appActivate(sgApp.apps.Suppaplex[0]);
		break;
		case 66:
			global.stepDebugger=true;;
			this.game.onTimer();	// b
		break;
		case 65:	// a 
			global.running = !global.running;
			if (global.running)
				this.game.onTimer();
		break;
		case 32:
			this.keys.space = 1; break;
		 
		case 37:
			this.keys.left = 1; 
			if (this.game.mode=='PLAY')
				return cancelEvent(e);
			break;
		case 38:
			this.keys.top = 1; 
			if (this.game.mode=='PLAY')
				return cancelEvent(e);
			
			break;
		case 39:
			this.keys.right = 1; 
			if (this.game.mode=='PLAY')
				return cancelEvent(e);
			
			break;
		case 40:
			this.keys.bottom = 1; 
			if (this.game.mode=='PLAY')
				return cancelEvent(e);
			
			break;
			
//			this.game.move(mov);
			return true;
		break;
	}
	//this.game.onTimer()
	return false;
}

SgSuppaplex.prototype.initBody = function initBody() {
	var args = arguments[0] || {}
	//SgSuppaplex.prototype.base.initBody.call (this,args);
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this.body
	}
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c


	var a ={
		id:this.id+'_appsuppaplex',
		owner:c,
		controller:this
	}
	this.game=new ISuppaplex(a)
	
	
	return;
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this.body
	}
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c
	
	var a = {
		id : this.id+'_analogic',
		className:'analogic	clock',
		owner: c
	}
	var d=new ISgControlContainer(a);

	var a = {
		id : this.id+'_analogic_h',
		'active':1,
		className:'hour',
		owner: d
	}
	var dd=new ISgControlContainer(a);
	var a = {
		id : this.id+'_analogic_m',
		'active':1,
		className:'minute',
		owner: d
	}
	var dd=new ISgControlContainer(a);
	var a = {
		id : this.id+'_analogic_s',
		'active':1,
		className:'second',
		owner: d
	}
	var dd=new ISgControlContainer(a);	
}

SgSuppaplex.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	args.className = domHelper.mergeClassName(args.className, 'window');

	
	SgSuppaplex.prototype.base.initControls.call (this,args);
	this.initHead();
	this.initBody();
	
	return;
}

SgSuppaplex.prototype.onResize = function onResize(e){
	this.game.updateSize();
	return true;
	
}

SgSuppaplex.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'sgapp');
	args.width='100%';
	args.height='100%';
	args.top=0;
	args.left='0';
	args.keys = {
		left:0,
		right:0,
		top:0,
		bottom:0,
		space:0
	}
	var this_=this;
	args.onresize = function(){
		return this_.onResize(arguments[0],arguments[1]);
	}
	args.focusable=true;
	SgSuppaplex.prototype.base.init.call(this,args);

	sgApp.addListener({'event':'resize', handler:this, func:'onResize'})
	//sgApp.appActivate(sgApp.apps.Suppaplex[0]);
	//this.resizeToRight(0,0)	;
}

function ISgSuppaplex(){
	this.init(arguments[0]);
}

classHelper.register(SgSuppaplex,ISgSuppaplex);
