import {handlePaymentOption} from "./controller/listen.js";

init();

function init(){
    const paymentOptions = document.querySelectorAll("input[name='payment-option']");
    paymentOptions.forEach(option => option.addEventListener('click', handlePaymentOption));
}