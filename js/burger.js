const gameSection = document.getElementById('gameSectionBox');
const burgerSection = document.getElementById('burgerOptionsBox');
const rulesSection = document.getElementById('rulesBox');
const rulesText = document.getElementById('rulesTextBox');
const settingsSection = document.getElementById('settingsBox');
const leaderboardSection = document.getElementById('leaderboardBox');

document.getElementById('burgerButton').addEventListener('click', function() {
    burgerDisplay();
})

function burgerDisplay() {


    if (gameSection.style.marginTop === '270px') {
        gameSection.style.marginTop = '150px';
        burgerSection.classList.add('hidden');
    } else {
        gameSection.style.marginTop = '270px';
        burgerSection.classList.remove('hidden');
    }

    if (rulesSection.className !== 'hidden') {
        rulesSection.classList.add('hidden');
    }

    if (leaderboardSection.className !== 'hidden') {
        leaderboardSection.classList.add('hidden');
    }
    

    if (settingsSection.className !== 'hidden') {
        settingsSection.classList.add('hidden');
    }
}

document.getElementById('playButton').addEventListener('click', function() {
    playDisplay();
})

function playDisplay() {
    if (gameSection.style.marginTop === '270px') {
        gameSection.style.marginTop = '150px';
        burgerSection.classList.add('hidden');
        location.reload();
    }

}

document.getElementById('rulesButton').addEventListener('click', function() {
    rulesDisplay();
})

function rulesDisplay() {

    burgerSection.classList.add('hidden');
    rulesSection.classList.remove('hidden');
    rulesText.classList.remove('hidden');
}

document.getElementById('leaderboardButton').addEventListener('click', function() {
    leaderboardDisplay();
})

function leaderboardDisplay() {

    burgerSection.classList.add('hidden');
    leaderboardSection.classList.remove('hidden');
}

document.getElementById('settingsButton').addEventListener('click', function() {
    settingsDisplay();
})

function settingsDisplay() {

    burgerSection.classList.add('hidden');
    settingsSection.classList.remove('hidden');
}

document.getElementById('closeRulesButton').addEventListener('click', function() {
    rulesClose();
});

function rulesClose() {
    rulesSection.classList.add('hidden');
    gameSection.style.marginTop = '150px';
}

document.getElementById('closeLeaderboardButton').addEventListener('click', function() {
    leaderboardClose();
});

function leaderboardClose() {
    leaderboardSection.classList.add('hidden');
    gameSection.style.marginTop = '150px';
}

document.getElementById('closeSettingsButton').addEventListener('click', function() {
    settingsClose();
});

function settingsClose() {
    settingsSection.classList.add('hidden');
    gameSection.style.marginTop = '150px';
}
