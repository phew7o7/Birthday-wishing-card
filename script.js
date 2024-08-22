const mediaImages = [
    'Media/StrawHat.jpg',
    'Media/DragonBalls.jpg',
    'Media/Zanpakuto.jpg',
    'Media/MHA.jpg',
    'Media/AmongUS.jpg',
    'Media/Haikyuu.jpg',
    'Media/DeathNote.jpg',
    'Media/Naruto.jpg',
    'Media/BlackClover.jpg',
];

function openBook() {
    document.getElementById('cover').style.transform = 'rotateY(-180deg)';
    document.getElementById('page1').style.transform = 'rotateY(0deg)';
    document.getElementById('backgroundMusic').play();
}

function nextPage(pageNumber) {
    for (let i = 1; i <= 4; i++) {
        const page = document.getElementById(`page${i}`);
        page.style.transform = i === pageNumber ? 'rotateY(0deg)' : 'rotateY(180deg)';
    }
}

function closeBook() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`page${i}`).style.transform = 'rotateY(180deg)';
    }
    document.getElementById('cover').style.transform = 'rotateY(0deg)';

    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    const book = document.querySelector('.book');
    book.classList.add('disappear'); // Make the book transparent

    // Wait for the disappearance animation to finish, then hide the book
    setTimeout(() => {
        book.style.display = 'none';
    }, 500); // Adjust the timeout to match the length of your disappearance animation
}



function createBalloons(number) {
    const container = document.querySelector('.container');
    for (let i = 0; i < number; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.top = `${Math.random() * 100}%`;
        balloon.onclick = popBalloon;
        container.appendChild(balloon);
    }
}


function popBalloon(event) {
    const balloon = event.target;
    balloon.style.animation = 'pop 0.5s forwards';
    document.getElementById('popSound').play();
    setTimeout(() => balloon.remove(), 500);
    createConfetti(balloon);
}

function createConfetti(balloon) {
    const numConfetti = 20;
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = `${balloon.offsetLeft + Math.random() * 50}px`;
        confetti.style.top = `${balloon.offsetTop + Math.random() * 50}px`;
        confetti.style.background = getRandomColor();
        document.querySelector('.container').appendChild(confetti);
    }
}


function getRandomColor() {
    const colors = ['#ff6ec4', '#7873f5', '#ffcc00', '#00ccff', '#ff3366'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createStars(number) {
    const container = document.querySelector('.container');
    for (let i = 0; i < number; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = '30px'; // Star dimensions
        star.style.height = '30px'; // Star dimensions
        star.onclick = () => {
            const randomImage = mediaImages[Math.floor(Math.random() * mediaImages.length)];
            star.style.backgroundImage = `url(${randomImage})`;
            star.style.backgroundSize = 'cover'; // Ensure image covers the star area
            star.style.backgroundPosition = 'center';
            star.style.backgroundRepeat = 'no-repeat';
            star.style.clipPath = 'none'; // Remove star shape
            star.style.border = 'none';
            star.style.boxShadow = 'none';

            if (randomImage === 'Media/AmongUS.jpg') {
                const video = document.createElement('video');
                video.src = 'Media/amongus.mp4'; // Path to your video file
                video.autoplay = true;
                video.style.position = 'absolute';
                video.style.top = '50%';
                video.style.left = '50%';
                video.style.transform = 'translate(-50%, -50%)';
                video.style.width = '80%'; // Adjust the width as needed
                video.style.pointerEvents = 'none'; // Prevents interaction with the video
            
                document.body.appendChild(video);
            
                video.onended = () => {
                    video.remove(); // Removes the video once it finishes playing
                };
            }
            
        };
        container.appendChild(star);
    }
}

function placeRibbons() {
    const container = document.querySelector('.container');
    const ribbonCount = window.innerWidth <= 768 ? 5 : 9; // Fewer ribbons for smaller screens
    for (let i = 1; i <= ribbonCount; i++) {
        const ribbon = document.createElement('div');
        ribbon.className = `ribbon ribbon${i}`;
        ribbon.style.left = `${Math.random() * 80 + 10}%`;
        ribbon.style.top = `${Math.random() * 80 + 10}%`;
        ribbon.onclick = () => {
            document.body.classList.add('normal'); // Restore normal brightness
            const ribbons = document.querySelectorAll('.ribbon');
            ribbons.forEach(ribbon => ribbon.classList.add('glowing')); // Make ribbons glow
        };
        container.appendChild(ribbon);
    }
}




function handleRibbonClick() {
    // Make all ribbons glow
    const ribbons = document.querySelectorAll('.ribbon');
    ribbons.forEach(ribbon => {
        ribbon.classList.add('glowing');
    });

    // Restore normal brightness
    document.body.style.filter = 'brightness(1)';
}

// Initialize ribbons
placeRibbons();


function initializeDecorations() {
    const isMobile = window.innerWidth <= 768;
    createBalloons(isMobile ? 10 : 30); // Fewer balloons for smaller screens
    createRibbons(isMobile ? 10 : 20); // Adjust number of stars if necessary
    placeRibbons();
}

createStars(20);


// Initialize decorations on page load and resize
initializeDecorations();
window.addEventListener('resize', initializeDecorations);