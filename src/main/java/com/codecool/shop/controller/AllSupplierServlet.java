package com.codecool.shop.controller;

import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.dao.implementation.SupplierDaoMem;
import com.codecool.shop.model.CartProduct;
import com.codecool.shop.model.Product;
import com.codecool.shop.model.Supplier;
import com.codecool.shop.model.SupplierModel;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/all-supplier")
public class AllSupplierServlet extends javax.servlet.http.HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        SupplierDaoMem supplierDaoMem = SupplierDaoMem.getInstance();

        List<Supplier> suppliers = supplierDaoMem.getAll();

        List<SupplierModel> suppliersModel = new ArrayList<>();

        for(Supplier supplier : suppliers){
            SupplierModel supplierModel = new SupplierModel(supplier.getName(), supplier.getId());
            suppliersModel.add(supplierModel);
        }

        String json = new Gson().toJson(suppliersModel);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.println(json);
        out.flush();

    }
}
