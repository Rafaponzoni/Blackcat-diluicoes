import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  initializeDilutionCalculator();
});

function initializeDilutionCalculator() {
  populateDilutionRatios();

  const form = document.getElementById('dilutionForm');
  form.addEventListener('submit', handleFormSubmit);
}

function populateDilutionRatios() {
  const selectElement = document.getElementById('dilutionRatio');

  for (let i = 10; i <= 400; i += 10) {
    const option = document.createElement('option');
    option.value = `1:${i}`;
    option.textContent = `1:${i}`;
    selectElement.appendChild(option);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  hideErrorMessage();

  const dilutionRatio = document.getElementById('dilutionRatio').value;
  const totalVolume = parseFloat(document.getElementById('totalVolume').value);

  if (!validateInputs(dilutionRatio, totalVolume)) {
    return;
  }

  const result = calculateDilution(dilutionRatio, totalVolume);

  displayResult(result, dilutionRatio);
}

function validateInputs(dilutionRatio, totalVolume) {
  if (!dilutionRatio) {
    showErrorMessage('Por favor, selecione uma proporção de diluição.');
    return false;
  }

  if (!totalVolume || totalVolume <= 0) {
    showErrorMessage('Por favor, insira um volume total válido (maior que zero).');
    return false;
  }

  if (isNaN(totalVolume)) {
    showErrorMessage('Por favor, insira um valor numérico válido para o volume.');
    return false;
  }

  return true;
}

function calculateDilution(dilutionRatio, totalVolume) {
  const ratioMatch = dilutionRatio.match(/1:(\d+)/);
  const ratioNumber = parseInt(ratioMatch[1]);

  const totalParts = 1 + ratioNumber;

  const productAmount = totalVolume / totalParts;

  const waterAmount = totalVolume - productAmount;

  return {
    product: productAmount.toFixed(2),
    water: waterAmount.toFixed(2)
  };
}

function displayResult(result, ratio) {
  const resultArea = document.getElementById('resultArea');
  const productAmount = document.getElementById('productAmount');
  const waterAmount = document.getElementById('waterAmount');
  const selectedRatio = document.getElementById('selectedRatio');

  productAmount.textContent = `${result.product} ml`;
  waterAmount.textContent = `${result.water} ml`;
  selectedRatio.textContent = `Proporção aplicada: ${ratio}`;

  resultArea.classList.remove('hidden');

  resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showErrorMessage(message) {
  const errorElement = document.getElementById('errorMessage');
  errorElement.textContent = message;
  errorElement.classList.add('show');

  const resultArea = document.getElementById('resultArea');
  resultArea.classList.add('hidden');
}

function hideErrorMessage() {
  const errorElement = document.getElementById('errorMessage');
  errorElement.classList.remove('show');
  errorElement.textContent = '';
}
