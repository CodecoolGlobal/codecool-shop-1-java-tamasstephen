export { addItemToCart }

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