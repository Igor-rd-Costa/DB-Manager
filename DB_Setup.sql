CREATE USER 'Admin'@'localhost' IDENTIFIED BY 'Admin123@';

CREATE DATABASE IF NOT EXISTS `Admin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
GRANT SELECT, INSERT, UPDATE, DELETE ON Admin.* to Admin@'localhost';



USE `Admin`;
CREATE TABLE `users` (
  `UserID` int(9) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`UserID`, `FirstName`, `LastName`, `Email`, `Username`, `Password`) VALUES
(1, 'Admin', 'Admin', 'Admin@gmail.com', 'Admin', '$2y$10$8e25bd7b1acb610e65814eR5IGNiBi/gBvmEbXO/0dOGUrWoXadEm@$2y$10$8e25bd7b1acb610e65814f8f2183a214');

ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email_UN` (`Email`),
  ADD UNIQUE KEY `Username_UN` (`Username`);
COMMIT;