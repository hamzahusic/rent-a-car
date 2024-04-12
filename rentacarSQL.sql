-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: rentacar
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `automobil`
--

DROP TABLE IF EXISTS `automobil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `automobil` (
  `id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(200) NOT NULL,
  `proizvodjac` varchar(100) NOT NULL,
  `mjesta` varchar(45) NOT NULL,
  `transmisija` varchar(45) NOT NULL,
  `pogon` varchar(45) NOT NULL,
  `opis` text NOT NULL,
  `slika` varchar(300) NOT NULL,
  `cijena_po_danu` int NOT NULL,
  `kategorija_id` int NOT NULL,
  `korisnik_id` int NOT NULL,
  PRIMARY KEY (`id`,`kategorija_id`,`korisnik_id`),
  KEY `fk_automobil_kategorija_idx` (`kategorija_id`),
  KEY `fk_automobil_korisnik1_idx` (`korisnik_id`),
  CONSTRAINT `fk_automobil_kategorija` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`id`),
  CONSTRAINT `fk_automobil_korisnik1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `automobil`
--

LOCK TABLES `automobil` WRITE;
/*!40000 ALTER TABLE `automobil` DISABLE KEYS */;
INSERT INTO `automobil` VALUES (1,'Škoda Fabia 1.6','Volkswagen','4','Automatik','4x4','Četvrta generacija Škode Fabie službeno je predstavljena početkom maja 2021., a proizvodnja ovog modela započela je sredinom jula. Opisani automobil baziran je na platformi MQB-A0 i veći je od svog prethodnika, zahvaljujući čemu nudi prostraniju kabinu i veći prtljažnik. Ponuda dostupnih motora uključuje samo benzinske motore – jedan atmosferski s ubrizgavanjem u više točaka (MPI) i tri turbopunjena s direktnim ubrizgavanjem (TSI).','1712306346422skoda.png',70,3,1),(2,'Toyota Camry 2.5 Hybrid','Toyota','5','Automatik','Prednji','Toyota Camry je popularna limuzina koja se ističe svojim hibridnim pogonom. Ovaj model nudi udobnu vožnju, velik prostor za putnike i efikasnu potrošnju goriva zahvaljujući kombinaciji benzinskog i električnog motora.','171238819050790e3b0e47c67d03341d95d332f724742-removebg-preview.png',80,3,1),(3,'BMW X5 xDrive40i','BMW Group','5','Automatik','4x4','BMW X5 je luksuzni SUV koji kombinuje vrhunsku udobnost, sofisticiran dizajn i izvanredne performanse. Ovaj model nudi prostranu unutrašnjost, napredne tehnološke karakteristike i snažan motor.','1712388690556HD-wallpaper-2019-bmw-x5-m50d-us-spec-front-three-quarter-car-removebg-preview.png',120,1,1),(4,'Audi A4','Audi','5','Automatik','Prednji','Audi A4 je elegantna limuzina koja kombinuje vrhunski dizajn, udobnost i performanse. Ovaj model nudi efikasan dizel motor, prostranu unutrašnjost i napredne sigurnosne karakteristike.','17123888620021674406931_Audi-A4-and-S4-B98W-2022-fuse-box-removebg-preview.png',90,4,1),(5,'Mercedes-Benz C-Class C300','Mercedes-Benz','5','Automatik','Zadnji','Mercedes-Benz C-Class je luksuzna limuzina koja pruža vrhunsku udobnost, sofisticiran dizajn i izuzetne performanse. Ovaj model nudi snažan motor, luksuzno opremljenu unutrašnjost i najnovije tehnološke karakteristike.','1712389215227mercedes-removebg-preview.png',110,3,1),(6,'Ford Mustang GT','Ford Motor','4','Manuelni','Zadnji','Ford Mustang GT je legendarni sportski automobil koji se ističe svojim moćnim V8 motorom, ikoničnim dizajnom i impresivnim performansama. Ovaj model nudi nezaboravno iskustvo vožnje i vrhunski dizajn.','1712389415592mustfront-removebg-preview.png',150,6,1),(7,'Volkswagen Golf','Volkswagen','5','Automatik','Prednji','Volkswagen Golf je popularni kompaktni automobil koji se ističe svojim udobnim voznim karakteristikama, praktičnošću i pouzdanošću. Ovaj model nudi ekonomičan benzinski motor, prostranu unutrašnjost i napredne tehnološke karakteristike.','17123895669359965-removebg-preview.png',75,3,1),(8,'Chevrolet Tahoe','Chevrolet','8','Automatik','4x4','Chevrolet Tahoe je prostrani SUV pogodan za porodične avanture i duge putovanja. Ovaj model nudi dovoljno mjesta za putnike i prtljag, snažan V8 motor i napredne sigurnosne karakteristike.','17123897807202024-Chevy-Tahoe-carplay-price-cost-exterior-removebg-preview.png',140,1,1),(9,'Hyundai Sonata Hybrid','Hyundai','5','Automatik','Prednji','Hyundai Sonata Hybrid je moderna limuzina koja kombinuje udobnost, efikasnost i napredne tehnologije. Ovaj model nudi hibridni pogon, prostranu unutrašnjost i sofisticiran dizajn.','1712390095948img_001-removebg-preview.png',85,3,1),(10,'Tesla Model S','Tesla','5','Automatik','4x4','Tesla Model S je revolucionarni električni automobil koji kombinuje impresivne performanse, sofisticiran dizajn i napredne tehnološke karakteristike. Ovaj model nudi dugački domet, brzu punjenje i autonomnu vožnju.','17124904185282021_tesla_model_s_plaid_0002-removebg-preview.png',220,3,1);
/*!40000 ALTER TABLE `automobil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategorija`
--

DROP TABLE IF EXISTS `kategorija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategorija` (
  `id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategorija`
--

LOCK TABLES `kategorija` WRITE;
/*!40000 ALTER TABLE `kategorija` DISABLE KEYS */;
INSERT INTO `kategorija` VALUES (1,'SUV'),(2,'Kupe'),(3,'Limuzina'),(4,'Karavan'),(5,'Kabriolet'),(6,'Sport');
/*!40000 ALTER TABLE `kategorija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) NOT NULL,
  `prezime` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `sifra` varchar(300) NOT NULL,
  `uloga` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (1,'Hamza','Husic','hamza@gmail.com','$2b$10$Ss33bRBISKAlFpmIo063zepi17LRZ/LaJdhe0BuvT0I8IndXOOWyK','admin'),(3,'Sakib','Sakic','sakib@gmail.com','$2b$10$4mQjhrvS24rjfJZrwc5LU.BNtJBnJgmr7Ee3AMb0dK8c/urQnCLpW','user');
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-07 15:30:09
