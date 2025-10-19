// js/game.js

// Estado do jogo
const gameState = {
    playerName: '',
    playerAge: '',
    avatar: 'monkey',
    points: 0,
    achievements: {
        firstSteps: { unlocked: false, progress: 0, target: 5 },
        letterMaster: { unlocked: false, progress: 0, target: 10 },
        numberGenius: { unlocked: false, progress: 0, target: 15 },
        explorer: { unlocked: false, progress: 0, target: 3 },
        shiningStar: { unlocked: false, progress: 0, target: 1 }
    },
    settings: {
        opendyslexic: false,
        uppercase: false,
        audio: true,
        sound: true,
        music: true
    },
    activitiesCompleted: 0
};

// Elementos DOM
const screens = {
    welcome: document.getElementById('welcome-screen'),
    settings: document.getElementById('settings-screen'),
    avatar: document.getElementById('avatar-screen'),
    main: document.getElementById('main-screen'),
    math: document.getElementById('math-screen'),
    achievements: document.getElementById('achievements-screen')
};

// Inicialização do jogo
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
    loadGameProgress();
});

function initializeGame() {
    // Configurações iniciais
    updateSettingsDisplay();
}

function setupEventListeners() {
    // Navegação entre telas
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('settings-btn').addEventListener('click', showSettings);
    document.getElementById('settings-back').addEventListener('click', showMainScreen);
    document.getElementById('avatar-back').addEventListener('click', showMainScreen);
    document.getElementById('math-back').addEventListener('click', showMainScreen);
    document.getElementById('achievements-back').addEventListener('click', showMainScreen);
    
    // Configurações
    document.getElementById('opendyslexic-font').addEventListener('change', toggleOpendyslexic);
    document.getElementById('uppercase-letters').addEventListener('change', toggleUppercase);
    document.getElementById('audio-reading').addEventListener('change', toggleAudio);
    document.getElementById('sound-effects').addEventListener('change', toggleSound);
    document.getElementById('theme-music').addEventListener('change', toggleMusic);
    
    // Seleção de avatar
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', selectAvatar);
    });
    
    // Atividades
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', handleActivitySelection);
    });
    
    // Opções de matemática
    const mathOptions = document.querySelectorAll('.math-option');
    mathOptions.forEach(option => {
        option.addEventListener('click', checkMathAnswer);
    });
}

function startGame() {
    const name = document.getElementById('player-name').value.trim();
    const age = document.getElementById('player-age').value;
    
    if (!name || !age) {
        alert('Por favor, digite seu nome e idade!');
        return;
    }
    
    gameState.playerName = name;
    gameState.playerAge = age;
    
    showAvatarSelection();
}

function showScreen(screenName) {
    // Esconde todas as telas
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostra a tela solicitada
    screens[screenName].classList.add('active');
    
    // Atualiza informações na tela principal
    if (screenName === 'main') {
        updateMainScreen();
    }
}

function showAvatarSelection() {
    showScreen('avatar');
}

function showSettings() {
    showScreen('settings');
}

function showMainScreen() {
    showScreen('main');
}

function showMathActivities() {
    showScreen('math');
}

function showAchievements() {
    showScreen('achievements');
    updateAchievementsDisplay();
}

function selectAvatar(event) {
    const avatarOption = event.currentTarget;
    const avatar = avatarOption.dataset.avatar;
    
    // Remove seleção anterior
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Adiciona seleção atual
    avatarOption.classList.add('selected');
    
    gameState.avatar = avatar;
    
    // Mostra tela principal após seleção
    setTimeout(() => {
        showMainScreen();
    }, 500);
}

function handleActivitySelection(event) {
    const activityCard = event.currentTarget;
    const activity = activityCard.dataset.activity;
    
    switch(activity) {
        case 'math':
            showMathActivities();
            break;
        case 'portuguese':
            // Em implementação futura
            alert('Floresta das Letras Encantadas - Em breve!');
            break;
        case 'achievements':
            showAchievements();
            break;
        case 'secret':
            // Em implementação futura
            alert('Missões Secretas - Complete mais atividades para desbloquear!');
            break;
    }
}

function checkMathAnswer(event) {
    const selectedOption = event.currentTarget;
    const answer = selectedOption.dataset.answer;
    
    // Resposta correta para a pergunta do panda
    const correctAnswer = '5';
    
    if (answer === correctAnswer) {
        // Resposta correta
        selectedOption.style.background = '#98FB98';
        playSound('correct');
        
        // Atualiza progresso
        gameState.points += 10;
        gameState.activitiesCompleted++;
        gameState.achievements.firstSteps.progress++;
        
        // Verifica conquistas
        checkAchievements();
        
        // Atualiza display
        updateMainScreen();
        
        // Feedback visual
        setTimeout(() => {
            selectedOption.style.background = '';
            showMainScreen();
        }, 1500);
    } else {
        // Resposta incorreta
        selectedOption.style.background = '#FF6B6B';
        setTimeout(() => {
            selectedOption.style.background = '';
        }, 1000);
    }
}

// Configurações
function toggleOpendyslexic(event) {
    gameState.settings.opendyslexic = event.target.checked;
    updateSettingsDisplay();
    saveGameProgress();
}

function toggleUppercase(event) {
    gameState.settings.uppercase = event.target.checked;
    updateSettingsDisplay();
    saveGameProgress();
}

function toggleAudio(event) {
    gameState.settings.audio = event.target.checked;
    saveGameProgress();
}

