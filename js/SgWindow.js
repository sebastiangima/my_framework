var _instance=0;
function SgWindow(){}

SgWindow.prototype.baseClass='SgControlContainer'



SgWindow.prototype.setFocus = function setFocus (c){
	////console.log('SgWindow.setFocus#'+this.id);
	if (this.controls[c.id]) {
		sgApp.appActivate(c);
		this.controls[c.id].element.parentNode.appendChild(this.controls[c.id].element);
	}
}
SgWindow.prototype.deactivate = function deactivate(){
	//console.log('SgWindow.deactivate#'+this.id);
	SgWindow.prototype.base.deactivate.call(this);
	
}

SgWindow.prototype.lostFocus = function lostFocus(){
	//console.log('SgWindow.lostFocus#'+this.id);
	SgWindow.prototype.base.lostFocus.call(this);
	
}

SgWindow.prototype.paint = function paint(){
	SgWindow.prototype.base.paint.call(this)
}	

SgWindow.prototype.setInnerFocus = function focus(){
	//console.log('SgWindow.setInnerFocus#'+this.id);
	var active = arguments[0];
	
	if (this.activeChild===null) 
		this.makeTabsOrder();
	
	if (active===null || typeof(active)=='undefined') {
		
	}
	
	this.activeChild=active || 0;
	
	if (!this.tabIndexOrder[this.activeChild]) 
		return;
	var id=this.tabIndexOrder[this.activeChild].name;
	this.controls[id].focus('inner');
}

SgWindow.prototype.activate = function activate(){
	//console.log('SgWindow.activate#'+this.id);
	if (this.isActive) {
		this.setInnerFocus(this.activeChild);
		return false;
	}
	SgWindow.prototype.base.activate.call(this);
	if (this.owner) {

		this.owner.setFocus(this);
	}
	
	if (arguments[0]) {
	  arguments[0].preventDefault();
    arguments[0].stopPropagation();
	}
	return false;
}

SgWindow.prototype.focus = function focus(){
	//console.log('SgWindow.focus#'+this.id);
	if (this.onFocus) {
		this.setInnerFocus(this.activeChild);
		//return false;
	}
	SgWindow.prototype.base.focus.call(this);
	if (this.owner) {

		this.owner.setFocus(this);
	}
	
	if (arguments[0]) {
	  arguments[0].preventDefault();
    arguments[0].stopPropagation();
	}
	return false;
}

SgWindow.prototype.getElement = function getElement(k,o){
	return SgWindow.prototype.base.getElement.call(this,k,o);
}

SgWindow.prototype.initHead = function initHead(){
	var container={
		id:this.id+'_head_container',
		className:'general head container',
		creator:'SgWindow',
		handler:this,
		ondblclick:function(){
			var btn=arguments[1].getElementsByClassName('sgcmdbar-btn');
			if (!btn.length) btn =arguments[1].parentNode.getElementsByClassName('sgcmdbar-btn');
			if (!btn.length) btn =arguments[1].parentNode.parentNode.getElementsByClassName('sgcmdbar-btn');
			for (var i=0; i<btn.length; ++i) {
				if (btn[i].className.indexOf('maximize')>=0) {
					btn[i].click();
					break;
				}
					
			}
			return cancelEvent(arguments[0]);
			
		},
		instance:++_instance,
		owner:this
	}
	this.head=this.controls[container.id]=new ISgControlContainer(container);
	return this.controls[container.id];
}

SgWindow.prototype.initBody = function initBody(){
	var this_=this;
	var container={
		id:this.id+'_body_container',
		className:'body container',
		creator:'SgWindow',
		focusable:false,
		onclick:function(){
			//sgApp.focusChange();
			if (!this_.isActive)
				this_.activate(arguments[0],arguments[1]);
			toLocalStorage(this_,'CONTROL');
		},
		owner:this
	}
	this.body=this.controls[container.id]=new ISgControlContainer(container);
	return this.controls[container.id];
}

SgWindow.prototype.initTail = function initTail(){
	var container={
		id:this.id+'_tail_container',
		className:'tail container',
		creator:'SgWindow',
		owner:this
	}
	this.controls[container.id]=new ISgControlContainer(container);
	return this.controls[container.id];
}

SgWindow.prototype.initControls = function initControls(){

		var args = arguments[0] || {controlParams:{body:{},head:{}}};
		// this.head=this.initHead(args.controlParams.head);
		// this.body=this.initBody(args.controlParams.body);
	//	if (typeof(this) =='SgWindow') {
		
		this.head=SgWindow.prototype.initHead.call(this,args);
		this.body=SgWindow.prototype.initBody.call(this,args);
		this.tail=SgWindow.prototype.initTail.call(this,args);
//		 }
	//	}
}

SgWindow.prototype.init = function init(){

	var args = arguments[0] ? arguments[0] : {}
	args.className = domHelper.mergeClassName(args.className, 'window');
	args.focusable=true;

	SgWindow.prototype.base.init.call(this,args);
	// if (typeof(this)!='SgWindow' || this.id=='desktop') {
		// this.initControls(this,args);
		// //SgWindow.prototype.initControls.call(this,args);
	// }
	
	//this.initControls.call(this,args);
	//SgWindow.prototype.initControls.call(this,args);
}

function ISgWindow(){
	this.init(arguments[0])
}

SgWindow=classHelper.register(SgWindow,ISgWindow);


