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

?>