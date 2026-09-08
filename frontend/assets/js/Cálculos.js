const faoKcData = {
    "Broccoli": {
        category: "a. Small Vegetables",
        kc_ini: "0.70", kc_mid: "1.05",
        kc_end: "0.95", max_height_m: "0.3"
    },
    "Cabbage": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "1.05",
        kc_end: "0.95",
        max_height_m: "0.4"
    },
    "Carrots": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "1.05",
        kc_end: "0.95",
        max_height_m: "0.3"
    },
    "Cauliflower": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "1.05",
        kc_end: "0.95",
        max_height_m: "0.4"
    },
    "Celery": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "1.05",
        kc_end: "0.95",
        max_height_m: "0.6"
    },
    "Garlic": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "1.00",
        kc_end: "0.70",
        max_height_m: "0.3"
    },
    "Lettuce": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "1.00",
        kc_end: "0.95",
        max_height_m: "0.3"
    },
    "Onions (dry)": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "1.05",
        kc_end: "0.75",
        max_height_m: "0.4"
    },
    "Onions (green)": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "1.00",
        kc_end: "1.00",
        max_height_m: "0.3"
    },
    "Spinach": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",

        kc_mid: "1.00",
        kc_end: "0.95",
        max_height_m: "0.3"
    },
    "Radish": {
        category: "a. Small Vegetables",
        kc_ini: "0.70",
        kc_mid: "0.90",
        kc_end: "0.90",
        max_height_m: "0.3"
    },
    "EggPlant": {
        category: "b. Vegetables - Solanum Family (Nightshade)",
        kc_ini: "0.60",
        kc_mid: "1.05",
        kc_end: "0.90",
        max_height_m: "0.8"
    },
    "Sweet Peppers (bell)": {
        category: "b. Vegetables - Solanum Family (Nightshade)",
        kc_ini: "0.60",
        kc_mid: "1.05",
        kc_end: "0.90",
        max_height_m: "0.7"
    },
    "Tomato": {
        category: "b. Vegetables - Solanum Family (Nightshade)",
        kc_ini: "0.60",
        kc_mid: "1.15",
        kc_end: "0.70-0.90",
        max_height_m: "0.6"
    },
    "Cantaloupe": {
        category: "c. Vegetables - Cucurbit Family (Melons)",
        kc_ini: "0.50",
        kc_mid: "0.85",
        kc_end: "0.60",
        max_height_m: "0.3"
    },
    "Cucumber": {
        category: "c. Vegetables - Cucurbit Family (Melons)",
        kc_ini: "0.60",
        kc_mid: "1.00",
        kc_end: "0.75",
        max_height_m: "0.3"
    },
    "Pumpkin, Winter Squash": {
        category: "c. Vegetables - Cucurbit Family (Melons)",
        kc_ini: "0.50",
        kc_mid: "1.00",
        kc_end: "0.80",
        max_height_m: "0.4"
    },
    "Squash, Zucchini": {
        category: "c. Vegetables - Cucurbit Family (Melons)",
        kc_ini: "0.50",
        kc_mid: "0.95",
        kc_end: "0.75", max_height_m: "0.3"
    },
    "Watermelon": {
        category: "c. Vegetables - Cucurbit Family (Melons)",
        kc_ini: "0.40",
        kc_mid: "1.00",
        kc_end: "0.75",
        max_height_m: "0.4"
    },
    "Beets, table": {
        category: "d. Roots and Tubers",
        kc_ini: "0.50",
        kc_mid: "1.05",
        kc_end: "0.95",
        max_height_m: "0.4"
    },
    "Cassava": {
        category: "d. Roots and Tubers",
        kc_ini: "0.30",
        kc_mid: "0.80-1.10",
        kc_end: "0.30",
        max_height_m: "1.5"
    },
    "Potato": {
        category: "d. Roots and Tubers",
        kc_ini: "0.50",
        kc_mid: "1.15",
        kc_end: "0.75",
        max_height_m: "0.6"
    },
    "Sweet Potato": {
        category: "d. Roots and Tubers",
        kc_ini: "0.50",
        kc_mid: "1.15",
        kc_end: "0.65",
        max_height_m: "0.4"
    },
    "Turnip": {
        category: "d. Roots and Tubers",
        kc_ini: "0.50",
        kc_mid: "1.10",
        kc_end: "0.95",
        max_height_m: "0.6"
    },
    "Sugarbeet": {
        category: "d. Roots and Tubers",
        kc_ini: "0.35",
        kc_mid: "1.20",
        kc_end: "0.70",
        max_height_m: "0.5"
    },
    "Beans, green": {
        category: "e. Legumes (Macronutrient)",
        kc_ini: "0.50",
        kc_mid: "1.05",
        kc_end: "0.90",
        max_height_m: "0.4"
    },
    "Beans, dry and Pulses": {
        category: "e. Legumes (Macronutrient)",
        kc_ini: "0.40",
        kc_mid: "1.15",
        kc_end: "0.35",
        max_height_m: "0.4"
    },
    "Lentil": {
        category: "e. Legumes (Macronutrient)",
        kc_ini: "0.40",
        kc_mid: "1.10",
        kc_end: "0.30",
        max_height_m: "0.5"
    },
    "Peas": {
        category: "e. Legumes (Macronutrient)",
        kc_ini: "0.50",
        kc_mid: "1.15",
        kc_end: "1.10",
        max_height_m: "0.5"
    },
    "Soybeans": {
        category: "e. Legumes (Macronutrient)",
        kc_ini: "0.40",
        kc_mid: "1.15",
        kc_end: "0.50",
        max_height_m: "0.7"
    },
    "Artichokes": {
        category: "f. Perennial Vegetables",
        kc_ini: "0.50",
        kc_mid: "1.05",
        kc_end: "0.95",
        max_height_m: "1.2"
    },
    "Asparagus": {
        category: "f. Perennial Vegetables",
        kc_ini: "0.30",
        kc_mid: "0.95",
        kc_end: "0.30",
        max_height_m: "1.5"
    },
    "Cotton": {
        category: "g. Fibre Crops",
        kc_ini: "0.35",
        kc_mid: "1.15-1.20",
        kc_end: "0.70-0.50",
        max_height_m: "1.2-1.5"
    },
    "Flax": {
        category: "g. Fibre Crops",
        kc_ini: "0.30",
        kc_mid: "1.10",
        kc_end: "0.25",
        max_height_m: "1.2"
    },
    "Sisal": {
        category: "g. Fibre Crops",
        kc_ini: "0.35",
        kc_mid: "0.35",
        kc_end: "0.35",
        max_height_m: "1.5"
    },
    "Castorbean": {
        category: "h. Oil Crops",
        kc_ini: "0.30",
        kc_mid: "1.15",
        kc_end: "0.55",
        max_height_m: "3.0"
    },
    "Sunflower": {
        category: "h. Oil Crops",
        kc_ini: "0.35",
        kc_mid: "1.00-1.15",
        kc_end: "0.35",
        max_height_m: "2.0"
    },
    "Barley / Oats / Wheat": {
        category: "i. Cereals",
        kc_ini: "0.30",
        kc_mid: "1.15",
        kc_end: "0.25-0.40",
        max_height_m: "1.0"
    },
    "Maize, sweet": {
        category: "i. Cereals",
        kc_ini: "0.30",
        kc_mid: "1.15",
        kc_end: "1.05",
        max_height_m: "1.5"
    },
    "Maize, grain": {
        category: "i. Cereals",
        kc_ini: "0.30",
        kc_mid: "1.20",
        kc_end: "0.35-0.60",
        max_height_m: "2.0"
    },
    "Sorghum": {
        category: "i. Cereals",
        kc_ini: "0.30",
        kc_mid: "1.00-1.10",
        kc_end: "0.55",
        max_height_m: "1.0-2.0"
    },
    "Alfalfa (hay)": {
        category: "j. Forages",
        kc_ini: "0.40",
        kc_mid: "0.95-1.05",
        kc_end: "0.90-1.05",
        max_height_m: "0.7"
    },
    "Sugar Cane": {
        category: "k. Sugar Cane",
        kc_ini: "0.40",
        kc_mid: "1.25",
        kc_end: "0.75",
        max_height_m: "3.0"
    },
    "Banana (1st year)": {
        category: "l. Tropical Fruits and Trees",
        kc_ini: "0.50",
        kc_mid: "1.10",
        kc_end: "1.00",
        max_height_m: "3.0"
    },
    "Coffee (bare ground)": {
        category: "l. Tropical Fruits and Trees",
        kc_ini: "0.90",
        kc_mid: "0.95",
        kc_end: "0.95",
        max_height_m: "2.0-3.0"
    },
    "Grapes": {
        category: "m. Grapes and Berries",
        kc_ini: "0.30",
        kc_mid: "0.85",
        kc_end: "0.45",
        max_height_m: "2.0"
    },
    "Apples, Cherries (no ground cover)": {
        category: "n. Fruit Trees",
        kc_ini: "0.45",
        kc_mid: "0.95",
        kc_end: "0.70",
        max_height_m: "3.0-4.0"
    },
    "Citrus (no ground cover)": {
        category: "n. Fruit Trees",
        kc_ini: "0.70",
        kc_mid: "0.65",
        kc_end: "0.70",
        max_height_m: "4.0"
    },
    "Rice": {
        category: "o. Wetlands",
        kc_ini: "1.05",
        kc_mid: "1.20",
        kc_end: "0.90-0.60",
        max_height_m: "1.0"
    }
};




