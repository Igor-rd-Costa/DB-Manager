<?php
include_once("../Functions.php");
include_once("../Classes/User.php");
session_start();
$User = $_SESSION["User"];
if (isset($_POST["ColumnName"])) { // Returns data about a column
    header('Content-Type: application/json');

    if (isset($User->Tables[$_SESSION["DisplayedTable"]]->Columns[$_POST["ColumnName"]])) {
        print json_encode($User->Tables[$_SESSION["DisplayedTable"]]->Columns[$_POST["ColumnName"]]);
    }
    return;
}
else header('location: ../../pages/main.php');
?>