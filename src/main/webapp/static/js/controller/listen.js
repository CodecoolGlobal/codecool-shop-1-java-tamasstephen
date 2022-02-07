import { addItemToCart } from "../model/cart.js";

export {addProductToLocalCart, setUpListenerWithCart}


function setUpListenerWithCart(cart){

    function addProductToCart(event){
        const productId = event.currentTarget.closest(".card").dataset.id;
        addItemToCart(productId);
        cart.addOneMoreItemToCart(productId);
        console.log(localStorage.getItem(productId));
    }

    return addProductToCart;

}

function addProductToLocalCart(event){
    const productId = event.currentTarget.closest(".card").dataset.id;
    addItemToCart(productId);
    console.log(localStorage.getItem(productId));
}