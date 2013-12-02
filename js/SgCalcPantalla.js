function SgCalcPantalla(){}

SgCalcPantalla.prototype.baseClass='SgControlContainer'

SgCalcPantalla.prototype.getElement = function getElement(k,o){
	return SgCalcPantalla.prototype.base.getElement.call(this,k,o);
}

SgCalcPantalla.prototype.getControl = function getControl(k,o){
	switch (k) {
		case 'input': return this.controls[this.id+'_input']; break;
		case 'ecuation': return this.controls[this.id+'_ecuation']; break;
		case 'memory': return this.controls[this.id+'_memory']; break;
	}
	return SgCalcPantalla.prototype.base.getControl.call(this,k,o);
}

SgCalcPantalla.prototype.update = function update(){
	for (var i in arguments[0]) {
		this['update'+i](arguments[0][i])
	}
}

SgCalcPantalla.prototype.updateEcuation = function updateEcuation(input){
	this.ecuation=input;
	this.getControl('ecuation').setContent(this.ecuation);
}

SgCalcPantalla.prototype.updateInput = function updateInput(input){
	this.input=input;
	this.getControl('input').setContent(this.input.toString());
	
}

SgCalcPantalla.prototype.setMemoryState = function setMemoryState(state,value){
	var c=this.getControl('memory');
	if (c.element.getAttribute('state')!=state)
		c.toogle(c.element,'state');
	c.element.title=value;
}
SgCalcPantalla.prototype.onTecla = function onTecla(t){
}

SgCalcPantalla.prototype.callback = function callback(){
	if (!this[arguments[0].listener])
		return this.owner.callback(arguments[0]);
	return this[arguments[0].listener](arguments[0]);
}

SgCalcPantalla.prototype.initControls = function initControls(){

	SgCalcPantalla.prototype.base.initControls.call(this)

	var args = {
		id:this.id+'_ecuation',
		className:'calc-pantalla-ecuation',
		owner:this,
		handler:this.handler
	}	
	this.controls[args.id] = new ISgControlContainer(args);
	var args = {
		id:this.id+'_memory',
		className:'calc-pantalla-memory',
		innerHTML:'M',
		owner:this,
		handler:this.handler
	}	
	this.controls[args.id] = new ISgControlContainer(args);
	var args = {
		id:this.id+'_input',
		className:'calc-pantalla-input',
		owner:this,
		handler:this.handler
	}	
	this.controls[args.id] = new ISgControlContainer(args);
}

SgCalcPantalla.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	args.input='';
	args.ecuation='';
	args.className=domHelper.mergeClassName(args.className,'calc-pantalla');
	SgCalcPantalla.prototype.base.init.call(this,args);
}

function ISgCalcPantalla(){
	this.init(arguments[0]);
}

classHelper.register(SgCalcPantalla,ISgCalcPantalla);