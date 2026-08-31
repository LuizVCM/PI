const temperaturaMedia = document.querySelector(".graus h3")
const umidadeMedia = document.querySelector(".um h1")
const ventoMedio = document.querySelector(".Vento h1")
const chuva = document.querySelector(".Chuva h1")
const visibilidade = document.querySelector(".Visib h1")






async function TrocarTemp() {
    const api = 'https://api.open-meteo.com/v1/forecast?latitude=-29.7603&longitude=-51.1472&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,precipitation_probability_max,et0_fao_evapotranspiration,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m&minutely_15=temperature_2m,relative_humidity_2m,rain,precipitation,apparent_temperature,global_tilted_irradiance,wind_speed_10m,shortwave_radiation&timezone=America%2FSao_Paulo&forecast_days=1'
     try{
    const resposta = await fetch(api)
    const dados = await resposta.json()
    // altera as máximas e as mínimas da temperatura atual
    temperaturaMedia.textContent = `Máx: ${Number(dados.daily.temperature_2m_max) }  · Mín: ${Number(dados.daily.temperature_2m_min)} `
   
    // altera a porcentagem atual de umidade no ar
    umidadeMedia.textContent = `${Number(dados.hourly.relative_humidity_2m.at(3))}%`

    // altera o valor de vento 
    ventoMedio.textContent = `${Number(dados.daily.wind_speed_10m_max)}km/h`

    //altera o valor de chuva
    chuva.textContent = `${Number(dados.daily.precipitation_sum)}mm`

    // consumir API com 7 dias

    const api2 = "https://api.open-meteo.com/v1/forecast?latitude=-29.7603&longitude=-51.1472&daily=temperature_2m_max,temperature_2m_min,et0_fao_evapotranspiration,wind_speed_10m_max,precipitation_sum,precipitation_hours,precipitation_probability_max&hourly=temperature_2m,relative_humidity_2m,rain,showers,precipitation,precipitation_probability,dew_point_2m,visibility,apparent_temperature&current=temperature_2m,relative_humidity_2m,rain,showers,precipitation&minutely_15=visibility,temperature_2m,relative_humidity_2m,precipitation,apparent_temperature&timezone=America%2FSao_Paulo"

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
    for(let i = 1; i <= 6; i++){
      max[i - 1] = document.querySelector(`.b${i} h2`) 
      min[i - 1] = document.querySelector(`.b${i} h3`)
    }

    console.log(max)

    // altera as máximas:
    for(let j = 0; j < max.length; j++){
      console.log(max[j])
    max[j].textContent = `${dados7Dias.daily.temperature_2m_max[j]}°C`
    }

    // altera as mínimas:
    for(let k = 0; k < min.length; k++ ){
      console.log(min[k])
      min[k].textContent = `${dados7Dias.daily.temperature_2m_min[k]}°C`
    }



    // informar exatamente os dias dos cards de previsão  (pega por essas funções loucas de conversão de data e pelo índice da API)
      dia1.textContent = `${new Date(dados7Dias.daily.time.at(0)).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }`
      dia2.textContent = `${new Date(dados7Dias.daily.time.at(1)).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }`
      dia3.textContent = `${new Date(dados7Dias.daily.time.at(2)).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }`
      dia4.textContent = `${new Date(dados7Dias.daily.time.at(3)).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }`
      dia5.textContent = `${new Date(dados7Dias.daily.time.at(4)).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }`
      dia6.textContent = `${new Date(dados7Dias.daily.time.at(5)).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }`
      
      // altera a visibilidade (nn feito antes)
       // aq pega as horas exatas do sistema
       let horaAtual
     if(new Date().getHours() < 1){
        horaAtual = 1
     }
     else{
         horaAtual = new Date().getHours()
     }
      visibilidade.textContent = `${(dados7Dias.hourly.visibility[horaAtual - 1])/1000} km`// aq eu pego a informação da hora atual, dada em número, coloco para acessar o array de visibilidade por hora e em 7 dias, e coloco para pegar ainformação exata do horário atual correspondente com o índice da hora - 1

      // altera sensação térmica neste momento atual
      const sensacaoTermica = document.querySelector(".graus h4")

      sensacaoTermica.textContent = `Sensação térmica: ${dados7Dias.hourly.apparent_temperature[horaAtual - 1]}°C`
    }
    catch(error){
      alert(`Erro ao consumir os dados: `+error)
    }
    }
    

     TrocarTemp()
     setInterval(TrocarTemp, 100000)