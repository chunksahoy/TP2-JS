function contient(array, chaine) {
	for (var i = 0; i < array.length; ++i) {
		if (array[i] == chaine) {
			return true;
		}
	}
	return false;
}
function baliser(chaine, balise, classe) {
	var resultat = chaine;
	
	if(classe != null) {
		resultat = "<" + balise + " class=" + classe + ">" + chaine + "</" + balise + ">";
	}
	else {
		 "<" + balise + ">" + chaine + "</" + balise + ">";
	}
	return resultat;
}
function egalite(s1, s2, f) {
	return f(s1) == f(s2);
}
function trouverSi(s, pos, f) {
	while (pos != s.length && !f(s[pos])) {
		++pos;
	}
	return pos;
}
function estDansChaine(c, s, pos) {
	return s[pos] == c;
}
function motDansChaine(s1, pos, s2, f) {
	var temp = 0;
	while (pos != s1.length && !f(s1[pos], s2, temp)) {
		temp = 0;
		++pos;
		while(pos != s1.length && f(s1[pos], s2, temp)) {
			++temp;
		}
	}	
	return pos;
}
function negation(f) {
	var g = function (x) {
		return !f(x);
	}
	return g;
}
function isSpace(c) {
	return c == ' ' || c == '\n' || c == '\r' ||
	c == '\f' || c == '\t' || c == '\v';
}
function isNewLine(c) {
	return c == '\n'
}
function elementsAvant(tab, pos) {
	var nbElements = 0;
	if(pos <= 0 && tab[0] != null) {
		nbElements = tab[0].length;	
	}
	else {
		for(var i = 0; i <= pos; ++i) {
			for(var j = 0; j <= tab[i].length; ++j) {
				nbElements++;	
			}
		}
	}
	return nbElements;
}
function trouverPlusLong(s) {
	var plusGros = 0;
	for (var i = 1; i < s.length; ++i) {
		if (s[i].length > s[plusGros].length) {
			plusGros = i;
		}
	}
	return plusGros;
}
function subStr(s, début, fin) { // suppose début et fin Ok
	var résultat = "";
	while (début != fin) {
		résultat += s[début];
		++début;
	}
	return résultat;
}
function insererTexte(s, pos, c) {
	var texte = s.substring(0, pos) +
		c + s.substring(pos, s.length);
	Curseur.getInstance().avancerCurseur(s);
	return texte;
}
function peinturer(zone, contenu) {
	zone.innerHTML = contenu;
}
