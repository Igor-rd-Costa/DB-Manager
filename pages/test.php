<?php
include_once "../config.php";
include_once "../php/Functions.php";
include_once "../php/Classes/User.php";

session_start();
$User = $_SESSION["User"];

if($User->Username != CONFIG_INFO::$AdminUsername) {
    header("location: main.php");
}

$User->Connect();
$User->FetchTables();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="../css/Main.css"/>
    <link rel="stylesheet" href="../css/Forms.css"/>
    <link rel="stylesheet" href="../css/NewEntryForm.css"/>
    <link rel="stylesheet" href="../css/CreateTableForm.css"/>
    <link rel="stylesheet" href="../css/AddColumnForm.css"/>
    <link rel="stylesheet" href="../css/TableDisplay.css"/>
    <link rel="stylesheet" href="../css/TableStructureForm.css"/>
    <script src="../scripts/functions.js"></script>
    <script src="../scripts/script.js"></script>
    <script src="../scripts/FormsScript.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Page</title>
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
            color: var(--HighlightTextColor);
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
           
        })
    </script>
</head>
<body>
<div id="form">
        <div id="form-header">
            <div id="menu-title">Insert Column</div>
            <div id="close-menu">X</div>
        </div>
        <div id="formwrapper">
        <form id="create-table" method="post">
            <label for="table-name">Table Name</label>
            <input type="text" name="table-name" id="table-name" required=""/>
            <label for="column-amount">Number of columns</label>
            <input type="number" name="column-amount" id="column-amount" required=""/>
            <button type="submit" class="submit create form-button">Create</button>
        </form>
        <form id="add-columns" method="post">
            <label for="columns">Number of columns</label>
            <input type="number" name="columns" id="columns" required=""/>
            <button type="submit" class="submit create form-button">Add</button>
        </form>
        <form id="insert-columns" method="post">
            <span>Insert</span>
            <input id="amount-of-columns" type="number"></input>
            <span>Columns</span>
            <select id="insert-option">
                <option>Last</option>
                <option>First</option>
                <option>After:</option>
            </select>
            <select id="table-columns" disabled></select>
            <button type="submit" class="submit form-button" id="insert-column-button">Go</button>
        </form>
        </div>
    </div>
<header id="header">
</header>
<section id="side-menu">
</section>
<main id="tablewrapper" class="testPage">
    <div id='default-menu'></div>
    <div id='test-wrapper'>
        <?php
        $Table = $User->Tables["products"];
        $Table->Test($User->Connection);
        ?>
    </div>   
</main>
</body>
</html>
