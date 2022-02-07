package com.codecool.shop.model;

import com.codecool.shop.dao.ProductDao;
import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

public class Order {

    private final Map<Integer, Integer> cart;
    private final ProductDao products;
    private static Order order;

    private Order(ProductDao products) {
        this.cart = new HashMap<>();
        this.products = products;
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

    private boolean hasProduct(Integer id){
        return cart.get(id) != null;
    }

    public void addProduct(Integer id){

        if (hasProduct(id)){

            int newValue = cart.get(id) + 1;
            cart.put(id, newValue);

        } else {

            cart.put(id, 1);

        }

    }

    public void updateProduct(Integer id, int amount){
        cart.put(id, amount);
    }

    public Product getProductById(String id){

        int idAsInt = Integer.parseInt(id);
        return products.find(idAsInt);

    }

    public Gson getCartContent(){

        // TODO: create a productCartModel -> just the final values (unit price, sub-total, name, description, id)

        return null;
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
