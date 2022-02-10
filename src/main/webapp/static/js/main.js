import {addProductToCart, addEventOnSuppliers, addEventOnCategory, addEventOnLogo} from "./controller/listen.js";
import { openModal, setUpProductButtons} from "./controller/listen.js";
import {updateCartTooltip} from "./view/view.js";
import {dataHandler} from "./data/dataHandler.js";

init();

async function init(){
    setUpProductButtons();
    setUpCartButton();
    updateCartTooltip(await dataHandler.getProductCount());
    addEventOnCategory();
    addEventOnSuppliers();
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



