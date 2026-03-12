/* =====================================
   ELEMENTOS DO DOM
===================================== */
const container = document.getElementById("containerLivros");
const form = document.querySelector(".formLivro");
const confirmar = document.getElementById("confirmarRegistro");
const cancelar = document.getElementById("cancelarRegistro");
const cardsRegistro = document.querySelector(".cardsRegistro");
const cardPergunta = document.getElementById("cardPergunta");
const cardCarregando = document.getElementById("cardCarregando");
const cardResultado = document.getElementById("cardResultado");
const botaoRegistrar = document.getElementById("botaoregistrarlivro");
const modalCadastro = document.getElementById("modalCadastroLivro");
const modalDetalhes = document.getElementById("modalDetalhes");

const inputCapa = document.getElementById("uploadCapa");
const botaoSelecionarCapa = document.getElementById("botaoSelecionarCapa");
const clicarCapa = document.getElementById("clicarCapa");

/* =====================================
   VARIÁVEIS
===================================== */
let livros = JSON.parse(localStorage.getItem("livros")) || [];
let livroEditando = null;
let imagemSelecionada = null;

cardsRegistro.style.display = "none";

/* =====================================
   POPULAR LISTAS (SELEC) - FEITO NO JS
===================================== */
document.addEventListener("DOMContentLoaded", () => {
    const selectEditora = document.getElementById("editoraLivro");
    const selectCategoria = document.getElementById("categoriaLivro");

    if (selectEditora.options.length === 1) {
        const editoras = ["Companhia das Letras", "Rocco", "Penguin", "HarperCollins", "Objetiva", "Outra"];
        editoras.forEach(ed => {
            const option = document.createElement("option");
            option.value = ed;
            option.textContent = ed;
            selectEditora.appendChild(option);
        });
    }

    if (selectCategoria.options.length === 1) {
        const categorias = ["Ficção", "Não-Ficção", "Terror", "Romance", "Tecnologia", "História"];
        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            selectCategoria.appendChild(option);
        });
    }
});

/* =====================================
   ABRIR MODAL DE CADASTRO
===================================== */
botaoRegistrar.addEventListener("click", () => {
    modalCadastro.showModal();
    livroEditando = null;
    form.reset();
    imagemSelecionada = null;
    inputCapa.value = ""; //  RESETA O INPUT DE ARQUIVO
});

/* =====================================
   FUNÇÃO PARA RENDERIZAR CARDS
===================================== */
function renderLivros(lista = livros) {
    container.innerHTML = "";

    lista.forEach((livro, index) => {
        const card = document.createElement("div");
        card.classList.add("cardlivro");

        card.dataset.index = index;
        card.dataset.titulo = livro.titulo;
        card.dataset.autor = livro.autor;
        card.dataset.editora = livro.editora;
        card.dataset.ano = livro.ano;
        card.dataset.categoria = livro.categoria;
        card.dataset.paginas = livro.paginas;
        card.dataset.exemplares = livro.exemplares;
        card.dataset.sinopse = livro.sinopse;
        card.dataset.capa = livro.capa;

        card.innerHTML = `
            <img src="${livro.capa}" alt="${livro.titulo}">
            <div class="textotitulo">
                <h2>${livro.titulo}</h2>
                <p>${livro.sinopse ? livro.sinopse.substring(0, 120) : ""}...</p>
                <button class="btnLerMais">Ler mais...</button>
            </div>
        `;
        
        container.appendChild(card);
    });

    ativarLerMais();
}

