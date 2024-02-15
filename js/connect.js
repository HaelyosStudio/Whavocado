import { ConstManager } from "./class/ConstManager.js";
import { Player } from "./class/playerInfos.js";
import { createPlayerLeaderboard } from "./leaderboard.js";

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

ConstManager.playerName.addEventListener('click', playerRegister);

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

function registerPlayer() {
    const playerName = ConstManager.nameInput.value.trim();

    if (ConstManager.nameInput.value === "") {
        alert("Please enter a valid name.");
        return;
    }

    const existingPlayerDataString = localStorage.getItem(playerName);
    if (existingPlayerDataString) {

        updateUrlWithUsername(playerName);
        alert("Player already registered.");
        ConstManager.nameInput.value = "";
        ConstManager.connectBG.classList.add('hidden');
        ConstManager.playerNameInput.classList.add('hidden');
        ConstManager.playerRegistered = true;
        return;
    }

    const player = new Player(playerName, 0);

    localStorage.setItem(playerName, JSON.stringify(player));

    alert("Player registered successfully!");

    ConstManager.nameInput.value = "";

    setTimeout(function() {
        console.log("Waited for 2 seconds!");
    }, 2000);

    ConstManager.connectBG.classList.add('hidden');
    ConstManager.playerNameInput.classList.add('hidden');

    ConstManager.playerRegistered = true;

    function updateUrlWithUsername(username) {

        const baseUrl = window.location.origin + window.location.pathname;
        const newUrl = `${baseUrl}?username=${encodeURIComponent(username)}`;
    
        window.history.replaceState({}, document.title, newUrl);
    }

    createPlayerLeaderboard();
    updateUrlWithUsername(playerName);
}

window.addEventListener('DOMContentLoaded', () => {
    const usernameParam = getQueryParam('username');
    if (usernameParam) {
        removeUsernameParamFromUrl();
    }
});

function removeUsernameParamFromUrl() {
    const baseUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, baseUrl);
}

window.addEventListener('unload', removeUsernameParamFromUrl);