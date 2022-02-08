import { addProductToCart } from "./controller/listen.js";
import { openModal } from "./controller/listen.js";
import {updateCartTooltip} from "./view/view.js";
import {dataHandler} from "./data/dataHandler.js";

init();

async function init(){
    setUpProductButtons();
    setUpCartButton();
    updateCartTooltip(await dataHandler.getProductCount());
}

function setUpProductButtons(fnc){
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => button.addEventListener("click", addProductToCart));
}

function setUpCartButton(){
    const cartButton = document.querySelector("#cart");
    cartButton.addEventListener("click", openModal);
}



