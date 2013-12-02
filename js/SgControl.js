function SgControl(){}

SgControl.prototype.baseClass='SgObject';

SgControl.prototype.box = {};


SgControl.prototype.onBubbles = function onBubbles(e,o,m){
	var l='', h;
	if (m && m.msg) {
		l = m.listener || m.msg;
		if (this[l] && this[l] instanceof Function) {
			this[l](e,o,m);
		}
		else {
			if (this.base){
				if (this.base[l] && this.base[l] instanceof Function) {
					this.base[l](e,o,m);
				}
			}
		}
		
		
		h = this.owner || m.handler || this.handler ||  null;
		if ( h && h.onBubbles instanceof Function && classHelper.getClassName(h)!='SgDesktop') {
			return h.onBubbles(e,o,m);
		}
	}
	return false;
}	

SgControl.prototype.alerta = function alerta(o,n,s){

	if (!n) n=0;
	if (!s) s='';
	s='\r\n'+s;
	switch(n){
		case 0:
			if (typeof(o)!='string')
				o=classHelper.getClassName(o)
			alert(o+' No implementa interfase bubble'+s);
		break;
		default:
			alert('Alerta desconocida'+s);
		break;
	}

}

SgControl.prototype.getTopLeft = function getTopLeft(){
	var e = arguments[0] || this.element, t=0, l=0;
	
	while (e && e.tagName != 'BODY') {
		t+=e.offsetLeft;
		l+=e.offsetLeft;
		e=e.parentNode;
	}
	return [t,l];
}

SgControl.prototype.setv = function setv(v) {
	domHelper.mapToElement(this.element,v)
}

SgControl.prototype.getv = function getv(v) {
	var result = '';
	switch(v) {
		case 'height':
			result = domHelper.getAppliedStyles(this.element,['height']);//.clientHeight ? this.element.clientHeight : this.element.style.height ? this.element.style.height : this.element.clientHeight;
		break;
		
	}
	return result.toString().replace('px','');
}

SgControl.prototype.hasThiszChild = function hasThiszChild(c,r) {
	
	for (var i in this.controls) {
		if (i == c.id)
			return true;
		if (r) {
			if (this.controls[i].hasThiszChild(c,r))
				return true;
		}
	}
	return false;
}

SgControl.prototype.deactivate = function deactivate() {
	//console.log('SgControl.deactivate#'+this.id);
	this.isActive = false;
	this.element.setAttribute('activated',0);
	if (this.controlFocus) {
		this.controlFocus.lostFocus();
		this.controlFocus=null;
	}
}

SgControl.prototype.activate = function activate() {
	//console.log('SgControl.activate#'+this.id);
	this.isActive = true;
	this.element.setAttribute('activated',1);
	if (arguments.length || arguments[0]!='inner')
		this.element.parentNode.appendChild(this.element.parentNode.removeChild(this.element))
	if (this.focusable) {
		if (!arguments.length || arguments[0]!='inner')
			sgApp.appActivate(this);
			
	}
	if (this.tabOrder && this.tabOrder.length) {
		this.innerFocus();
	}
}

SgControl.prototype.sendNotification = function sendNotification(n,c) {
	switch(n) {
		case 'focus':
			this.controlFocus=c;
		break;
		case 'blur':
			this.controlFocus=null;
		break;		
	}
}

SgControl.prototype.lostFocus = function lostFocus() {
	this.focused = false;
	this.element.setAttribute('state',0);
}

SgControl.prototype.focus = function focus() {
	//console.log('SgControl.focus#'+this.id);
	this.focused = true;
	this.element.setAttribute('state',1);
	
	if (this.handler) 
		this.handler.sendNotification('focus',this);
	if (this.tabOrder && this.tabOrder.length) {
		this.innerFocus();
	}
}

SgControl.prototype.setFocus = function setFocus(e,o,m){
	console.log('SgControl.setFocus#'+this.id);
	alert(o.id);
}

SgControl.prototype.toogle = function toogle(e,a) {
	var v = this.element.getAttribute(a);
	if (typeof(v)=='undefined')
		v = 0;
	this.element.setAttribute(a,1-v);
	if (e) {
		if (e.stopPropagation) 
			e.stopPropagation();
		e.cancelBubble=true;
	}
	return true;
}

SgControl.prototype.getElement = function getElement(k,o){
	if (!k) k = 'container';
	switch(k) {
		case 'container':
			return this.element;
		break;
		default:
			return SgControl.prototype.base.getElement.call(this,k);
		break;
	}
}

SgControl.prototype.paint = function paint(){
	//this.element
}

SgControl.prototype.appendChild = function appendChild(c){
	if (c && c.element) {
		this.element.appendChild(c.element);
	}
	else {
		this.element.appendChild(c);
	}
}

SgControl.prototype.destroy = function destroy(n) {
	if (this.element.parentNode)
		this.element.parentNode.removeChild(this.element);
	SgObject.prototype.destroy.call(this);
}

