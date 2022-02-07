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

    initCartFromLocalStorage() {

        const cartNotEmpty = Object.values(localStorage);

        if (cartNotEmpty.length > 0){

            const itemsInCart = Object.values(localStorage).reduce((a, c) => Number(a) + Number(c));
            updateCartTooltip(itemsInCart);

                for (const key in localStorage) {

                    if (!isNaN(Number(key))){

                        this.cart[key] = Number(localStorage.getItem(key));

                    }

                }

            console.log(this.cart);

        }


    }

    addOneMoreItemToCart (productId){

        const isAlreadyInCart = this.cart[productId];

        if (!isAlreadyInCart){

            this.cart[productId] = 1;

        } else {

            this.cart[productId] += 1;

        }
        const itemsInCart = Object.values(this.cart).reduce((a, c) => Number(a) + Number(c));

        console.log(this.cart);

        updateCartTooltip(itemsInCart);

    }

    getCart(){
        return this.cart;
    }

}