function SgAppWin(){}

SgAppWin.prototype.defaults={
	state: 1,
	title: 'Vago Ponle Tìtulo',
	position: {resize:false},
	elAttr: {
		activate:1
	}
	
}

SgAppWin.prototype.toRedim;

SgAppWin.prototype.position;

SgAppWin.prototype.baseClass='SgWindow';

SgAppWin.prototype.updateStyles=function updateStyles(last){
	var box=this.boxs[last];
	this.element.style.marginLeft = box.styles.margins.left ||  box.stylesApplied.margins.left
	this.element.style.width = box.styles.size.width ||  box.stylesApplied.size.width
	this.element.style.height = box.styles.size.height ||  box.stylesApplied.size.height
	this.element.style.left = box.styles.coord.left ||  box.stylesApplied.coord.left //|| this.boxs.initial.stylesApplied.size.left
	this.element.style.right = box.styles.coord.right ||  box.stylesApplied.coord.right
	this.element.style.top = box.styles.coord.top ||  box.stylesApplied.coord.top
	this.element.style.bottom = box.styles.coord.bottom ||  box.stylesApplied.coord.bottom

}

SgAppWin.prototype.getElement = function getElement(k,o){
	return SgAppWin.prototype.base.getElement.call(this,k,o);
}

SgAppWin.prototype.resizeToTop = function resizeToRight(coord){
}

SgAppWin.prototype.resizeToRight = function resizeToRight(coord){

	this.dockSide='right';
	this.lastAction='docked';
	this.position={resize:true};
	this.toRedimContainer.style.left='50%';
	this.toRedimContainer.style.marginLeft='0px';
	this.toRedimContainer.style.marginTop='0px';
	this.toRedimContainer.style.right='0px';
	this.toRedimContainer.style.top='0px';
	this.toRedimContainer.style.marginTop=top+'px';
	this.toRedimContainer.setAttribute('active','1');
	this.toRedim.setAttribute('redim','right');
	this.element.style.width = '50%';
	this.saveBox('dragged');
	this.saveBox('docked')
	//this.saveBox('resized')
	this.boxsToHtml();
}

SgAppWin.prototype.resizeToLeft = function resizeToLeft(top,left){
	output.setContent(this.getBox(),true);	
	this.dockSide='left';
	this.lastAction='docked';
	this.saveBox('docked');
	this.position={resize:true};
	this.toRedimContainer.style.left='0px';
	this.toRedimContainer.style.top='0px';
	this.toRedimContainer.style.marginTop=top+'px';
	this.toRedimContainer.setAttribute('active','1');
	this.toRedim.setAttribute('redim','left');
	
		//output.setContent(this.saveBox_(),true);
	return;
}

SgAppWin.prototype.noresize = function noresize(){
	this.toRedim.setAttribute('redim','none')
	if(this.position.resize) {
		this.position.resize=false;
		var classes=this.element.className;
		var dock='left';
		classes = classes.replace(/docked right/,'');
		if (classes != this.className) dock=right;
		else classes.replace(/docked left/,'');
		this.element.className = classes;
		this.updateStyles('dragged');
		this.dockSide='';
		// if (this.dockSide=='left') {
			// this.element.style.left='0px';
			// this.element.style.right='auto';
		// }
		// else  {
			// this.element.style.right='0px';
			// //this.element.style.marginLeft=this.element.style.left;
			// this.element.style.left='50%';
		// }
		this.element.style.top='0px';
		this.element.style.height=this.boxs.resized.stylesApplied.size.height;
		this.element.style.width=this.boxs.resized.stylesApplied.size.width;
		this.saveBox('dragged');
		
		this.lastAction='dragged';
		
		
	}
	else {
		this.element.style.marginTop=this.boxs[this.lastAction].styles.margins.top;
		this.element.style.marginLeft=this.boxs[this.lastAction].styles.margins.left;
	}
}

SgAppWin.prototype.move = function move(coord){
	//output.setContent(this.boxsToHtml(),true);
	this.noresize(coord);
	if (!this.moving) {
		this.moving=true;
		
	}
	else this.lastAction='dragged';

	this.updateStyles(this.lastAction);
		// this.element.style.marginTop = margin'0px';
		// this.element.style.marginLeft = '0px';
		
	
	var top = coord.top;//-this.onDragData.top
	var left = coord.left;//-this.onDragData.left
	var marginTop = this.element.style.marginTop?+this.element.style.marginTop.replace('px',''):0;
	var marginLeft = this.element.style.marginLeft?+this.element.style.marginLeft.replace('px',''):0;
	// this.element.style.marginLeft = coord.left+'px';
	// this.element.style.marginTop = coord.top+'px';
	
	
	this.element.style.marginLeft = +(this.boxs[this.lastAction].styles.margins.left.replace(regexcssval,''))+left+'px';
	this.element.style.marginTop = top+marginTop+'px';
	
	//output.setContent(this.boxsToHtml(),true);
	//(+coord.left + (+this.element.style.marginLeft.replace('px','')))+'px';
	//this.element.style.marginTop = (+coord.top + (+this.element.style.marginTop.replace('px','')))+'px';


}

