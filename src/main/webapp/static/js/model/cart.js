export { addItemToCart, Cart }

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

    addOneMoreItemToCart = function(productId){

        const isAlreadyInCart = this.cart[productId];

        if (!isAlreadyInCart){

            this.cart[productId] = 1;

        } else {

            this.cart[productId] += 1;

        }

    }

    clearCart = function(){

        this.cart = {};

    }

}