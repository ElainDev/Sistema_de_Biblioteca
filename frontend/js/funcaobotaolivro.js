const button = document.querySelector("#botaoregistrarlivro")
const modal = document.querySelector(".modalLivro")
const fechar = document.querySelector(".fecharModal")

const form = document.querySelector(".formLivro")

const cards = document.querySelector(".cardsRegistro")
const cardPergunta = document.querySelector("#cardPergunta")
const cardCarregando = document.querySelector("#cardCarregando")
const cardResultado = document.querySelector("#cardResultado")

const confirmar = document.querySelector("#confirmarRegistro")
const cancelar = document.querySelector("#cancelarRegistro")
const fecharResultado = document.querySelector("#fecharResultado")

// abrir modal
button.onclick = () =>{
    modal.showModal()
}

// fechar modal
fechar.onclick = () =>{
    modal.close()
}

// quando clicar em registrar livro
form.addEventListener("submit", function(e){

e.preventDefault()

cards.style.display = "flex"

cardPergunta.style.display = "block"
cardCarregando.style.display = "none"
cardResultado.style.display = "none"

})

// clicar em SIM
confirmar.onclick = () =>{

cardPergunta.style.display = "none"
cardCarregando.style.display = "block"

setTimeout(()=>{

cardCarregando.style.display = "none"
cardResultado.style.display = "block"

},2000)

}

// clicar em NÃO
cancelar.onclick = () =>{
cards.style.display = "none"
}

// fechar resultado
fecharResultado.onclick = () =>{
cards.style.display = "none"
modal.close()
}


// dialog do Ler mais

// Seleciona modal e botão de fechar
const modalDetalhes = document.querySelector("#modalDetalhes");
const fecharDetalhes = modalDetalhes.querySelector(".fecharModal");

// Seleciona todos os botões "Ler mais..."
document.querySelectorAll(".btnLerMais").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const card = e.target.closest(".cardlivro");

        modalDetalhes.querySelector("#modalTitulo").innerText = card.dataset.titulo;
        modalDetalhes.querySelector("#modalAutor").innerText = card.dataset.autor;
        modalDetalhes.querySelector("#modalEditora").innerText = card.dataset.editora;
        modalDetalhes.querySelector("#modalAno").innerText = card.dataset.ano;
        modalDetalhes.querySelector("#modalCategoria").innerText = card.dataset.categoria;
        modalDetalhes.querySelector("#modalPaginas").innerText = card.dataset.paginas;
        modalDetalhes.querySelector("#modalExemplares").innerText = card.dataset.exemplares;
        modalDetalhes.querySelector("#modalSinopse").innerText = card.dataset.sinopse;

        // Capa
        modalDetalhes.querySelector("#modalCapa img").src = card.dataset.capa;

        // Disponível / Indisponível
        const disponivelBox = modalDetalhes.querySelector("#modalDisponivel");
        const quantidade = parseInt(card.dataset.exemplares);
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

        modalDetalhes.showModal();
    });
});

// Adiciona evento para fechar o modal
fecharDetalhes.addEventListener("click", () => {
    modalDetalhes.close();
});