function SgUI(){}

SgUI.prototype.defaults={

}

SgUI.prototype.baseClass='SgAppPanelWin';

SgUI.prototype.getElement = function getElement(k,o){
	return SgUI.prototype.base.getElement.call(this,k,o);
}

SgUI.prototype.getControl = function getElement(k,o){
	return SgUI.prototype.base.getControl.call(this,k,o);
}

SgUI.prototype.onCmdClick = function onCmdClick(e,o,m){
	var msg = arguments[0] ? arguments[0].msg : '';
	switch (m.msg) {
		case 'onToolBox':
			console.log(m.ctrl.id);
		default:
		break;
	}
	//return SgUI.prototype.base.onCmdClick.call(this,arguments[0],arguments[1])

}

SgUI.prototype.initBody = function initBody(){
	//SgUI.prototype.base.initBody.call(this,args);
	var buttonBox;
	var a = {
		constr:ISgButtonBox,
		params:{
			id:'buttonbox',
			className:'vertical',
			handler:this,
			items:[{title:'table'}]
		}
	}
	
	this.addToPanel('left',a);
	return;
	a={
		id: this.id+'_'+'buttonBox',
		className:'vertical',
		owner:this.getControl('leftpanel'),
		handler:this
	}
	buttonBox = new ISgButtonBox(a);
	
}

SgUI.prototype.initControls = function initControls(){
	var args = arguments[0] || {};
	
	SgUI.prototype.base.initControls.call(this,args);
	this.initBody();
}

SgUI.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};
	
	var items = args.items;
	delete	args.items;

	SgUI.prototype.base.init.call(this,args);
	
	
}

function ISgUI(){
	this.init(arguments[0]);
}

classHelper.register(SgUI,ISgUI);
