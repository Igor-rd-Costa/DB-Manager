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
    
        $User = new User($_POST);
        
        if($User->LoginStatus)
        {
            session_start();
            $_SESSION["User"] = $User;
            echo true;
        }
        else
        {
            echo false;
        }
     break;
        
}



