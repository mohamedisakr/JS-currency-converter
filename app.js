const url = "https://openexchangerates.org/api/currencies.json";
const BASE_URL = "https://api.exchangeratesapi.io/latest";
const container = document.querySelector(".container");
const fromSelect = document.querySelector("#fromSelect");
const toSelect = document.querySelector("#toSelect");
const fromCurrencyInput = document.querySelector("#fromCurrency");
const toCurrencyInput = document.querySelector("#toCurrency");

var currencyOptions = [];
let fromCurrency = "";
let toCurrency = "";
let exchangeRate;
let amount = 1;
let amountInFrom = true;
let fromAmount;
let toAmount;

if (amountInFrom) {
  fromAmount = amount;
  toAmount = amount * exchangeRate;
} else {
  toAmount = amount;
  fromAmount = amount / exchangeRate;
}

async function getRates() {
  const result = await fetch(BASE_URL);
  const data = await result.json();
  const rates = [data.base, ...Object.keys(data.rates)]; // data.rates;
  // currencyOptions = [data.base, ...Object.keys(rates)];
  const firstCurrency = Object.keys(data.rates)[0];
  fromCurrency = data.base;
  toCurrency = firstCurrency; //Object.keys(rates)[0];
  exchangeRate = data.rates[firstCurrency];
  // console.log(data.rates);

  console.log(rates);

  console.log(`exchange rate ${exchangeRate}`);
  console.log(fromCurrency);
  // console.log(toCurrency);
  return rates;
}

// function onCurrencyChanged(event) {
//   fromCurrency = event.target.value;
// }

function populateDropList(currencies, container) {
  var result = "";
  Object.keys(currencies).forEach(fill);
  container.innerHTML = result;

  // ******* inner callback function *********

  function fill(key) {
    result += `<option value=${key}>${currencies[key]} </option>`; //(${key})
  }
}

function populateOptions(container) {
  const options = "";
  getRates(rates => {
    options += rates.map((v, i, list) => {
      `<option value=${i}>${v} (${i})</option>`;
    });
  });
  console.log(options);
  container.innerHTML = options;
}

// ============================= events and its handlers ===============================

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

function handleDOMContentLoaded() {
  // populateOptions(fromSelect);
  // populateOptions(toSelect);

  // get currency rates
  getRates()
    .then(rates => populateDropList(rates, fromSelect))
    .then((fromSelect.value = fromCurrency))
    // .then(getFromCurrency)
    .catch(error => console.log(error));

  getRates()
    .then(rates => populateDropList(rates, toSelect))
    .then((toSelect.value = toCurrency))
    // .then(getToCurrency)
    .catch(error => console.log(error));

  fromSelect.addEventListener("change", getFromCurrency);
  toSelect.addEventListener("change", getToCurrency);

  fromCurrencyInput.addEventListener("change", handleFromAmountChange);
  toCurrencyInput.addEventListener("change", handleToAmountChange);
}

function handleFromAmountChange(event) {
  amount = event.target.value;
  amountInFrom = true;
}

function handleToAmountChange(event) {
  amount = event.target.value;
  amountInFrom = false;
}

function getCurrencySelectDom() {
  const currencySelect = document.querySelector("#currency-select");
  currencySelect.addEventListener("change", handleCurrencyChange);
}

function getFromCurrency(event) {
  // fromSelect.addEventListener("change", handleCurrencyChange);
  fromCurrency = event.target.value;
  console.log(fromCurrency);
}

function getToCurrency(event) {
  // toSelect.addEventListener("change", handleCurrencyChange);
  toCurrency = event.target.value;
  console.log(toCurrency);
}

function handleCurrencyChange(event) {
  console.log(`You select ${event.target.value}`);
}

// ============================= end of events and its handlers ===============================

/*
// ============================= validation ===============================

function isNumber(event) {
  var code = event.which ? event.which : event.keyCode;
  if (code != 46 && code > 31 && (code < 48 || code > 57)) {
    return false;
  }

  return true;
}

// ============================= end of validation ===============================
*/
