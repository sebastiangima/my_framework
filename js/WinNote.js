function WinNote(){}

WinNote.prototype.baseClass='SgControlContainer';

WinNote.prototype.getControl = function getElement(k,o){
	switch(k){
		case 'body':
			return this.controls[this.id+'_content'];
		case 'container':
			return this.controls[this.id+'_container'];
	}
	return WinNote.prototype.base.getControl.call(this,k,o);
}

WinNote.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return WinNote.prototype.base.getElement.call(this,k,o);
}

WinNote.prototype.onKeyDown = function onKeyDown(e,o){
	var e,a,z,setday=false;
	switch(e.keyCode) {
		case 37:
			if (this.active==0) return false;
				this.active--;
				setday=true;
				// for (var i=0; i<this.active; ++i) {
					// e=this.controls[this.id+'_'+i].element;
					// a={
						// className:'winnote-pageright',
						// 'z-index':366+i
					// }
					// domHelper.mapToElement(e,a);
				// }
			
				//domHelper.mapToElement(this.controls[this.id+'_'+this.active].element,a);
			// return true;
		case 39: 
			this.active++;
			setday=true;
			// for (var i=0; i<this.active; ++i) {
				// e=this.controls[this.id+'_'+i].element;
				
				// a={
					// className:'winnote-pageright',
					// 'z-index':366+i
				// }
				// domHelper.mapToElement(e,a);
			// }
			//domHelper.mapToElement(this.controls[this.id+'_'+this.active].element,a);
			// return true;
		break;
	}
	if (setday) {
		this.setDate(this.controls[this.id+'_'+this.active]);
		return true;
	}
}

WinNote.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

WinNote.prototype.makeGrid = function makeGrid(){
	var container = this.getControl('container');
	
	var a, c, aa, cc;
	var d, d0 = new Date();
	for (var i=0; i<366; ++i) {
		a	= {
			id : this.id+'_'+i,
			page:i,
			owner:container,
			handler:this
		}	
		a.date = new Date(d0.getFullYear(),0,i+1,23,59,59);
		c=new IWinNotePage(a);
		this.controls[a.id] = c
		
		
	}

	var a = {
		id : this.id+'_psgeright',
		className: 'winnote-psgeright',
		owner:container
	}	
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c;
}

WinNote.prototype.initHead = function initHead(){
	var a = {
		id : this.id+'_header',
		className: 'winnote-header',
		owner:this
	}	
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c
	
}	

WinNote.prototype.isOpen = function isOpen() {
	return this.opened;
}

WinNote.prototype.open = function open(y,m,d) {
	this.opened = !this.opened;
	c = this.element;

	if (this.opened){
		c.setAttribute('state',1);
		this.state = 1;
		this.setDate(new Date(y,m-1,d,0,0,0));
	}
	else {
		this.state = 0;
		c.setAttribute('state',0);
	}
	
}

WinNote.prototype.destroy = function destroy(){
	if (this.likeGadget) {
		if (this.element.parentNode==this.owner.element)
			return;
	}
	sgApp.unregisterReference(this);
	SgObject.prototype.destroy.call(this);
}

WinNote.prototype.initBody = function initBody(){
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this
	}
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c


	var a = {
		id : this.id+'_container',
		className:'winnote-container',
		owner: c,
		state:0
	}
	var d=new ISgControlContainer(a);
	this.controls[a.id] = d
	
	this.makeGrid();
	
	
	return;
	
}

WinNote.prototype.setDate = function setDate(d){
	var c, a;
	this.active=-1;
	
	for (var i=0; i<366; ++i) {
		c = this.controls[this.id+'_'+i];
		if (c.date<d) {
			a = {
				className:'winnote-pageright',
				'z-index':2000
			}
			domHelper.mapToElement(c.element,a);
		}
		else {
			a = {
				className:'winnote-pageleft',
				'z-index':1200-i
			}
			if (this.active==-1) {
				this.active=i;
			}
			// if (c.date.getMonth()==d.getMonth() && c.date.getDate()==d.getDate())
				// a['z-index']=2000;
			domHelper.mapToElement(c.element,a);
		}
	}
	
	
}
WinNote.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	args.className = domHelper.mergeClassName(args.className, 'window');
	WinNote.prototype.base.initControls.call (this,args);

	this.initHead();
	this.initBody();

	
	return;
}

WinNote.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {},
			this_=this;

	args.active=0;
	args.opened=false;
	
	args.className = domHelper.mergeClassName(args.className,'winnote');
	
	if (!args.date) args.date = new Date();
	var d = args.date;
	args.year = d.getFullYear();
	args.month = d.getMonth()+1;
	args.day = d.getDate();
	args.state = 0;
	
	WinNote.prototype.base.init.call(this,args);
}

function IWinNote(){
	this.init(arguments[0]);
	sgApp.registerReference(this);
}

classHelper.register(WinNote,IWinNote);
