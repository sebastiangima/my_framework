function SgCaret(){}


SgCaret.prototype.baseClass = 'ISgControlContainer'

SgCaret.prototype.onKeyDown = function onKeyDown(e,o,c){
	alert(e.type)

}

SgCaret.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}

	args.className = domHelper.mergeClassName(args.className, 'sgcaret');
	args.margins = {top:0, bottom:0, left:0, right:0};
	args['margin-left']='3px';
	SgCaret.prototype.base.init.call(this,args);	
}

function ISgCaret(){
	this.init(arguments[0]);
}
classHelper.register(SgCaret,ISgCaret);
