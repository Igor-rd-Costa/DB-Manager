<?php
include_once "../Functions.php";
include_once "../Classes/User.php";

session_start();
if(isset($_SESSION["DisplayedTable"]) || isset($_POST["TableName"])) {
    $User = $_SESSION["User"];
    $User->Connect();

    $TableName = "";
    if($_POST["TableName"] != "") {
        $TableName = $_POST["TableName"];
    }
    else {
        $TableName = $_SESSION["DisplayedTable"];
    }

    try {
        SQL_Query($User->Connection, "DROP TABLE `$TableName`;");
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
    }
    $User->FetchTables();
}
else header('location: ../../pages/main.php');