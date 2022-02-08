package com.codecool.shop.controller;

import com.codecool.shop.model.Order;
import com.codecool.shop.model.ProductRef;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.lang.reflect.Type;
import java.util.List;

@WebServlet(name = "JsonServlet", urlPatterns = {"/api/update", "/api/add", "/json"}, loadOnStartup = 2)
public class JsonServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null){
            // System.out.println(line);
        }
        String placeholder = "placeholder";
        String responseJson = gson.toJson(placeholder);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.println(responseJson);
        out.flush();

    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        String url = request.getRequestURL().toString();
        Order cart = Order.getInstance();
        Type myType = new TypeToken<ProductRef>(){}.getType();
        String value = "";
        String line;
        while ((line = reader.readLine()) != null){
           value += line;
        }

        ProductRef skeleton = new Gson().fromJson(value, myType);
        System.out.println(skeleton.getAmount());
        if (url.contains("add")){
            cart.addProduct(skeleton.getId());
        } else if (url.contains("update")){
            cart.updateProduct(skeleton.getId(), skeleton.getAmount());
        }
        System.out.println(cart.toString());
        String responseJson = cart.getCartContent();

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.println(responseJson);
        out.flush();
    }

}
