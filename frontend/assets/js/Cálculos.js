
// consumo de API meteorológica
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
export async function openMateo() {
    const plantasAPI = 'http://localhost:3000/plants/me';
    const select = document.getElementById("sementeInfo")

    try {  
          const teste = await fetch(plantasAPI, {credentials: 'include'});
      const plantas = await teste.json()
      console.log("Plantas: ",{plantas})
       
         const textoSelecionado = select.options[select.selectedIndex].text;
   console.log(textoSelecionado)

      // pega cep
        const user = "http://localhost:3000/users/me"
      const consumo0 = await fetch(user, { credentials: 'include' });
      const usuario0 = await consumo0.json();


      const coordenadasGeograficas = `https://brasilapi.com.br/api/cep/v2/${usuario0.territorios[0].cep}`;
      const coordenar = await fetch(coordenadasGeograficas);
      const coordenadasCidade = await coordenar.json();

      console.log(coordenadasCidade)
      console.log("testado")
        
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordenadasCidade.location.coordinates.latitude}&longitude=${coordenadasCidade.location.coordinates.longitude}&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,precipitation_probability_max,et0_fao_evapotranspiration,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m&minutely_15=temperature_2m,relative_humidity_2m,rain,precipitation,apparent_temperature,global_tilted_irradiance,wind_speed_10m,shortwave_radiation&timezone=America%2FSao_Paulo&forecast_days=1`
        const resposta = await fetch(url)

        const dados = await resposta.json()
        console.log(`dados: ${dados}\n`)
      
        const indiceLimite = 112; // índice para 1 dia de 15 em 15 minutos   

        let P = 5  // valor imaginário da pressão de sensor de pressão atmosférica
// TEMPERATURA ATUA -----------------------------------------------------
    const atual = new Date().getHours() - 1
    console.log("Temperature atual: ",atual)
        let T = (dados.hourly.temperature_2m[atual]) //temperatura medida pela API meteorológica como temperatura_2m

// RADIAÇÃO ÚTIL ---------------------------------------------------
        let Rn = (dados.minutely_15.global_tilted_irradiance) //radiação útil
        let somaRn = 0; 

        let elementosPercorridosRn = 0;
        
        for (let i = 0; i <= indiceLimite; i++) {
  // Segurança: verifica se o índice realmente existe no array
  if (Rn[i] !== undefined) {
    somaRn += Rn[i];
    elementosPercorridosRn++;
  }
}
  const mediaRn = elementosPercorridosRn > 0 ? somaRn / elementosPercorridosRn : 0;

console.log("Soma total do período:", somaRn);      
console.log("Elementos lidos:", elementosPercorridosRn);
console.log("Média calculada:", mediaRn);  

//---------------------------------------------------------------------------------



        // recebida por API meteorológica
        let G = 20 // valor imaginário de fluxo de calor recebido por sensor de temperatura do solo
        let u2 = (dados.minutely_15.wind_speed_10m.at(1))// valor imaginário de vento recebido por API meteorológica  
        let UR = (dados.minutely_15.relative_humidity_2m.at(1)) // umidade relativa do ar recebido por API meteorológica

        let precipitacaoAtual = (dados.minutely_15.precipitation.at(1))

        let rs = 70  // valor médio de resistência de superfície preescrito pela FAO

        // Operações iniciais de variáveis:

        // Y 

        let y = 0.665 * (1 / 10) ** 3 * P // contante psicrométrica medida em kPa/°C

        let x1 = (17.27 * T) / (T + 237.3)  // função da temperatura para o Euler

        let exp1 = 2.71828 ** x1  // função exponencial natural com o número Euler em função da temperatura

        let delta1 = (4098 * (0.6108 * exp1)) / (T + 237.3) ** 2

        let es = 0.6108 * exp1

        let ea = es * (UR / 100)

        let deltaE = (dados.hourly.vapour_pressure_deficit[0])

        // resistência estomatos
        let k = y * (900 / (T + 273)) * u2 * deltaE

        let E = (k * (es - ea)) / rs

        // evapotranspiração de referência
        let ETo = (0.408 * delta1 * (mediaRn - G) + (y * 900 * u2 * (es - ea) / (T + 273))) / (delta1 + (y * (1 + 0.34 * u2)))


        // evaporanspiração de cultura

        let ETc = ETo * ((Number(faoKcData.Broccoli.kc_end) + Number(faoKcData.Broccoli.kc_ini) + Number(faoKcData.Broccoli.kc_mid)) / 3)  // O consumo de 3 valores do objeto é para representar uma média do coeficiente de cultivo Kc

        console.log(`pressão atmosférica: ${P} kPa\n`)
        console.log(`temperatura: ${T} °C\n`)
        console.log(`radiação útil: ${mediaRn}\n`)
        console.log(`fluxo de calor: ${G} °C \n`)
        console.log(`vento: ${u2} \n`)
        console.log(`umidade relativa do ar: ${UR} %`)
        console.log(`resistência da superfície da planta: ${rs} mm\n`)
        console.log("-------------------------------------------------\n")
        console.log(`constante psicrométrica y : ${y}\n`)
        console.log(`expoente da função de Euler (x): ${x1}\n`)
        console.log(`função exponencial natural de Euler: ${exp1}\n`)
        console.log(`coeficiente delta: ${delta1}\n`)
        console.log(`tensão de vapor: ${ea}\n`)
        console.log(`tensão de saturação: ${es}\n`)
        console.log(`défit de vapor: ${deltaE}\n`)
        console.log(`contante K: ${k}\n`)
        console.log(`Evapotranspiração da planta: ${E}\n`)
        console.log(`Evapotranspiração de referência: ${ETo}\n`)
        console.log(`evapotranspiração da cultura: ${ETc}`)

        console.log(`precipitação do dia: ${precipitacaoAtual}mm/h`)
    


        // capturar informações 
    } catch (error) {
        console.log(`deu errado na comunicação: ${error}`)
    }
}

openMateo()

