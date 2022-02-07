import { addItemToCart } from "../model/cart.js";

export {addProductToLocalCart}


function addProductToLocalCart(event){
    const productId = event.currentTarget.closest(".card").dataset.id;
    addItemToCart(productId);
    console.log(localStorage.getItem(productId));
}