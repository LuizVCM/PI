 function abrirPaginaComDelay(url, delaySegundos) {
      setTimeout(function() {
        window.location.href = url; // abre a página no mesmo tab
        // ou use window.open(url) para abrir em nova aba
      }, delaySegundos * 1000); // converter segundos para milissegundos
    }

     window.onload = function() {
      abrirPaginaComDelay(formulario.html, 5);
    };