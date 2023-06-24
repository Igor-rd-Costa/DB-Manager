<?php
include_once "php/Functions.php";
class CONFIG {
    static public string $ServerHostname = 'localhost';
    static public string $ServerUser = 'root';
    static public string $ServerPassword = '';
    static public string $AdminUsername = "Admin";
    static public string $AdminPassword = "Admin123@";
    static public string $AdminDatabaseName = "db_manager_admin";
    
    static public function Init() {
        $ServerHostname = CONFIG::$ServerHostname;
        $ServerUser = CONFIG::$ServerUser;
        $ServerPassword = CONFIG::$ServerPassword;
        $AdminUsername = CONFIG::$AdminUsername;
        $AdminPassword = CONFIG::$AdminPassword;
        $AdminDatabaseName = CONFIG::$AdminDatabaseName;
        
        $Connection = SQL_Connect($ServerHostname, $ServerUser, $ServerPassword);
        $CryptedPassword = password_hash($AdminPassword, null); 

        try {
            SQL_Query($Connection, "CREATE USER '$AdminUsername'@'$ServerHostname' IDENTIFIED BY '$AdminPassword';");
            SQL_Query($Connection, "CREATE DATABASE IF NOT EXISTS `$AdminDatabaseName` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;");
            SQL_Query($Connection, "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP ON $AdminDatabaseName.* to '$AdminUsername'@'$ServerHostname';");
            SQL_Query($Connection, "CREATE TABLE `$AdminDatabaseName`.`users` (`UserID` INT(9) NOT NULL AUTO_INCREMENT, `FirstName` VARCHAR(50) NOT NULL, `LastName` VARCHAR(100) NOT NULL, `Email` VARCHAR(100) NOT NULL, `Username` VARCHAR(50) NOT NULL, `Password` VARCHAR(100) NOT NULL, PRIMARY KEY (`UserID`), UNIQUE `UsernameUN` (`Username`), UNIQUE `EmailUN` (`Email`)) ENGINE = InnoDB;");
            SQL_Query($Connection, "INSERT INTO `$AdminDatabaseName`.`users` (`UserID`, `FirstName`, `LastName`, `Email`, `Username`, `Password`) VALUES (1, '$AdminUsername', '$AdminUsername', '$AdminUsername@gmail.com', '$AdminUsername', '$CryptedPassword');");
        }
        catch (mysqli_sql_exception $e) {
            print $e->getMessage();
        }
    }
}
?>
