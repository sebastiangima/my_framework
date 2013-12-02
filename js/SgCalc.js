
var calc_botoneras = [
	{name: 'standar'}
]
var calc_teclas = [
	{innerHTML:'MC',type:'proc',botonera:0,fila:0,col:0},
	{innerHTML:'MR',type:'proc',botonera:0,fila:0,col:1},
	{innerHTML:'MS',type:'proc',botonera:0,fila:0,col:2},
	{innerHTML:'M+',type:'proc',botonera:0,fila:0,col:3},
	{innerHTML:'M-',type:'proc',botonera:0,fila:0,col:4},

	{innerHTML:'&#8592;',type:'proc',botonera:0,fila:1,col:0},
	{innerHTML:'CE',type:'proc',botonera:0,fila:1,col:1},
	{innerHTML:'C',type:'proc',botonera:0,fila:1,col:2},
	{innerHTML:'±',type:'op2',botonera:0,fila:1,col:3},
	{innerHTML:'√',type:'op1',botonera:0,fila:1,col:4},

	{innerHTML:'7',type:'data',botonera:0,fila:2,col:0},
	{innerHTML:'8',type:'data',botonera:0,fila:2,col:1},
	{innerHTML:'9',type:'data',botonera:0,fila:2,col:2},
	{innerHTML:'÷',type:'op',botonera:0,fila:2,col:3},
	{innerHTML:'%',type:'op',botonera:0,fila:2,col:4},
	
	{innerHTML:'4',type:'data',botonera:0,fila:3,col:0},
	{innerHTML:'5',type:'data',botonera:0,fila:3,col:1},
	{innerHTML:'6',type:'data',botonera:0,fila:3,col:2},
	{innerHTML:'*',type:'op',botonera:0,fila:3,col:3},
	{innerHTML:'1/x',type:'op',botonera:0,fila:3,col:4},

	{innerHTML:'1',type:'data',botonera:0,fila:4,col:0},
	{innerHTML:'2',type:'data',botonera:0,fila:4,col:1},
	{innerHTML:'3',type:'data',botonera:0,fila:4,col:2},
	{innerHTML:'-',type:'op',botonera:0,fila:4,col:3},
	{innerHTML:'=',type:'op0',botonera:0,fila:4,col:4,alto:2},
	
	{innerHTML:'0',type:'data',botonera:0,fila:5,col:0,ancho:2},
	{innerHTML:',',type:'data',botonera:0,fila:5,col:2},
	{innerHTML:'+',type:'op',botonera:0,fila:5,col:3},
	
	
]

function SgCalc(){}

SgCalc.prototype.baseClass='SgAppWin';

SgCalc.prototype.getControl = function getElement(k,o){
	switch(k){
		case 'content':
		case 'body':		 return this.controls[this.id+'_content'];	break;
		case 'pantalla': return this.controls[this.id+'_pantalla']; break;
	}
	return SgCalc.prototype.base.getControl.call(this,k,o);
}

SgCalc.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return SgCalc.prototype.base.getElement.call(this,k,o);
}

SgCalc.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

SgCalc.prototype.initHead = function initHead(){

	var d = domHelper.div({innerHTML:'hola'});
	var args=arguments[0] ? arguments[0] : {}
	
	var ico = 
	
	args.imgurl=args.ico || 'icocalc1.png';
	delete args.ico;
	
	args.className = domHelper.mergeClassName(args.className,'calc');
	
	//this.head = SgCalc.prototype.base.initHead.call	(this,args);

}	

