package com.codecool.shop.controller;

import com.codecool.shop.config.TemplateEngineUtil;
import com.codecool.shop.model.Address;
import com.codecool.shop.model.Customer;
import com.codecool.shop.model.Order;
import com.codecool.shop.model.ProductRef;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name= "CheckoutServlet", urlPatterns = {"/checkout"}, loadOnStartup = 4)
public class CheckoutController extends HttpServlet {

        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

            TemplateEngine engine = TemplateEngineUtil.getTemplateEngine(req.getServletContext());
            WebContext context = new WebContext(req, resp, req.getServletContext());
            engine.process("checkout.html", context, resp.getWriter());

        }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Order cart = Order.getInstance();

        saveCustomerOrder(request, cart);
        saveAddressToOrder(false, request, cart);

        if (request.getParameter("shipping-or-not") == null){
            saveAddressToOrder(false, request, cart);
        }

        PrintWriter out = response.getWriter();
        response.setCharacterEncoding("UTF-8");
        out.flush();
    }

    // TODO: we need a class to handle the checkout process things -> 2. saving the data to order 1. validationg the values

    private void saveCustomerOrder(HttpServletRequest request, Order cart){

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String tel = request.getParameter("phone");

        Customer customer = new Customer(name, tel, email);
        cart.setCustomer(customer);

    }

    private void saveAddressToOrder(boolean shipping, HttpServletRequest request, Order cart){
        String country = shipping ? "country-shipping" : "country";
        String city = shipping ? "city-shipping" : "city";
        String zip = shipping ? "zip-code-shipping" : "zip-code";
        String address = shipping ? "address-shipping" : "address";
        String countryData = request.getParameter(country);
        String cityData = request.getParameter(city);
        String zipData = request.getParameter(zip);
        String addressData = request.getParameter(address);
        Address addressObj = new Address(countryData, cityData, addressData, zipData);

        if (!shipping) {
            cart.setBillingAddress(addressObj);
        } else {
            cart.setShippingAddress(addressObj);
        }
    }

    }

