const lista = document.getElementById("lista");
const input = document.getElementById("texto");
const btn = document.getElementById("btn");

let dados = JSON.parse(localStorage.getItem("hortaPET")) || [];

function salvar() {
  localStorage.setItem("hortaPET", JSON.stringify(dados));
}

function diasPassados(data) {
  return Math.floor((Date.now() - new Date(data)) / 86400000);
}

function render() {
  lista.innerHTML = "";

  dados.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="texto">${item.texto}</div>
      <div class="dias">📆 ${diasPassados(item.data)} dias</div>
      <button onclick="concluir(${index})">Concluir</button>
    `;

    lista.appendChild(div);
  });
}

btn.addEventListener("click", () => {
  const texto = input.value.trim();
  if (!texto) return;

  dados.push({
    texto,
    data: new Date()
  });

  salvar();
  render();
  input.value = "";
});

function concluir(index) {
  dados.splice(index, 1);
  salvar();
  render();
}

render();