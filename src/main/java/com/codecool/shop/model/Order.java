package com.codecool.shop.model;

import com.codecool.shop.dao.ProductDao;
import com.google.gson.Gson;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Order {

    private final Map<Integer, Integer> cart;
    private final ProductDao products;
    private static Order order;
    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;
    private boolean mustHaveShippingAddress;

    private Order(ProductDao products) {
        this.cart = new HashMap<>();
        this.products = products;
        this.mustHaveShippingAddress = false;
    }

    public static Order getInstance(){
        return order;
    }

    public static Order getInstance(ProductDao products){

        if (order == null){

            order = new Order(products);

        }

        return order;

    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public void setMustHaveShippingAddress(boolean mustHaveShippingAddress) {
        this.mustHaveShippingAddress = mustHaveShippingAddress;
    }

    private boolean hasProduct(Integer id){
        return cart.get(id) != null;
    }

    public void addProduct(Integer id){
        System.out.println(id);

        if (hasProduct(id)){

            int newValue = cart.get(id) + 1;
            cart.put(id, newValue);

        } else {

            cart.put(id, 1);

        }

        System.out.println(cart);

    }

    public void updateProduct(Integer id, int amount){

        cart.put(id, amount);

        if (cart.get(id).equals(0)){

            cart.remove(id);

        }
    }

    public String getCartContent(){

        Gson gson = new Gson();
        List<CartProduct> cartProductList = new ArrayList<>();

        System.out.println(cart);

        for (Integer id: cart.keySet()){
            System.out.println(id);

            Product product = products.find(id);
            CartProduct cartProduct = new CartProduct(cart.get(id),
                    id,
                    product.getName(),
                    product.getDescription(),
                    product.getDefaultPrice(),
                    product.getDefaultPrice().multiply(new BigDecimal(cart.get(id)), MathContext.UNLIMITED));
            cartProductList.add(cartProduct);
        }

        BigDecimal sumValue = cartProductList.stream()
                .map(CartProduct::getTotal)
                .reduce(BigDecimal::add).orElse(null);
        CartProduct sum = new CartProduct(1, 0, "total", "", null, sumValue);
        cartProductList.add(sum);

        String cartJson = gson.toJson(cartProductList);

        return cartJson;
    }

    public String getCartItemCount(){
        int cartItemCount = cart.values().stream().mapToInt(Integer::intValue).sum();
        String gsonCount = new Gson().toJson(cartItemCount);
        return gsonCount;
    }

    @Override
    public String toString(){

        StringBuilder content = new StringBuilder();

        for (Integer value: cart.keySet()){

            content.append(String.format("{%d : %d}", value, cart.get(value)));

        }

        return content.toString();

    }



}
