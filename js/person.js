var Klass = (function(){
    var trulyPrivateInformation = 42;

    function trulyPrivateUtilityFunction() {
        // ...
    }
		
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

var c1 = new Klass();

var p = {	
							name:'sgObject', 
							protoParent:null, 
							id:1
						}
c1.init({
	properties:p,
	methods:{
			getp:function(x){return p[x]},
			setp:function(x,v) {p[x]=v}
		}
	})
	
	

console.log(c1); // Logs 'test'

function Klass() {
    this.test = 'test';
}

var c2 = new Klass();



var p = {
	protoParent:'sgObject', 
					properties:p,
	methods:{
			// getp:function(x){return p[x]},
			// setp:function(x,v) {p[x]=v}
			disable:function(){}
		}
						}
						
c2.init({
	
	})
	
	
	

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

         
