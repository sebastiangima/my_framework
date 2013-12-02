function WinCal(){}

WinCal.prototype.baseClass='SgControlContainer';

WinCal.prototype.getControl = function getElement(k,o){
	switch(k){
		case 'body':
			return this.controls[this.id+'_content'];
		case 'container':
			return this.controls[this.id+'_wincal_container'];
		case 'note':
			return this.controls[this.id+'_winnote'];
		case 'header':
			return this.controls[this.id+'_header_center'];
		case 'days':
			return this.controls[this.id+'_days'];
		case 'months':
			return this.controls[this.id+'_months'];
		case 'years':
			return this.controls[this.id+'_years'];
		case 'decades':
			return this.controls[this.id+'_decade'];
		case 'century':
			return this.controls[this.id+'_century'];
		break;
	}
	return WinCal.prototype.base.getControl.call(this,k,o);
}

WinCal.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		
	}
	return WinCal.prototype.base.getElement.call(this,k,o);
}

WinCal.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

WinCal.prototype.getMonthsDayWeek = function getMonthsDayWeek(y,m) {
	return new Date(y,m,0,0,0,0).getDay();
}

WinCal.prototype.getMonthsDays = function getMonthsDays(y,m) {
	return new Date(y,m,0,0,0,0).getDate();
}

WinCal.prototype.getFirstDay = function getFirstDay(y,m) {
	var d = new Date(y,m,1,0,0,0);
	switch (d.toDateString().substr(0,3)) {
		case 'Sun': return Culture.shortdaysweek[0];
		case 'Mon': return Culture.shortdaysweek[1];
		case 'Tue': return Culture.shortdaysweek[2];
		case 'Wed': return Culture.shortdaysweek[3];
		case 'Thu': return Culture.shortdaysweek[4];
		case 'Fri': return Culture.shortdaysweek[5];
		case 'Sat': return Culture.shortdaysweek[6];
	}
}

WinCal.prototype.initHead = function initHead(){
	//WinCal.prototype.base.initHead.call (this);
}	

WinCal.prototype.getDaysCalendar = function getDaysCalendar(y,m) {
	var mes=m,
			anio=y,
			lmdays = this.getMonthsDays(anio,mes-1), // dias del mes anterior
			lmdate = this.getMonthsDayWeek(anio,mes-1), // dia de la semana del ultimo dia
			mdays = this.getMonthsDays(anio,mes), // dias del mes actual
			days = [],
			j,
			l=1;
	if (lmdate == 0) {
		lmdate = 7;
	}
	
	lmdays -= (lmdate-1);
	
	for (var i=0; i<lmdate; ++i) 
		days.push([0,lmdays+i])
	
	j=1;
	for (var i=lmdate; i<7; ++i) 
			days.push([1,j++])
	
	for (var k=0; k<5; ++k) {
		for (var i=0; i<7; ++i) {
			days.push([l,j])
			if (j == mdays) {
				j=0;
				l=0;
			}
			++j;
		}
	}
	return days;

}

WinCal.prototype.onKeyDown = function onKeyDown(e,o) {
	var o, setday=false;
	var c = this.getControl('note');
	// if (c.isOpen()) {
		// if (c.onKeyDown(e,o)) {
			// return false;
		// }
	// }
	
	if (e.keyCode == 32) {
		return this.onCenterClick(e,o);
	}
	else {
		var aux;
		switch(this.state) {
			case 0: o='days'; 
				aux = +(this.selectedDay.id.replace(/^.*_appwincal_day_([0-9]+)$/,"$1"));
				switch(e.keyCode) {
					case 13:
						this.onDblDayClick(e,this.controls[this.selectedDay.id].element);
					break;
					case 37:
						if (--this.selectedDay.col<0) {
							if (--this.selectedDay.row<0) {
								this.selectedDay.col=0;
								this.selectedDay.row=0;
								return;
							}
							else {
								this.selectedDay.col=6;
							}
						}
						setday=true;
						this.controls[this.selectedDay.id].element.setAttribute('state',0);
						this.selectedDay.id = this.id+'_day_'+(--aux);
						this.controls[this.selectedDay.id].element.setAttribute('state',1);
					break;
					case 38:
						if (this.selectedDay.row == 0)
							return;
						this.controls[this.selectedDay.id].element.setAttribute('state',0);
						aux-=7;
						this.selectedDay.row--;
						this.selectedDay.id = this.id+'_day_'+aux;
						this.controls[this.selectedDay.id].element.setAttribute('state',1);
						setday=true;
					break;
					case 39:
						if (++this.selectedDay.col>6) {
							if (++this.selectedDay.row>5) {
								--this.selectedDay.row;
								--this.selectedDay.col;
								return;
							}
							this.selectedDay.col=0;
						}
						this.controls[this.selectedDay.id].element.setAttribute('state',0);
						this.selectedDay.id = this.id+'_day_'+(++aux);
						this.controls[this.selectedDay.id].element.setAttribute('state',1);
						setday=true;
					break;
					case 40:
						if (this.selectedDay.row == 5)
							return;
						this.controls[this.selectedDay.id].element.setAttribute('state',0);
						aux+=7;
						this.selectedDay.row++;
						this.selectedDay.id = this.id+'_day_'+aux;
						this.controls[this.selectedDay.id].element.setAttribute('state',1);
						setday=true;
					break;
				}
			break;
			case 1: o='months'; 
				switch(e.keyCode) {
					case 37:
						return this.onLeftClick(e,o);
					break;
					case 38:
						this.onLeftClick(e,o);
						this.onLeftClick(e,o);
						this.onLeftClick(e,o);
						return this.onLeftClick(e,o);
					break;
					case 39:
						return this.onRightClick(e,o);
					break;
					case 40:
						this.onRightClick(e,o);
						this.onRightClick(e,o);
						this.onRightClick(e,o);
						return this.onRightClick(e,o);
					break;
					
				}
			
			break;
			case 2: o='years'; 
				
			break;
		}
	}
	if(setday) {
		if (c.isOpen()) {
			c.setDate(this.controls[this.selectedDay.id].getDate());
		}
	}
}


