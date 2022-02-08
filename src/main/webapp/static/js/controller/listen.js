import { addItemToCart } from "../model/cart.js";
import {dataHandler} from "../data/dataHandler.js";

export { setUpListenerWithCart, setUpModalOpener }


function setUpListenerWithCart(cart){

    async function addProductToCart(event){
        const productId = event.currentTarget.closest(".card").dataset.id;
        addItemToCart(productId);
        cart.addOneMoreItemToCart(productId);
        const response = await dataHandler.addOneMoreItemToCart({"id": productId});
        console.log(response);
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
