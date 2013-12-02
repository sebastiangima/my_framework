function SgTeclado(){}

SgTeclado.prototype.baseClass='SgControlContainer'

SgTeclado.prototype.getElement = function getElement(k,o){
	return SgTeclado.prototype.base.getElement.call(this,k,o);
}


SgTeclado.prototype.callback = function callback(){
	if (!this[arguments[0].listener])
		return this.owner.callback(arguments[0]);
	return this[arguments[0].listener](arguments[0]);
}

SgTeclado.prototype.initControls = function initControls(){
	//var this_=this;
	for (var i=0; i<this.teclas.length; ++i) {
		var a = this.teclas[i];
		a.className='calc-tecla';
		a.owner=this;
		a.id=this.id+'_'+a.innerHTML;
		a.handler=this.handler;
		var t = new ISgTecla(a);
		this.controls[a.id]=t;
	}
}

SgTeclado.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	args.className=domHelper.mergeClassName(args.className,'calc-teclado');
	SgTeclado.prototype.base.init.call(this,args);
}

function ISgTeclado(){
	
	
	this.init(arguments[0]);
}

classHelper.register(SgTeclado,ISgTeclado);