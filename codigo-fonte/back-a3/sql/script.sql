-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: dominus
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` varchar(36) NOT NULL,
  `name` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('01f9f1da-383a-4704-a109-b178ba72b367','Smartfit'),('0b2107e0-789f-44fe-b576-e5af397d9818','Magazine Luiza'),('4ae8bd6b-ff64-462d-88e3-a45d746e73b7','Amazon'),('e93aa35e-2726-4600-b744-eac73d1f03f9','Kabum'),('f4c8c743-cb8f-48eb-a5ed-93467ca3e45f','Heyfit');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` varchar(36) NOT NULL,
  `name` varchar(32) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('00665351-f520-4cd8-879f-eed8e47dc704','Monster',10.00),('06767304-9894-4c4c-93c4-87bd211717b2','Horus',10.00),('0e76353d-6790-46fc-8023-60e873c3f70f','Kitkat',10.00),('70a50c01-b360-46be-9d2f-e3f864b541f9','Frango 1kg',10.00),('91619b26-946f-4c91-8c34-dc5775706247','Minuano',10.00),('b81f7daf-fca1-4072-910e-61180a0dc1c2','Carne 1kg',10.00),('c8568fac-ae26-44a8-a68a-2017f364feb8','Creatina',10.00),('d8495879-f891-4201-a536-46a3dd71042b','Tablet',10.00),('dc23e754-1f4d-4236-b7e5-2e6fc49ee8c1','Whey Protein',10.00),('f57cb3ee-cefe-402a-87fc-d1775be8c499','Redbull',10.00);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sell`
--

DROP TABLE IF EXISTS `sell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sell` (
  `id` varchar(36) NOT NULL,
  `quantity` int NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `fk_client` varchar(36) NOT NULL,
  `fk_stock` varchar(120) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_client` (`fk_client`),
  KEY `fk_stock` (`fk_stock`),
  CONSTRAINT `sell_ibfk_1` FOREIGN KEY (`fk_client`) REFERENCES `client` (`id`),
  CONSTRAINT `sell_ibfk_2` FOREIGN KEY (`fk_stock`) REFERENCES `stock` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sell`
--

LOCK TABLES `sell` WRITE;
/*!40000 ALTER TABLE `sell` DISABLE KEYS */;
/*!40000 ALTER TABLE `sell` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` varchar(36) NOT NULL,
  `quantity` int NOT NULL,
  `fk_product` varchar(120) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product` (`fk_product`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`fk_product`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dominus'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04  1:37:08
