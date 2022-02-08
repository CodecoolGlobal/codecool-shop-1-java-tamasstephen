export function updateCartTooltip(amount){

    const cartTooltip = document.querySelector("#cart-tooltip");
    cartTooltip.innerText = amount;

}


export function generateModal(cartContent){

    const modal = document.createElement("div");
    const cartWrapper = document.createElement("div");
    const close = document.createElement("a");
    const button = document.createElement("a");

    modal.classList.add("cart");
    cartWrapper.classList.add("cart-wrapper");
    close.innerText = "Close me";
    close.classList.add("close-cart-modal");
    button.href = "/checkout";
    button.classList.add("link-button");
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
    cartWrapper.innerHTML = cartHolder;
    modal.appendChild(cartWrapper);
    modal.insertAdjacentElement("afterbegin", close);
    modal.appendChild(button);

    return modal;

}

