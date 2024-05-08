const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

const btnClickHandler = (e) => {
  const {target} = e;
  const interval = 2000;

  if (!target?.matches('button.item-actions__cart')) return

  renderCartCounterLabel(cartCounterLabel, ++cartCounter)
  cartPrice = getPrice(target, cartPrice)

  let restoreHTML = target.innerHTML;
  target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

  disableControls(target, contentContainer, btnClickHandler);

  setTimeout(() => {
    enableControls(target, contentContainer, btnClickHandler);
    target.innerHTML = restoreHTML;
  }, interval);
}

contentContainer.addEventListener('click', btnClickHandler);

function renderCartCounterLabel(label, counter) {
  label.textContent = `${counter}`;
  if (counter === 1)
    label.style.display = 'block';
}

function getMockPrice(target) {
  return +target.parentElement
      .previousElementSibling
      .innerHTML
      .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');
}

function getPrice(target, price) {
  return Math.round((price + getMockPrice(target)) * 100) / 100;
}

function disableControls(target, container, handler) {
  target.disabled = true;
  container.removeEventListener('click', handler);
}

function enableControls(target, container, handler) {
  target.disabled = false;
  container.addEventListener('click', handler);
}
