var g=0;
var module;
function f14(){
		module= new Module('idcode');
    module.set_id_code('new idcode');
    module.set_title('new title');
    document.body.innerHTML+=module.get_id_code()+': '+module.get_title();
}

function Module(id_code, title) {
    var id_code = id_code;
    var title = title;

    //id_code
    this.get_id_code = function() {
        return id_code;
    }
    this.set_id_code = function(value) {
        id_code = value;
    }

    //title
    this.get_title = function() {
        return title;
    }
    this.set_title = function(value) {
        title = value;
    }
}


// var o1={
	// klass:'SgObject',
	// parentKlass:null,
	// uid:++g,
	// po1:'p1 de o1',
	// po:'p de o (en o1)'
// }

// var o2={
	// klass:'SgObject',
	// parentKlass:null,
	// element:document.createElement('div'),
	// uid:++g,
	// po1:'p1 de o2',
	// po:'p de o (en o2)'
// }

// var p1={
	// klass:'SgControl',
	// parentKlass:'SgObject',
	// uid:++g,
	// element:null,
	// po1:'p1 de p1',
	// po:'p (en p1)'
// }

// var p2={
	// klass:'SgControl',
	// parentKlass:'SgObject',
	// uid:++g,
	// element:null,
	// po2:'p1 de p2',
	// po:'p (en p2)'
// }

var testTitles = {
	1:'Test de classHelper.nObjToString',
	2:'Test de classHelper.extend({},o1)'
}
var _testid=0;

function toogle(e,a) {
	var v = e.getAttribute(a);
	if (typeof(v)=='undefined')
		v = 0;
	e.setAttribute(a,1-v);
	if (e.stopPropagation) e.stopPropagation();
	e.cancelBubble=true;
	return true;
}

function toogleto(e,a,v){
	e.setAttribute(a,v)
}
	

function mapAttributeToElement(e,an,av){
	
	switch (an) {
		case 'toogle':
			// si an==toogle, => av deben ser de la forma:
			// av = {
			//   attribute: 'ATTRIBUTENAME' (default:toogle),
			//   value: 0 o 1 (default=0),
			//   triggerOn: event name to bind handler (default: onclick)
			//   strmsg: si null, msg se inicializa con el nombre del attributo
			//				sino debe ser el json de un objeto
			//   handler = function(event,elemento,strmsg) {}
			// } 
			// también se acepta que sea un array de objetos de la forma anterior
			var atn, atv, eh={}, em={}, veh={}, tomaps;
			if (!(av instanceof Array))
				av = [av];
			for (var i=0; i<av.length; ++i) {
				tomaps = {};
				atn = av[i].attribute ? av[i].attribute : '_toogle';
				atv = av[i].value ? av[i].value : 0;
				
				if (av[i].triggerOn) et = av[i].triggerOn;
				else {
					switch (atn) {
						case 'dactive': 
							et = 'ondblclick'; 
							em.dblclick = av[i].strmsg ? av[i].strmsg : atn;
							eh = av[i].handler && av[i].handler instanceof Function ? eh=av[i].handler : defaultHanler;
							veh.dblclick=eh
							
						break;
						case 'lastkey': 
							et = 'onkeydown'; 
							em.onkeydown = av[i].strmsg ? av[i].strmsg : atn;
							eh = av[i].handler && av[i].handler instanceof Function ? eh=av[i].handler : defaultHanler;
							veh.keydow=eh
						break;
						case 'ractive': 
							et = 'oncontextmenu'; 
							em.contextmenu = av[i].strmsg ? av[i].strmsg : atn;
							eh = av[i].handler && av[i].handler instanceof Function ? eh=av[i].handler : defaultHanler;
							veh.contextmenu=eh;
						break;
						default: 
							et = 'onclick'; 
							em.click = av[i].strmsg ? av[i].strmsg : atn;
							eh = av[i].handler && av[i].handler instanceof Function ? eh=av[i].handler : defaultHanler;
							veh.click=eh
						break;						
					}
				}
				tomaps[atn]=atv;
				tomaps[et]=function() {
					return veh[arguments[0].type](arguments[0],arguments[1],em[arguments[0].type]);
					//return eh	[em[arguments[0].type]](arguments[0],arguments[1],em[arguments[0].type]);
				}
				mapToElement(e,tomaps);
			}
			return;
		break;
		default:
			e.setAttribute(an,av);
		break;
	}
	e.setAttribute(an,av);
}
function mapPropertyToElement(e,pn,pv){
	switch(pn) {
		case 'class': e.className=pv; break;
		case 'parent': 
		case 'parentNode': 
			pv.appendChild(e); break;
		default: e[pn]=pv; break;
	}
}
function mapStyleToElement(e,sn,sv){
	e.style[sn]=sv;
}
function mapMethodToElement(e,mn,mv){
	e[mn]=function() {
		mv(arguments[0],this);
	}
}

