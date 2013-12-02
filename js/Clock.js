function Clock(){}

Clock.prototype.baseClass='SgControlContainer';

Clock.prototype.getControl = function getElement(k,o){
	switch(k){
		case 'clock-hour':
			return this.controls[this.id+'_analogic_h'];
		case 'clock-minute':
			return this.controls[this.id+'_analogic_m'];
		case 'clock-second':
			return this.controls[this.id+'_analogic_s'];
		case 'clock-container':
			return this.controls[this.id+'_analogic'];
		case 'body':
			return this.controls[this.id+'_content'];
		break;
	}
	return Clock.prototype.base.getControl.call(this,k,o);
}
Clock.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return Clock.prototype.base.getElement.call(this,k,o);
}

Clock.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

Clock.prototype.initHead = function initHead(){
	//Clock.prototype.base.initHead.call (this);
}	

Clock.prototype.initNumbers = function initNumbers(){
	var a;
	var romansNumbers = ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
	var owner;
	
	a = {
		id: this.id+'_numbers-container',
			className:'clock-number-container',
			'owner': this.getControl('clock-container')
	}
	owner= new ISgControlContainer(a);
	this.controls[a.id]=owner;
	
	
	for (var i=12; i>0; --i) {
		a={
			id:this.id+'_numbers_'+i,
			className:'clock-number',
			'owner': owner,
			innerHTML:romansNumbers[i],
			type:i
		}
		this.controls[a.id]= new ISgControlContainer(a);
	}
}

Clock.prototype.setTime = function setTime(t,hh,mm,ss){
	if (typeof(hh) == 'undefined') {
		if (!t) t=new Date();
		
		ss=t.getSeconds(),
		mm=t.getMinutes(),
		hh=t.getHours();
	}
	
	m=this.getControl('clock-minute'),
	s=this.getControl('clock-second'),
	h=this.getControl('clock-hour');

	if(!this.active) {
		this.active=1;
		s.toogle(m.element,'active');
		m.toogle(m.element,'active');
		h.toogle(m.element,'active');
	}

	mm=mm-30;
	if(mm<0) mm+60;
	var r=mm*6;
	m.element.style['-webkit-transform']='rotateZ('+r+'deg)';
	hh=hh-6;
	if(hh<0) hh+24;
	var r=hh*30;
	h.element.style['-webkit-transform']='rotateZ('+r+'deg)';
	ss=ss-30;
	if(ss<0) ss+60;
	var r=ss*6;
	s.element.style['-webkit-transform']='rotateZ('+r+'deg)';
	//m.element.setttriclassName=domHelper.mergeClassNaame(m.element.className,'')
}

Clock.prototype.destroy = function destroy(){
	if (this.likeGadget) {
		if (this.element.parentNode==this.owner.element)
			return;
	}
	sgApp.unregisterReference(this);
	SgObject.prototype.destroy.call(this);
}
Clock.prototype.toGadget = function toGadget(e,o){
	var c;
	this.setTime();
	if (!this.likeGadget) {
		this.likeGadget=true;
		c = this.getControl('clock-container');
		
		document.body.appendChild(c.element.parentNode.removeChild(c.element));
		this.element.style.opcity=0;
	}
	else {
		c = this.getControl('clock-container');
		d = this.getControl('body');
		
		this.element.style.opcity=1;
		//this.owner.sendMessage()
		this.likeGadget=false;
		d.element.appendChild(document.body.removeChild(c.element));
	}

}
Clock.prototype.initBody = function initBody(){
	
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this
	}
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c
	
	var a = {
		id : this.id+'_analogic',
		className:'analogic	clock',
		owner: c
	}
	var d=new ISgControlContainer(a);
	this.controls[a.id] = d
	this.initNumbers();
	var a = {
		id : this.id+'_analogic_h',
		'active':this.active,
		className:'hour',
		owner: d
	}
	var dd=new ISgControlContainer(a);
	this.controls[a.id] = dd
	var a = {
		id : this.id+'_analogic_m',
		'active':this.active,
		className:'minute',
		owner: d
	}
	var dd=new ISgControlContainer(a);
	this.controls[a.id] = dd
	var a = {
		id : this.id+'_analogic_s',
		'active':this.active,
		className:'second',
		owner: d
	}
	var dd=new ISgControlContainer(a);
	this.controls[a.id] = dd
}

Clock.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	args.className = domHelper.mergeClassName(args.className, 'window');

	Clock.prototype.base.initControls.call (this,args);

	this.initHead();
	this.initBody();

	
	
	return;
}

Clock.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {}
			this_=this;

	args.onclick=function(){
		this_.toGadget(arguments[0],arguments[1])
	}
	args.active=0;
	
	args.className = domHelper.mergeClassName(args.className,'clock');

	Clock.prototype.base.init.call(this,args);

	
}
function IClock(){
	this.init(arguments[0]);
	sgApp.registerReference(this);
}

classHelper.register(Clock,IClock);
