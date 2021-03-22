const form = document.querySelector('form');
const input = document.querySelector('#input_list');
const shoppingLists = document.querySelector('.lists');
const btnPlus = document.querySelector('.btn_plus');

let shopping = [];

function deleteList(event) {
  const li = event.target.parentNode;

  li.remove();
  const cleanShopping = shopping.filter(ls_list => ls_list.id != li.id);
  
  shopping = cleanShopping;
  saveToDoList();
}

function saveToDoList() {
  localStorage.setItem('userShoppingList', JSON.stringify(shopping));
}

function printShoppingList(value) {
  const li = document.createElement('li');
  const listId = `list${shopping.length + 1}`;
  const trash = document.createElement('i');

  trash.setAttribute('class', 'fas fa-trash-alt');
  li.classList.add('list');
  li.id = listId;
  li.textContent = value;
  li.appendChild(trash);
  trash.addEventListener('click', deleteList);
  shoppingLists.appendChild(li);

  const listObj = {
    text: value,
    id: listId
  };
  shopping.push(listObj);

  saveToDoList();
}

function handleShoppingList(event) {
  event.preventDefault();

  const list = input.value;
  printShoppingList(list);
  input.value = '';
}

function handleEventListener() {
  form.addEventListener('submit', handleShoppingList);
  btnPlus.addEventListener('click', handleShoppingList);
}

function loadShoppingList() {
  const loadedShoppingList = localStorage.getItem('userShoppingList');

  if(loadedShoppingList !== null) {
    const parsedList = JSON.parse(loadedShoppingList);

    parsedList.forEach(list => printShoppingList(list.text));
  }
}

function init() {
  loadShoppingList();
  handleEventListener();
}

init();