import {dataHandler} from "../data/dataHandler.js";
import {generateModal, updateCartTooltip, renderProducts} from "../view/view.js";

export {addProductToCart, openModal, filterByCategory, addEventOnSuppliers, addEventOnLogo}


async function addProductToCart(event) {
    const productId = event.currentTarget.closest(".card").dataset.id;
    const response = await dataHandler.addOneMoreItemToCart({"id": productId});
    updateCartTooltip(response);
}

async function openModal() {

    document.body.classList.add("scroll-prevent");
    const cartContent = await dataHandler.getCartContent();
    const modal = generateModal(cartContent);
    document.querySelector("body").appendChild(modal);
    modal.style.top = `${window.scrollY}px`;
    const closeCartLink = document.querySelector(".close-cart-modal");
    closeCartLink.addEventListener("click", listenToModalClose);
    setUpCartInputs();

}

function setUpCartInputs() {

    const cart = document.querySelector(".cart");
    const inputFields = cart.querySelectorAll("input");
    inputFields.forEach(input => input.addEventListener("input", listenToCartChanges));

}

async function listenToCartChanges(event) {

    const itemId = event.currentTarget.dataset.id;
    const amount = event.currentTarget.value;

    if (amount !== "") {

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

        if (amount === "0") {

            productDiv.remove();

        } else {

            const product = cartContent.filter(product => product["id"] === Number(itemId));

            //TODO: kind of view thing
            productDiv.querySelector(".product-total").textContent = product[0]["totalPrice"];

        }

        updateCartTooltip(cartProductCount);

    }

}

async function listenToModalClose(event) {

    const cartModal = event.currentTarget.closest(".cart");
    document.body.classList.remove("scroll-prevent");
    cartModal.remove();

}

let currentEvent;

function addEventOnSuppliers() {
    const buttons = document.querySelectorAll(".supplier");
    buttons.forEach(button => button.addEventListener("click", filterBySupplier))
}

async function filterBySupplier(event){
    const supplierName = event.currentTarget.getAttribute("supplier-name");
    currentEvent = event.currentTarget;
    console.log(currentEvent);
    addSupplierOptionAsSelectedAndDeletable(event, supplierName);
    const supplierId = event.currentTarget.getAttribute('supplier-id');
    localStorage.setItem("supplierId", supplierId);
    let products;
    if (localStorage.getItem("categoryId") == null) {
        products = await dataHandler.getProductBySupplier(supplierId);
    } else {
        products = await dataHandler.getProductsByTwoParameter(localStorage.getItem("categoryId"), supplierId);
    }
    if (products.length === 0) {
        alert("We dont have product in this category");
    } else {
        currentEvent.removeEventListener("click", filterBySupplier);
        removeContents();
        deleteSupplierFilter(supplierName);
        renderProducts(products);
    }
}

function deleteSupplierFilter(supplierName) {
    const currentSupplier = document.querySelector('.deletable-supplier');
    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener('click', async () => {
        localStorage.removeItem("supplierId");
        console.log(currentEvent);
        currentEvent.classList.remove('deletable-supplier');
        currentEvent.classList.add('supplier');
        currentEvent.innerHTML = `<i style="font-size:24px" class="fa">&#xf096;</i>
                                                 <span  style="padding-left: 0.2rem">${supplierName}</span>`
        if(localStorage.getItem("categoryId") == null){
            await getAllProduct();
        }
        currentEvent.addEventListener("click", filterBySupplier);
        //TODO: add event on suppliers again after delete, and add cart event after refresh the product content,
        // and maybe if delete one filter parameter then change the page content to the one filter parameter or if there is no
        // filter parameter then render all products

    });
}

function addSupplierOptionAsSelectedAndDeletable(event, supplierName){
    event.currentTarget.classList.remove('supplier');
    event.currentTarget.classList.add('deletable-supplier');
    event.currentTarget.innerHTML = `<i style="font-size:24px" class="fa close-btn">&#xf00d;</i>
                                     <span  style="padding-left: 0.2rem">${supplierName}</span>`

}

function addEventOnLogo() {
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', async () => {
        await getAllProduct();
    })
}

async function getAllProduct() {
    localStorage.clear();
    const currentSupplier = document.querySelector('.current-supplier');
    if (currentSupplier != null) {
        currentSupplier.remove();
    }
    const products = await dataHandler.getAllProduct();
    removeContents();
    renderProducts(products);
}

function filterByCategory() {
    const buttons = document.querySelectorAll(".menu div");
    buttons.forEach(button => button.addEventListener("click", async (event) => {
            const categoryId = event.currentTarget.getAttribute('category-id');
            localStorage.setItem("categoryId", categoryId);
            let products;
            if (localStorage.getItem("supplierId") == null) {
                products = await dataHandler.getProductsByCategory(categoryId);
            } else {
                products = await dataHandler.getProductsByTwoParameter(categoryId, localStorage.getItem("supplierId"));
            }
            if (products.length === 0) {
                alert("We dont have product in this category");
            } else {
                removeContents();
                renderProducts(products);
            }
        }
    ))
}

function removeContents() {
    const contentDivs = document.querySelectorAll("#products div");
    contentDivs.forEach(contentDiv => contentDiv.remove());
}
