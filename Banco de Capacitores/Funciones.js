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

//comando de boton para redireccionar
const botonesDimension = document.querySelectorAll('.dimensionBanco');

botonesDimension.forEach(boton => {
  
    boton.addEventListener('click', function() {
    window.location.href ='dimensionBanco.html';
  });
});
const iniciobtn = document.querySelectorAll('.iniciobtn');

iniciobtn.forEach(boton => {
  
    boton.addEventListener('click', function() {
    window.location.href ='index.html';
  });
});

function calculateCapacitors() {
    const formularioFPA = parseFloat(document.getElementById('formularioFPA').value);
    const formularioFPD = parseFloat(document.getElementById('formularioFPD').value);
    const formularioKD = parseFloat(document.getElementById('formularioKD').value);

    const resultElement = document.getElementById('result'); 

    if (!formularioFPA || !formularioFPD || !formularioKD) {
        resultElement.innerText = 'Por favor, complete todos los campos.';
        resultElement.classList.remove('result-valid');
        resultElement.classList.add('result-invalid');
        return;
    }

    if (formularioFPA >= 1 || formularioFPD >= 1 || formularioFPA <= 0 || formularioFPD <= 0 || formularioFPD <= formularioFPA) {
        resultElement.innerText = 'Introduce valores válidos.';
        resultElement.classList.remove('result-valid');
        resultElement.classList.add('result-invalid');
        return;
    }

    const formularioFPActual = Math.acos(formularioFPA);
    const formularioFPDeseado = Math.acos(formularioFPD);

    const reactivePowerCurrent = formularioKD * Math.tan(formularioFPActual);
    const reactivePowerDesired = formularioKD * Math.tan(formularioFPDeseado);

    const capacitiveKVAR = reactivePowerCurrent - reactivePowerDesired;

    resultElement.innerText = `Requiere: ${capacitiveKVAR.toFixed(2)} KVAR`;
    resultElement.classList.remove('result-invalid');
    resultElement.classList.add('result-valid');
}

