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

    let chosenDifficulty = 'easy'; // Default difficulty

    document.getElementById('easyButton').addEventListener('click', function() {
        chosenDifficulty = 'easy';
        ConstManager.currentDiff.innerHTML = "Current difficulty : <span style='color: #4ea84f; font-weight: bold;'>Easy</span>";
        console.log("Easy difficulty chosen");
    });

    document.getElementById('mediumButton').addEventListener('click', function() {
        chosenDifficulty = 'medium';
        ConstManager.currentDiff.innerHTML = "Current difficulty : <span style='color: #ec5f00; font-weight: bold;'>Medium</span>";
        console.log("Medium difficulty chosen");
    });

    document.getElementById('hardButton').addEventListener('click', function() {
        chosenDifficulty = 'hard';
        ConstManager.currentDiff.innerHTML = "Current difficulty : <span style='color: #e94528; font-weight: bold;'>Hard</span>";
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
                    ConstManager.currentDiff.innerHTML = "Current difficulty : <span style='color: #4ea84f; font-weight: bold;'>Easy</span>";
                    break;
                case 'medium':
                    timeoutDuration = 650; // Medium difficulty
                    console.log("Medium difficulty applied");
                    ConstManager.currentDiff.innerHTML = "Current difficulty : <span style='color: #ec5f00; font-weight: bold;'>Medium</span>";
                    break;
                case 'hard':
                    timeoutDuration = 450; // Hard difficulty
                    ConstManager.currentDiff.innerHTML = "Current difficulty : <span style='color: #e94528; font-weight: bold;'>Hard</span>";
                    console.log("Hard difficulty applied");
                    break;
                default:
                    timeoutDuration = 1000; // Default to easy difficulty
                    ConstManager.currentDiff.innerHTML = "Current difficulty : <span style='color: #4ea84f; font-weight: bold;'>Easy</span>";
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
        const playerDataString = localStorage.getItem(username);
        const playerData = playerDataString ? JSON.parse(playerDataString) : null;
        const highscore = playerData ? playerData.highscore : 0;
    
        if (playerData !== null) {
            if (ConstManager.score > highscore) {
                localStorage.setItem(username, JSON.stringify({
                    username: username,
                    highscore: ConstManager.score
                }));
                ConstManager.gameRecapBox.classList.remove('hidden');
                ConstManager.gameRecap.innerHTML = `Your score is : <span style='color: #428643; font-weight: bold;'>${ConstManager.score}</span><br> New Highscore!`;
                setTimeout(function() {
                    ConstManager.gameRecapBox.classList.add('hidden');
                }, 4000)
                createPlayerLeaderboard();
            } else {
                ConstManager.gameRecapBox.classList.remove('hidden')
                ConstManager.gameRecap.innerHTML = `Your score is : <span style='color: #428643; font-weight: bold;'>${ConstManager.score}</span>`;
                setTimeout(function() {
                    ConstManager.gameRecapBox.classList.add('hidden');
                }, 4000)
                createPlayerLeaderboard();
            }
        } else {
            ConstManager.gameRecapBox.classList.remove('hidden')
            ConstManager.gameRecap.innerHTML = `Your score is : <span style='color: #428643; font-weight: bold;'>${ConstManager.score}</span><br>You didn't register.<br>Your score won't be saved.`;
            setTimeout(function() {
                ConstManager.gameRecapBox.classList.add('hidden');
            }, 4000)
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
            if(ConstManager.gameRunning){
                applyRandomColorToAvocado(ConstManager.avocadoHoles, chosenDifficulty);
                ConstManager.pauseButton.classList.remove('hidden');
                ConstManager.startButton.classList.add('hidden');
            }
        }, 1500);
    
        ConstManager.avocadoHoles.forEach(avocadoHole => {
            avocadoHole.addEventListener('click', function() {
                if(ConstManager.gameRunning){
                    const backgroundColor = getComputedStyle(avocadoHole).backgroundColor;
                    if (backgroundColor === 'rgb(167, 199, 231)') {
                        updateScore(10);
                    } else if (backgroundColor === 'rgb(250, 160, 160)') {
                        updateScore(-15);
                    } else if (backgroundColor === 'rgb(250, 200, 152)') {
                        updateScore(25)
                    }
                    avocadoHole.style.backgroundColor = "#a3b18a";
                }
            });
        });
    
        ConstManager.pauseButton.addEventListener('click', togglePause);
    }
    

    ConstManager.startButton.addEventListener('click', gameInit);
});
