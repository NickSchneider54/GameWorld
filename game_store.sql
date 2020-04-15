-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2020 at 07:26 PM
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
  `consoleID` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `type` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(5, 'Nintendo');

-- --------------------------------------------------------

--
-- Table structure for table `consolegenerations`
--

CREATE TABLE `consolegenerations` (
  `generationID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `consolegenerations`
--

INSERT INTO `consolegenerations` (`generationID`, `name`) VALUES
(1, 'Xbox One'),
(2, 'Playstation 4'),
(3, 'Switch'),
(4, 'Nintendo DS');

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
('045496590093', 'Switch', 3, 5),
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
('045496741273', 4, 'Pokemon Black', '2010-09-18', 'adventure'),
('711719506133', 2, 'God of War', '2018-04-20', 'adventure'),
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
('025001458612', 'Nintendo DS', 'Nintendo Hand-held device ', 49.99, 1, 7),
('045496590093', 'Nintendo Switch', 'Switch console', 199.99, 0, 3),
('045496590420', 'Zelda Breath of the Wild', 'Zelda game', 49.99, 0, 8),
('045496741273', 'Pokemon Black', 'pokemon game', 46.95, 0, 7),
('711719506133', 'God of War', 'Newest installment of the God of War series', 19.99, 0, 8),
('711719511793', 'Playstation 4', 'Sony Playstation 4 Console 1TB', 299.99, 0, 5),
('885370808278', 'Xbox One', 'Console - Standard Edition without Kinect', 299.99, 0, 10),
('885370928518', 'Halo 5: Guardians', 'Halo\'s 5th installment in the series', 9.99, 0, 7);

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
(11, '045496741273', 'Pokemon Black', 7, 1);

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
(3, 1, 1, 'sale', '2020-04-14 00:00:00'),
(4, 1, 1, 'sale', '2020-04-14 00:00:00'),
(5, 1, 1, 'sale', '2020-04-14 00:00:00'),
(6, 1, 1, 'sale', '2020-04-14 00:00:00'),
(7, 1, 1, 'sale', '2020-04-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `level` varchar(10) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `level`, `username`, `password`) VALUES
(1, 'master', 'hnic', 'p'),
(2, 'employee', 'John', 'p');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accessories`
--
ALTER TABLE `accessories`
  ADD PRIMARY KEY (`accessoryID`),
  ADD KEY `type` (`type`),
  ADD KEY `consoleID` (`consoleID`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brandID`);

--
-- Indexes for table `consolegenerations`
--
ALTER TABLE `consolegenerations`
  ADD PRIMARY KEY (`generationID`);

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
  MODIFY `brandID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `consolegenerations`
--
ALTER TABLE `consolegenerations`
  MODIFY `generationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ticketitems`
--
ALTER TABLE `ticketitems`
  MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticketID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accessories`
--
ALTER TABLE `accessories`
  ADD CONSTRAINT `accessories_ibfk_1` FOREIGN KEY (`accessoryID`) REFERENCES `products` (`productID`),
  ADD CONSTRAINT `accessories_ibfk_2` FOREIGN KEY (`consoleID`) REFERENCES `consoles` (`generationID`);

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
