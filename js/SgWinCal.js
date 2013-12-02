function SgWinCal(){}

SgWinCal.prototype.baseClass='SgAppWin';

SgWinCal.prototype.getControl = function getControl(k,o){
	switch(k) {
		case 'wincal':
			return this.wincal;
		break;
	}
	return SgWinCal.prototype.base.getControl.call(this,k,o);
}

SgWinCal.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return SgWinCal.prototype.base.getElement.call(this,k,o);
}

SgWinCal.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

SgWinCal.prototype.initHead = function initHead(){
	//SgWinCal.prototype.base.initHead.call (this);
}	

SgWinCal.prototype.onKeyDown = function onKeyDown(e,o) {
	return this.wincal.onKeyDown(e,o);
}

SgWinCal.prototype.initBody = function initBody() {
	var args = arguments[0] || {}

	var a = { 
		id : this.id+'_content',
		className: 'body-content',
		owner:this.body
	}
	a.className = domHelper.mergeClassName(a.className,'calendar');
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c

	var a ={
		id:this.id+'_appwincal',
		owner:c
	}

	this.controls[a.id] = this.wincal=new IWinCal(a)
}

SgWinCal.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	args.className = domHelper.mergeClassName(args.className, 'window');
	SgWinCal.prototype.base.initControls.call (this,args);
	this.initHead();
	this.initBody();
}

SgWinCal.prototype.init = function init(){
	console.log('asa');
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'sgapp');
	
	SgWinCal.prototype.base.init.call(this,args);

	
}

function ISgWinCal(){
	this.init(arguments[0]);
}

classHelper.register(SgWinCal,ISgWinCal);
