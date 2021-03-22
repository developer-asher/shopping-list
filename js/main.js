function removeList(event) {
    event.target.parentNode.remove();
}

function handleShoppingList(event) {
  const input = event.target.querySelector('#input_list');
  const shoppingLists = document.querySelector('.lists');
  const list = document.createElement('li');
  const removeIcon = '<i class="fas fa-trash-alt"></i>';

  event.preventDefault();
  list.classList.add('list');
  list.innerHTML = `
      ${input.value}
      ${removeIcon}
  `;
  shoppingLists.appendChild(list);
  input.value = '';


  const btnRemove = document.querySelectorAll('.list>i');
  btnRemove.forEach(ele => ele.addEventListener('click', removeList));
}

function handleEventListener() {
  const form = document.querySelector('form');
  const btnPlus = document.querySelector('.btn_plus');

  btnPlus.addEventListener('click', handleShoppingList);
  form.addEventListener('submit', (event) => handleShoppingList(event));
}

function init() {
  handleEventListener();
}

init();