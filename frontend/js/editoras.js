const tabela = document.getElementById("tabela-editora");
const modal = document.getElementById("popup-registrar");
const botaoFechar = document.querySelector(".botao-fechar");
const form = document.getElementById("formEditora");
const campoBusca = document.getElementById("buscarEditora");
const botaoAbrirModal = document.getElementById("abrirModal");
const botaoRegistrarPopUp = document.getElementById("botao-registrar");

let editoraEditando = null;
let editoras = JSON.parse(localStorage.getItem("editoras")) || [];

/* GERAR ID PEQUENO */
function gerarId(lista) {
  if (lista.length === 0) return 1;
  return lista[lista.length - 1].id + 1;
}

/* RENDERIZAR TABELA */
function renderTabela(lista = editoras) {
  tabela.innerHTML = "";

  if (lista.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="7">Nenhuma editora cadastrada</td>
      </tr>
    `;
    return;
  }

  lista.forEach((editora, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${editora.id}</td>
        <td>${editora.cnpj}</td>
        <td>${editora.nome}</td>
        <td>${editora.isbn}</td>
        <td>${editora.telefone}</td>
        <td>${editora.email}</td>
        <td>
            <button onclick="editarEditora(${index})" class="botao-editar">EDITAR</button>
            <button onclick="apagarEditora(${index})" class="botao-editar">APAGAR</button>
        </td>
    `;

    tabela.appendChild(linha);
  });
}

/* ABRIR POPUP */
botaoAbrirModal.onclick = function () {
  modal.showModal();
};

/* FECHAR POPUP */
botaoFechar.onclick = function () {
  editoraEditando = null;
  form.reset();
  botaoRegistrarPopUp.textContent = "Registrar editora";
  modal.close();
};

/* REGISTRAR OU EDITAR EDITORA */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let nome = document.getElementById("nomeEditora").value.trim();
  let cnpj = document.getElementById("CNPJEditora").value;
  let isbn = document.getElementById("ISBNEditora").value;
  let telefone = document
    .getElementById("telefoneEditora")
    .value.replace(/\D/g, "");
  let email = document.getElementById("EmailEditora").value;

  if (!nome) {
    alert("Digite um nome válido.");
    return;
  }

  const cnpjExiste = editoras.some((editora, index) => {
    return editora.cnpj === cnpj && index !== editoraEditando;
  });

  if (cnpjExiste) {
    alert("Já existe uma editora com esse CNPJ.");
    return;
  }

  const editora = {
    id:
      editoraEditando !== null
        ? editoras[editoraEditando].id
        : gerarId(editoras),
    nome,
    cnpj,
    isbn,
    telefone,
    email,
  };

  if (editoraEditando !== null) {
    editoras[editoraEditando] = editora;
    editoraEditando = null;
  } else {
    editoras.push(editora);
  }

  localStorage.setItem("editoras", JSON.stringify(editoras));

  renderTabela();

  form.reset();
  botaoRegistrarPopUp.textContent = "Registrar editora";
  modal.close();
});

/* EDITAR EDITORA */
function editarEditora(index) {
  const editora = editoras[index];

  document.getElementById("nomeEditora").value = editora.nome;
  document.getElementById("CNPJEditora").value = editora.cnpj;
  document.getElementById("ISBNEditora").value = editora.isbn;
  document.getElementById("telefoneEditora").value = editora.telefone;
  document.getElementById("EmailEditora").value = editora.email;

  editoraEditando = index;

  botaoRegistrarPopUp.textContent = "Salvar edição";

  modal.showModal();
}

/* APAGAR EDITORA */
function apagarEditora(index) {
  const confirmar = confirm("Tem certeza que deseja apagar esta editora?");

  if (!confirmar) return;

  editoras.splice(index, 1);

  localStorage.setItem("editoras", JSON.stringify(editoras));

  renderTabela();
}

/* PESQUISAR EDITORA */
campoBusca.addEventListener("input", function () {
  const texto = campoBusca.value.toLowerCase();

  const filtradas = editoras.filter(
    (editora) =>
      editora.nome.toLowerCase().includes(texto) ||
      editora.cnpj.toLowerCase().includes(texto) ||
      editora.isbn.toLowerCase().includes(texto),
  );

  renderTabela(filtradas);
});

renderTabela();

window.editarEditora = editarEditora;
window.apagarEditora = apagarEditora;
