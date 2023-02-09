<?php
function SQL_Connect($table = null)
{
    include "./config.php";
    $connection = mysqli_connect($Server_Hostname, $Server_User, $Server_Password, $table);
    if(!$connection) 
        {
            die("CONNECTION FAILED");
        }
    else return $connection;
}

?>