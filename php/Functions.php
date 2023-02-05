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
    
    $result = mysqli_query($connection, $query);
    return $result;
}

function USER_Login()
{
    if(isset($_POST['usernameLogin'], $_POST['passwordLogin']))
    {
        $connection = SQL_Connect('localhost', 'root', '', 'users');
        $query = "SELECT * from users";
        $result = mysqli_query($connection, $query);

        while($row = mysqli_fetch_assoc($result))
        {
            if( $row['Username'] === $_POST['usernameLogin'] && $row['Password'] === $_POST['passwordLogin'])
            {
                include "Classes/User.php";
                session_start();
                $User = new User($row['Username']);
                $_SESSION['User'] = $User;
                header('Location: http://localhost/BancodeDados/pages/main.php');
                exit;
            } 
        }
    
    }
}

function USER_Register(array $RegisterData)
{
    include "Classes/RegisterRequest.php";
    $RegisterRequest = new RegisterRequest($RegisterData);

    return $RegisterRequest;
}

?>