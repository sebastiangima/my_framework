var extend = function(destination, source)
{
    for (var property in source)
    {
        if (destination[property] && (typeof(destination[property]) == 'object') && (destination[property].toString() == '[object Object]') && source[property])
            extend(destination[property], source[property]);
        else
            destination[property] = source[property];
    }
    return destination;
}

var Klass = (function(){
    var trulyPrivateInformation = 42;
		Klass.prototype.init = function(options){
			for (var i in options){
				this[i]=options[i];
			}
		}
    function Klass(options) {
      for (var i in options) {
				this[i]=options[i];
			}
    }
    return Klass;
})();
function Klass() {
}

var sgo = new Klass();
var sgc=new Klass()
var p1 = {	
							name:'sgObject', 
							protoParent:null, 
							id:1
						}
	var p2={
		element:domHelper.div(),
		elementVars:{}
	}

						
sgo.init({
	properties:p1,
	methods:{
			getp:function(x){return p[x]},
			setp:function(x,v) {p[x]=v}
		}
	})





	
	var sgc=new Klass();
	console.log(sgc); // Logs 'test'
	sgc=extend(sgc,sgo)
	console.log(sgc); // Logs 'test'
	
	sgc.init({
	properties:p2,
	methods:{
		}
	})
	
console.log(sgc); // Logs 'test'
	


function GenericToString(){}
GenericToString.prototype.toString = function(){
	var props = [];
	for (var name in this) {
		if (!this.hasOwnProperty(name)) continue;
		var value = this[name]
		var s = name + ":";
		switch(typeof value){
			case 'function':
				s+="function";
				break;
			case 'object':
				if (value instanceof Array) s += "arra";
				else s+=value.toString();
			break;
			default: 
				s+= String(value)
			break;
		}
		props.push(s);
	}
	return "{" + props.join(", ")+"}";
}
