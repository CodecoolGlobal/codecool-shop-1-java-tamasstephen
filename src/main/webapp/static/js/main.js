import {addProductToCart, filterBySupplier, filterByCategory, addEventOnLogo} from "./controller/listen.js";
import { openModal } from "./controller/listen.js";
import {updateCartTooltip} from "./view/view.js";
import {dataHandler} from "./data/dataHandler.js";

init();

//:TODO Should call event on add cart button after change the content

async function init(){
    setUpProductButtons();
    setUpCartButton();
    updateCartTooltip(await dataHandler.getProductCount());
    filterByCategory();
    filterBySupplier();
    addEventOnLogo();
    localStorage.clear();
}

function setUpProductButtons(fnc){
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => button.addEventListener("click", addProductToCart));
}

function setUpCartButton(){
    const cartButton = document.querySelector("#cart");
    cartButton.addEventListener("click", openModal);
}



