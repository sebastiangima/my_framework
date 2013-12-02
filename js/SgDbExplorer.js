function SgDbExplorer(){}

SgDbExplorer.prototype.baseClass='SgExplorer';

SgDbExplorer.prototype.getControl = function getElement(k,o){
	return SgDbExplorer.prototype.base.getControl.call(this,k,o);
}
SgDbExplorer.prototype.getElement = function getElement(k,o){
	return SgDbExplorer.prototype.base.getElement.call(this,k,o);
}

SgDbExplorer.prototype.setContent = function setContent(content,to){
	if (!to) to='centerpanel';
	var panel=this.getControl(to);
	panel.setContent(content);
}

SgDbExplorer.prototype.initHead = function initHead(){
	SgDbExplorer.prototype.base.initHead.call (this);
}

SgDbExplorer.prototype.initLeftPanel = function initLeftPanel(){
	
}
SgDbExplorer.prototype.initPanels = function initPanels(){
	this.initLeftPanel();
}
SgDbExplorer.prototype.initBody = function initBody(){
	SgDbExplorer.prototype.base.initBody.call (this,args);
	return;
		var d = domHelper.div({id:this.id+'_selector',height:'50px'});
		var a = {
			id:this.id+'_selector_tags',
			items:[
				{id:1,value:'a'},
				{id:2,value:'b'},
				{id:3,value:'body'},
				{id:4,value:'div'},
				{id:5,value:'input'},
				{id:6,value:'span'},
				{id:7,value:'textarea'}
			],
			defaults:'Seleccione nodo',
			defaultSelection:0,
			creator:'SgDbExplorer',
			instance:++_instance,
			domParent: d,
			height:'30px'
		}
	var c = new ISgDropDown(a);
	var this_=this;
	this.selector=c;
	var args={body:{menu1:false,menu2:false}};
	var args={controlMenu1:d,menu1:false,menu2:false};
	SgDbExplorer.prototype.base.initBody.call (this,args);
	

	
	var dd = domHelper.div({id:this.id+'_selector_attr',float:'left',width:'200px',height:'50px'});
		var a = {
			id:this.id+'_selector_style',
			items:[
				{id:1,value:'height'},
				{id:2,value:'width'},
				{id:3,value:'top'},
				{id:4,value:'left'},
				{id:5,value:'bottom'},
				{id:6,value:'right'},
				{id:7,value:'position'},
				{id:8,value:'border'},
				{id:9,value:'z-index'},
				{id:10,value:'background'}
			
			],
			defaults:'Seleccione stile',
			defaultSelection:0,
			creator:'SgDbExplorer',
			instance:++_instance,
			domParent: d,
			height:'30px'
		}
		
	var c = new ISgDropDown(a);	
		var dd = domHelper.div({id:this.id+'_inspect', innerHTML:'inspect',position:'absolute',
	top:'0px',right:'0px',
	onclick: function(){return this_.onInspectClick(arguments[0],arguments[1])}});
	d.parentNode.appendChild(dd);
	this.styleSelector = c;
	
	//var dd = domHelper.div({id:this.id+'_selector_method',float:'left',width:'200px',height:'50px'});
		var a = {
			id:this.id+'_selector_method',
			items:[
				{id:1,value:'onmousedown'},
				{id:2,value:'onmouseup'},
				{id:3,value:'onclick'},
				{id:4,value:'ondblclick'},
				{id:5,value:'onmouseover'},
				{id:6,value:'onmouseout'},
				{id:7,value:'onscroll'},
				{id:8,value:'onkeydown'},
				{id:9,value:'onkeyup'},
				{id:10,value:'onkeypress'},
				{id:11,value:'onmousedown'},
				{id:12,value:'onselect'},
				{id:13,value:'onselectstart'},
				{id:14,value:'onload'},
				{id:15,value:'onunload'},
				{id:16,value:'onerror'},
				{id:19,value:'onkeyup'}
			
			],
			defaults:'Seleccione listener',
			defaultSelection:0,
			creator:'SgDbExplorer',
			instance:++_instance,
			domParent: d,
			height:'30px'
		}
		
	var c = new ISgDropDown(a);	
		var dd = domHelper.div({id:this.id+'_inspect_m', innerHTML:'inspect',position:'absolute',
	top:'0px',right:'0px',
	onclick: function(){return this_.onInspectClick(arguments[0],arguments[1])}});
	d.parentNode.appendChild(dd);
	this.methodSelector = c;
	
}

SgDbExplorer.prototype.initControls = function initControls(){
	//return;
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	SgDbExplorer.prototype.base.initControls.call (this,args);
	
	SgDbExplorer.prototype.initPanels.call (this);
	
	
	return;
}

SgDbExplorer.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};
	
	args.className = domHelper.mergeClassName(args.className,'sgapp dbexplorer');

	SgDbExplorer.prototype.base.init.call(this,args);
	
}
function ISgDbExplorer(){
	this.init(arguments[0]);
}

classHelper.register(SgDbExplorer,ISgDbExplorer);
