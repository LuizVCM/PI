export async function buscarDadosEmbrapa() {
  const key = process.env.EMBRAPA_CONSUMER_KEY;
  const secret = process.env.EMBRAPA_CONSUMER_SECRET;
  
  // 1. Converte as credenciais
  const credenciais = Buffer.from(`${key}:${secret}`).toString('base64');

  // 2. Faz a requisição do Token
  const reqToken = await fetch("https://api.cnptia.embrapa.br/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credenciais}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  // A MÁGICA DA SIMPLIFICAÇÃO AQUI: 
  // Avisamos pro TS que o retorno tem um 'access_token' direto na linha.
  const dadosToken = await reqToken.json() as { access_token: string };
  const token = dadosToken.access_token;

  // 3. Usa o token para buscar as estações (ou outra rota)
  const reqDados = await fetch("https://api.cnptia.embrapa.br/v1/agritempo/estacoes", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  // Retorna os dados finais
  return reqDados.json();
}