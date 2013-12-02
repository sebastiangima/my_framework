function WinNotePage(){}

WinNotePage.prototype.baseClass='SgControlContainer';

WinNotePage.prototype.getControl = function getElement(k,o){
	switch(k){
		case 'body':
			return this.controls[this.id+'_content'];
		case 'container':
			return this.controls[this.id+'_container'];
	}
	return WinNotePage.prototype.base.getControl.call(this,k,o);
}

WinNotePage.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return WinNotePage.prototype.base.getElement.call(this,k,o);
}

WinNotePage.prototype.onKeyDown = function onKeyDown(e,o){
	switch(e.keyCode) {
		case 37:
		break;
		case 39: 
		break;
	}
}

WinNotePage.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

WinNotePage.prototype.initHead = function initHead(){	

}	

WinNotePage.prototype.onKeyDown = function onKeyDown(e,o) {

}

WinNotePage.prototype.destroy = function destroy(){
	if (this.likeGadget) {
		if (this.element.parentNode==this.owner.element)
			return;
	}
	sgApp.unregisterReference(this);
	SgObject.prototype.destroy.call(this);
}

WinNotePage.prototype.initBody = function initBody(){
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this
	}
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c


	var a = {
		id : this.id+'_container',
		className:'winnotepage-container',
		owner: c,
		state:0
	}
	var d=new ISgControlContainer(a);
	this.controls[a.id] = d
	
		var a = {
		id : this.id+'_header',
		className: 'winnotepage-header',
		innerHTML: this.page,
		owner:d
	}
	var cc=new ISgControlContainer(a);
	this.controls[a.id] = cc
	
	
	var a = {
		id : this.id+'_date',
		className:'winnotepage-date',
		owner: d,
		innerHTML: this.date.getDate()+' '+Culture.getValue('particles',0)+' '+Culture.getValue('shortmonths',this.date.getMonth())+		' '+Culture.getValue('particles',0)+' '+this.date.getFullYear()
	}
	var d=new ISgControlContainer(a);
	this.controls[a.id] = d
	//this.makeGrid();
	return;
}

WinNotePage.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	args.className = domHelper.mergeClassName(args.className, 'window');
	WinNotePage.prototype.base.initControls.call (this,args);

	this.initBody();
	

	
	
	return;
}

WinNotePage.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {},
			this_=this;

	args.active=0;
	args['z-index']=366-args.page;
	args.className = domHelper.mergeClassName(args.className,'winnote-pageleft');
	
	WinNotePage.prototype.base.init.call(this,args);
}

function IWinNotePage(){
	this.init(arguments[0]);
	sgApp.registerReference(this);
}

classHelper.register(WinNotePage,IWinNotePage);
