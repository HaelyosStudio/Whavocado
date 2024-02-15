import { ConstManager, VarManager } from "./class/ConstManager.js";

ConstManager.gameRunning = false;
ConstManager.score = 0;

let timerInterval;
let colorChangeInterval;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function startTimer() {
    timerInterval = setInterval(function() {
        VarManager.timer--;
        document.getElementById('timerText').textContent = VarManager.timer;
        if (VarManager.timer === 0) {
            clearInterval(timerInterval);
            stopGame();
        }
    }, 1000);
}

function pickRandomColor() {
    const randomIndex = Math.floor(Math.random() * VarManager.colors.length);
    return VarManager.colors[randomIndex];
}

const applyRandomColorToAvocado = (() => {
    let previousColor = "";
    let previousAvocadoIndex = -1;

    return (avocadoHoles) => {
        if (!ConstManager.gameRunning) return;

        let randomAvocadoIndex;
        do {
            randomAvocadoIndex = Math.floor(Math.random() * avocadoHoles.length);
        } while (randomAvocadoIndex === previousAvocadoIndex);

        const randomAvocadoHole = avocadoHoles[randomAvocadoIndex];

        let randomColor;
        do {
            randomColor = pickRandomColor();
        } while (randomColor === previousColor);

        randomAvocadoHole.style.backgroundColor = randomColor;
        previousColor = randomColor;
        previousAvocadoIndex = randomAvocadoIndex;

        setTimeout(() => {
            randomAvocadoHole.style.backgroundColor = "#a3b18a";
        }, 1500);
    };
})();

function stopGame() {
    ConstManager.gameRunning = false;
    clearInterval(colorChangeInterval);
    ConstManager.pauseButton.classList.add('hidden');
    ConstManager.startButton.classList.remove('hidden');

    const username = getQueryParam('username');
    const playerDataString = localStorage.getItem(getQueryParam('username'));
    const playerData = JSON.parse(playerDataString);
    const highscore = playerData.highscore;

    if (ConstManager.score > highscore) {
        localStorage.setItem(username, JSON.stringify({
            username: username,
            highscore: ConstManager.score
        }));
    }

    document.getElementById('timerText').textContent = VarManager.timer = 30;
    ConstManager.score = 0;
    ConstManager.scoreDisplay.textContent = "Score : " + ConstManager.score;
}

function updateScore(points) {
    ConstManager.score += points;
    ConstManager.scoreDisplay.textContent = "Score : " + ConstManager.score;
}

function pauseGame() {
    clearInterval(timerInterval);
    clearInterval(colorChangeInterval);
    ConstManager.gameRunning = false;
    ConstManager.pauseButton.textContent = "Resume";
}

function resumeGame() {
    startTimer();
    colorChangeInterval = setInterval(() => {
        applyRandomColorToAvocado(ConstManager.avocadoHoles);
    }, 1500);
    ConstManager.gameRunning = true;
    ConstManager.pauseButton.textContent = "Pause";
}

function togglePause() {
    if (ConstManager.gameRunning) {
        pauseGame();
    } else {
        resumeGame();
    }
}

function gameInit() {
    console.log("Game started !");
    startTimer();
    ConstManager.gameRunning = true;
    colorChangeInterval = setInterval(() => {
        applyRandomColorToAvocado(ConstManager.avocadoHoles);
        ConstManager.pauseButton.classList.remove('hidden');
        ConstManager.startButton.classList.add('hidden');
    }, 1500);

    ConstManager.avocadoHoles.forEach(avocadoHole => {
        avocadoHole.addEventListener('click', function() {
            const backgroundColor = getComputedStyle(avocadoHole).backgroundColor;
            if (backgroundColor === 'rgb(167, 199, 231)') {
                updateScore(10);
            } else if (backgroundColor === 'rgb(250, 160, 160)') {
                updateScore(-15);
            }
            avocadoHole.style.backgroundColor = "#a3b18a";
        });
    });

    ConstManager.pauseButton.addEventListener('click', togglePause);
}

ConstManager.startButton.addEventListener('click', gameInit);
