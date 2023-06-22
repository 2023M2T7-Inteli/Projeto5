function changeSrc(element) {
    let src = element.getAttribute("src");
    let image = document.querySelector(".perfil");
    image.setAttribute("src", src);
};

function voltar() {
    history.back();
};