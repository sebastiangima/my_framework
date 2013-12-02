function SgTitleBar(){}

SgTitleBar.prototype.baseClass='SgBar';
SgTitleBar.prototype.getElement = function getElement(k,o){
	return SgTitleBar.prototype.base.getElement.call(this,k,o);
}

SgTitleBar.prototype.append = function append(c,indom){
	this.controls[this.id+'_glass'].append(c,indom);
}


SgTitleBar.prototype.onCmdClick = function onCmdClick(){
	//	alert('SgApp.tirlebar');
		this.owner.onCmdClick(arguments[0],arguments[1]);
		
}
SgTitleBar.prototype.initControls = function initControls(){
	SgTitleBar.prototype.base.initControls.call(this);
	if (this.ico) {
	
	}
}

SgTitleBar.prototype.addIcon = function addIcon(icon){
	this.controls[icon.id]=d;
}
SgTitleBar.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'sgbar title-bar');
	args.innerHTML=args.apptitle;
	

	var items = args.items;
	delete	args.items
	delete	args.apptitle
	
	SgTitleBar.prototype.base.init.call(this,args);

	var a={
		//owner:this,
		domParent:this.element,
		id:this.id+'_glass',
		className:this.className + ' glass'
	}
	this.controls[a.id]=new ISgControlContainer(a);


	if (items)
		for (var i=0; i<items.length; ++i) {
			var d=document.createElement('div');
			d.innerHTML=items[i].label;
			var item = items[i];
			d.onclick=function(){ item.onclick(event,this) };
			this.element.appendChild(d);
	}
	var this_=this;
	var c=new ISgCommandBar({	owner:this,domParent:this.element,buttons:[
							{		name:'cerrar',onclick:function(){
								this_.onCmdClick('cerrar',event)}
							}	,
							{		name:'maximizar',onclick:function(){
								this_.onCmdClick('maximizar',event)}
							}	,							
							{		name:'minimizar'	,onclick:function(){
								this_.onCmdClick('maimize',event)}}
							]})
	
}
function ISgTitleBar(){
	this.init(arguments[0]);
}

classHelper.register(SgTitleBar,ISgTitleBar);
