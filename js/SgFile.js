function SgFile(){}

SgFile.prototype.baseClass = 'SgControlContainer';


SgFile.prototype.getFullPath = function getFullPath(format){
	if (!format) format = 'v';
	var result=[];
	switch(format) {
		case 'v':
			result = this.path;
			result.push(this.name);
		break;
		default:
			alert('No implementado SgFile.getFullPath\r\nformat:'+format);
		break;
	}
	return result;
}
SgFile.prototype.getElement = function getElement(k,o){
	// if (k) {
		// switch(k){
			// case 'controls':
				// return this.controls;
			// break;
			
		// }
	// }
	return SgFile.prototype.base.getElement.call(this,k,o);
}

SgFile.prototype.onCmdClick = function append(c){
	if (this.owner && this.owner.onCmdClick) {
		this.owner.onCmdClick(arguments[0]);
		}
}

SgFile.prototype.initControls = function initControls(){
	var a = {
		id:this.id+'_'+'label',
		innerHTML:this.name,
		domParent:this.element,
		onclick:function(){
			arguments[1].setAttribute('contentEditable',true);
		}
	}
	var c = new ISgControl(a);
	
	
}

SgFile.prototype.ondblclick_ = function ondblclick_(e,o){
	if (this.targetEvent && this.targetEvent[e.type]) {
		var args={};
		for (var i in this.targetEvent[e.type].params) {
			args[i]=this[this.targetEvent[e.type].params[i]];
		}
		args.event=e;
		args.target=this;
		this.targetEvent[e.type].owner[this.targetEvent[e.type].listener](args);
	}
}

SgFile.prototype.init = function init(){
	//classHelper.extend(this,SgFile.prototype.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	var this_=this;
	args.ondblclick = function(){return this_.ondblclick_(arguments[0],arguments[1])}
	args.className = domHelper.mergeClassName(args.className,'directory-entry');
	SgFile.prototype.base.init.call(this,args);
	
	
}

function ISgFile(){
	
	this.init(arguments[0]);
//	this.protoParent=ISgControl;
}

classHelper.register(SgFile,ISgFile);
