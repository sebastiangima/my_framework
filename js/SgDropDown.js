function SgDropDown(){}

SgDropDown.prototype.baseClass='SgControlContainer';

SgDropDown.prototype.getControl = function getElement(k,o){
	return SgDropDown.prototype.base.getControl.call(this,k,o);
}
SgDropDown.prototype.getElement = function getElement(k,o){
	switch(k) {
		case 'items': return document.getElementById(this.id+'_items'); break;
		case 'input': return document.getElementById(this.id+'_drop_down_input_content'); break;
		
	}
	return SgDropDown.prototype.base.getElement.call(this,k,o);
}

SgDropDown.prototype.setContent = function setContent(content,to){
}

SgDropDown.prototype.initHead = function initHead(){
}

SgDropDown.prototype.initBody = function initBody(){	
}

SgDropDown.prototype.onDropDownClick = function onDropDownClick(e,o){
	this.toogle(this.element,'state');
}
SgDropDown.prototype.onOptionClick = function onOptionClick(e,o,n){
	if (typeof(n)=='undefined') n=o.getAttribute('n');
	var items= this.getElement('items').children;
	for (var i=0; i<items.length; ++i) {
		if (items[i].getAttribute('n')==n)
			toogle2(e,items[i].children[0],'state')
	}
	this.items[n].selected=typeof(this.items[n].selected)=='undefined'?true:!this.items[n].selected;
	this.refreshSelection();
}
SgDropDown.prototype.getSelectedValues = function getSelectedValues(){
	var r=[];
	for (var i=0; i<this.items.length; ++i) {
		if (this.items[i].selected)
			r.push(this.items[i].value);
	}
	return r;
}
SgDropDown.prototype.refreshSelection = function refreshSelection(){
	var s='';
	for (var i=0; i<this.items.length; ++i) {
		if (this.items[i].selected) {
			if (s) s+=', ';
			s+=this.items[i].value;
		}
	}
	this.selectedValue=s;
	var e=this.getElement('input');
	e.title=s;
	e.innerHTML=s	;
	
}
SgDropDown.prototype.initControls = function initControls(){
	//return;
	
	var this_=this;
	var a ={
		id:this.id+'_drop_down_input',
		className:'drop-down-input',
		owner:this
	}
	var c = new ISgControlContainer(a);
	this.controls[a.id]=c;

	var a ={
		id:this.id+'_drop_down_input_content',
		className:'drop-down-input',
		owner:c
	}
	this.controls[a.id] = new ISgControlContainer(a);
	
	
	var a ={
		id:this.id+'_drop_button',
		className:'drop-button',
		owner:c,
		onclick:function () {return this_.onDropDownClick()}
	}	
	var c = new ISgControlContainer(a);
	this.controls[a.id]=c;

	
	var a ={
		id:this.id+'_items_box',
		className:'items-box',
		owner:this
	}
	var c = new ISgControlContainer(a);
	this.controls[a.id]=c;
	
	var a ={
		id:this.id+'_items',
		className:'items',
		owner:c
	}
	var cp = new ISgControlContainer(a);
	this.controls[a.id]=cp;
	
	for (var i=0; i<this.items.length; ++i) {
		var a = {
			n:i,
			id:this.id+'_option_'+this.items[i].id,
			innerHTML:this.items[i].value,
			owner:cp,
			onclick:function() {return this_.onOptionClick(arguments[0],arguments[1])}
		}
		var c = new ISgControlContainer(a);
		this.controls[a.id]=c;
		
		var cc = domHelper.div({id:a.id_, n:i, className:'drop-check', state:0,
				onclick:function() {return this_.onOptionClick(arguments[0],arguments[1])}});
		c.appendChild(cc);
	}

	
	return;
}

SgDropDown.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'drop-down');
	if (!args.items) args.items=[];

	args.state=0;
	SgDropDown.prototype.base.init.call(this,args);
	
	
	
}
function ISgDropDown(){
	this.init(arguments[0]);
}

classHelper.register(SgDropDown,ISgDropDown);
