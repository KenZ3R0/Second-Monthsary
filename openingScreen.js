const messages = [
    { text: 'hi' },
    { text: 'welcome po sa aking humble abode' },
    { text: 'ay wow may website nanaman' },
    { text: 'oo ikaw nanaman dahilan nito' },
    { text: 'HAHAHAHAHAHA' },
    { text: 'anyways,' },
    { text: 'before anything else...' },
    { text: 'congratulations 🎉' },
    { text: 'you have successfully clicked through another one of my yap sessions' },
    { text: 'wala ka nang takas' },
    { text: 'since nandito ka na...' },
    { text: 'might as well continue diba' },

    {
        text: 'pero first, may trabaho ka muna 😭',
        button: {
            text: 'ano nanaman po yan',
            onClick: () => {
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 70,
                        spread: 70,
                        origin: { y: 0.72 }
                    });
                }
            }
        }
    },

    { text: 'AYANNN' },
    { text: 'good girl 😭' },
    { text: 'working as intended' },
    { text: '10/10 QA tester' },
    { text: 'wala akong ibang tester eh' },
    { text: 'ikaw lang talaga pinagkakaisahan ko' },
    { text: 'HAHAHAHAHA' },

    { text: 'anyways...' },
    { text: 'two months na tayo' },
    { text: 'TWO.' },
    { text: 'MONTHS.' },
    { text: 'bro what the hell 😭' },
    { text: 'parang kelan lang...' },
    { text: 'nagsisimula pa lang tayo mag usap' },
    { text: 'tapos ngayon gumagawa na ako ng website para sa monthsary natin' },
    { text: 'normal behavior 👍' },

{ text: 'SYSTEM INITIALIZING...' },
{ text: 'loading girlfriend...' },
{ text: 'girlfriend detected.' },
{ text: 'status: cute' },
{ text: 'status: nakakainis minsan' },
{ text: 'status: mahal pa rin' },
{ text: 'all systems operational.' },
{ text: 'welcome, babi.' },

    { text: 'pero seryoso,' },
    { text: 'ang bilis talaga ng panahon' },
    { text: 'ang dami na rin nating pinagdaanan' },
    { text: 'may mga tampuhan' },
    { text: 'may mga away' },
    { text: 'may mga bati' },
    { text: 'may mga "opo"' },
    { text: 'at napakaraming HAHAHAHAHAHA' },
    { text: 'somehow...' },
    { text: 'nandito pa rin tayo' },

    {
        text: 'and honestly, im really happy about that.',
        effects: ['hearts-background'],
        lockScreen: { enabled: true, duration: 2000 }
    },

    { text: 'kasi kahit gaano tayo ka-chaotic minsan...' },
    { text: 'ikaw pa rin yung gusto kong kausap' },
    { text: 'ikaw pa rin yung gusto kong kulitin' },
    { text: 'ikaw pa rin yung gusto kong lambingin' },
    { text: 'at unfortunately...' },
    { text: 'ikaw pa rin ang victim ng mga website ko 😭' },

    {
        text: 'ken rizz ∞',
        effects: ['rizz-background', 'rizz-title'],
        lockScreen: { enabled: true, duration: 2000 }
    },

    { text: 'okay tama na baka maumay ka na' },
    { text: 'pero may isa pa akong sasabihin' },
    { text: 'thank you.' },
    { text: 'thank you for staying.' },
    { text: 'thank you for putting up with me.' },
    { text: 'thank you sa lahat ng lambing, kulit, patience, at pagmamahal.' },
    { text: 'and thank you for being you.' },

    { text: 'i love you, babi.' },

    {
        text: 'Happy 2nd Monthsary!! ♡',
        button: {
            text: 'CELEBRATE NA 😭',
            onClick: () => {
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 80,
                        origin: { y: 0.6 }
                    });
                }
            }
        }
    }
];

const totalClicksNeeded = messages.length;
let clickCount = 0;
let isCooldown = false;
let isFinished = false;

function createOpeningScreen() {
    const openingScreen = document.getElementById('openingScreen');
    if (!openingScreen) return;

    openingScreen.innerHTML = `
        <div class="opening-content">
            <h1 class="opening-title" id="openingTitle">${messages[0].text}</h1>
            <p class="click-instruction" id="openingHint">Click anywhere</p>
        </div>
    `;
}

function eventListeners() {
    const openingScreen = document.getElementById('openingScreen');
    if (!openingScreen) return;

    openingScreen.addEventListener('click', handleClick);
}

function handleClick() {
    if (isCooldown || isFinished) return;
    if (messages[clickCount] && messages[clickCount].button) return;

    advanceToNextMessage();
}

function advanceToNextMessage(force = false) {
    if (isCooldown && !force) return;

    isCooldown = true;
    clickCount++;

    pulseOpeningContent();
    updateOpeningMessage();

    if (clickCount >= totalClicksNeeded) {
        showEnding();
        return;
    }

    setTimeout(() => {
        isCooldown = false;
    }, 500);
}

