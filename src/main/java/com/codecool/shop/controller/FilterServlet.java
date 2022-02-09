package com.codecool.shop.controller;

import com.codecool.shop.dao.implementation.ProductCategoryDaoMem;
import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.model.CartProduct;
import com.codecool.shop.model.Product;
import com.codecool.shop.model.ProductCategory;
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

@WebServlet(name = "FilterServlet", urlPatterns = "/api/category", loadOnStartup = 6)
public class FilterServlet extends javax.servlet.http.HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int categoryId = Integer.parseInt(request.getParameter("categoryId"));

        ProductCategoryDaoMem productCategoryDaoMem = ProductCategoryDaoMem.getInstance();
        ProductDaoMem productDaoMem = ProductDaoMem.getInstance();

        ProductCategory category = productCategoryDaoMem.find(categoryId);

        List<Product> products = productDaoMem.getBy(category);

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
