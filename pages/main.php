<?php 
include "../php/Functions.php";
include "../php/Classes/User.php";
session_start(); 
if(!$_SESSION['login'])
{
    header('Location: http://localhost/BancodeDados/');
}
$User = $_SESSION['user'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <script src="../scripts/functions.js"></script>
    <script src="../scripts/script.js"></script>
    <script src="../scripts/FormsScript.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="outsidewrapper">
        <div id="gradient"></div>
        <div id="header">
            <div id="filler"></div>
            <div id="profilewrapper">
                <span id="username"><?php echo $User->Username  ?></span>
                <img id="user-img" src="../img/User.png" alt="Profile"/>
                <div id="pr-options">
                    
                        <ul id="pr-option-list">
                            <li><a href="../?logoutRequest=true">Logout</a></li>
                        </ul>    
                    </div>
            </div>
        </div>
            <div id="side-menu">
            <?php
        ?>
        </div>
        <div id="dbwrapper">
            <div id="addDB">
                <div id="horz-line"></div><div id="vert-line"></div>
            </div>
            <div class="database" id="database1"></div>
            <div class="database" id="database2"></div>
            <div class="database" id="database3"></div>
            <div class="database" id="database4"></div>
            <div class="database" id="database5"></div>
            <div class="database" id="database6"></div>
            <div class="database" id="database7"></div>
        </div>
    </div>
    <div id="form">
        <div id="form-header">
            <div id="menu-title"></div>
            <div id="close-menu">
                <span id="x">X</span>
            </div>
        </div>
        <div id="formwrapper">
            
        </div>
    </div>
    </body>
</html>