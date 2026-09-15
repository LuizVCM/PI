import { formatarData, escapeHtml, capitalizar } from "../utils/formatter.js";
const select = document.getElementById("sementeInfo")

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
    }catch(error){
console.log("deu errado na requisição de plantas: "+ error)
    }
}
trazerPlantas()
setInterval(trazerPlantas, 1000000)

