const message = [
    "Halooo Sarah Michelle <br/> (HRD tercinta GMM) <br/> 25 Juli 2022",
    "Happy Birthday ya, cieee tua🥺",
    "Semoga jadi pribadi yg lebih baik <br/> lebih sabar <br/> lebih teliti <br/> lebih teratur <br/> yang paling penting lebih bersih lagi hehe",
    "Jangan keseringan lupa <br/>jangan suka menghayal jadi istri jungkook <br/> jangan kebanyakan ngegym nanti klo jadi cantik lalu punya pacar jd susah diajak nongki 😭",
    "Hmmm btw mau kado sama kue apa?",
    "Oh gak usah, yauda gpp. <br/> Ditunggu ya traktirannya <br/> Jangan Lupa Chumchurumnya HAHAHA 🥰"
];
const element = {
    paragraph: document.querySelector(".Content"),
    button: document.querySelector(".eventEmitter"),
    container: document.querySelector(".button-container"),
    player: document.querySelector(".song"),
    controls: document.querySelector(".controls"),
    wholeContainer: document.querySelector(".container"),
    randomPosition: null
}

const eventsList = ["mouseover",
    "mousemove",
    "touchmove",
    "touchstart",
    "touchend"
];

let interval = null;
let counter = 0;
let created = false;

window.addEventListener("load", function () {
    element.paragraph.innerHTML = message[counter];
    const promise = element.player.play();
    promise.then(function () {
        element.player.muted = false;
    });
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
}

function createImages() {
    if (!created) {
        created = true;
        const images = document.createElement("img");

        images.setAttribute("src", "./assets/images/images1.jpeg");
        images.classList.add("ending-images");

        document.body.appendChild(images);
        setTimeout(function () {
            images.classList.toggle("fade-in");
            setTimeout(function () {
                images.classList.toggle("fade-in");
            }, 3000)
        }, 200);

        counter = 2;
        interval = setInterval(function () {
            setTimeout(function () {
                images.classList.toggle("fade-in");
                setTimeout(function () {
                    if (counter < 12) {
                        images.classList.toggle("fade-in");
                    }
                }, 3000)
            }, 200);
            images.setAttribute("src", `./assets/images/images${counter}.jpeg`);
            counter++;
            if (counter === 12) {
                clearInterval(interval);
            }
        }, 5000)
    }
}

function createEventListener() {
    for (const event of eventsList) {
        element.container.addEventListener(`${event}`, function (event) {
            if (event.target.classList.contains("randomPosition")) {
                moveButton();
            }
        })
    }
}

function changeIcon(event) {
    if (event.target.classList.contains("bi-play-fill")) {
        event.target.classList.remove("bi-play-fill");
        event.target.classList.add("bi-pause-fill");
        element.player.pause();
    } else {
        event.target.classList.remove("bi-pause-fill");
        event.target.classList.add("bi-play-fill");
        element.player.play();
    }
}

const selfDestruct = element.container.addEventListener("click", function (event) {
    if (counter === 5) {
        element.wholeContainer.classList.add("fading");
        setTimeout(function () {
            element.wholeContainer.remove();
            setTimeout(function () {
                createImages();
            }, 500)
        }, 1500)
    }
    if (event.target.classList.contains("eventEmitter")) {
        if (counter < message.length - 1) {
            if (element.button.innerText === "Okayy") {
                element.wholeContainer.remove();
            }
            counter++;
            if (counter === 4) {
                element.button.innerText = "Gak usah";
                createButton();
                createEventListener();
            };
            if (counter === 5) {
                element.randomPosition.remove();
                element.button.innerText = "Okayy"
            }
            element.paragraph.innerHTML = message[counter];
            return;
        }
        return;
    }

    if (event.target.classList.contains("randomPosition")) {
        moveButton();
        return;
    }

})

element.controls.addEventListener("click", changeIcon)

element.player.addEventListener("ended", function (event) {
    changeIcon(event);
    event.target.currentTime = 0;
})