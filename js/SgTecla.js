function SgTecla(){}

SgTecla.prototype.baseClass='SgControlContainer'

SgTecla.prototype.onClick = function onclick(){
	if (this.handler && this.handler.onClick && this.handler.onClick instanceof Function) {
		var args={
			event:arguments[0],
			sender:this,
			msg:{node:arguments[1]}
		}
		this.handler.onTeclaClick(args)
	}
}
SgTecla.prototype.oncClick = function onClick(){
	this.handler.onclick(args);
	console.log(this.handler);
	//this.owner.callback(args);
}

SgTecla.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {}
	args.className=domHelper.mergeClassName(args.className,'SgTecla');
	var this_=this;
	args.value=args.innerHTML;
	args.onclick=function(){
		return this_.onClick(arguments[0],arguments[1])
	}
	
	// args.onclick=function(){
		// this_.onClick(arguments[0],arguments[1]);
	// }
	SgTecla.prototype.base.init.call(this,args);
}

function ISgTecla(){
	this.init(arguments[0]);
}

classHelper.register(SgTecla,ISgTecla);