SgAppWin.prototype.onMouseUp = function onMouseUp(e,o,m){
	if (e.button==2)
		alert(2);
	
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

SgAppWin.prototype.onMouseDown_ = function onMouseDown(e,o,m){
}

SgAppWin.prototype.onMouseDown = function onMouseDown(e,o,m){
	var regexcssval=/[^0-9\.]/g;
	if (this.action=='resize'){
		
	}
	this.moving=false;
	if (this.element.getAttribute('state')==2)
		return;
	this.onDragData = {
		origenDrag:{top:e.clientY, left:e.clientX},
		top: o.offsetTop,
		left: o.offsetLeft,
		stop: ('' || o.style.top).replace(regexcssval,''),
		sleft: ('' || o.style.left).replace(regexcssval,''),
		mleft: ('' || o.style.marginLeft).replace(regexcssval,''),
		mtop: ('' || o.style.marginTop).replace(regexcssval,'')
	}
	
	this.lastAction='dragged'
	this.action='drag'
	this.startDrag(e,o,m);
	return false;
}

SgAppWin.prototype.onResize = function onResize(e,o,m){
	this.action='resize';
	this.lastAction='resized';
	this.onResizeData = {
		origen:{top:e.clientY, left:e.clientX},
		top: o.offsetTop,
		left: o.offsetLeft,
		stop: ('' || o.style.top).replace(regexcssval,''),
		sleft: ('' || o.style.left).replace(regexcssval,''),
		mleft: ('' || o.style.marginLeft).replace(regexcssval,''),
		mtop: ('' || o.style.marginTop).replace(regexcssval,''),
		rect:this.element.getClientRects()
	}


	this.startResize(e,o,m);	
	if (e) {
		if (e.stopPropagation) 
			e.stopPropagation();
		e.cancelBubble=true;	}
	return true;
	
}

SgAppWin.prototype.changeMinMax = function changeMinMax(e,o){
	var state= this.element.getAttribute('state');
	if (state=="0") {
		this.onCmdClick('maximizar')
	}
	else {
		this.onCmdClick('minimizar');
	}
}

SgAppWin.prototype.initTail = function initTail(){
}

SgAppWin.prototype.initResizers=function initResizers(){
	var this_=this;
	var a={
		onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'tl') },
		domParent:this.element,
		id:this.id+'_resizer-top-left',
		className:'resizer top left'
	}
	var c=new ISgControl(a)
	var a={
		onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'t') },
		domParent:this.element,
		id:this.id+'_resizer-top',
		className:'resizer top'
	}
	var c=new ISgControl(a)
	var a={
		onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'tr') },
		domParent:this.element,
		id:this.id+'_resizer-top-right',
		className:'resizer top right'
	}
	var c=new ISgControl(a)
	var a={
			onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'r') },
		domParent:this.element,
		id:this.id+'_resizer-right',
		className:'resizer right'
	}
	var c=new ISgControl(a)
	var a={
		onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'br') },
		domParent:this.element,
		id:this.id+'_resizer-bottom-right',
		className:'resizer bottom right'
	}
	var c=new ISgControl(a)
	var a={
		onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'b') },
		domParent:this.element,
		id:this.id+'_resizer-bottom',
		className:'resizer bottom'
	}
	var c=new ISgControl(a)
	var a={
		onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'bl') },
		domParent:this.element,
		id:this.id+'_resizer-bottom-left',
		className:'resizer bottom left'
	}
	var c=new ISgControl(a)
	var a={
		onmousedown:function () { return this_.onResize(arguments[0],arguments[1],'l') },
		domParent:this.element,
		id:this.id+'_resizer-left',
		className:'resizer left'
	}
	var c=new ISgControl(a)
}

