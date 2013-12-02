function SgMenu(){}

SgMenu.prototype.protoParent=new ISgObject();

SgMenu.prototype.getElement = function getElement(){
	
}
SgMenu.prototype.init = function init(){
	ClassHelper.extend(this,this.protoParent);
	
	var args = arguments[0] ? arguments[0] : {}
	this.protoParent.init.call(this,args);
}

function ISgMenu(){
	var e = domHelper.div();
	this.sgset=function (){
		alert('403 - Forbidden, you have not enought privilegies');
	}
	this.sgget=function (){
		return e;
	}
	this.init(arguments[0]);
	alert(this.id)
}
ISgMenu.prototype=new SgMenu();
