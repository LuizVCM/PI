 function abrirPaginaComDelay(url, delaySegundos) {
      setTimeout(function() {
        window.location.href = url; // abre a página no mesmo tab
        // ou use window.open(url) para abrir em nova aba
      }, delaySegundos * 1000); // converter segundos para milissegundos
    }

     window.onload = function() {
      abrirPaginaComDelay(formulario.html, 5);
    };

    const formulario = document.querySelectorAll(".formulario");
    const link = document.getElementById("paragrafoLink");

    link.addEventListener("click",() => {
     formulario.forEach(element => {
      element.classList.toggle("cadastro")
     });
    })
