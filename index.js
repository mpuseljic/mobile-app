import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://mobile-app-fc819-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const shoppingListEL = document.getElementById("shopping-list")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
     push(shoppingListInDB, inputValue)

     clearInputFieldEl()

})

function clearInputFieldEl(){
    inputFieldEl.value = ""

}

function appendItemToShoppingListEL(item){
    //shoppingListEL.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)

    })
    shoppingListEL.append(newEl)
}

function clearShoppingListEl(){
    shoppingListEL.innerHTML = ""
}

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.entries(snapshot.val())

    clearShoppingListEl()
    
    for(let i = 0; i < itemsArray.length; i++){
        let currentItem = itemsArray[i]

        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEL(currentItem)
    }
})
