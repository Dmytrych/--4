let items = [];

export function updateShoppingCart(){
    if(localStorage.length > 0){
        items = JSON.parse(localStorage.getItem("shoppingCart"))
    }
}

export function saveShoppingCart(){
    if(items.length != 0){
        localStorage.setItem("shoppingCart", JSON.stringify(items))
    }
}

export function addToShoppingCart(productID, productQuantity){
    let item = items.find((element) => {
        return element.itemID == productID ? true : false
    })

    if(item == undefined){
        item = {itemID: productID, quantity: productQuantity}
        items.push(item)
    } else {
        item.quantity += productQuantity
    }

    saveShoppingCart()
}

updateShoppingCart()