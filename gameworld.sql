-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2020 at 06:38 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessories`
--

CREATE TABLE `accessories` (
  `accessoryID` varchar(25) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `type` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accessories`
--

INSERT INTO `accessories` (`accessoryID`, `name`, `description`, `type`) VALUES
('045496892258', 'Zero Suit Samus, Super Smash Bros. Series', 'Nintendo amiibo, Zero Suit Samus, Super Smash Bros. Series', 'figures'),
('636276660411', 'Halo 5: Guardians - Framed Gaming Door Poster / Print (Masterchief)', 'Halo 5: Guardians - Framed Gaming Door Poster / Print (Masterchief) (Size: 21\" x', 'posters'),
('752073001056', 'Diablo II Ultimate Strategy Guide', 'Diablo II Ultimate Strategy Guide - Paperback - Bradygames', 'guidebook'),
('752073006990', 'World Of Warcraft Dungeon Companion', 'World Of Warcraft Dungeon Companion Bradygames', 'guidebook');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brandID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brandID`, `name`) VALUES
(3, 'Microsoft'),
(4, 'Sony'),
(5, 'Nintendo'),
(6, 'Sega'),
(7, 'Blizzard'),
(8, 'Amiibo'),
(9, 'Atari');

-- --------------------------------------------------------

--
-- Table structure for table `consolegenerations`
--

CREATE TABLE `consolegenerations` (
  `generationID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `brandID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `consolegenerations`
--

INSERT INTO `consolegenerations` (`generationID`, `name`, `brandID`) VALUES
(1, 'Xbox One', 3),
(2, 'Playstation 4', 5),
(3, 'Switch', 5),
(4, 'Nintendo DS', 5),
(5, 'Nintendo 64', 5),
(6, 'Super Nintendo Entertainment System', 5),
(7, 'Nintendo Entertainment System', 5),
(8, 'Gameboy Color', 5),
(9, 'Wii', 5),
(10, 'PC', 3),
(11, 'Sega Genesis', 6),
(12, 'Gameboy Advanced', 5),
(13, 'Xbox', 3),
(14, 'Xbox 360', 3),
(15, 'Playstation 2', 4),
(16, 'Playstation 3', 4),
(17, 'Atari 7800', 9);

-- --------------------------------------------------------

--
-- Table structure for table `consoles`
--

CREATE TABLE `consoles` (
  `consoleID` varchar(25) NOT NULL,
  `name` varchar(50) NOT NULL,
  `generationID` int(11) NOT NULL,
  `brandID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `consoles`
--

INSERT INTO `consoles` (`consoleID`, `name`, `generationID`, `brandID`) VALUES
('025001458612', 'Nintendo DS', 4, 5),
('045496590024', 'Nintendo Entertainment System', 7, 5),
('045496590093', 'Switch', 3, 5),
('045496710804', 'Game Boy Color Teal', 8, 5),
('4902370502527', 'Nintendo 64', 5, 5),
('711719511793', 'Playstation 4', 2, 4),
('885370808278', 'Xbox One', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipmentID` varchar(25) NOT NULL,
  `consoleID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipmentID`, `consoleID`, `name`, `type`) VALUES
('663293104550', 4, 'Donkey Kong Game Traveller Case', 'cases'),
('700254826912', 1, 'Guitar Hero: Warriors of Rock Wireless Guitar Controller', 'controller'),
('767578282213', 7, 'Orange Zapper Light Gun', 'controller'),
('818033016475', 1, 'Custom Xbox One Controller Glossy White', 'controller'),
('877083845923', 5, 'AV Composite Cable For Nintendo 64 N64 / GameCube / SNES , Black', 'cables'),
('892044001361', 7, 'RETRO-BIT AC Power Adapter', 'cables');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `gameID` varchar(25) NOT NULL,
  `consoleID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `releaseDate` date DEFAULT NULL,
  `genre` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`gameID`, `consoleID`, `name`, `releaseDate`, `genre`) VALUES