SgCalc.prototype.onKeyDown = function onKeyDown(e){
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

SgCalc.prototype.removeLastData = function removeLastData(ecuation){
	var op = this.getLastData(ecuation);
	eval('var re=/'+op+'$/');
	ecuation=ecuation.replace(re,'');
	var aux = ecuation.replace(/([^0-9,])-$/,'$1')
	if (aux != ecuation) {
		ecuation = aux;
		op='-'+op;
	}
	else {
		if (ecuation=='-') {
			ecuation='';
			op='-'+op;
		}
	}
	
	return {input:op,'ecuation':ecuation};
}
SgCalc.prototype.getLastData = function getLastData(ecuation){
	return ecuation.replace(/^.*[^0-9,]([0-9,]*)$/,'$1');
}
SgCalc.prototype.setMemory = function setMemory(c){
	this.memory.state=1;
	this.memory.value = c.input;
	c.setMemoryState(1,this.memory.value);
}

SgCalc.prototype.calculeProc = function calculeProc(input,ecuation,t){
	switch(t) {
	
		case 'CE':	
			if (input=='') {
			}
			else {
				eval('var er = /'+input+'$/');
				ecuation = ecuation.replace(er,'');
				input='';
			}
		break;
		case '&#8592;':
			if (input=='') {	// borra operacion
				this.accept.data=1;
				this.accept.op=1;
				this.accept.op0=1;
				
				ecuation = ecuation.replace(/.$/,'');
				var aux = this.removeLastData(ecuation);
				input = aux.input;//this.getLastData(ecuation);
				
			}
			else {
				ecuation = ecuation.replace(/.$/,'');
				input=input.replace(/.$/,'');
				if (input=='') {
					this.accept.data=1;
					this.accept.op=0;
					this.accept.op0=0;
				}
			}
		break;
	}
	return {'ecuation':ecuation,'input':input}
}

SgCalc.prototype.canAccept = function canAccept(c,s){
	
}

SgCalc.prototype.getActionIndex = function getActionIndex(){
	return this.actions.length-1;
}
SgCalc.prototype.markError = function markError(c,state){
	var color = 'black';
	if (state==1) {
		color='red';
	}
	this.errorState=state;
	c.element.style.borderColor=color;
}
SgCalc.prototype.onTeclaClick = function onTeclaClick(){
	var c = this.getControl('pantalla');
	var input = c.input,
			ecuation = c.ecuation;		
	var t=arguments[0].sender.type;
	var v=arguments[0].sender.value;
	
	var index = this.getActionIndex();
	var error=0;
	
	if (index==-1 && t!='data')
		error=1;
	else {
		if (this.actions[index].type=='data') {
		}
		else {
		}
	}

	if (error)
		this.markError(c,1);
	else if (this.errorState==1) {
		this.markError(c,0);
	}
	
	c.update({Input:input,Ecuation:ecuation})
	cancelEvent(arguments[0].event);
	return false;

}

SgCalc.prototype.onTeclaClick_ = function onTeclaClick(){
	var c = this.getControl('pantalla');
	var input = c.input,
			ecuation = c.ecuation,
			ecop = '';
			
	var t=arguments[0].sender.type;
	var v=arguments[0].sender.value;
	if (this.accept[t]==0) {
		c.element.style.borderColor='red';
		return false;
	}
	else
		c.element.style.borderColor='';
	
	switch (t) {
		case 'data':
			input+=v;
			ecuation+=v;
			this.accept.op0=1;
			this.accept.data=1;	this.accept.op1=1;	this.accept.op=1;	this.accept.proc=1;
		break;
		case 'proc':
			switch(v) {
				case 'M+':	
					if (this.memory.state==0) {
						this.memory.state=1;
						this.memory.value=+input;
						c.setMemoryState(1,this.memory.value);
					}
					else {
						this.memory.value=+this.memory.value+(+input);
						c.setMemoryState(1,this.memory.value);
					}
					input='';
					this.accept.data=1; this.accept.op=0;
				break;
				case 'M-':	
					if (this.memory.state==0) {
						this.memory.state=1;
						this.memory.value=-input;
					}
					else {
						this.memory.value=+this.memory.value-(+input);
					}
					c.setMemoryState(1,this.memory.value);
					this.accept.data=1; this.accept.op=0;
				break;
				case 'MR':
					if (this.accept.op==1)
					if (this.memory.state==1) {
						var op='';
						if (input!='') {
							op = this.removeLastData(ecuation);
							input=this.memory.value;
							ecuation=op.ecuation+input;
						}
						else {
							input=this.memory.value;
							ecuation+=input;
							this.accept.data=0;this.accept.op=1;this.accept.op0=1;this.accept.op1=1;this.accept.op2=1;
						}
					}
				break;
			
				case 'MC':	c.setMemoryState(0,0); this.memory = {state:0, value:0, op: ''}; break;
				case 'MS':
					this.setMemory(c);
				break;
				case 'C':	input='';	ecuation='';	
					this.accept.data=1;
					this.accept.op=0;
					this.accept.op0=0;
					this.accept.proc=1;
				break;
				default :	
					var args=this.calculeProc(input,ecuation,v);
					input=args.input;
					ecuation = args.ecuation;
					
				break;
			}
		break;
		case 'op1':
			var op=this.getLastData(ecuation);
			if (v=='√') {
			
				eval('var re=/'+op+'$/');
				ecuation=ecuation.replace(re,'');
				op='√'+op;
				ecuation+=op;
				this.accept.data=0;
				this.accept.op=1;
				this.accept.op0=1;
				this.accept.op1=0;
				this.accept.proc=1;
				input='';
			}
		break;
		case 'op0':
			var result='';
			ecuation=ecuation.replace(/÷/g,'/');
			ecuation=ecuation.replace(/√([0-9,]*)/g,'Math.sqrt($1)');
			eval('result=(+'+ecuation+').toString()');
			input='';
			ecuation=result;
			this.accept.data=0;
			this.accept.op=1;
			this.accept.op0=0;
			this.accept.op1=0;
			this.accept.proc=1;
		break;
		case 'op2':
			var op = this.getLastData(ecuation);
			eval('var re=/'+op+'$/');
			ecuation=ecuation.replace(re,'');
			
			if (input.indexOf('-')==0) {
				ecuation=ecuation.replace(/-$/,'');
				input=input.replace('-','');
			}
			else input='-'+input;
			ecuation+=input;
		break;
		case 'op':
			input='';
			ecuation+=v;
			this.accept.data=1;
			this.accept.op=0;
			this.accept.op1=0;
			this.accept.op0=0;
			this.accept.proc=1;
		break;
	}
	
	c.update({Input:input,Ecuation:ecuation})
	cancelEvent(arguments[0].event);
	return false;
	
}

SgCalc.prototype.onClick= function onTeclaClick(){
	console.log(arguments);
}

SgCalc.prototype.initPantalla = function initPantalla(){
	var a = {
		id : this.id+'_pantalla',
		owner:this.getControl('content'),
		handler:this
	}
	this.controls[a.id] = new ISgCalcPantalla(a);
	
}

SgCalc.prototype.callback = function callback(e,s,h,l,m){
	console.log(arguments);
	return;
	if (!this[l])
		return this.owner.callback(e,s,h,l,m);
	return this[l](e,s,h,l,m);
}

SgCalc.prototype.initTeclado = function initTeclado(){
	var this_=this;
	var a = {
		id : this.id+'_teclado',
		owner:this.getControl('content'),
		teclas:calc_teclas,
		handler:this
	}
	this.controls[a.id] = new ISgTeclado(a);
}

SgCalc.prototype.initBody = function initBody(){

	var a = {
		id : this.id+'_menu',
		className: 'calc-menu',
		owner:this.body
	}
	this.controls[a.id] = new ISgControlContainer(a);
	var a = {
		id : this.id+'_content',
		className: 'calc-content',
		owner:this.body
	}
	this.controls[a.id] = new ISgControlContainer(a);
	this.initPantalla()
	this.initTeclado();
}

SgCalc.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola', className:'calc-container'});
	
	var args={controlParams:{head:{className:'calc'},body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	
	SgCalc.prototype.base.initControls.call (this,args);

	SgCalc.prototype.initBody.call (this);
	
	
	return;
}

SgCalc.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'calc');
	SgCalc.prototype.base.init.call(this,args);
	this.accept = {data:1,op:0,proc:0,op0:0,op1:0,op2:1};
	this.actions=[];
	this.memory = {
		state : 0,
		value : 0,
		op : ''
	}
	//SgCalc.prototype.base.initControls.call(this,args);

	
}

function ISgCalc(){
	this.init(arguments[0]);
	sgApp.appActivate(this);
}

classHelper.register(SgCalc,ISgCalc);
