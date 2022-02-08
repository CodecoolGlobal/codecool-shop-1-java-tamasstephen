export function updateCartTooltip(amount){

    const cartTooltip = document.querySelector("#cart-tooltip");
    cartTooltip.innerText = amount;

}


export function generateModal(cartContent){

    const modal = document.createElement("div");
    const close = document.createElement("a");
    const button = document.createElement("button");

    modal.classList.add("cart");
    close.innerText = "Close me";
    close.classList.add("close-cart-modal");
    button.type = "button";
    button.textContent = "Proceed to checkout";

    let cartHolder = `<div class='cart-content'>`;
    let products = "<div class='cart-upper'>";
    let total = `<div class='cart-lower'>`;

    for (const obj of cartContent){
        if (obj.id !== 0){
            const div = `<div class="cart-item" data-id="${obj.id}">
                            <p>${obj.name}</p>
                            <p>${obj.unitPrice}</p> 
                            <input class="item-amount" data-id="${obj.id}" type="number" value="${obj.amount}"> 
                            <p class="product-total">${obj.totalPrice}</p>
                            </div>`
            products += div;
        } else {
            total += `<div class="cart-total">
                        <p class="total-label">Total:</p>
                        <p class="total-amount">${obj.totalPrice}</p>
                        </div>`
        }
    }

    products += `</div>`;
    total += `</div>`;
    products += total;
    cartHolder += products;
    cartHolder += `</div>`;
    modal.innerHTML = cartHolder;
    modal.insertAdjacentElement("afterbegin", close);
    modal.appendChild(button);

    return modal;

}

