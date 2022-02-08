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
    const closeCartLink = document.querySelector(".close-cart-modal");
    closeCartLink.addEventListener("click", listenToModalClose);
    setUpCartInputs();

}

function setUpCartInputs(){

    const cart = document.querySelector(".cart");
    const inputFields = cart.querySelectorAll("input");
    inputFields.forEach(input => input.addEventListener("input", listenToCartChanges));

}

async function listenToCartChanges(event){

    const itemId = event.currentTarget.dataset.id;
    const amount = event.currentTarget.value;

    if (amount !== ""){

        const prod = {};
        prod["id"] = itemId;
        prod["amount"] = amount;
        const cartProductCount = await dataHandler.upDateOrder(prod);

        if (amount === "0"){

           const cart = document.querySelector(".cart");
           const productDiv = cart.querySelector(`div[data-id="${itemId}"]`);
           productDiv.remove();

        }

        updateCartTooltip(cartProductCount);

    }

}

async function listenToModalClose(event){

    console.log(event.currentTarget);
    const cartModal = event.currentTarget.closest(".cart");
    cartModal.remove();

}