WinCal.prototype.setDate = function setDay(y,m,d){
	this.year = y;
	this.month = m;
	this.day = d;
	var y = this.getControl('years'),				// month,year,index
			m = this.getControl('months'),			// month,year
			d = this.getControl('days'),				// month
			c = this.getControl('container'),		// state, index
			h = this.getControl('header'),
			index = 0;
	for (var i in this.years) {
		if (this.years[i] == this.year) {
			index = i;
		}
	}
	domHelper.mapToElement(c.element,{state:this.state,'index':index});
	domHelper.mapToElement(y.element,{month:this.month,year:this.year,'index':index});
	domHelper.mapToElement(m.element,{month:this.month,year:this.year});
	domHelper.mapToElement(d.element,{month:this.monthd});
	domHelper.mapToElement(h.element,{innerHTML:Culture.getValue('months',this.month-1)});
	
	//this.getControl('note').setDate(new Date(this.year,this.month-1,this.day,0,0,0));
}

WinCal.prototype.onDblDayClick = function onDayClick(e,o){
	// var c = this.getControl('note');
	// c.open(this.year,this.month,this.day);
}

WinCal.prototype.onDayClick = function onDayClick(e,o){
	var day = this.controls[o.id];
	
	day.state = 1-day.state;
}

WinCal.prototype.onCenterClick = function onCenterClick(e,o){
	if (e.ctrlKey) {
		if (this.state==0) this.state=2;
		else this.state = (--this.state)%3;
	}
	else
		this.state = (++this.state)%3;
	
	this.getControl('container').element.setAttribute('state',this.state);
	return cancelEvent(e);
}

WinCal.prototype.selectDay = function selectDay(y,m,d){
	
}

WinCal.prototype.setYear = function makeYears(y){
	if (this.year<this.years[1]) {
		for (var i=1; i<=12; ++i) {
			this.years[i]+=y;
		}
		var c = this.getControl('years').element.children;
		for (var i=0; i<c.length; ++i) {
			for (var j=0; j<c[i].children.length; ++j) {
				c[i].children[j].innerHTML = this.years[i*4+j+1];
			}
		
		}
	}
}

WinCal.prototype.onLeftClick = function onLeftClick(e,o){
	if (this.state==2) {
		this.year--;
	}
	else {
		this.month--;
		if (this.month==0) {
			this.month=12;
			this.year--;
		}
	}
	if (this.year<this.years[1]) {
		this.setYear(-10);
		
	}

	this.setDate(this.year,this.month, 1);
	this.render(this.year,this.month);
	return cancelEvent(e);
}

WinCal.prototype.onRightClick = function onRightClick(e,o){
	if (this.state==2) {
		this.year++;
	}
	else {
		this.month++;
		if (this.month>12) {
			this.month=1;
			this.year++;
		}
	}
	if (this.year>this.years[12]) {
		for (var i=1; i<=12; ++i) {
			this.years[i]=this.years[i]+10;
		}
		var c = this.getControl('years').element.children;
		for (var i=0; i<c.length; ++i) {
			for (var j=0; j<c[i].children.length; ++j) {
				c[i].children[j].innerHTML = this.years[i*4+j+1];
			}
		
		}
		
	}

		this.setDate(this.year,this.month, 1);
	this.render(this.year,this.month);
	return cancelEvent(e);
}

