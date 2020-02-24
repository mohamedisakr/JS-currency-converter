const url = "https://openexchangerates.org/api/currencies.json";
const container = document.querySelector(".container");

async function getCurrencies() {
  const result = await fetch(url);
  const currencies = await result.json();
  return currencies;
}

// 1. get all currencies
// const currencies = getCurrencies().then(currencies => console.log(currencies));

// 2. loop through currencies and build 2 select
function displayDropList(currencies) {
  var result = `
  <label for="currency-select">Choose Currency:</label>
  <select name="currencies" id="currency-select">
    <option value="">--Please choose an option--</option>`;

  Object.keys(currencies).forEach(fill);

  result += `</select>`;
  container.innerHTML = result;

  // ******* inner callback function *********

  function fill(key) {
    result += `<option value=${key}>${currencies[key]} (${key})</option>`;
    // console.log(key, currencies[key]);
  }
}

// ============================= events and its handlers ===============================

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

function handleDOMContentLoaded() {
  //  get all currencies then populate drop list
  //   const currencies =
  getCurrencies()
    .then(currencies => displayDropList(currencies))
    // .then(currencies => displayDropList(currencies))
    .then(getCurrencySelectDom);
}

function getCurrencySelectDom() {
  const currencySelect = document.querySelector("#currency-select");
  currencySelect.addEventListener("change", handleCurrencyChange);
}

function handleCurrencyChange(event) {
  console.log(`You select ${event.target.value}`);
}

// ============================= end of events and its handlers ===============================
