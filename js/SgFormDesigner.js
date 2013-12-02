function SgFormDesigner(){}

SgFormDesigner.prototype.baseClass='SgAppPanelWin';

SgFormDesigner.prototype.getControl = function getControl(k,o){
	switch(k){
		case 'content':
		case 'body':		 return this.controls[this.id+'_content'];	break;
	}
	return SgFormDesigner.prototype.base.getControl.call(this,k,o);
}

SgFormDesigner.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'content':
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return SgFormDesigner.prototype.base.getElement.call(this,k,o);
}

SgFormDesigner.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

SgFormDesigner.prototype.onKeyDown = function onKeyDown(e){
//	var c = this.getControl('body'),
	this.placeKey(e);
	//div.innerHTML=
}


SgFormDesigner.prototype.placeKey = function placeKey(e){
	if (this.caret.activeNode == -1) {
		this.caret.activeNode = textHelper.newTextNode(this);
		this.caret.nodeContents.push(this.caret.nodeContents[0]);
		this.body.element.appendChild(this.caret.activeNode);
		this.caret.activeNode.element.innerHTML=this.caret.nodeContents[0];
	}
	else {
		this.caret.caretIndex++;
		
		this.caret.nodeContents[0]+=textHelper.mapKeyCode(e.keyCode);
		this.caret.activeNode.element.innerHTML=
			this.caret.nodeContents[0];
		
	}
}

SgFormDesigner.prototype.placeCaret = function placeCaret(e){
	this.caret.caret = sgApp.getCaret(this);
	// var c= this.getControl('body');
	
	if (this.caret.activeNode == -1) {
		var a = {
			claseName: 'textNode',
			owner: this.body,
			handler:this,
			onclick:null
		}
		this.caret.caretIndex = 0;
		
		this.caret.activeNode = new ISgControlContainer(a)
		this.caret.activeNodeIndex=0;
		this.caret.nodeContents[this.caret.activeNodeIndex]=this.caret.activeNode.element.innerHTML;
		
		this.body.element.appendChild(this.caret.activeNode.element);
		this.body.element.appendChild(
			this.caret.caret.element.parentNode.removeChild(this.caret.caret.element));
	}
	
}

SgFormDesigner.prototype.activate = function activate(e){
	this.placeCaret();
	return SgFormDesigner.prototype.base.activate.call(this,e);
}

SgFormDesigner.prototype.onKeyDown_ = function onKeyDown(e){
	return this.onKeyDown(e);
	var result = false, msg=null;
	switch (e.keyIdentifier) {
		case 'U+00BB': 
			if (e.shiftKey) msg={sender:{type:'op',value:'*'}}; 
			else msg={sender:{type:'op',value:'+'}}; 
		break;
		case 'U+0030': msg={sender:{type:'op0',value:'='}}; break;
		case 'U+0037': if (e.shiftKey) msg={sender:{type:'op',value:'/'}}; break;
		case 'U+0008': msg={sender:{type:'proc',value:'&#8592;'}}; break;
		case 'Enter': msg={sender:{type:'op0',value:'='}}; break;
	}
	console.log(e)
	if (!msg)
		switch(e.keyCode){
			case 48:	case 49:	case 50:	case 51:	case 52:	case 53:	case 54:	case 55:	case 56:	case 57:
				var msg = {
					sender:{type:'data',value:String.fromCharCode(e.keyCode)}
				}
				
				
			break;
			default:console.log(e);break;
		}
	if (msg) {
		msg.event=event;
		this.onTeclaClick(msg);
		return true;
	}
	return false;
}


SgFormDesigner.prototype.onToolbarClick = function onToolbarClick(e,o){
	toogle2(e,o.children[0],'state');
	var state=o.getAttribute('state');
	var c=this.getControl('body');
	var this_=this;

	var v,args={};
	v=textHelper.newTextNode(this);
	if (state=='0')
		v.className=domHelper.mergeClassName(v.className,'black');
	else
		v.className=domHelper.mergeClassName(v.className,'red');
	//	v=textHelper.newTextNode(this);
	c.element.appendChild(v);
	
	

	cancelEvent(e)
	v.focus();
	return;
	
	
	var b={
		className:'line-text',
		id:a.id+'_lines_1',
//		contentEditable:'true',
		innerHTML:'&nbsp;',
		position:'relative',
		'float':'left',
		color:'red',
		onkeydown:function(){
			textHelper.onkeydown(arguments[0],arguments[1],this_);
			cancelEvent(arguments[0])
			return false;
		},
		onclick:function(){
			cancelEvent(arguments[0]);
			arguments[1].focus();
			return false;
		}
	}
	b.sg={
		text: {
			pos:0
		}
	}
	var div=domHelper.div(b)
	c.appendChild(div);	
	div.focus();
	
}

SgFormDesigner.prototype.onClick= function onTeclaClick(){
	console.log(arguments);
}

