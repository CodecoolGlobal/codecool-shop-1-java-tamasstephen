package com.codecool.shop.model;

public class Address{
    private final String country;
    private final String city;
    private final String address;
    private final String zipCode;

    public Address(String country, String city, String address, String zipCode) {
        this.country = country;
        this.city = city;
        this.address = address;
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public String getAddress() {
        return address;
    }

    public String getZipCode() {
        return zipCode;
    }
}
