function SgExplorer(){}

SgExplorer.prototype.baseClass='SgAppWin';


SgExplorer.prototype.getControl = function getElement(k,o){
	switch (k) {
		case 'urlbar': return this.controls[this.head.id+'_url']; break;
		case 'centerpanel': return this.controls[this.body.id+'_centerpanel']; break;
		case 'bottompanel': return this.controls[this.body.id+'_bottompanel']; break;
		case 'leftpanel': return this.controls[this.body.id+'_leftpanel']; break;
		case 'rightpanel': return this.controls[this.body.id+'_rightpanel']; break;
	}
}

SgExplorer.prototype.getElement = function getElement(k,o){
	
	return SgExplorer.prototype.base.getElement.call(this,k,o);
}

SgExplorer.prototype.setContent = function setContent(content,to){
	if (!to) to='centerpanel';
	var panel=this.getControl(to);
	panel.setContent(content);
}

SgExplorer.prototype.onDockResize = function onDockResize(from,state){
	if (from == 'bottom') {
		var panels = [
			this.getControl('centerpanel'),
			this.getControl('leftpanel'),
			this.getControl('rightpanel')
		]
		for (var i=0; i<panels.length; ++i) {
		if(state=="1") {
			panels[i].element.style[from]='150px';
			panels[i].element.style.top='0px';
			panels[i].element.style.height='auto';
			}
		else 
			panels[i].element.style[from]='6px';
		}
	}
	else {
		var panel = this.getControl('centerpanel');
		if(state=="1") 
			panel.element.style[from]='30%';
		else 
			panel.element.style[from]='6px';
	}
}

SgExplorer.prototype.onCmdClick = function onCmdClick(){
	var msg = arguments[0] ? arguments[0].msg : '';
	switch (msg) {
		case 'onDockResize':
			return this.onDockResize(arguments[0].from,arguments[0].state);
		break;
		case 'navigateTo':
			return this.navigateTo(arguments[0].event,arguments[0].target);
		
		break;
	}
	return SgExplorer.prototype.base.onCmdClick.call(this,arguments[0],arguments[1])
}

