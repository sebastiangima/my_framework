function SgUrlBar(){}

SgUrlBar.prototype.baseClass='SgControlContainer';

SgUrlBar.prototype.getControl = function getElement(k,o){
				switch (k) {
				case 'urlbar': return this.controls[this.head.id+'_url']; break;
				}
}
SgUrlBar.prototype.getElement = function getElement(k,o){
	return SgUrlBar.prototype.base.getElement.call(this,k,o);
}

SgUrlBar.prototype.onDropClick = function onDropClick(e,o){
	var r=[];
	while(o) {
		r.push(o.innerHTML);
		o=o.previousSibling;
	}
	var childs=directory.getChildDirs(r);
	alert(childs);
}

SgUrlBar.prototype.newDrop = function newDrop(n){
	var d=domHelper.div();
	var this_=this;
	var a = {
			className:'url-drop',
			innerHTML:n,
			onclick:function(){
				this_.onDropClick(arguments[0],arguments[1]);
			}
		}
	
	domHelper.mapToElement(d,a);
	return d;
}

SgUrlBar.prototype.setURL = function setURL(){
	var args = arguments[0];
	
	this.element.innerHTML='';
	
	if (args instanceof String) {
	}
	else if (args instanceof Array) {
		for (var i=0; i<args.length; ++i) {
			var d = this.newDrop(args[i]);
			this.element.appendChild(d);
		}
	}
}
SgUrlBar.prototype.initControls = function initControls(){
	
	SgUrlBar.prototype.base.initControls.call(this)
	
	return;
}

SgUrlBar.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};

	var this_=this;
	
	args.className = domHelper.mergeClassName(args.className,'urlbar');

	SgUrlBar.prototype.base.init.call(this,args);
	
}
function ISgUrlBar(){
	this.init(arguments[0]);
}

classHelper.register(SgUrlBar,ISgUrlBar);
