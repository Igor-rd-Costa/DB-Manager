<?php
session_start();
session_unset();
try {
    include_once "Config.php";
    SQL_Connect(CONFIG_INFO::$ServerHostname, CONFIG_INFO::$ServerUser, CONFIG_INFO::$ServerPassword, CONFIG_INFO::$AdminDatabaseName);
}
catch(mysqli_sql_exception)
{
    CONFIG_InitialSetup();
}

if(isset($_GET['logoutRequest']))
{
    session_destroy();
    header("Location: http://localhost/BancodeDados/");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-'scale=1.0"/>
    <link rel="stylesheet" href="css/Index.css"/>
    <link rel="stylesheet" href="css/Forms.css"/>
    <link rel="stylesheet" href="css/LoginForm.css"/>
    <link rel="stylesheet" href="css/RegisterForm.css"/>
    <link rel="php" href="login.php"/>
    <script src="scripts/Functions.js"></script>
    <script src="scripts/IndexScript.js"></script>
    <script src="scripts/FormsScript.js"></script>
    <title>DB Manager</title>
</head>
<body>
<div id="form">
        <div id="form-header">
            <div id="back-icon" backto="login"><img class='back-arrow' src='img/Arrow.png'></img></div>
            <div id="menu-title">Login</div>
            <div id="close-menu">X</div>
        </div>
        <div id="formwrapper">
            <form id="login" method="post">
                <label for="username">Username</label>
                <input type="text" name="usernameLogin" id="username" class="form-input" required=""/>    
                <label for="password">Password</label>
                <input type="text" name="passwordLogin" id="password" class="form-input" required=""/>
                <p id="error-msg"></p>
                <button type="submit" class="submit login form-button">Login</button>
                <button type="button" class="submit register form-button" id="button-register">Register</button>
            </form>

            <form id="register" method="post">
                <label for="firstname">First Name</label>
                <input type="text" name="firstnameRegister" id="reg-firstname" class="form-input" required=""/>
                <label for="lastname">Last Name</label>
                <input type="text" name="lastnameRegister" id="reg-lastname" class="form-input" required=""/>
                <label for="email">E-Mail</label>
                <input type="text" name="emailRegister" id="reg-email" class="form-input" required=""/>
                <label for="username">Username</label>
                <input type="text" name="usernameRegister" id="reg-username" class="form-input" required=""/>
                <label for="password">Password</label>
                <input type="text" name="passwordRegister" id="reg-password" class="form-input" required=""/>
                <p id="reg-error-msg">
                </p>
                <button type="submit" class="submit register form-button" id="register-button">Register</button>
            </form>
        </div>
</div>
<header id="header">
        <div id="loginwrapper">
            <img id="login-img" src="img/User.png" alt="Login"/>
        </div>
</header>
<main>
<div id="main-text-wrapper">
    <span class="large-font" id="main-text">DB Manager</span>
    <br/>
    <div id="sub-main-text">
    <span class="small-font">Small Placeholder</span>
    </div>
</div>
<div id="secondary-text-wrapper">
    <span class="large-font" id="secondary-text">Placeholder</span>
    <br/>
    <div id="sub-secondary-text">
    <span class="small-font">Small Placeholder</span>
    </div>
</div>
</main>
<?php
?>
</body>
</html>