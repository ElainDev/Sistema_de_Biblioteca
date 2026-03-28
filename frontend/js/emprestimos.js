const tabela = document.getElementById("tabelaUsuarios");
const campoBusca = document.getElementById("buscarRegistro");
const infoTabela = document.getElementById("infoTabela");

const modal = document.getElementById("popupRegistrar");
const botaoAbrir = document.querySelector(".botaoRegistrar");
const botaoFechar = document.querySelector(".botaoFechar");
const form = document.getElementById("formUsuario");

const inputUsuario = document.getElementById("inputUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");

let emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const listaLivros = document.getElementById("listaLivros");
let livros = JSON.parse(localStorage.getItem("livros")) || [];

const btnImprimirGeral = document.getElementById("btnImprimirGeral");

let paginaAtual = 1;
let limite = 10;

/* GERAR ID DA TABELA */
function gerarId(lista) {
  if (lista.length === 0) return 1;
  return lista[lista.length - 1].id + 1;
}

/* DATAS AUTOMÁTICAS */
function hojeFormatado() {
  return new Date().toISOString().split("T")[0];
}

function adicionar7Dias(data) {
  let nova = new Date(data);
  nova.setDate(nova.getDate() + 7);
  return nova.toISOString().split("T")[0];
}

/* ABRIR POPUP */
botaoAbrir.onclick = () => {
  modal.showModal();

  let hoje = hojeFormatado();
  document.getElementById("dataEmprestimo").value = hoje;
  document.getElementById("dataDevolucao").value = adicionar7Dias(hoje);

  carregarUsuariosDatalist();
  carregarLivrosDatalist();
};
/* FECHR POPUP */
botaoFechar.onclick = () => {
  form.reset();
  modal.close();
};

/* DATASLIST USUÁRIOS */
function carregarUsuariosDatalist() {
  listaUsuarios.innerHTML = "";

  usuarios.forEach((u) => {
    const option = document.createElement("option");
    option.value = `${u.nome} (${u.matricula})`;
    listaUsuarios.appendChild(option);
  });
}

function carregarLivrosDatalist() {
  listaLivros.innerHTML = "";

  livros.forEach((l) => {
    const option = document.createElement("option");
    option.value = l.titulo;
    listaLivros.appendChild(option);
  });
}

/* REGISTRAR */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const novo = {
    id: gerarId(emprestimos),
    usuario: inputUsuario.value,
    livro: document.getElementById("inputLivro").value,
    dataEmprestimo: document.getElementById("dataEmprestimo").value,
    dataDevolucao: document.getElementById("dataDevolucao").value,
    quantidade: document.getElementById("quantidade").value,
    status: "pendente",
  };

  emprestimos.push(novo);

  localStorage.setItem("emprestimos", JSON.stringify(emprestimos));

  renderTabela();

  form.reset();
  modal.close();
});

/* STATUS AUTOMÁTICO */
function verificarStatus(item) {
  if (item.status === "devolvido") return "devolvido";
  return new Date() > new Date(item.dataDevolucao) ? "pendente" : "emDia";
}

/* RENDER TABELA */
function renderTabela(lista = emprestimos) {
  tabela.innerHTML = "";

  if (lista.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="8">Nenhum empréstimo cadastrado</td>
      </tr>
    `;
    infoTabela.textContent = "";
    return;
  }

  let inicio = (paginaAtual - 1) * limite;
  let fim = inicio + limite;

  let listaLimitada = lista.slice(inicio, fim);

  listaLimitada.forEach((item, index) => {
    let classe = verificarStatus(item);

    const linha = document.createElement("tr");
    if (classe) {
      linha.classList.add(classe);
    }

    linha.innerHTML = `
      <td>${item.id}</td>
      <td>${item.usuario}</td>
      <td title="${item.livro}">${item.livro}</td>
      <td>${item.dataEmprestimo}</td>
      <td>${item.dataDevolucao}</td>
      <td>${item.quantidade}</td>
      <td>${classe === "devolvido" ? "Devolvido" : classe === "pendente" ? "Atrasado" : "Em dia"}</td>
      <td>
        ${
          item.status !== "devolvido"
            ? `
          <button onclick="devolver(${inicio + index})" class="botaoEditar">DEVOLVER</button>
          <button onclick="apagar(${inicio + index})" class="botaoEditar">APAGAR</button>
        `
            : `<span>✔</span>`
        }
      </td>
    `;

    tabela.appendChild(linha);
  });

  let total = lista.length;

  infoTabela.textContent = `Mostrando ${inicio + 1} a ${Math.min(fim, total)} de ${total} registros`;

  const paginaTexto = document.getElementById("paginaAtualTexto");

  if (paginaTexto) {
    paginaTexto.textContent = `Página ${paginaAtual}`;
  }
}

function proximaPagina() {
  let totalPaginas = Math.ceil(emprestimos.length / limite);

  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    renderTabela();
  }
}

function paginaAnterior() {
  if (paginaAtual > 1) {
    paginaAtual--;
    renderTabela();
  }
}

/* BOTÃO DE DEVOLVER */
function devolver(index) {
  emprestimos[index].status = "devolvido";

  localStorage.setItem("emprestimos", JSON.stringify(emprestimos));

  renderTabela();
}

/* BOTÃO DE APAGAR REGISTRO */
function apagar(index) {
  const confirmar = confirm("Deseja apagar esse registro?");
  if (!confirmar) return;

  emprestimos.splice(index, 1);

  localStorage.setItem("emprestimos", JSON.stringify(emprestimos));

  renderTabela();
}

/* CAMPO DE BUSCA */
campoBusca.addEventListener("input", function () {
  const texto = campoBusca.value.toLowerCase();

  const filtrados = emprestimos.filter(
    (e) =>
      e.usuario.toLowerCase().includes(texto) ||
      e.livro.toLowerCase().includes(texto),
  );

  paginaAtual = 1;
  renderTabela(filtrados);
});

/* PAGINAÇÃO */
function mudarLimite(valor) {
  limite = valor;
  paginaAtual = 1;
  renderTabela();
}

/* BOTÃO DE IMPRIMIR TABELA */
btnImprimirGeral.onclick = () => {
  const backupPagina = paginaAtual;
  const backupLimite = limite;
  paginaAtual = 1;
  limite = emprestimos.length;
  renderTabela();
  window.print();
  paginaAtual = backupPagina;
  limite = backupLimite;
  renderTabela();
};

/* INICIAR */
renderTabela();
