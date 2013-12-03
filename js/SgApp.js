// letter 'b' -> step on Suppaplex.onTimer
var global = {
	running : true,	// toggle state with letter 'a'
										// shift state with letter 't'
	debug: false,	// shift state with letter 'd'
	stepDebugger: true
}

var sgApp = (function () {
	var instance = null;
	
	SgApp.prototype.desktop;
	SgApp.prototype.taskbar;
	SgApp.prototype.winmenu;
	SgApp.prototype.btnInici;
/**/	SgApp.prototype.focussed;
	SgApp.prototype.appActive;
	SgApp.prototype.apps;
	SgApp.prototype.caret;
	SgApp.prototype.caretOwner;
	
	SgApp.prototype.apps;
	SgApp.prototype.references = {
		Clock:[]
	}
	
	SgApp.prototype.newApplication = function newApplication(){
		var args = arguments[0] ? arguments[0] : {};
		if (!args.appname) args.appname='Explorer';
		if (typeof (args)=='string')
			args={appname:args}
		if (!args.forcePosition) args.forcePosition=null;
		this.nApplication++;
		var app;
		switch (args.appname) {
			case 'UI':
				app =  new ISgUI({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'User Interface '+this.nApplication,name:'MULTI PANEL APPLICATION '+this.nApplication});
			break;			
			case 'AppPanelWin':
				app =  new ISgAppPanelWin({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'MULTI PANEL APPLICATION '+this.nApplication,name:'MULTI PANEL APPLICATION '+this.nApplication});
			break;			
			case 'WinCal':
				app =  new ISgWinCal({forcePosition: args.forcePosition, className:'wincal calendar',owner:this.desktop,id:'app_'+this.nApplication,title:'',name:'WINDOWS CALENDAR '+this.nApplication});
			break;			
			case 'AppWin':
				app =  new ISgAppWin({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'WINDOWS APPLICATION '+this.nApplication,name:'WINDOWS APPLICATION '+this.nApplication});
			break;			
			case 'FormDesigner':
				app =  new ISgFormDesigner({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'FORM DESIGNER '+this.nApplication,name:'FORM DESIGNER '+this.nApplication});
			break;			
			case 'NotePad':
				app =  new ISgNotePad({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'NOTEPAD-- '+this.nApplication,name:'NOTEPAD '+this.nApplication});
			break;
			case 'Output':
				app =  new ISgOutput({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'OUTPUT '+this.nApplication,name:'OUTPUT '+this.nApplication});
			break;
			case 'Suppaplex':
				app =  new ISgSuppaplex({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'Suppaplex '+this.nApplication,name:'Suppaplex '+this.nApplication});
			break;			
			case 'Clock':
				app =  new ISgClock({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'Hora del sistema '+this.nApplication,name:'Hora del sistema '+this.nApplication});
			break;
			case 'Calc':
				app =  new ISgCalc({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'Calculo vescicular '+this.nApplication,name:'Calculo vescicular '+this.nApplication});
			break;
			case 'HtmlInspector':
				app =  new ISgHtmlInspector({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'INSPECTOR '+this.nApplication,name:'HtmlInspector '+this.nApplication});
			break;
			case 'DbExplorer':
				app =  new ISgDbExplorer({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'Db Explorer '+this.nApplication,name:'Db Explorer'+this.nApplication});
			break;
			default:
				app =  new ISgExplorer({forcePosition: args.forcePosition, owner:this.desktop,id:'app_'+this.nApplication,title:'sin titulo '+this.nApplication,name:'sin titulo '+this.nApplication});
			break;
		}
			
		if (!this.apps[args.appname]) {
			this.apps[args.appname]=[];
		}
		this.apps[args.appname].push(app);
		app.activate();
		return app;
	}
	
	SgApp.prototype.getCaret = function getCaret(c){
		this.caretOwner = c;
		return this.caret ? this.carent : this.createCaret();
	}
	
	SgApp.prototype.createCaret = function createCaret(c){
		var a={
			id:'caret',
			className:'caret',
			domParent:document.body,
			state:"0",
			contentEditable:"false"
		}
		this.caret = new ISgControlContainer(a);
		return this.caret;
	}

	/** 
	DESCRIPTION: 
		-Activate some application and deactivate another if exists and both are differents 
		app instances. When request is demmanded by instance of SgControl, but the control is not 
		on top app level from desktop level, it will be ignore. Only top level applicaction can
		be activate, in active state, un application, catch all dom events.
		-Hide Contexts menu.
	PARAMS: 
		-c instance of SgAppWin or its descendents by SgInheritance model */
	SgApp.prototype.appActivate = function appActivate(c){
		//console.log('SgApp.appActivate#'+c.id);
		
		if (this.appActive) {
			if (this.appActive.id != c.id && (this.appActive.isInstanceOf('SgDesktop') || !(this.appActive.hasThiszChild(c,true)))) {
				this.appActive.deactivate();
				if (this.focussed)
					this.focussed.lostFocus();
				this.appActive = c;
			}
		}
		else
			this.appActive = c;
		
		contextual.hide();
		
	}
	
	SgApp.prototype.setFocus = function setFocus(c){
		
		//console.log('ERROR: SgApp.setFocus#'+c.id);
		if (this.focussed) {
			if (this.focussed.id != c.id) {
				this.focussed.lostFocus();
			}
		}
		this.focussed = c;
		
		//c.setFocus(c.id);
		if (this.winmenu.isActive) {
		//	this.winmenu.lostFocus();
		}
		contextual.hide();
		
	}

	SgApp.prototype.onFocusChange_= function onFocusChange(s){
		//console.log('SgApp.onFocusChange#'+s.id);
		//console.log(s);
		if (this.appActive) {
			if (this.appActive.id != s.id) {
				if (this.appActive.focused) 
					this.appActive.activate(false);
			}
		}
		this.appActive = s;
		
	}
	
	SgApp.prototype.onFocusChange= function onFocusChange(s){
		//console.log('SgApp.onFocusChange#'+s.id);
		//console.log(s);
		if (this.focussed) {
			if (this.focussed.id != s.id) {
				if (this.focussed.focused) 
					this.focussed.setFocus(false);
			}
		}
		else {}
		this.focussed = s;
		
	}
	
	SgApp.prototype.getContextFor= function getContextFor(n){
	
		if (this.contexts[n])
			return this.contexts[n];
		return null;
	}
	
	SgApp.prototype.updateClock = function updateClock(t,h,m,s){
		for (var i=0; i<this.references.Clock.length; ++i) {
			this.references.Clock[i].setTime(t,h,m,s);
		}
	}
	
	
	SgApp.prototype.findReference = function findReference(o){
		var kn=o.constructor.name;
		if (!this.references[kn]) return null;
		for (var i=0; i<this.references[kn].length; ++i) {
			if (this.references[kn][i].id==o.id)
				return [kn,i];
		}
		
		return null;
		
	}
	
	SgApp.prototype.unregisterReference = function unregisterReference(r){
		var kn=r.constructor.name,
				ref = this.findReference(r);
		if (ref) {
			this.references[ref[0]].splice(ref[1],1)
		}
	}
	
	SgApp.prototype.registerReference = function registerReference(r){
		var kn=r.constructor.name;
		if (!this.references[kn]) this.references[kn]=[];
		this.references[kn].push(r);
	}
	
	SgApp.prototype.sendNotification = function sendNotification(s,n,a){
		switch(n){
			case 'SGWN_CLOSE':
				this.taskbar.callback(s,n,a);
				if (s.isInstanceOf('SgAppWin')) {
					var app=null;
					for (var i in this.apps) {
						for (var j=0; j<this.apps[i].length; ++j) {
							if (this.apps[i][j].id == s.id) {
								app=this.apps[i].splice(j,1);
							}
						}
					}
					
				}
				s.destroy;
			break;
		}
	}
	
	SgApp.prototype.getTabControlContainer = function getTabControlContainer(type){
		return this.taskbar.getTabControlContainer(type);
	}

	SgApp.prototype.getFocusContext = function getFocusContext(e){
	}

	SgApp.prototype.onResize = function onResize(e){
		for (var i in this.apps) {
			for (var j=0; j<this.apps[i].length;  ++j) {
				//var box=this.apps[i][j].boxs.initial;
				this.apps[i][j].boxs.initial=this.apps[i][j].getBox();
				this.apps[i][j].boxs.dragged=this.apps[i][j].getBox();
				this.apps[i][j].boxs.resized=this.apps[i][j].getBox();
				this.apps[i][j].boxs.docked=this.apps[i][j].getBox();
				// for (var k=0; k<this.apps[i][j].boxs.length; ++k) {
					// this.apps[i][j].boxs[k]
				// }
			}
		}
	}
	
	SgApp.prototype.onKeyDown_ = function onKeyDown(e){
		if (this.appActive) {
			if (this.appActive.onKeyDown && this.appActive.onKeyDown instanceof Function) {
				if (this.appActive.onKeyDown(e)) {
					cancelEvent(e);
					return false;
				}
			}
		}
		switch(String.fromCharCode(e.keyCode)) {
			case ' ':if (this.appActive) {
				
				output.setContent(this.appActive.boxsToHtml(),true);
			} ;break;
			case 'Z':plano=2;break;
			case 'Y':plano=1;break;
			case 'X':plano=0;break;
			case 'R': action=0; break;
			case 'T': action=1; break;
			case 'S': action=2; break;
			case 'M': delta=1; break;
			case 'N': delta=-1; break;
		default:
			//alert(e.keyCode)
		return;	 break;
		}
	}

	SgApp.prototype.onKeyUp = function onKeyUp(e){
		if (this.appActive) {
			if (this.appActive.onKeyUp && this.appActive.onKeyUp instanceof Function) {
				if (this.appActive.onKeyUp(e)) {
					cancelEvent(e);
					return false;
				}
			}
		}
	}

	SgApp.prototype.onKeyDown = function onKeyDown(e){
		if (this.focussed) {
			if (this.focussed.onKeyDown && this.focussed.onKeyDown instanceof Function) {
				if (this.focussed.onKeyDown(e)) {
					cancelEvent(e);
					return false;
				}
			}
		}
		if (this.appActive) {
			if (this.appActive.onKeyDown && this.appActive.onKeyDown instanceof Function) {
				if (this.appActive.onKeyDown(e)) {
					cancelEvent(e);
					return false;
				}
			}
		}
		switch(String.fromCharCode(e.keyCode)) {
			case ' ':if (this.focussed) {
				
				output.setContent(this.focussed.boxsToHtml(),true);
			} ;break;
			case 'Z':plano=2;break;
			case 'Y':plano=1;break;
			case 'X':plano=0;break;
			case 'R': action=0; break;
			case 'T': action=1; break;
			case 'S': action=2; break;
			case 'M': delta=1; break;
			case 'N': delta=-1; break;
		default:
			//alert(e.keyCode)
		return;	 break;
		}
	}
	
	SgApp.prototype.updateClocks = function updateClocks(t,h,m,s){
		for (var i=0; i<this.references.Clock.length; ++i) {
			this.references.Clock[i].setTime(t,h,m,s);
		}
	}

	SgApp.prototype.registerContext	= function registerClntext(k,v){
		if (v === true)
			this.contexts[k]=this.getContextFor(cn);
		else
			this.contexts[k]=v;
	}
	
	SgApp.prototype.dispatch = function dispatch(e){
		var h,r,f;
		if (this.listeners[e.type]) {
			for (var i=0; i<this.listeners[e.type].length; ++i) {
				h = this.listeners[e.type][i].handler;
				f = this.listeners[e.type][i].func;
				r = h[f](e);
				if (r==true) {
					cancelEvent(e);
					break;
				}
			}
		}
	}
	
	SgApp.prototype.addListener = function addListener(){
		var args=arguments[0] || {};
		
		if(!this.listeners[args.event] ) 
			this.listeners[args.event] =[]
		this.listeners[args.event].push(args)
	}
	
	SgApp.prototype.init = function init(){
		
		this.contexts=ctxt;
		
		this.listeners={};
		domHelper.init();
		directory.load();
		this.nApplication=0;
		
		this.element=document.body;

		this.desktop = new ISgDesktop({
				domParent:document.body,
				name:'desktop',
				className:'desktop',
				id:'desktop',
				owner:this
		});
		this.contexts[this.desktop.id]=this.getContextFor('SgDesktop');
		this.taskbar = new ISgTaskBar({
				owner:this.desktop,
				name:'test_12',
				id:'bar'
			}
		);
		
		this.winmenu = new ISgWinMenu({
				owner:this.desktop, 
				className:'sgwinmenu',
				name:'winmenu',
				id:'winmenu'
			}
		);
		
		contextual.init();
		this.apps={};
		window.onresize = function(){
			
			return SgApp.prototype.dispatch.call(sgApp,arguments[0]);
		
		}
		
		this.comboContext= new ISgControlContainer({
				owner:this.desktop, 
				className:'combo-context',
				name:'combo-context',
				id:'combo-context'
		
		})
	}

		
	function SgApp(){
		postLoadBeforeInit()
	}
	
	return instance ? instance : instance = new SgApp()
})()


function postLoadBeforeInit() {
	return;
	if (document.addEventListener) {
		document.addEventListener(
				'contextmenu', 
				function(e) {
					if (e && e.srcElement) 
						contextual.showMenu(arguments[0],e.srcElement);
					e.preventDefault();
				}, 
				false
			)
		} 
		else {
			document.attachEvent(
				'oncontextmenu', 
				function() {
					contextual.showMenu(arguments[0],arguments[1]);
					window.event.returnValue = false;
				}
			);
		}
		
	}
