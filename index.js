import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-5314a-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);

const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEL = document.getElementById("input-field");
const addbuttonEL = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addbuttonEL.addEventListener("click", function () {
  let inputValue = inputFieldEL.value;
  push(shoppingListInDB, inputValue);
  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {

  if(snapshot.exists()){
    let itemArray = Object.entries(snapshot.val()); // Use Object.entries to get key-value pairs
    clearShoppingListEl();
     
    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i];
      let itemId = currentItem[0];
      let itemValue = currentItem[1];
  
      appendItemToShoppingListEl(itemId, itemValue);
    }
  
  }else{
    shoppingListEl.innerHTML="No items yet add...."
  }
  });

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEL.value = "";
}

function appendItemToShoppingListEl(itemId, itemValue) {
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  
  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`);
    set(exactLocationOfItemInDB, null); // Use set(null) to remove the item from the database
  });

  shoppingListEl.appendChild(newEl);
}
