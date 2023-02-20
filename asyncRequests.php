<?php
include "php/Functions.php";
$request = $_REQUEST['request'];

$dom = new DOMDocument('1.0', 'utf-8');
$dom->load("http://localhost/BancodeDados//xml/forms.xml");
switch($request)
{
    case 'Login':
        $element = $dom->getElementsByTagName("LOGIN")[0]->childNodes->item(1);
        echo $dom->saveXML($element);
    break;
    case "Register":
        $element = $dom->getElementsByTagName("REGISTER")[0]->childNodes->item(1);
        echo $dom->saveXML($element);
    break;
    case 'CreateDB':
        $element = $dom->getElementsByTagName("CREATEDATABASE")[0]->childNodes->item(1);
        echo $dom->saveXML($element);
    break;
    case 'LoginRequest':
        include "php/Classes/User.php";
        $User = new User($_POST["usernameLogin"], $_POST["passwordLogin"], $_POST["passwordLogin"]);
        if($User->LoginStatus)
        {

        }
        else
        {
            echo $User->LoginError;
        }
    break;
    case 'RegisterRequest':
        include "php/Classes/RegisterRequest.php";
        include "php/Classes/User.php";
        $REG_Request = new RegisterRequest($_POST["REG_FirstName"], $_POST["REG_LastName"], $_POST["REG_Email"], $_POST["REG_Username"], $_POST["REG_Password"]);
        if($REG_Request->RegisterStatus)
        {
           $User = new User($_POST["REG_Username"], $_POST["REG_Password"], $_POST["REG_Password"]);
        }
        else
        {
            echo $REG_Request->RegisterError;
        }
    break;
        
}



