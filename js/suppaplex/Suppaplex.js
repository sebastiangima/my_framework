function Suppaplex(){}

Suppaplex.prototype.baseClass='SgControlContainer';

Suppaplex.prototype.updateSize = function updateSize(){
	var b = this.getControl('body');
	this.data.sx = b.element.clientWidth;
	this.data.sy = b.element.clientHeigh;
	this.data.centroX = Math.floor((this.data.sx / 32)/2);
	this.data.centroY = Math.floor((this.data.sy / 32)/2);
	this.data.cellsX = Math.ceil(this.data.sx / 32);
	this.data.cellsY = Math.ceil(this.data.sy / 32);
	
}

Suppaplex.prototype.logScroll = function logScroll(){
	return;
	var s='';
	s+='['+this.player.row-this.data.scroll[0].n+this.data.cetroY+','+this.player.col-this.data.scroll[1].n+this.data.cetroX+'] -- ';
	s+='(r,c) = ('+this.player.col+', '+this.player.col+') -- (cy,cx) = ('+this.data.centroY+', '+this.data.centroX+') -- ';
	s+='(sny,snx) = ('+this.data.scroll[0].n+', '+this.data.scroll[1].n+') -- (snfy,snfx) = ('+this.data.scroll[0].nf+', '+this.data.scroll[1].nf+') -- ';
	s+='(step_sc: '+this.data.scroll[1].s+') -- (step_pl: '+this.player.state+')';
	output.setContent(s);
}

Suppaplex.prototype.scrollScreen = function scrollScreen(){
	var dx, dy;
	var b=this.getControl('body').element;
	if(!this.player) return;
	if (this.player.delta[1] || (this.data.scroll[1].s && !this.player.delta[1])) {
		dx=this.data.centroX-(this.player.col)-(this.data.scroll[1].n)-this.player.delta[1];
		if (this.data.scroll[1].s) this.data.scroll[1].s--;
			if (this.data.scroll[1].nf!=0) {
		
			if(this.data.scroll[1].s==0){
					this.data.scroll[1].n+=this.data.scroll[1].nf;
					this.data.scroll[1].nf=0;
			
			}
			b.scrollLeft+=(32/this.player.steps)*this.data.scroll[1].nf;
			this.logScroll();
		
			return;
		}
		if (dx>1) {
			if(this.player.col<=this.data.centroX) {
				//this.logScroll();
				return;
			}
		}
		else {
			if (this.data.scroll[1].s==0) {
			
				this.data.scroll[1].nf=this.player.delta[1];
				this.data.scroll[1].s=this.player.steps-1;
				b.scrollLeft+=(32/this.player.steps)*this.data.scroll[1].nf;
			}
			//else this.data.scroll[1].s--;
			this.logScroll();
		}
	}
	else {
		if (this.player.delta[0] || (this.data.scroll[0].s && !this.player.delta[0])) {
				dy=this.data.centroY-(this.player.row)-(this.data.scroll[0].n)-this.player.delta[0];
				if (this.data.scroll[0].s) this.data.scroll[0].s--;
					if (this.data.scroll[0].nf!=0) {
				
					if(this.data.scroll[0].s==0){
							this.data.scroll[0].n+=this.data.scroll[0].nf;
							this.data.scroll[0].nf=0;
					
					}
					b.scrollTop+=(32/this.player.steps)*this.data.scroll[0].nf;
					this.logScroll();
				
					return;
				}
				if (dy>1) {
					if(this.player.row<=this.data.centroY) {
						//this.logScroll();
						return;
					}
				}
				else {
					if (this.data.scroll[0].s==0) {
					
						this.data.scroll[0].nf=this.player.delta[0];
						this.data.scroll[0].s=this.player.steps-1;
						b.scrollTop+=(32/this.player.steps)*this.data.scroll[0].nf;
					}
					//else this.data.scroll[1].s--;
					this.logScroll();
				}
			}	
	}
	return;
	if (this.player) {
		if (this.player.col < this.data.cellsX/2) {
			return
		}
		
			
		// dx = Math.ceil(this.data.cellsX/2-(this.player.col))
		// this.data.scroll[1] = dx;
		var ssx = this.getControl('body').element.scrollLeft;
		ssx = +ssx.toString().replace('px','');
		ssx += arguments[0][1]*Math.ceil(32/this.player.steps);
		this.getControl('body').element.scrollLeft=ssx+'px'
		
	}
	
}

Suppaplex.prototype.onCellClick = function onCellEdition(e,o,c){
	
	var row=c.row,
			col=c.col,
			oo, a;
			
	if (this.mode=='PLAY') {
		alert('('+c.row+', '+c.col+')');
		return cancelEvent(e);
	}
	if (this.mode=='EDIT') {
		if (this.lastShape) {
			this.data.matriz[row][col]=this.lastShape.value;
			var v = ['holes',null,'boards','player','walls','stones','infotrons','disks','disks','disks','explotions','walls'];
			var w = ['Hole',null,'Board','Player','SoftWall','Stone','Infotron','DiskO','DiskR','DiskY','Explotion','HardWall'];
			if (w[this.lastShape.value]) {
				a={
					id : c.id,
					oiod: c.oiod,
					row:c.row,
					col:c.col,
					value: this.lastShape.value,
					owner:c.owner,
					handler:this
					
				}
				var index=-1;
				for (var i=0; i<this[v[c.value]].length; ++i) {
					if (this[v[c.value]][i].id==c.id) {
						index = i;
						break;
					}
				}
			
				oo = this[v[c.value]].splice(index,1);
				oo[0].destroy();
				delete oo
				oo = new window['ISuppa'+w[this.lastShape.value]](a);
			
				this[v[this.lastShape.value]].push(oo);
				
				}
				var tr,type,rb,ooid ,t= this.lastShape.value;
				ooid = row.toString().padLeft(3,'0')+'_'+col.toString().padLeft(3,'0');
		switch(t) {
				case 0: // empty
					tr = 0;
					type=0;
				break;
				case 2: // board
					tr = 2;
					type=2;
				break;
				case 1: // border limits
					tr = -1; // unreservable cell
					type=1;
				break;
				case 3:
				case 5:
				case 8:
				case 6: // static reservation by movable object
					tr = 3;
					type=3;
				break;
					
					
				case 11:
				case 4: // static reservation by unmovable object (walls, tunels)
					tr = 4;
					type=4;
				break;
				case 7:
				case 9:
					tr = t;
					type=4;
				break;
			}
			if (t == 0)
				rb=0;
			else { 
				if (!c.ooid) {
					rb = ooid = (this.data.rows+row).toString().padLeft(3,'0')+'_'+col.toString().padLeft(3,'0');
				}
				else 
					rb = c.ooid;
				oo.ooid = ooid;
			}			
				var vr=[tr,0,rb, type, t];


		this.data.reservation[row][col]=vr;				
			
			
		}
		return cancelEvent(e);
	}
}

