<?php
include_once("../Functions.php");
include_once("../Classes/User.php");
session_start();

if (isset($_POST["NewName"], $_SESSION["DisplayedTable"])) {
    $User = $_SESSION["User"];
    $User->Connect();
    if (isset($User->Tables[$_POST["NewName"]])) {
        print "A table with this name already exists.";
        return;
    }
    $Table = $User->Tables[$_SESSION["DisplayedTable"]];
    try {
        SQL_Query($User->Connection, "RENAME TABLE $Table->TableName TO $_POST[NewName]");
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
        return;
    }
    $_SESSION["DisplayedTable"] = $_POST["NewName"];
    $User->FetchTables();
}
else header('location: ../../pages/main.php');
?>