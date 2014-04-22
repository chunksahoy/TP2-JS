function getMots() {
	return ["break", "case", "catch", "continue", "debugger",
		"default", "delete", "do", "else", "finally",
		"for", "function", "if", "in", "instanceof",
		"new", "return", "switch", "this", "throw",
		"try", "typeof", "var", "void", "while", "with"];
}
function skippedChars() {
	return [0, 13]; //en ordre: null, '\n'
}
function formater(s) {
	var motsCles = getMots();
	var resultat = ""; //la chaine au-complet, formatée
	var temp = ""; //une sous-chaîne, pour la comparaison
	var pos = 0;
	var posCurseur = Curseur.getInstance().situerCurseur(s);
	while (pos != s.length) {
		// consommer blancs au début
		var prochain = trouverSi(s, pos, negation(isSpace));
		var departCurseur = prochain;
		resultat += subStr(s, pos, prochain); //pour conserver les blancs
		pos = prochain;

		// consommer mot
		if (pos != s.length) {
			prochain = trouverSi(s, pos, isSpace);
			//si on a atteint le curseur
			if(prochain >= posCurseur) {
				//ICI: la fonction retourne toujours la fin de la chaine->changer le prédicat pour s'accomoder au curseur
				var fin = trouverSi(s, pos + Curseur.getInstance().ouverture.length, function (c) { return c == "</span>"}); 
				prochain = fin;
				temp = subStr(s, pos, prochain);				
				
				//ICI: petit problème quand on monte de ligne avec les flèches, voir plus haut(trouverSi)
				var sansCurseur = Curseur.getInstance().ignorerCurseur(temp, 0, temp.length).trim();
				if(contient(motsCles, sansCurseur)) {
					temp = baliser(temp, "span", "motCle");
				}
			}
			else {
				temp = subStr(s, pos, prochain);
				if (contient(motsCles, temp)) {
					temp = baliser(temp, "span", "motCle");
				}
			}
			pos = prochain;
			resultat += temp;
		}
	}
	return resultat;
}  
function ecrireAuCurseur(s, c) {
	var texte = insererTexte(s, Curseur.getInstance().position, c);
	Curseur.getInstance().avancerCurseur(s);
	return texte;
}
function effacer(texte, keyCode) {
	var resultat = "";
	switch (keyCode) {
	case 8:
		resultat = formater(Curseur.getInstance().insererCurseur(texte.substring(0, Curseur.getInstance().position - 1) + //touche backspace
					texte.substring(Curseur.getInstance().position, texte.length)));
		break;
	case 46:
		resultat = formater(Curseur.getInstance().insererCurseur(texte.substring(0, Curseur.getInstance().position) + //touche delete
					texte.substring(Curseur.getInstance().position + 1, texte.length)));
		break;
	}
	return resultat;
}
function numeroterLignes(s) {
	var temp = "";
	var resultat = "";
	var lignes = s.split(/\r\n|\r|\n/);

	temp = "<span class=prettyLignes>" + lignes[0] + "</span>";
	resultat += temp;
	for (var i = 1; i < lignes.length; ++i) {
		temp = "\n<span class=prettyLignes>" + lignes[i] + "</span>";
		resultat += temp;
	}
	return resultat;
}
function rafraichirTexte(zone, s) {
	peinturer(zone, numeroterLignes(formater(s)));
}
function lireUneTouche(event) {
	var zone = document.getElementById("ubertexter");
	var texte = "";
	if (event.which != 0 && !contient(skippedChars(), event.charCode)) {
		zone.textContent = ecrireAuCurseur(zone.textContent, String.fromCharCode(event.which));
		rafraichirTexte(zone, Curseur.getInstance().insererCurseur(zone.textContent));
		updateControls(zone.textContent);
	}
}
function lireSpecial(event) {
	var zone = document.getElementById("ubertexter");
	var texte = "";
	 // touche "backspace"
	if (event.keyCode == 8 && zone.textContent.length > 0) {
		texte = effacer(zone.textContent, event.keyCode);
		Curseur.getInstance().reculerCurseur(zone.textContent);
		rafraichirTexte(zone, texte);
	}
	//touche "enter"
	else if (event.keyCode == 13) {
		zone.textContent = ecrireAuCurseur(zone.textContent, '\n');
		Curseur.getInstance().avancerCurseur(zone.textContent);
		rafraichirTexte(zone, Curseur.getInstance().insererCurseur(zone.textContent));
	}
	//touche "delete"
	else if (event.keyCode == 46) {
		rafraichirTexte(zone, effacer(zone.textContent, event.keyCode));
	}
	//gestion des touches "flèches"
	switch (event.keyCode) {
	case 37:
		Curseur.getInstance().reculerCurseur(zone.textContent); //gauche
		rafraichirTexte(zone, Curseur.getInstance().insererCurseur(zone.textContent));
		break;
	case 38:
		Curseur.getInstance().monterLigne(zone.textContent); //haut
		rafraichirTexte(zone, Curseur.getInstance().insererCurseur(zone.textContent));
		break;
	case 39:
		Curseur.getInstance().avancerCurseur(zone.textContent); //droite
		rafraichirTexte(zone, Curseur.getInstance().insererCurseur(zone.textContent));
		break;
	case 40:
		Curseur.getInstance().descendreLigne(zone.textContent); //bas
		rafraichirTexte(zone, Curseur.getInstance().insererCurseur(zone.textContent));
		break;
	}
	updateControls(zone.textContent);
}
function updateControls(texte) {
	var zone = document.getElementById("ubertexter");
	document.getElementById("lignes").textContent = MoniteurStats.getInstance().lignes(texte);
	document.getElementById("colonnes").textContent = MoniteurStats.getInstance().colonne(texte);
	document.getElementById("mots").textContent = MoniteurStats.getInstance().mots(texte);
	document.getElementById("caracteres").textContent = MoniteurStats.getInstance().caracteres(texte);
}

function obtenirTexte() {
	return document.getElementById("ubertexter").textContent;
}
function peinturerZone (zone, s) {
	zone.textContent = s;
}
document.addEventListener('keypress', lireUneTouche);
document.addEventListener('keydown', lireSpecial);