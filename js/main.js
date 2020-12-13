import {loadContent} from './routing.js';
import {addToShoppingCart} from './shoppingCartManagement.js'

function insertContent(markup){
    let insertPlace = document.getElementById("content-place")
    insertPlace.innerHTML = markup;
}

async function hashChangeHandler(){
    insertContent("<div class=\"maximize-height d-flex justify-content-center\"><div class=\"spinner-border mt-4\"></div></div>")
    let markup = await loadContent()
    insertContent(markup)
}

function addProductToShoppingCart(productID){
    alert("done")
    addToShoppingCart(productID, document.getElementById(`product-id${productID}-quantity`).value)
}

function alertSmth(){
    alert("sdsd")
}
window.addEventListener("hashchange", hashChangeHandler)

hashChangeHandler()