SgControl.prototype.boxsToHtml_ = function boxsToHtml_(n) {
	return output.fromObject(this.boxs[i])
}

SgControl.prototype.boxsToHtml = function boxsToHtml_() {
	var d, di;
	d=domHelper.div({innerHTML:this.lastAction});
	di=domHelper.div({className:'collapse',float:'left',parentNode:d, onmousedown:function(){toogle2(arguments[0],arguments[1],'state')},state:1});
	di.innerHTML='BOX';
	var dd=domHelper.div({innerHTML:domHelper.fromObject(this.getBox()),parentNode:di});
	for (var i in this.boxs) {
		di=domHelper.div({className:'collapse',float:'left',parentNode:d, onmousedown:function(){toogle2(arguments[0],arguments[1],'state')},state:1});
		di.innerHTML=i;
		var dd=domHelper.div({innerHTML:domHelper.fromObject(this.boxs[i]),parentNode:di});
	}
	return d;
}

SgControl.prototype.resize = function resize(e,o,m){
	var regexcssval=/[^0-9\.]/g;	
	var vm=m.split('');
	if (!this.resizing) {
		this.saveBox('resized');
		this.saveBox('dragged');
		this.resizing=true;
	}
	for (var i=0; i<vm.length; ++i) {
		switch (vm[i]) {
			case 'tl':
			break;
			case 't':
				this.element.style.bottom='auto'
				this.element.style.top=e.clientY+'px';
				this.element.style.height=(this.onResizeData.rect[0].height-e.clientY+this.onResizeData.origen.top)+'px';	
				this.element.style.marginTop='0px';
			break;
			case 'tr':
			break;
			case 'r':
				this.element.style.right='auto'
				if (this.onResizeData.prect) {
					
					//this.element.style.left=-this.onResizeData.prect[0].left+this.onResizeData.rect[0].left+'px';
					//this.element.style.right=this.onResizeData.prect[0].left	+'px';
					//this.element.style.right=e.clientX-this.onResizeData.prect[0].left+'px';
				}
				else {
					this.element.style.left=this.onResizeData.rect[0].left+'px';
				}
				this.element.style.width=(this.onResizeData.rect[0].width+e.clientX-this.onResizeData.origen.left)+'px';		
			break;
			case 'br':
			break;
			case 'b':
				this.element.style.bottom='auto'
				this.element.style.top=this.onResizeData.rect[0].top+'px';
				this.element.style.height=(this.onResizeData.rect[0].height+e.clientY-this.onResizeData.origen.top	)+'px';		
			break;
			case 'bl':
			break;
			case 'l':
				if (this.onResizeData.prect) {
					this.element.style.left=
						e.clientX-this.onResizeData.rect[0].left+this.onResizeData.oleft+'px';
					this.element.style.right=this.onResizeData.prect[0].right+'px';
					//this.element.style.width='auto'
					
					}
				else {
					this.element.style.right='auto'
					this.element.style.left=e.clientX+'px';
					this.element.style.width=(this.onResizeData.rect[0].width-e.clientX+this.onResizeData.origen.left)+'px';
					}
				this.element.style.marginLeft=this.boxs.resized.styles.margins.left || this.boxs.resized.stylesApplied.margins.left;
			break;
		}
	}
	
	

	if (e) {
		if (e.stopPropagation) 
			e.stopPropagation();
		e.cancelBubble=true;	}
		return true;
}

SgControl.prototype.saveBox = function saveBox(n) {
		
	if (!this.boxs) this.boxs={
		initial:{},
		dragged:{},
		docked:{},
		maximized:{},
		resized:{}
	};
	this.box=this.getBox();
	if (!n) n='initial';
	this.boxs[n]=this.box;
	
}

