CREATE DATABASE  IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (3,3,7,1,'2024-08-30 14:43:33'),(4,3,14,3,'2024-08-30 14:43:33'),(21,4,48,1,'2024-09-01 16:31:53');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics','Devices and gadgets','2024-08-30 14:36:37'),(2,'Clothing','Apparel and accessories','2024-08-30 14:36:37'),(3,'Books','Books and literature','2024-08-30 14:36:37'),(4,'Home Appliances','Appliances for home use','2024-08-30 14:36:37');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (10,1,6,1,699.99),(13,3,10,1,89.99),(14,4,6,1,699.99),(15,4,9,4,9.99),(16,5,10,1,89.99),(17,5,7,2,1199.99),(18,6,9,2,9.99),(19,7,7,1,1199.99),(20,7,8,1,19.99),(21,8,10,3,89.99),(22,8,6,2,699.99),(23,9,10,1,89.99),(24,9,7,2,1199.99),(25,9,29,1,599.99);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','shipped','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3,729.97,'shipped','2024-08-30 14:37:31'),(2,3,29.98,'pending','2024-08-30 14:37:31'),(3,4,89.99,'shipped','2024-08-31 07:05:56'),(4,5,739.95,'completed','2024-08-31 07:48:41'),(5,4,2489.97,'pending','2024-08-31 12:52:27'),(6,5,19.98,'pending','2024-08-31 13:22:54'),(7,5,1219.98,'pending','2024-08-31 13:30:52'),(8,5,1669.95,'cancelled','2024-08-31 13:32:49'),(9,4,3089.96,'shipped','2024-08-31 15:16:41');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimages`
--

