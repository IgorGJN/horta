const regras = {
  coentro: { nome: "Coentro", rega: 1, colheita: 35 },
  alface: { nome: "Alface crespa", rega: 1, colheita: 40 },
  cebolinha: { nome: "Cebolinha", rega: 2, colheita: 60 },
  tomate: { nome: "Tomate", rega: 2, colheita: 90 },
  pimenta: { nome: "Pimenta de cheiro", rega: 3, colheita: 90 }
};

let dados = JSON.parse(localStorage.getItem("hortaPET")) || [];

function salvar() {
  localStorage.setItem("hortaPET", JSON.stringify(dados));
}

function diasPassados(data) {
  return Math.floor((Date.now() - new Date(data)) / 86400000);
}

function adicionar() {
  const planta = document.getElementById("planta").value;
  const pet = document.getElementById("pet").value;

  if (!planta || !pet) return;

  dados.push({
    planta,
    pet,
    data: new Date()
  });

  salvar();
  renderizar();
  document.getElementById("pet").value = "";
}

function renderizar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach((item, i) => {
    const regra = regras[item.planta];
    const dias = diasPassados(item.data);

    let alerta = "";
    if (dias % regra.rega === 0) alerta += "💧 Regar hoje ";
    if (dias >= regra.colheita) alerta += "✂ Colher";

    lista.innerHTML += `
      <div class="planta">
        <div class="nome">${regra.nome}</div>
        <div class="info">🧴 ${item.pet}</div>
        <div class="info">📆 ${dias} dias</div>
        ${alerta ? `<div class="alerta">${alerta}</div>` : ""}
        <button onclick="concluir(${i})">Concluir</button>
      </div>
    `;
  });
}

function concluir(i) {
  dados.splice(i, 1);
  salvar();
  renderizar();
}

renderizar();