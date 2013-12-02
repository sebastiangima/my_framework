function SgInput(){}


SgInput.prototype.baseClass = 'ISgFocusable'


SgInput.prototype.focus = function focus(){
	SgInput.prototype.base.focus.call(this);
}

SgInput.prototype.lostFocus = function lostFocus(){
	SgInput.prototype.base.lostFocus.call(this);
}

SgInput.prototype.next = function next(){
	this.hanlder.requestAction({action:'blur',sender:this, impulse:'tab',direction:1});
}

SgInput.prototype.prev  = function prev(){
	this.hanlder.requestAction({action:'blur',sender:this, impulse:'tab',direction:-1});
}

SgInput.prototype.initControls = function initControls(){

	var args = arguments[0] || {controlParams:{body:{},head:{}}};
	SgInput.prototype.base.initControls.call(this,args);
	return;


}

SgInput.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	var this_=this;

	args.className = domHelper.mergeClassName(args.className, 'sginput');
	
	SgInput.prototype.base.init.call(this,args);	
}

function ISgInput(){
	this.init(arguments[0]);
}

classHelper.register(SgInput,ISgInput);