/* =====================================
   FUNÇÃO BOTÃO "LER MAIS" + DETALHES COM EDITAR/EXCLUIR
===================================== */
function ativarLerMais() {
    document.querySelectorAll(".btnLerMais").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".cardlivro");
            const index = parseInt(card.dataset.index);
            const livro = livros[index];

            // Preencher modal de detalhes
            modalDetalhes.querySelector("#modalTitulo").innerText = livro.titulo;
            modalDetalhes.querySelector("#modalAutor").innerText = livro.autor;
            modalDetalhes.querySelector("#modalEditora").innerText = livro.editora;
            modalDetalhes.querySelector("#modalAno").innerText = livro.ano;
            modalDetalhes.querySelector("#modalCategoria").innerText = livro.categoria;
            modalDetalhes.querySelector("#modalPaginas").innerText = livro.paginas;
            modalDetalhes.querySelector("#modalExemplares").innerText = livro.exemplares;
            modalDetalhes.querySelector("#modalSinopse").innerText = livro.sinopse;
            modalDetalhes.querySelector("#modalCapa img").src = livro.capa;

            //  LÓGICA DE DISPONIBILIDADE (ÍCONES)
            const disponivelBox = modalDetalhes.querySelector("#modalDisponivel");
            const quantidade = parseInt(livro.exemplares) || 0;
            
            if (quantidade > 0) {
                disponivelBox.innerHTML = `
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#9FCA32"/>
                        <path d="M13 24.42L6.79004 18.21L9.62004 15.38L13 18.77L22.88 8.88L25.71 11.71L13 24.42Z" fill="white"/>
                    </svg>`;
            } else {
                disponivelBox.innerHTML = `
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#AE4E3F"/>
                        <path d="M16 6C21.5 6 26 10.5 26 16C26 21.5 21.5 26 16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6ZM16 8C14.1 8 12.4 8.6 11.1 9.7L22.3 20.9C23.3 19.5 24 17.8 24 16C24 11.6 20.4 8 16 8ZM20.9 22.3L9.7 11.1C8.6 12.4 8 14.1 8 16C8 20.4 11.6 24 16 24C17.9 24 19.6 23.4 20.9 22.3Z" fill="white"/>
                    </svg>`;
            }

            // SALVAR O ÍNDICE NO MODAL PARA OS BOTÕES USAREM
            modalDetalhes.dataset.index = index;

            // Mostrar o modal de detalhes
            modalDetalhes.showModal();
        });
    });
}

/* =====================================
   BOTÕES DE AÇÃO NO MODAL DE DETALHES (CANTO INFERIOR ESQUERDO)
===================================== */
document.addEventListener("click", (e) => {
    // Botão Editar no Modal de Detalhes
    if (e.target.classList.contains("btnEditarModal")) {
        const index = parseInt(modalDetalhes.dataset.index);
        const livro = livros[index];

        document.getElementById("tituloLivro").value = livro.titulo;
        document.getElementById("autorLivro").value = livro.autor;
        document.getElementById("editoraLivro").value = livro.editora;
        document.getElementById("anoLivro").value = livro.ano;
        document.getElementById("categoriaLivro").value = livro.categoria;
        document.getElementById("paginasLivro").value = livro.paginas;
        document.getElementById("exemplaresLivro").value = livro.exemplares;
        document.getElementById("sinopseLivro").value = livro.sinopse;
        
        //  CORREÇÃO: Definir imagemSelecionada como a capa do livro
        imagemSelecionada = livro.capa;
        
        //  IMPORTANTE: Definir o índice para edição
        livroEditando = index;
        
        //  RESETAR O INPUT DE ARQUIVO
        inputCapa.value = "";
        
        console.log("📝 Editando livro no índice:", index);
        console.log("📝 Imagem selecionada:", imagemSelecionada);
        
        modalCadastro.showModal();
        modalDetalhes.close();
    }
    
    // Botão Excluir no Modal de Detalhes
    if (e.target.classList.contains("btnExcluirModal")) {
        const index = parseInt(modalDetalhes.dataset.index);
        const confirmar = confirm("Tem certeza que deseja apagar este livro?");
        if (!confirmar) return;

        livros.splice(index, 1);
        localStorage.setItem("livros", JSON.stringify(livros));
        renderLivros();
        modalDetalhes.close();
    }
});

