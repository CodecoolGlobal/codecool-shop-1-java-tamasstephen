import { addItemToCart } from "../model/cart.js";

export { setUpListenerWithCart, setUpModalOpener }


function setUpListenerWithCart(cart){

    function addProductToCart(event){
        const productId = event.currentTarget.closest(".card").dataset.id;
        addItemToCart(productId);
        cart.addOneMoreItemToCart(productId);
        console.log(localStorage.getItem(productId));
    }

    return addProductToCart;

}

function setUpModalOpener(cart, modalGenerator){

    function openModal(){

        const modal = modalGenerator();
        document.querySelector("body").appendChild(modal);

    }

    return openModal;

}