//consumo de APIs e testes com informações

let P = 5  // valor imaginário da pressão de sensor de pressão atmosférica
let T = 37 // valor imaginário da temperatura medida por sensor de temperatura 
let Rn = 12 // valor imaginário de radiação útil recebida por API meteorológica
let G = 20 // valor imaginário de fluxo de calor recebido por sensor de temperatura do solo
let u2 = 16 // valor imaginário de vento recebido por API meteorológica  
let UR = 10 // valor imaginário de umidade relativa do ar recebido por sensor de de umidade do ambiente e API

let rs = 70 // valor médio de resistência de superfície preescrito pela FAO

// Operações iniciais de variáveis:

// Y 

let y = 0.665 * (1 / 10) ** 3 * P // contante psicrométrica medida em kPa/°C

let x1 = (17.27 * T) / (T + 237.3)  // função da temperatura para o Euler

let exp1 = 2.71828 ** x1  // função exponencial natural com o número Euler em função da temperatura

let delta1 = (4098 * (0.6108 * exp1)) / (T + 237.3) ** 2

let es = 0.6108 * exp1

let ea = es * (UR / 100)

let deltaE = es - ea

// resistência estomatos
let k = y * (900 / (T + 273)) * u2 * deltaE

let E = (k * (es - ea)) / rs

// evapotranspiração de referência
let ETo = (0.408 * delta1 * (Rn - G) + (y * 900 * u2 * (es - ea) / (T + 273))) / (delta1 + (y * (1 + 0.34 * u2)))


// evaporanspiração de cultura

let ETc = ETo * ((Number(faoKcData.Broccoli.kc_end) + Number(faoKcData.Broccoli.kc_ini) + Number(faoKcData.Broccoli.kc_mid))/3)  // O consumo de 3 valores do objeto é para representar uma média do coeficiente de cultivo Kc

console.log(`pressão atmosférica: ${P}\n`)
console.log(`temperatura: ${T}\n`)
console.log(`radiação útil: ${Rn}\n`)
console.log(`fluxo de calor: ${G} \n`)
console.log(`vento: ${u2} \n`)
console.log(`umidade relativa do ar: ${UR}`)
console.log(`resistência da superfície da planta: ${rs} \n`)
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

