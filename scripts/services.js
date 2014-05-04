/*
	traiterRequete
	auteur: Patrice Roy,
	 modifications spécifique par Charles Hunter-Roy, 2014
	traite une requête en l'envoyant au serveur local
	
*/

function traiterRequete(rq, id) {
   var txt = obtenirTexte();
   rq += btoa(unescape(encodeURIComponent(txt)));
   $.ajax({
      url: rq,
      type: "post",
      contentType: "text/plain",
      crossDomain: true,
      header: {
         "Access-Control-Allow-Origin": null
      },
      xhrFields: {
         witCredentials: false
      },
      success: function(s) {
         var résultat = decodeURIComponent(escape(atob(s)));
		 
         peinturer(document.getElementById(id),résultat);
      },
      error: function(jqXHR, textStatus, errorThrown) {
         alert("Zut! " + JSON.stringify(jqXHR) +
               textStatus + " ; "+ JSON.stringify(errorThrown));
      }
   });
}