function pulseOpeningContent() {
    const openingContent = document.querySelector('.opening-content');
    if (!openingContent) return;

    openingContent.classList.remove('click-pop');
    void openingContent.offsetWidth;
    openingContent.classList.add('click-pop');
}

function updateOpeningMessage() {
    const title = document.getElementById('openingTitle');
    const hint = document.getElementById('openingHint');
    const currentMessage = messages[clickCount];

    if (!title || !hint || !currentMessage) return;

    title.classList.remove('title-swap-in');
    title.classList.add('title-swap-out');

    setTimeout(() => {
        title.classList.remove('title-swap-out');
        title.classList.add('title-swap-in');
        renderMessage(title, hint, currentMessage);

        currentMessage.effects?.forEach(applyEffect);
        if (currentMessage.lockScreen?.enabled) {
            lockInteraction(hint, currentMessage.lockScreen.duration);
        }
    }, 180);
}

function renderMessage(title, hint, message) {
    if (message.button) {
        hint.style.display = 'none';
        title.innerHTML = `${message.text}<br><button type="button" class="opening-action-btn" id="dynamicButton">${message.button.text}</button>`;

        const dynamicButton = document.getElementById('dynamicButton');
        if (!dynamicButton) return;

        dynamicButton.addEventListener('click', (event) => {
            event.stopPropagation();
            message.button.onClick();
            dynamicButton.remove();
            hint.style.display = 'block';
            advanceToNextMessage(true);
        });
        return;
    }

    hint.style.display = 'block';
    title.textContent = message.text;
}

function lockInteraction(hint, duration = 1800) {
    const screen = document.getElementById('openingScreen');
    if (!screen) return;

    hint.style.display = 'none';
    screen.style.pointerEvents = 'none';

    setTimeout(() => {
        screen.style.pointerEvents = 'auto';
        hint.style.display = 'block';
    }, duration);
}

function applyEffect(effect) {
    const map = {
        'rizz-background': rizzBackground,
        'rizz-title': rizzTitle,
        'hearts-background': heartsBackground
    };

    map[effect]?.();
}

function rizzBackground() {
    const screen = document.getElementById('openingScreen');
    const title = document.getElementById('openingTitle');
    if (!screen || !title) return;

    const overlay = document.createElement('div');
    overlay.className = 'rizz-overlay';
    screen.appendChild(overlay);

    title.classList.add('rizz-text');

    setTimeout(() => overlay.classList.add('grow'), 80);
    setTimeout(() => {
        overlay.classList.remove('grow');
        setTimeout(() => {
            overlay.remove();
            title.classList.remove('rizz-text');
        }, 680);
    }, 1800);
}

function rizzTitle() {
    const title = document.getElementById('openingTitle');
    if (!title) return;

    const fonts = [
        "'Fraunces', Georgia, serif",
        "'DM Serif Display', Georgia, serif",
        "'Bricolage Grotesque', 'Segoe UI', sans-serif",
        "'Lucida Handwriting', cursive",
        "'Brush Script MT', cursive",
        "'Copperplate', serif",
        "'Arial Black', sans-serif",
        "'Impact', sans-serif",
        "'Georgia', serif",
        "'Times New Roman', serif",
        "'Verdana', sans-serif",
        "'Trebuchet MS', sans-serif",
        "'Gill Sans', sans-serif",
        "'Courier New', monospace",
        "'Palatino Linotype', 'Book Antiqua', Palatino, serif"
    ];

    let index = 0;
    const interval = setInterval(() => {
        title.style.fontFamily = fonts[index];
        index = (index + 1) % fonts.length;
    }, 140);

    setTimeout(() => {
        clearInterval(interval);
        title.style.fontFamily = "'DM Serif Display', Georgia, serif";
    }, 1700);
}

function heartsBackground() {
    const container = document.getElementById('openingScreen');
    if (!container) return;

    Array.from({ length: 30 }).forEach(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${10 + Math.random() * 20}px`;
        heart.style.setProperty('--delay', `${Math.random() * 1.4}s`);
        heart.style.setProperty('--float-distance', `${58 + Math.random() * 38}vh`);

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 2400);
    });
}

function showEnding() {
    const openingScreen = document.getElementById('openingScreen');
    if (!openingScreen) return;

    isFinished = true;
    openingScreen.removeEventListener('click', handleClick);
    openingScreen.classList.remove('fade-out');
    openingScreen.style.cursor = 'default';
    openingScreen.innerHTML = `
        <div class="opening-content ending-content">
            <h1 class="opening-title">Happy 5th Monthsary, Love</h1>
            <p class="click-instruction">Ayunnn lang po ^^.</p>
            <a class="opening-action-btn" href="../index.html">Go back to selection</a>
        </div>
    `;

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.66 }
        });
    }
}

function initOpeningScreen() {
    createOpeningScreen();
    eventListeners();
}

export { initOpeningScreen };
