import { ConstManager, VarManager } from "./class/ConstManager.js";
import { playerRegister } from "./connect.js";

export function createPlayerLeaderboard() {
    const playerListDiv = ConstManager.playerListDiv;

    if (!playerListDiv) {
        console.error("Leaderboard section not found.");
        return;
    }

    playerListDiv.innerHTML = '';

    function updateLeaderboard() {
        playerListDiv.innerHTML = '';

        const playerDataArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const playerDataString = localStorage.getItem(key);
            if (playerDataString) {
                const playerData = JSON.parse(playerDataString);
                playerDataArray.push(playerData);
            }
        }

        playerDataArray.sort((a, b) => b.highscore - a.highscore);

        playerDataArray.forEach((playerData, index) => {
            const username = playerData.username;
            const highscore = playerData.highscore;

            let playerRanking = '';
            switch (index) {
                case 0:
                    playerRanking = 'bestPlayer';
                    break;
                case 1:
                    playerRanking = 'secondBestPlayer';
                    break;
                case 2:
                    playerRanking = 'thirdBestPlayer';
                    break;
                default:
                    playerRanking = '';
            }

            if (highscore > 0) {
                const playerDiv = document.createElement('div');
                playerDiv.classList.add('leaderboardPlayerBG', 'innerShadow');
                if (playerRanking) {
                    playerDiv.classList.add(playerRanking);
                }

                const playerAvatarImg = document.createElement('img');
                playerAvatarImg.classList.add('leaderboardPlayerAvatar', 'outerShadow');
                playerAvatarImg.src = 'assets/playerAvatar.jpg';
                playerAvatarImg.alt = '';

                const playerInfoBoxDiv = document.createElement('div');
                playerInfoBoxDiv.classList.add('leaderboardInfoBox');

                const playerNameBtn = document.createElement('span');
                playerNameBtn.classList.add('leaderboardPlayerName', 'textShadow');
                playerNameBtn.textContent = username;
                playerNameBtn.style.color = '#344e41';
                playerNameBtn.style.cursor = 'auto';
                playerNameBtn.addEventListener('click', playerRegister);
                playerNameBtn.removeEventListener('click', playerRegister);

                const playerHighscoreSpan = document.createElement('span');
                playerHighscoreSpan.classList.add('leaderboardPlayerHighscore', 'textShadow');
                playerHighscoreSpan.textContent = "Highscore: " + highscore;

                playerInfoBoxDiv.appendChild(playerNameBtn);
                playerInfoBoxDiv.appendChild(document.createElement('br'));
                playerInfoBoxDiv.appendChild(playerHighscoreSpan);

                playerDiv.appendChild(playerAvatarImg);
                playerDiv.appendChild(playerInfoBoxDiv);

                playerListDiv.appendChild(playerDiv);
            }
        });
    }

    updateLeaderboard();

    window.addEventListener('storage', function (event) {
        updateLeaderboard();
    });

    window.addEventListener('DOMContentLoaded', function() {
        updateLeaderboard();
    });
}

createPlayerLeaderboard();
