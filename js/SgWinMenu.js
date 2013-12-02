function SgWinMenu(){}

SgWinMenu.prototype.baseClass='SgWindow';

SgWinMenu.prototype.getElement = function getElement(k,o){
	return SgWinMenu.prototype.base.getElement.call(this,k,o);
}

SgWinMenu.prototype.deactivate = function deactivate(event){
	this.toogle(event,'active')
	this.isActive=false;
}
SgWinMenu.prototype.changeFocus = function changeFocus(event){
	
	this.isActive=!this.isActive;
	this.toogle(event,	'active')
	if (this.isActive) {
		sgApp.appActivate(this);
	}
}
SgWinMenu.prototype.initControls = function initControls(){
	var subitems=[{
		label: 'Equipo', 
		onclick:function(a){
							this_.toogle(event,'active')
						}
	}]
	var cl = new ISgList({
		name:'Links Permanentes',
		className:'top left list-winmenu',
		'items':subitems
	});
	
	var subitems=[{
		label: 'Explorer', 
		onclick:function(){sgApp.newApplication({appname:'Explorer'})}
		},
		{
		label: 'HtmlInspector',
		onclick:function(){
			var a=sgApp.newApplication({appname:'HtmlInspector'});
			a.setContent(treeHelper.fromHTML(document.getElementById('app_1')));
			}
		}
	]

	var cr = new ISgList({
		name:'Links Permanentes',
		className:'top right list-winmenu',
		'items':subitems
	});
	
	var l =  new ISgList({
		domParent:this.element,
		name:'Links Permanentes',
		className:'list-winmenu'
	});

	l.append(cl);
	l.append(cr);

	var apagar=new ISgControl({
		className:'btn-winmenu',
		innerHTML:'Apagar',
		onclick:function(){
							self.close()
						}
		});
	
	cl.append(apagar)

}
SgWinMenu.prototype.init = function init(){
	var this_=this;
	
	var args = arguments[0] ? arguments[0] : {};
	args.className = domHelper.mergeClassName(args.className,'sgwinmenu bottom');
	args.active=0;

	SgWinMenu.prototype.base.init.call(this,args);
	
	this.initControls();
	
}

function ISgWinMenu(){
	this.init(arguments[0]);
}

classHelper.register(SgWinMenu,ISgWinMenu);