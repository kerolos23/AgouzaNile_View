let burgerCloseIcon = document.querySelector(".fa-xmark");
let burgerIcon = document.querySelector(".fa-bars");
let menuBar = document.querySelector(".header-bottom");
let links = document.querySelectorAll("#link");

burgerIcon.addEventListener("click", function () {
    openIcon (burgerCloseIcon);
    hideIcon (this);
    openMenuBar ()
});

links.forEach(e => {
    e.addEventListener("click", function () {
        closeMenuBar ();
        hideIcon (burgerCloseIcon);
        openIcon (burgerIcon);
    })
})
function openMenuBar () {
    menuBar.classList.add("active-menu");
}

function closeMenuBar () {
    menuBar.classList.remove("active-menu");
}

function openIcon (button) {
    button.classList.remove("close");
}

function hideIcon (button) {
    button.classList.add("close");
}

burgerCloseIcon.addEventListener("click", function () {
    openIcon (burgerIcon);
    hideIcon (this);
    closeMenuBar ()
})

window.addEventListener("click", closeOutSidePopup);
function closeOutSidePopup(el) {
    if(el.target == menuBar){
        closeMenuBar ();
        openIcon (burgerIcon);
        hideIcon (burgerCloseIcon);
    };
};