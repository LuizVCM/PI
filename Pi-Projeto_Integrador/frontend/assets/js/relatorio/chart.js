async function dadosNaturais() {
  const api = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-29.7603&longitude=-51.1472&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,precipitation_probability_max,et0_fao_evapotranspiration,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m&minutely_15=temperature_2m,relative_humidity_2m,rain,precipitation,apparent_temperature,global_tilted_irradiance,wind_speed_10m,shortwave_radiation&timezone=America%2FSao_Paulo`)

  const resposta = await api.json()

var options = {
  series: [
    {
      name: 'Ganho - 2026',
      data: [28, 29, 33, 36, 32, 32, 33, 19, 25, 15, 40], // informações que apareceram no gráfico de ganho
    },
    {
      name: 'Perca - 2026',
      data: [12, 11, 14, 18, 17, 13, 13, 20, 10, 8, 5], // informações que apareceram no gráfico de perdas
    },
  ],
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ['#4fb945ff', '#aa0707ff'], // cores das linhas do gráfico
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth', // tipo de curva entre os dados, no caso uma curva suave
  },
  title: {
    text: 'gráfico de ganhos e perdas financeiras', // título total
    align: 'left', // posição deste título
  },
  grid: {
    borderColor: '#e7e7e7',
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez'], // dados do eixo X que serão analisados
    title: {
      text: 'Meses', // texto para este eixo
    },
  },
  yaxis: {
    title: {
      text: 'valor por R$ 1000.00', // texto para o eixo Y
    },
    min: 5,
    max: 40,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
}

var chart = new ApexCharts(document.querySelector('#chart'), options)
chart.render()

// gráfico dos adubos   
let options2 = {
  series: [
    {
      name: 'quant. adubo',
      data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65],
    },
  ],
  chart: {
    height: 350,
    type: 'bar',
    toolbar:{
        show: false
    }
  },
  title: {
    text: 'Gráfico de gasto de adubo',
    align: 'left',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '50%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  xaxis: {
    labels: {
      rotate: -45,
    },
    categories: [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ],
    tickPlacement: 'on',
  },
  yaxis: {
    title: {
      text: 'valor por kg',
    },
    
  },
  responsive:[  // responsividade
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 280
        },
        xaxis: {
          labels: {
            rotate: -90
          }
        }
      }
    },
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 220
        },
        title: {
          style: {
          }
        }
      }
    },
  
  ],
}

var chart = new ApexCharts(document.querySelector('#adubo'), options2)
chart.render()

// clima 

mediaTempMin = (resposta.daily.temperature_2m_min.at(-1) - resposta.daily.temperature_2m_min.at(0))

mediaTempoMax = (resposta.daily.temperature_2m_max.at(-1) - resposta.daily.temperature_2m_max.at(0))
var clima = {
  series: [
    {
      name: 'Temperatura local',
      data: [
        {
          x: 'Jan',
          y: [mediaTempMin, mediaTempoMax],
        },
        {
          x: 'Fev',
          y: [mediaTempMin, mediaTempoMax],
        },
        {
          x: 'Mar',
          y: [0, 0],
        },
        {
          x: 'Abr',
          y: [0, 0],
        },
        {
          x: 'Maio',
          y: [0, 0],
        },
        {
          x: 'Jun',
          y: [0, 0],
        },
        {
          x: 'Jul',
          y: [0, 0],
        },
        {
          x: 'Ago',
          y: [0, 0],
        },
        {
          x: 'Set',
          y: [0, 0],
        },
        {
          x: 'Out',
          y: [0, 0],
        },
        {
          x: 'Nov',
          y: [0, 0],
        },
        {
          x: 'Dez',
          y: [0, 0],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'rangeArea',
    toolbar:{
        show: false
    }
  },
  colors:['orange'],
  stroke: {
    curve: 'monotoneCubic',
  },
  title: {
    text: 'Temperatura local',
  },
  markers: {
    hover: {
      sizeOffset: 5,
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      formatter: (val) => {
        return val + '°C'
      },
    },
  },
}

var chart = new ApexCharts(document.querySelector('#temp'), clima)
chart.render()

// vento
var vento = {
  series: [
    {
      name: 'vento local',
      data: [
        {
          x: 'Jan',
          y: [-6, 2],
        },
        {
          x: 'Fev',
          y: [0, 8],
        },
        {
          x: 'Mar',
          y: [5, 13],
        },
        {
          x: 'Abr',
          y: [8, 16],
        },
        {
          x: 'Maio',
          y: [13, 21],
        },
        {
          x: 'Jun',
          y: [18, 26],
        },
        {
          x: 'Jul',
          y: [21, 29],
        },
        {
          x: 'Ago',
          y: [21, 29],
        },
        {
          x: 'Set',
          y: [17, 25],
        },
        {
          x: 'Out',
          y: [11, 19],
        },
        {
          x: 'Nov',
          y: [6, 14],
        },
        {
          x: 'Dez',
          y: [1, 9],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'rangeArea',
    toolbar:{
        show: false
    }
  },
  colors: ['lightgreen'],
  stroke: {
    curve: 'monotoneCubic',
  },
  title: {
    text: 'Vento local',
  },
  markers: {
    hover: {
      sizeOffset: 5,
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      formatter: (val) => {
        return val + 'km/h'
      },
    },
  },
}

var chart = new ApexCharts(document.querySelector('#vento'), vento)
chart.render()

//chuva
var chuva = {
  series: [
    {
      name: 'Chuva local',
      data: [
        {
          x: 'Jan',
          y: [-2, 4],
        },
        {
          x: 'Fev',
          y: [-1, 6],
        },
        {
          x: 'Mar',
          y: [3, 10],
        },
        {
          x: 'Abr',
          y: [8, 16],
        },
        {
          x: 'Maio',
          y: [13, 22],
        },
        {
          x: 'Jun',
          y: [18, 26],
        },
        {
          x: 'Jul',
          y: [21, 29],
        },
        {
          x: 'Ago',
          y: [21, 28],
        },
        {
          x: 'Set',
          y: [17, 24],
        },
        {
          x: 'Out',
          y: [11, 18],
        },
        {
          x: 'Nov',
          y: [6, 12],
        },
        {
          x: 'Dez',
          y: [1, 7],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'rangeArea',
    toolbar:{
        show: false
    }
  },
  colors:['lightblue'],
  stroke: {
    curve: 'monotoneCubic',
  },
  title: {
    text: 'Chuva local',
  },
  markers: {
    hover: {
      sizeOffset: 5,
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      formatter: (val) => {
        return val + 'mm'
      },
    },
  },
}

var chart = new ApexCharts(document.querySelector('#chuva'), chuva)
chart.render()
}

dadosNaturais()