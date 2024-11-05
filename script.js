// script.js

const apiUrl = 'http://localhost:3000'; // URL da API NestJS


// Cadastro de Consumo de Água
document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userId = document.getElementById('userId').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const readingDate = document.getElementById('date').value;

  try {
    const response = await fetch(`${apiUrl}/consumption`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount, readingDate }),
    });
    if (response.ok) {
      alert('Consumo registrado com sucesso!');
    } else {
      alert('Erro ao registrar consumo.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao registrar consumo.');
  }
});

// Histórico de Consumo de Água
document.getElementById('historyForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userId = document.getElementById('userId').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  try {
    const response = await fetch(`${apiUrl}/consumption/history?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    data.forEach(record => {
      const listItem = document.createElement('li');
      listItem.textContent = `Data: ${record.readingDate} - Consumo: ${record.consumptionAmount} m³`;
      historyList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao buscar histórico de consumo.');
  }
});

// Alertas de Consumo Elevado
document.getElementById('alertForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userId = document.getElementById('userId').value;

  try {
    const response = await fetch(`${apiUrl}/consumption/alert?userId=${userId}`);
    const data = await response.json();
    const alertResult = document.getElementById('alertResult');
    alertResult.textContent = data.alert ? 'Alerta: Consumo elevado detectado!' : 'Nenhum alerta de consumo elevado.';
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao verificar alerta de consumo.');
  }
});
