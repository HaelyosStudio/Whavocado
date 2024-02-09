document.getElementById('burgerButton').addEventListener('click', function() {
    burgerDisplay();
})

function burgerDisplay() {
    const gameSection = document.getElementById('gameSectionBox');
    const burgerSection = document.getElementById('burgerOptionsBox');

    if (gameSection.style.marginTop === '270px') {
        gameSection.style.marginTop = '150px';
        burgerSection.classList.add('hidden');
    } else {
        gameSection.style.marginTop = '270px';
        burgerSection.classList.remove('hidden');
    }
}

document.getElementById('playButton').addEventListener('click', function() {
    playDisplay();
})

function playDisplay() {
    const burgerSection = document.getElementById('burgerOptionsBox');
    const gameSection = document.getElementById('gameSectionBox');

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
    const burgerSection = document.getElementById('burgerOptionsBox');
    const rulesSection = document.getElementById('rulesBox');
    const rulesText = document.getElementById('rulesTextBox');
    const closeButton = document.getElementById('closeButton');

    burgerSection.classList.add('hidden');
    rulesSection.classList.remove('hidden');
    rulesText.classList.remove('hidden');
    closeButton.classList.remove('hidden');

}

document.getElementById('leaderboardButton').addEventListener('click', function() {
    leaderboardDisplay();
})

function leaderboardDisplay() {
    const burgerSection = document.getElementById('burgerOptionsBox');
}

document.getElementById('settingsButton').addEventListener('click', function() {
    settingsDisplay();
})