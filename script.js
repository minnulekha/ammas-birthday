document.addEventListener('DOMContentLoaded', () => {
    
    // --- FALLING HEARTS ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '&#10084;'; 
        const size = Math.random() * 15 + 10; 
        const position = Math.random() * window.innerWidth; 
        const duration = Math.random() * 6 + 6; 
        heart.style.left = `${position}px`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, duration * 1000); 
    }
    setInterval(createHeart, 500); 

    // --- GLOBAL POPUP SYSTEM ---
    const modal = document.getElementById('popup-modal');
    const modalText = document.getElementById('modal-text');
    const modalBtn = document.getElementById('modal-btn');
    let nextScreenTarget = '';

    function triggerPopup(message, btnText, targetScreenId) {
        modalText.innerHTML = message;
        modalBtn.innerHTML = btnText;
        nextScreenTarget = targetScreenId;
        modal.classList.remove('hidden');
    }

    modalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        if (nextScreenTarget === 'RELOAD') {
            location.reload();
        } else {
            const currentActive = document.querySelector('.screen.active');
            if (currentActive) {
                showScreen(currentActive.id, nextScreenTarget);
            }
        }
    });

    // --- SCREEN NAVIGATION ---
    function showScreen(currentId, nextId) {
        document.getElementById(currentId).classList.remove('active');
        setTimeout(() => { 
            document.getElementById(nextId).classList.add('active'); 
            if (nextId === 'screen-photos') startSlideshow();
        }, 1000); 
    }

    // --- 1. START LOGIC ---
    const bgMusic = document.getElementById('bg-music');
    document.getElementById('reveal-trigger').addEventListener('click', () => {
        bgMusic.play().catch(() => console.log("Music blocked"));
        showScreen('screen-home', 'screen-cake');
    });

    // --- 2. CAKE LOGIC ---
    const btnLight = document.getElementById('btn-light');
    const flame = document.getElementById('flame');
    const smoke = document.getElementById('smoke'); 
    const knife = document.getElementById('knife');
    const slice = document.getElementById('slice');
    const instruct = document.getElementById('instruction');

    let isLit = false, isBlownOut = false;

    btnLight.addEventListener('click', () => {
        flame.classList.add('lit');
        isLit = true;
        btnLight.classList.add('hidden');
        instruct.innerHTML = "Tap the flame to blow it out! 💨";
        instruct.classList.remove('hidden');
    });

    flame.addEventListener('click', () => {
        if (isLit && !isBlownOut) {
            flame.classList.remove('lit'); 
            smoke.classList.remove('hidden');
            smoke.classList.add('puff'); 
            isBlownOut = true;
            instruct.innerHTML = "Now tap the knife to cut the cake! 🔪";
        }
    });

    knife.addEventListener('click', () => {
        if (!isBlownOut) return; 
        knife.classList.add('cutting');
        instruct.classList.add('hidden');
        setTimeout(() => { slice.classList.add('eaten'); }, 600);
        setTimeout(() => {
            triggerPopup("Yay! Ready for the next surprise?", "Next Surprise ⟶", "screen-balloons");
        }, 1500);
    });

    // --- 3. BALLOONS LOGIC (SHATTERING ADDED) ---
    const balloons = document.querySelectorAll('.balloon');
    let poppedCount = 0;
    const popSound = new Audio('pop.mp3');

    function createBurst(x, y) {
        const fragments = ['🎈', '✨', '💖', '✨']; // Different pieces popping out
        for (let i = 0; i < 12; i++) {
            const piece = document.createElement('div');
            piece.className = 'balloon-fragment';
            piece.innerHTML = fragments[Math.floor(Math.random() * fragments.length)];
            
            // Random direction and rotation
            const moveX = (Math.random() - 0.5) * 400;
            const moveY = (Math.random() - 0.5) * 400;
            const rotate = Math.random() * 720;

            piece.style.setProperty('--move-x', `${moveX}px`);
            piece.style.setProperty('--move-y', `${moveY}px`);
            piece.style.setProperty('--rotate', `${rotate}deg`);
            
            piece.style.left = `${x}px`;
            piece.style.top = `${y}px`;

            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 800);
        }
    }

    balloons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            if (!balloon.classList.contains('popped')) {
                const rect = balloon.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                popSound.currentTime = 0;
                popSound.play().catch(() => {});
                createBurst(centerX, centerY);

                balloon.classList.add('popped');
                balloon.previousElementSibling.classList.add('revealed'); 
                
                poppedCount++;
                if (poppedCount === balloons.length) {
                    setTimeout(() => { 
                        triggerPopup("You truly are the best!", "See Memories ⟶", "screen-photos");
                    }, 1000);
                }
            }
        });
    });

    // --- 4. SLIDESHOW LOGIC ---
    const slideImg = document.getElementById('slideshow-img');
    const skipBtn = document.getElementById('skip-slideshow-btn');
    let slideIndex = 1; 
    const totalPhotos = 23;
    let slideshowInterval; 

    function goToNextSlide() {
        slideIndex++;
        if (slideIndex <= totalPhotos) {
            slideImg.style.opacity = 0;
            setTimeout(() => {
                slideImg.src = `mom${slideIndex}.jpeg`;
                slideImg.style.opacity = 1;
            }, 500); 
        } else {
            clearInterval(slideshowInterval);
            triggerPopup("So many beautiful memories...", "Open My Message ⟶", "screen-message");
        }
    }

    function startSlideshow() {
        slideIndex = 1;
        slideImg.src = `mom${slideIndex}.jpeg`;
        slideImg.style.opacity = 1; 
        slideImg.addEventListener('click', goToNextSlide);
        slideshowInterval = setInterval(goToNextSlide, 3500); 
    }

    if(skipBtn) skipBtn.addEventListener('click', () => {
        clearInterval(slideshowInterval);
        triggerPopup("Skipping to the message!", "Open My Message ⟶", "screen-message");
    });

    // --- 5. MESSAGE & GIFT LOGIC ---
    const envelope = document.getElementById('envelope');
    const openLetter = document.getElementById('open-letter');

    envelope.addEventListener('click', () => {
        envelope.classList.add('hidden');
        openLetter.classList.remove('hidden');
    });

    openLetter.addEventListener('click', () => {
        triggerPopup("I hope you liked my message ❤️", "One Last Thing... ⟶", "screen-gift");
    });

    // Final sequence simplified
    const setupClick = (id, msg, btn, target) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => triggerPopup(msg, btn, target));
    };

    setupClick('gift-box', "A special gift just for you...", "Open Gift ⟶", "screen-watch-box");
    setupClick('watch-box-item', "Tada! Do you like it?", "Yeahh ! ⟶", "screen-watch-reveal");
    setupClick('watch-reveal-item', "Your happiness means everything.", "Let's Open It ! ⟶", "screen-happy-mom");
    setupClick('happy-mom-item', "Sharing this special moment together.", "See Reaction ⟶", "screen-final-gift");
    setupClick('final-gift-item', "Want to experience it all again?", "⟵ Back to Start", "RELOAD");
});