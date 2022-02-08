export function updateCartTooltip(amount){

    const cartTooltip = document.querySelector("#cart-tooltip");
    cartTooltip.innerText = amount;

}


export function generateModal(cartContent){

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