Suppaplex.prototype.makeScreen = function makeScreen(){
	var args = arguments[0] || {};
	this.reseted=false;
	var this_=this;
	this.data.matriz = [];
	this.moving={};
	this.data.scroll =[{n:0,nf:0,s:0},{n:0,s:0,nf:0}]; 
	this.dscronll=[0,0];
	this.data.rmatriz = [];
	if (args.vo) {
		this.savedScreen = args;
	}
	this.data.reservation = [];
	this.reservationTypes = [
		'reservable',
		'unservable',
		'reservable',
		'static reservation by movable object',
		'static reservation by unmovable object',
		'dynamic reservation by movable object',
	]
	var v, c, o, vo={}, vr, tr, n, type, id, oid, rb, ooidr, ooid;
	o=this.getControl('screen');
	this.data.rows = args.rows || 10;
	this.data.cols = args.cols || 10;

	args.player = args.player || [1,1];
	for (var i=1; i<this.data.rows-1; ++i)
		vo[i]={};
	vo[args.player[0]][args.player[1]]=3;	
	
	if (args.vo) vo = args.vo;
	
	for (var i=0; i<this.data.rows; ++i) {
		v=[];
		vr = [];
		vrr = {};
		ooidr = i.toString().padLeft(3,'0')+'_';
		for (var j=0; j<this.data.cols; ++j) {
			ooid = ooidr+j.toString().padLeft(3,'0');
			if (vo[i] && vo[i][j]) 
				t = vo[i][j];
			else if (vo[i] && vo[i][j]==0)
				t=0;
			else if (j==0 || j==this.data.cols-1 || i==0 || i==this.data.rows-1)
				t=1;
			else 
				t=2;
			switch (t) {
				case 90:
					
				break;
				case 1:
					if (i==0) {
						if (j==0)
							src='border-top-left';
						else if (j==this.data.cols-1)
							src='border-top-right';
						else
							src='border-top';
					}
					else if (i==this.data.rows-1) {
						if (j==0)
							src='border-bottom-left';
						else if (j==this.data.cols-1)
							src='border-bottom-right';
						else
							src='border-bottom';
					
					}
					else if (j==0) {
						src='border-left';
					}
					else  {
						src='border-right';
					}
				break;
				case 0: src='vacio';  break;
				case 2: src='board';  break;
				case 3: src='player';  break;
				case 4: src='wall-soft'; break;
				case 5: src='stone'; break;
				case 6: src='infotron'; break;
				case 7: src='diskr'; break;
				case 8: src='disko'; break;
				case 9: src='disky'; break;
				case 11: src='hardwall'; break;
						

				
			}
			id = 'cel_'+i.toString().padLeft(2,'0')+'_'+j.toString().padLeft(2,'0');
			oid = i*this.data.cols+j;
			switch(t) {
				case 1:
					c = new ISuppaCel({handler:this,owner:o,row:i,col:j,value:t,imageUrl:'suppaplex/'+src+'.png','id':id,'oid':oid});
					this.walls.push(c);
				break;
				case 2:
					c = new ISuppaBoard({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.boards.push(c);
				break;
				case 3:
					c = new ISuppaPlayer({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.player = c;
				break;
				case 4:
					c = new ISuppaWallSoft({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.walls.push(c);
				break;
				case 5:
					c = new ISuppaStone({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.stones.push(c);
				break;
				case 6:
					c = new ISuppaInfotron({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.infotrons.push(c);
				break;				
				case 7:
					c = new ISuppaDiskO({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.disks.push(c);
				break;
				case 8:
					c = new ISuppaDiskR({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.disks.push(c);
				break;
				case 9:
					c = new ISuppaDiskY({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.disks.push(c);
				break;

				case 11:
					c = new ISuppaHardWall({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.walls.push(c);
				break;
			}
			if (args.onmousedown) {
				if (c) {domHelper.mapToElement(c.element,{onmousedow:function(){
					return this_.onCellEdition(arguments[0],arguments[1])
				}})}
			}
			// reserved matrix
			switch(t) {
				case 0: // empty
					tr = 0;
					type=0;
				break;
				case 2: // board
					tr = 2;
					type=2;
				break;
				case 1: // border limits
					tr = -1; // unreservable cell
					type=1;
				break;
				case 3:
				case 5:
				case 8:
				case 6: // static reservation by movable object
					tr = 3;
					type=3;
				break;
				case 11:
				case 4: // static reservation by unmovable object (walls, tunels)
					tr = 4;
					type=4;
				break;
				case 7:
				case 9:
					tr = t;
					type=4;
				break;
			}
			if (t == 0)
				rb=0;
			else { 
				rb = ooid;
				c.ooid = ooid;
			}
			v.push(t);
			vrr.oid = c.oid;
			vrr.ntic = 0;
			vrr.dir = '';
			vrr.tmov = 0;
			vr.push([tr,0,rb, type, t]);
		}
		
		
		this.data.matriz.push(v);
		this.data.rmatriz.push(vrr);
		this.data.reservation.push(vr);
	}
	o.scrollTop=0;
	o.scrollLeft=0;
	this.sortObjects();
		
}

Suppaplex.prototype.editor = function editor(){
	this.resetAll();
}

Suppaplex.prototype.setPanelFocus = function setPanelFocus(n){
	if (this.mode =='EDIT') {
		var this_=this;
		var timer = setTimeout(function(){
			this_.setPanelFocus_();
		},100);
	}
	else {
		
	}
}

Suppaplex.prototype.setPanelFocus_ = function setPanelFocus_(n){
	if (this.mode == 'PLAY') {
	}
	else {
		this.getElement('edit_rows').focus();
	}
}

Suppaplex.prototype.setModePLAY = function setModePLAY(){
	this.data.scroll =[{n:0,nf:0,s:0},{n:0,s:0,nf:0}]; 
	var o;
	if (this.holes && this.holes.length)
	for(var i=this.holes.length-1; i>=0; --i) {
		o = this.holes.splice(i,1);
		o[0].destroy();
		delete o[0];
	}
	global.running=true;
		this.moving = {};
	this.sortObjects();
	this.newGame();
}

Suppaplex.prototype.setModeEDIT = function setModeEDIT(){
	global.running=false;
	if (this.timer)	this.timer=clearTimeout(this.timer)
		//this.releaseAll()
		if (!this.reseted) {
			this.holes=[];
			var o = this.getControl('body'), i, oid;
			for (var i=1; i<this.data.rows-2; ++i){
				for (var j=1; j<this.data.cols-2; ++j){
					if (this.data.matriz[i][j]==0) {
						id='cel_'+i.toString().padLeft(2,'0')+'_'+j.toString().padLeft(2,'0');
						oid = i*this.data.cols+j;
						 this.holes.push(new ISuppaHole({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid}));

					}
				}
			}
			return;
		}
		var aux=this.getElement('edit_rows'),
			args={};
		if (isNaN(aux.value)) {
			aux.value=10;
		}
		
		args.rows = +aux.value;
		aux=this.getElement('edit_cols');
		if (isNaN(aux.value)) aux.value=10;
		args.cols = +aux.value;
		args.onmousedow=true;
		this.makeScreen(args);
		this.reseted = false;
		
}

Suppaplex.prototype.setMode = function setMode(){
	return this['setMode'+this.mode]();
}

Suppaplex.prototype.onPanelClick = function onPanelClick(e,o,m){
	var aux;
	if (m && m.msg) {
		aux = m.msg.trim();
		switch(aux) {
			case 'LOAD':
				var level = this.getElement('play_level').value;
				if (isNaN(level)) {
					level = 1;
				}
				else 
					level = +level;
					this.releaseAll();
				switch(level) {
					case 1:
					case 2: 
						this.makeScreen(this.getLevel(level)); break;
				}
			break;
			case 'RESTART':
				this.releaseAll();
				if (this.savedScreen)
					this.makeScreen(this.savedScreen);
				else {
				
					this.makeScreen();
					alert('No hay pantalla pre grabada');
				}
			break;
			case 'ONSHAPE':
				if (this.lastShape) 
					this.lastShape.setAttribute('activated',1-this.lastShape.getAttribute('activated'));
				if (this.lastShape != o) {
					
					this.lastShape = o;
					this.lastShape.setAttribute('activated',1-this.lastShape.getAttribute('activated'));
				}
				
			break;
			case 'RUN':
				this.setMode();
			break;
			case 'CHANGEMODE':
				this.mode = this.modos[this.mode];
				this.getElement('mode').innerHTML = this.mode;
				this.element.setAttribute('mode',this.mode);
				this.setPanelFocus(0);
				this.setMode();
			break;
			case 'MODO':
				this.mode = this.modos[m.node.innerHTML.trim()];
				m.node.innerHTML = this.mode;
				this.element.setAttribute('mode',this.mode);
				
				this.setPanelFocus(0);
				this.setMode();
			break;
		}
	}
	return cancelEvent(e)
}

Suppaplex.prototype.makeShapesBar = function makeShapesBar(panel){
	var a,o,id,oid,c;
	var this_=this;
	a = {
		className: 'supa-shape-bar',
		id: panel.id+'_shape_bar',
		owner:panel
	}
	o = new ISgControlContainer(a);
	
	for (var i=0; i<12; ++i) {
		
			id = 'cel_'+'0'.toString().padLeft(2,'0')+'_'+i.toString().padLeft(2,'0');
			oid = i;
	
			switch(i) {
				case 0:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/hole.png','id':id,'oiod':oid});
				break;
				case 1:
					//c = new ISuppaCel({owner:o,row:0,col:i,value:i,imageUrl:'suppaplex/'+src+'.png','id':id,'oid':oid});
					
				break;
				case 2:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/board.png','id':id,'oiod':oid});
					
				break;
				case 3:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/player.png','id':id,'oiod':oid});
					
				break;
				case 4:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/softwall.png','id':id,'oiod':oid});
					
				break;
				case 5:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/stone.png','id':id,'oiod':oid});
					
				break;
				case 6:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/infotron.png','id':id,'oiod':oid});
					
				break;				
				case 7:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/disket_o.png','id':id,'oiod':oid});
					
				break;
				case 8:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/disket_r.png','id':id,'oiod':oid});
				break;
				case 9:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/disket_y.png','id':id,'oiod':oid});
					
				break;
				case 10:
					c=null;
				break;
				case 11:
					c = new ISuppaCel({handler:this,owner:o,row:0,col:i,imageUrl:'suppaplex/hardwall.png','id':id,'oiod':oid});
					
				break;
			}
			if (c) 
				domHelper.mapToElement(c.element,{activated: 0, value:i,onmousedown:function(){
					return this_.onPanelClick(arguments[0],arguments[1],{msg:'ONSHAPE'});
				}});
			// reserved matrix
		}
}

Suppaplex.prototype.makeBotoneraPlay = function makeBotoneraPlay(panel){
	var a, c;
	var this_ = this;	
	a = {
		className: 'supa-panel-commands',
		id: panel.id+'_commands',
		owner: panel
	}
	c = new ISgControlContainer(a);
	
	a = {
		className: 'suppa-command',
		id: panel.id+'_restart',
		innerHTML: 'RESTART',
		owner:c,
		handler:this,
		onmousedown:function(){
			return this_.onPanelClick(arguments[0],arguments[1],{msg:'RESTART'});
		}
	}
	new ISgControlContainer(a);
	
	a = {
		className: 'suppa-command',
		id: panel.id+'_load',
		innerHTML: 'LOAD',
		owner:c,
		handler:this,
		onmousedown:function(){
			return this_.onPanelClick(arguments[0],arguments[1],{msg:'LOAD'});
		}
	}
	c = new ISgControlContainer(a);
	
}

Suppaplex.prototype.makePanelPlay = function makePanelPlay(panel){
	var a, c;
	
	a = {
		className: 'supa-panel-control',
		id: panel.id+'Nivel',
		owner: panel
	}
	c = new ISgControlContainer(a);
	
	a = {
		className: 'supa-label',
		innerHTML: 'NIVEL',
		id: panel.id+'_NIVEL_label',
		owner: c
	}
	new ISgControlContainer(a);
	
	a = {
		value: 1,
		parentNode: c.element
	}
	var input = domHelper.createElement({tagName:'INPUT'},a);

	this.makeBotoneraPlay(panel)

}

Suppaplex.prototype.makePanelEdit = function makePanelEdit(panel){
	var a, c;
	
	a = {
		className: 'supa-panel-control',
		id: panel.id+'_FILAS',
		owner: panel
	}
	c = new ISgControlContainer(a);
	
	a = {
		className: 'supa-label',
		innerHTML: 'FILAS',
		id: panel.id+'_FILAS_label',
		owner: c
	}
	new ISgControlContainer(a);
	
	a = {
		value: 10,
		parentNode: c.element
	}
	var input = domHelper.createElement({tagName:'INPUT'},a);

	a = {
		className: 'supa-panel-control',
		id: panel.id+'_COLS',
		owner: panel
	}
	c = new ISgControlContainer(a);
	
	a = {
		className: 'supa-label',
		innerHTML: 'COLUMNAS',
		id: panel.id+'_COLS_label',
		owner: c
	}
	new ISgControlContainer(a);
	
	a = {
		value: 10,
		parentNode: c.element
	}
	var input = domHelper.createElement({tagName:'INPUT'},a);	
	this.makeShapesBar(panel);
}

Suppaplex.prototype.makePanel = function makePanel(){
	this.modos={PLAY:'EDIT', EDIT: 'PLAY'}
	var a, c;
	var this_=this;
	this.mode = 'PLAY';
	this.element.setAttribute('mode',this.mode);
	a = {
		className: 'supa-panel',
		id: this.id + '_panel',
		owner: this
	}
	this.panel = new ISgControlContainer(a);

		a = {
		className: 'supa-panel-control',
		id: this.id+'_panel_control',
		owner: this.panel
	}	
	var pc = new ISgControlContainer(a);	
	a = {
		className: 'supa-panel-control edit',
		id: this.id+'_panel_control_edit',
		owner: pc,
		innerHTML:'edit',
		onmousedown:function(){
			return this_.onPanelClick(arguments[0],arguments[1],{msg:'RUN'})
		}
	}	
	var pe = new ISgControlContainer(a);
	this.makePanelEdit(pe);
	a = {
		className: 'supa-panel-control play',
		id: this.id+'_panel_control_play',
		owner: pc,
		innerHTML:'play',
		onmousedown:function(){
			return this_.onPanelClick(arguments[0],arguments[1],{msg:'RUN'})
		}		
	}	
	var pe = new ISgControlContainer(a);
	this.makePanelPlay(pe);

	a = {
		//className: 'supa-label',
		//innerHTML: 'MODO'.padLeft(10,' '),
		onmousedown:function(){
			return this_.onPanelClick(
				arguments[0],
				arguments[1],
				{
					msg:arguments[1].children[0].innerHTML, 
					node: arguments[1].children[1]
				}
			);
		},
		className: 'supa-panel-modo',
		id: this.id+'_panel_modo',
		owner: this.panel
	}
	c = new ISgControlContainer(a);
	
	a = {
		className: 'supa-label',
		innerHTML: 'MODO'.padLeft(10,' '),
		id: this.id+'_panel_label_modo',
		owner: c
	}
	new ISgControlContainer(a);
	a = {
		className: 'supa-text',
		innerHTML: 'PLAY'.padLeft(10,' '),
		id: this.id+'_panel_text_modo',
		owner: c
	}
	new ISgControlContainer(a);	
	
		
	
	
}

Suppaplex.prototype.newGame = function newGame(){
	var game = arguments[0] || this.level;
	if (this.timer)
		this.timer = clearTimeout(this.timer);
	var this_=this;
	this.moving = {};
	this.onTimer = function() {
		this_.ntic++;
		if (this_.timer)
			this_.timer = clearTimeout(this_.timer);
		// stoped player (state == 0), start move when some direction key is active, and
		// space bar is not hold
		if((!global.running || !this_.player) && !global.stepDebugger) return;
		if (!this.player) {
			 console.log('El timer se para dado que no hay player')
			 return
		}
		if (this_.player.state == 0) {
			if (this_.controller.keys.space) {
				if (this_.controller.keys.right) {
					this_.farTouch([0,1]);
				}
				else if (this_.controller.keys.bottom) {
					this_.farTouch([1,0]);
				}
				else if (this_.controller.keys.left) {
					this_.farTouch([0,-1]);
				
				}
				else if (this_.controller.keys.top) {
					this_.farTouch([-1,0]);
				}
			}
			else if (this_.controller.keys.right) {
				this_.startMove([0,1],this_.player);
				this_.dscroll[1]=1;
				this_.dscroll[0]=0;
			}
			else if (this_.controller.keys.bottom) {
				this_.startMove([1,0],this_.player);
				this_.dscroll[1]=0;
				this_.dscroll[0]=1;
			}
			else if (this_.controller.keys.left) {
				this_.player.delta=[0,-1];
				this_.startMove([0,-1],this_.player);
				this_.dscroll[1]=-1;
				this_.dscroll[0]=0;
				//this_.scrollScreen([0,this_.dscroll[1]]);
			//	this_.scrollScreen([0,this_.dscroll[1]]);
			}
			else if (this_.controller.keys.top) {
				this_.startMove([-1,0],this_.player);
				this_.dscroll[1]=0;
				this_.dscroll[0]=-1;
			}
			// else {
				// if (this_.player.delta[0] || this_.player.delta[1]) {
					// this.data.matriz[this.player.row][this.player.col].setv({imageUrl:'suppaplex/player.png'});
					// this_.player.delta=[0,0]
				// }
			// }
		}
		else {
			this_.scrollScreen();
			var result = this_.player.keepMoving();
			
			if(result) {
				this_.scrollScreen();
				if (this_.dscroll[1]) {
					this_.data.scroll[1].s=0;
					this_.dscroll[1]=0;
				}
				else if (this_.dscroll[0]) {
					this_.data.scroll[0].s=0;
					this_.dscroll[0]=0;
				}
				this_.data.matriz[result[2]][result[3]]=3;
				this_.releaseReservation(this_.player,[result[0],result[1]]);
				if( this_.player.action.type=='explotion'){
					global.running=false;
					return;
				}
				if( this_.player.action.eating){
					var v;
					if (this_.player.action.eating==2)
						v = 'boards';
					else if (this_.player.action.eating==8)
						v = 'disks';
					else 
						v='infotrons';
					for(var i=0; i<this_[v].length; ++i) {
						if (this_[v][i].value!=this_.player.action.eating)
							continue;
						if (this_[v][i] && this_[v][i].row==result[2] && this_[v][i].col==result[3]) {
							this_[v][i].destroy()
							var oo=this_[v].splice(i,1);
							delete oo;
							if (v=='disks')
								this_.player.bombs++;
							else if (v=='boards')
								this_.player.infotrons++;
							break;
						}
					}
				}
				else {
					var toDelete=[];
					for(var i=0; i<this_.boards.length; ++i) {
						if (this_.boards[i] && this_.boards[i].row==result[2] && this_.boards[i].col==result[3]) {
							this_.boards[i].destroy();
							toDelete.push(i);
							delete this_.boards[i];
							break;
						}
					}
					toDelete=toDelete.sort();
					for (var i=toDelete.length-1; i>=0; --i) {
						oo = this.boards.splice(i,1);
						delete oo;
					}
				}
				this_.data.matriz[result[0]][result[1]]=0;
			}
		//	else
		}
		this_.moveObjects();
		
		this_.showData(0);
		if (global.running)
			this_.timer = setTimeout(function(){this_.onTimer()},this_.interval);
		//this.controller.keys.space=1;
	}
	this_.timer = setTimeout(function(){this_.onTimer()},this_.interval);
	//this.timer = setTimeout("onTimer()",100);
}

Suppaplex.prototype.releaseAll = function releaseAll(){
	this.reseted=true;
	var vt = ['boards','holes','stones','infotrons','explotions','walls','disks','player'],	
			t, o;
	for (var i=0; i<vt.length; ++i) {
		t = this[vt[i]];
		if (vt[i]=='player') t=[t];
		if (!t || !t.length)
			continue;
		for (var j=t.length-1; j>=0; --j) {
			if (!t || !t[j] || !t[j].destroy) {
				console.log('Se quiso destruir un objeto que no implemnta destroy: t['+j+']');
				console.log([t])
			}
			t[j].destroy();
			o=t.splice(j,1);
			delete o;
		}
		this[vt[i]]=null;
	}                                                            
	for (var i in this.moving){
		delete this.moving[i];
	}
	this.moving=null;
	
	for (var i=this.data.rows-1; i>=0; --i){
		for (var j=this.data.cols-1; j>=0; --j){
			delete this.data.reservation[i][j];
		}
		delete this.data.matriz[i];
		delete this.data.reservation[i];
	}
	this.data.matriz=null;
	this.data={};
	this.stones=[];
	this.explotions=[];
	this.infotrons=[];
	this.disks=[];
	this.boards=[];
	this.walls=[];
	
	
}

Suppaplex.prototype.initLevel = function initLevel(){
	this.data.matriz = [];
	this.data.rmatriz = [];
	this.data.reservation = [];
	// [scroll vert, scroll horiz]
	// n: cantidad de cuadros scrolleados (h o v), para compensar la posicion del player al centro de pantalla
	// nf: incremento que se está acumulando (hasta que culmine la secuencia de movimiento unitario), es + o -
	// s: cantidad de pasos en la secuencia del player, que se usará para indicar la cantidad de pasos
		// del scrolleo
	this.data.scroll = [{n:0,nf:0,s:0},{n:0,s:0,nf:0}]; 
	this.reservationTypes = [
		'reservable',
		'unservable',
		'reservable',
		'static reservation by movable object',
		'static reservation by unmovable object',
		'dynamic reservation by movable object',
	]
	var v, c, o, vo={}, vr, tr, n, type, id, oid, rb, ooidr, ooid;
	o=this.getControl('screen')
	
	this.data.cols = 40;
	this.data.rows = 18;
	this.data.sx = this.cols*32;
	this.data.sy = this.rows*32;
	
	for (var i=1; i<this.data.rows-1; ++i)
		vo[i]={};
	if (!arguments[0]) {	
		for (var i=1; i<this.data.rows-1; ++i) {
			for (var j=1; j<this.data.cols-1; ++j) {
				vo[i][j]=0;
			}
		}
	}	
	var n;
	for (var i=1; i<this.data.rows-1; ++i) {
		for (var j=1; j<this.data.cols-1; ++j) {
			n=Math.floor(Math.random(18)*18)+1
			switch(n) {
				case 1: n=0; break;
				case 3: n=0; break;
				case 4: n=6; break;
				case 7: n=0; break;
				case 8: n=5; break;
				case 9: n=2; break;
				case 10: n=0; break;
				case 12: n=5; break;
				case 13: n=6; break;
				case 14: n=6; break;
				case 15: n=0; break;
				case 16: n=0; break;
				case 17: n=0; break;
				case 18: n=0; break;
			}
			vo[i][j]=n;
		}
	}
	
		// for (var i=1; i<this.data.rows-1; ++i) {
			// for (var j=1; j<this.data.cols-1; ++j) {
				// vo[i][j]=0;
			// }
		// }
		// for (var i=1; i<6; ++i) {
			// vo[i][2]=5;
			// vo[i][4]=5;
		// }
		// vo[8][2]=11;
	vo[1][1]=3;
	for (var i=0; i<this.data.rows; ++i) {
		v=[];
		vr = [];
		vrr = {};
		ooidr = i.toString().padLeft(3,'0')+'_';
		for (var j=0; j<this.data.cols; ++j) {
			ooid = ooidr+j.toString().padLeft(3,'0');
			if (j==0 || j==this.data.cols-1 || i==0 || i==this.data.rows-1)
				t=1;
			else if (vo[i] && vo[i][j]) 
				t = vo[i][j];
			else if (vo[i] && vo[i][j]==0)
				t=0;
			else 
				t=2;
			switch (t) {
				case 90:
					
				break;
				case 1:
					if (i==0) {
						if (j==0)
							src='border-top-left';
						else if (j==this.data.cols-1)
							src='border-top-right';
						else
							src='border-top';
					}
					else if (i==this.data.rows-1) {
						if (j==0)
							src='border-bottom-left';
						else if (j==this.data.cols-1)
							src='border-bottom-right';
						else
							src='border-bottom';
					
					}
					else if (j==0) {
						src='border-left';
					}
					else  {
						src='border-right';
					}
				break;
				case 0: src='vacio';  break;
				case 2: src='board';  break;
				case 3: src='player';  break;
				case 4: src='wall-soft'; break;
				case 5: src='stone'; break;
				case 6: src='infotron'; break;
				case 7: src='diskr'; break;
				case 8: src='disko'; break;
				case 9: src='disky'; break;
				case 11: src='hardwall'; break;
						

				
			}
			id = 'cel_'+i.toString().padLeft(2,'0')+'_'+j.toString().padLeft(2,'0');
			oid = i*this.data.cols+j;
			switch(t) {
				case 1:
					c = new ISuppaCel({handler:this,owner:o,row:i,col:j,value:t,imageUrl:'suppaplex/'+src+'.png','id':id,'oid':oid});
					this.walls.push(c);
				break;
				case 2:
					c = new ISuppaBoard({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.boards.push(c);
				break;
				case 3:
					c = new ISuppaPlayer({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.player = c;
				break;
				case 4:
					c = new ISuppaWallSoft({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.walls.push(c);
				break;
				case 5:
					c = new ISuppaStone({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.stones.push(c);
				break;
				case 6:
					c = new ISuppaInfotron({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.infotrons.push(c);
				break;				
				case 7:
					c = new ISuppaDiskO({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.disks.push(c);
				break;
				case 8:
					c = new ISuppaDiskR({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.disks.push(c);
				break;
				case 9:
					c = new ISuppaDiskY({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.disks.push(c);
				break;

				case 11:
					c = new ISuppaHardWall({handler:this,owner:o,row:i,col:j,'id':id,'oiod':oid});
					this.walls.push(c);
				break;				
			}
			// reserved matrix
			switch(t) {
				case 0: // empty
					tr = 0;
					type=0;
				break;
				case 2: // board
					tr = 2;
					type=2;
				break;
				case 1: // border limits
					tr = -1; // unreservable cell
					type=1;
				break;
				case 3:
				case 5:
				case 8:
				case 6: // static reservation by movable object
					tr = 3;
					type=3;
				break;
				case 11:
				case 4: // static reservation by unmovable object (walls, tunels)
					tr = 4;
					type=4;
				break;
				case 7:
				case 9:
					tr = t;
					type=4;
				break;
			}
			if (t == 0)
				rb=0;
			else { 
				rb = ooid;
				c.ooid = ooid;
			}
			v.push(t);
			vrr.oid = c.oid;
			vrr.ntic = 0;
			vrr.dir = '';
			vrr.tmov = 0;
			vr.push([tr,0,rb, type, t]);
		}
		
		
		this.data.matriz.push(v);
		this.data.rmatriz.push(vrr);
		this.data.reservation.push(vr);
	}
	this.updateSize();
	this.scrollScreen();
	this.sortObjects();
	this.savedScreen = {
		'vo': vo,
		rows: this.data.rows,
		cols: this.data.cols
	}
	//this.showData(1);
}

Suppaplex.prototype.checkEndMove = function checkEndMove(o){
	var result=true;
	if (o.row<this.data.rows-2) {
		switch (this.data.matriz[o.row+1][o.col]) {
			case 3:
				if (this.player.state==0) {
					this.makeExplotion(this.player);
					result=false;
				}
				else {
					if (this.player.delta[0]==-1) {
						this.makeExplotion(this.player);
						result=false;
					}
						
				}
			break;
			case 9:
				if(o.value==9)
					result=false;
				break;;
			case 7:
			case 8:
				var b = this.getByCoord(o.row+1,o.col,'disks');
				if (b) {
					if (b[0].state==0)
						this.makeExplotion(b[0]);
				}
			break;
		}
	}
	return result;
}

	/*	variante de implementación del algoritmo de caída de 4 padas y medias
			-	Se consideran los siguientes estados, caracterizados como se especifica en cada caso:
					estático	- objeto.moving = 0
										- objeto.moving = 1 && objeto.state = 7
					dinámico	- objeto.moving = 1 && objeto.state = 0
										- objeto.moving = 1 && objeto.state > 0 && objeto.state < 7
										- objeto.moving = 2
		1.- primer pasada: se toman los objetos que se hallan en el vector de objetos en movimiento
					buscando a aquellos que alcanzaron el valor objeto.state = 7 
					se libera la reserva de la casilla de procedencia
					se actualiza la posicion en la matriz.
					si objeto.moving = 1 se lo saca del vector en movimiento y se asigna objeto.moving = 0
					si objeto.moving = 2 se toman más acciones
	  1.5- la media pasada consiste en un preordenamiento del vector de objetos que pueden caer
					segun sus coordenadas posicionales, desde el extremo inferior derecho, hasta el 
					extremo superior izquierdo, en orden ascendente.
		2.- segunda pasada: se recorre la lista de objetos que pueden caer, buscando a aquellos que
					se hallan en estado estático, donde además, se cumpla que en la posición inmediátamente
					por debajo de ellos, la casilla se encuentre vacía y libre de reservas.
					Con los objetos que cumplan estas condiciones, se realizan las siguientes acciones:
					- se los agrega al vector de objetos en movimiento,
					- se asigna objeto.moving = 1
					- se marca la reserva de la casilla inferior
		3.- tercera pasada: se recorre la lista de objetos que pueden caier, buscando a aquellos que
					hallen en estado estático, donde además, se cumpla que alguna casilla horizontal adeyacente
					y la casilla debajo de la adyacente, se encuentren ambas vacías y libres de reservas, primero
					analizando el flanco izquierdo y luego el derecho.
					Con los objetos que cumplan esas condiciones, se realizará lo siguiente:
					- se agregan al vector de objetos en movimiento
					- se asigna objeto.moving = 2
					- se marca la reserva de ambos casilleros libres haciá el flanco que corresponda
		4.- cuarta pasada: se recorre vector de objetos en movimiento, ejecutando para cada uno de ellos 
					- un paso más dentro de la secuencia de pasos del movimiento.
	*/
Suppaplex.prototype.moveObjects = function moveObjects(){
	var vo;
	vo = this.stones.concat(this.disks).concat(this.infotrons);
	vo=this.sortObjects(vo);
	var id;
	// pasada 2
	for (var i=0; i<vo.length; ++i) {
		if (!vo[i]) {
			continue;
		}
		if (vo[i].value == 8 || vo[i].value == 9) {
			continue;
		}
		if (vo[i].row<this.data.rows-1) {
			if (vo[i].moving == 0) {
				vo[i].stopped++;
				id = this.data.reservation[vo[i].row+1][vo[i].col][2];
				if (id != 0) {
					if (this.moving[id] && (this.moving[id].moving!=0 || this.moving.waiting)) {
						this.moving[vo[i].ooid]=vo[i] 
						vo[i].moving=1;
						vo[i].state=0;
						vo[i].wait=8-this.moving[id].state+this.moving[id].wait;
						vo[i].delta=[1,0];
						vo[i].waiting=true;
						this.startReservations(vo[i].delta,vo[i])
						continue;
					}
					if (this.moving[id] && this.moving[id].steps==this.moving[id].state+1) {
						id=0;
					}
				}
				if (id==0) {
						this.moving[vo[i].ooid]=vo[i] 
						vo[i].moving=1;
						vo[i].state=0;
						vo[i].delta=[1,0];
						this.startReservations(vo[i].delta,vo[i])
				}
			}
		}
	} 
	// 3er pasada
	for (var i=0; i<vo.length; ++i) {
		if (!vo[i]) {
			continue;
		}
		if (vo[i].row<this.data.rows-2) {
			if (vo[i].moving == 0) {
				var c = this.data.matriz[vo[i].row+1][vo[i].col] // below this
				if (vo[i].cells.sliceFall.below.indexOf(c) >= 0) {	// the object below this ademit slicing
					if (vo[i].col>1) {
						if (this.data.reservation[vo[i].row][vo[i].col-1][2]==0) {
							id = this.data.reservation[vo[i].row+1][vo[i].col-1][2];
							if (id!=0) {
								if (this.moving[id] && this.moving[id].moving==2 && this.moving[id].state==0) {
									id=0;
								}
							}
							if (id==0) {
								this.moving[vo[i].ooid]=vo[i];
								vo[i].moving=2;
								vo[i].dir='l';
								vo[i].state=0;
								vo[i].delta=[0,-1];
								this.startReservations(vo[i].delta,vo[i])
								this.startReservations([1,-1],vo[i])
								continue;
							}
						}
					}
					if (vo[i].col<this.data.cols-2){
						if (this.data.reservation[vo[i].row][vo[i].col+1][2]==0) {
							id = this.data.reservation[vo[i].row+1][vo[i].col+1][2];
							if (id != 0) {
								if (this.moving[id] && this.moving[id].moving==2 && this.moving[id].state==0) {
									id=0;
								}
							}	
							if (id==0) {
								this.moving[vo[i].ooid]=vo[i];
								vo[i].moving=2;
								vo[i].dir='r';
								vo[i].state=0;
								vo[i].delta=[0,1];
								this.startReservations(vo[i].delta,vo[i])
								this.startReservations([1,1],vo[i])
								continue;
							}
						}
					}
				}
			}
		}
	}
	var result=false;
	// 4ta pasada
	for (var i in this.moving) {
		if (this.moving[i].action.type=='disapair') {
			result = this.moving[i].keepBanish();
			if (result) {
				this.releaseReservation(this.moving[i],null);
				var n='';
				if (this.moving[i].value==2) 
					n='boards';
				else
					n='infotrons';
				if (n) {
					for (var nn=0; nn<this[n].length; ++nn) {
						if (this[n][nn].id == this.moving[i].id) {
							this[n][nn].destroy();
							var od = this[n].splice(nn,1);
							delete od;
							break;
						}
					}
				}									
				continue;
			}	
		}
		else
			result=this.moving[i].keepMoving();
		if(result) {
			this.releaseReservation(this.moving[i],[result[0],result[1]]);
			if (this.moving[i].moving==10 || this.moving[i]==88) {
				this.moving[i].moving=0;
				var n='';
				if (this.moving[i].value==3) {
					global.running = false;
				}
				else {
					switch (this.moving[i].value){
						case 2: n='boards'; break;
						case 5: n='stones'; break;
						case 6: n='infotrons'; break;
						case 7: 
						case 8: 
						case 9: n='disks'; break;
						case 10: n='explotions'; break;
					} 
					if (n) {
						for (var nn=0; nn<this[n].length; ++i) {
							if (this[n][nn].id == this.moving[i].id) {
								this[n][nn].destroy();
								var od = this[n].splice(nn,1);
								delete od;
							}
						}
					}					
					delete this.moving[i];
				}
			}			
			else if (this.moving[i].moving==2) {
				this.moving[i].moving--;
				this.moving[i].state=0;
        this.moving[i].delta=[1,0];
			}
			else if (this.moving[i].moving==88) {
				this[this.moving[i].name+'s'][nn].destroy();
				var od = this[n].splice(nn,1);
				delete od;
				delete this.moving[i]
			}
			else {
				if (this.checkEndMove(this.moving[i])) {
					this.moving[i].moving=0;
					delete this.moving[i]
				}
			}
		}
	}
}

Suppaplex.prototype.startMove = function startMove(delta,o){
	// object o, can move in delta ([dy,dx]) direction
	var result = this.isFree(delta,o);
	
	switch (result) {
		case 1:
		case 4:
		case 5:
		case 6:
			// free movement (on player can be left, right, up or down direction
			// stone or infotron can be only down direction)
			//o.setAction({type:1, direction:delta, steps: 8})
			o.steps=8; // normal amount of submovement for this action
			o.delta=delta;			// direction of movement ([ dy, dx])
			o.action.eating=result==4? 8 : result==5? 6 : result==6? 2 : 0;
			if (!o.action) o.action={};
			o.action.type = result;
			this.startReservations(delta,o)
			this.scrollScreen();
			o.move();
		break;
		default:
			if (result instanceof Array) {	// case of complex action
				switch(result[0]) {						// type of action
					case 2:			// object (stone or disket pushed by player)
						result[1].steps=16; // on pushed obect, amount of submovement for this action
						result[1].delta=delta; // direction of the pushed object movement
						if (!result[1].action) result[1].action={};
						result[1].action.type = 2;

						result[1].move()
						o.steps=16;	// on player, amount of submovemnts for this action
						o.delta=delta;	// on player, pushing motion direction
						this.scrollScreen();
						o.move();
						if (!o.action) o.action = {};
						o.action.eating = 0;
						o.action.type = 2;
						this.startReservations(delta,o)
						this.startReservations(delta,result[1])
						//result[1].state=0;
						
						result[1].moving=3;
						this.moving[result[1].ooid]=result[1];
					break;
					
					// special move, falling objects composed. (horizontal sliding vertical drop followed)
					// conditions: 
					// - two objects, one above the other
					// - the above is movable. (infotron or stone)
					// - the lower support sliding on then (infotron, stone or sliced wall)
					// - both are not moving
					// - adeyacents horizontal squares (left or right in this order priority), are empty and not reserved
					// motion action:
					// - the above object fall, first move in hozontal direction, and them in vertical direction
					case 3:	
						o.steps=8;
						o.delta = result[2];
						o.action.type = 3;
						o.action.eating = 0;
						this.startReservations(result[2],o)
						
						o.move();
									// 
					break;
				}
			}
		break;
	}
}

Suppaplex.prototype.farTouch = function farTouch(d) {
	if (d[1]) {
		if (d[1]==-1) {
			if (this.player.col>1) {
			}
			else return;
		}
		else {
			if (this.player.col<this.data.cols-2){
			}
			else return;
		}
	}
	else {
		if (d[0]==-1) {
			if (this.player.row>1) {
			}
			else return;
		}
		else {
			if (this.player.row<this.data.rows-2){
			}
			else return;
		}	
	}
	var value = this.data.matriz[this.player.row+d[0]][this.player.col+d[1]];
	if (value == 2 )
		var o = this.getByCoord(this.player.row+d[0],this.player.col+d[1],'boards');
	else if (value == 6)
		var o = this.getByCoord(this.player.row+d[0],this.player.col+d[1],'infotrons');
	if (o) {
		o[0].action.type = 'disapair',
		o[0].state=0;
		o[0].steps=8;
		this.moving[o[0].ooid] = o[0];
	}
	
}
Suppaplex.prototype.isFree = function isFree(delta,o){
	try {
		var cc,c = this.data.matriz[o.row+delta[0]][o.col+delta[1]];
		var cr = this.data.reservation[o.row+delta[0]][o.col+delta[1]];
		var oc=this.getByCoord(o.row+delta[0],o.col+delta[1]);
		if(!oc) {
			if (o.row+delta[0]>1) {
				oc=this.getByCoord(o.row+delta[0]-1,o.col+delta[1]);
				if (oc && oc[0].moving==1) {
					this.makeExplotion(oc[0])
				}
			}
		}
		
		for (var i=0; i<o.cells.freeMov.length; ++i) {
			if (o.cells.freeMov[i] == c) {
				if (c==8) // red disk
					return 4;	// free moving esting
				else if (c==6) // infotron
					return 5;	// free moving esting
				else if (c==2) // infotron
					return 6;	// free moving board
				else 
					return 1;	// free moving
			}
			else if (cr[5] == 4 && cr[6]==1) // reserva statica
				return 1;
		}
		if (o.value == 3) {	//   (player pushing obects [stones, diskets])
			var objs = this.stones.concat(this.disks);
			if (delta[1]) {		//  horizontal moving
				for (var i=0; i<o.cells.pushing.length; ++i) {  // array conditions of the objects pushables by player
					if (c == o.cells.pushing[i].obj) {		// if the object is pushable by player
						cc = this.data.matriz[o.row+delta[0]][o.col+2*delta[1]];  // next square content after object position in delta direction
						for (var j=0; j<o.cells.pushing[i].freeMov.length; ++j)		// array conditions on next square content in the delta direction
							if (o.cells.pushing[i].freeMov[j] == cc) {	// the next square content accept the movement of the obect within
								for (var k=0; k<objs.length; ++k) { // iteration on stones array
									if (objs[k] && objs[k].row==o.row+delta[0] 
														&& objs[k].col==o.col+delta[1]) {  // if the stone in adyacent square in the del direction
										if (objs[k].state==0) {	// if the stop not moving
											//this.stones[k]
											return [2,objs[k]];	
												// 2 --> player can move, movement is pushing type
												// this.stones[k]  --> stone that is pushing by player
										}
										
									}
								}
							}
					}
				}
			}
			else if (delta[0]) {
				for (var i=0; i<o.cells.pushing.length; ++i) {  // array conditions of the objects pushables by player
					if(c!=9) continue;
					if (c == o.cells.pushing[i].obj) {		// if the object is pushable by player
						cc = this.data.matriz[o.row+2*delta[0]][o.col+delta[1]];  // next square content after object position in delta direction
						for (var j=0; j<o.cells.pushing[i].freeMov.length; ++j)		// array conditions on next square content in the delta direction
							if (o.cells.pushing[i].freeMov[j] == cc) {	// the next square content accept the movement of the obect within
								for (var k=0; k<objs.length; ++k) { // iteration on stones array
									if (objs[k] && objs[k].row==o.row+delta[0] 
														&& objs[k].col==o.col+delta[1]) {  // if the stone in adyacent square in the del direction
										if (objs[k].state==0) {	// if the stop not moving
											//this.stones[k]
											return [2,objs[k]];	
												// 2 --> player can move, movement is pushing type
												// this.stones[k]  --> stone that is pushing by player
										}
										
									}
								}
							}
					}
				}			
			}
		}
		else if (o.value == 5 || o.value == 6) {	//  movable obect (stones or  infotrons)
			// 1.- if the object is not moving
			if (o.action.type == 0) {
				if (o.row<this.data.rows-2) {
					var c = this.data.matriz[o.row+1][o.col] // below this
					if (o.cells.sliceFall.below.indexOf(c) >= 0) {	// the object below this ademit slicing
						if (o.col>1 
								&& this.data.reservation[o.row][o.col-1][1] == 0 && (this.data.reservation[o.row+1][o.col-1][3] == 0 || this.data.reservation[o.row+1][o.col-1][1] == 'd')) {
							// left slicefall 
							return [3,o,[0,-1]];
						}
						else if (o.col < this.data.cols-2) {
								var reservaMovil = this.data.reservation[o.row+1][o.col+1][1];
								if (this.data.reservation[o.row][o.col+1][0] == 0 
										&& (this.data.reservation[o.row+1][o.col+1][0] == 0 
											|| ('rd'.indexOf(reservaMovil)>=0 && this.data.reservation[o.row+1][o.col+1]-this.ntic>=4))){// reservaMovil=='de')) {
									return [3,o,[0,1]];
								}
								var reservaMovil = this.data.reservation[o.row][o.col+1][1];
								if ((this.data.reservation[o.row][o.col+1][0] == 0 || 
									('r'.indexOf(reservaMovil)>=0 && this.data.reservation[o.row][o.col+1][1]-this.ntic>=4) )
										&& this.data.reservation[o.row+1][o.col+1][0] == 0){
									return [3,o,[0,1]];
								}
							// right slicefall
						}
					}
					//if (
				}
			}
			
		}
		return false;
	}
	catch (e) {
		return false;
	}
}

Suppaplex.prototype.releaseReservation = function releaseReservation(o,delta){
	if (delta==null) {	// para banish en el lugar
		this.data.reservation[o.row][o.col][2] = 0;
		this.data.matriz[o.row][o.col] = 0;
	}
	else {
		this.data.reservation[o.row][o.col][2] = o.ooid;
		this.data.matriz[o.row][o.col] = o.value;
		if (this.data.reservation[delta[0]][delta[1]][2] == o.ooid)
			this.data.reservation[delta[0]][delta[1]][2] = 0;
		this.data.matriz[delta[0]][delta[1]] = 0;
	}
	return ;
	this.data.reservation[o.row][o.col][4] = o.value;
	//this.data.reservation[o.row][o.col][3] = 3;
	this.data.reservation[o.row][o.col][3] = 0;
	this.data.reservation[o.row][o.col][0] = 3;
	this.data.reservation[o.row][o.col][5] = 0;
	this.data.reservation[o.row][o.col][6] = 0;
	if(o.name != 'player' && o.action.type==2) {
		o.action.type = 0;
		if (!global.running)
			this.showData(0);
		
		return;
	}
	if (o.action && o.action.type == 3) {
		o.action.type = 1
		o.delta=[1,0];
	}
	else {
		if (o.action.type==1) {
			if (o.row<this.data.rows-2) {
				if (this.data.reservation[o.row+1][o.col][0]==0) {
					this.data.reservation[o.row+1][o.col][0] = 3;
					this.data.reservation[o.row+1][o.col][1] = 'd';
					this.data.reservation[o.row+1][o.col][3] = this.ntic;
					this.data.reservation[o.row+1][o.col][2] = o.id;
				}
			}
		}
		o.action.type = 0;
	}
	if (this.data.reservation[delta[0]][delta[1]][2] == o.id){
		this.data.reservation[delta[0]][delta[1]][2] = 'empty'.padLeft(9);
		this.data.reservation[delta[0]][delta[1]][0] = 0;
	}
	this.data.reservation[delta[0]][delta[1]][3] = 0;
	this.data.reservation[delta[0]][delta[1]][4] = 0;
	this.data.reservation[delta[0]][delta[1]][5] = 4;
	this.data.reservation[delta[0]][delta[1]][6] = 1;
	this.data.reservation[delta[0]][delta[1]][1] = 0;		// quita marca de direccion
	
	if (!global.running)
		this.showData(0);
}

Suppaplex.prototype.makeExplotion = function makeExplotion(oo){
	// obtengo los objetos a reventar.
	console.log(oo);
	var r=oo.row, c=oo.col;
	var i0=r-1, i1=r+1, j0=c-1, j1=c+1, ooid, o;
	if (r==1) i0=r;
	else if (r==this.data.rows-2) i1=r;
	if (c==1) j0=c;
	else if (c==this.data.cols-2)	j1=c;
	
	for (var i=i0; i<=i1; ++i) {
		for (var j=j0; j<=j1; ++j) {
			ooid = this.data.reservation[i][j][2];
			o = this.getByCoord(i,j);
			if (!ooid)
				o = this.getByOoid(ooid);
			// else 
			if (o) {
				o[0].action.type = 'explotion';
				o[0].steps=8;
				o[0].state=0;
				if (o[0].moving && this.moving[o[0].ooid]) {
					o[0].moving=10;
				}else{
					o[0].moving=10;
					this.moving[o[0].ooid]=o[0];
				}
				
			}
			else {
				
				var id = 'cel_'+i.toString().padLeft(2,'0')+'_'+j.toString().padLeft(2,'0');
				var oid = i*this.data.cols+j;
				ooid=i.toString().padLeft(3,'0')+'_'+j.toString().padLeft(3,'0');
				c = new ISuppaExplotion({owner:this.getControl('screen'),row:i,col:j,'id':id,'oiod':oid,'ooid':ooid});
				c.action = {type: 'explotion'};
				c.steps=8;
				c.state=0;
				c.moving=10;
				this.moving[c.ooid] = c;
				this.data.reservation[c.row][c.col][2]=ooid;
				this.explotions.push(c);
				
			}
		}
	}

}

Suppaplex.prototype.startReservations = function startReservations(delta,o){
	if (o.value==3) { // player
		var ooid = this.data.reservation[o.row+delta[0]][o.col+delta[1]][2];
		var oid = this.getByOoid(ooid);
		if (oid) {
			switch (oid[0].value) {
				case 0:
				case 2:
					break;
				default:
					if (oid[0].state==0 || oid[0].moving==0)
						break;
					this.makeExplotion(o);
				break;
			}
		}
	}
	this.data.reservation[o.row+delta[0]][o.col+delta[1]][2] = o.ooid;
	return;
	this.data.reservation[o.row+delta[0]][o.col+delta[1]][2] = o.id;
	var dir;
	if (delta[0]) {
		if (delta[0][0])
			dir='u';
		else dir='d';
	}
	else if (delta[1][0]) dir='l'
	else dir='r'
	this.data.reservation[o.row][o.col][1] = dir;
	this.data.reservation[o.row][o.col][3] = this.ntic;
	this.data.reservation[o.row+delta[0]][o.col+delta[1]][5] = 4;
	this.data.reservation[o.row+delta[0]][o.col+delta[1]][5] = 4;
	if(delta[0]==1) {
		this.data.reservation[o.row][o.col][6] = delta[0];
	}
	else
		this.data.reservation[o.row+delta[0]][o.col+delta[1]][6] = delta[0];
	
	if (o.action.type==3) {
		this.data.reservation[o.row+delta[0]+1][o.col+delta[1]][7] = o.indexCoord;
		this.data.reservation[o.row+delta[0]+1][o.col+delta[1]][1] = 3;
		this.data.reservation[o.row+delta[0]+1][o.col+delta[1]][2] = o.id;
		this.data.reservation[o.row+delta[0]+1][o.col+delta[1]][0] = 3;
//		this.data.reservation[o.row+delta[0]+1][o.col+delta[1]][3] = 4;
		this.data.reservation[o.row+delta[0]+1][o.col+delta[1]][5] = 4;
		this.data.reservation[o.row+delta[0]+1][o.col+delta[1]][4] = 1;
		
	}
		
	this.data.reservation[o.row+delta[0]][o.col+delta[1]][3] = this.ntic;//5;
	this.data.reservation[o.row+delta[0]][o.col+delta[1]][0] = 5;
	this.data.reservation[o.row+delta[0]][o.col+delta[1]][4] = this.data.matriz[o.row][o.col];
	
	if (!global.running)
		this.showData(0);
	
}

Suppaplex.prototype.getControl = function getElement(k,o){
	switch(k){
		case 'debug':
			return this.controls[this.id+'_dbg'];
		case 'screen':
			return this.controls[this.id+'_content'];
		break;
		case 'body':
			return this.controls[this.id+'_content'];
		break;
	}
	return Suppaplex.prototype.base.getControl.call(this,k,o);
}

Suppaplex.prototype.getElement = function getElement(k,o){
	switch(k){
		case 'body':return this.controls[this.id+'_content'].element;
		break;
		case 'play_level':	
			return document.getElementById(this.id+'_panel_control_playNivel').getElementsByTagName('INPUT')[0];
		break;
		case 'edit_cols':	
			return document.getElementById(this.id+'_panel_control_edit_COLS').getElementsByTagName('INPUT')[0];
		break;
		case 'edit_rows':	
			return document.getElementById(this.id+'_panel_control_edit_FILAS').getElementsByTagName('INPUT')[0];
		break;
		case 'mode':
			return document.getElementById(this.id+'_panel_text_modo');
		break;
	}
	return Suppaplex.prototype.base.getElement.call(this,k,o);
}

Suppaplex.prototype.setContent = function setContent(content,replace){
	var body = this.getElement('body');
	if (replace) body.innerHTML='';
	
	if (typeof(content)=='string')
		body.innerHTML+=content;
	else if (content instanceof HTMLElement)
		body.appendChild(content);
	else
		body.innerHTML+=domHelper.fromObject(content);
	
}

Suppaplex.prototype.initHead = function initHead(){
}	

Suppaplex.prototype.initNumbers = function initNumbers(){
	var a;
	var romansNumbers = ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
	var owner;
	
	a = {
		id: this.id+'_numbers-container',
			className:'suppaplex-number-container',
			'owner': this.getControl('suppaplex-container')
	}
	owner= new ISgControlContainer(a);
	this.controls[a.id]=owner;
	
	
	for (var i=12; i>0; --i) {
		a={
			id:this.id+'_numbers_'+i,
			className:'suppaplex-number',
			'owner': owner,
			innerHTML:romansNumbers[i],
			type:i
		}
		this.controls[a.id]= new ISgControlContainer(a);
	}
}

Suppaplex.prototype.setTime = function setTime(t,hh,mm,ss){
	if (typeof(hh) == 'undefined') {
		if (!t) t=new Date();
		
		ss=t.getSeconds(),
		mm=t.getMinutes(),
		hh=t.getHours();
	}
	
	m=this.getControl('suppaplex-minute'),
	s=this.getControl('suppaplex-second'),
	h=this.getControl('suppaplex-hour');

	if(!this.active) {
		this.active=1;
		s.toogle(m.element,'active');
		m.toogle(m.element,'active');
		h.toogle(m.element,'active');
	}

	mm=mm-30;
	if(mm<0) mm+60;
	var r=mm*6;
	m.element.style['-webkit-transform']='rotateZ('+r+'deg)';
	hh=hh-6;
	if(hh<0) hh+24;
	var r=hh*30;
	h.element.style['-webkit-transform']='rotateZ('+r+'deg)';
	ss=ss-30;
	if(ss<0) ss+60;
	var r=ss*6;
	s.element.style['-webkit-transform']='rotateZ('+r+'deg)';
	//m.element.setttriclassName=domHelper.mergeClassNaame(m.element.className,'')
}

Suppaplex.prototype.destroy = function destroy(){
	if (this.likeGadget) {
		if (this.element.parentNode==this.owner.element)
			return;
	}
	sgApp.unregisterReference(this);
	SgObject.prototype.destroy.call(this);
}

Suppaplex.prototype.toGadget = function toGadget(e,o){
	var c;
	this.setTime();
	if (!this.likeGadget) {
		this.likeGadget=true;
		c = this.getControl('suppaplex-container');
		
		document.body.appendChild(c.element.parentNode.re3Child(c.element));
		this.element.style.opcity=0;
	}
	else {
		c = this.getControl('suppaplex-container');
		d = this.getControl('body');
		
		this.element.style.opcity=1;
		//this.owner.sendMessage()
		this.likeGadget=false;
		d.element.appendChild(document.body.removeChild(c.element));
	}

}

Suppaplex.prototype.initBody = function initBody(){
	
	this.makePanel();
	var a = {
		id : this.id+'_content',
		className: 'body-content',
		owner:this
	}
	var c=new ISgControlContainer(a);
	this.controls[a.id] = c
	
	var a = {
		id : this.id+'_suppaplex',
		className:'suppaplex',
		owner: c
	}
	
	this.newGame();
	
}

Suppaplex.prototype.showData = function showData(type){
	return;
	if (!global.debug)
		return;
	var c = this.getControl('debug');
	var s, ss='', replace=true, inlineStyle='';
	if (!type) type = 0;
	var colors=['white','white','black','white','white','black'	]
	var bcolors=['#111','#333','#0a0','red','#876','#444'	]
	switch (type) {
		case 0:
			for (var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					s = this.data.matriz[i][j].toString().padLeft(2);
					inlineStyle='style="background-color:'+bcolors[this.data.matriz[i][j]]+';color:'+colors[this.data.matriz[i][j]]+'"';
					ss += '<div class="expansible-info pseudo-float-left" '+inlineStyle+'>'+s+'</div>';
//					ss += s;
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">Matrix</span>' + ss;
	//	div.innerHTML = 'Matrix<br />' + ss;
		ss = div;
		break;
		case 1: // reservations matrix
			replace = false;
			var title = '';
			for (var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					s = this.data.reservation[i][j][0].toString().padLeft(2); // reservation state
					title = 'type: ' +this.reservationTypes[this.data.reservation[i][j][3]]+ '\r\nname: '+this.data.reservation[i][j][2]+'\r\n'+'id: '+this.data.reservation[i][j][1];
					title+='\r\n'
					inlineStyle='style="background-color:'+bcolors[this.data.reservation[i][j][4]]+';color:'+'white'+'"';
					ss += '<div '+inlineStyle+'class="expansible-info pseudo-float-left" title="'+title+'">'+s+'</div>';
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">Reservations</span>' + ss;
		ss = div;
		break;
		
		
		case 10: // reservations matrix
			replace = false;
			var title = '';
			for (var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					s = this.data.reservation[i][j][0].toString().padLeft(2); // reservation state
					title = 'type: ' +this.reservationTypes[this.data.reservation[i][j][3]]+ '\r\nname: '+this.data.reservation[i][j][2]+'\r\n'+'id: '+this.data.reservation[i][j][1];
					title+='\r\n'
					inlineStyle='style="background-color:'+bcolors[this.data.reservation[i][j][4]]+';color:'+'white'+'"';
					ss += '<div '+inlineStyle+'class="expansible-info pseudo-float-left" title="'+title+'">'+s+'</div>';
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">Reservations</span>' + ss;
		ss = div;
		break;
		case 2:
			replace = false;
			for
			(var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					
					s = this.data.reservation[i][j][2].toString().padLeft(7); // reservation state
					inlineStyle='style="background-color:'+bcolors[this.data.reservation[i][j][4]]+';color:'+'white'+'"';
					ss += '<div '+inlineStyle+'class="expansible-info pseudo-float-left" title="'+title+'">'+s+'</div>';
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">reser by</span>' + ss;
		ss = div;
		break;
		case 3:
			replace = false;
			for
			(var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					if (!this.data.reservation[i][j][2]) this.data.reservation[i][j][2]=0;
					s = this.data.reservation[i][j][2].toString().padLeft(2); // reservation state
					inlineStyle='style="background-color:'+bcolors[this.data.reservation[i][j][3]]+';color:'+'black'+'"';
					ss += '<div '+inlineStyle+'class="expansible-info pseudo-float-left" title="'+title+'">'+s+'</div>';
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">rtype</span>' + ss;
		ss = div;
		break;
		case 4:
			replace = false;
			for
			(var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					if (!this.data.reservation[i][j][3]) this.data.reservation[i][j][4]=0;
					s = this.data.reservation[i][j][3].toString().padLeft(2); // reservation state
					inlineStyle='style="background-color:'+bcolors[this.data.reservation[i][j][3]]+';color:'+'white'+'"';
					ss += '<div '+inlineStyle+'class="expansible-info pseudo-float-left" title="'+title+'">'+s+'</div>';
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">tic reservation ('+this.ntic+')</span>' + ss;
		ss = div;
		break;
		case 5:
			replace = false;
			for
			(var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					if (!this.data.reservation[i][j][5]) this.data.reservation[i][j][5]=0;
					s = this.data.reservation[i][j][5].toString().padLeft(2); // reservation state
					inlineStyle='style="background-color:'+bcolors[this.data.reservation[i][j][4]]+';color:'+'white'+'"';
					ss += '<div '+inlineStyle+'class="expansible-info pseudo-float-left" title="'+title+'">'+s+'</div>';
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">t5</span>' + ss;
		ss = div;
		break;
		case 6:
			replace = false;
			for
			(var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					if (!this.data.reservation[i][j][7]) this.data.reservation[i][j][7]=0;
					s = this.data.reservation[i][j][7].toString().padLeft(2); // reservation state
					inlineStyle='style="background-color:'+bcolors[this.data.reservation[i][j][4]]+';color:'+'white'+'"';
					ss += '<div '+inlineStyle+'class="expansible-info pseudo-float-left" title="'+title+'">'+s+'</div>';
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">dir</span>' + ss;
		ss = div;
		break;
		case 7:
			replace = false;
			for
			(var i=0; i<this.data.rows; ++i) {
				for (var j=0; j<this.data.cols; ++j) {
					if (!this.data.reservation[i][j][7]) this.data.reservation[i][j][7]=0;
					s = this.data.reservation[i][j][7].toString().padLeft(2); // reservation state
					inlineStyle='style="background-color:'+bcolors[this.data.reservation[i][j][4]]+';color:'+'white'+'"';
					ss += '<div '+inlineStyle+'class="expansible-info pseudo-float-left" title="'+title+'">'+s+'</div>';
				}
				ss += '<br />';
			}
		var div = domHelper.div({className:'float-left border-top-right', 'margin':'2px'})
		div.innerHTML = '<span style="border-left:solid 1px black; border-bottom:solid 1px black; display:block; color: red">owner</span>' + ss;
		ss = div;
		break;

	}
	
	output.setContent(ss,replace);	
	switch(type) {
		case 0:this.showData(1); break;
		case 1:this.showData(2); break;
		case 2:this.showData(3); break;
		case 3:this.showData(4); break;
		case 4:this.showData(5); break;
		case 5:this.showData(6); break;
		case 6:this.showData(7); break;
	}
	
}

Suppaplex.prototype.initControls = function initControls(){
	var d = domHelper.div({innerHTML:'hola'});
	var args={controlParams:{body:{controlMenu1:d.innerHTML,menu1:false,menu2:false}}};
	args.className = domHelper.mergeClassName(args.className, 'window');

	Suppaplex.prototype.base.initControls.call (this,args);

	this.initHead();
	this.initBody();

	
	this.player = {
		state:0,
		direction:'r',
		moving:0,
		delta:[0,0]
	}
	this.initLevel();
	
	return;
}

Suppaplex.prototype.sortObjects = function sortObjects(v){
	this.sortedObjects = [];
	if (v) {
		for (var i=0; i<v.length; ++i) {
			if (!v[i]) continue;
			v[i].updateIndex(this.data.cols);
		}	
		return v.sort(ISuppaCel.prototype.sort);
	}
	for (var i=0; i<this.stones.length; ++i) {
		this.stones[i].updateIndex(this.data.cols);
		//this.sortedObjects.push({name:'stone',indexCoord:this.stones[i].indexCoord,index:i});
	}	
	this.stones = this.stones.sort(ISuppaCel.prototype.sort);
	for (var i=0; i<this.infotrons.length; ++i) {
		this.infotrons[i].updateIndex(this.data.cols);
		//this.sortedObjects.push({name:'stone',indexCoord:this.infotrons[i].indexCoord,index:i});
	}	
	this.infotrons = this.infotrons.sort(ISuppaCel.prototype.sort);
	for (var i=0; i<this.disks.length; ++i) {
		this.disks[i].updateIndex(this.data.cols);
		//this.sortedObjects.push({name:'stone',indexCoord:this.disks[i].indexCoord,index:i});
	}	
	this.disks = this.disks.sort(ISuppaCel.prototype.sort);
	//this.sortedObjects = this.sortedObjects.sort(ISuppaCel.prototype.sort);
}

Suppaplex.prototype.getByOoid = function getByOoid(ooid,t){
	if (!t) {
		vt=['disks','stones','infotrons','boards','explotions'];
	}
	else if (!(vt instanceof Array))
		vt=[t];
	else vt=t;
	for (var j=0; j<vt.length; ++j) {
		t=vt[j];
		for (var i=0; i<this[t].length; ++i) {
			if (this[t][i].ooid == ooid)
				return [this[t][i], i, t]
		}
	}
	return null;	
}

Suppaplex.prototype.getByCoord = function getByCoord(r,c,t){
	if (!t) {
		vt=['disks','stones','infotrons','boards','player','explotions'];
	}
	else vt=[t];
	for (var j=0; j<vt.length; ++j) {
		t=vt[j];
		if(t=='player')
			if (this[t].row==r && this[t].col==c)
				return [this[t], -1, t];
			
		for (var i=0; i<this[t].length; ++i) {
			if (this[t][i].row==r && this[t][i].col==c)
				return [this[t][i], i, t]
		}
	}
	return null;
}

Suppaplex.prototype.init = function init(){
	
	var args = arguments[0] ? arguments[0] : {}
			this_=this;
		args.lastShape = null;
	// args.onclick=function(){
		// this_.toGadget(arguments[0],arguments[1])
		// }
	this.oidNulo = '      0';
	args.active=0;
	args.level=1;
	args.data={};
	args.stones=[];
	args.explotions=[];
	args.infotrons=[];
	args.disks=[];
	args.boards=[];
	args.walls=[];
	args.interval=25;
	args.ntic = 0;
	args.data.scroll =[{n:0,nf:0,s:0},{n:0,s:0,nf:0}]; 
	args.className = domHelper.mergeClassName(args.className,'suppaplex');
	this.dscroll=[0,0];
	Suppaplex.prototype.base.init.call(this,args);


	this.updateSize();
}

Suppaplex.prototype.getLevel = function getLevel(l){
	var vo = {};
	if (!l) l=1;
	switch (l) {
		case 1:
			this.data.rows=16;
			this.data.cols=12;
		break;
	}
	for (var i=1; i<this.data.rows-1; ++i)
		vo[i]={};
		
	for (var i=1; i<this.data.rows-1; ++i) {
		for (var j=1; j<this.data.cols-2; ++j) {
			vo[i][j]=0;
		}
	}	
	
	switch(l) {
		case 1:
			for (var i=1; i<11; ++i) {
				if (i==3)
					continue;
				vo[5][i]=11;
			}
			for (var i=6; i<15; ++i) {
				vo[i][10]=11;
			}
			vo[6][5]=9;vo[7][4]=vo[7][6]=vo[7][7]=11;vo[8][3]=vo[8][4]=vo[8][7]=vo[8][9]=11;
			vo[6][1]=vo[6][2]=vo[7][1]=11;vo[9][2]=vo[9][5]=vo[9][8]=9;vo[10][1]=3;
			vo[10][3]=vo[10][6]=vo[10][7]=11;vo[11][1]=vo[11][3]=vo[11][4]=vo[11][6]=vo[11][7]=vo[11][9]=11;
			vo[12][2]=vo[12][5]=9;vo[13][6]=vo[13][9]=vo[12][9]=11;vo[14][3]=vo[14][6]=vo[14][7]=vo[14][8]=vo[14][9]=11;
		break;
	}
	return {rows:this.data.rows, cols:this.data.cols, 'vo':vo};
}
function ISuppaplex(){
	this.init(arguments[0]);
	sgApp.registerReference(this);
}

classHelper.register(Suppaplex,ISuppaplex);
