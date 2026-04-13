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
            
            // Trigger slideshow automatically when entering the photos screen
            if (nextId === 'screen-photos') {
                startSlideshow();
            }
        }, 1000); 
    }

    // --- 1. HIDDEN START LOGIC (WITH MUSIC START) ---
    const bgMusic = document.getElementById('bg-music');
    
    document.getElementById('reveal-trigger').addEventListener('click', () => {
        bgMusic.play().catch(error => {
            console.log("Audio autoplay was blocked by the browser.", error);
        });
        showScreen('screen-home', 'screen-cake');
    });

    // --- 2. CAKE LOGIC ---
    const btnLight = document.getElementById('btn-light');
    const flame = document.getElementById('flame');
    const smoke = document.getElementById('smoke'); 
    const knife = document.getElementById('knife');
    const slice = document.getElementById('slice');
    const instruct = document.getElementById('instruction');

    let isLit = false;
    let isBlownOut = false;

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
        if (!isBlownOut) {
            if (isLit) instruct.innerHTML = "Blow out the candle first! Tap the flame. 💨";
            return; 
        }
        
        knife.classList.add('cutting');
        instruct.classList.add('hidden');
        
        setTimeout(() => { slice.classList.add('eaten'); }, 600);
        
        setTimeout(() => {
            triggerPopup("Yay! Ready for the next surprise?", "Next Surprise ⟶", "screen-balloons");
        }, 1500);
    });

    // --- 3. BALLOONS LOGIC ---
    const balloons = document.querySelectorAll('.balloon');
    let poppedCount = 0;

    balloons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            if (!balloon.classList.contains('popped')) {
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

    // --- 4. 20-IMAGE SLIDESHOW LOGIC ---
    const slideImg = document.getElementById('slideshow-img');
    const skipBtn = document.getElementById('skip-slideshow-btn');
    let slideIndex = 1; 
    const totalPhotos = 20;
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

    function skipSlideshow() {
        clearInterval(slideshowInterval);
        triggerPopup("Skipping to the message!", "Open My Message ⟶", "screen-message");
    }

    if(skipBtn) {
        skipBtn.addEventListener('click', skipSlideshow);
    }

    // --- 5. ELEGANT MESSAGE LOGIC ---
    const envelope = document.getElementById('envelope');
    const openLetter = document.getElementById('open-letter');

    envelope.addEventListener('click', () => {
        envelope.classList.add('hidden');
        openLetter.classList.remove('hidden');
    });

    openLetter.addEventListener('click', () => {
        triggerPopup("I hope you liked my message ❤️", "One Last Thing... ⟶", "screen-gift");
    });

    // --- 6. FINAL GIFT REVEAL SEQUENCE ---
    const giftBox = document.getElementById('gift-box');
    const watchBoxItem = document.getElementById('watch-box-item');
    const watchRevealItem = document.getElementById('watch-reveal-item');
    const happyMomItem = document.getElementById('happy-mom-item');
    const finalGiftItem = document.getElementById('final-gift-item');

    // Step 1: Tap Emoji -> Go to Watch Box
    if (giftBox) {
        giftBox.addEventListener('click', () => {
            triggerPopup("A special gift just for you...", "Open Gift ⟶", "screen-watch-box");
        });
    }

    // Step 2: Tap Watch Box -> Go to Watch Reveal
    if (watchBoxItem) {
        watchBoxItem.addEventListener('click', () => {
            triggerPopup("Tada! Do you like it?", "Next ⟶", "screen-watch-reveal");
        });
    }

    // Step 3: Tap Watch Reveal -> Go to Happy Mom Image
    if (watchRevealItem) {
        watchRevealItem.addEventListener('click', () => {
            triggerPopup("Your happiness means everything.", "See Reaction ⟶", "screen-happy-mom");
        });
    }

    // Step 4: Tap Happy Mom Image -> Go to Final Gift Photo
    if (happyMomItem) {
        happyMomItem.addEventListener('click', () => {
            triggerPopup("Sharing this special moment together.", "See More ⟶", "screen-final-gift");
        });
    }

    // Step 5: Tap Final Gift Photo -> Back to Start
    if (finalGiftItem) {
        finalGiftItem.addEventListener('click', () => {
            triggerPopup("Want to experience it all again?", "⟵ Back to Start", "RELOAD");
        });
    }

});