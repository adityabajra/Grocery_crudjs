import { createItems } from "./items.js";
import { createForm } from "./form.js";

let items = getLocalStorage();
let editId = null;

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
  );
  const itemsElement = createItems(items);
  app.appendChild(formElement);
  app.appendChild(itemsElement);
}

render();
export function updateItemName(newName) {
  items = items.map((item) => {
    if (item.id === editId) {
      return { ...item, name: newName };
    }
    return item;
  });
  editId = null;
  render();
  setLocalStorage(items);
}
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
export function editCompleted(itemId) {
  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  render();
}
export function addItem(itemName) {
  const newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };
  items = [...items, newItem];

  setLocalStorage(items);
  render();
}
export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  render();
  setLocalStorage(items);
}
export function setEditId(itemId) {
  editId = itemId;
  render();

  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) {
      input.focus();
    }
  }, 0);
}
function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
}
function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}