SgControl.prototype.getBox = function getBox() {
	var box={};

	var s=['height',
			'width',
			'left',
			'top',
			'bottom',
			'right',
			'margin-top',
			'margin-right',
			'margin-left',
			'margin-bottom'
		];	
	s = domHelper.getAppliedStyles(this.element,s);
	
	box.styles = {
		coord: {
			left: this.element.style['left'],
			right: this.element.style['right'],
			bottom: this.element.style['bottom'],
			top: this.element.style['top']
		},
		size: {
			width: this.element.style['width'],
			height: this.element.style['height']
		},
		margins: {
			left: this.element.style['marginLeft'],
			right: this.element.style['marginRight'],
			bottom: this.element.style['marginBottom'],
			top: this.element.style['marginTop']
		}
	}
	box.stylesApplied = {
		coord: {
			left: s.left,
			right: s.right,
			bottom: s.bottom,
			top: s.top
		},
		size: {
			width: s.width,
			height: s.height
		},
		margins: {
			left: (s.marginLeft),
			right: ('' || s.marginRight),
			bottom: ('' || s.marginBottom),
			top: ('' || s.marginTop)
		}
	}
		box.computed = {
		coord: {
			left: ('' || window.getComputedStyle(this.element, null).getPropertyValue('left')),
			right: ('' || window.getComputedStyle(this.element, null).getPropertyValue('right')),
			bottom: ('' || window.getComputedStyle(this.element, null).getPropertyValue('bottom')),
			top: ('' || window.getComputedStyle(this.element, null).getPropertyValue('top'))
		},
		size: {
			width: ('' || window.getComputedStyle(this.element, null).getPropertyValue('width')),
			height: ('' || window.getComputedStyle(this.element, null).getPropertyValue('height'))
		},
		margins: {
			left: ('' || window.getComputedStyle(this.element, null).getPropertyValue('marginLeft')),
			right: ('' || window.getComputedStyle(this.element, null).getPropertyValue('marginRight')),
			bottom: ('' || window.getComputedStyle(this.element, null).getPropertyValue('marginBottom')),
			top: ('' || window.getComputedStyle(this.element, null).getPropertyValue('marginTop'))
		}	
	}
	box.rect = this.element.getClientRects();
	return box;
	
		
}

SgControl.prototype.startResize = function startResize(e,o,m){
	this.saveBox('resized');
	this.mouseOrigen = {top:e.clientY, left:e.clientX};
	domHelper.startResize(e,o,m,this);

}

SgControl.prototype.getContextMenuItems = function getContextMenuItems(){
	return this.contextMenuItems;
}

SgControl.prototype.showContextMenu = function showContextMenu(e,o,m){
	alert(this.id);
}

SgControl.prototype.startDrag = function startDrag(e,o,m){
	///this.element.style.marginLeft=this.boxs[this.lastAction].styles.
	this.saveBox('dragged');
	
	this.mouseOrigen = {top:e.clientY, left:e.clientX};
	domHelper.startDrag(e,o,m,this);
}

SgControl.prototype.remove = function remove(){
	if(this.element.parentNode)
	this.element.parentNode.removeChild(this.element);
}

// child constrol, or this control, request hanlder to perform some action
// params name,impulse,direction
//		name: [string] -> nombre de la acción
//		sender: [SgControl] -> objeto solicitante de la acción
//		impulse: [string] -> disparador de la acción
//		msg: {[object]}-> objeto con parametros adicionales requeridos segun la acciòn
// ej: 
//		name=blue 
//		=> impulse=[tab | click]
//					impulse=tab => msg={direction: 1 | -1)
SgControl.prototype.requestAction = function requestAction(){
	var a = arguments[0] || {}
	if (!a.sender || !a.name || !a.sender.id)
		return false;
		
	switch(a.name) {
		case 'blur': 
			if (!this.controls || !this.controls[a.sender.id])
				return false;
			a.sender.setFocus(false);
			
			var index=((this.tabOrder[a.sender.id]+a.msg.direction)+this.tabIndexOrder.length)%this.tabIndexOrder.length;
//			console.log(index);
			this.controls[this.tabIndexOrder[this.tabOrder[this.tabIndexOrder[index].name]].name].focus('inner')
		break;
			
	}
}

SgControl.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	args.element = domHelper.div();
	args.isActive=false;
	
	if (args.focusable) {
		args.focusContext= args.focusContext || {inter:false, intra:false};
		args.focusContext.inter = args.focusContext.inter || false;
		args.focusContext.intra = args.focusContext.intra || false;
	} 
	
	
	SgControl.prototype.base.init.call(this,args);
	if (this.id) {
		this.element.id = this.id;
	}
	if (this.className)
		this.element.className = this.className;
	if (this.domParent)
		this.domParent.appendChild(this.element);

	if (args.handler && args.handler.focusable) {
		var f = args.onclick;
		var this_=this;
		this_.originalListener={};
		

		var captured=['onclick'];
		var captured=['onclick','onmousedown'];
		
		for (var i=0; i<captured.length; ++i) {
			if (args[captured[i]]) {
				this_.originalListener[captured[i]]=args[captured[i]];
				args[captured[i]]=function(){
					this_.handler.activate();
					this_.originalListener['on'+arguments[0].type](arguments[0],arguments[1]);
				}
			}
			else {
				args[captured[i]]=function(){
					return this_.onBubbles(arguments[0],arguments[1],{msg:'activate'});
					//this_.handler.activate();
				}
			}
		}
	}

	
	
	// if (!args.onclick) {
		// if (args.handler && args.handler.focusable) {
			// var this_=this;
			// args.onclick=function(){
				// this_.handler.focus()
			// }
		// }
	// }
		
	domHelper.mapToElement(this.element,args);
		
}

function ISgControl(){
	this.init(arguments[0])
}

//ISgControl.prototype=new SgControl();

SgControl=classHelper.register(SgControl,ISgControl);