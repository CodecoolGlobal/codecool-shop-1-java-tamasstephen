package com.codecool.shop.model;

import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

public class Order {

    private final Map<String, Integer> cart;
    private final ProductDaoMem products;
    private static Order order;

    private Order(ProductDaoMem products) {
        this.cart = new HashMap<>();
        this.products = products;
    }

    public Order getInstance(ProductDaoMem products){

        if (order == null){

            order = new Order(products);

        }

        return order;

    }

    private boolean hasProduct(String id){
        return cart.get(id) != null;
    }

    public void addProduct(String id){

        if (hasProduct(id)){

            int newValue = cart.get(id) + 1;
            cart.put(id, newValue);

        } else {

            cart.put(id, 1);

        }

    }

    public void updateProduct(String id, int amount){
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



}
