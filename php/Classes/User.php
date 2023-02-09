<?php
class User 
{
    public $Username;
    public $Email;
    protected $Password;
    
    function __construct(array $Info) 
    {
<<<<<<< Updated upstream
        $connection = SQL_Connect('db_users');
=======
        $connection = SQL_Connect('users');
>>>>>>> Stashed changes
        $query = "SELECT * from users";
        $result = mysqli_query($connection, $query);

        while($row = mysqli_fetch_assoc($result))
        {
            $typedpassword = $Info['passwordLogin'];
            $password = preg_split('/@/', $row['Password']);
            $typedpassword = crypt($typedpassword, $password[1]);
            if( $row['Username'] === $Info['usernameLogin'] && $typedpassword === $password[0])
            {
                    $this->Username = $row["Username"];
                    $this->Email = $row["Email"];
                    $this->Password = $row["Password"];
                    header("Location: http://localhost/BancodeDados/pages/main.php");
            }
            else echo "USERNAME OR PASSWORD ARE WRONG!";
        } 
        
    }
}