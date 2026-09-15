const temperaturaMedia = document.querySelector(".graus h3")
const umidadeMedia = document.querySelector(".um h1")
const ventoMedio = document.querySelector(".Vento h1")
const chuva = document.querySelector(".Chuva h1")
const visibilidade = document.querySelector(".Visib h1")
const temperaturaAtual = document.querySelector(".graus h1")






async function TrocarTemp() {

  try {
      const user = "http://localhost:3000/users/me"
      const consumo0 = await fetch(user, { credentials: 'include' });
      const usuario0 = await consumo0.json();


      const coordenadasGeograficas = `https://brasilapi.com.br/api/cep/v2/${usuario0.territorios[0].cep}`;
      const coordenar = await fetch(coordenadasGeograficas);
      const coordenadasCidade = await coordenar.json();

      console.log(coordenadasCidade)
      console.log("teswte")
    
  
  const api = `https://api.open-meteo.com/v1/forecast?latitude=${coordenadasCidade.location.coordinates.latitude}&longitude=${coordenadasCidade.location.coordinates.longitude}&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,precipitation_probability_max,et0_fao_evapotranspiration,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m&minutely_15=temperature_2m,relative_humidity_2m,rain,precipitation,apparent_temperature,global_tilted_irradiance,wind_speed_10m,shortwave_radiation&timezone=America%2FSao_Paulo&forecast_days=1`

  const clima = `https://api.open-meteo.com/v1/forecast?latitude=${coordenadasCidade.location.coordinates.latitude}&longitude=${coordenadasCidade.location.coordinates.longitude}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,precipitation_sum,et0_fao_evapotranspiration&forecast_days=1`;

  const recebeDadosBackend = "http://localhost:3000/users/me"
  try {
    const consumo = await fetch(recebeDadosBackend, { credentials: 'include' });
    const usuario = await consumo.json();

    const elemento = document.querySelector(".local h1");
    const cidade = usuario.territorios[0].cidade;
    const estado = usuario.territorios[0].estado;

    elemento.textContent = `${cidade}, ${estado}`
    async function lançarClima() {
      try {
        const climaDiario = await fetch(clima);
        const dadosClima = await climaDiario.json()

        const apiEnviar = `http://localhost:3000/weather/territory/${usuario.territorios[0].id}`
        
         const hoje = new Date().toISOString().split('T')[0];

        console.log(dadosClima)
        const verificaClima = 'http://localhost:3000/weather/me'
        const verify = await fetch(verificaClima, {credentials: 'include'});
        const ver = await verify.json()

        console.log(ver)

        const jaExisteHoje = ver.some(item => item.data === hoje);
        console.log(jaExisteHoje)
        
if (jaExisteHoje) {
    console.log('Já existe clima cadastrado para hoje, não vou enviar de novo.');
  } else {
        const enviarClima = await fetch(apiEnviar, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            daily: dadosClima.daily
          })
        })
      
        if (!enviarClima.ok) {
          throw new Error(`Erro na requisição: ${enviarClima.status}`);
        }
      }

        const dadosRetornados = await enviarClima.json();
        console.log('Sucesso:', dadosRetornados);
      
      } catch (error) {
        console.log("deu erro pois já existe clima dessa data!")
      } finally {



        const resposta = await fetch(api)
        const dados = await resposta.json()
        // altera as máximas e as mínimas da temperatura atual
        temperaturaMedia.textContent = `Máx: ${Number(dados.daily.temperature_2m_max)}  · Mín: ${Number(dados.daily.temperature_2m_min)} `

       

        // altera a porcentagem atual de umidade no ar
        umidadeMedia.textContent = `${Number(dados.hourly.relative_humidity_2m.at(3))}%`

        // altera o valor de vento 
        ventoMedio.textContent = `${Number(dados.daily.wind_speed_10m_max)}km/h`

        //altera o valor de chuva
        chuva.textContent = `${Number(dados.daily.precipitation_sum)}mm`

        // consumir API com 7 dias

        const api2 = `https://api.open-meteo.com/v1/forecast?latitude=${coordenadasCidade.location.coordinates.latitude}&longitude=${coordenadasCidade.location.coordinates.longitude}&daily=temperature_2m_max,temperature_2m_min,et0_fao_evapotranspiration,wind_speed_10m_max,precipitation_sum,precipitation_hours,precipitation_probability_max&hourly=temperature_2m,relative_humidity_2m,rain,showers,precipitation,precipitation_probability,dew_point_2m,visibility,apparent_temperature&current=temperature_2m,relative_humidity_2m,rain,showers,precipitation&minutely_15=visibility,temperature_2m,relative_humidity_2m,precipitation,apparent_temperature&timezone=America%2FSao_Paulo`

        const resposta2 = await fetch(api2)
        const dados7Dias = await resposta2.json()

        console.log(dados7Dias);


        // pega as infomrações exatas de hj
        const hoje = document.querySelector(".local p")
        let diaNome = new Date().toLocaleDateString('pt-BR', { weekday: 'long' })
        let diaNum = new Date().getDate()
        // aq ele lê o número do mês atual, converte o seu significado para string e traduz na língua portuguesa
        let mes = (new Intl.DateTimeFormat('pt-BR', { month: 'long' })).format(new Date())
        let hora = new Date().getHours()
        let minute = new Date().getMinutes()
        // impede q seja minuto 0, mas ss 00 até chegar o 10
        hoje.textContent = `${diaNome}, ${diaNum} ${mes} - ${hora}:${minute} `


        const dia1 = document.querySelector(".d1")
        const dia2 = document.querySelector(".d2")
        const dia3 = document.querySelector(".d3")
        const dia4 = document.querySelector(".d4")
        const dia5 = document.querySelector(".d5")
        const dia6 = document.querySelector(".d6")

        // pega as máximas e mínimas de cada dia e informa no frontend
        const max = []
        const min = []
        for (let i = 1; i <= 6; i++) {
          max[i - 1] = document.querySelector(`.b${i} h2`)
          min[i - 1] = document.querySelector(`.b${i} h3`)
        }

        console.log(max)

        // altera as máximas:
        for (let j = 0; j < max.length; j++) {
          console.log(max[j])
          max[j].textContent = `${dados7Dias.daily.temperature_2m_max[j]}°C`
        }

        // altera as mínimas:
        for (let k = 0; k < min.length; k++) {
          console.log(min[k])
          min[k].textContent = `${dados7Dias.daily.temperature_2m_min[k]}°C`
        }

        const imagemClima = document.querySelector(".nuvemSol img");
         if(dados.daily.precipitation_sum[0] === 0){
          imagemClima.src = 'https://cdn-icons-png.flaticon.com/512/6961/6961300.png'
         }
        else if(dados.daily.precipitation_sum[0] >0 && dados.daily.precipitation_sum[0] <= 5){
          imagemClima.src = 'https://cdn-icons-png.flaticon.com/512/0/956.png';
          imagemClima.style = 'filter: invert(80%)';
        }else if(dados.daily.precipitation_sum[0] > 5 && dados.daily.precipitation_sum[0] <= 20){
          imagemClima.src = 'https://cdn-icons-png.flaticon.com/512/4834/4834585.png'
        }else{
          imagemClima.src = 'https://cdn-icons-png.flaticon.com/512/2930/2930074.png'
        }


        // informar exatamente os dias dos cards de previsão  (pega por essas funções loucas de conversão de data e pelo índice da API)
        dia1.textContent = `${new Date(dados7Dias.daily.time.at(0)).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`
        dia2.textContent = `${new Date(dados7Dias.daily.time.at(1)).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`
        dia3.textContent = `${new Date(dados7Dias.daily.time.at(2)).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`
        dia4.textContent = `${new Date(dados7Dias.daily.time.at(3)).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`
        dia5.textContent = `${new Date(dados7Dias.daily.time.at(4)).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`
        dia6.textContent = `${new Date(dados7Dias.daily.time.at(5)).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`

        // altera a visibilidade (nn feito antes)
        // aq pega as horas exatas do sistema
        let horaAtual
        if (new Date().getHours() < 1) {
          horaAtual = 1
        }
        else {
          horaAtual = new Date().getHours()
        }
        visibilidade.textContent = `${(dados7Dias.hourly.visibility[horaAtual - 1]) / 1000} km`// aq eu pego a informação da hora atual, dada em número, coloco para acessar o array de visibilidade por hora e em 7 dias, e coloco para pegar ainformação exata do horário atual correspondente com o índice da hora - 1
        const aparenteTemperatura = `https://api.open-meteo.com/v1/forecast?latitude=${coordenadasCidade.location.coordinates.latitude}&longitude=${coordenadasCidade.location.coordinates.longitude}&hourly=apparent_temperature,temperature_2m&forecast_days=1`

        const te = await fetch(aparenteTemperatura);
        const temperaturaAparente = await te.json();
        console.log(temperaturaAparente)
          
        temperaturaAtual.textContent = `${temperaturaAparente.hourly.temperature_2m[horaAtual - 1]}°C`

        // altera sensação térmica neste momento atual
        const sensacaoTermica = document.querySelector(".graus h4")
        
        sensacaoTermica.textContent = `Sensação térmica: ${(temperaturaAparente.hourly.apparent_temperature[horaAtual - 1])}°C`

         

      }
    }

    lançarClima()
  }
  catch (error) {
    alert(`Erro ao consumir os dados: ` + error)
  }
  } catch (error) {
    console.log("deu erro ao capturar coordenadas do cep" + error)
  }
}


TrocarTemp()
setInterval(TrocarTemp, 100000)