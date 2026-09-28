const tempoPlantado = `http://localhost:3000/crops/me`;
const btn = document.querySelector(".acessando");

var progressColors = ['#406b3cff', '#aaaaaaff'];

let chart = null;

const MS_POR_DIA = 1000 * 60 * 60 * 24;

function zerarHora(data) {
    const d = new Date(data);
    d.setHours(0, 0, 0, 0);
    return d;
}

// diferença entre dataPlantio e dataPrevista (ciclo total esperado)
function diferencaTotal(dataPlantio, dataPrevista) {
    const plantio = zerarHora(dataPlantio);
    const prevista = zerarHora(dataPrevista);
    return Math.round((prevista.getTime() - plantio.getTime()) / MS_POR_DIA);
}

// diferença entre hoje e dataPlantio (dias já percorridos)
function diasDesdePlantio(dataPlantio) {
    const plantio = zerarHora(dataPlantio);
    const hoje = zerarHora(new Date());
    return Math.round((hoje.getTime() - plantio.getTime()) / MS_POR_DIA);
}

// calcula os dois valores do gráfico 
function calcularProgressoGrafico(dataPlantio, dataPrevista) {
    const totalDias = diferencaTotal(dataPlantio, dataPrevista);

    const passados = Math.max(0, Math.min(diasDesdePlantio(dataPlantio), totalDias));

  // relaciona sempre em tempo real no gráfico
    const restantes = totalDias - passados;
    return { totalDias, passados, restantes };
}

async function patrametrosMedida() {
    try {
        const plantacao = await fetch(tempoPlantado, { credentials: 'include' });
        const dadosPlantacao = await plantacao.json();

        console.log("crops recebidos:", dadosPlantacao)

        const plantaSalva = JSON.parse(localStorage.getItem('plantaSelecionada'));
        console.log("planta selecionada:", plantaSalva);

        if (!plantaSalva) {
            console.log("Nenhuma planta salva no localStorage.");
            return;
        }

        const cropFinal = dadosPlantacao.find(
            (crop) => crop.cultura?.planta?.nome?.toLowerCase() === plantaSalva.nomeExibido.toLowerCase()
        );

        console.log("plantação encontrada:", cropFinal);

        if (!cropFinal) {
            console.log("Nenhum crop correspondente encontrado para: " + plantaSalva.nomeExibido);
            return;
        }

        console.log("data prevista: " + cropFinal.dataColheitaPrevista)
        console.log("data de plantio: " + cropFinal.dataPlantio)

        
        // tempo restante e passado agr se relacionam 100%
        const { totalDias, passados, restantes } = calcularProgressoGrafico(
            cropFinal.dataPlantio,
            cropFinal.dataColheitaPrevista
        );

        console.log(`Ciclo total previsto: ${totalDias} dias`);
        console.log(`Dias percorridos: ${passados} dias`);
        console.log(`Dias restantes: ${restantes} dias`);
         
        if(restantes <= 0){
            alert("Plantação já pronta para colheita!!")
        }else{
            console.log("Plantação aiinda n~´ao se encontra pronta para colheita")
        }
        var options = {
            series: [passados, restantes],
            labels: ['tempo passado', 'restante'],
            chart: { type: 'donut', height: 350 },
            colors: progressColors,
            legend: { position: 'bottom' },
            dataLabels: { enabled: true },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Dias restantes',
                                formatter: function (w) {
                                    var restanteAtual = w.globals.seriesTotals[1];
                                    return `${restanteAtual} dias`;
                                }
                            }
                        }
                    },
                },
            },
            title: { text: 'TEMPO DE COLHEITA', align: 'center' },
        };

        if (!chart) {
            chart = new ApexCharts(document.querySelector('#chart'), options);
            chart.render();
        } else {
            atualizarProgresso(passados, restantes);
        }

    } catch (error) {
        console.log("deu errado ao puxar de plantações: " + error);
    }
}

function atualizarProgresso(passado, restante) {
    if (!chart) {
        console.log("Chart ainda não foi criado.");
        return;
    }
    chart.updateSeries([passado, restante]);
}

btn.addEventListener("click", patrametrosMedida)