<?php
if(isset($_POST["usernameLogin"], $_POST["passwordLogin"])) {
    include_once "../Classes/User.php";
    include_once "../Functions.php";
    $User = new User($_POST["usernameLogin"], $_POST["passwordLogin"]);
    if(!$User->LoginStatus)
    {
        print $User->LoginError;
    }
}
else {
    header('Location: http://localhost/BancodeDados/');
}
?>