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

function SQL_Fetch($FetchedDatabase, $FetchQuery)
{
    $connection = SQL_Connect('localhost', 'root', '', $FetchedDatabase);
    $query = $FetchQuery;
    
    return $result = mysqli_query($connection, $query);

}

function USER_Login()
{
    if(isset($_POST['username'], $_POST['password']))
    {
        $connection = SQL_Connect('localhost', 'root', '', 'users');
        $query = "SELECT * from users";
        $result = mysqli_query($connection, $query);

        while($row = mysqli_fetch_assoc($result))
        {
            if( $row['Username'] === $_POST['username'] && $row['Password'] === $_POST['password'])
            {
                include "Classes/User.php";
                session_start();
                $_SESSION['login'] = true;
                $User = new User($row['Username']);
                $_SESSION['user'] = $User;
                header('Location: http://localhost/BancodeDados/pages/main.php');
                exit;
            } 
        }
    
    }
}

?>