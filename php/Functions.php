<?php
function SQL_Connect($server, $user, $password, $table)
{
    $connection = mysqli_connect($server, $user, $password, $table);
    if(!$connection) 
        {
            die("CONNECTION FAILED");
        }
    else return $connection;
}

?>