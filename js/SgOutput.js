function SgOutput(){}

SgOutput.prototype.baseClass='SgAppWin';

SgOutput.prototype.getControl = function getElement(k,o){
	return SgOutput.prototype.base.getControl.call(this,k,o);
}
SgOutput.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return SgOutput.prototype.base.getElement.call(this,k,o);
}

SgOutput.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

SgOutput.prototype.initHead = function initHead(){
	SgOutput.prototype.base.initHead.call (this);
}	

SgOutput.prototype.initBody = function initBody(){
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this.body
	}
	this.controls[a.id] = new ISgControlContainer(a);
	
}

SgOutput.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	SgOutput.prototype.base.initControls.call (this,args);
	SgOutput.prototype.initBody.call (this);
	
	
	return;
}

SgOutput.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'sgapp Output');

	SgOutput.prototype.base.init.call(this,args);

	
}
function ISgOutput(){
	this.init(arguments[0]);
}

classHelper.register(SgOutput,ISgOutput);
