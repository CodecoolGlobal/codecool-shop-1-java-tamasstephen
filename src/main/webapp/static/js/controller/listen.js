import {dataHandler} from "../data/dataHandler.js";
import {generateModal, updateCartTooltip} from "../view/view.js";

export { addProductToCart, openModal }



async function addProductToCart(event){
    const productId = event.currentTarget.closest(".card").dataset.id;
    const response = await dataHandler.addOneMoreItemToCart({"id": productId});
    updateCartTooltip(response);
}


async function openModal(){

    const cartContent = await dataHandler.getCartContent();
    const modal = generateModal(cartContent);
    document.querySelector("body").appendChild(modal);

    // listen to modal close

    const closeCartLink = document.querySelector(".close-cart-modal");
    closeCartLink.addEventListener("click", listenToModalClose);


   // listen to cartChanges

}

async function listenToCartChanges(event){

    console.log(event.currentTarget);

}

// listen to cart modal close

async function listenToModalClose(event){

    console.log(event.currentTarget);
    const cartModal = event.currentTarget.closest(".cart");
    cartModal.remove();

}
