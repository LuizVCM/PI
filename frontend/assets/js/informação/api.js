import { formatarData, escapeHtml, capitalizar } from "../utils/formatter.js";
import { openMateo } from "../Cálculos.js";
const select = document.getElementById("sementeInfo")
const fonecedor = document.querySelector(".loteIdent div");
const nome = document.getElementById("nomePlanta");

const expecativa = document.getElementById("expectativaVida");

const observacoes = document.querySelector(".cartao ul li")

const plantasAPI = 'http://localhost:3000/plants/me';
async function trazerPlantas() {
    try{
      const dados = await fetch(plantasAPI, {credentials: 'include'});
      const plantas = await dados.json()
      console.log({plantas})
      
      if (!select) return;
  select.innerHTML = '<option value="">Selecione...</option>';
  plantas.forEach((p) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${p.id}">${escapeHtml(p.nome)}</option>`
    );
  });
function valor(){
   const textoSelecionado = select.options[select.selectedIndex].text;
   console.log(plantas)

nome.textContent = `nome: ${textoSelecionado}`

const plantaEncontrada = plantas.find(
  (planta) => planta.nome.toLowerCase() === textoSelecionado.toLowerCase()
);

console.log(plantaEncontrada)
fonecedor.textContent = `fornecedor: ${plantaEncontrada.sementes[0].fornecedor}`
expecativa.textContent = `de ${plantaEncontrada.cicloMinimoDias} a ${plantaEncontrada.cicloMaximoDias} dias`
const chavePermanente = nome.textContent 

 localStorage.setItem(chavePermanente, plantaEncontrada.sementes[0].fornecedor);

 observacoes.textContent = `${plantaEncontrada.sementes[0].observacoes}`
}
const botao = document.querySelector(".acessando");
botao.addEventListener("click", valor)

// cálculo 
openMateo()

    }catch(error){
console.log("deu errado na requisição de plantas: "+ error)
    }
}
trazerPlantas()
setInterval(trazerPlantas, 100000)

