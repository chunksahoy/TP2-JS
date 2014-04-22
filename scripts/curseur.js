var Curseur = (function () {
	var instance;
	function ZeCurseur() {
		this.position = 0;
		this.posCol = 0;
		this.lignes = "";
		this.ouverture = "<span id=cursor>";
		this.fermeture = "</span>";
		this.setPosition = function (nb, s) {
			if (this.position >= s.length + 1) {
				this.position = s.length + 1;
			}
			else if (this.position < 0) {
				this.position = 0;
			}
			else {
				this.position = nb;
			}
		};
		this.monterLigne = function (s) {
			var lignes = this.lignes(s);
			var pos = this.trouverCurseur(lignes);
			var lettresAvant = elementsAvant(lignes, pos - 1);
			var nouvPos = 0;
			if(pos != 0) {
				var avant = subStr(s, 0, this.position - 1);
				if (this.posCol >= lignes[pos-1].length-1) {
					nouvPos = avant.lastIndexOf('\n');
				} 
				else {
					nouvPos = this.position - lignes[pos-1].length - 1 ;				
				}
			}
			this.setPosition(nouvPos, s);
		};
		this.descendreLigne = function (s) {
			var lignes = this.lignes(s);
			var pos = this.trouverCurseur(lignes);			
			var nouvPos = this.position;			
			if(pos != lignes.length) {
				var nbLettres = elementsAvant(lignes, pos + 1);
				if (this.posCol >= lignes[pos+1].length -1) {
					nouvPos = nbLettres - 1;
				}
				else {
					nouvPos = this.position + lignes[pos].length + 1;				
				}
			}
			this.setPosition(nouvPos, s);
		};
		this.avancerCurseur = function (s) {
			this.setPosition(this.position + 1, s);
		};
		this.reculerCurseur = function (s) {
			this.setPosition(this.position - 1, s);
		};
		this.insererCurseur = function (s) {
			return s = s.substring(0, this.position - 1) + this.ouverture +
				s.substring(this.position - 1, this.position) + this.fermeture +
				s.substring(this.position, s.length);
		};
		//trouve la ligne ainsi que la colonne dans laquelle le curseur est placé
		this.trouverCurseur = function (tab) {
			var caracteres = 0;
			for (var i = 0; i < tab.length; ++i) {
				//pour prendre les sauts de lignes('\n') en compte
				if (caracteres == this.position) {
						this.posCol = j;
						return i;
				}
				else {
						caracteres++;
				}
				for (var j = 0; j < tab[i].length; ++j) {
					if (caracteres == this.position) {
						this.posCol = j;
						return i;
					}
					else {
						caracteres++;
					}
				}
			}
			this.posCol = tab[tab.length-1].length - 1;
			return tab.length - 1;
		};
		this.lignes = function (s) {
			return s.split(/\r\n|\r|\n/);
		};
		//retourne la position du curseur (le début de la balise)
		//dans une chaîne, retourne -1 s'il n'y est pas présent
		this.situerCurseur = function (s) {
			return s.search(this.ouverture);
		};
		//retourne une chaine sans curseur
		this.ignorerCurseur = function (s, debut, fin) {
			var posBalise = this.situerCurseur(s);

			if (posBalise == -1) { //au cas où le curseur n'est pas présent
				return s;
			} else {
				return s.substring(debut, posBalise) +
				s.substring(posBalise + this.ouverture.length, posBalise + this.ouverture.length + 1) +
				s.substring(posBalise + this.ouverture.length + this.fermeture.length + 1, fin);
			}
		};
	}
	function createInstance() {
		var singleton = new ZeCurseur();
		return singleton;
	}
	return {
		getInstance : function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})();