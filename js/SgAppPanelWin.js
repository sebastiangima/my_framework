function SgAppPanelWin(){}

SgAppPanelWin.prototype.defaults={

}

SgAppPanelWin.prototype.baseClass='SgAppWin';

SgAppPanelWin.prototype.getElement = function getElement(k,o){
	return SgAppPanelWin.prototype.base.getElement.call(this,k,o);
}

SgAppPanelWin.prototype.getControl = function getElement(k,o){
	var baseId=this.body.id.replace(/_centerpanel/,'');
	switch (k) {
		case 'urlbar': return this.controls[this.head.id+'_url']; break;
		
		case 'body': 
		return this.controls[this.body.id]; break;
		case 'centerpanel': 
			return this.controls[baseId+'_centerpanel']; break;
		
		case 'content': 
			return this.controls[baseId+'_centerpanel_content']; break;

		case 'panels': return this.controls[baseId+'_hpanel']; break;
		case 'bottompanel': return this.controls[baseId+'_bottompanel']; break;
		case 'leftpanel': return this.controls[baseId+'_leftpanel']; break;
		case 'rightpanel': return this.controls[baseId+'_rightpanel']; break;
	}
}

SgAppPanelWin.prototype.addToPanel = function addToPanel(panel,args){
	var p = this.getControl(panel+'panel');
	p.addToContent(args);
}

SgAppPanelWin.prototype.onDockResize = function onDockResize(from,state){
	if (from == 'bottom') {
		var panels = [
			this.getControl('centerpanel'),
			this.getControl('leftpanel'),
			this.getControl('rightpanel')
		]
		for (var i=0; i<panels.length; ++i) {
		if(state=="1") {
			panels[i].element.style[from]='150px';
			panels[i].element.style.top='0px';
			panels[i].element.style.height='auto';
			}
		else 
			panels[i].element.style[from]='6px';
		}
	}
	else {
		var panel = this.getControl('centerpanel');
		if (from=='left') {
			if(state=="1") {
				var pp=this.getControl('leftpanel');
		//		panel.element.style.width=panel.element.clientWidth-panel.element.offsetLeft+'px';
				panel.element.style[from]=pp.element.clientWidth+'px';
				//panel.element.style.width='auto';
				}
			else {
				var pp=this.getControl('leftpanel');
			//	panel.element.style.width=panel.element.clientWidth+panel.element.offsetLeft+'px';
				
				panel.element.style[from]='6px';
				pp.element.style.left=-pp.element.clientWidth+'px';
				//panel.element.style.right=-this.getControl('rightpanel').element.getClientRects()[0].width;
				//panel.element.style.width='100%';
				
			}
		}
		else {
			if (state == '1') {
				var pp=this.getControl('rightpanel');
				panel.element.style[from]=pp.element.clientWidth+'px';
				panel.element.style.width='auto';
				//panel.element.style.width=panel.clientWidth+pp.element.clientWidth+'px';
			}
			else {
				panel.element.style[from]='6px';
				panel.element.style.width='auto'
				var pp=this.getControl('rightpanel');
				pp.element.style.right=-pp.element.clientWidth+'px';
			}
		}
	}
}

SgAppPanelWin.prototype.onResizePanel = function onResize(c){
	var from = c.onResizeData.rtype;
	switch(from){
		case 'left':
			var el=this.getControl('leftpanel').element;
			el.style.width=c.element.offsetLeft+'px';
			//c.element.style.width='auto'
		break;
		case 'right':
			var p=this.getControl('rightpanel').element;
			p.style.width=p.getClientRects()[0].right -c.element.getClientRects()[0].right
				+'px';
		break;
	}
}

SgAppPanelWin.prototype.paint = function paint(){
	var h=0;
	if (this.menu) {
		h+=this.menu.getv('height');
	}
	if (this.toolbar) {
		h+=this.menu.getv('height');
	}
	
	this.getControl('panels').setv({top:h+'px'});
}

