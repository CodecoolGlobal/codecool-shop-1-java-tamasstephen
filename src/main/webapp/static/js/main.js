import {addEventOnSuppliers, addEventOnCategory, addEventOnLogo} from "./controller/listen.js";
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

function setUpCartButton(){
    const cartButton = document.querySelector("#cart");
    cartButton.addEventListener("click", openModal);
}



