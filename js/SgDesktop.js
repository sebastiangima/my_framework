function SgDesktop(){}

SgDesktop.prototype.baseClass='SgControlContainer'


SgDesktop.prototype.setFocus = function setFocus(){

}
SgDesktop.prototype.initControls = function initControls(){

		this.head=SgDesktop.prototype.initHead.call(this,arguments[0]);
		this.body=SgDesktop.prototype.initBody.call(this,arguments[0]);
//		this.tail=SgDesktop.prototype.initTail.call(this,arguments[0]);

}

SgDesktop.prototype.paint = function paint(){
	SgDesktop.prototype.base.paint.call(this)
}	

SgDesktop.prototype.init = function init(){

	var args = arguments[0] ? arguments[0] : {}
	
	args.onmousedown=function(){
		if (arguments[0].currentTarget && arguments[0].currentTarget.id=='desktop')
			sgApp.appActivate(sgApp.desktop);
		else if (arguments[0].srcElement && arguments[0].srcElement.id=='desktop')
			sgApp.appActivate(sgApp.desktop);
	}
	
	args.className = domHelper.mergeClassName(args.className, 'window');
	args.owner=null;
	
	SgDesktop.prototype.base.init.call(this,args);
	var sg = this.element.sg;

	if (this instanceof ISgDesktop) {
		var this_=this;
		if (!sg) sg = {};
		sg.context={
			name:this.constructor.name,
			id:this.id,
			instance:this
		};
		
		
		this.element.sg = sg;
	}	
	//SgDesktop.prototype.initControls.call(args);
	
	
}

function ISgDesktop(){
	this.init(arguments[0])
}

SgDesktop=classHelper.register(SgDesktop,ISgDesktop);


