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
    <link rel="stylesheet" href="http://localhost/BancodeDados/css/TableDisplay.css"/>
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
    <script>
        
        document.addEventListener('DOMContentLoaded', () => {
            const Main = document.getElementById("tablewrapper");
            
        })
    </script>
</head>
<body>
<header id="header">
</header>
<section id="side-menu">
</section>
<main id="tablewrapper" class="displayTable">
<!-- <div id='default-menu'>
    <div id='back-icon' backto='main'>
        <img class='back-arrow' src='http://localhost/BancodeDados/img/Arrow.png'></img>
    </div>
    <div id='title'> 
        Add Entry
    </div>
</div>
<div id='test-wrapper'>
</div> -->
<?php
/* $Table = $User->Tables["ztest"];
print
    "<div id='table-display-wrapper'>
    <div id='default-menu'>
            <div id='back-icon' backto='main'>
                <img class='back-arrow' src='http://localhost/BancodeDados/img/Arrow.png'></img>
            </div>
            <div id='title'>
                $Table->TableName 
            </div>
            <div id='tbl-options'>
                <div class='circle' id='circle1'></div>
                <div class='circle' id='circle2'></div>
                <div class='circle' id='circle3'></div>
            </div>
            <ul id='tbl-option-list' class='options-ul'>
                <li class='options-li' id='tbl-new-entry'>New Entry</li>
                <li class='options-li' id='tbl-add-column'>Add Column</li>
            </ul>
        </div>
        <div id='tbl-display-content'>";
        $Table->DisplayTable();
print "</div></div>"; */
?>
<div id='hover-test'>
</div>
</main>
</body>
</html>
