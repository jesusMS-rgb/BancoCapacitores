document.addEventListener('DOMContentLoaded', () => {
    generateMonthlyInputs();
});

function generateMonthlyInputs() {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const monthlyInputsContainer = document.getElementById('monthly-inputs');
    
    months.forEach((month) => {
        const monthDiv = document.createElement('div');
        
        const monthHeader = document.createElement('h3');
        monthHeader.textContent = month;
        
        const kwInput = document.createElement('input');
        kwInput.type = 'number';
        kwInput.placeholder = 'Consumo (kW)';
        kwInput.id = `formulario${month}KW`;
        kwInput.step = '0.01';
        kwInput.required = true;
        
        const fpaInput = document.createElement('input');
        fpaInput.type = 'number';
        fpaInput.placeholder = 'FP ACTUAL';
        fpaInput.id = `formulario${month}FPA`;
        fpaInput.step = '0.01';
        fpaInput.min = '0';
        fpaInput.max = '1';
        fpaInput.required = true;
        
        const fpdInput = document.createElement('input');
        fpdInput.type = 'number';
        fpdInput.placeholder = 'FP DESEADO';
        fpdInput.id = `formulario${month}FPD`;
        fpdInput.step = '0.01';
        fpdInput.min = '0';
        fpdInput.max = '1';
        fpdInput.required = true;
        
        monthDiv.appendChild(monthHeader);
        monthDiv.appendChild(kwInput);
        monthDiv.appendChild(fpaInput);
        monthDiv.appendChild(fpdInput);
        
        monthlyInputsContainer.appendChild(monthDiv);
    });
}
function calculateCFE() {
    const resultElementCFE = document.getElementById('resultCFE');
    const resultElementPromedios = document.getElementById('resultPromedios');

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    let totalKW = 0;
    let totalReactivePowerCurrent = 0;
    let totalReactivePowerDesired = 0;
    let totalFP = 0;
    let count = 0;

    for (let month of months) {
        const kw = parseFloat(document.getElementById(`formulario${month}KW`).value);
        const fpa = parseFloat(document.getElementById(`formulario${month}FPA`).value);
        const fpd = parseFloat(document.getElementById(`formulario${month}FPD`).value);

        if (!isValidMonthInput(kw, fpa, fpd, month, resultElementCFE)) {
            return;
        }

        totalKW += kw;

        const fpActual = Math.acos(fpa);
        const fpDeseado = Math.acos(fpd);

        totalReactivePowerCurrent += kw * Math.tan(fpActual);
        totalReactivePowerDesired += kw * Math.tan(fpDeseado);

        totalFP += fpa;
        count++;
    }

    const capacitiveKVAR = totalReactivePowerCurrent - totalReactivePowerDesired;
    const avgFP = totalFP / count;

    showSuccess(resultElementCFE, `Capacidad requerida del banco de capacitores: ${capacitiveKVAR.toFixed(2)} kVAR`);
    showSuccess(resultElementPromedios, `Factor de Potencia Promedio: ${avgFP.toFixed(2)}`);
}

function isValidFP(fp) {
    return fp > 0 && fp < 1;
}

function isValidMonthInput(kw, fpa, fpd, month, resultElement) {
    if (isNaN(kw) || isNaN(fpa) || isNaN(fpd) || kw <= 0 || !isValidFP(fpa) || !isValidFP(fpd) || fpd <= fpa) {
        showError(resultElement, `Por favor, introduce valores válidos para ${month}.`);
        return false;
    }
    return true;
}

function showError(element, message) {
    element.innerText = message;
    element.classList.remove('result-valid');
    element.classList.add('result-invalid');
}

function showSuccess(element, message) {
    element.innerText = message;
    element.classList.remove('result-invalid');
    element.classList.add('result-valid');
}