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
    book.classList.add('disappear');

    setTimeout(() => {
        book.style.display = 'none';
    }, 500); // Match this with the duration of the disappearance animation
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
    const container = document.querySelector('.container');
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = `${balloon.offsetLeft + Math.random() * 50}px`;
        confetti.style.top = `${balloon.offsetTop + Math.random() * 50}px`;
        confetti.style.background = getRandomColor();
        container.appendChild(confetti);
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
        star.style.width = '30px';
        star.style.height = '30px';
        star.onclick = () => handleStarClick(star);
        container.appendChild(star);
    }
}

function handleStarClick(star) {
    const randomImage = mediaImages[Math.floor(Math.random() * mediaImages.length)];
    star.style.backgroundImage = `url(${randomImage})`;
    star.style.backgroundSize = 'cover';
    star.style.backgroundPosition = 'center';
    star.style.backgroundRepeat = 'no-repeat';
    star.style.clipPath = 'none';
    star.style.border = 'none';
    star.style.boxShadow = 'none';

    if (randomImage === 'Media/AmongUS.jpg') {
        playAmongUsVideo();
    }
}

function playAmongUsVideo() {
    const video = document.createElement('video');
    video.src = 'Media/amongus.mp4'; // Adjust path if necessary
    video.autoplay = true;
    video.style.position = 'absolute';
    video.style.top = '50%';
    video.style.left = '50%';
    video.style.transform = 'translate(-50%, -50%)';
    video.style.width = '80%';
    video.style.pointerEvents = 'none';

    document.body.appendChild(video);

    video.onended = () => video.remove();
}

function placeRibbons() {
    const container = document.querySelector('.container');
    const ribbonCount = window.innerWidth <= 768 ? 5 : 9;
    for (let i = 1; i <= ribbonCount; i++) {
        const ribbon = document.createElement('div');
        ribbon.className = `ribbon ribbon${i}`;
        ribbon.style.left = `${Math.random() * 80 + 10}%`;
        ribbon.style.top = `${Math.random() * 80 + 10}%`;
        ribbon.onclick = handleRibbonClick;
        container.appendChild(ribbon);
    }
}

function handleRibbonClick() {
    document.body.classList.add('normal'); // Restore normal brightness
    const ribbons = document.querySelectorAll('.ribbon');
    ribbons.forEach(ribbon => ribbon.classList.add('glowing'));
}

// Initialize decorations
function initializeDecorations() {
    const isMobile = window.innerWidth <= 768;
    createBalloons(isMobile ? 10 : 30); // Adjust number of balloons for smaller screens
    createStars(20); // Number of stars
    placeRibbons();
}

function handleResize() {
    const width = window.innerWidth;

    if (width < 768) {
        document.body.style.transform = 'none';
        const container = document.querySelector('.container');
        container.style.transform = 'none';
        container.style.width = '100%';
        container.style.height = '100%';
    } else {
        document.body.style.transform = 'none';
    }
}

function handleOrientationChange() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    
    if (isPortrait) {
        // Force landscape view by rotating
        document.body.style.transform = 'rotate(90deg)';
        document.body.style.transformOrigin = "center";
        document.body.style.width = '100vh';
        document.body.style.height = '100vw';
        document.body.style.position = 'absolute';
        document.body.style.top = '0';
        document.body.style.left = '0';
    } else {
        // Reset for landscape orientation
        document.body.style.transform = 'rotate(0deg)';
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';
        document.body.style.position = 'static';
    }
}

// Initial check
handleOrientationChange();

// Add listener for orientation changes
window.addEventListener('orientationchange', handleOrientationChange);


// Initial setup
window.addEventListener('resize', handleResize);
initializeDecorations();
handleResize();
