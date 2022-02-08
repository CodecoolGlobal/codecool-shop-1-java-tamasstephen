import {dataHandler} from "../data/dataHandler.js";
import {generateModal, updateCartTooltip} from "../view/view.js";

export { addProductToCart, openModal }



async function addProductToCart(event){
    const productId = event.currentTarget.closest(".card").dataset.id;
    // addItemToCart(productId);
    // cart.addOneMoreItemToCart(productId);
    const response = await dataHandler.addOneMoreItemToCart({"id": productId});
    updateCartTooltip(response);
}


async function openModal(){

    const cart = await dataHandler.getCartContent();
    console.log(cart);
    const modal = generateModal(cart);
    document.querySelector("body").appendChild(modal);

}
