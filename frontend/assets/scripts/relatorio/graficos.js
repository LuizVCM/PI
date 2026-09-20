const ctx = document.getElementById('temp');
const vento = document.getElementById("vento");
const chuva = document.getElementById("chuva");
const plantaTamanho = document.querySelector(".pl span");
const lotes = document.querySelector(".lotesss span");
const pMon = document.querySelector(".g span");
const sensores = document.querySelector(".sensores span");

const requisicao = `http://localhost:3000/plants/me`;
const requisicaoClima = `http://localhost:3000/weather/me`;

const mesesLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

let chartTemp, chartVento, chartChuva;

// Converte string de data "2026-09-16" (ou variações) para Date válido
function parseData(valor) {
  if (!valor) return null;
  const data = new Date(valor);
  return isNaN(data.getTime()) ? null : data;
}

// Aceita tanto número quanto string numérica (ex: "19.80")
function numeroValido(valor) {
  if (valor === null || valor === undefined || valor === '') return false;
  return isFinite(Number(valor));
}

// Caso a API devolva o array direto OU embrulhado num objeto (ex: { dados: [...] }, { clima: [...] }),
// esta função encontra o array de registros automaticamente
function extrairArrayDeRegistros(payload) {
  if (Array.isArray(payload)) return payload;

  if (payload && typeof payload === 'object') {
    // procura a primeira propriedade do objeto que seja um array
    const chaveComArray = Object.keys(payload).find(chave => Array.isArray(payload[chave]));
    if (chaveComArray) return payload[chaveComArray];
  }

  return [];
}

// Recebe a lista de registros e o nome do campo (ex: 'temperaturaMaxima', 'velocidadeVentoMaxima', 'precipitacao')
// Retorna um array de 12 posições com a média mensal daquele campo
function calcularMediaMensal(registros, campo) {
  const somas = new Array(12).fill(0);
  const contagens = new Array(12).fill(0);

  registros.forEach((registro, i) => {
    const data = parseData(registro.data);
    if (!data) {
      console.warn(`registro ${i} ignorado: data inválida`, registro.data);
      return;
    }

    const valor = registro[campo];
    if (!numeroValido(valor)) {
      console.warn(`registro ${i} ignorado: campo "${campo}" inválido`, valor);
      return;
    }

    const mes = data.getMonth(); // 0 = Jan ... 11 = Dez
    somas[mes] += Number(valor);
    contagens[mes]++;
  });

  return somas.map((soma, i) => contagens[i] > 0 ? +(soma / contagens[i]).toFixed(2) : 0);
}

async function gráficosValidaçãoData() {
  try {

    // --- dados das plantas ---
    const dadosPlantas = await fetch(requisicao, { credentials: 'include' });
    if (!dadosPlantas.ok) throw new Error(`erro ao buscar plantas: status ${dadosPlantas.status}`);
    const plantas = await dadosPlantas.json();

    console.log('plantas recebidas:', plantas.length);

    if (plantaTamanho) plantaTamanho.textContent = `${plantas.length}`;
    if (pMon) pMon.textContent = `${plantas.length}`;

    // --- dados de clima ---
    const dadosClimaResp = await fetch(requisicaoClima, { credentials: 'include' });
    if (!dadosClimaResp.ok) throw new Error(`erro ao buscar clima: status ${dadosClimaResp.status}`);
    const payloadClima = await dadosClimaResp.json();

    const registrosClima = extrairArrayDeRegistros(payloadClima);

    console.log('registros de clima recebidos:', registrosClima.length);
    console.log('exemplo de registro:', registrosClima[0]);

    const mediaTemperatura = calcularMediaMensal(registrosClima, 'temperaturaMaxima');
    const mediaVento = calcularMediaMensal(registrosClima, 'velocidadeVentoMaxima');
    const mediaChuva = calcularMediaMensal(registrosClima, 'precipitacao');

    console.log('médias de temperatura por mês:', mediaTemperatura);
    console.log('médias de vento por mês:', mediaVento);
    console.log('médias de chuva por mês:', mediaChuva);

    // destrói gráficos anteriores, se existirem, antes de recriar
    if (chartTemp) chartTemp.destroy();
    if (chartVento) chartVento.destroy();
    if (chartChuva) chartChuva.destroy();

    chartTemp = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: mesesLabels,
        datasets: [{
          borderColor: 'orange',
          label: 'média mensal de temperatura máxima',
          data: mediaTemperatura,
          borderWidth: 3,
          backgroundColor: 'orange'
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });

    chartVento = new Chart(vento, {
      type: 'bar',
      data: {
        labels: mesesLabels,
        datasets: [{
          borderColor: 'green',
          label: 'média mensal de vento máximo',
          data: mediaVento,
          borderWidth: 1,
          backgroundColor: 'lightgreen'
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });

    chartChuva = new Chart(chuva, {
      type: 'bar',
      data: {
        labels: mesesLabels,
        datasets: [{
          borderColor: 'blue',
          label: 'média mensal de precipitação',
          data: mediaChuva,
          borderWidth: 1,
          backgroundColor: 'lightblue'
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });

  } catch (error) {
    console.log('deu erro ao consumir os dados da API: ' + error);
  }
}

gráficosValidaçãoData();