SgAppPanelWin.prototype.onCmdClick = function onCmdClick(){
	if (arguments.length==3) {	//e,o,{msg,ctrl}
		return this.owner.onCmdClick(arguments[0],arguments[1].arguments[2]);
	}
	
	var msg = arguments[0] ? arguments[0].msg : '';
	switch (msg) {
		case 'onDockResize':
			return this.onDockResize(arguments[0].from,arguments[0].state);
		break;
		case 'navigateTo':
			return this.navigateTo(arguments[0].event,arguments[0].target);
		
		break;
	}
	return SgAppPanelWin.prototype.base.onCmdClick.call(this,arguments[0],arguments[1])

}

SgAppPanelWin.prototype.initBody = function initBody(){
	var args = arguments[0] || {}
	args.menu = {
		id : this.id+'_menu',
		className: 'general-menu',
		owner:this.body,
		handler:this,
		items:npmenu
	}

	args.toolbars1 = [{
		id : this.id+'_toolbar',
		className: 'general-menu',
		owner:this.body,
		handler:this,
		items:nptoolbar
	}]
	

	if (args.menu) {
		this.menu = new ISgAppMenu(args.menu);
		this.controls[args.menu.id] = this.menu;
	}
	if (args.toolbars) {
		if (args.toolbars instanceof Array && args.toolbars.length==1) {
			this.toolbar= new ISgAppMenu(args.toolbars[0])
		}
		else {
			this.toolbar= new ISgAppMenu(args.toolbars)
		}
		this.controls[this.toolbar.id] = this.toolbar;
	}

	var a={
		id:this.body.id+'_hpanel',
		className:'horizontal',
		creator:'SgAppPanelWin',
		handler:this,
		
		instance:++_instance,
		owner: this.getControl('body')
	}
	var hp=	new ISgControlContainer(a);
	this.controls[a.id]=hp
		
//hp=this.body
	var a={
		id:this.body.id+'_centerpanel',
		className:'center',
		creator:'SgAppPanelWin',
		resizers:['left','right'],
		instance:++_instance,
		owner: hp,
		handler:this
	}
	this.controls[a.id]=new ISgPanel(a);
	
	var a={
		id:this.body.id+'_leftpanel',
		className:'left',
		docked:1,
		creator:'SgAppPanelWin',
		instance:++_instance,
		owner: hp,
		handler:this
	}
	this.controls[a.id]=new ISgPanel(a);
	this.onDockResize('left',1);
	var a={
		id:this.body.id+'_rightpanel',
		className:'right',
		creator:'SgAppPanelWin',
		instance:++_instance,
		owner: hp,
		handler:this
	}
	this.controls[a.id]=new ISgPanel(a);
	
	var a={
		id:this.body.id+'_bottompanel',
		className:'bottom',
		creator:'SgAppPanelWin',
		instance:++_instance,
		owner: this.body,
		handler:this
	}
	this.controls[a.id]=new ISgPanel(a);

}

SgAppPanelWin.prototype.initControls = function initControls(){
	
	var d = domHelper.div();
	var args={controlParams:{head:{className:'explorer'},body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};	
	SgAppPanelWin.prototype.base.initControls.call(this,args);
	this.body.owner = this;
	var args = arguments[0] ? arguments[0] : {};
	SgAppPanelWin.prototype.initBody.call(this,args);
	this.paint();
}

SgAppPanelWin.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};
	
	var items = args.items;
	delete	args.items;

	for (var i in SgAppPanelWin.prototype.defaults) 
		if (!args[i]) args[i] = SgAppPanelWin.prototype.defaults;
	//args.menu = null;
	//args.toolbar = null;
	SgAppPanelWin.prototype.base.init.call(this,args);
	
	
}

function ISgAppPanelWin(){
	this.init(arguments[0]);
}

classHelper.register(SgAppPanelWin,ISgAppPanelWin);
