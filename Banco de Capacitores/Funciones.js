const images = ['Imagenes/Imagen2.jpg', 'Imagenes/Imagen3.jpg', 'Imagenes/Imagen1.webp'];
let currentIndex = 0;
let intervalId;

const imageConteiner = document.getElementById('image-conteiner');
const progressBar = document.getElementById('progress-bar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateImage(direction) {
    const newImage = document.createElement('div');
    newImage.classList.add('image-transition');
    newImage.style.backgroundImage = `url(${images[currentIndex]})`;
    
    if (direction === 'next') {
        newImage.classList.add('image-enter-right');
    } else {
        newImage.classList.add('image-enter-left');
    }
    
    imageConteiner.appendChild(newImage);
    
    requestAnimationFrame(() => {
        newImage.classList.add('image-enter-active');
    });
    
    setTimeout(() => {
        imageConteiner.style.backgroundImage = `url(${images[currentIndex]})`;
        imageConteiner.removeChild(newImage);
    }, 1000);
}

function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(autoSlide, 5000);
    resetProgressBar();
}

function resetProgressBar() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    requestAnimationFrame(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '100%';
    });
}

function autoSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage('next');
    resetProgressBar();
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage('prev');
    resetInterval();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage('next');
    resetInterval();
});


intervalId = setInterval(autoSlide, 5000);
resetProgressBar();