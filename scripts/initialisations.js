/*
	initialiserCouleurs
	auteur: Charles Hunter-Roy, 2014
	but: initialise une rangée contenant les couleurs et l'ajoute à un tableau html
*/
function initialiserCouleurs(s, parent, id) {
	function getCouleurs() {
		return ["black", "red", "blue", "orange", "green", "#574DD8"];	 //nom de couleurs valides ou code RGB seulement!
	}
	var couleurs = getCouleurs();
	var row = document.createElement("tr");
	row.id = id;
	row.appendChild(document.createElement("td")).textContent = s;
	for(var i = 0; i < couleurs.length; ++i) {
		var cell = document.createElement("td");
		var div = document.createElement("div");		
		div.className = "choixCouleur";
		div.style.backgroundColor = couleurs[i];
		cell.appendChild(div);
		row.appendChild(cell);
	}
	document.getElementById(parent).appendChild(row);
}

function creerContextMenu(s, event) {
	var div = document.createElement("div");
	var liste = document.createElement("ul");
	div.id = "menu";
	div.style.top = mouseY(event) + "px";
	div.style.left = mouseX(event) + "px";
	div.className = "show";
	for (var i = 0; i < s.length; ++i) {
		var listItem = document.createElement("li");
		listItem.textContent = s[i];
		liste.appendChild(listItem);
	}	
	div.appendChild(liste);
	document.getElementById("ubertexter").appendChild(div);	
}

/*
	Gestion du témoin pour conserver le choix de couleur
	auteur: Charles Hunter-Roy, 2014
*/
function creerTemoin(arg) {
  if (arg) {
	 	var expiration=new Date();
     	expiration.setDate(expiration.getDate() + 7); //une semaine
    	document.cookie = "couleur_motsCles=" + arg + ";expires=" + expiration.toUTCString();
  }
}
function detruireTemoin() {
  var expiration=new Date();
      expiration.setDate(expiration.getDate());
  	  document.cookie ="couleur_motsCles=" + ";expires=" + expiration.toUTCString()	;
}


//assignation des diverses fonctions liées aux évènements provenant du document
$(document).ready( function () {
	$( ".choixCouleur" ).click(function() {
 		var color = $( this ).css( "background-color" );
		creerTemoin(color);
  		$( ".motCle" ).css( "color", color) ;
	});
	
    if ($("#ubertexter").addEventListener) {
        $("#ubertexter").addEventListener('contextmenu', function(e) {
            e.preventDefault();
			var menu = document.getElementById("menu");
			if(!menu) {
				creerContextMenu(getTextOptions(), e);
			}
			else if(menu) {
				document.getElementById("ubertexter").removeChild(menu);
			}	
        }, false);
    } else {
        $('body').on('contextmenu', '#ubertexter', function() {
			event.preventDefault();
			var menu = document.getElementById("menu");
			if(!menu) {
				creerContextMenu(getTextOptions(), event);
			}
			else if(menu) {
				document.getElementById("ubertexter").removeChild(menu);
			}
        });
    }
	
	$(document).bind("click", function(event) {
		//on détruit le menu(s'il existe) pour éviter d'avoir son texte dans l'éditeur
		var menu = document.getElementById("menu");
		if(menu) {
			document.getElementById("ubertexter").removeChild(menu);
		}
    });
	/*
		//gestion des copier/coller/couper
		auteur: Charles Hunter-Roy, 2014
	*/
	$("#ubertexter").bind('copy', function() {
		Clipboard.getInstance().texte = Selection.getInstance().texte().toString();
	}); 
	
	$("#ubertexter").bind('paste', function() {
		zone = document.getElementById("ubertexter");
		zone.textContent = ecrireAuCurseur(zone.textContent, Clipboard.getInstance().texte);
		rafraichirTexte(zone, Curseur.getInstance().insererCurseur(zone.textContent));
		updateControls(zone.textContent);
	}); 
	
	$("#ubertexter").bind('cut', function() {
		Clipboard.getInstance().texte = Selection.getInstance().texte().toString();
		Selection.getInstance().cut();
	});
});

function mouseX(evt) {
    	if (evt.pageX) {
       		return evt.pageX;
    	} else if (evt.clientX) {
			return evt.clientX + (document.documentElement.scrollLeft ?
            document.documentElement.scrollLeft :
            document.body.scrollLeft);
	    } else {
	        return null;
	    }
}
function mouseY(evt) {
    if (evt.pageY) {
        return evt.pageY;
    } else if (evt.clientY) {
       return evt.clientY + (document.documentElement.scrollTop ?
       document.documentElement.scrollTop :
       document.body.scrollTop);
    } else {
        return null;
    }
}