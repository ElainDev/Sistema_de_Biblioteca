const tabela = document.getElementById("tabela-usuarios");
const abrirModal = document.getElementById("abrirModal");
const botaoRegistrarPopUp = document.getElementById("botao-registrar");
const modal = document.getElementById("popup-registrar");
const botaoFechar = document.querySelector(".botao-fechar");
const form = document.getElementById("formUsuario");
const campoBusca = document.getElementById("buscarUsuario");

let usuarioEditando = null;
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

/* GERAR ID PEQUENO */
function gerarId(lista) {
  if (lista.length === 0) return 1;
  return lista[lista.length - 1].id + 1;
}

/* RENDERIZAR TABELA */
function renderTabela(lista = usuarios) {
  tabela.innerHTML = "";

  if (lista.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="7">Nenhum usuário cadastrado</td>
      </tr>
    `;
    return;
  }

  lista.forEach((user, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${user.id}</td>
        <td>${user.matricula}</td>
        <td>${user.nome}</td>
        <td>${user.curso}</td>
        <td>${user.telefone}</td>
        <td>${user.situacao}</td>
        <td>
            <button onclick="editarUsuario(${index})" class="botao-editar">EDITAR</button>
            <button onclick="apagarUsuario(${index})" class="botao-editar">APAGAR</button>
        </td>
    `;

    tabela.appendChild(linha);
  });
}

/* ABRIR POPUP */
abrirModal.onclick = function () {
  modal.showModal();
};

/* FECHAR POPUP */
botaoFechar.onclick = function () {
  usuarioEditando = null;
  form.reset();
  botaoRegistrarPopUp.textContent = "Registrar usuário";
  modal.close();
};

/* REGISTRAR OU EDITAR USUÁRIO */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let nome = document.getElementById("nomeUsuario").value.trim();
  let matricula = document.getElementById("matriculaUsuario").value;
  let curso = document.getElementById("cursoUsuario").value;
  let telefone = document
    .getElementById("telefoneUsuario")
    .value.replace(/\D/g, "");

  if (!nome) {
    alert("Digite um nome válido.");
    return;
  }

  const matriculaExiste = usuarios.some((usuario, index) => {
    return usuario.matricula === matricula && index !== usuarioEditando;
  });

  if (matriculaExiste) {
    alert("Já existe um usuário com essa matrícula.");
    return;
  }

  const usuario = {
    id:
      usuarioEditando !== null
        ? usuarios[usuarioEditando].id
        : gerarId(usuarios),
    nome,
    matricula,
    curso,
    telefone,
    situacao: "Ativo",
  };

  if (usuarioEditando !== null) {
    usuarios[usuarioEditando] = usuario;
    usuarioEditando = null;
  } else {
    usuarios.push(usuario);
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  renderTabela();

  form.reset();
  botaoRegistrarPopUp.textContent = "Registrar usuário";
  modal.close();
});

/* EDITAR USUÁRIO */
function editarUsuario(index) {
  const usuario = usuarios[index];

  document.getElementById("nomeUsuario").value = usuario.nome;
  document.getElementById("matriculaUsuario").value = usuario.matricula;
  document.getElementById("cursoUsuario").value = usuario.curso;
  document.getElementById("telefoneUsuario").value = usuario.telefone;

  usuarioEditando = index;

  botaoRegistrarPopUp.textContent = "Salvar edição";

  modal.showModal();
}

/* APAGAR USUÁRIO */
function apagarUsuario(index) {
  const confirmar = confirm("Tem certeza que deseja apagar este usuário?");

  if (!confirmar) return;

  usuarios.splice(index, 1);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  renderTabela();
}

/* PESQUISAR USUÁRIO */
campoBusca.addEventListener("input", function () {
  const texto = campoBusca.value.toLowerCase();

  const filtrados = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(texto) ||
      usuario.matricula.toLowerCase().includes(texto) ||
      usuario.curso.toLowerCase().includes(texto),
  );

  renderTabela(filtrados);
});

renderTabela();
window.editarUsuario = editarUsuario;
window.apagarUsuario = apagarUsuario;
