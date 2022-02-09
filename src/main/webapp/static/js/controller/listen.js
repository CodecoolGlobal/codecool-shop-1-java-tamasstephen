import {dataHandler} from "../data/dataHandler.js";
import {generateModal, updateCartTooltip} from "../view/view.js";

export { addProductToCart, openModal, filterByCategory}



async function addProductToCart(event){
    const productId = event.currentTarget.closest(".card").dataset.id;
    const response = await dataHandler.addOneMoreItemToCart({"id": productId});
    updateCartTooltip(response);
}


async function openModal(){

    document.body.classList.add("scroll-prevent");
    const cartContent = await dataHandler.getCartContent();
    const modal = generateModal(cartContent);
    document.querySelector("body").appendChild(modal);
    modal.style.top = `${window.scrollY}px`;
    const closeCartLink = document.querySelector(".close-cart-modal");
    closeCartLink.addEventListener("click", listenToModalClose);
    setUpCartInputs();

}

function setUpCartInputs(){

    const cart = document.querySelector(".cart");
    const inputFields = cart.querySelectorAll("input");
    inputFields.forEach(input => input.addEventListener("input", listenToCartChanges));

}

async function listenToCartChanges(event){

    const itemId = event.currentTarget.dataset.id;
    const amount = event.currentTarget.value;

    if (amount !== ""){

        const cart = document.querySelector(".cart");
        const productDiv = cart.querySelector(`div[data-id="${itemId}"]`);
        const prod = {};
        prod["id"] = itemId;
        prod["amount"] = amount;
        const cartProductCount = await dataHandler.upDateOrder(prod);
        const cartContent = await dataHandler.getCartContent();
        const total = cartContent.filter(product => product["id"] === 0);

        //TODO: kind of view thing
        cart.querySelector(".cart-total").textContent = total[0]["totalPrice"];

        if (amount === "0"){

           productDiv.remove();

        } else {

           const product = cartContent.filter(product => product["id"] === Number(itemId));

           //TODO: kind of view thing
           productDiv.querySelector(".product-total").textContent = product[0]["totalPrice"];

        }

        updateCartTooltip(cartProductCount);

    }

}

async function listenToModalClose(event){

    const cartModal = event.currentTarget.closest(".cart");
    document.body.classList.remove("scroll-prevent");
    cartModal.remove();

}

function filterByCategory(){
    const buttons = document.querySelectorAll(".category");
    buttons.forEach(button => button.addEventListener("click", async (event) => {
        console.log(event.currentTarget.getAttribute('category-id'));
        const products = await dataHandler.getProductsByCategory(event.currentTarget.getAttribute('category-id'));
        console.log(products);
        removeContents();
        renderProducts(products);
    }
    ))
}

function removeContents() {
    const contentDivs = document.querySelectorAll("#products div");
    contentDivs.forEach(contentDiv => contentDiv.remove());
}

function renderProducts(products) {
    const contentDiv = document.querySelector("#products");
    console.log(products)
    for(let product of products){
        console.log(product.imgLink)
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


