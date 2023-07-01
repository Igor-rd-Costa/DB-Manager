<?php
include_once "../Functions.php";
include_once "../Classes/User.php";
session_start();

$jsonData = file_get_contents("php://input");
$jsonData = json_decode($jsonData, true);
if($jsonData && isset($_SESSION["DisplayedTable"])) {
    $User = $_SESSION["User"];
    $User->Connect();
    $Table = $User->Tables[$_SESSION["DisplayedTable"]];
    if($Table->PrimaryKey) {
        

        $index = 0;
        foreach ($Table->ColumnNames as $ColumnName) {
            $Data[$ColumnName] = $jsonData[$index];
            $index++; 
        }

        $Query = "DELETE FROM `$Table->TableName` WHERE";

        $data = $Data[$Table->PrimaryKey];
        $Query .= " `$Table->PrimaryKey` = ";
        switch ($Table->Columns[$Table->PrimaryKey]->DataType) {
            case "int": { $Query .= "$data";
            } break;
            case "varchar" : { $Query .= "'$data'";
            } break;
        }
        $Query .= ";";
        try {
            SQL_Query($User->Connection, $Query);
        }
        catch (mysqli_sql_exception $e) {
            print $e->getMessage();
        }
        $User->FetchTables();
    }
}
else header("location: ../../pages/main.php");
?>