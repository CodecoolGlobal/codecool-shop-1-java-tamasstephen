package com.codecool.shop.controller;

import com.codecool.shop.model.Order;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "JsonServletGet", urlPatterns = {"/api/getCart", "/api/getProductCount"}, loadOnStartup = 3)
public class JsonServletGet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Order cart = Order.getInstance();
        String responseJson = handleResponse(request.getRequestURL().toString(), cart);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.println(responseJson);
        out.flush();

    }

    private String handleResponse(String url, Order cart){

        if (url.contains("getProductCount")){

            return cart.getCartItemCount();

        }

        return cart.getCartContent();

    }

}
