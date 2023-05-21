-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2023 at 03:13 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cse`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `complaint_id` int(11) NOT NULL,
  `complaint_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `complaint_content` varchar(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`complaint_id`, `complaint_date`, `complaint_content`, `user_id`) VALUES
(1, '2023-04-20 15:42:02', '00 dd', 1),
(2, '2023-04-20 15:42:02', 'hello', 3),
(3, '2023-04-20 15:42:02', 'GG', 3);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(30) NOT NULL,
  `course_description` varchar(255) DEFAULT NULL,
  `course_type` int(11) NOT NULL CHECK (`course_type` in (1,2,3,4,5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `course_description`, `course_type`) VALUES
(2, 'c++', 'برمجة الحاسوب', 2),
(3, 'Digital Signals Processing', 'معالجة الإشارات الرقمية', 2),
(7, 'Data Structures', 'تركيب بيانات', 1),
(8, 'Discrete Mathematics', 'تراكيب الحوسبة المتقطعة - ديسكريت', 1),
(9, 'Algorithms Analysis & Design', 'تحليل وتصميم الخوارزميات', 1),
(10, 'General Circuits', 'الدوائر الكهربائية - سيركتس', 1),
(11, 'Digital ', 'تصميم الدوائر المنطقية - ديجتال', 1),
(12, 'General Electronics  ', 'إلكترونيات عامة', 1),
(61, 'softwareeeee ', 'هندسة برمجيات', 2),
(62, 'Java', 'كينونيه برمجيات', 2);

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `course_id` int(11) NOT NULL,
  `user_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`course_id`, `user_Id`) VALUES
(2, 36),
(2, 39),
(3, 36),
(3, 39),
(7, 36),
(7, 39),
(9, 39);

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `material_id` int(11) NOT NULL,
  `material_name` varchar(255) NOT NULL,
  `material_description` varchar(255) DEFAULT NULL,
  `material_status` int(11) NOT NULL DEFAULT 0,
  `category` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `addition_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`material_id`, `material_name`, `material_description`, `material_status`, `category`, `path`, `course_id`, `submission_id`, `addition_date`) VALUES
