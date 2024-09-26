-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: train_reservation
-- ------------------------------------------------------
-- Server version	8.0.39
--
-- Table structure for table `reservations`
--
DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_id` int DEFAULT NULL,
  `reservation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `seat_id` (`seat_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,1,'2024-09-25 17:12:54'),(2,2,'2024-09-25 17:12:54'),(3,3,'2024-09-25 17:12:54'),(4,4,'2024-09-25 17:12:54'),(5,21,'2024-09-25 17:23:58'),(6,28,'2024-09-25 17:23:58'),(7,35,'2024-09-25 17:23:58'),(8,42,'2024-09-25 17:23:58'),(9,34,'2024-09-25 17:23:58'),(10,27,'2024-09-25 17:23:58'),(11,20,'2024-09-25 17:23:58'),(12,11,'2024-09-25 17:24:50'),(13,53,'2024-09-25 17:25:29'),(14,54,'2024-09-25 17:25:29'),(15,10,'2024-09-25 19:08:17'),(16,74,'2024-09-25 19:40:02'),(17,57,'2024-09-26 09:43:45');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `row` int NOT NULL,
  `column` int NOT NULL,
  `is_reserved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,4,1),(5,1,5,0),(6,1,6,0),(7,1,7,0),(8,2,1,0),(9,2,2,0),(10,2,3,1),(11,2,4,1),(12,2,5,0),(13,2,6,0),(14,2,7,0),(15,3,1,0),(16,3,2,0),(17,3,3,0),(18,3,4,0),(19,3,5,0),(20,3,6,1),(21,3,7,1),(22,4,1,0),(23,4,2,0),(24,4,3,0),(25,4,4,0),(26,4,5,0),(27,4,6,1),(28,4,7,1),(29,5,1,0),(30,5,2,0),(31,5,3,0),(32,5,4,0),(33,5,5,0),(34,5,6,1),(35,5,7,1),(36,6,1,0),(37,6,2,0),(38,6,3,0),(39,6,4,0),(40,6,5,0),(41,6,6,0),(42,6,7,1),(43,7,1,0),(44,7,2,0),(45,7,3,0),(46,7,4,0),(47,7,5,0),(48,7,6,0),(49,7,7,0),(50,8,1,0),(51,8,2,0),(52,8,3,0),(53,8,4,1),(54,8,5,1),(55,8,6,0),(56,8,7,0),(57,9,1,1),(58,9,2,0),(59,9,3,0),(60,9,4,0),(61,9,5,0),(62,9,6,0),(63,9,7,0),(64,10,1,0),(65,10,2,0),(66,10,3,0),(67,10,4,0),(68,10,5,0),(69,10,6,0),(70,10,7,0),(71,11,1,0),(72,11,2,0),(73,11,3,0),(74,1,1,1),(75,1,2,0),(76,1,3,0),(77,1,4,0),(78,1,5,0),(79,1,6,0),(80,1,7,0),(81,2,1,0),(82,2,2,0),(83,2,3,0),(84,2,4,0),(85,2,5,0),(86,2,6,0),(87,2,7,0),(88,3,1,0),(89,3,2,0),(90,3,3,0),(91,3,4,0),(92,3,5,0),(93,3,6,0),(94,3,7,0),(95,4,1,0),(96,4,2,0),(97,4,3,0),(98,4,4,0),(99,4,5,0),(100,4,6,0),(101,4,7,0),(102,5,1,0),(103,5,2,0),(104,5,3,0),(105,5,4,0),(106,5,5,0),(107,5,6,0),(108,5,7,0),(109,6,1,0),(110,6,2,0),(111,6,3,0),(112,6,4,0),(113,6,5,0),(114,6,6,0),(115,6,7,0),(116,7,1,0),(117,7,2,0),(118,7,3,0),(119,7,4,0),(120,7,5,0),(121,7,6,0),(122,7,7,0),(123,8,1,0),(124,8,2,0),(125,8,3,0),(126,8,4,0),(127,8,5,0),(128,8,6,0),(129,8,7,0),(130,9,1,0),(131,9,2,0),(132,9,3,0),(133,9,4,0),(134,9,5,0),(135,9,6,0),(136,9,7,0),(137,10,1,0),(138,10,2,0),(139,10,3,0),(140,10,4,0),(141,10,5,0),(142,10,6,0),(143,10,7,0),(144,11,1,0),(145,11,2,0),(146,11,3,0);
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;

-- Dump completed on 2024-09-26 15:59:03