/* =====================================
   VALIDAR E PEGAR DADOS DO FORMULÁRIO
===================================== */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const campos = [
        { id: "tituloLivro", nome: "Título" },
        { id: "autorLivro", nome: "Autor" },
        { id: "editoraLivro", nome: "Editora" },
        { id: "anoLivro", nome: "Ano de publicação" },
        { id: "categoriaLivro", nome: "Categoria" },
        { id: "paginasLivro", nome: "Nº Páginas" },
        { id: "exemplaresLivro", nome: "Nº Exemplares" },
        { id: "sinopseLivro", nome: "Sinopse" },
    ];

    let todosPreenchidos = true;

    campos.forEach((c) => {
        const erroSpan = document.querySelector(`#${c.id} + .erro`);
        if (erroSpan) erroSpan.innerText = "";
    });

    campos.forEach((c) => {
        const valor = document.getElementById(c.id).value.trim();
        if (!valor) {
            const erroSpan = document.querySelector(`#${c.id} + .erro`);
            if (erroSpan) erroSpan.innerText = `Preencha o campo ${c.nome}`;
            todosPreenchidos = false;
        }
    });

    if (!todosPreenchidos) {
        console.log(" Formulário incompleto");
        return;
    }

    const livroAtual = {
        titulo: document.getElementById("tituloLivro").value.trim(),
        autor: document.getElementById("autorLivro").value.trim(),
        editora: document.getElementById("editoraLivro").value.trim(),
        ano: document.getElementById("anoLivro").value.trim(),
        categoria: document.getElementById("categoriaLivro").value.trim(),
        paginas: document.getElementById("paginasLivro").value.trim(),
        exemplares: document.getElementById("exemplaresLivro").value.trim(),
        sinopse: document.getElementById("sinopseLivro").value.trim(),
        capa: imagemSelecionada || "assets/img/defaultBook.png",
    };

    //  CORREÇÃO: Verificar se é edição ou novo livro
    if (livroEditando !== null) {
        console.log(" EDITANDO livro no índice:", livroEditando);
        console.log(" Dados do livro:", livroAtual);
        
        try {
            // Atualiza o livro no índice correto
            livros[livroEditando] = livroAtual;
            
            // Salva no localStorage
            localStorage.setItem("livros", JSON.stringify(livros));
            
            // Atualiza a lista de cards
            renderLivros();
            
            // Limpa a variável de edição
            livroEditando = null;
            imagemSelecionada = null;
            
            console.log(" Livro editado com sucesso!");
        } catch (error) {
            console.error(" Erro ao salvar:", error);
            alert("Erro ao salvar! O armazenamento está cheio. Exclua alguns livros ou limpe o cache.");
        }
    } else {
        console.log(" ADICIONANDO novo livro");
        try {
            livros.push(livroAtual);
            localStorage.setItem("livros", JSON.stringify(livros));
            renderLivros();
            imagemSelecionada = null;
            console.log(" Livro adicionado com sucesso!");
        } catch (error) {
            console.error(" Erro ao salvar:", error);
            alert("Erro ao salvar! O armazenamento está cheio. Exclua alguns livros ou limpe o cache.");
        }
    }

    form.reset();
    inputCapa.value = ""; // RESETAR O INPUT DE ARQUIVO
    modalCadastro.close();
});

/* =====================================
   FECHAR MODAIS (CORRIGIDO)
===================================== */
document.querySelectorAll(".fecharModal").forEach((botao) => {
    botao.addEventListener("click", () => {
        const dialog = botao.closest("dialog");
        if (dialog) {
            dialog.close();
            if (dialog.id === "modalDetalhes") {
                modalDetalhes.querySelector("#modalTitulo").innerText = "";
                modalDetalhes.querySelector("#modalAutor").innerText = "";
                modalDetalhes.querySelector("#modalEditora").innerText = "";
                modalDetalhes.querySelector("#modalAno").innerText = "";
                modalDetalhes.querySelector("#modalCategoria").innerText = "";
                modalDetalhes.querySelector("#modalPaginas").innerText = "";
                modalDetalhes.querySelector("#modalExemplares").innerText = "";
                modalDetalhes.querySelector("#modalSinopse").innerText = "";
                modalDetalhes.querySelector("#modalCapa img").src = "";
                delete modalDetalhes.dataset.index;
            }
        }
    });
});

//  CORREÇÃO: Fechar modal e limpar imagem
modalCadastro.addEventListener("click", (e) => {
    if (e.target === modalCadastro) {
        modalCadastro.close();
        //  LIMPAR IMAGEM QUANDO FECHAR
        imagemSelecionada = null;
        inputCapa.value = "";
    }
});

modalDetalhes.addEventListener("click", (e) => {
    if (e.target === modalDetalhes) {
        modalDetalhes.close();
    }
});

/* =====================================
   UPLOAD DE CAPA
===================================== */
botaoSelecionarCapa.addEventListener("click", () => inputCapa.click());
clicarCapa.addEventListener("click", () => inputCapa.click());

inputCapa.addEventListener('change', function() {
    const file = this.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagemSelecionada = e.target.result;
            console.log(" Imagem selecionada:", imagemSelecionada.substring(0, 50) + "...");
        }
        
        reader.readAsDataURL(file);
    }
});

// Inicializa a lista ao carregar a página
renderLivros();