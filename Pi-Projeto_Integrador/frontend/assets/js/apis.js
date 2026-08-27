// async function previsaoTempo() {
//     const latitude = -23.55;
//     const longitude = -46.63;

//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

//     try {
//         const resposta = await fetch(url);
//         const dados = await resposta.json();
//         console.log(dados);
//     } catch (error) {
//         console.log("Erro:", error);
//     }
// }

// const chave = "b23437cb5fff7ccdc581781205c5ed88"


// async function previsao2(cidade) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`;

//     try {
//         const resposta = await fetch(url);

//         if (!resposta.ok) {
//             throw new Error("Cidade não encontrada.");
//         }

//         const dados = await resposta.json();

//         console.log(dados);

//         console.log(`Cidade: ${dados.name}`);
//         console.log(`Temperatura: ${dados.main.temp}°C`);
//         console.log(`Sensação térmica: ${dados.main.feels_like}°C`);
//         console.log(`Umidade: ${dados.main.humidity}%`);
//         console.log(`Clima: ${dados.weather[0].description}`);
//         console.log(`Vento: ${dados.wind.speed} m/s`);

//     } catch (error) {
//         console.error("Erro:", error.message);
//     }
// }

// // Exemplo
// previsao2("São Leopoldo");



// // API de Análise / Consultas Embrapa


async function openMateo(){
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,precipitation_probability_max,et0_fao_evapotranspiration,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m&minutely_15=temperature_2m,relative_humidity_2m,rain,precipitation,apparent_temperature,global_tilted_irradiance,wind_speed_10m'
    try{
      const resposta = await fetch(url)

      const dados = await resposta.json
      console.log(`dados: ${dados}\n`)

    }catch(error){
  console.log(`deu errado na comunicação: ${error}`)
    }
}

openMateo()

