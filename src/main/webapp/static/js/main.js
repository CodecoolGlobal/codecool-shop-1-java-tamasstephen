import { addProductToCart } from "./controller/listen.js";
import { openModal } from "./controller/listen.js";

init();

function init(){
    setUpProductButtons();
    setUpCartButton();
}

function setUpProductButtons(fnc){
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => button.addEventListener("click", addProductToCart));
}

function setUpCartButton(){
    const cartButton = document.querySelector("#cart");
    cartButton.addEventListener("click", openModal);
}



