var toogleHelper = (function(){
	
	var instance = null;
	
	ToogleHelper.prototype.toogleCount = 0;
	ToogleHelper.prototype.toogleData;
	ToogleHelper.prototype.newEmptyToogle = function newEmptyToogle(){
		var div=document.createElement('DIV');
		var args=arguments[0] ? arguments[0] : {};
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
		domHelper.mapToElement(div,args);
		
		return div;
	
	}
	
	/* data: 	{
							toogleName 	(attribute to map in element)
							triggerOn		*(event that throw the toogle trigger)
													default: onclick
							message			*(string cointaining json object or array or string to pass to handler)
													default: undefind => no message will be pass to handler
							toogleSet		*(array values to transite state on toogle action)
													default: [0,1]  
							toogleCss		*(indica set of css classes to asign in toogle step
							handler			*(which function will be call on toogle action)
													default: ToogleHelper.onToogleEvent
	*/
	
	ToogleHelper.prototype.onToogleEvent = function onToogleEvent(){
		var index=arguments[1].getAttribute('index');
		data = this.toogleData[index];
			var value=arguments[1].getAttribute(data.toogleName);
		value=(+value+1)%data.toogleSet.length;
		var args={};
		args[data.toogleName]=value;
		domHelper.mapToElement(arguments[1],args);
		
		
	}

	ToogleHelper.prototype.makeToogleOn = function makeToogleOn(element, data){
		var args={index:++this.toogleCount, toogle:{options:{}}};
		args.toogle.attribute = 'active';//data[i];
		args.toogle.triggerOn = 'onclick';//data[i];

		this.toogleData[args.index]={
			toogleCss: data && data.toogleCss ? data.toogleCss : null,
			toogleSet: data && data.toogleSet ? data.toogleSet : [0,1],
			handler: data && data.handler ? data.handler : null,
			toogleName: args.toogle.attribute
		}
		
		args.toogle.handler = function() {
			return toogleHelper.onToogleEvent(arguments[0],arguments[1],arguments[2]);
		}
		
	}
	
	ToogleHelper.prototype.putInToogle = function putInToogle(element, data){
		var args={index:++this.toogleCount, toogle:{options:{}}};
		
		for (var i in data) {
			switch(i) {
				case 'toogleName':
					args.toogle.attribute = 'active';//data[i];
				break;
				case 'triggerOn':
					args.toogle.when = data[i];
				break;
				default: 
					args.toogle.options[i]=data[i];
				break;
			}
		}

		if (!args.toogle.attribute) {
			args.toogle.attribute='active';
		}

		this.toogleData[args.index]={
			toogleCss: data && data.toogleCss ? data.toogleCss : null,
			toogleSet: data && data.toogleSet ? data.toogleSet : [0,1],
			handler: data && data.handler ? data.handler : null,
			toogleName: args.toogle.attribute
		}
		
		args.toogle.handler = function() {
			return toogleHelper.onToogleEvent(arguments[0],arguments[1],arguments[2]);
		}
		
		var d=this.newEmptyToogle(args);
		d.appendChild(element);
		return d;
	}
	
	function ToogleHelper(){
		this.toogleData={};
	}
	
	
	return instance ? instance : instance = new ToogleHelper()
	
})()