-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2020 at 03:15 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laf`
--

-- --------------------------------------------------------

--
-- Table structure for table `claims`
--

CREATE TABLE `claims` (
  `claims_id` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `student_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `item_id` int(11) NOT NULL,
  `claimant_status` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `claims`
--

INSERT INTO `claims` (`claims_id`, `date`, `student_id`, `item_id`, `claimant_status`) VALUES
(38, '2020-10-21 20:04:41', '5918127', 244, 'PENDING'),
(39, '2020-10-21 20:04:45', '5918127', 245, 'PENDING'),
(40, '2020-10-21 20:04:50', '5918127', 246, 'PENDING'),
(41, '2020-10-21 20:04:54', '5918127', 247, 'PENDING'),
(42, '2020-10-21 20:05:02', '5918127', 249, 'PENDING'),
(43, '2020-10-21 20:05:10', '5918127', 248, 'PENDING'),
(44, '2020-10-21 20:05:18', '5918127', 251, 'PENDING'),
(45, '2020-10-21 20:05:27', '5918127', 252, 'PENDING'),
(46, '2020-10-21 20:05:33', '5918127', 253, 'PENDING'),
(47, '2020-10-21 20:10:19', '5918127', 254, 'ACCEPTED'),
(48, '2020-10-21 20:11:45', '5738009', 254, 'REJECTED');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `post_creator` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `post_type` varchar(20) COLLATE utf8_bin NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `item_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `item_description` varchar(500) COLLATE utf8_bin NOT NULL,
  `item_image` varchar(255) COLLATE utf8_bin NOT NULL,
  `item_type` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `found_date` datetime DEFAULT NULL,
  `found_location` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `item_status` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `finder_first_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `finder_last_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `finder_phone` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `finder_email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `finder_address` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `owner_id` int(255) DEFAULT NULL,
  `finder_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `post_creator`, `post_type`, `post_date`, `item_name`, `item_description`, `item_image`, `item_type`, `found_date`, `found_location`, `item_status`, `finder_first_name`, `finder_last_name`, `finder_phone`, `finder_email`, `finder_address`, `owner_id`, `finder_id`) VALUES
(244, '5738029', 'LOST', '2020-10-21 12:31:46', 'Iphone', 'Black iphone lost in October 10.', '1603283506117phone.jpg', NULL, NULL, 'SM building', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(245, '5738029', 'LOST', '2020-10-21 12:33:43', 'Wallet', 'Brown wallet lost 2 days ago.', '1603283623152brown.jpeg', NULL, NULL, 'VMS building fountain.', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(246, '5738029', 'LOST', '2020-10-21 12:34:46', 'Ipad Pro', 'Grey ipad pro', '1603283686030index.jpg', NULL, NULL, 'SR Building 3rd floor', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(247, '5738029', 'LOST', '2020-10-21 12:35:42', 'Purse', 'Black purse Mont Blanc brand', '1603283742602black.jpg', NULL, NULL, 'VMS building second floor.', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(248, '5738029', 'LOST', '2020-10-21 12:36:56', 'Calculator', 'Silver Calculator lost in October 5.', '1603283816571digital-calculator-500x500.png', NULL, NULL, 'SR building 4th floor.', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(249, '5738029', 'FOUND', '2020-10-21 12:38:02', 'Key', 'Silver key lost while eating lunch.', '1603283882057panel-keys-500x500.png', NULL, NULL, 'Cafeteria AU Mall.', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(251, '5738029', 'FOUND', '2020-10-21 12:40:34', 'Samsung Phone', 'White samsung phone', '16032840349692020630_105293.jpg', NULL, NULL, '7-11 au mall', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(252, '5738029', 'FOUND', '2020-10-21 12:41:42', 'Samsung Tab', 'Black samsung tab lost in October 2.', '16032841028111.jpg', NULL, NULL, 'VMS', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(253, '5738029', 'FOUND', '2020-10-21 12:42:03', 'Oneplus', 'Black oneplus 6t', '1603284123648global-rom-oneplus-6t-6-41-inch-6gb-128gb-smartphone-mirror-black-1571982420392._w500_.jpg', NULL, NULL, 'SM building', 'INCOMPLETE', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(254, '5738029', 'FOUND', '2020-10-21 12:42:26', 'Coach Bag', 'Brown Coach Bag', '16032841463361fdabc783d3963fd014b6376d134d4fe.jpg', NULL, NULL, 'Cafeteria', 'COMPLETED', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `message_text` varchar(255) COLLATE utf8_bin NOT NULL,
  `message_sender` varchar(20) COLLATE utf8_bin NOT NULL,
  `date` datetime DEFAULT NULL,
  `read_status` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `student_id`, `item_id`, `message_text`, `message_sender`, `date`, `read_status`) VALUES
(48, 5918127, 244, 'I found this item.', 'STUDENT', '2020-10-21 20:04:41', 'UNREAD'),
(49, 5918127, 245, 'I found this item.', 'STUDENT', '2020-10-21 20:04:45', 'UNREAD'),
(50, 5918127, 246, 'I found this item.', 'STUDENT', '2020-10-21 20:04:50', 'UNREAD'),
(51, 5918127, 247, 'I found this item.', 'STUDENT', '2020-10-21 20:04:54', 'UNREAD'),
(52, 5918127, 249, 'I want to claim this item.', 'STUDENT', '2020-10-21 20:05:02', 'UNREAD'),
(53, 5918127, 248, 'I found this item.', 'STUDENT', '2020-10-21 20:05:10', 'UNREAD'),
(54, 5918127, 251, 'I want to claim this item.', 'STUDENT', '2020-10-21 20:05:18', 'UNREAD'),
(55, 5918127, 252, 'I want to claim this item.', 'STUDENT', '2020-10-21 20:05:27', 'UNREAD'),
(56, 5918127, 253, 'I want to claim this item.', 'STUDENT', '2020-10-21 20:05:33', 'UNREAD'),
(57, 5918127, 254, 'I want to claim this item.', 'STUDENT', '2020-10-21 20:10:19', 'UNREAD'),
(58, 5738009, 254, 'I want to claim this item.', 'STUDENT', '2020-10-21 20:11:45', 'UNREAD');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `first_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `phone` varchar(15) COLLATE utf8_bin NOT NULL,
  `user_type` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `password`, `first_name`, `last_name`, `email`, `phone`, `user_type`) VALUES
('5738009', '3333', 'Raghunand', 'Chodury', 'raghs@gmail.com', '1234567890', 'STUDENT'),
('5738029', '2222', 'Sakar', 'K. C', 'sakar@gmail.com', '9876543210', 'STUDENT'),
('5918127', '1111', 'Sujan', 'Gurung', 'sujangurung@gmail.com', '0987654321', 'STUDENT'),
('admin', 'admin', 'Admin', 'Kancha', 'admin@gmail.com', '5432109876', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `claims`
--
ALTER TABLE `claims`
  ADD PRIMARY KEY (`claims_id`),
  ADD KEY `claims_ibfk_1` (`item_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `message_ibfk_1` (`item_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `claims`
--
ALTER TABLE `claims`
  MODIFY `claims_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=255;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `claims`
--
ALTER TABLE `claims`
  ADD CONSTRAINT `claims_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
