const temperaturaMedia = document.querySelector(".graus h3")

const umidadeMedia = document.querySelector(".um h1")

const ventoMedio = document.querySelector(".Vento h1")


async function TrocarTemp() {
    const api = 'https://api.open-meteo.com/v1/forecast?latitude=-29.7603&longitude=-51.1472&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,precipitation_probability_max,et0_fao_evapotranspiration,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m&minutely_15=temperature_2m,relative_humidity_2m,rain,precipitation,apparent_temperature,global_tilted_irradiance,wind_speed_10m,shortwave_radiation&timezone=America%2FSao_Paulo&forecast_days=1'

    const resposta = await fetch(api)
    const dados = await resposta.json()

    // altera as máximas e as mínimas da temperatura atual
    temperaturaMedia.textContent = `Máx: ${dados.daily.temperature_2m_max }  · Mín: ${dados.daily.temperature_2m_min} `
   
    // altera a porcentagem atual de umidade no ar
    umidadeMedia.textContent = `${dados.hourly.relative_humidity_2m.at(3)}%`

    // altera o valor de vento 
    ventoMedio.textContent = `${dados.daily.wind_speed_10m_max}km/h`
}

TrocarTemp()