function mapToElement(e,v){
	for (var i in v) {
		switch(i.toLowerCase()) {
			case 'id':
			case 'classname':
			case 'parent': 
				mapPropertyToElement(e,i,v[i]);
			break;
			case 'onclick':
			case 'onrightclick':
			case 'oncontextmenu':
			case 'onmousemove':
			case 'onmouseover':
			case 'onmouseout':
			case 'onmousedown':
			case 'ondblclick':
			case 'onkeydown':
			case 'onkeyup':
			case 'onkeypress':
			case 'onload':
			case 'onunload':
			case 'onscrol':
			case 'onselect':
			case 'onselectstart':
				mapMethodToElement(e,i,v[i]);
			break;
			case 'height':
			case 'width':
			case 'top':
			case 'left':
				mapStyleToElement(e,i,v[i]);
			break;
			default:
				mapAttributeToElement(e,i,v[i]);
			break;
		}
	}

}

var nPageCollapse=0;
function getNewTestPageCollapse() {
	var div=document.createElement('DIV');
	var args=arguments[0] ? arguments[0] : {};
	// var mappers = {
		
	// }
	// var mapper = function() {
		// var mapperHelpers = {
			// mapPropertyTo: function() {
										// },
			// mapAttributeTo: function() {},
			// mapMethodTo: function() {},
			// mapStyleTo: function() {}
		// }
		
	// }
			
		
	args.index= ++nPageCollapse;
	if (!args.id) args.id = "test-page-collapser_"+(++_testid);
	
	if (!args.toogle) {
		
		args.toogle=[
			{	attribute: 'active',	handler: function(e,o,m) {toogle(arguments[1],arguments[2]) }},
			{	attribute: 'ractive',	handler: function(e,o,m) {toogle(arguments[1],arguments[2]) }},
			{	attribute: 'dactive',	handler: function(e,o,m) {toogle(arguments[1],arguments[2]) }},
			{	attribute: 'lastkey',	handler: function(e,o,m) {toogleto(arguments[1],arguments[2],arguments[0].keyCode) }}
		]
	}
	if (!args.className) args.className='pagecollapser';
	if (!args.active) args.active = 0;
	mapToElement(div,args);
	return div;
}
function testTemplate(templateVars) {
	if (!templateVars.v) templateVars.n=1;
	if (!templateVars.title && templateVars.n) templateVars.title=testTitles[templateVars.n];
	var template= '<div class="pagecollapser"> \
									<div> \
										<p>@title@</p> \
										@innerHTML@ \
									</div> \
								</div>';
	
	for (var i in templateVars) {
		template=template.replace('@'+i+'@',templateVars[i]);
	}
	
	return template;
}
function test_2() {
	var n=1;
	var s='', head='test_1 -> ClassHelper.nObjToString<br />';
	var nuevo=classHelper.extend({},o1);
	s=classHelper.nObjToString({antes:{},despues:nuevo,padre:o1});
	document.body.innerHTML+=testTemplate({innerHTML:s, n:2});	

}
function test_1() {
	var n=1;
	var s='', head='test_1 -> ClassHelper.nObjToString<br />';
	s=classHelper.nObjToDivs({'o1':o1,'o2':o2,'p1':p1,'p21':p2},document.body);
	document.body.innerHTML+=testTemplate({innerHTML:s, n:1});	
}

function runTest(ntest,options) {
	for(var i=0; i<ntest.length; ++i) {
		eval('test_'+ntest[i]+'()');
	}
}
	
function test_3() {
	var nuevo;
	var s='nuevo=classHelper.extend(o1,p1);';
	eval(s);
	var test
	document.body.innerHTML+=	testTemplate(
		{
			n:3,
			innerHTML:classHelper.nObjToString({'o1 antes':{},'o1 despues':nuevo,'padre p1':p1})
		});	
}

function test_4() {
	var test;
	var div=getNewTestPageCollapse();
	classHelper.nObjToDivs({'o1 antes':{},'p1 antes':p1,'padre p1':o1},div);
	document.body.appendChild(div);

	var s='var nuevo=classHelper.extend(o1,p1);'
	eval (s);

	var div=getNewTestPageCollapse();
	classHelper.nObjToDivs({'o1 despues':{},'p1 despues':nuevo,'padre p1':o1},div);
	document.body.appendChild(div);
	
}



function test_5() {
	var test;
	var div=document.createElement('div');
	div.innerHTML='todo junto va separado, mientras ue separado va todo junto';
	
	div=toogleHelper.putInToogle(div);
	
	document.body.appendChild(div);
}


function test_6() {
	var v=[];
	
	for (var i=0; i<15; ++i) {v[i]=null};
	MenuHelper.toMenu(v);
}

function test_7() {
	
	var div = MenuHelper.toMenu({toogleName:'active'});
	document.body.appendChild(div);
	var o1 = new ISgObject({name:'test_7',id:'obj1'});
	classHelper.objStrToDiv(o1,div,'<br />')
	
	

}

function test_8() {
	var div = MenuHelper.toMenu({toogleName:'active'});
	document.body.appendChild(div);
	var o1 = new ISgControl({name:'test_8',id:'control'});
	classHelper.objStrToDiv(o1,div,'<br />')
}



