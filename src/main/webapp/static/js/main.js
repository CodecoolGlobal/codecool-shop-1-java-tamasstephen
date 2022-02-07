import {addProductToLocalCart, setUpListenerWithCart} from "./controller/listen.js";
import {Cart} from "./model/cart.js";

init();

function init(){
    const cart = new Cart();
    const listener = setUpListenerWithCart(cart);
    setUpProductButtons(listener);
}

function setUpProductButtons(fnc){
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => button.addEventListener("click", fnc));
}