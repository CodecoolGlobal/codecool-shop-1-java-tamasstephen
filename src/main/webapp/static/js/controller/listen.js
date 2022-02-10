import {dataHandler} from "../data/dataHandler.js";
import {generateModal, updateCartTooltip, renderProducts} from "../view/view.js";

export {addProductToCart, openModal, addEventOnCategory, addEventOnSuppliers, addEventOnLogo, setUpProductButtons, handlePaymentOption}


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

function setUpProductButtons(fnc){
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => button.addEventListener("click", addProductToCart));
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
        console.log(cartContent)
        const total = cartContent.filter(product => product["id"] === 0);

        //TODO: kind of view thing
        cart.querySelector(".total-amount").textContent = total[0]["totalPrice"];

        if (amount === "0") {

            productDiv.remove();

        } else {

           const productSubTotal =  cartContent.filter(product => product["id"] === Number(itemId))[0]["totalPrice"];

           //TODO: kind of view thing
           cart.querySelector(".total-amount").textContent = total[0]["totalPrice"];
           productDiv.querySelector(".product-total").textContent = productSubTotal;
        }

        updateCartTooltip(cartProductCount);

    }

}

async function listenToModalClose(event) {

    const cartModal = event.currentTarget.closest(".cart");
    document.body.classList.remove("scroll-prevent");
    cartModal.remove();

}

let currentEventSupplier;

function addEventOnSuppliers() {
    const buttons = document.querySelectorAll(".supplier");
    buttons.forEach(button => button.addEventListener("click", filterBySupplier))
}

async function filterBySupplier(event){
    const supplierName = event.currentTarget.getAttribute("supplier-name");
    currentEventSupplier = event.currentTarget;
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
        currentEventSupplier.removeEventListener("click", filterBySupplier);
        removeContents();
        deleteSupplierFilter(supplierName);
        renderProducts(products);
        setUpProductButtons();
    }
}

function deleteSupplierFilter(supplierName) {
    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener('click', async () => {
        localStorage.removeItem("supplierId");
        console.log(currentEventSupplier);
        currentEventSupplier.innerHTML = `<i style="font-size:24px" class="fa">&#xf096;</i>
                                                 <span  style="padding-left: 0.2rem">${supplierName}</span>`
        currentEventSupplier.classList.remove('deletable-supplier');
        currentEventSupplier.classList.add('supplier');

        if(localStorage.getItem("categoryId") == null){
            await getAllProduct();
            setUpProductButtons();
        } else {
            await filterByCategory(currentEventCategory);
            setUpProductButtons();
        }
        currentEventSupplier.addEventListener("click", filterBySupplier);
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
        localStorage.clear();
        await getAllProduct();
        setUpProductButtons();
    })
}

async function getAllProduct() {
    const products = await dataHandler.getAllProduct();
    removeContents();
    renderProducts(products);
    setUpProductButtons();
}

function addEventOnCategory() {
    const buttons = document.querySelectorAll(".menu div");
    buttons.forEach(button => button.addEventListener("click", async (event) => {
        await filterByCategory(event.currentTarget)
        setUpProductButtons();
        }
    ))
}

let currentEventCategory;

async function filterByCategory(event){
    const categoryId = event.firstElementChild.getAttribute('category-id');
    currentEventCategory = event;
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

function removeContents() {
    const contentDivs = document.querySelectorAll("#products div");
    contentDivs.forEach(contentDiv => contentDiv.remove());
}

function handlePaymentOption(event){

    const paypalPayment = document.querySelector(".paypal-payment");
    const cardPayment = document.querySelector(".credit-card-payment");

    if (event.currentTarget.id === "paypal"){

        document.querySelector(".paypal-card").classList.add("selected")
        document.querySelector(".card-card").classList.remove("selected")
        paypalPayment.classList.remove("not-visible");
        cardPayment.classList.add("not-visible");

    } else {

        document.querySelector(".paypal-card").classList.remove("selected")
        document.querySelector(".card-card").classList.add("selected")
        paypalPayment.classList.add("not-visible");
        cardPayment.classList.remove("not-visible");

    }

}
