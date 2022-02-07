import { setUpListenerWithCart } from "./controller/listen.js";
import {Cart} from "./model/cart.js";
import {createCartModal} from "./view/view.js";
import { setUpModalOpener } from "./controller/listen.js";

init();

function init(){
    const cart = new Cart();
    const listener = setUpListenerWithCart(cart);
    setUpProductButtons(listener);
    cart.initCartFromLocalStorage();
    setUpCartButton(cart);
}

function setUpProductButtons(fnc){
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => button.addEventListener("click", fnc));
}

function setUpCartButton(cart){
    const cartButton = document.querySelector("#cart");
    const modalCreator = createCartModal(cart.getCart());
    const listener = setUpModalOpener(cart, modalCreator);
    cartButton.addEventListener("click", listener);
}


