function SgFolder(){}

SgFolder.prototype.baseClass = 'SgControlContainer';


SgFolder.prototype.getFullPath = function getFullPath(format){
	if (!format) format = 'v';
	var result=[];
	for (var i=0; i<this.path.length; ++i) {
		result.push(this.path[i]);
	}
	switch(format) {
		case 'v':
			result.push(this.name);
		break;
		default:
			alert('No implementado SgFolder.getFullPath\r\nformat:'+format);
		break;
	}
	return result;
}
SgFolder.prototype.getElement = function getElement(k,o){
	// if (k) {
		// switch(k){
			// case 'controls':
				// return this.controls;
			// break;
			
		// }
	// }
	return SgFolder.prototype.base.getElement.call(this,k,o);
}

SgFolder.prototype.onCmdClick = function append(c){
	if (this.owner && this.owner.onCmdClick) {
		this.owner.onCmdClick(arguments[0]);
	}
}

SgFolder.prototype.initControls = function initControls(){
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

SgFolder.prototype.ondblclick_ = function ondblclick_(e,o){
	if (this.entryType=='directory') {
		if (this.targetEvent && this.targetEvent[e.type]) {
			var target = this.targetEvent[e.type].target ? this.targetEvent[e.type].target : this;
			//var target = this;
			this.targetEvent[e.type].owner[this.targetEvent[e.type].listener]({
				event:e,
				'target':target,
				msg:this.targetEvent[e.type].msg
			});
		}
	}
}

SgFolder.prototype.init = function init(){
	var args = arguments[0] ? arguments[0] : {},
			this_=this;

	args.className = domHelper.mergeClassName(args.className,'directory-entry');
	args.ondblclick = function(){return this_.ondblclick_(arguments[0],arguments[1])}
	args.ondrag = function(){alert()}
	SgFolder.prototype.base.init.call(this,args);
	
	var sg = this.element.sg;
		if (this instanceof ISgFolder) {
			var this_=this;
			if (!sg) sg = {};
			sg.context={
					name:this.constructor.name,
				id:this.id,
				instance:this
			};
			
			
			this.element.sg = sg;
			
		}	
}

function ISgFolder(){
	
	this.init(arguments[0]);
//	this.protoParent=ISgControl;
}

classHelper.register(SgFolder,ISgFolder,true);
