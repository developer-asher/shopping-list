const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
let itemArray = [];

function createItem(text) {
  const itemRow = document.createElement('li');
  const listId = `item${itemArray.length + 1}`;
  itemRow.setAttribute('class', `item__row`);
  itemRow.id = listId;

  itemRow.innerHTML = `
    <div class='item'>
      <span>${text}</span>
      <button class='item__delete'>
        <i class="fas fa-trash-alt" data-id='${listId}'></i>
      </button>
    </div>
  `;

  const itemObj = {
    text: text,
    id: listId
  };
  itemArray.push(itemObj);

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
  list.scrollIntoView();
  saveStorageList();
  input.value = '';
  input.focus();
}

function deleteStorageList(ele) {
  const newItemArray = itemArray.filter((item) => item.id != ele.id);

  itemArray = newItemArray;
  saveStorageList();
}

function saveStorageList() {
  localStorage.setItem('ls_items', JSON.stringify(itemArray));
}

function loadStorageList() {
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
  loadStorageList();
  addBtn.addEventListener('click', onAddList);
  input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
      onAddList();
    }
  });
  items.addEventListener('click', event => {
    const dataId = event.target.dataset.id;

    if(dataId) {
      const deletedItem = document.querySelector(`#${dataId}`);

      deletedItem.remove();
      deleteStorageList(deletedItem);
    }
  });
}

init();