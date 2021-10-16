const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = () => {
  cartCounterLabel.innerHTML = `${++cartCounter}`;
  if (cartCounter === 1) cartCounterLabel.style.display = 'block';
  if (cartCounter === 0) cartCounterLabel.style.display = 'none';
};

const getMockData = (t) => +t.parentElement
  .previousElementSibling
  .innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/u, '$1.$2');

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  contentContainer.removeEventListener('click', fn);
  t.disabled = true;
};

const enableControls = (t, fn) => {
  contentContainer.addEventListener('click', fn);
  t.disabled = false;
};

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;

  let restoreHTML = null;

  if (target && target.matches('.item-actions__cart')) {

    incrementCounter();

    cartPrice = getPrice(target, cartPrice);
    restoreHTML = target.innerHTML;

    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

    disableControls(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      enableControls(target, btnClickHandler);
    }, interval);
  }
};

contentContainer.addEventListener('click', btnClickHandler);
