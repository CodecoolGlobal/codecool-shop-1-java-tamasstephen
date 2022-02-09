package com.codecool.shop.controller;

import com.codecool.shop.dao.implementation.ProductCategoryDaoMem;
import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.dao.implementation.SupplierDaoMem;
import com.codecool.shop.model.CartProduct;
import com.codecool.shop.model.Product;
import com.codecool.shop.model.ProductCategory;
import com.codecool.shop.model.Supplier;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/supplier")
public class FilterServletSupplier extends javax.servlet.http.HttpServlet {
    // TODO: 09/02/2022 uselessThings click clear local storage and list all items
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int supplierId = Integer.parseInt(request.getParameter("supplierId"));

        SupplierDaoMem supplierDaoMem = SupplierDaoMem.getInstance();
        ProductDaoMem productDaoMem = ProductDaoMem.getInstance();

        Supplier supplier = supplierDaoMem.find(supplierId);

        List<Product> products = productDaoMem.getBy(supplier);

        List<CartProduct> cartProducts = new ArrayList<>();

        for(Product product : products){
            CartProduct cartProduct = new CartProduct(1, product.getId(), product.getName(), product.getDescription(), product.getDefaultPrice(), product.getDefaultPrice());
            cartProduct.setImgLink(product.getImgUrl());
            cartProducts.add(cartProduct);
        }

        String json = new Gson().toJson(cartProducts);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.println(json);
        out.flush();

    }
}