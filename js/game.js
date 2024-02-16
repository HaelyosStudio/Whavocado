import { ConstManager, VarManager } from "./class/ConstManager.js";
import { createPlayerLeaderboard } from "./leaderboard.js";

document.addEventListener('DOMContentLoaded', function() {
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
        const colorProbabilities = [
            { color: '#A7C7E7', chance: 0.64 },  // Blue - 64% chance
            { color: '#FAA0A0', chance: 0.3 },   // Red - 30% chance
            { color: '#FAC898', chance: 0.06 },  // Orange - 6% chance
        ];

        let random = Math.random();
        let cumulativeProbability = 0;

        for (const colorProb of colorProbabilities) {
            cumulativeProbability += colorProb.chance;
            if (random <= cumulativeProbability) {
                return colorProb.color;
            }
        }

        const randomIndex = Math.floor(Math.random() * colorProbabilities.length);
        return colorProbabilities[randomIndex].color;
    }

    let chosenDifficulty = 'medium'; // Default difficulty

    document.getElementById('easyButton').addEventListener('click', function() {
        chosenDifficulty = 'easy';
        console.log("Easy difficulty chosen");
    });

    document.getElementById('mediumButton').addEventListener('click', function() {
        chosenDifficulty = 'medium';
        console.log("Medium difficulty chosen");
    });

    document.getElementById('hardButton').addEventListener('click', function() {
        chosenDifficulty = 'hard';
        console.log("Hard difficulty chosen");
    });

    const applyRandomColorToAvocado = (() => {
        let previousColor = "";
        let previousAvocadoIndex = -1;

        return (avocadoHoles, difficulty) => {
            if (!ConstManager.gameRunning) return;

            let timeoutDuration;
            switch (difficulty) {
                case 'easy':
                    timeoutDuration = 1000; // Easy difficulty
                    console.log("Easy difficulty applied");
                    break;
                case 'medium':
                    timeoutDuration = 650; // Medium difficulty
                    console.log("Medium difficulty applied");
                    break;
                case 'hard':
                    timeoutDuration = 450; // Hard difficulty
                    console.log("Hard difficulty applied");
                    break;
                default:
                    timeoutDuration = 1000; // Default to easy difficulty
                    console.log("Default difficulty applied");
            }

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
            }, timeoutDuration);
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
            createPlayerLeaderboard();
        }

        document.getElementById('timerText').textContent = VarManager.timer = 30;
        ConstManager.score = 0;
        ConstManager.scoreDisplay.textContent = "Score : " + ConstManager.score;
        updateHighscoreDisplay();
    }

    function updateHighscoreDisplay() {
        const username = getQueryParam('username');
        const playerDataString = localStorage.getItem(username);
        if (playerDataString) {
            const playerData = JSON.parse(playerDataString);
            const highscore = playerData.highscore;
            ConstManager.playerHighscore.textContent = "Highscore: " + highscore;
        }
    }

    updateHighscoreDisplay();

    function updateScore(points) {
        ConstManager.score += points;
        ConstManager.scoreDisplay.textContent = "Score : " + ConstManager.score;
        updateHighscoreDisplay();
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
            applyRandomColorToAvocado(ConstManager.avocadoHoles, chosenDifficulty);
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
        applyRandomColorToAvocado(ConstManager.avocadoHoles, chosenDifficulty);
        console.log(chosenDifficulty);
        console.log("Game started !");
        startTimer();
        ConstManager.gameRunning = true;
        colorChangeInterval = setInterval(() => {
            applyRandomColorToAvocado(ConstManager.avocadoHoles, chosenDifficulty);
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
                } else if (backgroundColor === 'rgb(250, 200, 152)') {
                    updateScore(25)
                }
                avocadoHole.style.backgroundColor = "#a3b18a";
            });
        });

        ConstManager.pauseButton.addEventListener('click', togglePause);
    }

    ConstManager.startButton.addEventListener('click', gameInit);
});
