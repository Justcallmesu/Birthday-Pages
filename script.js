const message = [
    "Halooo Raisa 🤮",
    "Selamat ulang tahun, cieee🥺",
    "Semoga jadi pribadi yg lebih baik, lebih sabar, lebih teliti, lebih teratur dan lebih bersih lagi hehe",
    "Jangan kebanyakan ngegym nanti klo jadi cantik lalu punya pacar jd susah diajak nongki 😭",
    "Hmmm btw mau kado sama kue apa ?",
    "Oh gak usah, yauda gpp Ditunggu ya traktirannya 🥰"
];
const element = {
    paragraph: document.querySelector(".Content"),
    button: document.querySelector(".eventEmitter"),
    container: document.querySelector(".button-container"),
    randomPosition: null
}

let counter = 0;

window.addEventListener("load", function () {
    element.paragraph.innerText = message[counter];
})

function createButton() {
    const button = document.createElement("button");
    button.innerText = "Apa Aja Boleh";
    button.classList.add("button", "randomPosition");
    element.container.appendChild(button);
    element.randomPosition = button;
}

function moveButton() {
    const elementDimension = {
        height: element.container.offsetHeight - 50,
        width: element.container.offsetWidth - 200
    }

    const styling = element.randomPosition.style;
    styling.left = Math.floor(Math.random() * elementDimension.width) + 1 + "px";
    styling.top = Math.floor(Math.random() * elementDimension.height) + 1 + "px";
    console.log(styling.left, styling.top)
}

element.container.addEventListener("click", function (event) {
    if (event.target.classList.contains("eventEmitter")) {
        if (counter < message.length - 1) {
            counter++;
            if (counter === 4) {
                element.button.innerText = "Gak usah";
                createButton();
            };

            if (counter === 5) {
                element.randomPosition.remove();
                element.button.innerText = "Okayy"
            }
            element.paragraph.innerText = message[counter];
        }
        return;
    }
    if (event.target.classList.contains("randomPosition")) {
        moveButton();
    }
})

element.container.addEventListener("mouseover", function (event) {
    if (event.target.classList.contains("randomPosition")) {
        moveButton()
    }
});

element.container.addEventListener("mousemove", function (event) {
    if (event.target.classList.contains("randomPosition")) {
        moveButton();
    }
})