WinCal.prototype.render = function render(y,m){
	var c,
			color=['gray','black'],
			days=this.getDaysCalendar(y,m),
			label = Culture.getValue('months',m-1).toLowerCase() + ' ' + 
				Culture.getValue('particles',0) + ' ' + y;
	
	this.getControl('header').element.innerHTML = label;
	this.getControl('days').element.setAttribute('month',this.month);
	this.getControl('months').element.setAttribute('month',this.month);
	
	for (var i=0; i<42; ++i) {
		c = this.controls[this.id+'_day_'+i];
		c.element.style.color = color[days[i][0]];
		c.element.innerHTML = days[i][1];
	}
}


WinCal.prototype.makeNote = function makeNote(y,m){
	return;
	var a,c,owner,
			this_ = this,
			topleft = this.getTopLeft(this.getControl('days').element);
	a = {
		id : this.id+'_winnote',
		'handler': this.getControl('container'),
		state:0,
		left: topleft[1]+this.getControl('days').element.clientWidth+'px',
		parentNode:document.body
	}
	owner=new IWinNote(a);

	this.controls[a.id]=owner;
	//this.toGadget();
	
	//owner.open(this.year,this.month,this.day);
	
}

WinCal.prototype.makeHeader = function makeHeader(y,m){
	var a,c,owner,
			this_ = this;
	
	a = {
		id: this.id+'_header',
			className:'wincal-header',
			'owner': this.getControl('container')
	}
	owner= new ISgControlContainer(a);
	this.controls[a.id]=owner;

	a = {
		id: this.id+'_header_left',
			className:'wincal-header left',
			'owner': owner,
			innerHTML:'&#x25c0',
			onclick: function(){
				return this_.onLeftClick(arguments[0],arguments[1]);
			}
	}
	c= new ISgControlContainer(a);
	this.controls[a.id]=c;
	
	a = {
		id: this.id+'_header_center',
			className:'wincal-header center',
			'owner': owner,
			innerHTML:Culture.getValue('months',this.month-1),
			onclick: function(){
				return this_.onCenterClick(arguments[0],arguments[1]);
			}
	}
	c= new ISgControlContainer(a);
	this.controls[a.id]=c;

	a = {
		id: this.id+'_header_right',
			className:'wincal-header right',
			'owner': owner,
			innerHTML:'&#x25b6',
			onclick: function(){
				return this_.onRightClick(arguments[0],arguments[1]);
			}
	}
	c= new ISgControlContainer(a);
	this.controls[a.id]=c;

}
	
WinCal.prototype.makeYearGrid = function makeYearGrid(y,m){
	var a, k=0,
			owner, line;
	var index = this.year%10+2, 
			container = this.getControl('container');
	this.years = {};
	container.element.setAttribute('index',index);
	a = {
		id: this.id+'_years',
			className:'wincal-years',
			month:this.year,
			year:this.year,
			'index':index,
			'owner': container
	}
	owner= new ISgControlContainer(a);
	this.controls[a.id]=owner;
	
	var anio = this.year - (this.year % 10) - 1;
	var line;
// // k	var k=0;
	for (var i=0; i<3; ++i) {
		a = {
			id: this.id+'_years_line',
				className:'wincal-years-line',
				'owner': owner
		}
		line = new ISgControlContainer(a);
		for (var j=0; j<4; ++j) {
			a={
					id:this.id+'_year_'+k,
					className:'wincal-year',
					'text-align':'right',
					'owner': line,
					index:(k+1),
					col: j,
					innerHTML:anio+k
			}
			this.years[k+1]=anio+k;
			this.controls[a.id]= new ISgControlContainer(a);	
			++k;
		}
	}
}

WinCal.prototype.makeMonthGrid = function makeMonthGrid(y,m){
	var a, k=0,
			owner, line;
	
	a = {
		id: this.id+'_months',
			className:'wincal-months',
			month:this.month,
			year:this.year,
			'owner': this.getControl('container')
	}
	owner= new ISgControlContainer(a);
	this.controls[a.id]=owner;

	
	for (var i=0; i<3; ++i) {
		a = {
			id: this.id+'_months_line',
				className:'wincal-months-line',
				'owner': owner
		}
		line = new ISgControlContainer(a);
		this.controls[a.id]=line;
		for (var j=0; j<4; ++j) {
			a={
				id:this.id+'_month_'+k,
				className:'wincal-month',
				'text-align':'right',
				'owner': line,
				col: j,
				month:k+1,
				innerHTML:Culture.getValue('shortmonths',k).toLowerCase()
			}
			this.controls[a.id]= new ISgControlContainer(a);
			++k;
		}
	}

}

