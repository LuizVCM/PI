const navbar = document.querySelector(".navbar");
const aside = document.querySelector(".aside");
const arrow = document.querySelector(".fa-arrow-right")

navbar.addEventListener("click", () => {
    aside.classList.toggle("aside-encolhido");
    arrow.classList.toggle("virado")
})