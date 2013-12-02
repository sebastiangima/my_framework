function SgExeFile(){}

SgExeFile.prototype.baseClass = 'SgFile';


SgExeFile.prototype.getFullPath = function getFullPath(format){
	if (!format) format = 'v';
	var result=[];
	switch(format) {
		case 'v':
			result = this.path;
			result.push(this.name);
		break;
		default:
			alert('No implementado SgExeFile.getFullPath\r\nformat:'+format);
		break;
	}
	return result;
}
SgExeFile.prototype.getElement = function getElement(k,o){
	// if (k) {
		// switch(k){
			// case 'controls':
				// return this.controls;
			// break;
			
		// }
	// }
	return SgExeFile.prototype.base.getElement.call(this,k,o);
}

SgExeFile.prototype.onCmdClick = function append(c){
	if (this.owner && this.owner.onCmdClick) {
		this.owner.onCmdClick(arguments[0]);
	}
}

SgExeFile.prototype.initControls = function initControls(){
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

SgExeFile.prototype.ondblclick_ = function ondblclick_(e,o){
	if (this.targetEvent && this.targetEvent[e.type]) {
		var args={};
		for (var i in this.targetEvent[e.type].params) {
			args[i]=this.targetEvent[e.type].params[i];
		}
		args.event=e;
		args.target=this;
		this.targetEvent[e.type].owner[this.targetEvent[e.type].listener](args);
	}
}

SgExeFile.prototype.init = function init(){
	//classHelper.extend(this,SgExeFile.prototype.protoParent);
	var args = arguments[0] ? arguments[0] : {}

	var this_=this;
	args.ondblclick = function(){return this_.ondblclick_(arguments[0],arguments[1])}
	args.className = domHelper.mergeClassName(args.className,'directory-entry');
	SgExeFile.prototype.base.init.call(this,args);
	
	
}

function ISgExeFile(){
	
	this.init(arguments[0]);
//	this.protoParent=ISgControl;
}

classHelper.register(SgExeFile,ISgExeFile);
