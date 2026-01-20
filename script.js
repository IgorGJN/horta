let dados = JSON.parse(localStorage.getItem("hortaPET")) || [];

const regras = {
  "Coentro": { rega: 1, colheita: 35 },
  "Alface crespa": { rega: 1, colheita: 40 },
  "Cebolinha": { rega: 2, colheita: 60 },
  "Tomate": { rega: 2, colheita: 90 },
  "Pimenta de cheiro": { rega: 3, colheita: 90 }
};

function salvar() {
  localStorage.setItem("hortaPET", JSON.stringify(dados));
}


function diasPassados(data) {
  return Math.floor((new Date() - new Date(data)) / 86400000);
}

function gerarAlerta(planta, dias) {
  const regra = regras[planta];
  if (!regra) return "";

  let alertas = [];
  if (dias % regra.rega === 0) alertas.push("💧 Regar hoje");
  if (dias >= regra.colheita) alertas.push("✂ Pronto para colher");

  return alertas.join(" • ");
}

function renderizar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach((item, index) => {
    const dias = diasPassados(item.data);
    const alerta = gerarAlerta(item.planta, dias);

    lista.innerHTML += `
      <div class="card">
        <h3>${item.planta}</h3>
        <div class="info">🧴 ${item.pet}</div>
        <div class="info">📆 ${dias} dias</div>
        ${alerta ? `<div class="alerta">${alerta}</div>` : ""}
        <button onclick="concluir(${index})">Concluir</button>
      </div>
    `;
  });
}

function adicionar() {
  const planta = document.getElementById("planta").value.trim();
  const pet = document.getElementById("pet").value.trim();

  if (!planta || !pet) return;

  dados.push({
    planta,
    pet,
    data: new Date()
  });

  salvar();
  renderizar();

  document.getElementById("planta").value = "";
  document.getElementById("pet").value = "";
}

function concluir(index) {
  dados.splice(index, 1);
  salvar();
  renderizar();
}

renderizar();
