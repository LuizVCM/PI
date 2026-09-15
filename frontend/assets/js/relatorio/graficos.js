 const ctx = document.getElementById('temp');
 const vento = document.getElementById("vento");
 const chuva = document.getElementById("chuva")
async function gráficosValidaçãoData() {
    try{
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        borderColor: 'orange',
        label: 'média mensal de temperatura máxima',
        data: [10, 5, 2, 0, 0, 12, 15, 9, 1.8, 0, 0, 1],
        borderWidth: 3,
        backgroundColor: 'orange'

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },  
      }
    }
  });

  new Chart(vento, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        borderColor: 'green',
        label: 'média mensal de vento máximo',
        data: [10, 5, 2, 0, 0, 12, 15, 9, 1.8, 0, 0, 1],
        borderWidth: 1,
        backgroundColor: 'lightgreen'

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },  
      }
    }
  });
  new Chart(chuva, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        borderColor: 'blue',
        label: 'média mensal de temperatura máxima',
        data: [10, 5, 2, 0, 0, 12, 15, 9, 1.8, 0, 0, 1],
        borderWidth: 1,
        backgroundColor: 'lightblue'

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },  
      }
    }
  });
}catch(error){
    console.log('deu erro ao consumir os dados da API: '+error)
}
  }


  gráficosValidaçãoData()