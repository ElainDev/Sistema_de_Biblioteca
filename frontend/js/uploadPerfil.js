const upload = document.getElementById("uploadFoto");
const fotosPerfil = document.querySelectorAll(".img-perfil");

const fotoPadrao = "assets/img/defaultProfile.png";

window.addEventListener("DOMContentLoaded", function () {
  const fotoSalva = localStorage.getItem("fotoPerfil");

  const fotoFinal = fotoSalva ? fotoSalva : fotoPadrao;

  fotosPerfil.forEach((img) => {
    img.src = fotoFinal;
  });
});

if (upload) {
  upload.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        fotosPerfil.forEach((img) => {
          img.src = e.target.result;
        });

        localStorage.setItem("fotoPerfil", e.target.result);
      };

      reader.readAsDataURL(file);
    }
  });
}