(214, 'اسايمنت-سي-اس.docx', 'exam year:undefined , semesterName:undefined , dr-Name :undefined ,studentName: undefined', 1, 0, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/Digital Signals Processing/exam/mid/اسايمنت-سي-اس.docx', 3, 260, '2023-05-17 19:43:33'),
(215, 'Assignment Spring 2023 updated.pdf', 'exam year:2023-2024 , semesterName:Fall , dr-Name : ,studentName: ', 0, 0, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/Digital Signals Processing/exam/first/Assignment Spring 2023 updated.pdf', 3, 261, '2023-05-17 19:43:33'),
(216, 'Assignment_Network_#1.docx', 'exam year:2023-2024 , semesterName:Fall , dr-Name : ,studentName: ', 0, 0, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/Digital Signals Processing/exam/first/Assignment_Network_#1.docx', 3, 261, '2023-05-17 19:43:33'),
(217, 'Assignment_Network_#1.pdf', 'exam year:2023-2024 , semesterName:Fall , dr-Name : ,studentName: ', 0, 0, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/Digital Signals Processing/exam/first/Assignment_Network_#1.pdf', 3, 261, '2023-05-17 19:43:33'),
(218, 'e1.mp4', 'exam year:2023-2024 , semesterName:Fall , dr-Name : ,studentName: ', 0, 1, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/Digital Signals Processing/lecture/e1.mp4', 3, 262, '2023-05-17 19:43:33'),
(219, 'اسايمنت-سي-اس_1.docx', 'exam year:undefined , semesterName:undefined , dr-Name :undefined ,studentName: undefined', 0, 0, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/Digital Signals Processing/exam/mid/اسايمنت-سي-اس_1.docx', 3, 263, '2023-05-17 19:51:51'),
(220, 'Advance DB projects.pdf', 'exam year:2023-2024 , semesterName: , dr-Name :sam ,studentName: me', 0, 2, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/softwareeeee /summary/Advance DB projects.pdf', 61, 265, '2023-05-18 07:46:42'),
(221, 'e1.mp4', 'exam year: , semesterName: , dr-Name : ,studentName: ', 0, 1, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/softwareeeee /lecture/e1.mp4', 61, 266, '2023-05-18 07:48:31'),
(222, 'e1_1.mp4', 'exam year: , semesterName: , dr-Name : ,studentName: ', 0, 1, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/softwareeeee /lecture/e1_1.mp4', 61, 267, '2023-05-18 07:50:42'),
(223, 'MohammadJaberHW2_fbb004905bdafffeba0e4748b560359c.pdf', 'exam year:2021-2022 , semesterName:Fall , dr-Name : ,studentName: ', 0, 0, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/Digital Signals Processing/exam/first/MohammadJaberHW2_fbb004905bdafffeba0e4748b560359c.pdf', 3, 268, '2023-05-18 07:51:06'),
(224, 'Assignment Spring 2023 updated.pdf', 'exam year: , semesterName: , dr-Name : ,studentName: ', 0, 2, 'C:/Users/Mohad/OneDrive/Documents/GG-Project/Back End/uploads/courses/Digital Signals Processing/summary/Assignment Spring 2023 updated.pdf', 3, 269, '2023-05-18 08:38:48');

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

CREATE TABLE `submission` (
  `submission_id` int(11) NOT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `submission_status` int(11) NOT NULL DEFAULT 0,
  `submission_description` varchar(100) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submission`
--

INSERT INTO `submission` (`submission_id`, `submission_date`, `submission_status`, `submission_description`, `User_id`) VALUES
(260, '2023-05-17 19:31:05', 2, '8', 36),
(261, '2023-05-17 19:44:05', 0, '', 39),
(262, '2023-05-17 19:41:48', 1, '', 39),
(263, '2023-05-17 19:51:51', 1, '8', 39),
(264, '2023-05-17 20:44:37', 1, '', 39),
(265, '2023-05-18 07:46:42', 1, 'hi', 39),
(266, '2023-05-18 07:48:31', 1, 'hhhh', 39),
(267, '2023-05-18 07:50:42', 1, 'hhhh', 39),
(268, '2023-05-18 07:51:06', 1, 'hi', 39),
(269, '2023-05-18 08:38:48', 1, '', 39);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `User_ID` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL CHECK (`email` like '%_@%.%'),
  `password` varchar(255) NOT NULL,
  `user_type` int(11) NOT NULL DEFAULT 0,
  `Confirmation_status` tinyint(1) NOT NULL DEFAULT 0,
  `code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`User_ID`, `user_name`, `email`, `password`, `user_type`, `Confirmation_status`, `code`) VALUES
(1, 'nedal', 'test@example.com', '$2b$08$29my6oFqqrTbwbZF6J9vUeI/Ip0Q56ysL8SOmzBRvEAiLQpqS/I86 where User_ID= 27 ', 1, 0, ''),
(2, 'mohammad', 'mohammad@example.com', '$2b$08$29my6oFqqrTbwbZF6J9vUeI/Ip0Q56ysL8SOmzBRvEAiLQpqS/I86 where User_ID= 27 ', 1, 0, ''),
(3, 'yousef', 'yousef@example.com', '$2b$08$29my6oFqqrTbwbZF6J9vUeI/Ip0Q56ysL8SOmzBRvEAiLQpqS/I86 where User_ID= 27 ', 1, 0, ''),
(5, 'adasd', 'asdsd@gmail.com', '$2b$08$29my6oFqqrTbwbZF6J9vUeI/Ip0Q56ysL8SOmzBRvEAiLQpqS/I86 where User_ID= 27 ', 1, 0, ''),
(6, 'undefined', 'ali@example.com', '$2b$08$29my6oFqqrTbwbZF6J9vUeI/Ip0Q56ysL8SOmzBRvEAiLQpqS/I86 where User_ID= 27 ', 1, 0, ''),
(36, 'Moahmmad Jaber', 'mohad.jaber222@gmail.com', '$2b$08$AHmISn2UfbDYh81r/knxIep0DwEfGC5hMynq51Gznl1kyKh5vzOB.', 1, 1, 'HuAS_5P2nHnC9WUDA4NDY'),
(39, 'Moahmmad Jaber', 'mohammad_jaber2015@hotmail.com', '$2b$08$83MvDmIr/Wgh0L51fYOmBuSZoa9FR3NvvY.pGES4ZKpd2J8D6C7JC', 0, 1, '7xz_QP8nQjj6GreBcw5ns'),
(40, 'yousef', 'mohamd.h.jaber@gmail.com', '$2b$05$3O89leRbw7bpL04wKpP8kuGrCmw6HfC35lCe3kf6TQIF8Uz1OIfbC', 0, 0, 'bxBEmjh0GojseB1R4jgz_');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`complaint_id`),
  ADD KEY `complaint_user_fk` (`user_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_name` (`course_name`);

--
-- Indexes for table `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`course_id`,`user_Id`),
  ADD KEY `list_user_fk` (`user_Id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `material_user_fk` (`course_id`),
  ADD KEY `material_submission_fk` (`submission_id`),
  ADD KEY `path` (`path`) USING BTREE;

--
-- Indexes for table `submission`
--
ALTER TABLE `submission`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `submission_user_fk` (`User_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `complaint_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;

--
-- AUTO_INCREMENT for table `submission`
--
ALTER TABLE `submission`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=270;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaint`
--
ALTER TABLE `complaint`
  ADD CONSTRAINT `complaint_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `list_course_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `list_user_fk` FOREIGN KEY (`user_Id`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `material_submission_fk` FOREIGN KEY (`submission_id`) REFERENCES `submission` (`submission_id`),
  ADD CONSTRAINT `material_user_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

--
-- Constraints for table `submission`
--
ALTER TABLE `submission`
  ADD CONSTRAINT `submission_user_fk` FOREIGN KEY (`User_id`) REFERENCES `users` (`User_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
