var Culture = (function(){
	var instance = null;
	
	ICulture.prototype.culture;
	ICulture.prototype.cultures;
	
	ICulture.prototype.getValue = function getValue(o,i){
		return this.cultures[this.culture][o][i];
	}

	
	function ICulture(){
		this.culture='español';
		this.cultures={
			'español':{
				particles:['de'],
				shortmonths:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
				months:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
				daysweek:['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
				shortdaysweek:['Lu','Ma','Mi','Ju','Vi','Sa','Do']
				},
			'english':{
				particles:['of'],
				shortmonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'],
				months:['January','Februaty','March','April','May','June','July','Agoust','September','October','November','December'],
				daysweek:['Monday','Tueday','Wedday','Thuday','Friday','Saturday','Sunday'],
				shortdaysweek:['Mo','Tu','We','Th','Fr','Sa','Su']
			}
		};
	}
	
	return instance ? instance : instance = new ICulture;
})()