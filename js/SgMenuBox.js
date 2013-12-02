function SgMenuBox(){}

SgMenuBox.prototype.baseClass='SgControlContainer';
SgMenuBox.prototype.groups;

SgMenuBox.prototype.getControl = function getElement(k,o){
	return SgMenuBox.prototype.base.getControl.call(this,k,o);
}
SgMenuBox.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
	}
	return SgMenuBox.prototype.base.getElement.call(this,k,o);
}


SgMenuGroupBox.prototype.releaseContent = function releaseContent(c){
	for (var i=0; i<this.groups.length; ++i) {
		delete this.groups[i];
	}
	this.groups = [];
}

SgMenuBox.prototype.setContext = function setContext(c){
	var a, c;
	a = {}
	var k=0;
	
	for (var i in this.controls) {
		this.controls[i].remove(i);
	}		
	this.controls={};
	var g;
	
	for (var i=0; i<c.groups.length; ++i) {
		a = {
			id:this.id+'_'+c.groups[i].name,
			items:c.groups[i].items,
			owner:this
		}
		g = new ISgMenuGroupBox(a);
		this.controls[g.id]=g;
	}
}
SgMenuBox.prototype.setContent = function setContent(content,replace){
}

SgMenuBox.prototype.initControls = function initControls(){
	var args = arguments[0] ? arguments[0] : {}
	
	SgMenuBox.prototype.base.initControls.call (this,args);
	return;
}

SgMenuBox.prototype.init = function init(){

	this.groups=[];
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'menubox');

	SgMenuBox.prototype.base.init.call(this,args);

	
}
function ISgMenuBox(){
	this.init(arguments[0]);
}

classHelper.register(SgMenuBox,ISgMenuBox);
