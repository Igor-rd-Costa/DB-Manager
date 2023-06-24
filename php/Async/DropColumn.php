<?php
if(isset($_POST["ColumnName"])) {
    include_once "../Functions.php";
    include_once "../Classes/User.php";
    session_start();

    $User = $_SESSION["User"];
    $User->Connect();

    if($User->Tables[$_SESSION["DisplayedTable"]]->Columns[$_POST["ColumnName"]]) {
        try {
            SQL_Query($User->Connection, "ALTER TABLE $_SESSION[DisplayedTable] DROP COLUMN $_POST[ColumnName]");
        }
        catch (mysqli_sql_exception $e) {
            print $e->getMessage();
        }
        $User->FetchTables();
    }
    else {
        print "Column not found!";
    }

}
else header('location: ../../pages/main.php');



?>