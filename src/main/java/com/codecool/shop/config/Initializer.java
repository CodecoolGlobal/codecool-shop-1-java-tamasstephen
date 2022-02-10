package com.codecool.shop.config;

import com.codecool.shop.dao.ProductCategoryDao;
import com.codecool.shop.dao.ProductDao;
import com.codecool.shop.dao.SupplierDao;
import com.codecool.shop.dao.implementation.ProductCategoryDaoMem;
import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.dao.implementation.SupplierDaoMem;
import com.codecool.shop.model.Order;
import com.codecool.shop.model.Product;
import com.codecool.shop.model.ProductCategory;
import com.codecool.shop.model.Supplier;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@WebListener
public class Initializer implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ProductDao productDataStore = ProductDaoMem.getInstance();
        ProductCategoryDao productCategoryDataStore = ProductCategoryDaoMem.getInstance();
        SupplierDao supplierDataStore = SupplierDaoMem.getInstance();
        Order.getInstance(productDataStore);

        // TODO: initialize a singleton order?

        //setting up a new supplier
        Supplier amazon = new Supplier("Creatives", "Digital content and services");
        supplierDataStore.add(amazon);
        Supplier lenovo = new Supplier("CreativeCo.", "Computers");
        supplierDataStore.add(lenovo);

        //setting up a new product category
        ProductCategory tablet = new ProductCategory("just useless", "Hardware", "A tablet computer, commonly shortened to tablet, is a thin, flat mobile computer with a touchscreen display.");
        ProductCategory kiskutya = new ProductCategory("very useless", "Hardware", "A tablet computer, commonly shortened to tablet, is a thin, flat mobile computer with a touchscreen display.");
        ProductCategory kiscica = new ProductCategory("absolute useless", "Hardware", "A tablet computer, commonly shortened to tablet, is a thin, flat mobile computer with a touchscreen display.");
        productCategoryDataStore.add(tablet);
        productCategoryDataStore.add(kiskutya);
        productCategoryDataStore.add(kiscica);

        //setting up products and printing it
        addDummyProducts(productDataStore, productCategoryDataStore, supplierDataStore);
//        productDataStore.add(new Product("Amazon Fire", new BigDecimal("49.9"), "USD", "Fantastic price. Large content ecosystem. Good parental controls. Helpful technical support.", tablet, amazon));
//        productDataStore.add(new Product("Lenovo IdeaPad Miix 700", new BigDecimal("479"), "USD", "Keyboard cover is included. Fanless Core m5 processor. Full-size USB ports. Adjustable kickstand.", tablet, lenovo));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", tablet, amazon));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", tablet, amazon));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", kiskutya, amazon));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", tablet, lenovo));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", kiscica, lenovo));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", tablet, amazon));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", kiscica, lenovo));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", tablet, amazon));
//        productDataStore.add(new Product("Amazon Fire HD 8", new BigDecimal("89"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption.", kiskutya, amazon));
    }

    private void addDummyProducts(ProductDao productDataStore,
                                  ProductCategoryDao categories,
                                  SupplierDao supplierDao){

        int categoryRange = categories.getAll().size() + 1;
        int supplierRange = supplierDao.getAll().size() + 1;
        List<String> dummyItems = List.of("Wonder Smulz", "Luffy the very Puffy", "Clen Touch Supper 3000", "LoveBox", "HyperGameLink", "OMG Converter", "Voice Mutator", "Swipe Refresher");
        List<String> dummyImages = List.of("/static/img/hat.jpg", "/static/img/pot.jpg", "/static/img/boots.jpg", "/static/img/fork.jpg", "/static/img/bowl.jpg", "/static/img/chair.jpg", "/static/img/umbrella.jpg", "/static/img/pottwo.jpg", "/static/img/key.jpg");
        List<BigDecimal> dummyPrice = List.of(new BigDecimal("49.9"), new BigDecimal("89"), new BigDecimal("144.9"));
        List<String> description = List.of(
                "Amazon's latest Fire HD 8 tablet is a great value for media consumption.",
                "Keyboard cover is included. Fanless Core m5 processor. Full-size USB ports. Adjustable kickstand.",
                "Love and joy with this new thing. You do not need that, but are going to pay a lot of money",
                "The next useless hit. Buy it, look at it, wonder why it is soooo useless!"

        );

        for (String imageName: dummyImages){
            Product product = new Product(
                                dummyItems.get(getRandomNumber(0, dummyItems.size())),
                                dummyPrice.get(getRandomNumber(0, dummyPrice.size())),
                                "USD",
                                description.get(getRandomNumber(0, description.size())),
                                categories.find(getRandomNumber(1, categoryRange)),
                                supplierDao.find(getRandomNumber(1, supplierRange))) ;
            product.setImgUrl(imageName);
            productDataStore.add(product);
        }
    }

    private int getRandomNumber(int origin, int bound){
       return ThreadLocalRandom.current().nextInt(origin, bound);
    }
}
