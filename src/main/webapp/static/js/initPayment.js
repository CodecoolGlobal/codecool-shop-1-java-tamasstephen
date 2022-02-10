import {handlePaymentOption} from "./controller/listen.js";

init();

function init(){
    const paymentOptions = document.querySelectorAll(".form-vertical");
    paymentOptions.forEach(option => option.addEventListener('click', handlePaymentOption));
}