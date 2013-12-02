/* Extension de prototipos predefinidos del lenguaje */

/* String.prototype*/

/** transforma la cadena ..-[a-z].. a la forma ..[A-Z]..
  por ejemplo, convierte los nombres de las propiedades css, declaradas en una hoja de estilos
	a su correspondiente nombre de propiedad usado en js
		border-top-color --> borderTopColor */
String.prototype.toCamelCase = function toCamelCase() {
	return this.toLowerCase().replace(/(\-[a-zA-Z])/g, function($1) {
        return $1.toUpperCase().replace('-','');
    })
}

/** transforma la cadena ..[A-Z].. a la forma ..-[a-z]..
  por ejemplo, convierte los nombres de las propiedades css, desde el nombre usado como estilo 
	en javascript, al nombre de la propiedad en la hoja de estilos
		borderTopColor --> border-top-color */
String.prototype.fromCamelCase = function fromCamelCase() {
	return this.replace(/([A-Z])/g, function($1) {
        return '-'+$1.toLowerCase();
    })
}

/** remueve a ambos lados de la cadena, las ocurrencias consecutivas, a partir de los extremos,
	de los caracteres blancos, en caso de no recibir argumentos, sino, tomará a arguments[0], como
	el conjunto de caracteres a eliminar.
	NOTA: esta función sobreescribe la brindada por Webkit, para permitir que el trim sea por cualquier
	conjunto de caracteres, no solo de los caracteres blancos ('\t', ' ')
*/
String.prototype.trim = function trim() {
	if (arguments.length) {
		
		eval( "var result=this.replace(/^["+arguments[0]+"]*/,'').replace(/["+arguments[0]+"]*$/,'')");
		return result;
	
	}
	return this.replace(/^[ \t]*/,'').replace(/[ \t]*$/,'');
}
	
/** reaiza trim parcial, por izquierda, para más información: vea String.prototype.trim
	@see:String.prototype.trim */
	String.prototype.trimLeft= function trimLeft() {
		if (arguments.length) {
				
				eval( "var result=this.replace(/^["+arguments[0]+"]*/,'')");
				return result;
			
			}
			return this.replace(/^[ \t]*/,'');
		}	
	}

/** reaiza trim parcial, por derecha, para más información: vea String.prototype.trim
	@see:String.prototype.trim */
	String.prototype.trimRight= function trimRight() {
		if (arguments.length) {
			eval( "var result=this.replace(/["+arguments[0]+"]*$/,'')");
			return result;
		
		}
		return this.replace(/[ \t]*$/,'');
	}
