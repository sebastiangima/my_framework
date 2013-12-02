function SgCommandBar(){}

SgCommandBar.prototype.baseClass='SgBar';

SgCommandBar.prototype.getElement = function getElement(k,o){
	return SgCommandBar.prototype.base.getElement.call(this,k,o);
}

SgCommandBar.prototype.onCmdClick = function onCmdClick(){
	//	alert('SgApp,title.cmdbar');
	this.owner.onCmdClick(arguments[0],arguments[1]);
}

SgCommandBar.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {};
	args.className = domHelper.mergeClassName(args.className,'sgcmdbar');

	var items = args.buttons;
	delete	args.buttons
	var this_=this;
	
	SgCommandBar.prototype.base.init.call(this,args);

	if (items)
		for (var i=0; i<items.length; ++i) {
			var c=null;
			switch(items[i].name) {
				case 'cerrar': c=new ISgControl({onmousedown:function(){return cancelEvent(arguments[0])},owner:this,domParent:this.element,innerHTML:'X',className:'sgcmdbar-btn close',onclick:function(){this_.onCmdClick('cerrar',event)}}); break;
				case 'minimizar': c=new ISgControl({onmousedown:function(){ return cancelEvent(arguments[0])},domParent:this.element,innerHTML:'_',className:'sgcmdbar-btn',onclick:function(){this_.onCmdClick('minimizar',event)}}); break;
				// case 'maximizar': c=new ISgControl({domParent:this.element,innerHTML:'&#9633;',className:'sgcmdbar-btn',onclick:function(){this_.onCmdClick('maximizar',event)}}); break;
				case 'maximizar': c=new ISgControl({
					onmousedown:function(){
						this_.onBubbles(arguments[0],arguments[1],{msg:'activate'});
						return cancelEvent(arguments[0])
					},
					domParent:this.element,innerHTML:'<div></div>',className:'sgcmdbar-btn maximize',val:0,onclick:function(){toogle(this_.element	,'val');this_.onCmdClick('maximizar',event)}}); break;
			}
	}
	
		
		
	
}
function ISgCommandBar(){
	this.init(arguments[0]);
}

classHelper.register(SgCommandBar,ISgCommandBar);
