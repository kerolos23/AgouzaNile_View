lightbox.option({
    'resizeDuration': 0,
    'wrapAround': true,
    'disableScrolling': true
});

let translateIcon = document.querySelector("#translate")
let translateLanguage = document.querySelectorAll(".lang");
let translateBar = document.querySelector(".translate");

translateIcon.addEventListener("mousemove", function() {
    activeTranslateBar();
});

translateIcon.addEventListener("mouseleave", function () {
    closeTranslateBar();
});

translateLanguage.forEach(e => {
    e.addEventListener("click", function () {
        closeTranslateBar();
    })
})

function activeTranslateBar () {
    translateBar.style.visibility= "unset";
    translateBar.style.top= "150%";
    translateBar.style.opacity= "1";
};

function closeTranslateBar () {
    translateBar.style.visibility= "hidden";
    translateBar.style.top= "500%";
    translateBar.style.opacity= "0";
};

// ##################################

let theRestIcons = document.querySelectorAll(".rest-serv");

theRestIcons.forEach(e => {
    if (window.innerWidth > 1024) {
        e.addEventListener("mousemove", function () {
            e.classList.add("transform-r");
        });
        e.addEventListener("mouseleave", function () {
            e.classList.remove("transform-r");
        });
    }

});