// Helper method for extending one object with another


var classHelper = (function () {
	var instance = null;
	
	ClassHelper.prototype.prototypes;

	ClassHelper.prototype.klasses;

	ClassHelper.prototype.getClassName = function getClassName(k) {
		if (k.prototype)
			return k.prototype.constructor.toString().replace(/function ([A-Za-z0-9_]+).*/gim,'$1')
		return k.constructor.toString().replace(/function ([A-Za-z0-9_]+).*/gim,'$1')
	}

	ClassHelper.prototype.register = function register(k,contr) {
		var kn = this.getClassName(k);
		if (!this.klasses[kn]) {
			var bkn = k.prototype.baseClass 	|| '';
			if (!bkn) k.prototype.baseClass=null;
			else {
				var bk = window[bkn];
				if (!k.base) k.base={};
				if (!k.prototype.base) k.prototype.base={baseKlass:bk};
				if (typeof(bk)=='undefined')
					throw "Error, clase base desconocida ("+bkn+")";
				for (var i in bk.prototype) {
					if (bk.prototype[i] instanceof Function) {
						if (i != 'constructor') {
							var fn=i;
							if (typeof(k.prototype[i])=='undefined') 
								k.prototype[i]=bk.prototype[i];
							k.prototype.base[i]=bk.prototype[i];
							
						}
					}
					else {
						if (typeof(k[i])=='undefined') 
							k[i]=bk.prototype[i];
						k.prototype.base[i]=bk.prototype[i]
					}
				}
			
			}
			this.klasses[kn]=k;
		}
		if (contr)
			contr.prototype = new k();
		//ISgControlContainer.prototype=new SgControlContainer();
			//	var o = new window[contr]({id:'ClassHelper_'+_instance});
			
		
		return k;
	}

	ClassHelper.prototype.extendAsArray = function extendAsArray(obj) {
    if (!from) from = [];
		if (obj.length === undefined || obj.__lookupGetter__('length')) {
        var index = 0;
        for (var prop in obj) {
            if(!obj.__lookupGetter__(prop)) {
                (function(thisIndex, thisProp) {
                    obj.__defineGetter__(thisIndex, function() {return obj[thisProp]});
                })(index, prop)
                index++;
            }
        };
        obj.__defineGetter__("length", function() {return index});
    }
    return obj;
	}	

	ClassHelper.prototype.extend = function extend(a,b) {
    // if (a && b) {
			// if (!this.prototypes[b])
		// }
		
		if (b instanceof Array)
			return this.extendAsArray(a);
		var p=1;
		while(p) {
			
			p=null;
			for (var i in b) {
				if (i=='constructor') continue;
				if (typeof(a[i])=='undefined')
					a[i]=b[i];
				if (i=='protoParent') p=b[i];
			}
			b=p;
		}
		return a;
		for ( var i in b ) {
        var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
        if ( g || s ) {
            if ( g )
                a.__defineGetter__(i, g);
            if ( s )
                a.__defineSetter__(i, s);
         } else
						if (typeof(a[i]) == 'undefined')
             a[i] = b[i];

						 }
    return a;
	}
		
	// params: o 	-> objeto a inspeccionar
	//				 sl	-> cadena de texto para el salto de linea (default: <br />)
	ClassHelper.prototype.objStrToDiv=function objStrToDiv(o,div,sl) {
		if (div && div instanceof String) 
			div = document.getElementById(div);
		if (!div || !(div instanceof HTMLElement)) {
			div = domHelper.div();
			document.body.appendChild(div);
		}
		div.innerHTML+=this.objToString(o,sl);
	}			

	ClassHelper.prototype.objToDomTable=function objToDomTable(o,sl) {
		var d=domHelper.div();
		d.innerHTML = this.objToDomTable_(o,sl);
		d.setAttribute('class','object-inspector');
		return d;

	}

	ClassHelper.prototype.objToDomTable_=function objToDomTable_(o,sl) {
		var s='';
		if (o && o instanceof Array) 
			for (var i=0; i<o.length; ++i) 
				s+='<div><div>'+i+'</div><div>'+this.objToDomTable__(o[i],sl)+'</div></div>';
			else
			for (var i in o) {
					s+='<div><div>'+i+'</div><div>'+this.objToDomTable__(o[i],sl)+'</div></div>';
			}
		return s;
	}
	
	ClassHelper.prototype.objToDomTable__=function objToDomTable__(o,sl) {
		var type,anidado='';
		var result;
		
		if (o === null)
			return 'null';
		switch(typeof(o)) {
			case 'undefined':	return 'undefined';	break;
			case 'string':	case 'number':	case 'boolean':
					return '<div>'+o+'</div>d <div>'+typeof(o)+'</div>';
			break;
			default:
				anidado='';
				if (o instanceof Function) {
					anidado = o.constructor ? o.constructor.name : o.toString();
					return '<div>Function</div>';
					return '<div>'+anidado+'</div><div>Function</div>';
				}
				// else if (o instanceof Array) {
					// for (var j=0; j<o.length; ++j) {
						// anidado += '<div><div>'+j+'</div><div>'+this.objToDomTable__(o[j],sl)+'</div><div>Array</div><div></div></div>';
					// }
					// return '<div><div>'+'Array'+'</div><div>'+anidado+'</div><div>Array</div></div>';
				// }
				else {
					anidado=this.objToDomTable_(o,sl);
					return '<div>'+anidado+'</div>';
				}
					
				break;
			}
		
	}
	
	ClassHelper.prototype.parseObjToTable=function recObjList(o,collapse) {
		var tr, sd='', sr='', s='';
		var taTemplate = '<table class="inspector-row" @tableClass@><tbody>@rows@</tbody></table>';
		var trTemplate = '<tr class="inspector-row-row">@cels@</tr>';
		var tdTemplate = '<td>@value@</td>';
		var typeValue;
		if (o && o instanceof Array) {
			for (var i=0; i<o.length; ++i){
				sd=tdTemplate.replace(/@value@/,i);
				typeValue = this.parseObjToTable_(o[i]);
				sd+=tdTemplate.replace(/@value@/,typeValue[0]);
				sd+=tdTemplate.replace(/@value@/,typeValue[1]);
				sr+=trTemplate.replace(/@cels@/,sd);
			}
			
		}
		else {
			for (var i in o) {
				sd=tdTemplate.replace(/@value@/,i);
				typeValue = this.parseObjToTable_(o[i]);
				sd+=tdTemplate.replace(/@value@/,typeValue[0]);
				sd+=tdTemplate.replace(/@value@/,typeValue[1]);
				sr+=trTemplate.replace(/@cels@/,sd);
			}
		}
			s = '';

		var d = domHelper.div(), cell;
		d.innerHTML = taTemplate.replace(/@rows@/,sr)

		var rows=d.getElementsByClassName('inspector-row-row');
		for (var i=0; i<rows.length; ++i) {
			cel = rows[i].children[0];
			cel.onclick=function(){
				var value=this.getAttribute('active');
				if (typeof(value)=='undefined') value=0;
				else value=1-value;
				this.setAttribute('active',value);
			}
		}
		return d;
			
		
	}

	ClassHelper.prototype.parseObjToTable_=function parseObjToTable_(o) {
		if (typeof(o)=='undefined') {
			return ['undefined','undefined'];
		}
		if (o===null){
			return ['null','undefined'];
		}
		switch(typeof(o)) {
			case 'string': case 'number': case 'boolean':
				return [o.toString(),typeof(o)];
			break;
		}
		if (o instanceof Function)
			return ['<div>'+o.toString()+'<div>','Function'];
		if (o instanceof Array) {
			return [this.parseObjToTable(o),'Array'];
		}
		else if (o instanceof HTMLElement) return[o.tagName,'HTMLElement'];
		else return [this.parseObjToTable(o),'Object'];
		
	}

	ClassHelper.prototype.objToString=function objToString(o,sl) {
		var s='';
		sl = sl ? sl : '<br />';
		
		for (var i in o) {
		
			s+=i+': '+o[i]+'<br />';
		}	
		return s;
	}

	ClassHelper.prototype.nObjToDivs=function nObjToDivs(vo,div,sl) {
		var d;
		var s='';
		for (var i in vo) {
			s+='<div>';
			s+=this.objToString(vo[i],sl)+'</div>';
		}
		if (div && div instanceof String)
			div = document.getElementById(div);
		if (!div || !(div instanceof HTMLElement))
			div = document.createElement();
		div.innerHTML=s;
		return div;

	}

	ClassHelper.prototype.nObjToString=function objToString(vo,sl) {
		var s='';
		
		for (var i in vo) {
			s+=i+': ';
			s+=this.objToString(vo[i],sl)+'<br />'
		}
		return s;
	}
		
	function ClassHelper(){
		this.prototypes={};
		this.klasses={};
		this.register_=function(){
			var kn=arguments[0], pk=arguments[1];
		}
	}
	
	return instance ? instance : instance = new ClassHelper()
})()