SgExplorer.prototype.navigateTo = function navigateTo(e,o,t){
	var d;
	if (typeof(e)=='string')
		d=e;
	else {
		d = o instanceof ISgFolder ? o.getFullPath() : o;
		d=d.join('/');
	}
	d=d.replace(/\/\//,'/');
	
	this.cd(d);
}

SgExplorer.prototype.releaseContent = function releaseContent(){
}

SgExplorer.prototype.fillContent = function fillContent(v,fp){
	var this_=this,
			_onc=null;
	if (this.contentDir.length) {
		var c=this.getControl('centerpanel');
		c.releaseContent(this.contentDir);
		
	}
	this.contentDir=[];
	var own=	 this.getControl('centerpanel')
	for (var i in v) {
		if (v[i].length) {
			o=null;
			switch(i) {
				case 'dirs':
					ico = 'folder'+this.config.views.content.type;
					_onc = function(){this_.navigateTo(arguments[0],arguments[1])}
					ico = 'ico'+ico+'.png';
					for (var j=0; j<v[i].length; ++j) {
						var a = {
							id:this.id+'_'+i+'_'+v[i][j].name,
							name:v[i][j].name,
							type:this.config.views.content.type,
							creator:'SgExplorer',
							instance: ++_instance,
							path:fp,
							entryType: 'directory',
							targetEvent: {dblclick:{owner:this,listener:'onCmdClick',msg:'navigateTo'}},
							owner: own
						}
						a.imageUrl = v[i][j].ico ? v[i][j].ico + this.config.views.content.type + '.png': ico;
						var o = new ISgFolder(a);
						own.controls[o.id]=o;
						this.contentDir.push(o.id);
					}
				break;
				case 'exes':
					for (var j=0; j<v[i].length; ++j) {
						var a = {
							id:this.id+'_'+i+'_'+v[i][j].name,
							name:v[i][j].name,
							type:this.config.views.content.type,
							creator:'SgExplorer',
							instance: ++_instance,
							path:fp,
							entryType: 'executable',
							targetEvent: {dblclick:{owner:sgApp,listener:'newApplication',params:{appname:v[i][j].name}}},
							owner:own
						}
						a.imageUrl = v[i][j].ico ? v[i][j].ico + this.config.views.content.type + '.png': ico;
						var o = new ISgExeFile(a);
						own.controls[o.id]=o;
						this.contentDir.push(o.id);
					}
				break;
				case 'docs':
					for (var j=0; j<v[i].length; ++j) {
						var a = {
							id:this.id+'_'+i+'_'+v[i][j].name,
							name:v[i][j].name,
							type:this.config.views.content.type,
							creator:'SgExplorer',
							instance: ++_instance,
							path:fp,
							docType:v[i][j].docType,
							entryType: 'document',
							targetEvent: {dblclick:{owner:sgApp,listener:'newApplication',params:{appname:'docType'}}},
							owner: own
						}
						a.imageUrl = v[i][j].ico ? v[i][j].ico + this.config.views.content.type + '.png': ico;
						var o = new ISgFile(a);
						own.controls[o.id]=o;
						this.contentDir.push(o.id);
					}
				
				break;
				default:
					continue;				
				break;
			}
		
		}
	}
}

SgExplorer.prototype.cd = function cd(d){
	d=d?d:this.cwd.length?this.cwd:directory.getcwd();
	d = directory.cd(d);
	var url = this.getControl('urlbar');
	
	this.cwd=d;
	url.setURL(d);	
	
	var childs = directory.getContent(this.cwd.join('/'));
	
	this.fillContent(childs,d);

}

SgExplorer.prototype.onTree = function onTree(e,o){
	if (o.children.length) {
		toogle2(e,o.children[0],'state');
		this.cd(o.getAttribute('path'));
	}
	this.onBubbles(e,o,{msg:'activate'});
	return cancelEvent(e);
}

SgExplorer.prototype.initLeftPanel = function initLeftPanel(){
	var a = {
		
	}
	var this_=this;
	var listeners={
		className:'tree-node',
		type:1,
		onmousedown:function(){return this_.onTree(arguments[0],arguments[1])}
	}
	var d = treeHelper.fromTree(directory.getTree(),listeners,1);
	
	this.getControl('leftpanel').getContainer().appendChild(d);
		
	

}


SgExplorer.prototype.initHead = function initHead(){
	
	var this_=this;
	var container={
		id:this.id+'_head_container',
		className:'explorer head container',
		owner:this,
		handler:this
	}
	
	//this.head=this.controls[container.id]=new ISgControlContainer(container);
	var a={
		id:this.head.id+'_url',
		className:'url-bar',
		creator:'SgExplorer',
		instance:++_instance,
		owner:this.head,
		handler:this
	}
	this.controls[a.id]=new ISgUrlBar(a);


	

	var parentFolder=[];
	for (var i=0; i<this.cwd.length-1;++i)
		parentFolder.push(this.cwd[i]);
	var a={
		id:this.id+'_back',
		className:'nav-bar back',
		creator:'SgExplorer',
		innerHTML:'&#8630',
		instance:++_instance,
		owner: this.head,
		targetEvent: {owner:this, listener:'onCmdClick', msg:'navigateTo', target:parentFolder},
		onclick:function (){
			return this_.navigateTo(this_.cwd.join('/').replace(/\/[^\/]*$/,''));
		}
	//	owner: this
	}
	this.controls[a.id]=new ISgControlContainer(a);
	var a={
		id:this.id+'_foward',
		className:'nav-bar foward',
	creator:'SgExplorer',
		instance:++_instance,
		innerHTML:'&#8631;',
		owner: this.head
	//	owner: this
	}	
	this.controls[a.id]=new ISgControlContainer(a);
	var a={
		id:this.id+'_refresh',
		className:'nav-bar refresh',
		creator:'SgExplorer',
		innerHTML:'&#8634;',
		instance:++_instance,
		owner: this.head
	//	owner: this
	}	
	this.controls[a.id]=new ISgControlContainer(a);
}

SgExplorer.prototype.initBody = function initBody(){
	// SgExplorer.prototype.base.initBody.call(this,arguments[0]);
	var args = arguments[0] ? arguments[0] : {}
	if (!args.menu1) 
		args.menu1=true;
	if (!args.menu2) 
		args.menu2=true;

	
	var this_=this;
	var container={
		id:this.id+'_body_container',
		className:'explorer body container',
		owner:this,
		handler:this
	}
	
	//this.body=this.controls[container.id]=new ISgControlContainer(container);

	if (args.menu1 || args.controlMenu1) {
		var inner = args.menu1.items?args.menu1.items:'Archivo      Edición      Ver';
		var klass = 'general-menu';
		if (args.controlMenu1) {klass=  'no-menu-bar';inner=''};
		var a={
			id:this.body.id+'_bar1',
			className:klass,
			innerHTML: inner,
			creator:'SgExplorer',
			instance:++_instance,
			handler:this,
			owner: this.body
		}
		this.controls[a.id]=new ISgControlContainer(a);
		if (args.controlMenu1) this.controls[a.id].element.appendChild(args.controlMenu1);	
	}
	
	if (args.menu2) {
		var a={
			id:this.body.id+'_bar2',
			className:'general-menu',
			handler:this,
			creator:'SgExplorer',
			instance:++_instance,
			owner: this.body,
			border:'solid 1px black',
			height:'30px'
			
		}
		this.controls[a.id]=new ISgControlContainer(a);
		
		var aa={
			id:this.body.id+'',
			className:'general-menu',
			innerHTML: 'modo vista: 2',
			handler:this,
			creator:'SgExplorer',
			instance:++_instance,
			owner: this.controls[a.id],
			border:'solid 1px black',
			height:'30px',
			
			float:'right'
		}
		this.controls[aa.id]=new ISgControlContainer(aa);
		this.controls[aa.id].element.onclick=function(){
				var d=document.getElementsByClassName('directory-entry');
				var value=(+(this.innerHTML.replace('modo vista: ',''))%2)+1;
				
				this.innerHTML='modo vista: '+value;
				for(var i=0; i<d.length; ++i) {
					d[i].setAttribute('type',value)
				}
			}

	}
		var a={
		id:this.body.id+'_hpanel',
		className:'horizontal',
		creator:'SgExplorer',
		handler:this,
		instance:++_instance,
		owner: this.body
	}
	var hp=	new ISgControlContainer(a);
	this.controls[a.id]=hp
		
//hp=this.body
	var a={
		id:this.body.id+'_centerpanel',
		className:'center',
		creator:'SgExplorer',
		instance:++_instance,
		owner: hp
	}
	this.controls[a.id]=new ISgPanel(a);
	
	var a={
		id:this.body.id+'_leftpanel',
		className:'left',
		docked:1,
		handler:this,
		creator:'SgExplorer',
		instance:++_instance,
		owner: hp
	}
	this.controls[a.id]=new ISgPanel(a);
	this.onDockResize('left',1);
	var a={
		id:this.body.id+'_rightpanel',
		className:'right',
		creator:'SgExplorer',
		handler:this,
		instance:++_instance,
		owner: hp
	}
	this.controls[a.id]=new ISgPanel(a);
	
	var a={
		id:this.body.id+'_bottompanel',
		className:'bottom',
		creator:'SgExplorer',
		handler:this,
		instance:++_instance,
		owner: this.body
	}
	this.controls[a.id]=new ISgPanel(a);
		
	
}

SgExplorer.prototype.initControls = function initControls(){
	
	var d = domHelper.div({innerHTML:'hola'});
	
 var args={controlParams:{head:{className:'explorer'},body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	
	SgExplorer.prototype.base.initControls.call (this,arguments[0]);
	
	var ab, ah;
	SgExplorer.prototype.initHead.call(this,arguments[0]);
	SgExplorer.prototype.initBody.call(this,arguments[1]);
	
		

	
	if (this instanceof SgExplorer) {
		if (arguments[0] && arguments[0].controlParams) {
			ab = arguments[0].controlParams.body;
			ah = arguments[0].controlParams.head;
		}
		// this.initHead(ah);
		// this.initBody(ab);
		this.cd();
		this.initLeftPanel();
		}
	return;
}


SgExplorer.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {};

	if (!args.config) args.config = {};
	if (!args.config.panels) args.config.panels = {left:true,right:true,bottom:true};
	if (!args.config.views) args.config.views = {};
	if (!args.config.views.content) args.config.views.content = {};
	if (!args.config.views.content.type) args.config.views.content.type = 2;
	
	args.contentDir=[];
	args.className = domHelper.mergeClassName(args.className,'sgapp explorer');
	var items = args.items;
	delete	args.items;
	
	this.cwd=['/'];
	
	SgExplorer.prototype.base.init.call(this,args);
	var sg = this.element.sg;
	if (this instanceof ISgExplorer) {
		var this_=this;
		if (!sg) sg = {};
		sg.context={
			name:this.constructor.name,
			id:this.id,
			instance:this
		};
		
		
		this.element.sg = sg;
	}
	
	//SgExplorer.prototype.initControls.calc(this)
	
	// this.initControls();
	
}

function ISgExplorer(){
	this.init(arguments[0]);
}

classHelper.register(SgExplorer,ISgExplorer);
