-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2021 at 02:25 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scrape_image`
--

-- --------------------------------------------------------

--
-- Table structure for table `images_url`
--

CREATE TABLE `images_url` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images_url`
--

INSERT INTO `images_url` (`id`, `url`) VALUES
(1, 'https://s.alicdn.com/@img/tfs/TB1IxWhvYY1gK0jSZTEXXXDQVXa-24-24.svg'),
(2, 'https://s.alicdn.com/@img/imgextra/i1/O1CN01HoFsMA1OzS6lS77rY_!!6000000001776-0-tps-990-400.jpg_300x300q60.jpg'),
(3, 'https://sc02.alicdn.com/kf/HTB12RuNUmzqK1RjSZFH7623CpXa6.png_50x50xz.jpg'),
(4, 'https://sc02.alicdn.com/kf/HTB1gUuPUkzoK1RjSZFl761i4VXaw.png_50x50xz.jpg'),
(5, 'https://sc02.alicdn.com/kf/HTB1JdWLUhTpK1RjSZR0762EwXXa6.png_50x50xz.jpg'),
(6, 'https://sc02.alicdn.com/kf/HTB1AkuTUgHqK1RjSZJn762NLpXa2.png_50x50xz.jpg'),
(7, 'https://sc02.alicdn.com/kf/H5e92ef24edc94162b72c331cbd6fbe6fn.png_50x50xz.jpg'),
(8, 'https://sc02.alicdn.com/kf/HTB1RxCkXHys3KVjSZFn760FzpXaP.png_50x50xz.jpg'),
(9, 'https://sc02.alicdn.com/kf/HTB1K6G0UcfpK1RjSZFO7616nFXah.png_50x50xz.jpg'),
(10, 'https://img.alicdn.com/tfs/TB1SFxHuVY7gK0jSZKzXXaikpXa-36-36.png'),
(11, 'https://img.alicdn.com/tfs/TB1QhYprKT2gK0jSZFvXXXnFXXa-20-20.png'),
(12, 'https://img.alicdn.com/tfs/TB1VtZtebH1gK0jSZFwXXc7aXXa-65-70.gif');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Borhan', 'borhan@gmail.com', '12345678'),
(2, 'Rakib', 'rakib@gmail.com', '12345678'),
(3, 'Test', 'test@gmail.com', '12345678'),
(4, 'Test', 'test@gmail.com', '12345678'),
(5, 'test1', 'test1@gmail.com', '12345678'),
(6, 'test', 'test3@gmail.com', '12345678'),
(7, 'test5', 'test5@gmail.com', '12345678'),
(8, 'rakib1', 'rakib1@gmail.com', 'ra12323'),
(9, 'Sagor Mia', 'sagor@gmail.com', '12345678'),
(10, 'Tst123', 'test123@gmail.com', '12345678'),
(11, 'rakib@gmail.com', 'rakib@gmail.com', 'vjnfjvnfnvkjfnvj');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images_url`
--
ALTER TABLE `images_url`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images_url`
--
ALTER TABLE `images_url`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
