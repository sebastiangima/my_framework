function SgTaskBar(){}

SgTaskBar.prototype.baseClass='SgBar'

SgTaskBar.prototype.getTabControlContainer = function getTabControlContainer(type){
	if (!type) type="apptab";
	switch(type) {
		case 'apptab':return this.controls[this.id+'_apptabs']; break;
	}
}

SgTaskBar.prototype.callback = function callback(s,m,a){
	switch(m) {
		case 'SGWN_CLOSE':
			if (this.controls.bar_apptabs.controls[s.id+'_apptab'])
				this.controls.bar_apptabs.controls[s.id+'_apptab'].destroy();
		break;
	}
}

SgTaskBar.prototype.initControls = function init(args){
	var a = {
		owner:this,
		className:'taskbar-apptabs',
		id:this.id+'_apptabs'
	}

	this.controls[a.id]=new ISgControlContainer(a);
	var a = {
		owner:this,
		className:'taskbar-quick',
		id:this.id+'quick'
	}

	this.controls[a.id]=new ISgTime	(a);
	
	
	this.btnInicio=new ISgButton({
				owner:this, 
				name:'INICIO', 
				id:	'btnInicio',
				caption:'INICIO', 
				onclick:function(){
					sgApp.winmenu.changeFocus(event);
					
				}
			}	
		)
	
	
	this.controls['btnInicio']=this.btnInicio;
}
SgTaskBar.prototype.init = function init(args){
	if (!args) args = {};
	
	args.className = domHelper.mergeClassName(args.className,'sgbar sgtask');
	
	SgTaskBar.prototype.base.init.call(this,args);
	//this.initControls();
}
function ISgTaskBar(){
	this.init(arguments[0]);
}
classHelper.register(SgTaskBar,ISgTaskBar);