SgAppWin.prototype.onCmdClick = function onCmdClick(){
	//alert('SgApp');
	if(arguments[0]=='cerrar') {
		sgApp.sendNotification(this,'SGWN_CLOSE');
		this.destroy();
	}
	else if(arguments[0]=='minimizar') {
		this.wasMaximized=this.element.getAttribute('state')==2;
		this.wasDocked=this.element.getAttribute('state')==2;
		this.element.setAttribute('state',0);
	}
	else if(arguments[0]=='maximizar') {
		if (!this.isActive) {
			this.activate();
		}
		if (this.element.getAttribute('state') == 2 && this.wasMaximized){
			this.element.setAttribute('state',1);
		if (this.boxs.resized.styles) 
				this.updateStyles('resized');
		else if (this.boxs.dragged.styles) 
				this.updateStyles('dragged');
			else
				this.updateStyles('initial');
		}
		else if ( (this.element.getAttribute('state') == 0 && !this.wasMaximized)){
			this.element.setAttribute('state',1);
			if (this.dockSide=='left') {
				if (this.boxs.resized.styles)
					this.updateStyles('resized');
				else if (this.boxs.dragged.styles)
					this.updateStyles('dragged');
				else
					this.updateStyles('initial');
			}
				//this.updateStyles('docked');
			else
				this.updateStyles('initial');
		
		}
		else {// this.element.getAttribute('state') == 0){
//			this.element.setAttribute('state',1);
			//this.updateStyles('dragged');
			this.wasMaximized=true;

			this.saveBox('maximized');
			this.lastAction='maximized'
			this.lastMargin={
				top:this.element.style.marginTop,
				left:this.element.style.marginLeft,
				bottom:this.element.style.marginBottom,
				right:this.element.style.marginRight
			}
			this.element.style.margin='0px';
			this.element.style.width='100%';
			this.element.style.height='100%';
			this.element.style.top='0%';
			this.element.style.left='0%';
			this.element.style.right='auto';
			this.element.style.bottom='auto';
			
			this.element.setAttribute('state',2);
		}
	}
	else if (this.element.getAttribute('state')=='1')
		this.element.setAttribute('state',2);
	else if (this.element.getAttribute('state')=='0') {
		if (this.wasMaximized)
			this.element.setAttribute('state',1);
		else
			this.element.setAttribute('state',2);
	}
	else
		this.element.setAttribute('state',1);
	if (arguments[1]) {
	  arguments[1].preventDefault();
    arguments[1].stopPropagation();
	}
	return false;
	//this.toogle({},'state');
}

SgAppWin.prototype.initHead = function initHead(){
	var this_=this;
	
	var a = arguments[0] || {}

	//SgWindow.prototype.initHead.call(this,a);	
	// this.head=SgWindow.prototype.initHead.call(this,a);	
	
	if (!a.apptitle) a.apptitle=this.apptitle;
	

	a.domParent=this.head.element;
	a.owner=this;
		
	a.instance=++_instance;
	a.id=this.head.id+'_title-bar';

	a.onmouseup=function(){
		
	//	console.log([arguments[0].type,arguments[0]]);
		controller.cancelDelay();
		
	
	},
	a.onmousedown=function(){
		//console.log(event,event.sg)
//		console.log([arguments[0].type,arguments[0]]);
		if (!arguments[0].sg || !arguments[0].sg) {
			this_.activate();
					
			controller.delayEvent(arguments[0],arguments[1],'onmousedown');
			return false;
		}
		else {
		
			this_.onMouseDown(arguments[0],this_.element);
			return false;
		}
	}


		
	var c = new ISgTitleBar(a);
	this.controls[c.id]=c;
	this.toRedimContainer = domHelper.div();
	this.toRedimContainer.className = 'sgapp window toredim container';
	c.element.appendChild(this.toRedimContainer);
	
	this.toRedim = document.createElement('DIV');
	this.toRedim.className = 'sgapp window toredim';
	this.toRedimContainer.appendChild(this.toRedim);
	

	
	
	
	//this.controls[a.id]=new ISgControlContainer(a);
}

SgAppWin.prototype.initBody = function initBody(){
	var a = arguments[0] || {}

	//SgWindow.prototype.initBody.call(this,a);	

	var this_=this;
	var a={
		id:this.id+'_apptab',
		className:'apptab icon icon-explorer',
		type:1,
		caption:this.name,
		onclick:function(){this_.changeMinMax(arguments[0],arguments[1])}
	}
	var tab=new ISgButton(a);

	sgApp.getTabControlContainer().append(tab);
	
}

SgAppWin.prototype.initControls = function initControls(){
	var args = arguments[0] || {controlParams:{body:{},head:{}}};
	
	SgAppWin.prototype.base.initControls.call(this,args);
	//this.initHead(args.controlParams.head);
	//this.initBody(args.controlParams.body);
//	if (this instanceof SgAppWin) {
		SgAppWin.prototype.initHead.call(this);
	  SgAppWin.prototype.initBody.call(this);
		SgAppWin.prototype.initResizers.call(this);
		this.saveBox();
		for(var i in this.boxs) {}
			this.saveBox(i);

	
return;
	var a={
		domParent:this.element,
		id:this.id+'_content',
		className:'content'
	}

	
	var c=new ISgWindow(a)
	
 this.controls[a.id]=c;	

//			}
	

}

SgAppWin.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'sgapp');

	var items = args.items;
	delete	args.items;

	for (var i in SgAppWin.prototype.defaults) 
		if (!args[i]) args[i] = SgAppWin.prototype.defaults;

	args.apptitle=args.title;
	if (args.forcePosition) {
		switch (args.forcePosition) {
			case 'left': 
				args.left=0;
				args.top=0;
				args.height='100%';
				args.width='50%';
			break;
			case 'right': 
				args.right=0;
				args.left='auto';
				args.top=0;
				args.height='100%';
				args.width='50%';
			break;
		}		
	}
	delete args.title;
	this.lastAction='initial';
	
	SgAppWin.prototype.base.init.call(this,args);
	//SgAppWin.prototype.initControls(this,args
	//this.activate();
}

function ISgAppWin(){
	this.init(arguments[0]);
}

classHelper.register(SgAppWin,ISgAppWin);
