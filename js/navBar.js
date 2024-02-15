import { ConstManager } from "./class/ConstManager.js";

console.log("Window width:", window.innerWidth);

if (window.innerWidth >= 768 && window.innerWidth <= 1244) {
    console.log("Inside 768px - 1244px block");

    document.getElementById('navPlay').addEventListener('click', function() {
        location.reload();
    })


    document.getElementById('navRules').addEventListener('click', function() {

        if (ConstManager.gameSection.style.marginTop !== '270px') {
            ConstManager.rulesSection.classList.remove('hidden');
            ConstManager.rulesText.classList.remove('hidden');
            ConstManager.gameSection.style.marginTop = '270px';
        } else if (ConstManager.gameSection.style.marginTop === '270px') {
            ConstManager.rulesSection.classList.add('hidden');
            ConstManager.rulesText.classList.add('hidden');
            ConstManager.gameSection.style.marginTop = '150px';
        }
    })   
    
    document.getElementById('navLeaderboard').addEventListener('click', function() {

        if (ConstManager.gameSection.style.marginTop !== '270px') {
            ConstManager.leaderboardSection.classList.remove('hidden');
            ConstManager.gameSection.style.marginTop = '270px';
        } else if (ConstManager.gameSection.style.marginTop === '270px') {
            ConstManager.leaderboardSection.classList.add('hidden');
            ConstManager.gameSection.style.marginTop = '150px';
        }
    })

    document.getElementById('navSettings').addEventListener('click', function() {

        if (ConstManager.gameSection.style.marginTop !== '270px') {
            ConstManager.settingsSection.classList.remove('hidden');
            ConstManager.gameSection.style.marginTop = '270px';
        } else if (ConstManager.gameSection.style.marginTop === '270px') {
            ConstManager.settingsSection.classList.add('hidden');
            ConstManager.gameSection.style.marginTop = '150px';
        }
    })

    document.getElementById('closeRulesButton').addEventListener('click', function() {
        ConstManager.rulesSection.classList.add('hidden');
        ConstManager.gameSection.style.marginTop = '150px';
    });

    document.getElementById('closeLeaderboardButton').addEventListener('click', function() {
        ConstManager.leaderboardSection.classList.add('hidden');
        ConstManager.gameSection.style.marginTop = '150px';
    });

    document.getElementById('closeSettingsButton').addEventListener('click', function() {
        ConstManager.settingsSection.classList.add('hidden');
        ConstManager.gameSection.style.marginTop = '150px';
    });

} else if (window.innerWidth >= 1245) {
    console.log("Inside >= 1245px block");
    
    document.getElementById('navPlay').addEventListener('click', function() {
        location.reload();
    })


    document.getElementById('navRules').addEventListener('click', function() {

        if (ConstManager.gameSection.style.marginLeft !== '40%') {
            ConstManager.rulesSection.classList.remove('hidden');
            ConstManager.rulesText.classList.remove('hidden');
            ConstManager.gameSection.style.marginLeft = '40%';
        } else if (ConstManager.gameSection.style.marginLeft === '40%') {
            ConstManager.rulesSection.classList.add('hidden');
            ConstManager.rulesText.classList.add('hidden');
            ConstManager.gameSection.style.marginLeft = '0px';
        }
    })   
    
    document.getElementById('navLeaderboard').addEventListener('click', function() {

        if (ConstManager.gameSection.style.marginLeft !== '40%') {
            ConstManager.leaderboardSection.classList.remove('hidden');
            ConstManager.gameSection.style.marginLeft = '40%';
        } else if (ConstManager.gameSection.style.marginLeft === '40%') {
            ConstManager.leaderboardSection.classList.add('hidden');
            ConstManager.gameSection.style.marginLeft = '0px';
        }
    })

    document.getElementById('navSettings').addEventListener('click', function() {

        if (ConstManager.gameSection.style.marginLeft !== '40%') {
            ConstManager.settingsSection.classList.remove('hidden');
            ConstManager.gameSection.style.marginLeft = '40%';
        } else if (ConstManager.gameSection.style.marginLeft === '40%') {
            ConstManager.settingsSection.classList.add('hidden');
            ConstManager.gameSection.style.marginLeft = '0px';
        }
    })

    document.getElementById('closeRulesButton').addEventListener('click', function() {
        ConstManager.rulesSection.classList.add('hidden');
        ConstManager.gameSection.style.marginLeft = '0px';
    });

    document.getElementById('closeLeaderboardButton').addEventListener('click', function() {
        ConstManager.leaderboardSection.classList.add('hidden');
        ConstManager.gameSection.style.marginLeft = '0px';
    });

    document.getElementById('closeSettingsButton').addEventListener('click', function() {
        ConstManager.settingsSection.classList.add('hidden');
        ConstManager.gameSection.style.marginLeft = '0px';
    });
}