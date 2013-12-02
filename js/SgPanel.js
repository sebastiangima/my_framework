
var _instance=0;
function SgPanel(){}

SgPanel.prototype.baseClass='SgControlContainer'

SgPanel.prototype.callback = function callback(e,o,m){
	if (!this.isActive)
		this.focus();
	this.owner.callback(e,o,m);
}
SgPanel.prototype.releaseContent = function releaseContent(ids){
	for (var i=0; i<ids.length; ++i) {
		this.controls[ids[i]].element.parentNode.removeChild(this.controls[ids[i]].element);
		delete this.controls[ids[i]];
	}
}
SgPanel.prototype.getContainer = function getContainer(){
	
	return this.getElement('content');
}

SgPanel.prototype.addToContent = function addToContent(){
	return this.makeContent(arguments[0]);
}

// arguments[0].constructor arguments[1].params
SgPanel.prototype.makeContent = function makeContent(){
	var args = {};
	for (var i in arguments[0].params) {
		switch(i) {
			default:
				args[i]=arguments[0].params[i];
			break;
		}
	}
	args.parentNode = this.getElement('content');
	args.id = this.id+'_'+args.id;
	args.id = this.id+'_'+args.id;
	args.owner = this;
	
	this.controls[args.id]=new arguments[0].constr(args);
	
	return this.controls[args.id];
}
SgPanel.prototype.setContent = function setContent(content){
	var e = this.getElement('content');
	e.innerHTML = content;
}

SgPanel.prototype.setFocus = function focus(c){
	if (this.controls[c.id]) {
		sgApp.appActivate(c);
		this.controls[c.id].element.parentNode.appendChild(this.controls[c.id].element);
	}
}
SgPanel.prototype.lostFocus = function lostFocus(){
	SgPanel.prototype.base.lostFocus.call(this);
	
}
SgPanel.prototype.onMouseUp = function onMouseUp(e,o,m){
	if (e.button==2)
		alert(2);
	return;
	var top = this.element.offsetTop+this.element.clientTop;
	var left = this.element.offsetLeft+this.element.clientLeft;

	if (this.position.resize) {
			this.saveBox('resized');
			var box=this.getBox();
		
		this.element.style.marginLeft='0px';
		this.element.style.marginTop='0px';
		
		this.element.style.top = this.toRedim.offsetTop+'px';
		this.element.style.left = this.toRedim.offsetLeft+'px';
		this.element.style.height = this.toRedim.clientHeight+'px';

		this.element.style.width = this.toRedim.clientWidth+'px';
		this.toRedimContainer.setAttribute('active','0');
			this.saveBox('dragged');
	}
	else {
		var box=this.getBox();
		//if (!this.box) this.box=box;
		var initial=this.boxs.initial;
		if (this.lastAction=='dragged' || this.lastAction=='resized') {
			
			var ml=+box.styles.margins.left.replace(regexcssval,''),
				mt=+box.styles.margins.top.replace(regexcssval,'')

			
				
				var cl0=+initial.computed.coord.left.replace(regexcssval,'');
				var ct0=+initial.computed.coord.top.replace(regexcssval,'');
				var cl1=+box.computed.coord.left.replace(regexcssval,'');
				var pl0=+initial.stylesApplied.coord.left.replace(regexcssval,'');
				var pt0=+initial.stylesApplied.coord.top.replace(regexcssval,'');

				
				
				var ancho = 100*cl0/pl0;
				var alto = 100*ct0/pt0;
				var pleft = left*100/ancho;
				var ptop = top*100/alto;

		
				
				this.element.style.left=pleft+'%';
				this.element.style.marginLeft='0px';
				this.element.style.top=ptop+'%';
				this.element.style.marginTop='0px';

			var cw0=+initial.computed.size.width.replace(regexcssval,'');
			var pw0=+initial.stylesApplied.size.width.replace(regexcssval,'');
			var cw1=this.element.clientWidth;
			var ch0=+initial.computed.size.height.replace(regexcssval,'');
			var ph0=+initial.stylesApplied.size.height.replace(regexcssval,'');
			var ch1=this.element.clientHeight;
			var height = ch1 * 100 / alto;
			var width = cw1 * 100 / ancho;
				this.element.style.height=height+'%';
				this.element.style.width=width+'%';
				this.saveBox('dragged');
				this.saveBox('resized');
				this.saveBox('docked');
			
		}
		else if (this.lastAction=='resized') {

			//var ancho = 100*cl0/pl0;
			
		}
		// if (this.element.className.indexOf('docked')>=0) {
			// this.saveBox('docked');
			// this.saveBox('dragged');
			// }
		// else {
			// //this.element.style.left = this.boxs.dragged.stylesApplied.coord.left;
			// this.saveBox('dragged');
			// this.saveBox('resized');
		// }
	}
}

SgPanel.prototype.resize = function resize(e,o,m){
	SgControl.prototype.resize.call(this,e,o,m);
	this.handler.onResizePanel(this);
}
SgPanel.prototype.focus = function focus(){
	SgPanel.prototype.base.focus.call(this);
	if (this.owner) {
		this.owner.setFocus(this);
	}
}

