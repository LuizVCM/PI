const barraNível = document.getElementById('barraUmidade')
const valor = document.querySelector(".valor-grande")


async function barra() {
    
    const api = "https://api.open-meteo.com/v1/forecast?latitude=-29.7603&longitude=-51.1472&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,precipitation_probability_max,et0_fao_evapotranspiration,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m&minutely_15=temperature_2m,relative_humidity_2m,rain,precipitation,apparent_temperature,global_tilted_irradiance,wind_speed_10m,shortwave_radiation&timezone=America%2FSao_Paulo"

    try {
        const resposta = await fetch(api)
        const dados = await resposta.json()

        console.log(dados)

        const umidade = dados.minutely_15.relative_humidity_2m.at(-1) - 0

        console.log("Umidade:", umidade)
        barraNível.style.width = `${umidade}%`
        valor.textContent = `${umidade}%`

    } catch (error) {
        console.log(`Erro ao conectar com a API: ${error}`)
    }
}

setTimeout(barra, 1000)
