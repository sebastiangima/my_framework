var treeHelper = (function(){
	var instance = null;
	
	SgTreeHelper.prototype.showCode=false;
	SgTreeHelper.prototype.nodes=[];
	SgTreeHelper.prototype.onNode=function fromHTML(e,o,n,v) {
		
			treeHelper.onNode_(e,o,n,v);
	}
	SgTreeHelper.prototype.onNode_=function fromHTML(e,o,n,v) {
		if (v=='1')
			this.nodes[n].className = domHelper.mergeClassName(this.nodes[n].className,'_insp__')
		else 
			this.nodes[n].className = this.nodes[n].className.replace(/[ ]*_insp__/g,'');
	}
	SgTreeHelper.prototype.fromHTML_=function fromHTML(o,level) {
		
		var args=arguments[2]?arguments[2]:this.v;
		
		var name = o.tagName.toLowerCase(),
				klass = o.className ? '<span style="color:red">.'+o.className+'</span>' : '',
				id = o.id ? '<span style="color:blue">#'+o.id+'</span>' : '';
		var tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		var ntab='';
		for (var i=0; i<level; ++i)
			ntab+=tab;
		if (o.children.length)
			name='[+]'+name;

		var result = '<div class="div-group" onmouseout="treeHelper.onNode(event,this,'+this.nodes.length+',0)" onmouseover="treeHelper.onNode(event,this,'+this.nodes.length+',1)" onmousedown="toogle2(event,this,\'visible\')">'+ntab+name+klass+id;
		this.nodes.push(o);
		if (args && args.styles) {
			var rs='';
			for (var i=0;i<  args.styles.length;++i) {
				var s=window.getComputedStyle(o, null).getPropertyValue(args.styles[i]);
				if (s) {
					if (rs) rs+=', ';
					rs += args.styles[i]+': '+s;
					}
				
			}
			
			rs+=' </span>';
			result+='<span style="color:green">'+ rs;
		}
		if (args && args.methods) {
			var rs='';
			for (var i=0;i<  args.methods.length;++i) {
				var s=o[args.methods[i]];
				if (s) {
					if (rs) rs+=', ';
					rs += args.methods[i]
					if(this.showCode)rs+=': '+s;
					}
				
			}
			
			rs+=' </span>';
			result+='<span style="color:maroon">'+ rs;
		}
		level++;
		
		if (o.children.length) {
			result+='<div  class="div-groupped">';
			for (var i=0; i<o.children.length; ++i) {
				result+=this.fromHTML_(o.children[i],level,args);
			}
			result+='</div>';
		}
		level--;
		return result+'</div>';
	}	
	SgTreeHelper.prototype.fromTree_=function fromTree_(t,v,vt) {
		var args=v;
		args.innerHTML=t.name;
		args.imageUrl=t.ico ? t.ico + vt + '.png' : 'icofolder1.png'	;
		//args.imageUrl='../'+args.imageUrl
		args.path=t.fullPath;
		
		var d = domHelper.div(args);
		if (t.childs.length) {
			var args={
				className:'tritoogle triangle',
				state:0,
				domParent:d,
				onmousedown:function(){toogle2(arguments[0],arguments[1],'state')}
			}
			
			var dd = domHelper.div(args);
			args.domParent.appendChild(dd);
			var dd = domHelper.div();
			for (var i=0; i<t.childs.length; ++i) {
				dd.appendChild(this.fromTree_(t.childs[i],v,vt));
			}
			d.appendChild(dd);
		}
		return d;
	}
	SgTreeHelper.prototype.fromTree=function fromTree(t,v,vt) {
		return this.fromTree_(t,v,vt);
	
	}
	
	SgTreeHelper.prototype.fromHTML=function fromHTML(o,v) {
		this.nodes=[];
		if (v) this.v=v;
		else this.v={styles:['backgroundColor','height','width','left','top','right','bottom','position']};
		return this.fromHTML_(o,0,this.v);
	}
	function SgTreeHelper(){}
	return instance ? instance : instance = new SgTreeHelper()
})()