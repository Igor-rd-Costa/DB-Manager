<?php
class User 
{
    public $Username;
    public $Email;
    protected $Password;
    
    function __construct(array $Info) 
    {
        $connection = SQL_Connect('localhost', 'root', '', 'DB_Users');
        $query = "SELECT * from users";
        $result = mysqli_query($connection, $query);

        while($row = mysqli_fetch_assoc($result))
        {
            if( $row['Username'] === $Info['usernameLogin'])
            {
                $typedpassword = $Info['passwordLogin'];
                $password = preg_split('/@/', $row['Password']);
                $typedpassword = crypt($typedpassword, $password[1]);

                if($typedpassword === $password[0])
                {
                    $this->Username = $row["Username"];
                    $this->Email = $row["Email"];
                    $this->Password = $row["Password"];
                    header("Location: http://localhost/BancodeDados/pages/main.php");
                    //exit;
                }
                else echo "WRONG PASSWORD";
            } 
        }
    }
}