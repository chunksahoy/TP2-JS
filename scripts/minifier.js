function minifier() {
   var txt = obtenirTexte();
   var rq= "http://localhost:8888/minify?input=" +
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
         peinturerZone(document.getElementById("minified"),résultat);
      },
      error: function(jqXHR, textStatus, errorThrown) {
         alert("Zut! " + JSON.stringify(jqXHR) +
               textStatus + " ; "+ JSON.stringify(errorThrown));
      }
   });
}