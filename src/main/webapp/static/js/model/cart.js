export { addItemToCart, Cart }
import { updateCartTooltip } from "../view/view.js";

function cartHasProduct(productId){
    const product = localStorage.getItem(productId);
    return product !== null;
}

function addItemToCart(productId){

    if (cartHasProduct(productId)){

        const currentAmount = localStorage.getItem(productId);
        const incrementedAmount = String(Number(currentAmount) + 1);
        localStorage.setItem(productId, incrementedAmount);

    } else {

        localStorage.setItem(productId, "1");

    }

}


class Cart {


    constructor() {

        this.cart = {}

    }



    clearCart = function(){

        this.cart = {};

    }

    initCartFromLocalStorage = function() {

            const itemsInCart = Object.values(localStorage).reduce((a, c) => Number(a) + Number(c));
            updateCartTooltip(itemsInCart);

    }

    addOneMoreItemToCart (productId){

        const isAlreadyInCart = this.cart[productId];

        if (!isAlreadyInCart){

            this.cart[productId] = 1;

        } else {

            this.cart[productId] += 1;

        }

        this.initCartFromLocalStorage();

    }

}