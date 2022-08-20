const message = [
    "生日快乐, 姐姐 😜祝您福如东海，寿比南山.(video ini ada lagunya tolong di - play dulu sampe nyala) ",
    "喝大量的水.<br/>别忘了微笑.",
    'Kalau lg kerja sering jalan", jangan duduk terus.<br/>Ini ucapannya setengah mandarin setengah indo soalnya gua nggk kursus.',
    "Oh dan yang paling penting, harus banyak nongki sama temen biar happy hihi",
    "好朋友就像星星。你不一定每天都能看见他们，但你知道，他们会一直在那里.<br/>Seneng kan punya temen kyk kita ?",
    "Mau traktir kita dimana?",
    "从来没有人因为给予而变穷的.<br/>成为更好的领导者"
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

function createButton(coounter) {
    const button = document.createElement("button");
    if (counter === 4) {
        button.innerText = "Biasa Aja";
    } else {
        button.innerText = "Pinggiran";
    }
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

        images.setAttribute("src", "./assets/Images/img1.jpeg");
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
                    if (counter <= 12) {
                        images.classList.toggle("fade-in");
                    }
                }, 3000)
            }, 200);
            images.setAttribute("src", `./assets/Images/img${counter}.jpeg`);
            counter++;
            if (counter === 13) {
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

function createButtonShorthand(counter) {
    createButton(counter);
    createEventListener();
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
    if (counter === 6) {
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
                element.button.innerText = "Iya";
                createButtonShorthand(counter)
            };
            if (counter === 5) {
                element.randomPosition.remove();
                element.button.innerText = "Resto Mahal"
                createButtonShorthand(counter);
            }
            if (counter === 6) {
                element.button.innerText = "Okayy"
                element.randomPosition.remove();
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