WinCal.prototype.makeDaysGrid = function makeDaysGrid(){
	var a, owner, line, this_ = this;

	a = {
		id: this.id+'_days',
			className:'wincal-days',
			month:this.month,
			
			'owner': this.getControl('container')
	}
	owner = new ISgControlContainer(a);
	this.controls[a.id]=owner;

	
	a = {
		id: this.id+'_days_line',
			className:'wincal-days-line',
			'owner': owner
	}
	line = new ISgControlContainer(a);
	
	//this.controls[a.id]=line;
	
	for (var i=0; i<7; ++i) {
		a={
			id:this.id+'_dayweek_'+i,
			className:'wincal-dayweek',
			'text-align':'right',
			'owner': line,
			col: i,
			innerHTML:Culture.getValue('shortdaysweek',i).toLowerCase()
		}
		this.controls[a.id]= new ISgControlContainer(a);
	}

	j=0;
	var days = this.getDaysCalendar(this.year, this.month);
	console.log(days);
	for (var k=0; k<6; ++k) {
		a = {
			id: this.id+'_days_line',
				className:'wincal-days-line',
				'owner': owner
		}
		line = new ISgControlContainer(a);
		for (var i=0; i<7; ++i) {
				
			a={
				id:this.id+'_day_'+j,
				'owner': line,
				col: i,
				'text-align':'right',
				value:new Date(this.year,this.month-1,+days[j][1],0,0,0),
				getDate:function(){return this.value},
				innerHTML:days[j][1]
			}
			if (days[j][0]==0) {
				a.color='gray';
				a.state = 0;
				a.className='wincal-dayweek '+a.color;
				a.ondblclick = function(){
					return this_.onDblDayClick(arguments[0],arguments[1]);
				}
				a.onclick = function(){
					return this_.onDayClick(arguments[0],arguments[1]);
				}
			}
			else {

				if (days[j][1]==this.day) {
					a.state= 1;
					this.selectedDay = {
						id: a.id,
						col: i,
						row: k,
						day: days[j][1]
						
					}
				}
				else a.state=0;
				a.color='black';
				a.className='wincal-dayweek '+a.color;
				
				a.ondblclick = function(){
					return this_.onDblDayClick(arguments[0],arguments[1]);
				}
				a.onclick = function(){
					return this_.onDayClick(arguments[0],arguments[1]);
				}
			}

			this.controls[a.id]= new ISgControlContainer(a);
			++j;
		}
	}	
	
	return;
}

WinCal.prototype.destroy = function destroy(){
	if (this.likeGadget) {
		if (this.element.parentNode==this.owner.element)
			return;
	}
	sgApp.unregisterReference(this);
	SgObject.prototype.destroy.call(this);
}

WinCal.prototype.toGadget = function toGadget(e,o){
	var c;
	
	if (!this.likeGadget) {
		this.likeGadget=true;
		c = this.getControl('container');
		
		document.body.appendChild(c.element.parentNode.removeChild(c.element));
		this.element.style.opcity=0;
		//c = this.getControl('note');
		//document.body.appendChild(c.element.parentNode.removeChild(c.element));
		
	}
	else {
		c = this.getControl('container');
		d = this.getControl('body');
		
		this.element.style.opcity=1;
		//this.owner.sendMessage()
		this.likeGadget=false;
		d.element.appendChild(document.body.removeChild(c.element));
		// d = this.getControl('note');
		// c.element.appendChild(document.body.removeChild(d.element));
		
	}

}

WinCal.prototype.initBody = function initBody(){
	
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this
	}
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c


	var a = {
		id : this.id+'_wincal_container',
		className:'wincal-container',
		owner: c,
		state:0
	}
	var d=new ISgControlContainer(a);
	this.controls[a.id] = d


	
	this.makeMonthGrid();
	this.makeDaysGrid();
	this.makeYearGrid();
	this.makeHeader();
	this.selectDay(this.year,this.month,this.day);
	//this.makeNote();
	this.onDblDayClick();
	
}

WinCal.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	args.className = domHelper.mergeClassName(args.className, 'window');
	WinCal.prototype.base.initControls.call (this,args);

	this.initHead();
	this.initBody();

	
	
	return;
}

WinCal.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {}
			this_=this;

	args.onclick=function(){
		this_.toGadget(arguments[0],arguments[1])
	}
	args.active=0;
	
	args.className = domHelper.mergeClassName(args.className,'wincal');
	var d = new Date();

	args.year = d.getFullYear();
	args.month = d.getMonth()+1;
	args.day = d.getDate();
	args.state = 0;
	args.selectedDay = d;
	WinCal.prototype.base.init.call(this,args);

	
}

function IWinCal(){
	this.init(arguments[0]);
	sgApp.registerReference(this);
}

classHelper.register(WinCal,IWinCal);
