<?php
function SQL_Connect(string $Server, string $User, string $Password,  ?string $Database = null) {
    $Connection = mysqli_connect($Server, $User , $Password , $Database);
    if(!$Connection) {
        die("CONNECTION FAILED");
    }
    else return $Connection;
}

function SQL_Query(mysqli $Connection, string $Query, array $Params = null, string $ParamTypes = "") {
        $qry = $Connection->Prepare($Query);
        if ($Params != null) {
            for ($x = 0; $x < sizeof($Params); $x++) {
                $qry->bind_param($ParamTypes[$x], $Params[$x]);
            }
        }
        $qry->execute();
        return $qry->get_result();
}

function STR_FirstToUpper(string $String) {
    $String[0] = strtoupper($String[0]);
    return $String;
}
?>