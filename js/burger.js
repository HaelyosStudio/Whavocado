import { ConstManager } from "./class/ConstManager.js";

if (window.innerWidth <= 767) {
    
    document.getElementById('burgerButton').addEventListener('click', function() {
        burgerDisplay();
    })
    
    function burgerDisplay() {
    
        if (ConstManager.gameSection.style.marginTop === '270px') {
            ConstManager.gameSection.style.marginTop = '50px';
            ConstManager.burgerSection.classList.add('hidden');
        } else {
            ConstManager.gameSection.style.marginTop = '270px';
            ConstManager.burgerSection.classList.remove('hidden');
        }
    
        if (ConstManager.rulesSection.className !== 'hidden') {
            ConstManager.rulesSection.classList.add('hidden');
        }
    
        if (ConstManager.leaderboardSection.className !== 'hidden') {
            ConstManager.leaderboardSection.classList.add('hidden');
        }
    
        if (ConstManager.settingsSection.className !== 'hidden') {
            ConstManager.settingsSection.classList.add('hidden');
        }
    }
    
    document.getElementById('playButton').addEventListener('click', function() {
        playDisplay();
    })
    
    function playDisplay() {
        if (ConstManager.gameSection.style.marginTop === '270px') {
            ConstManager.gameSection.style.marginTop = '50px';
            ConstManager.burgerSection.classList.add('hidden');
            location.reload();
        }
    
    }
    
    document.getElementById('rulesButton').addEventListener('click', function() {
        rulesDisplay();
    })
    
    function rulesDisplay() {
    
        ConstManager.burgerSection.classList.add('hidden');
        ConstManager.rulesSection.classList.remove('hidden');
        ConstManager.rulesText.classList.remove('hidden');
    }
    
    document.getElementById('leaderboardButton').addEventListener('click', function() {
        leaderboardDisplay();
    })
    
    function leaderboardDisplay() {
    
        ConstManager.burgerSection.classList.add('hidden');
        ConstManager.leaderboardSection.classList.remove('hidden');
    }
    
    document.getElementById('settingsButton').addEventListener('click', function() {
        settingsDisplay();
    })
    
    function settingsDisplay() {
    
        ConstManager.burgerSection.classList.add('hidden');
        ConstManager.settingsSection.classList.remove('hidden');
    }
    
    document.getElementById('closeRulesButton').addEventListener('click', function() {
        rulesClose();
    });
    
    function rulesClose() {
    
        ConstManager.rulesSection.classList.add('hidden');
        ConstManager.gameSection.style.marginTop = '50px';
    }
    
    document.getElementById('closeLeaderboardButton').addEventListener('click', function() {
        leaderboardClose();
    });
    
    function leaderboardClose() {
    
        ConstManager.leaderboardSection.classList.add('hidden');
        ConstManager.gameSection.style.marginTop = '50px';
    }
    
    document.getElementById('closeSettingsButton').addEventListener('click', function() {
        settingsClose();
    });
    
    function settingsClose() {
    
        ConstManager.settingsSection.classList.add('hidden');
        ConstManager.gameSection.style.marginTop = '50px';
    }
}