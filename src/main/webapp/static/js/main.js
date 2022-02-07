import {addProductToLocalCart} from "./controller/listen.js";

init();

function init(){
    setUpProductButtons();
}

function setUpProductButtons(){
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => button.addEventListener("click", addProductToLocalCart));
}