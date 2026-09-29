async function previsaoTempo() {
    const latitude = -23.55;
    const longitude = -46.63;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        console.log(dados);
    } catch (error) {
        console.log("Erro:", error);
    }
}


