function SgControlContainer(){}

SgControlContainer.prototype.baseClass = 'SgControl';


SgControlContainer.prototype.callback = function callback(e,s,h,l,m){
	
	if (!this[l]) {
		return this.owner.callback(e,s,h,l,m);
	}
}

SgControlContainer.prototype.deactivate = function deactivate(){
	SgControlContainer.prototype.base.deactivate.call(this);
}

SgControlContainer.prototype.lostFocus = function lostFocus(){
	SgControlContainer.prototype.base.lostFocus.call(this);
}

SgControlContainer.prototype.destroy = function destroy(){
	for(var i in this.controls) {
		this.controls[i].destroy();
	}
	SgControl.prototype.destroy.call(this);
}

SgControlContainer.prototype.activate = function activate(){
	SgControlContainer.prototype.base.activate.call(this);
	
}

SgControlContainer.prototype.onFocusChange = function onFocusChange(o){
	//console.log('SgControlContainer.onFocusChange#'+this.id);
	sgApp.onFocusChange(o);
	for (var i in this.controls) {
		if (i != o.id && this.controls[i].focusable && this.controls[i].focused) {
			this.controls[i].setFocus(false);
		}
		
	}
}

SgControlContainer.prototype.innerFocus = function innerFocus(){
	//console.log('SgControlContainer.innerFocus#'+this.id);

	if (this.activeChild===null) {
		this.makeTabsOrder.call(this);
		this.controls[this.activeChild].focus();
	}
	else{
		this.activeChild=0;
	}
}

SgControlContainer.prototype.paint = function paint(){
	SgControlContainer.prototype.base.paint.call(this)
	for (var i in this.controls) {
		this.controls[i].paint();
	}
}

SgControlContainer.prototype.setContent = function setContent(c){
	if (typeof(c)=='string') {
		this.element.innerHTML=c;
	}
	else {
		this.element.appendChild(c);
	}
}

SgControlContainer.prototype.getElement = function getElement(k,o){
	if (k) {
		switch(k){
			case 'controls':
				return this.controls;
			break;
			
		}
	}
	return SgControlContainer.prototype.base.getElement.call(this,k,o);
}

SgControlContainer.prototype.onCmdClick = function append(c){
	if (this.handler) {
		sgApp.appActivate(this.handler);
	}
	else
		sgApp.appActivate(this);
	if (this.owner && this.owner.onCmdClick) {
		this.owner.onCmdClick(arguments[0]);
	}
}

SgControlContainer.prototype.appendChild = function append(c){
	
	 SgControlContainer.prototype.base.appendChild.call(this,c)
	//this.element.appendChild(c.element);
}

SgControlContainer.prototype.remove = function remove() {
	for (var i in this.controls) {
		this.controls[i].remove();
		delete this.controls[i];
	}
	SgControlContainer.prototype.base.remove.call(this);
}

SgControlContainer.prototype.makeTabsOrder = function makeTabsOrder(){
	
	var j=0, last='', actual;
	for (var i in this.controls) {
		var ctrl = this.controls[i];
		if (!ctrl.focusable || !ctrl.focusContext) 
			continue;
		if (!ctrl.focusContext.inter)
			continue;
		this.tabIndexOrder[j]={name:i,next:'',prev:''}
		this.tabOrder[i]=j++;
	}
}

SgControlContainer.prototype.append = function append(c,indom,a){
	this.controls[c.id]=c;
	if(this.tabOrder && !this.tabOrder[c.id] && c.focusable) {
		this.tabOrder[c.id]=this.tabIndexOrder.length;
		this.tabIndexOrder.push(c.id);
		
	}
	if (a) {
		for (var i in a) {
			c[i]=a[i];
		}
	}
	if (!indom) {
		if(c.domParent)
			c.domParent.appendChild(c.getElement())
		else
			this.element.appendChild(c.getElement());
	}
	
	//this.tabOrder.push(c.id);
}

SgControlContainer.prototype.initHead = function initHead(){}

SgControlContainer.prototype.initBody = function initBody(){}

SgControlContainer.prototype.initControls = function initControls(){
}

SgControlContainer.prototype.init = function init(){
	//classHelper.extend(this,SgControlContainer.prototype.protoParent);
	var args = arguments[0] ? arguments[0] : {}
	
	if (!args.controls) args.controls={};
	var needAppend = typeof(args.domParent)=='undefined';
	
	args.activeChild=null;
	args.controlFocus=null;
	//SgControlContainer.prototype.base.init.call(args);
	if (args.owner && needAppend) {
		args.domParent=args.domParent || args.owner.element;
	}
	
	if (!args.tabOrder) args.tabOrder = {};
	if (!args.tabIndexOrder) args.tabIndexOrder = [];

	SgControlContainer.prototype.base.init.call(this,args);
	
	if (this.owner && this.owner.isInstanceOf && this.owner.isInstanceOf('SgControl'))
		this.owner.append(this,needAppend);

	if (typeof(this)!='SgWindow' || this.id=='desktop') {
		this.initControls(this,args);
		//SgWindow.prototype.initControls.call(this,args);
	}		
	//this.initControls(args.controlParams);
	ISgControlContainer.prototype.makeTabsOrder.call(this);
}

function ISgControlContainer(){
	
	this.init(arguments[0]);
//	this.protoParent=ISgControl;
}

classHelper.register(SgControlContainer,ISgControlContainer);
