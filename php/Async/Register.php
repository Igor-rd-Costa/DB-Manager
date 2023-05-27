<?php
if(isset($_POST["REG_FirstName"], $_POST["REG_LastName"], $_POST["REG_Email"], $_POST["REG_Username"], $_POST["REG_Password"])) {    
    include_once "../Functions.php";
    include_once "../Classes/RegisterRequest.php";
    include_once "../Classes/User.php";
    $REG_Request = new RegisterRequest($_POST["REG_FirstName"], $_POST["REG_LastName"], $_POST["REG_Email"], $_POST["REG_Username"], $_POST["REG_Password"]);
    if($REG_Request->RegisterStatus) {
        $User = new User($_POST["REG_Username"], $_POST["REG_Password"]);
    }
    else {
        print $REG_Request->RegisterError;
    }
}
else header('location: http://localhost/BancodeDados/');
    ?>