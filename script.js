// Track the current stage the user is on (starts at 1)
let currentStage = 1;

// Mapping stage numbers to button IDs
const stageButtons = {
    1: 'btn-memories',
    2: 'btn-letter',
    3: 'btn-reasons',
    4: 'btn-proposal',
    5: 'btn-goodies'
};

// --- NAVIGATION ---
function showSection(sectionId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden-section');
    });

    // Show the target section
    const target = document.getElementById(sectionId);
    target.classList.remove('hidden-section');
    target.classList.add('active');
    
    // Scroll to top of newly opened section
    target.scrollTop = 0; 
}

function showMenu() {
    showSection('menu-screen');
}


// --- PROGRESSION LOGIC ---

// Called when a "Finish" button is clicked
function completeStage(stageNumber) {
    // Only proceed if completing the current stage
    if (stageNumber === currentStage) {
        
        // Mark current stage button as completed
        const currentBtn = document.getElementById(stageButtons[stageNumber]);
        currentBtn.classList.add('completed');
        currentBtn.classList.remove('unlocked');

        // Move to next stage
        currentStage++;

        // Unlock the next stage button if it exists
        if (stageButtons[currentStage]) {
            const nextBtn = document.getElementById(stageButtons[currentStage]);
            nextBtn.disabled = false;
            nextBtn.classList.remove('locked');
            nextBtn.classList.add('unlocked');
            
            // Optional: Add a little bounce animation to draw attention
            nextBtn.style.animation = "bounce 0.5s";
            setTimeout(() => nextBtn.style.animation = "", 500);
        }
    }
    
    // Always go back to menu after clicking finish
    showMenu();
}


// --- GOODIE BAG ---
function revealGift(card) {
    card.classList.add('revealed');
}


// --- PROPOSAL LOGIC (Original + Integration) ---

const envelope = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letterContainer.style.display = "flex";
});

// Move NO Button (Made movement smaller for mobile)
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton); // Add touch support

function moveNoButton(e) {
    e.preventDefault(); // Prevent scrolling on touch
    const maxMove = 80; // Reduced movement range
    const randomX = Math.random() * maxMove - (maxMove / 2);
    const randomY = Math.random() * maxMove - (maxMove / 2);
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// YES Clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";
    buttons.style.display = "none";
    finalText.style.display = "block";
    
    // INTEGRATION: Completing the proposal stage (Stage 4)
    // We don't call completeStage immediately, we let them read the text
    // The "Unlock Goodie Bag" button in HTML now calls showMenu(),
    // So we mark stage 4 complete here.
    if (currentStage === 4) {
         const currentBtn = document.getElementById(stageButtons[4]);
         currentBtn.classList.add('completed');
         currentBtn.classList.remove('unlocked');
         currentStage++;
         const nextBtn = document.getElementById(stageButtons[5]);
         nextBtn.disabled = false;
         nextBtn.classList.remove('locked');
         nextBtn.classList.add('unlocked');
    }
});