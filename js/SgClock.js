function SgClock(){}

SgClock.prototype.baseClass='SgAppWin';

SgClock.prototype.getControl = function getControl(k,o){
	return SgClock.prototype.base.getControl.call(this,k,o);
}

SgClock.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return SgClock.prototype.base.getElement.call(this,k,o);
}

SgClock.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

SgClock.prototype.initHead = function initHead(){
	//SgClock.prototype.base.initHead.call (this);
}	

SgClock.prototype.initBody = function initBody() {
	var args = arguments[0] || {}
	//SgClock.prototype.base.initBody.call (this,args);
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this.body
	}
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c


	var a ={
		id:this.id+'_appclock',
		owner:c
	}
	this.clock=new IClock(a)
	
	
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

SgClock.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	args.className = domHelper.mergeClassName(args.className, 'window');

	
	SgClock.prototype.base.initControls.call (this,args);
	this.initHead();
	this.initBody();
	
	return;
}

SgClock.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'sgapp');

	SgClock.prototype.base.init.call(this,args);

	
}

function ISgClock(){
	this.init(arguments[0]);
}

classHelper.register(SgClock,ISgClock);
