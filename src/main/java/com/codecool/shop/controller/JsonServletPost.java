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
import java.lang.reflect.Type;

@WebServlet(name = "JsonServletPost", urlPatterns = {"/api/update", "/api/add", "/json"}, loadOnStartup = 2)
public class JsonServletPost extends HttpServlet {


    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String url = request.getRequestURL().toString();
        Order cart = Order.getInstance();

        ProductRef skeleton = getProductRefFromRequest(request);
        String responseJson = handleCartTransaction(url, cart, skeleton);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.println(responseJson);
        out.flush();
    }

    private String handleCartTransaction(String url, Order cart, ProductRef skeleton){


        if (url.contains("add")){

            cart.addProduct(skeleton.getId());

        } else if (url.contains("update")){

            cart.updateProduct(skeleton.getId(), skeleton.getAmount());

        }

        return cart.getCartItemCount();

    }

    private ProductRef getProductRefFromRequest(HttpServletRequest request) throws  IOException{

        BufferedReader reader = request.getReader();
        Type myType = new TypeToken<ProductRef>(){}.getType();
        String value = "";
        String line;

        while ((line = reader.readLine()) != null){

            value += line;

        }

        ProductRef skeleton = new Gson().fromJson(value, myType);
        return skeleton;
    }

}
