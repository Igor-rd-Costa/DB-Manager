<?php
if (isset($_POST["ColumnName"])) { // Returns data about a column
    include_once("../Functions.php");
    include_once("../Classes/User.php");
    session_start();
    $User = $_SESSION["User"];
    header('Content-Type: application/json');
    print json_encode($User->Tables[$_SESSION["DisplayedTable"]]->Columns[$_POST["ColumnName"]]);
}
else header('location: ../../pages/main.php');
?>