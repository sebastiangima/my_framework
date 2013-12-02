function SgTime(){}

SgTime.prototype.baseClass = 'SgControlContainer';

SgTime.prototype.getElement = function getElement(k,o){
	switch(k) {
		case 'min': return this.controls[this.id+'_min'].element;
		case 'hora': return this.controls[this.id+'_hora'].element;
		case 'mer': return this.controls[this.id+'_mer'].element;
	}
	return SgWindow.prototype.base.getElement.call(this,k,o);
	
}

SgTime.prototype.onCmdClick = function append(c){
	sgApp.appActivate(this);
	if (this.owner && this.owner.onCmdClick) {
		this.owner.onCmdClick(arguments[0]);
	}
}

SgTime.prototype.initHead = function initHead(){
	var d = domHelper.div({innerHTML:'hola'});
	var args=arguments[0] ? arguments[0] : {}
	
	var ico = 
	
	args.imgurl=args.ico || 'icocalc1.png';
	delete args.ico;
	
	args.className = domHelper.mergeClassName(args.className,'calc');
	//SgCalc.prototype.base.initHead.call (this,args);
}

SgTime.prototype.initBody = function initBody(){
	//SgTime.prototype.base.initBody.call(this,arguments[0]);
	// var a = {
		// id : this.id+'_content',
		// className: 'body-content',
		// owner:this//.body
	// //	owner:this.body
	// }
	// this.controls[a.id] = new ISgControlContainer(a);
}

SgTime.prototype.initControls = function initControls(){
	SgTime.prototype.base.initControls.call(this,arguments[0]);
	var a={
		id:this.id+'_mer',
		owner:this,
		className:'clock'
	}
	this.controls[a.id] = new ISgControlContainer(a);
	var a={
			id:this.id+'_min',
		owner:this,
		className:'clock'
	}
	this.controls[a.id] = new ISgControlContainer(a);
	var a={
		id:this.id+'_hora',
		owner:this,
		className:'clock'
	}
	this.controls[a.id] = new ISgControlContainer(a);
	
	
}

SgTime.prototype.timer = 0;

SgTime.prototype.ontick_ = function ontick_(){
	var d = new Date();
	
	var h=d.getHours();
	var m=d.getMinutes();
	var s=d.getSeconds();
	
	sgApp.updateClocks(null,h,m,s);
	
	if (h<10) h='0'+h;
	if (m<10) m='0'+m;
	if (s<10) s='0'+s;
	
	this.getElement('hora').innerHTML=h+':';
	this.getElement('min').innerHTML=m+':';
	this.getElement('mer').innerHTML=s
}

SgTime.prototype.showClock = function showClock(){
	if (!this.clock){
		this.clock = sgApp.newApplication({appname:'Clock'});
	}
	else {
		this.clock.remove();
		delete this.clock
		this.clock=null;
	}
}

SgTime.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	
	var this_=this;
	
	args.onclick=function(){
		this_.showClock();
	}
	SgTime.prototype.base.init.call(this,args);
	//this.initControls();
	
	var ontick = function(){
		this_.ontick_();
	}
	this.timer=setInterval(ontick,2000);
}

function ISgTime(){
	this.init(arguments[0]);
}

classHelper.register(SgTime,ISgTime);
