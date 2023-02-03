<?php
$request = $_REQUEST['request'];

$dom = new DOMDocument('1.0', 'utf-8');
$dom->load("./xml/forms.xml");
switch($request)
{
    case 'Login':
        $element = $dom->getElementsByTagName("LOGIN")[0]->childNodes->item(1);
        echo $dom->saveXML($element);
        
    break;
    case 'CreateDB':
        $element = $dom->getElementsByTagName("CREATEDATABASE")[0]->childNodes->item(1);
        echo $dom->saveXML($element);
    break;
}



