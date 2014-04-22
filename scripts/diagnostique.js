function diagnostiquer () {
	var txt = obtenirTexte();
   	var rq= "http://localhost:8888/jshint?input=" +
           btoa(unescape(encodeURIComponent(txt)));
		   
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
		 		 
      },
      error: function(jqXHR, textStatus, errorThrown) {
         alert("Zut! " + JSON.stringify(jqXHR) +
               textStatus + " ; "+ JSON.stringify(errorThrown));
      }
   });	   
}
$(document).ready(function () {
	$( "#diagnostique" ).click(diagnostiquer)
});