export {addProductToLocalCart}

function addProductToLocalCart(event){
    const productId = event.currentTarget.closest(".card").dataset.id;
    console.log(productId);
}