('045496590420', 3, 'Zelda Breath of the Wild', '2017-03-03', 'adventure'),
('045496734992', 5, 'Mario -nintendo Super Mario 64', '2020-05-06', 'adventure'),
('045496741273', 4, 'Pokemon Black', '2010-09-18', 'adventure'),
('047875882188', 1, 'Diablo III Eternal Collection', '2020-05-01', 'action'),
('190403346147', 3, 'Fire Emblem Warriors Special Edition', '2020-05-06', 'action'),
('4902370503609', 8, 'Pokemon Game Boy Yellow', '2020-05-06', 'adventure'),
('711719506133', 2, 'God of War', '2018-04-20', 'adventure'),
('722674120333', 2, 'Godzilla', '2020-05-06', 'action'),
('885370928518', 1, 'Halo 5: Guardians', '2015-10-27', 'sci-fi');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` varchar(25) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `used` tinyint(1) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `name`, `description`, `price`, `used`, `stock`) VALUES
('025001458612', 'Nintendo DS', 'Nintendo Hand-held device ', 59.99, 1, 7),
('045496590024', 'Nintendo Entertainment System', 'Nintendo Entertainment System: NES Classic Edition', 59.99, 0, 4),
('045496590093', 'Nintendo Switch', 'Switch console', 199.99, 0, 2),
('045496590420', 'Zelda Breath of the Wild', 'Zelda game', 49.99, 0, 7),
('045496710804', 'Game Boy Color Teal', 'Teal Game Boy Color, out of box', 44.99, 0, 2),
('045496734992', 'Mario -nintendo Super Mario 64', 'Mario -nintendo Super Mario 64-nds', 39.99, 0, 5),
('045496741273', 'Pokemon Black', 'pokemon game', 46.99, 0, 7),
('045496892258', 'Zero Suit Samus, Super Smash Bros. Series', 'Nintendo amiibo, Zero Suit Samus, Super Smash Bros. Series', 14.99, 1, 5),
('047875882188', 'Diablo III Eternal Collection', 'Diablo III Eternal Collection, Activision, Xbox One', 29.99, 1, 12),
('190403346147', 'Fire Emblem Warriors Special Edition', 'Nintendo Fire Emblem Warriors Special Edition (Nintendo Switch)', 69.99, 1, 4),
('4902370502527', 'Nintendo 64 Console System', 'Nintendo 64 Console System', 99.99, 0, 2),
('4902370503609', 'Pokemon Game Boy Yellow', 'Yellow Pikachu Gameboy Gb Game ', 59.99, 0, 2),
('636276660411', 'Halo 5: Guardians - Framed Gaming Door Poster / Pr', 'Halo 5: Guardians - Framed Gaming Door Poster / Print (Masterchief) (Size: 21\" x', 84.99, 1, 1),
('663293104550', 'Donkey Kong Game Traveller Case', 'Nintendo Donkey Kong Game Traveller Case For 3ds Red Brand Cr076 Dd-03', 7.99, 1, 18),
('700254826912', 'Guitar Hero: Warriors of Rock Wireless Guitar Cont', 'Guitar Only - For XBOX 360', 149.99, 1, 2),
('711719506133', 'God of War', 'Newest installment of the God of War series', 24.99, 0, 8),
('711719511793', 'Playstation 4', 'Sony Playstation 4 Console 1TB', 299.99, 0, 5),
('722674120333', 'Godzilla', 'Godzilla Game', 194.99, 1, 1),
('752073001056', 'Diablo II Ultimate Strategy Guide', 'Diablo II Ultimate Strategy Guide - Paperback - Bradygames', 8.99, 0, 2),
('752073006990', 'World Of Warcraft Dungeon Companion', 'World Of Warcraft Dungeon Companion Bradygames', 14.99, 0, 3),
('767578282213', 'Orange Zapper Light Gun', 'NES Zapper Gun', 9.99, 1, 4),
('818033016475', 'Custom Xbox One Controller Glossy White', 'Custom Xbox One Controller Glossy White', 59.99, 1, 8),
('877083845923', 'AV Composite Cable For Nintendo 64 N64 / GameCube ', 'AV Composite Cable For Nintendo 64 N64 / GameCube / SNES , Black', 4.99, 0, 12),
('885370808278', 'Xbox One', 'Console - Standard Edition without Kinect', 299.99, 0, 10),
('885370875652', 'Xbox One Call of Duty Advanced Warfare 1TB Bundle', 'Xbox One Call of Duty Advanced Warfare 1TB Bundle !! LIMITED EDITION !!', 329.99, 1, 1),
('885370928518', 'Halo 5: Guardians', 'Halo\'s 5th installment in the series', 9.99, 0, 6),
('892044001361', 'RETRO-BIT AC Power Adapter', 'RETRO-BIT AC Power Adapter (NES/SNES/Genesis)', 9.99, 1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `specialty`
--

CREATE TABLE `specialty` (
  `specialID` varchar(25) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brandID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ticketitems`
