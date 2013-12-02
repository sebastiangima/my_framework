function SgAppMenu(){}

SgAppMenu.prototype.baseClass='SgControlContainer';

SgAppMenu.prototype.getControl = function getElement(k,o){
	switch(k){
		case 'content':
		case 'body':		 return this.controls[this.id+'_content'];	break;
		case 'dropbox':		 return this.controls[this.id+'_'];	break;
	}
	return SgAppMenu.prototype.base.getControl.call(this,k,o);
}

SgAppMenu.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'content':
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return SgAppMenu.prototype.base.getElement.call(this,k,o);
}

SgAppMenu.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

SgAppMenu.prototype.onKeyDown = function onKeyDown(e){
	return false;
}

SgAppMenu.prototype.onClick= function onTeclaClick(){
	console.log(arguments);
}

SgAppMenu.prototype.callback = function callback(e,s,h,l,m){
	console.log(arguments);
	return;
	if (!this[l])
		return this.owner.callback(e,s,h,l,m);
	return this[l](e,s,h,l,m);
}

SgAppMenu.prototype.onMenuItemClick = function onMenuItemClick(e,o){	
		if (this.activeMenu) {
			this.activeMenu.toogle(null,'state');
			sgApp.comboContext.toogle(null,'state');	
			if (this.activeMenu.id == o.id) {
				this.activeMenu=null;
				return;
			}
		}
		
			this.activeMenu=this.controls[o.id];
			this.activeMenu.toogle(null,'state');
			
			var c = this.activeMenu.element.children[0]
			var cc = c.cloneNode(true);
			if (sgApp.comboContext.element.children.length)
			sgApp.comboContext.element.removeChild(sgApp.comboContext.element.children[0])
			sgApp.comboContext.element.appendChild(cc);
			sgApp.comboContext.toogle(null,'state');	
			var r = c.getClientRects()[0];
			var s=c.currentStyles;
			for (var i in s) {
				sgApp.comboContext.element.style[i]=c.style[i];
			}
			sgApp.comboContext.element.style.left=r.left+'px';
	
}

SgAppMenu.prototype.initControls = function initControls(){	
	var args = arguments[0] ? arguments[0] : {};

	SgAppMenu.prototype.base.initControls.call (this,args);

	// var a = {
		// id : this.id,
		// className: 'general-content',
		// owner:this.body,
		// handler:this.handler
	// }
	// this.controls[a.id] = new ISgControlContainer(a);

	var n;
	a = {
		className: 'general-menu-bar',
		owner:this,
		handler:this.handler
	}
	var this_=this;
	for (var i=0; i<this.items.length; ++i) {
		if (this.items[i].klass) {
			switch(this.items[i].klass) {
				case 'red': 
					a.innerHTML='<div class="toolbox" state="0">&nbsp;</div>';
					
					a.onclick=function(){
						return this_.handler.onToolbarClick(arguments[0],arguments[1],this);
					}
					
					
				break;
			}
		}
		else {
			a.innerHTML = this.items[i].caption || this.items[i].name;
		}
		a.id=this.id+'_'+this.items[i].name;
		a.active=0;
			
		if (!a.onclick) a.onclick = function(){
			return this_.onMenuItemClick(arguments[0],arguments[1]);
		}
			var c = new ISgControlContainer(a);
			this.controls[a.id]=c;
			
			var aa = {
				owner:c,
				id:c.id+'_',
				className:'effect'
			}
			var cc = new ISgControlContainer(aa);

			var aa = {
				owner:cc,
				id:cc.id+'items_'
				
			}
			var cc = new ISgControlContainer(aa);			
		//var d = domHelper.div({className:'effect'})
			var aa = {
				owner:c,
				id:c.id+'_',
				className:'effect-line'
			}
			
			var cca = new ISgControlContainer(aa);
		//	c.appendChild(d);
			for (var j=0; j<this.items[i].childs.length; ++j) {
				var b={};
				b.id=cc.id+this.items[i].childs[j].name;
				b.innerHTML=this.items[i].childs[j].name;
				b.owner=cc;
				b.onclick=function(){
					return cancelEvent(arguments[0]);
				}
				b.handler=this;
				var f= new ISgControlContainer(b);
				this.controls[b.id]=f;
			
			}
			var aa = {
				owner:cca,
				id:cc.id+'_shadow',
				className:'effect-shadow'
			}
			var ccc = new ISgControlContainer(aa);
			


			var aa = {
				owner:cc,
				id:cc.id+'items_'
				
			}
			var cc = new ISgControlContainer(aa);			
		
	}
	return;
}

SgAppMenu.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'general-menu');
	args.activeMenu=null;
	SgAppMenu.prototype.base.init.call(this,args);
}

function ISgAppMenu(){
	this.init(arguments[0]);
	
}

classHelper.register(SgAppMenu,ISgAppMenu);
