var textHelper = (function(){
	var instance = null;

	TextHelper.prototype.moveCaret = function moveCaret(win, charCount) {
			var sel, range;
			if (win.getSelection) {
					sel = win.getSelection();
					if (sel.rangeCount > 0) {
							var textNode = sel.focusNode;
							var newOffset = sel.focusOffset + charCount;
							sel.collapse(textNode, Math.min(textNode.length, newOffset));
					}
			} else if ( (sel = win.document.selection) ) {
					if (sel.type != "Control") {
							range = sel.createRange();
							range.move("character", charCount);
							range.select();
					}
			}
	}

	TextHelper.prototype.getCaretPosition = function getCaretPosition(o) {
    var caretPos = 0, containerEl = null, sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == o) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == o) {
            var tempEl = document.createElement("span");
            o.insertBefore(tempEl, o.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}

	TextHelper.prototype.placeCaretAtEnd=function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

	TextHelper.prototype.mapKeyCode = function mapKeyCode(e){
		var delta=0;
		if (e.keyCode>=65 && e.keyCode<=89 && !e.shiftKey)
			delta=32;
			
		return String.fromCharCode(e.keyCode+delta)
	}

	TextHelper.prototype.newTextNode = function newTextNode(c,s){
		var b={
			className:'line-text',
			id:a.id+'_lines_1',
			contentEditable:'true',
		//	innerHTML:'&nbsp;',
			position:'relative',
			'float':'left',
		
			onfocus:function(){
				c.focus();
				
			},
			onkeydown:function(){
				textHelper.onkeydown(arguments[0],arguments[1],c);
				cancelEvent(arguments[0])
				return false;
			},
			onclick:function(){
				cancelEvent(arguments[0]);
				arguments[1].focus();
				return false;
			}
		}
		for (var i in s) {
			for (var j in s[i])
				b[j]=s[i][j];
		}
		var div=domHelper.div(b)
		div.sg={
			text: {
				pos:0
			}
		}		
		
		return div;
	}
	
	TextHelper.prototype.onkeydown = function onkeydown(e,o,c){
		switch(e.keyIdentifier) {
			case "Right":
				o.sg.text.pos++;
				if (o.sg.text.pos == o.innerText.length) {
					if (o.nextSibling) o.nextSibling.focus();
				}
			break;
			case "Left":
				o.sg.text.pos--;
				if (o.sg.text.pos<=0) {
					o.sg.text.pos=0;
					if (o.previousSibling) o.previousSibling.focus()
				}
				
			break;
			default:o.sg.text.pos++;
			break;
		}		
	}
	
	function TextHelper(){
		String.prototype.padLeft = function (np,cp) {
			var s='';
			if (!cp) cp=' ';
			for (var i=this.length; i<np; ++i)
				s+=cp;
			return s+this;
		}
		
	}
	
	return instance ? instance : instance = new TextHelper();

})()