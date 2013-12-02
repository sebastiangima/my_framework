
var _instance=0;
function SgButtonBox(){}

SgButtonBox.prototype.baseClass='SgControlContainer'

SgButtonBox.prototype.releaseContent = function releaseContent(ids){
	for (var i=0; i<ids.length; ++i) {
		this.controls[ids[i]].element.parentNode.removeChild(this.controls[ids[i]].element);
		delete this.controls[ids[i]];
	}
}

SgButtonBox.prototype.getContainer = function getContainer(){
	
	return this.getElement('content');
}

SgButtonBox.prototype.setContent = function setContent(content){
	var e = this.getElement('content');
	e.innerHTML = content;
}

SgButtonBox.prototype.setFocus = function focus(c){
	if (this.controls[c.id]) {
		sgApp.appActivate(c);
		this.controls[c.id].element.parentNode.appendChild(this.controls[c.id].element);
	}
}

SgButtonBox.prototype.lostFocus = function lostFocus(){
	SgButtonBox.prototype.base.lostFocus.call(this);
	
}

SgButtonBox.prototype.focus = function focus(){
	SgButtonBox.prototype.base.focus.call(this);
	if (this.owner) {
		this.owner.setFocus(this);
	}
}

SgButtonBox.prototype.getElement = function getElement(k,o){
	switch (k) {
		case 'content': return document.getElementById(this.id+'_content');
		break;
	}
	return SgButtonBox.prototype.base.getElement.call(this,k,o);
}

SgButtonBox.prototype.activate = function activate(e,o,m){
	// if (!this.handler)
		// this.alert(
	this.handler.onCmdClick(e,o,{msg:'onToolBox',ctrl:this});
	return cancelEvent(e);
}
SgButtonBox.prototype.initHead = function initHead(){
}

SgButtonBox.prototype.initBody = function initBody(){
	var this_=this;
	for (var i=0; i<this.items.length; ++i) {
		a = this.items[i];
		a.owner=this;
		a.id = this.id+'_button_'+i;
		a.onmousedown = function(){
			return this_.onBubbles(arguments[0],arguments[1],{msg:'activate'});
		}
		this.controls[a.id]=new ISgControlContainer(a);
	}
}

SgButtonBox.prototype.onCmdClick = function onCmdClick(e,o){
	return this.owner.onCmdClick(e,o,{msg:'onToolBox',ctrl:this});
}

SgButtonBox.prototype.initTail = function initTail(){
}

SgButtonBox.prototype.initControls = function initControls(){
	var this_=this;
	SgButtonBox.prototype.base.initControls.call(this);
	// var a={
		// id:this.id+'_container',
		// className:'panel-container',
		// creator:'SgButtonBox',
		// instance:++_instance,
		// owner: this
	// }
	// var c=new ISgControlContainer(a);
	this.initBody();

}

SgButtonBox.prototype.paint = function paint(){
	SgButtonBox.prototype.base.paint.call(this)
}	

SgButtonBox.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	args.className = domHelper.mergeClassName(args.className, 'sgbuttonbox');

	var this_=this;
	
	SgButtonBox.prototype.base.init.call(this,args);

	
	
}

function ISgButtonBox(){
	this.init(arguments[0])
}

SgButtonBox=classHelper.register(SgButtonBox,ISgButtonBox);

