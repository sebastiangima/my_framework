function SgMenuGroupBox(){}

SgMenuGroupBox.prototype.baseClass='SgControlContainer';
SgMenuGroupBox.prototype.groups;

SgMenuGroupBox.prototype.getControl = function getElement(k,o){
	return SgMenuGroupBox.prototype.base.getControl.call(this,k,o);
}
SgMenuGroupBox.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
	}
	return SgMenuGroupBox.prototype.base.getElement.call(this,k,o);
}

SgMenuGroupBox.prototype.releaseContent = function releaseContent(c){
	for (var i=0; i<this.groups.length; ++i) {
		delete this.groups[i];
	}
	this.groups = [];
}
SgMenuGroupBox.prototype.setContext = function setContext(c){
	var a, c;
	a = {}
	var k=0;
	this.releaseContent();
	var g;
	for (var i in c.groups){
		a = {
			id:this.id+'_'+i,
			className:'menugroup',
			items:c.groups.items,
			owner:this
		}
		g = new ISgMenuGroupBox(s);
		
	
	}
}
SgMenuGroupBox.prototype.setContent = function setContent(content,replace){
}

SgMenuGroupBox.prototype.initHead = function initHead(){
	SgMenuGroupBox.prototype.base.initHead.call (this);
}	

SgMenuGroupBox.prototype.initBody = function initBody(){
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this.body
	}
	this.controls[a.id] = new ISgControlContainer(a);
	
}

SgMenuGroupBox.prototype.newItem = function newItem(id,name){
	var a,d,c;
	a={
		id:id+'_item',
		className:'menuitem',
		owner:this
	}
	c=new ISgControlContainer(a);
	this.controls[c.id]=c;
	
	var a={
		id:id+'_item_ico',
		className:'menuitem-ico',
		owner:c
	}
	d=new ISgControlContainer(a);
	var a={
		id:id+'_item_name',
		innerHTML:name,
		className:'menuitem-name',
		owner:c
	}
	d=new ISgControlContainer(a);
	
	var a={
		id:id+'_item_hotkey',
		className:'menuitem-hotkey',
		owner:c
	}
	d=new ISgControlContainer(a);

	var a={
		id:id+'_item_childs',
		className:'menuitem-childs',
		owner:c
	}
	
	d=new ISgControlContainer(a);
	return c;
}
SgMenuGroupBox.prototype.initControls = function initControls(){
	var args = arguments[0] ? arguments[0] : {}
	
	SgMenuGroupBox.prototype.base.initControls.call (this,args);
	var c;
	for (var i=0; i<this.items.length; ++i) {
		c = this.newItem(this.id+'_'+this.items[i].name,this.items[i].name);
		this.controls[c.id]=c;
	}
	return;
}

SgMenuGroupBox.prototype.init = function init(){

	this.groups=[];
	var args = arguments[0] ? arguments[0] : {};
	args.controlParams=args.items;
	args.className = domHelper.mergeClassName(args.className,'menugroup');

	SgMenuGroupBox.prototype.base.init.call(this,args);

	
}
function ISgMenuGroupBox(){
	this.init(arguments[0]);
}

classHelper.register(SgMenuGroupBox,ISgMenuGroupBox);