function toggleSound(event) {
    gameState.settings.sound = event.target.checked;
    saveGameProgress();
}

function toggleMusic(event) {
    gameState.settings.music = event.target.checked;
    saveGameProgress();
}

function updateSettingsDisplay() {
    // Aplica configurações de acessibilidade
    if (gameState.settings.opendyslexic) {
        document.body.classList.add('opendyslexic');
    } else {
        document.body.classList.remove('opendyslexic');
    }
    
    if (gameState.settings.uppercase) {
        document.body.classList.add('uppercase');
    } else {
        document.body.classList.remove('uppercase');
    }
    
    // Atualiza checkboxes
    document.getElementById('opendyslexic-font').checked = gameState.settings.opendyslexic;
    document.getElementById('uppercase-letters').checked = gameState.settings.uppercase;
    document.getElementById('audio-reading').checked = gameState.settings.audio;
    document.getElementById('sound-effects').checked = gameState.settings.sound;
    document.getElementById('theme-music').checked = gameState.settings.music;
}

function updateMainScreen() {
    // Atualiza informações do jogador
    document.getElementById('player-display-name').textContent = gameState.playerName;
    
    // Atualiza avatar
    const avatarEmojis = {
        monkey: '🐵',
        owl: '🦉',
        fox: '🦊',
        tiger: '🐯',
        koala: '🐨',
        elephant: '🐘'
    };
    document.getElementById('player-avatar').textContent = avatarEmojis[gameState.avatar];
    
    // Atualiza estatísticas
    document.getElementById('points-counter').textContent = gameState.points;
    
    const unlockedAchievements = Object.values(gameState.achievements).filter(
        ach => ach.unlocked
    ).length;
    document.getElementById('achievements-counter').textContent = 
        `${unlockedAchievements}/${Object.keys(gameState.achievements).length}`;
}

function updateAchievementsDisplay() {
    const achievementsList = document.querySelector('.achievements-list');
    achievementsList.innerHTML = '';
    
    Object.entries(gameState.achievements).forEach(([key, achievement]) => {
        const achievementItem = document.createElement('div');
        achievementItem.className = `achievement-item ${achievement.unlocked ? '' : 'locked'}`;
        
        const progressPercent = (achievement.progress / achievement.target) * 100;
        
        achievementItem.innerHTML = `
            <div class="achievement-icon">${getAchievementIcon(key)}</div>
            <div class="achievement-info">
                <h3>${getAchievementName(key)}</h3>
                <p>${getAchievementDescription(key)}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${progressPercent}%"></div>
                </div>
            </div>
        `;
        
        achievementsList.appendChild(achievementItem);
    });
}

function getAchievementIcon(key) {
    const icons = {
        firstSteps: '🏆',
        letterMaster: '🎯',
        numberGenius: '🔢',
        explorer: '🕵️',
        shiningStar: '⭐'
    };
    return icons[key] || '🏅';
}

function getAchievementName(key) {
    const names = {
        firstSteps: 'Primeiros Passos',
        letterMaster: 'Mestre das Letras',
        numberGenius: 'Gênio dos Números',
        explorer: 'Explorador',
        shiningStar: 'Estrela Brilhante'
    };
    return names[key] || 'Conquista';
}

function getAchievementDescription(key) {
    const descriptions = {
        firstSteps: `Complete ${gameState.achievements.firstSteps.target} atividades`,
        letterMaster: `Acerte ${gameState.achievements.letterMaster.target} palavras consecutivas`,
        numberGenius: `Resolva ${gameState.achievements.numberGenius.target} problemas de matemática`,
        explorer: `Descubra ${gameState.achievements.explorer.target} atividades secretas`,
        shiningStar: `Complete uma missão sem erros`
    };
    return descriptions[key] || 'Desbloqueie esta conquista';
}

function checkAchievements() {
    // Primeiros Passos
    if (gameState.achievements.firstSteps.progress >= gameState.achievements.firstSteps.target) {
        gameState.achievements.firstSteps.unlocked = true;
    }
    
    // Gênio dos Números (exemplo simplificado)
    if (gameState.activitiesCompleted >= 3) { // Apenas para demonstração
        gameState.achievements.numberGenius.unlocked = true;
    }
    
    // Se alguma conquista foi desbloqueada, mostrar celebração
    const newlyUnlocked = Object.entries(gameState.achievements).filter(
        ([key, ach]) => ach.unlocked && !ach.previouslyUnlocked
    );
    
    if (newlyUnlocked.length > 0) {
        celebrateAchievement();
    }
}

function celebrateAchievement() {
    if (gameState.settings.sound) {
        playSound('success');
    }
    
    // Efeito visual de celebração
    document.body.classList.add('celebration');
    setTimeout(() => {
        document.body.classList.remove('celebration');
    }, 2000);
}

function playSound(soundType) {
    if (!gameState.settings.sound) return;
    
    const sound = document.getElementById(`${soundType}-sound`);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Reprodução de áudio impedida:', e));
    }
}

// Persistência de dados
function saveGameProgress() {
    localStorage.setItem('eduzoo-save', JSON.stringify(gameState));
}

function loadGameProgress() {
    const saved = localStorage.getItem('eduzoo-save');
    if (saved) {
        const savedState = JSON.parse(saved);
        Object.assign(gameState, savedState);
        updateSettingsDisplay();
        updateMainScreen();
    }
}

// Inicializa quando a página carrega
window.addEventListener('beforeunload', saveGameProgress);