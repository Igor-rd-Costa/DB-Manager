<?php
include_once "../php/Functions.php";
include_once "../php/Classes/User.php";

session_start();
$User = $_SESSION["User"];
$User->Connect();
$User->FetchTables();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="http://localhost/BancodeDados/css/Main.css"/>
    <link rel="stylesheet" href="http://localhost/BancodeDados/css/Forms.css"/>
    <link rel="stylesheet" href="http://localhost/BancodeDados/css/NewEntryForm.css"/>
    <script src="http://localhost/BancodeDados/scripts/functions.js"></script>
    <script src="http://localhost/BancodeDados/scripts/script.js"></script>
    <script src="http://localhost/BancodeDados/scripts/FormsScript.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .testPage {
            grid-template-columns: 1fr;
            grid-template-rows: 2rem auto;
            row-gap: 1rem;
        }
        #test-wrapper {
            background-color: var(--DefaultColor);
            border-bottom-left-radius: 0.625rem;
            border-bottom-right-radius: 0.625rem;
        }
    </style>
</head>
<body>
<header id="header">
</header>
<section id="side-menu">
</section>
<main id="tablewrapper" class="testPage">
<div id='default-menu'>
    <div id='back-icon' backto='main'>
        <img class='back-arrow' src='http://localhost/BancodeDados/img/Arrow.png'></img>
    </div>
    <div id='title'> 
        Add Entry
    </div>
</div>
<div id='test-wrapper'>
</div>
</main>
</body>
</html>
