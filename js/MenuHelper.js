var MenuHelper = (function(){
	
	var instance = null;
	
	SgMenuHelper.prototype.toLeftMenu = function toLeftMenu(menus) {
		var options={};
		if (menus instanceof Array) {
			for (var i=0; i<menus.length; ++i) {
				options['Menu_'+i]=menus[i] ? menus[i] : 'Menu_'+i+'<br />Debe definir las opciones para este menú';
				return this.toLeftMenu_(options);
				
			}
		}
		else
			return this.toLeftMenu_(menus);
	}
	SgMenuHelper.prototype.toLeftMenu_ = function toLeftMenu_(menus) {
		var div;
		div=domHelper.div();
		for (var i in menus) {
			if (menus[i] && menus[i] instanceof HTMLElement)
				div.appendChild(menus[i]);
			else if (typeof(menus[i]) == 'undefined') 
				div.innerHTML='undefined';
			else if (menus[i] instanceof String || typeof(menus[i])=='string')
				div.innerHTML=menus[i];
			else
				div.innerHTML=menus[i];
		}
			div.setAttribute('tooltip',i);
		var menu=toogleHelper.putInToogle(div);
		var tooltip='';
		for (var i=0; i<menu.children.length; ++i) {
			if (menus[i] && menus[i].toogle && menus[i].toogle.attribute)
				tooltip=menus[i].toogle.attribute;
			else 
				tooltip='Menu_'+i;
			menu.children[i].setAttribute('tooltip',tooltip);
		}
		return menu;
	}
	SgMenuHelper.prototype.toMenu = function toMenu(menus,menuType) {
		if (!menuType) menuType = 'left';
		var s;
		switch(menuType) {
			case 'left': d = this.toLeftMenu(menus);
			break;
		}
		var div = document.getElementById('menuleft');
		if (!div) {
			div = domHelper.div();
			div.id="menuleft";
		}
		div.appendChild(d);
		
		//document.body.appendChild(div)
		return d;
	}
	
	
	
	function SgMenuHelper(){
		
	}
	
	
	return instance ? instance : instance = new SgMenuHelper()
	
})()