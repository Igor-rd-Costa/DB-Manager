<?php
function SQL_Connect($Server, $User, $Password,  $table = null)
{
    $connection = mysqli_connect($Server, $User , $Password , $table);
    if(!$connection) 
        {
            die("CONNECTION FAILED");
        }
    else return $connection;
}

function SQL_Query($Connection, string $Query, array $Params = null, string $ParamTypes = "") {
        $qry = $Connection->Prepare($Query);
        if ($Params != null) {
            for ($x = 0; $x < sizeof($Params); $x++) {
                $qry->bind_param($ParamTypes[$x], $Params[$x]);
            }
        }
        $qry->execute();
        return $qry->get_result();
}

function STR_FirstToUpper($String)
{
    $String[0] = strtoupper($String[0]);
    return $String;
}
?>