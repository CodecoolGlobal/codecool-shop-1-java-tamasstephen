package com.codecool.shop.model;

public class SupplierModel {

    private final String name;
    private final int id;

    public SupplierModel(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }
}
