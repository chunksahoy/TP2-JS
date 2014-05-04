  //sélection via la souris
  /*
  	auteur: Charles Hunter-Roy, 2014
	création d'un singleton pour encapsuler la sélection faite à la souris
  */  
  var Selection = (function () {
		var instance;
		function ZeSelection() {
			this.texte = function() {
				if (window.getSelection) {
				   return  window.getSelection();
				} else if (document.getSelection) {
				   return  document.getSelection();
				} else if (document.selection) {
				   return  document.selection.createRange().text;
				}
			};
			this.cut = function () {
				if (window.getSelection) {
		 			 window.getSelection().deleteFromDocument();
	  			} else if (document.getSelection) {
		 			 document.getSelection().text = "";
	 			} else if (document.selection) {
		 			 document.selection.text = "";
	  			}
			};
		}			
		function createInstance() {
			var singleton = new ZeSelection();
			return singleton;
		}
		return {
			getInstance : function() {
				if (!instance) {
					instance = createInstance();
				}
				return instance;
			}	
		};
  })();
	/*
		Clipboard
		auteur: Charles Hunter-Roy
		création d'un singleton pour simuler un "clipboard" qui contiendra le texte des évènements "copier" et "coller"
	*/
  var Clipboard = (function () {
		var instance;
		function ZeClipboard() {
			this.texte = "";			
		}			
		function createInstance() {
			var singleton = new ZeClipboard();
			return singleton;
		}
		return {
			getInstance : function() {
				if (!instance) {
					instance = createInstance();
				}
				return instance;
			}	
		};
  })();