function test_9() {
	var div = MenuHelper.toMenu({toogleName:'active'});
	document.body.appendChild(div);
	var o1 = new ISgControl({name:'test_8',id:'control'});
		div.appendChild(classHelper.objToDomTable(o1,'<br />'));
	
}
var sgmenuleft;
function test_10() {
	var div = MenuHelper.toMenu({toogleName:'active'});
	document.body.appendChild(div);
	var o1 = new ISgObject({name:'test_10',id:'sgobject'});
	div.appendChild(classHelper.parseObjToTable(o1))
}
function test_11() {
	var div = MenuHelper.toMenu({toogleName:'active'});
	document.body.appendChild(div);
	var o1 = new ISgControl({name:'test_11',id:'sgcontrol'});
	div.appendChild(classHelper.parseObjToTable(o1))
}
function test_12() {
	
	var div = MenuHelper.toMenu({toogleName:'active'});
	document.body.appendChild(div);
	var o1 = new ISgControlContainer({domParent:document.body, name:'test_12',id:'controlcontainer'});
	div.appendChild(classHelper.parseObjToTable(o1))
	
}
var ot,wt;
function test_13() {
	
	var div = MenuHelper.toMenu({toogleName:'active'});
	//document.body.appendChild(div);
	
	ot = new ISgBar({domParent:document.body, name:'test_12',id:'bar'});
	div.appendChild(classHelper.parseObjToTable(ot))
	ot.appendChild(div);
	//ot.append(div);
	ot.paint();
}
var ww;
function test_14() {
	var div = MenuHelper.toMenu({toogleName:'active'});
	ww = new ISgWindow({domParent:document.body, name:'test_14',id:'back'});
	
	ot = new ISgBar({domParent:document.body, name:'test_12',id:'bar'});
	ww.append(ot);
	ot.appendChild(div);
	wt = new ISgWindow({domParent:div, name:'test_13',id:'win'});
}
function test_15() {

	var div = MenuHelper.toMenu({id:"tomenu", toogleName:'active'});
	if (!ot) ot = new ISgBar({domParent:document.body, name:'test_12',id:'bar'});
	ot.element.appendChild(div);
	wt = new ISgWindow({domParent:div, name:'test_13',id:'win'});
		var o1 = new ISgControl({name:'test_15',id:'control'});
	classHelper.objStrToDiv(o1,wt.element,'<br />')
}

var desktop, taskbar, winmenu, btnInicio,apps;

// construye desktop de tipo window
// desktop contiene un taskbar, winmenu, btnInicio
// 
function newapp() {
	apps[apps.length]=new ISgAppWin({domParent:desktop.element,id:'app_'+(apps.length+1),title:'prueba'});
}
function test_16() {
	// ventana sin titulo para el fondo (contenedor)
	desktop = new ISgWindow({domParent:document.body,name:'desktop',id:'desktop'});
	taskbar = new ISgTaskBar({domParent:null, name:'test_12',id:'bar'});
	winmenu = new ISgWinMenu({domParent:document.body,className:'sgwinmenu',name:'winmenu',id:'winmenu'});
	desktop.append(winmenu);
	desktop.append(taskbar);
	btnInicio=new ISgControl({domParent:taskbar.element, name:'INICIO', id:'btnInicio',innerHTML:'INICIO', onclick:function(){winmenu.toogle(event,	'active')}})
	apps=[];
	apps[0]=new ISgAppWin({domParent:desktop.element,id:'app1',title:'prueba1'});
}
function test_17() {
	var s='';
	var vv=[]; 
	var v=document.getElementsByTagName('DIV'); 
	localStorage.clear();
	for (var i=0; i<v.length; ++i) {
		key=i;
		value={
			id: v[i].id || 'unefined',
			className: v[i].className || 'no class'
		};
		for (var j=0;  j<v[i].attributes.length; ++j) {
			value[v[i].attributes[j].name]=v[i].attributes[j].value;			
		}
		
		if (!v[i] || v[i]===null || typeof(v[i])=='undefined' || !(v[i] instanceof Function)) {
			value={id:v[i].id || 'undefined', className: v[i].className || 'undefined' };
			localStorage.setItem(i, JSON.stringify(value));
		}
		else
			localStorage.setItem(i, JSON.stringify(value));
	}
}
var sg = {maps:[],mapped:{}}
function test_19() {

	var s='1|11|10|1111|111|1011|101'
	var s='1|111'
	var vs=[1,11,10,1001], si='';
	console.log(s);
	console.log(vs);
	for (var i=0; i<vs.length; ++i) {
		
		eval('var r=s.replace(/.*[^0-9]*('+vs[i]+')[^0-9]*.*/,"$1")==vs[i]');
		console.log('vs['+i+'] = '+vs[i]+ '   '+r.toString());
	}
}

/*
function test_8() {
	var div = MenuHelper.toMenu({toogleName:'active'});
	document.body.appendChild(div);
	var o1 = new ISgControl({name:'test_8',id:'control'});
	classHelper.objStrToDiv(o1,div,'<br />')
}
function test_8() {
	var div = MenuHelper.toMenu({toogleName:'active'});
	document.body.appendChild(div);
	var o1 = new ISgControl({name:'test_8',id:'control'});
	classHelper.objStrToDiv(o1,div,'<br />')
}*/


