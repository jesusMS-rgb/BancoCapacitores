const images = ['Imagenes/Imagen2.jpg', 'Imagenes/Imagen3.jpg', 'Imagenes/Imagen1.webp'];
let currentIndex = 0;

const imageConteiner = document.getElementById('image-conteiner');
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
        if (direction === 'next') {
            newImage.classList.add('image-enter-active');
        } else {
            newImage.classList.add('image-enter-active');
        }
    });
    
    setTimeout(() => {
        imageConteiner.style.backgroundImage = `url(${images[currentIndex]})`;
        imageConteiner.removeChild(newImage);
    }, 1000);
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage('prev');
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage('next');
});