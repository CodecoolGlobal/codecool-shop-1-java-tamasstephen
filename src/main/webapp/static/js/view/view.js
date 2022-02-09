export function updateCartTooltip(amount){

    const cartTooltip = document.querySelector("#cart-tooltip");
    cartTooltip.innerText = amount;

}

export function renderProducts(products) {
    const contentDiv = document.querySelector("#products");
    for(let product of products){
        let outerDiv = document.createElement('div');
        outerDiv.classList.add("col");
        outerDiv.classList.add("col-sm-12");
        outerDiv.classList.add("col-md-6");
        outerDiv.classList.add("col-lg-4");
        outerDiv.innerHTML = `<div class="card"  data-id="${product.id}">
                    <img class=""   src="${product.imgLink}" alt=""/>
                    <div class="card-header">
                        <h4 class="card-title" >${product.name}</h4>
                        <p class="card-text" >${product.description}</p>
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <p class="lead" >${product.totalPrice}</p>
                        </div>
                        <div class="card-text">
                            <a class="btn btn-success add-to-cart">Add to cart</a>
                        </div>
                    </div>
                </div>`;
        contentDiv.appendChild(outerDiv);
    }
}


export function generateModal(cartContent){

    const modal = document.createElement("div");
    const cartWrapper = document.createElement("div");
    const close = document.createElement("a");
    const button = document.createElement("a");

    modal.classList.add("cart");
    cartWrapper.classList.add("cart-wrapper");
    close.innerHTML = "<i class=\"fa fa-times\" aria-hidden=\"true\" id='cart-close-icon'></i>";
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
                            <div class="img-holder"><img class="product-preview" src="${obj.imgLink}" height="72" width="72"></div>
                            <p class="cart-name">${obj.name}</p>
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
    cartHolder += `<h2>Cart</h2>`
    cartHolder += `<div class="cart-item labels">
                    <p class="cart-title">Preview</p>
                    <p class="cart-title product-name">Product</p>
                    <p class="cart-title">Unit Price</p>
                    <p class="cart-title">Amount</p>
                    <p class="cart-title product-total">Sub-total</p>
                    </div>`
    cartHolder += products;
    cartHolder += `</div>`;
    cartWrapper.innerHTML = cartHolder;
    modal.appendChild(cartWrapper);
    modal.insertAdjacentElement("afterbegin", close);
    modal.appendChild(button);

    return modal;

}

