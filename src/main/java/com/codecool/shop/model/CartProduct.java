package com.codecool.shop.model;

import java.math.BigDecimal;

public class CartProduct {

    private final int amount;
    private final int id;
    private final String name;
    private final String description;
    private final BigDecimal unitPrice;
    private final BigDecimal totalPrice;
    private String imgLink;

    public CartProduct(int amount, int id, String name, String description, BigDecimal unitPrice, BigDecimal totalPrice) {
        this.amount = amount;
        this.id = id;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
    }

    public void setImgLink(String link){
        this.imgLink = link;
    }

    public int getAmount() {
        return amount;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getTotal(){
        return totalPrice;
    }

    public String getImgLink() {
        return imgLink;
    }
}
