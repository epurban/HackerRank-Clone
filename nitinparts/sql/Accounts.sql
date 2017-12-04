-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 04, 2017 at 02:20 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Accounts`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Accounts` (
  `usernames` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passs` varchar(255) NOT NULL,
  `starcount` int(11) DEFAULT '0',
  `currentlevel` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Accounts` (`usernames`, `email`, `passs`, `starcount`, `currentlevel`) VALUES
('alex2390', 'arod@gmail.com', '', 0, 0),
('cp2480', 'cp32490@gmail.com', '', 0, 0),
('kd082490', 'kd0824@gmail.com', 'venkat123', 0, 0),
('kobebean', 'kb0824@gmail.com', '', 0, 0),
('lebron23', 'lj23@gmail.com', '', 0, 0),
('titans2490', 'titans2490@gmail.com', '', 0, 0),
('vein2090', 'keveins@gmail.com', '', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Users`
--
ALTER TABLE `Accounts`
  ADD PRIMARY KEY (`usernames`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