SgPanel.prototype.onResize = function onResize(e,o,m){
	this.action='resize';
	this.lastAction='resized';
	var type = this.element.className.replace(/.*(left|right|bottom|center).*/,'$1');
	this.onResizeData = {
		origen:{top:e.clientY, left:e.clientX},
		top: o.offsetTop,
		left: o.offsetLeft,
		stop: ('' || o.style.top).replace(regexcssval,''),
		sleft: ('' || o.style.left).replace(regexcssval,''),
		mleft: ('' || o.style.marginLeft).replace(regexcssval,''),
		mtop: ('' || o.style.marginTop).replace(regexcssval,''),
		rect:this.element.getClientRects(),
		oleft:this.element.offsetLeft,
		rtype:o	.className.replace(/.*(left|right|bottom|center).*/,'$1')
	}
	var p=this.element;
	var ol=0;
//	p=p.parentNode;
	while (p && p != document.body) {
		ol += p.offsetLeft;
		p=p.parentNode;
	}
	
	this.onResizeData.prect=[{left:ol}];
	
	this.startResize(e,o,m);	
	if (e) {
		if (e.stopPropagation) 
			e.stopPropagation();
		e.cancelBubble=true;	}
	return true;
	
}

SgPanel.prototype.getElement = function getElement(k,o){
	switch (k) {
		case 'content': return document.getElementById(this.id+'_content');
		break;
	}
	return SgPanel.prototype.base.getElement.call(this,k,o);
}

SgPanel.prototype.initHead = function initHead(){
}
SgPanel.prototype.initBody = function initBody(){
}
SgPanel.prototype.onCmdClick = function onCmdClick(e,o,m){
	//this.owner.onCmdClick(e,o);.
	if (m) {
		return this.owner.onCmdClick(e,o,m);
	}
	this.toogle(e,'docked');
	var v=this.element.getAttribute('docked');
	if (this.element.className.indexOf('left')>=0)
		this.owner.onCmdClick({msg:'onDockResize',from:'left',state:v});
	else	if (this.element.className.indexOf('right')>=0)
		this.owner.onCmdClick({msg:'onDockResize',from:'right',state:v});
	else	if (this.element.className.indexOf('bottom')>=0)
		this.owner.onCmdClick({msg:'onDockResize',from:'bottom',state:v});
}

SgPanel.prototype.activate = function activate(e,o,m){
	if (o.className && o.className.indexOf('panel-button')>=0)
		this.onCmdClick(e,o);
	//SgPanel.prototype.activate.call(this,e,o,m);
}

SgPanel.prototype.initTail = function initTail(){
}

SgPanel.prototype.initResizers = function initResizers(){
	var this_=this;
	if (this.resizers && this.resizers.length) {
		for (var i=0; i<this.resizers.length; ++i) {
			switch( this.resizers[i]){
				case 'right':
					var a={
							onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'r') },
						domParent:this.element,
						id:this.id+'_resizer-right',
						className:'resizer right'
					}
					var c=new ISgControl(a)
				break;
				case 'left':
					var a={
							onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'l') },
						domParent:this.element,
						id:this.id+'_resizer-left',
						className:'resizer left'
					}
					var c=new ISgControl(a)
				break;
			}
		}
	}
}
SgPanel.prototype.initControls = function initControls(){
	var this_=this;
	SgPanel.prototype.base.initControls.call(this);
	var a={
		id:this.id+'_container',
		className:'panel-container',
		creator:'SgPanel',
		instance:++_instance,
		owner: this
	}
	var c=new ISgControlContainer(a);

	if (this.className.indexOf('center')!='') {
		this.controls[a.id]=c;

			var a={
			id:this.id+'_dock',
			className:'panel-button',
			creator:'SgPanel',
			docked:0,
			instance:++_instance,
			owner: c,
			onmousedown:function() {
				this_.handler.onBubbles(arguments[0],arguments[1],{msg:'activate'});
				return this_.onCmdClick(arguments[0],arguments[1]);
				return this_.onBubbles(arguments[0],arguments[1],{msg:'activate'});
			}
		}
		a.captured={onmousedown:a.onmousedown}
		this.controls[a.id]=new ISgControlContainer(a);
	}

	var a={
		id:this.id+'_content',
		className:'panel-content',
		creator:'SgPanel',
		instance:++_instance,
		owner: c
	}
	this.controls[a.id]=new ISgControlContainer(a);
	this.initResizers();
			this.saveBox();
		for(var i in this.boxs) {}
			this.saveBox(i);
}

SgPanel.prototype.paint = function paint(){
	SgPanel.prototype.base.paint.call(this)
}	

SgPanel.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	args.className = domHelper.mergeClassName(args.className, 'panel');
	args.position= {resize:false};
	args.lastAction='initial';

	var this_=this;
	var type = args.className.replace(/.*(left|right|bottom|center).*/,'$1');
	switch(type) {
		case 'left':
			args.onmouseout=function(){
			if (arguments[1].getAttribute('docked')!=1) {
				p = arguments[1]
				while(p && p != document.body) {
					if (p == this.element)
						return;
					p=p.parentNode;
				}
				arguments[1].style.left=-arguments[1].clientWidth+'px';
			}
		}
		args.onmouseover=function(){
			arguments[1].style.left=0;
		}
		break;
		case 'right':
			args.onmouseout=function(){
			if (arguments[1].getAttribute('docked')!=1) {
				p = arguments[1]
				while(p && p != document.body) {
					if (p == this.element)
						return;
					p=p.parentNode;
				}
				arguments[1].style.right=-arguments[1].clientWidth+'px';
			}
		}
		args.onmouseover=function(){
			arguments[1].style.right=0;
		}
		break;
	}
	
	
	SgPanel.prototype.base.init.call(this,args);

		//this.initControls();
	
	
}

function ISgPanel(){
	this.init(arguments[0])
}

SgPanel=classHelper.register(SgPanel,ISgPanel);

