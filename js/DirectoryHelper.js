var directory = (function(){
	var instance = null;
	DirectoryHelper.prototype.oDir = {};
	DirectoryHelper.prototype.vDir = [];
	DirectoryHelper.prototype.sDir = '';
	DirectoryHelper.prototype.getTree_ =  function getTree_(dirs,fulldir){
		var dir={
							name:dirs.name,
							childs:[],
							fullPath:fulldir+'/'+dirs.name
						};
		if (dirs.icon) dir.ico = dirs.icon.name;
		dir.fullPath=dir.fullPath.replace(/\/\//g,'/');
		for (var i=0; i<dirs.content.length; ++i) {
			if (dirs.content[i].type=='d' && dirs.content[i].content)
				dir.childs.push(this.getTree_(dirs.content[i],dir.fullPath))
		}
		return dir;
	}
	DirectoryHelper.prototype.getTree =  function getTree(){
		var dirs = this.directories.root;
		return this.getTree_(dirs,'');
	}
	DirectoryHelper.prototype.getFullPath =  function getFullPath(){
		var dirs = this.toDirs().join('/');
		return dirs;
	}
	DirectoryHelper.prototype.getcwd =  function getcwd(){
		if (this.currentDirectory=='/')
			return [this.currentDirectory];
		if (this.vDir.length) {
			var result=[];
			if (this.vDir[0]!='/')
				result.push('/');
				for (var i=0; i<this.vDir.length; ++i)
					result.push(this.vDir[i]);
				return result;
		}
		return this.vDir.length?this.vDir:this.currentDirectory;
	}
	DirectoryHelper.prototype.toDirs = function toDirs(dir){
		if (!dir) dir = this.currentDirectory;
		var dirs = [];
		if (typeof(dir)=='string') {
			dir = dir.split('/');
			for (var i=0; i<dir.length; ++i) {
				if (dir[i].replace(/[ ]*/,'').length)
					dirs.push(dir[i]);
			}
		}
		return dirs;
	}
	DirectoryHelper.prototype.onError = function onError(){
		var args = arguments[0] ? arguments[0] : {};
		var m='';
		m='ERROR:%sl%%caller%.%from%%sl%%smg%';
		if (!args.caller) args.caller = '[GLOBAL SCOPE]';
		if (!args.from) args.from = '[GLOBAL CLOSURE]';
		if (!args.msg) args.msg = 'Unkown Error';
		m = m.replace(/%caller%/g,args.caller);
		m = m.replace(/%from%/g,args.from);
		m = m.replace(/%msg%/g,args.msg);
		for (var i=0; i<args.attrs.length; ++i) {
			eval('var re = /%'+(i+1)+'/g');
			m = m.replace(re,args.attrs[i]);
		}
		alert (m);
	}
	DirectoryHelper.prototype.cd = function cd(dir){
		dir = this.toDirs(dir);
		var dirs = this.directories.root;
		var ok=false, sdir = '/'+dir.join('/');
		for (var i=0; i<dir.length; ++i) {
			ok=false;
			for (var j=0; j<dirs.content.length; ++j) {
				if (dirs.content[j].name == dir[i] && dirs.content[j].type=='d') {
					dirs=dirs.content[j];
					ok=true;
					break;
				}
			}
			if (!ok) {
				return this.onError({'caller':'DirectoryHelper',from:'cd',msg:'irectory %1 Not Found',attrs:dir})
			}
		}
		this.vDir = dir;
		this.oDir = dirs;
		this.sDir = sdir;
		this.currentDirectory  = sdir;
		return this.getcwd();
	}
	DirectoryHelper.prototype.getContent = function getContent (dir){
		this.cd(dir);
		var o='',
				result = {dirs:[], links:[], exes:[], docs:[]};
		for (var i=0; i<this.oDir.content.length; ++i) {
			var oo = {
				name:this.oDir.content[i].name
			}
			switch(this.oDir.content[i].type){
				case 'd': o='dirs';
					oo.childs= this.oDir.content[i].content?this.oDir.content[i].content.length:null
				break;
				case 'e': o='exes'; break;
				case 'l': o='links'; break;
				case 'f': o='docs'; 
					oo.docType=this.oDir.content[i].docType;
				break;
			}
			if (this.oDir.content[i].icon) {
				oo.ico = this.oDir.content[i].icon.name;
			}
			result[o].push(oo)
		}
		return result;
	}
	DirectoryHelper.prototype.getChildDirs = function getChildDirs (dir){
		var d=this.directories.root.content, r=[];
		for (var i=0; i<dir.length; ++i) {
			if (dir[i]=='/') continue;
			for (var j=0; j<d.length; ++j) {
				if (d[j].type=='d' && d[j].name==dir[i]) {
					d=d[j].content;
				}
			}
		}
		for (var i=0; i<d.length; ++i) {
			if (d[i].type=='d') {
				r.push(d[i].name);
			}
		}
		return r;
	}
	DirectoryHelper.prototype.plainDir =  {}
	DirectoryHelper.prototype.load_ =  function load_(args,dirs){
		var r={};
		// if(!this.plainDir[dirs.join('/')])
		// if (args.type=='a') {
			// this.plainDir[dirs.join('/')].files.push(args.name);
		// }
		// else {
			// if (args.content) {
				// for (var i in args.content) {
					// this.load_(args.content[i],dirs)
				// }
			// }
		// }
	}
	DirectoryHelper.prototype.load = function load(args){
		if (!args) {
			args=vdirs;
		}
		this.directories=args;
		this.load_(args.root,'');
	}
	function DirectoryHelper(){
		this.currentDirectory='/';
	}
	return instance ? instance : instance = new DirectoryHelper();
})()
vdirs = {
root: {name: '/', type:'d',content:[
		{name: 'Programas',type: 'd',content:[
			{name:'Explorer',type:'e',type_:'exes',icon:{name:'icoexplorer',type:1}},
			{name:'DbExplorer',type:'e',type_:'exes',icon:{name:'icodbexplorer',type:1}},
			{name:'Calc',type:'e',type_:'exes',icon:{name:'icocalc',type:1}},
			{name:'Clock',type:'e',type_:'exes',icon:{name:'icooutput',type:1}},
			{name:'Output',type:'e',type_:'exes',icon:{name:'icooutput',type:1}},
			{name:'HtmlInspector',type:'e',type_:'exes',icon:{name:'icoexplorer',type:1}}
		]},
		{name: 'Sitios',type: 'd',icon:{name:'icosites',type:1},content:[
		]},
		{name: 'Bases', type: 'd', icon:{ name:'icobases',type:1 },content:[
			{name:'Locales',type:'d',icon:{name:'icobases',type:1},content:[
				{name:'js',type:'d',icon:{name:'icobases',type:1},content:[
					{name:'solo4tablas',type:'f',docType:'DbExplorer',icon:{name:'icobase',type:1}}
				]},
				{name:'php',type:'d',icon:{name:'icobases',type:1},content:[
				]},
				{name:'net',type:'d',icon:{name:'icobases',type:1},content:[
				]}
			]},
			{name:'Externas',type:'d',icon:{name:'icobases',type:1},content:[
			]}
		]}
	]}

	// root: {name: '/', type:'d',content:[{
		// name:'Programas',type:'d',content:[
			// {name:'Explorer',type:'e',type_:'exes',icon:{name:'icoexplorer',type:1 }},
			// {name:'DbExplorer',type:'e',type_:'exes',icon:{name:'icodbexplorer',type:1}},
			// {name:'Clock',type:'e',type_:'exes',icon:{name:'icooutput',type:1}},
			// {name:'Calc',type:'e',type_:'exes',icon:{name:'icocalc',type:1}},
			// {name:'Output',type:'e',type_:'exes',icon:{name:'icooutput',type:1}},
			// {name:'HtmlInspector',type:'e',type_:'exes',icon:{name:'icoexplorer',type:1}}
		// ]},
		// {name: 'Sitios',type: 'd',icon:{name:'icosites',type:1},content:[]},
		// {name: 'Bases', type: 'd', icon:{ name:'icobases',type:1 },content:[
			// {name:'Locales',type:'d',icon:{name:'icobases',type:1},content:[
				// {name:'js',type:'d',icon:{name:'icobases',type:1},content:[
					// {name:'solo4tablas',type:'f',docType:'DbExplorer',icon:{name:'icobase',type:1}}]},
				// {name:'php',type:'d',icon:{name:'icobases',type:1},content:[]},
				// {name:'net',type:'d',icon:{name:'icobases',type:1},content:[]}]
			// },
			// {name:'Externas',type:'d',icon:{name:'icobases',type:1},content:[
			// ]}
		// ]}
	// ]}
}