var MoniteurStats = (function () {
      var instance;
      function ZeGénérateur() {
          this.mots = function(s) {
              this.nbMots = 0;			  
              var pos = 0;
              while (pos != s.length) {
                  // consommer blancs au début
                  var prochain = trouverSi(s, pos, negation(isSpace));				
                  pos = prochain;
                  // consommer mot
                  if (pos != s.length) {  
                      this.nbMots++;
                      prochain = trouverSi(s, pos, isSpace);			
                      pos = prochain;
                  }											
              }
              return this.nbMots;						
          };
          this.caracteres = function (s) {
              return s.length;
          };
          this.colonne = function (s) {
              return s.split(/\r\n|\r|\n/)[trouverPlusLong(s.split(/\r\n|\r|\n/))].length;
          };
          this.lignes = function (s) {
              return s.split(/\r\n|\r|\n/).length;
          };
      }			
      function createInstance() {
          var singleton = new ZeGénérateur();
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