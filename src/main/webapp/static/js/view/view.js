export function updateCartTooltip(amount){

    const cartTooltip = document.querySelector("#cart-tooltip");
    cartTooltip.innerText = amount;

}

export function createCartModal(cartContent){

    function generateModal(){

        const modal = document.createElement("div");
        modal.classList.add("cart");
        let products = "";

        for (const key in cartContent){
            const div = `<div>${key}: ${cartContent[key]}</div>`
            products += div;
        }

        modal.innerHTML = products;
        return modal;

    }

    return generateModal;

}
