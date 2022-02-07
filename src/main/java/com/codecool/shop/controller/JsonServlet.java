package com.codecool.shop.controller;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "JsonServlet", urlPatterns = {"/api/products", "/api/product", "/json"}, loadOnStartup = 2)
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
        String line;
        while ((line = reader.readLine()) != null){
            System.out.println(line);
        }

        doGet(request, response);
    }

}
