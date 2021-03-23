const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
let itemArray = [];

function deleteItem(event) {
  console.dir(event.target);
}

function createItem(text) {
  const itemRow = document.createElement('li');
  const listId = `item${itemArray.length + 1}`;
  itemRow.setAttribute('class', `item__row`);
  itemRow.id = listId;

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const itemName = document.createElement('span');
  itemName.setAttribute('class', 'item__name');
  itemName.innerText = text;

  const itemObj = {
    text: text,
    id: listId
  };
  itemArray.push(itemObj);

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item__delete');
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
    deleteList(itemRow);
  });

  item.appendChild(itemName);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);

  return itemRow;
}

function onAddList() {
  const text = input.value;
  if(text === '') {
    input.focus();
    return;
  }
  const list = createItem(text);
  items.appendChild(list);
  saveList();
  input.value = '';
  input.focus();
}

function deleteList(ele) {
  const newItemArray = itemArray.filter((item) => item.id != ele.id);

  itemArray = newItemArray;
  saveList();
}

function saveList() {
  localStorage.setItem('ls_items', JSON.stringify(itemArray));
}

function loadList() {
  const LS_items = localStorage.getItem('ls_items');

  if(LS_items !== null) {
    const parsedItems = JSON.parse(LS_items);

    parsedItems.forEach((item) => {
      const list = createItem(item.text);
      items.appendChild(list);
    });
  }
}

function init(){
  loadList();
  addBtn.addEventListener('click', onAddList);
  input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
      onAddList();
    }
  });
}

init();