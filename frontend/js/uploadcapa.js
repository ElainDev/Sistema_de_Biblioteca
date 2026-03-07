document.addEventListener("DOMContentLoaded", () => {
    const clicarCapa = document.getElementById("clicarCapa");
    const uploadCapa = document.getElementById("uploadCapa");

    // Garante que o input aceite apenas imagens
    uploadCapa.setAttribute("accept", "image/*");

    // Ao clicar no SVG ou div da capa
    clicarCapa.addEventListener("click", () => {
        uploadCapa.value = ""; // limpa qualquer arquivo selecionado antes
        uploadCapa.click();    // abre o seletor de arquivos
    });

    // Quando o usuário escolhe uma imagem
    uploadCapa.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const capaDiv = document.querySelector(".capaLivro");
                capaDiv.style.backgroundImage = `url(${e.target.result})`;
                capaDiv.style.backgroundSize = "cover";
                capaDiv.style.backgroundPosition = "center";

                // Esconde o SVG para deixar só a imagem
                const svg = capaDiv.querySelector("svg");
                if (svg) svg.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });
});