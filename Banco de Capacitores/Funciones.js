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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('monthly-inputs').innerHTML = generateMonthlyInputs();
});

function generateMonthlyInputs() {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let html = '';

    months.forEach((month, index) => {
        html += `
            <div>
                <h3>${month}</h3>
                <input type="number" placeholder="Consumo (kW)" id="formulario${month}KW" step="0.01" required>
                <input type="number" placeholder="FP ACTUAL" id="formulario${month}FPA" step="0.01" min="0" max="1" required>
                <input type="number" placeholder="FP DESEADO" id="formulario${month}FPD" step="0.01" min="0" max="1" required>
            </div>
        `;
    });

    return html;
}


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
function calculateCFE() {
    const resultElementCFE = document.getElementById('resultCFE');

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let totalKW = 0;
    let totalReactivePowerCurrent = 0;
    let totalReactivePowerDesired = 0;

    for (let month of months) {
        const kw = parseFloat(document.getElementById(`formulario${month}KW`).value);
        const fpa = parseFloat(document.getElementById(`formulario${month}FPA`).value);
        const fpd = parseFloat(document.getElementById(`formulario${month}FPD`).value);

        if (isNaN(kw) || isNaN(fpa) || isNaN(fpd) || kw <= 0 || fpa <= 0 || fpd <= 0 || fpa >= 1 || fpd >= 1 || fpd <= fpa) {
            resultElementCFE.innerText = `Por favor, introduce valores válidos para ${month}.`;
            resultElementCFE.classList.remove('result-valid');
            resultElementCFE.classList.add('result-invalid');
            return;  
        }

        totalKW += kw;

        const fpActual = Math.acos(fpa);
        const fpDeseado = Math.acos(fpd);

        totalReactivePowerCurrent += kw * Math.tan(fpActual);
        totalReactivePowerDesired += kw * Math.tan(fpDeseado);
    }

    const capacitiveKVAR = totalReactivePowerCurrent - totalReactivePowerDesired;

    resultElementCFE.innerText = `Capacidad requerida del banco de capacitores: ${capacitiveKVAR.toFixed(2)} kVAR`;
    resultElementCFE.classList.remove('result-invalid');
    resultElementCFE.classList.add('result-valid');
}

   

