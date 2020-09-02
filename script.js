const currencyEL_one = document.getElementById('currency-one');
const amountEL_one = document.getElementById('amount-one');
const currencyEL_two = document.getElementById('currency-two');
const amountEL_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
async function calculate() {
    const currency_one = currencyEL_one.value;
    const currency_two = currencyEL_two.value;

    const data = await (
        await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    ).json();
    console.log(data);
    const rate = data.rates[currency_two];

    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

    amountEL_two.value = (amountEL_one.value * rate).toFixed(2);
}

swap.addEventListener('click', () => {
    const temp = currencyEL_one.value;
    currencyEL_one.value = currencyEL_two.value;
    currencyEL_two.value = temp;
    calculate();
});

// Event Listeners
currencyEL_one.addEventListener('change', calculate);
amountEL_one.addEventListener('input', calculate);
currencyEL_two.addEventListener('change', calculate);
amountEL_two.addEventListener('input', calculate);

calculate();