DROP TABLE IF EXISTS `productimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimages` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (11,6,'https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/TiM1Gzwu2tfEAyVT.png'),(12,7,'https://m.media-amazon.com/images/I/61+r3+JstZL._AC_UF1000,1000_QL80_.jpg'),(13,13,'https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-teal-tshirts-men-tshirt-tshirt-for-men-tshirt-mens-tshirt-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-t-shirt-product-images-rvowvf0akl-1-202402121853.jpg?im=Resize=(500,630)'),(14,14,'https://jerryjenkins.com/wp-content/uploads/2018/02/How-to-Write-a-Novel.jpg'),(15,15,'https://img.etimg.com/thumb/width-1600,height-900,imgsize-47640,resizemode-75,msid-92847221/top-trending-products/kitchen-dining/microwave/best-microwave-oven-under-30000.jpg');
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (6,'Smartphone','Latest model smartphone with advanced features.',699.99,50,1,'2024-08-30 14:36:54','https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/TiM1Gzwu2tfEAyVT.png'),(7,'Laptop','High performance laptop for gaming and work.',1199.99,30,1,'2024-08-30 14:36:54','https://m.media-amazon.com/images/I/61+r3+JstZL._AC_UF1000,1000_QL80_.jpg'),(8,'T-Shirt','Comfortable cotton t-shirt in various colors.',19.99,100,2,'2024-08-30 14:36:54','https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-teal-tshirts-men-tshirt-tshirt-for-men-tshirt-mens-tshirt-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-t-shirt-product-images-rvowvf0akl-1-202402121853.jpg?im=Resize=(500,630)'),(9,'Novel','Bestselling fiction novel.',9.99,200,3,'2024-08-30 14:36:54','https://jerryjenkins.com/wp-content/uploads/2018/02/How-to-Write-a-Novel.jpg'),(10,'Microwave','Compact microwave for kitchen use.',89.99,20,4,'2024-08-30 14:36:54','https://img.etimg.com/thumb/width-1600,height-900,imgsize-47640,resizemode-75,msid-92847221/top-trending-products/kitchen-dining/microwave/best-microwave-oven-under-30000.jpg'),(11,'Smartphone','Latest model smartphone with advanced features.',699.99,50,1,'2024-08-30 14:40:40','https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/TiM1Gzwu2tfEAyVT.png'),(12,'Laptop','High performance laptop for gaming and work.',1199.99,30,1,'2024-08-30 14:40:40','https://m.media-amazon.com/images/I/61+r3+JstZL._AC_UF1000,1000_QL80_.jpg'),(13,'T-Shirt','Comfortable cotton t-shirt in various colors.',19.99,100,2,'2024-08-30 14:40:40','https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-teal-tshirts-men-tshirt-tshirt-for-men-tshirt-mens-tshirt-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-t-shirt-product-images-rvowvf0akl-1-202402121853.jpg?im=Resize=(500,630)'),(14,'Novel','Bestselling fiction novel.',11.99,200,3,'2024-08-30 14:40:40','https://jerryjenkins.com/wp-content/uploads/2018/02/How-to-Write-a-Novel.jpg'),(15,'Microwave','Compact microwave for kitchen use.',89.99,20,4,'2024-08-30 14:40:40','https://img.etimg.com/thumb/width-1600,height-900,imgsize-47640,resizemode-75,msid-92847221/top-trending-products/kitchen-dining/microwave/best-microwave-oven-under-30000.jpg'),(16,'Smartphone','Latest model smartphone with advanced features.',699.99,50,1,'2024-08-31 14:13:36','https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/TiM1Gzwu2tfEAyVT.png'),(17,'Laptop','High performance laptop for gaming and work.',1199.99,30,1,'2024-08-31 14:13:36','https://m.media-amazon.com/images/I/61+r3+JstZL._AC_UF1000,1000_QL80_.jpg'),(18,'T-Shirt','Comfortable cotton t-shirt in various colors.',19.99,100,2,'2024-08-31 14:13:36','https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-teal-tshirts-men-tshirt-tshirt-for-men-tshirt-mens-tshirt-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-t-shirt-product-images-rvowvf0akl-1-202402121853.jpg?im=Resize=(500,630)'),(20,'Microwave','Compact microwave for kitchen use.',89.99,20,4,'2024-08-31 14:13:36','https://img.etimg.com/thumb/width-1600,height-900,imgsize-47640,resizemode-75,msid-92847221/top-trending-products/kitchen-dining/microwave/best-microwave-oven-under-30000.jpg'),(21,'Samsung','Latest model smartphone with advanced features.',399.99,50,1,'2024-08-31 14:24:42','https://5.imimg.com/data5/CB/DT/BE/SELLER-100534408/samsung-mobile-phones-a50s-4-128-.jpg'),(22,'HP','High performance laptop for professionals.',799.99,30,1,'2024-08-31 14:24:42','https://rukminim2.flixcart.com/image/850/1000/xif0q/computer/3/h/8/-original-imagp7pfhjzh6c8z.jpeg?q=90&crop=false'),(23,'T-Shirt','Comfortable cotton t-shirt in various colors.',19.99,100,2,'2024-08-31 14:24:42','https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-teal-tshirts-men-tshirt-tshirt-for-men-tshirt-mens-tshirt-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-t-shirt-product-images-rvowvf0akl-1-202402121853.jpg?im=Resize=(500,630)'),(25,'Microwave','Compact microwave for kitchen use.',89.99,20,4,'2024-08-31 14:24:42','https://img.etimg.com/thumb/width-1600,height-900,imgsize-47640,resizemode-75,msid-92847221/top-trending-products/kitchen-dining/microwave/best-microwave-oven-under-30000.jpg'),(26,'Samsung Galaxy S23','Latest Samsung smartphone with advanced features.',799.99,50,1,'2024-08-31 14:26:01','https://rukminim2.flixcart.com/image/750/900/xif0q/mobile/x/7/n/-original-imagzm8qzhpuwrak.jpeg?q=20&crop=false'),(27,'OPPO Find X6 Pro','OPPO flagship smartphone with high-end specifications.',999.99,30,1,'2024-08-31 14:26:01','https://cdn1.smartprix.com/rx-ihIBo5dkr-w420-h420/oppo-find-x6-pro.jpg'),(28,'iPhone 14 Pro','Latest iPhone with cutting-edge technology.',1099.99,40,1,'2024-08-31 14:26:01','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxLvb0MRq3LWdnynIuKBbEVdkqPP3WmVQDrw&s'),(29,'Moto Edge 40','Moto smartphone with impressive performance.',599.99,45,1,'2024-08-31 14:26:01','https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/b/q/6/edge-40-pay40028in-motorola-original-imagpqzdnhrgvhj7.jpeg?q=90&crop=false'),(30,'OnePlus 11','High-performance OnePlus phone with great value.',749.99,55,1,'2024-08-31 14:26:01','https://m.media-amazon.com/images/I/71K84j2O8wL.jpg'),(31,'Vivo X90 Pro','Vivo flagship phone with innovative features.',899.99,35,1,'2024-08-31 14:26:01','https://i.gadgets360cdn.com/products/large/db-vivo-x90-709x800-1670582382.jpg?downsize=*:360'),(32,'Dell XPS 13','Compact and powerful laptop from Dell.',1399.99,30,1,'2024-08-31 14:26:48','https://images-cdn.ubuy.co.in/635f8ad9afed8b54834faff3-dell-xps-13-plus-9320-13-4.jpg'),(33,'Acer Predator Helios 300','Gaming laptop with high performance.',1599.99,25,1,'2024-08-31 14:26:48','https://images-cdn.ubuy.co.in/658b3c35ed1bba0a45652d87-acer-predator-helios-300-gaming-laptop.jpg'),(34,'Lenovo ThinkPad X1 Carbon','Lenovo’s premium business laptop.',1399.99,20,1,'2024-08-31 14:26:48','https://p1-ofp.static.pub/fes/cms/2023/04/28/iu6t7jqpekoy7o76vbn0c9a9b7rbsb543440.png'),(35,'HP Spectre x360','Convertible laptop with versatile features.',1499.99,28,1,'2024-08-31 14:26:48','https://img-cdn.tnwcdn.com/image?fit=1200%2C900&height=900&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2021%2F08%2FHP-Spectre-x360-14-1-of-7.jpg&signature=0d2f21c8c102f0b5f8f935cee9d98ef6'),(36,'Asus ROG Zephyrus G14','Gaming laptop with AMD Ryzen processor.',1299.99,22,1,'2024-08-31 14:26:48','https://images-cdn.ubuy.co.in/633fec90328a6f66f3526dd3-asus-rog-zephyrus-g14-14-fhd-led.jpg'),(37,'Apple MacBook Pro 16','High-end laptop with Apple M1 Pro chip.',2399.99,18,1,'2024-08-31 14:26:48','https://i.pcmag.com/imagery/reviews/0227QDT3xYwn3xEOpyiJpNU-13.fit_lim.size_3360x1890.v_1575681044.jpg'),(38,'Nike T-Shirt','Comfortable Nike t-shirt for casual wear.',29.99,100,2,'2024-08-31 14:27:11','https://m.media-amazon.com/images/I/81FjoDja7YL._AC_UY1100_.jpg'),(39,'Levi\'s 501 Jeans','Classic Levi\'s jeans with a timeless fit.',69.99,50,2,'2024-08-31 14:27:11','https://images-cdn.ubuy.co.in/64dca4fc6456c616f92f9d4a-levi-s-men-s-501-original-fit-jeans.jpg'),(40,'Adidas Track Jacket','Stylish Adidas track jacket for sports.',89.99,40,2,'2024-08-31 14:27:11','https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4c72be5444d74daf94efad1700b8d6e9_9366/AEROREADY_Sereno_Cut_3-Stripes_Slim_Track_Jacket_Blue_H28903_01_laydown.jpg'),(41,'Puma Sneakers','Comfortable Puma sneakers for everyday use.',79.99,60,2,'2024-08-31 14:27:11','https://rukminim2.flixcart.com/image/850/1000/l0pm3680/shoe/p/g/y/9-380190-9-puma-white-green-gables-original-imagcfshkadtmd75.jpeg?q=20&crop=false'),(42,'H&M Cotton Shirt','Stylish H&M cotton shirt for formal occasions.',49.99,70,2,'2024-08-31 14:27:11','https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F4e%2F08%2F4e082157e010d31b6fd37c07186d7884c40999aa.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]'),(43,'Dockers Pants','Casual Dockers pants with a modern fit.',59.99,55,2,'2024-08-31 14:27:11','https://images-cdn.ubuy.co.in/65267c5f1db11d24a4504b1d-dockers-men-s-classic-flat-front-easy.jpg'),(44,'To Kill a Mockingbird','Classic novel by Harper Lee.',14.99,100,3,'2024-08-31 14:27:31','https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/1200px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg'),(45,'1984 by George Orwell','Dystopian novel about a totalitarian regime.',13.99,120,3,'2024-08-31 14:27:31','https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'),(46,'The Great Gatsby','F. Scott Fitzgerald’s classic novel.',10.99,150,3,'2024-08-31 14:27:31','https://images-eu.ssl-images-amazon.com/images/I/81Q6WkLhX4L._AC_UL600_SR600,600_.jpg'),(47,'The Catcher in the Rye','Novel by J.D. Salinger.',12.99,110,3,'2024-08-31 14:27:31','https://m.media-amazon.com/images/I/8125BDk3l9L._AC_UF1000,1000_QL80_.jpg'),(48,'Pride and Prejudice','Jane Austen’s timeless romance novel.',11.99,130,3,'2024-08-31 14:27:31','https://m.media-amazon.com/images/I/81NLDvyAHrL._AC_UF1000,1000_QL80_.jpg'),(49,'The Da Vinci Code','Thriller novel by Dan Brown.',15.99,140,3,'2024-08-31 14:27:31','https://m.media-amazon.com/images/I/815WORuYMML._AC_UF1000,1000_QL80_.jpg'),(62,'Dyson V15 Detect','High-performance cordless vacuum cleaner.',699.99,25,4,'2024-08-31 14:30:21','https://m.media-amazon.com/images/I/613doEjslUL._AC_UF894,1000_QL80_.jpg'),(63,'Samsung Side-by-Side Refrigerator','Large refrigerator with advanced cooling technology.',1199.99,15,4,'2024-08-31 14:30:21','https://images.samsung.com/is/image/samsung/p6pim/in/rs7hcg8543b1hl/gallery/in-side-by-side-family-hub-449420-rs7hcg8543b1hl-535087575?$650_519_PNG$'),(64,'LG Front Load Washer','Efficient LG washing machine with multiple features.',799.99,18,4,'2024-08-31 14:30:21','https://www.lg.com/content/dam/channel/wcms/in/images/washing-machines/fhp1209z9b_ablqeil_eail_in_c/FHP1209Z9B-Washing-Machines-Front-View-450.jpg'),(65,'Breville Espresso Machine','High-quality espresso machine for home use.',499.99,20,4,'2024-08-31 14:30:21','https://m.media-amazon.com/images/I/71BvCt6eAFL._AC_UF894,1000_QL80_.jpg'),(66,'KitchenAid Stand Mixer','Versatile stand mixer for baking and cooking.',379.99,22,4,'2024-08-31 14:30:21','https://www.kitchenaid.in/is/image/content/dam/global/kitchenaid/countertop-appliance/portable/images/hero-KSM150PSER.tif?id=W22mx1&fmt=jpg&dpr=off&fit=constrain,1&wid=300&hei=291'),(67,'Philips Air Fryer','Healthy air fryer with rapid air technology.',299.99,30,4,'2024-08-31 14:30:21','https://images.philips.com/is/image/philipsconsumer/HD9741_99-IMS-en_US.jpg'),(68,'Airpods','Apple H1 headphone chip',250.00,45,1,'2024-08-31 17:24:15','https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861342000'),(69,'Gucci Belt','Black Leather Belt with Gold GG Buckle',700.00,4,2,'2024-08-31 17:34:21','https://images-cdn.ubuy.co.in/634cfe4c162fb4153e34c85e-gucci-belt-black-leather-marmont-gold-gg.jpg'),(70,'Air Jordan 1','Remakes the classic sneaker, giving you a fresh look with a familiar feel.',200.00,66,2,'2024-08-31 17:49:28','https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8402492b-1d6c-4811-af0f-4e3090c2ab59/AIR+JORDAN+1+RETRO+HIGH+OG.png'),(77,'The Book Of Wonders','International Bestseller by Julien Sandrel',8.00,20,3,'2024-08-31 18:20:39','https://m.media-amazon.com/images/I/41CawDp4myL.jpg'),(78,'Samsung Galaxy S23','Latest Samsung smartphone with advanced features.',799.99,50,1,'2024-09-01 07:59:30','https://images.samsung.com/is/image/samsung/p6pim/in/galaxy-s23/s23_front_phantom_black.jpg'),(79,'OPPO Find X6 Pro','OPPO flagship smartphone with high-end specifications.',999.99,30,1,'2024-09-01 07:59:30','https://www.oppo.com/content/dam/oppo/common/mkt/product/Find-X6/Find-X6-Pro-Feature-Page-06.jpg'),(80,'iPhone 14 Pro','Latest iPhone with cutting-edge technology.',1099.99,40,1,'2024-09-01 07:59:30','https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone14Pro_09142022_image.jpg'),(81,'Moto Edge 40','Moto smartphone with impressive performance.',599.99,45,1,'2024-09-01 07:59:30','https://www.motorola.com/content/dam/motorola/pdp/edge-40/edge-40-motorola-productpage-image-1.jpg'),(82,'OnePlus 11','High-performance OnePlus phone with great value.',749.99,55,1,'2024-09-01 07:59:30','https://image01.oneplus.net/ebp/202302/oneplus-11-5g-black-05.jpg'),(83,'Vivo X90 Pro','Vivo flagship phone with innovative features.',899.99,35,1,'2024-09-01 07:59:30','https://www.vivo.com/content/dam/vivo/global/product/x90pro/x90pro-1.jpg'),(84,'Air Jordan 1','Remakes the classic sneaker, giving you a fresh look with a familiar feel.',200.00,66,2,'2024-09-01 07:59:30','https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8402492b-1d6c-4811-af0f-4e3090c2ab59/AIR+JORDAN+1+RETRO+HIGH+OG.png'),(85,'Dell XPS 13','Compact and powerful laptop from Dell.',1399.99,30,2,'2024-09-01 07:59:30','https://www.dell.com/support/assets/images/laptops/xps-13-9310-xps13-gallery-3.jpg'),(86,'Acer Predator Helios 300','Gaming laptop with high performance.',1599.99,25,2,'2024-09-01 07:59:30','https://www.acer.com/ac/en/US/content/model/nh.q4eaa.001'),(87,'Lenovo ThinkPad X1 Carbon','Lenovo’s premium business laptop.',1399.99,20,2,'2024-09-01 07:59:30','https://www.lenovo.com/medias/lenovo-laptop-thinkpad-x1-carbon-gen-10.png'),(88,'HP Spectre x360','Convertible laptop with versatile features.',1499.99,30,2,'2024-09-01 07:59:30','https://www.hp.com/content/dam/hp/images/laptops/spectre-x360-15-2022-hero.jpg'),(89,'Asus ROG Zephyrus G14','Gaming laptop with AMD Ryzen processor.',1299.99,22,2,'2024-09-01 07:59:30','https://rog.asus.com/media/16171/rog-zephyrus-g14.jpg'),(90,'Apple MacBook Pro 16','High-end laptop with Apple M1 Pro chip.',2399.99,18,2,'2024-09-01 07:59:30','https://www.apple.com/macbook-pro-16/hero/images/overview/hero_16.png'),(91,'Nike T-Shirt','Comfortable Nike t-shirt for casual wear.',29.99,100,3,'2024-09-01 07:59:30','https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b047aa9c-53f5-4b2f-8ae2-9c2b18f61a7d/nike-dri-fit-miler-mens-running-t-shirt-nB3QxQ.png'),(92,'Levi\'s 501 Jeans','Classic Levi\'s jeans with a timeless fit.',69.99,50,3,'2024-09-01 07:59:30','https://www.levi.com/on/demandware.static/-/Sites-Levi-Site/-/default/dw47d9c9f1/images/501-originals-jeans-model.jpg'),(93,'Adidas Track Jacket','Stylish Adidas track jacket for sports.',89.99,40,3,'2024-09-01 07:59:30','https://assets.adidas.com/images/w_600,f_auto,q_auto/abe9b7465a6c43d3bd1ba0510090d101_9366/Adicolor_Essentials_3-Stripes_Jacket.jpg'),(94,'Puma Sneakers','Comfortable Puma sneakers for everyday use.',79.99,60,3,'2024-09-01 07:59:30','https://image.puma.com/image/upload/f_auto,q_auto,fl_lossy,puma-455951.jpeg'),(95,'H&M Cotton Shirt','Stylish H&M cotton shirt for formal occasions.',49.99,70,3,'2024-09-01 07:59:30','https://www2.hm.com/en_asia2/productpage.0990550001.html'),(96,'Dockers Pants','Casual Dockers pants with a modern fit.',59.99,55,3,'2024-09-01 07:59:30','https://www.dockers.com/content/dam/dockers/mens/16SS_D1-02_T1_RP01-01-16S.jpg'),(97,'To Kill a Mockingbird','Classic novel by Harper Lee.',14.99,100,4,'2024-09-01 07:59:30','https://images-na.ssl-images-amazon.com/images/I/81Otwk6tTLL.jpg'),(98,'1984 by George Orwell','Dystopian novel about a totalitarian regime.',13.99,120,4,'2024-09-01 07:59:30','https://images-na.ssl-images-amazon.com/images/I/71K2p2Z5wAL.jpg'),(99,'The Great Gatsby','F. Scott Fitzgerald’s classic novel.',10.99,150,4,'2024-09-01 07:59:30','https://images-na.ssl-images-amazon.com/images/I/71V91bZs5KL.jpg'),(100,'The Catcher in the Rye','Novel by J.D. Salinger.',12.99,110,4,'2024-09-01 07:59:30','https://images-na.ssl-images-amazon.com/images/I/81O0ZBzTo-L.jpg'),(101,'Pride and Prejudice','Jane Austen’s timeless romance novel.',11.99,130,4,'2024-09-01 07:59:30','https://images-na.ssl-images-amazon.com/images/I/91fS1M7bPQL.jpg'),(102,'The Da Vinci Code','Thriller novel by Dan Brown.',15.99,140,4,'2024-09-01 07:59:30','https://images-na.ssl-images-amazon.com/images/I/91a2J5se+zL.jpg'),(103,'Dyson V15 Detect','High-performance cordless vacuum cleaner.',699.99,25,4,'2024-09-01 07:59:30','https://www.dyson.com/content/dam/dyson/us/ie/images/110649-01_dyson-v15-detect-vacuum.jpg'),(104,'Samsung Side-by-Side Refrigerator','Large refrigerator with advanced cooling technology.',1199.99,15,4,'2024-09-01 07:59:30','https://images.samsung.com/is/image/samsung/p6pim/us/rs27t5561sr-aa/rs27t5561sr-aa-front.jpg'),(105,'LG Front Load Washer','Efficient LG washing machine with multiple features.',799.99,18,4,'2024-09-01 07:59:30','https://www.lg.com/us/images/washers/md06007245/large1.jpg'),(106,'Breville Espresso Machine','High-quality espresso machine for home use.',499.99,20,4,'2024-09-01 07:59:30','https://www.breville.com/content/dam/breville/us/espresso/espresso-850.jpg'),(107,'KitchenAid Stand Mixer','Versatile stand mixer for baking and cooking.',379.99,22,4,'2024-09-01 07:59:30','https://www.kitchenaid.com/dw/image/v2/AAQJ_PRD/on/demandware.static/-/Sites-kitchenaid_us-Library/default/dw8cfecfa2/images/stand-mixers/silver_diamonds_4_5.jpg'),(108,'Philips Air Fryer','Healthy air fryer with rapid air technology.',299.99,30,4,'2024-09-01 07:59:30','https://images.philips.com/is/image/philipsconsumer/HD9741_99-IMS-en_US.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('vendor','admin','customer') DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'customer1','customer1@example.com','custpassword','customer','2024-08-30 14:37:11'),(4,'customer2','customer2@gmail.com','$2b$10$.klFpKxsHQJqruP0si6yz.wDAyPNKv01CPhT9z7icgBCQNe0Tz2XK','customer','2024-08-30 19:29:30'),(5,'customer3','customer3@gmail.com','$2b$10$g4i88grWrDpp2cSBNLTSQuNx0cYcFOG3X3ncJrOGO4iWklZo7Lr5K','customer','2024-08-31 07:46:51'),(6,'vendor2','vendor2@gmail.com','$2b$10$QRa53FoitMfchZXlTKTCrunbUYLEaSw94Pd/oUSP0q2vujiwxa3ly','vendor','2024-08-31 17:11:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-01 23:13:07
