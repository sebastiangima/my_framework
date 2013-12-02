function SgFocusable(){}


SgFocusable.prototype.baseClass = 'ISgControlContainer'

SgFocusable.prototype.keyActions = {
	ctrl: {	
		cond: function() {
			return arguments[0].keyCode != 65;
		},
		action: function(){	return arguments[0].keyCode != 68; }
	}
}

SgFocusable.prototype.focus = function focus(){
	SgFocusable.prototype.base.focus.call(this);
	this.takeFocus()
}

SgFocusable.prototype.onTab = function onTab(e,o){
	var shift = e.shiftKey,
			ctrl = e.ctrlKey,
			direction = e.shiftKey ? -1 : 1;
	
	this.handler.requestAction({name:'blur',impulse:'tab',sender:this, msg:{'direction':direction}});
	//var handler = this.handler || null,
	
			
}

SgFocusable.prototype.lostFocus = function lostFocus(){
	SgFocusable.prototype.base.lostFocus.call(this);
}

SgFocusable.prototype.deactivate = function deactivate(){
	SgFocusable.prototype.base.deactivate.call(this);
}


SgFocusable.prototype.onKeyDown = function onKeyDown(e,o){
	if (e.ctrlKey && SgFocusable.prototype.keyActions['ctrl']) {
		if (SgFocusable.prototype.keyActions['ctrl'].action && SgFocusable.prototype.keyActions['ctrl'].action(e)) {
			return false;
		}
			
	}
	e.preventDefault();
	var key = textHelper.mapKeyCode(e);
	var inicial = this.text.element.innerHTML;
	var s0 = inicial.substr(0,this.caretPos.left);
	var s1 = inicial.substr(this.caretPos.left);
//	this.caretPos.left,
	
	if (e.shiftKey && e.keyCode>=36 && e.keyCode<=40)
		return false;
	e.preventDefault();
	switch (e.keyIdentifier) {
		case 'U+0008': 
			if (this.caretPos.left==0) 
				return false;
			this.caret.element.innerHTML = s0.substr(this.caretPos.left-1,1);
			this.caret.margins.left-=(this.caret.element.offsetWidth);
			//this.caret.element.innerHTML = ''
			this.caretPos.left--;
			s0=s0.substr(0,this.caretPos.left);
			inicial = s0+s1;
			//this.caret.element.style.marginLeft=this.caret.margins.left+'px';
			
		break;
		case 'U+0009':	return this.onTab(e,o);	break;
		case 'Home':
			this.caret.margins.left=3;
			
			this.caretPos=0;
		break;
		case 'Right':
			if (this.caretPos.left==this.text.element.innerHTML.length)
				return false;
			this.caret.element.innerHTML = inicial.substr(this.caretPos.left,1);
			this.caret.margins.left+=this.caret.element.offsetWidth;
			//this.caret.element.innerHTML = ''
			this.caretPos.left++;
		break;
		case 'Left':
			if (this.caretPos.left==0) return false;
			
			this.caret.element.innerHTML = inicial.substr(this.caretPos.left-1,1);
			this.caret.margins.left-=this.caret.element.offsetWidth;
			//this.caret.element.innerHTML = ''
			this.caretPos.left--;
			//inicial=inicial.substr(0,this.caretPos.left);
			
		break;
		default:
			inicial = s0 + key + s1;
			
			this.caret.element.innerHTML=key;
			this.caretPos.left++;
			this.caret.margins.left+=this.caret.element.offsetWidth+3;
		break;
	}
	
	
	//this.caret.style.left=

	
	
	this.text.element.innerHTML = inicial;
	this.caret.element.innerHTML = '';
	this.caret.element.style.marginLeft=(this.text.element.offsetWidth+3)+'px';
	
	
	cancelEvent(e);
	return true;
	
}

SgFocusable.prototype.initControls = function initControls(){

	var args = arguments[0] || {controlParams:{body:{},head:{}}};
	
	SgFocusable.prototype.base.initControls.call(this,args);

	var args={
		id:this.id+'_text',
		owner:this,
		className: 'focusable-text',
		handler:this.handler,
		'margin-left':'3px'
	}
	
	var c = new ISgControlContainer(args);
	this.text = this.controls[c.id]=c;

	var args={
		id:this.id+'_caret',
		owner:this,
		'margin-left':'3px',
		handler:this.handler
	}
	
	var c = new ISgCaret(args);
	this.caret = this.controls[c.id]=c;

	
}

SgFocusable.prototype.setFocus = function setFocus(focused){
	if (focused) {
		if (this.focused)
			return;
		this.focused=true;
		
	}
	else {
		if (this.focused) {
			this.focused=false;
		}
		else {
			return;
		}
	}
	this.toogle(this.element,'state');
	
}

SgFocusable.prototype.takeFocus = function takeFocus(e,o){
	var focusChanged = !this.focused;
			this.owner.onFocusChange(this,true);
	if (focusChanged && this.owner && this.owner.onFocusChange && this.owner.onFocusChange instanceof Function) {
		
		this.owner.onFocusChange(this,true);
	}
	
	this.setFocus(true)
	
	if(e)	cancelEvent(e);
	return false;
}

SgFocusable.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}

	args.className = domHelper.mergeClassName(args.className, 'sgfocusable');
	var f = args.onclick;
	var this_=this;
	args.state = 0;
	args.caretPos={top:0, left:0};
	args.focusable=true;
	
	args.focusContext = {
		intra: false,
		inter: {
			tabOrder: -1,
			next:function(){
						return this_.doAction('next');
					},
			prev: function(){
						return this_.doAction('prev');
			},
			focused:false
		}
	}
	
	args.onclick = function() {
		return this_.takeFocus(arguments[0], arguments[1]);
	}
	SgFocusable.prototype.base.init.call(this,args);	
}

function ISgFocusable(){
	this.init(arguments[0]);
}
classHelper.register(SgFocusable,ISgFocusable);
