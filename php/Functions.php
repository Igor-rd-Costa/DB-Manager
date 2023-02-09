<?php
function SQL_Connect($table = null)
{
<<<<<<< Updated upstream
    include "./config.php";
=======
    $Server_Hostname = 'localhost';
    $Server_User = 'root';
    $Server_Password = '';
>>>>>>> Stashed changes
    $connection = mysqli_connect($Server_Hostname, $Server_User, $Server_Password, $table);
    if(!$connection) 
        {
            die("CONNECTION FAILED");
        }
    else return $connection;
}

?>