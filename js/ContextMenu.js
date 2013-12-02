var contextual = (function(){
	var instance = null;
	
	SgContextMenu.prototype.menu=null;

	SgContextMenu.prototype.contexts=null;

	SgContextMenu.prototype.actualContext=null;
	
	SgContextMenu.prototype.getContextItems=function getContextItems(c){
		var items;
		switch(c) {
			default: 
			break;
		}
	}
	
	SgContextMenu.prototype.newMenuBox=function newMenuBox(v){
		
	}
	
	SgContextMenu.prototype.fillItems=function fillItems(o,e,l){
		var c = sgApp.getContextFor(o.sg.context.name);
		
		if (c) {
			if (l) this.menu.setContext(c);
			
			this.menu.element.style.left=e.clientX+'px';
			this.menu.element.style.top=e.clientY+'px';
			this.menu.element.parentNode.appendChild(this.menu.element.parentNode.removeChild(this.menu.element));
		}
		
		//o.sg.
	}

	SgContextMenu.prototype.hide=function hide(e,o){
		this.menu.element.style.display='none';
	}

	SgContextMenu.prototype.showMenu=function showMenu(e,o){
		this.menu.element.style.display='block';
		
		while(o) {
			if (o.sg && o.sg.context) {
				if (o.sg.context.name != this.actualContext){
					this.actualContext = o.sg.context.name;
					this.fillItems(o,e,true);
				
				}
				else
					this.fillItems(o,e,false);
				
			
				break;
			}
			o=o.parentNode;
		}
	}
	
	SgContextMenu.prototype.setContent=function setContent(c){
		
	}

	SgContextMenu.prototype.initContexts=function initContexts(){
		
	
	}

	SgContextMenu.prototype.init=function init(){
		this.id = 'Contextual';
		
		this.contexts = {};
		var a = {
			id:this.id + '_container',
			className:contextual,
			owner:sgApp.desktop,
			state:1
		}
		this.menu=new ISgMenuBox(a);
	}
	
	function SgContextMenu(){
		
	}
	
	return instance ? instance : instance = new SgContextMenu();
})()


var ctxt = {
	'SgDesktop':{
		groups:[
			{name:'Ver', items:[
				{name:'Ordernar'},
				{name:'Ver'},
				{name:'Actualizar'}
			]},
			{name:'Edición', items:[
				{name:'Copiar'},
				{name:'Cortar'},
				{name:'Pegar'}
			]},
			{
				name:'Configuración',items:[
					{name:'Propiedades'}
				]
			}
		]
	},
	'SgExplorer':{
		groups:[
			{name:'Ver', items:[
				{name:'Ordernar'},
				{name:'Ver'},
				{name:'Actualizar'}
			]},
			{name:'Edición', items:[
				{name:'Copiar'},
				{name:'Cortar'},
				{name:'Pegar'}
			]}
		]
	},
	'SgFolder':{
		groups:[
			{name:'Ver', items:[
				{name:'Abrir'},
				{name:'Abrir En otra ventana'},
				{name:'Propiedades'}
			]},
			{name:'Edición', items:[
				{name:'Copiar'},
				{name:'Cortar'},
				{name:'Pegar'}
			]}
		]
		
	}
}