SgFormDesigner.prototype.callback = function callback(e,s,h,l,m){
	console.log(arguments);
	return;
	if (!this[l])
		return this.owner.callback(e,s,h,l,m);
	return this[l](e,s,h,l,m);
}

SgFormDesigner.prototype.initHead = function initHead(){

	var d = domHelper.div({innerHTML:'hola'});
	var args=arguments[0] ? arguments[0] : {}
	
	var ico = 
	
	args.imgurl=args.ico || 'icocalc1.png';
	delete args.ico;
	
	args.className = domHelper.mergeClassName(args.className,'calc');
	
	//this.head = SgFormDesigner.prototype.base.initHead.call	(this,args);

}	


SgFormDesigner.prototype.initBody = function initBody(){

	var a = {
		id : this.id+'_menu',
		className: 'general-menu',
		owner:this.body,
		handler:this,
		items:fdmenu
	}
	var c = new ISgAppMenu(a);

	var a = {
		id : this.id+'_toolbar',
		className: 'general-menu',
		owner:this.body,
		handler:this,
		items:fdtoolbar
	}
	var c = new ISgAppMenu(a);

	
	this.controls[a.id] = c;
	var a = {
		id : this.id+'_content',
		className: 'general-content',
		owner:this.body,
		//contentEditable:'true',
		focusable:true,
//		contentEditable:'true',
		onfocus:function(){
		//	arguments[1].focus();
		//	cancelEvent(arguments[0]);
		if (arguments[1].childNodes.length)
			textHelper.placeCaretAtEnd(arguments[1].childNodes[arguments[1].childNodes.length-1]);
		else textHelper.placeCaretAtEnd(arguments[1]);
			return true;
		},
		onmousedown:function(){
			arguments[1].focus();
		//	cancelEvent(arguments[0])
			return false;
		},
		onclick:function(){
			arguments[1].focus();
			cancelEvent(arguments[0]);
			return false;
		},
		handler:this
	}
	
	this.controls[a.id] = new ISgControlContainer(a);
	
	this.body=this.getControl('body');
	var this_=this;
	var v=textHelper.newTextNode(this	)

	c.element.appendChild(v);
	
	
	
//	textHelper.placeCaretAtEnd(v);
	
	// var b={
		// className:'line-text',
		// id:a.id+'_lines_0',
		// content	:'true',
		// innerHTML:'sfg',
		// position:'relative',
		// 'float':'left'
		
	// }
	
	// this.controls[a.id].appendChild(domHelper.div(b));
}

SgFormDesigner.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola', className:'calc-container'});
	
	var args={controlParams:{head:{className:'calc'},body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};

	args.id=this.id+'_content_';
	SgFormDesigner.prototype.base.initControls.call (this,args);

	SgFormDesigner.prototype.initBody.call (this);
	
	return;
}

SgFormDesigner.prototype.makeTabOrder = function makeTabOrder(){
	console.log('SgFormDesigner.makeTabOrder#'+this.id);

	var j=-1;
	for (var i in this.controls) {
		if (this.controls[i].focusable && this.controls[i].focusContext && this.controls[i].focusContext.inter) {
			var o = {id:i, 
								autoIndex:++j,
								settedIndex:this.controls[i].focesContext.inter.tabOrder
							}
		}
	}
}

SgFormDesigner.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'notepad');
	// args.activeNode=-1;
	// args.caretIndex=0;
	args.caret=null;
	// args.text=[];
	// args.domText=[];
	args.caret= {
		sl:0,		s:0,	sr:0,
		caretIndex:0,	caret:null,
		activeNode:-1,
		nodeContents:[],
		activeNodeIndex:-1
	}
	args.focusCicle={};
	
	
	SgFormDesigner.prototype.base.init.call(this,args);
	
	args={
		id:this.id+'_input',
		owner:this.body,
		left:'15px',
		// top:'20px',
		top:'auto',
		
		'margin-top':'10px',
		handler:this
	}
	var c = new ISgInput(args)
	this.controls[c.id]=c;

	args={
		id:this.id+'_input_2',
		owner:this.body,
		handler:this,
		'margin-top':'5px',
		top:'auto',
		//top:'45px',
		left:'15px'
	}
	var c = new ISgInput(args)
	this.controls[c.id]=c;

	args={
		id:this.id+'_input_3',
		owner:this.body,
		top:'auto',
		'margin-top':'5px',
		//top:'120ox',
//		handler:this,
		left:'15px'
	}
	var c = new ISgInput(args)
	this.append(c,true,{handler:this});
			
	
}

function ISgFormDesigner(){
	this.init(arguments[0]);
	
}

classHelper.register(SgFormDesigner,ISgFormDesigner);

var fdmenu=[
	{name:'Archivo',childs:[
		{name:'Nuevo'},
		{name:'Abrir'},
		{name:'Guardar'},
		{name:'Cerrar'}
	]},
	{name:'Editar',childs:[
		{name:'copiar'},
		{name:'cortar'},
		{name:'pegar'}
	]}
]

var fdtoolbar=[
	{name:'Color', caption:' ', klass:'red', active:0}
]