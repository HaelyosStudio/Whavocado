import { ConstManager } from "./class/ConstManager.js";
import { Player } from "./class/playerInfos.js";
import { createPlayerLeaderboard } from "./leaderboard.js";

alert("To save your score you need to connect by clicking on top left corner.")

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

ConstManager.playerName.addEventListener('click', playerRegister);

document.getElementById('setAvatarButton').addEventListener('click', function() {
    document.getElementById('avatarInput').click();
});

document.getElementById('avatarInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('playerAvatar').src = e.target.result;
    };
    reader.readAsDataURL(file);
});

function initializeAvatar() {
    console.log("Initializing avatar...");
    const playerName = getQueryParam('username');
    if (playerName) {
        const playerDataString = localStorage.getItem(playerName);
        if (playerDataString) {
            const playerData = JSON.parse(playerDataString);
            if (playerData.profileImg) {
                console.log("Found profile image in localStorage:", playerData.profileImg);
                document.getElementById('playerAvatar').src = playerData.profileImg;
                return;
            }
        }
    }
    console.log("No profile image found in localStorage. Setting default image.");
    document.getElementById('playerAvatar').src = 'assets/playerAvatar.jpg';
}

window.addEventListener('load', initializeAvatar);

export function playerRegister() {
    ConstManager.connectBG.classList.remove('hidden');
    ConstManager.playerNameInput.classList.remove('hidden');
}

ConstManager.nameOutput.addEventListener('click', function() {
    registerPlayer();

    if (ConstManager.playerRegistered === true) {
        ConstManager.playerName.innerText = getQueryParam('username');
        ConstManager.playerHighscore.classList.remove('hidden');
        ConstManager.navLeftBox.style.backgroundColor = '#dad7cd';
        ConstManager.playerName.style.color = '#344e41'
        ConstManager.playerName.style.cursor = 'auto';
        ConstManager.playerName.removeEventListener('click', playerRegister);
    }
})

function updateUrlWithUsername(username) {
    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = `${baseUrl}?username=${encodeURIComponent(username)}`;
    window.history.replaceState({}, document.title, newUrl);
}

function registerPlayer() {
    const playerName = ConstManager.nameInput.value.trim();

    if (ConstManager.nameInput.value === "") {
        alert("Please enter a valid name.");
        return;
    }

    let player;

    const existingPlayerDataString = localStorage.getItem(playerName);
    if (existingPlayerDataString) {
        player = JSON.parse(existingPlayerDataString);

        const avatarInput = document.getElementById('avatarInput');
        if (avatarInput.files.length > 0) {
            const file = avatarInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
                if (e.target.result.length > MAX_IMAGE_SIZE) {
                    alert("Image size is too large. Please choose a smaller image.");
                    return;
                }
                player.profileImg = e.target.result;
                localStorage.setItem(playerName, JSON.stringify(player));
                document.getElementById('playerAvatar').src = e.target.result;
                alert("Player registered successfully!");
                createPlayerLeaderboard();
            };
            reader.readAsDataURL(file);
        }
    } else {
        const avatarImgData = document.getElementById('playerAvatar').src;
        player = new Player(playerName, 0, avatarImgData);
        localStorage.setItem(playerName, JSON.stringify(player));
        alert("Player registered successfully!");
        createPlayerLeaderboard();
    }

    ConstManager.nameInput.value = "";
    setTimeout(function() {
        console.log("Waited for 2 seconds!");
    }, 2000);

    ConstManager.connectBG.classList.add('hidden');
    ConstManager.playerNameInput.classList.add('hidden');
    ConstManager.playerRegistered = true;

    updateUrlWithUsername(playerName);
}



window.addEventListener('DOMContentLoaded', () => {
    const usernameParam = getQueryParam('username');
    if (usernameParam) {
        removeUsernameParamFromUrl();
    }
    createPlayerLeaderboard();
});

function removeUsernameParamFromUrl() {
    const baseUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, baseUrl);
}

window.addEventListener('unload', removeUsernameParamFromUrl);