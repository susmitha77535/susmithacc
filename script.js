const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');
const apiKey = 'd1df8394a8565b378979a845';

// Currencies with symbols
const currencies = {
  USD: '$',
  EUR: '€',
  INR: '₹',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$'
};

function populateCurrencyDropdowns() {
  for (let code in currencies) {
    const option1 = document.createElement('option');
    option1.value = code;
    option1.text = code;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = code;
    option2.text = code;
    toCurrency.appendChild(option2);
  }

  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

populateCurrencyDropdowns();

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || isNaN(amount)) {
    result.innerText = 'Please enter a valid amount.';
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
    const data = await response.json();

    if (data.result === 'error') {
      result.innerText = `Error: ${data['error-type']}`;
    } else {
      const fromSymbol = currencies[from] || from;
      const toSymbol = currencies[to] || to;
      result.innerText = `${fromSymbol}${amount} ${from} = ${toSymbol}${data.conversion_result.toFixed(2)} ${to}`;
    }
  } catch (error) {
    result.innerText = 'Conversion failed. Please check your internet or API key.';
    console.error(error);
  }
}