--

CREATE TABLE `ticketitems` (
  `itemID` int(11) NOT NULL,
  `productID` varchar(25) NOT NULL,
  `name` varchar(100) NOT NULL,
  `ticketID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ticketitems`
--

INSERT INTO `ticketitems` (`itemID`, `productID`, `name`, `ticketID`, `quantity`) VALUES
(1, '045496590420', 'Zelda Breath of the Wild', 5, 1),
(2, '045496741273', 'Pokemon Black', 1, 1),
(3, '711719506133', 'God of War', 5, 1),
(4, '885370808278', 'Xbox One', 2, 1),
(5, '885370928518', 'Halo 5: Guardians', 1, 1),
(6, '711719506133', 'God of War', 6, 1),
(7, '045496590420', 'Zelda Breath of the Wild', 6, 1),
(8, '045496741273', 'Pokemon Black', 6, 1),
(9, '885370928518', 'Halo 5: Guardians', 6, 1),
(10, '885370928518', 'Halo 5: Guardians', 7, 1),
(11, '045496741273', 'Pokemon Black', 7, 1),
(12, '045496590024', 'Nintendo Entertainment System', 8, 1),
(13, '767578282213', 'Orange Zapper Light Gun', 8, 1),
(14, '885370928518', 'Halo 5: Guardians', 9, 1),
(15, '885370928518', 'Halo 5: Guardians', 10, 1),
(16, '045496741273', 'Pokemon Black', 11, 1),
(17, '885370928518', 'Halo 5: Guardians', 11, 1),
(18, '045496741273', 'Pokemon Black', 12, 1),
(19, '885370928518', 'Halo 5: Guardians', 14, 1),
(20, '885370928518', 'Halo 5: Guardians', 15, 1),
(21, '885370928518', 'Halo 5: Guardians', 16, 1),
(22, '045496741273', 'Pokemon Black', 16, 1),
(23, '885370928518', 'Halo 5: Guardians', 17, 1),
(24, '045496741273', 'Pokemon Black', 17, 1),
(25, '752073001056', 'Diablo II Ultimate Strategy Guide', 18, 1),
(26, '885370928518', 'Halo 5: Guardians', 19, 1),
(27, '885370928518', 'Halo 5: Guardians', 19, 1),
(28, '047875882188', 'Diablo III Eternal Collection', 19, 1),
(29, '047875882188', 'Diablo III Eternal Collection', 19, 1),
(30, '045496741273', 'Pokemon Black', 19, 1),
(31, '885370928518', 'Halo 5: Guardians', 20, 1),
(32, '885370928518', 'Halo 5: Guardians', 21, 1),
(33, '885370928518', 'Halo 5: Guardians', 21, 1),
(34, '885370928518', 'Halo 5: Guardians', 22, 1),
(35, '047875882188', 'Diablo III Eternal Collection', 22, 1),
(36, '885370808278', 'Xbox One', 23, 1),
(37, '663293104550', 'Donkey Kong Game Traveller Case', 24, 1),
(38, '885370928518', 'Halo 5: Guardians', 25, 1),
(39, '885370928518', 'Halo 5: Guardians', 26, 1),
(40, '885370928518', 'Halo 5: Guardians', 27, 1),
(41, '045496741273', 'Pokemon Black', 27, 1),
(42, '047875882188', 'Diablo III Eternal Collection', 27, 1),
(43, '885370928518', 'Halo 5: Guardians', 28, 1),
(44, '885370928518', 'Halo 5: Guardians', 29, 1),
(45, '045496741273', 'Pokemon Black', 29, 1),
(46, '045496741273', 'Pokemon Black', 29, 1),
(47, '885370928518', 'Halo 5: Guardians', 30, 1),
(48, '885370928518', 'Halo 5: Guardians', 31, 1),
(49, '885370928518', 'Halo 5: Guardians', 31, 1),
(50, '045496741273', 'Pokemon Black', 31, 1),
(51, '885370928518', 'Halo 5: Guardians', 32, 1),
(52, '885370928518', 'Halo 5: Guardians', 33, 1),
(53, '885370928518', 'Halo 5: Guardians', 34, 1),
(54, '885370928518', 'Halo 5: Guardians', 35, 1),
(55, '885370928518', 'Halo 5: Guardians', 36, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticketID` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `ticketType` varchar(10) NOT NULL,
  `orderDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ticketID`, `customerID`, `userID`, `ticketType`, `orderDate`) VALUES
(1, 1, 1, 'sale', '2020-04-09 00:00:00'),
(2, 1, 1, 'sale', '2020-04-08 00:00:00'),
(5, 1, 1, 'sale', '2020-04-14 00:00:00'),
(6, 1, 1, 'sale', '2020-04-14 00:00:00'),
(7, 1, 1, 'sale', '2020-05-01 00:00:00'),
(8, 1, 1, 'sale', '2020-05-01 00:00:00'),
(9, 1, 1, 'sale', '2020-05-01 00:00:00'),
(10, 1, 2, 'buy', '2020-05-02 00:00:00'),
(11, 1, 2, 'sale', '2020-05-02 00:00:00'),
(12, 1, 1, 'sale', '2020-05-03 00:00:00'),
(14, 1, 2, 'sale', '2020-05-03 00:00:00'),
(15, 1, 2, 'buy', '2020-05-03 00:00:00'),
(16, 1, 1, 'sale', '2020-05-04 00:00:00'),
(17, 1, 1, 'sale', '2020-05-04 00:00:00'),
(18, 1, 2, 'sale', '2020-05-05 00:00:00'),
(19, 1, 3, 'sale', '2020-05-06 00:00:00'),
(20, 1, 7, 'buy', '2020-05-06 00:00:00'),
(21, 1, 7, 'sale', '2020-05-06 00:00:00'),
(22, 1, 7, 'buy', '2020-05-06 00:00:00'),
(23, 1, 7, 'sale', '2020-05-06 00:00:00'),
(24, 1, 7, 'sale', '2020-05-06 00:00:00'),
(25, 1, 7, 'sale', '2020-05-06 00:00:00'),
(26, 1, 7, 'buy', '2020-05-06 00:00:00'),
(27, 1, 7, 'sale', '2020-05-06 00:00:00'),
(28, 1, 7, 'buy', '2020-05-06 00:00:00'),
(29, 1, 7, 'sale', '2020-05-06 00:00:00'),
(30, 1, 7, 'buy', '2020-05-06 00:00:00'),
(31, 1, 7, 'sale', '2020-05-07 00:00:00'),
(32, 1, 7, 'buy', '2020-05-08 00:00:00'),
(33, 1, 7, 'buy', '2020-05-08 00:00:00'),
(34, 1, 5, 'buy', '2020-05-08 00:00:00'),
(35, 1, 5, 'buy', '2020-05-08 00:00:00'),
(36, 1, 5, 'buy', '2020-05-08 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `level` varchar(10) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(8) NOT NULL,
  `employed` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `level`, `username`, `password`, `employed`) VALUES
(1, 'master', 'hnic', 'p', 1),
(2, 'manager', 'John', 'p', 1),
(3, 'master', 'nick', 'p', 1),
(4, 'employee', 'David', 'p', 1),
(5, 'employee', 'Koen', 'p', 1),
(6, 'employee', 'Ethan', 'p', 1),
(7, 'master', 'Ronnie', 'password', 1),
(8, 'employee', 'Kirsten', 'aweosme', 1),
(9, 'employee', 'Richard', 'ish', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accessories`
--
ALTER TABLE `accessories`
  ADD PRIMARY KEY (`accessoryID`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brandID`);

--
-- Indexes for table `consolegenerations`
--
ALTER TABLE `consolegenerations`
  ADD PRIMARY KEY (`generationID`),
  ADD KEY `Brands` (`brandID`);

--
-- Indexes for table `consoles`
--
ALTER TABLE `consoles`
  ADD PRIMARY KEY (`consoleID`),
  ADD KEY `generationID` (`generationID`),
  ADD KEY `brandID` (`brandID`) USING BTREE;

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipmentID`),
  ADD KEY `consoleID` (`consoleID`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`gameID`),
  ADD KEY `genres` (`genre`),
  ADD KEY `consoleID` (`consoleID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `specialty`
--
ALTER TABLE `specialty`
  ADD PRIMARY KEY (`specialID`);

--
-- Indexes for table `ticketitems`
--
ALTER TABLE `ticketitems`
  ADD PRIMARY KEY (`itemID`),
  ADD KEY `ticketID` (`ticketID`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticketID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brandID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `consolegenerations`
--
ALTER TABLE `consolegenerations`
  MODIFY `generationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `ticketitems`
--
ALTER TABLE `ticketitems`
  MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticketID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accessories`
--
ALTER TABLE `accessories`
  ADD CONSTRAINT `accessories_ibfk_1` FOREIGN KEY (`accessoryID`) REFERENCES `products` (`productID`);

--
-- Constraints for table `consolegenerations`
--
ALTER TABLE `consolegenerations`
  ADD CONSTRAINT `consolegenerations_ibfk_1` FOREIGN KEY (`brandID`) REFERENCES `brands` (`brandID`);

--
-- Constraints for table `consoles`
--
ALTER TABLE `consoles`
  ADD CONSTRAINT `consoles_ibfk_1` FOREIGN KEY (`consoleID`) REFERENCES `products` (`productID`),
  ADD CONSTRAINT `consoles_ibfk_2` FOREIGN KEY (`generationID`) REFERENCES `consolegenerations` (`generationID`),
  ADD CONSTRAINT `consoles_ibfk_3` FOREIGN KEY (`brandID`) REFERENCES `brands` (`brandID`);

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`equipmentID`) REFERENCES `products` (`productID`),
  ADD CONSTRAINT `equipment_ibfk_2` FOREIGN KEY (`consoleID`) REFERENCES `consoles` (`generationID`);

--
-- Constraints for table `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_3` FOREIGN KEY (`gameID`) REFERENCES `products` (`productID`),
  ADD CONSTRAINT `games_ibfk_4` FOREIGN KEY (`consoleID`) REFERENCES `consoles` (`generationID`);

--
-- Constraints for table `ticketitems`
--
ALTER TABLE `ticketitems`
  ADD CONSTRAINT `ticketitems_ibfk_1` FOREIGN KEY (`ticketID`) REFERENCES `tickets` (`ticketID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
