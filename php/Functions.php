<?php
function SQL_Connect(string $Server, string $User, string $Password,  ?string $Database = null) {
    $Connection = mysqli_connect($Server, $User , $Password , $Database);
    if(!$Connection) {
        die("CONNECTION FAILED");
    }
    else return $Connection;
}

function SQL_Query(mysqli $Connection, string $Query, string $ParamTypes = "", ...$Params) {
        $qry = $Connection->Prepare($Query);
        if ($Params != null) {
            $qry->bind_param($ParamTypes, ...$Params);
        }
        $qry->execute();
        return $qry->get_result();
}

function STR_FirstToUpper(string $String) {
    $String[0] = strtoupper($String[0]);
    return $String;
}

function UnsetCachedVariables() {
    unset($_SESSION["DisplayedTable"], $_SESSION["AlterColumn"], $_SESSION["InsertColumn"], $_SESSION['CreateTableName']);
}
?>