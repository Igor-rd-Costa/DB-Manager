<?php
include_once "../Classes/User.php";

if(isset($_POST["FormMode"])) {    
    session_start();
    $User = $_SESSION["User"];
    $BackTo = "";
    $ButtonID = "";
    $ButtonLabel = "Submit";
    switch ($_POST["FormMode"]) {
        case 0: { // create new table
            if($User->CheckTableName($_POST['TableName'])) {
                print "[Request Error] A table with this name already exists in your database!";
                return;
            }
            $ButtonID = "create-table";
            $BackTo = "main";
        } break;
        case 1: { // add column
            $_SESSION["InsertColumn"]["InsertOption"] = $_POST["InsertOption"];
            $_SESSION["InsertColumn"]["ColumnName"] = $_POST["ColumnName"];
            $ButtonID = "insert-column";
            $BackTo = $_SESSION["DisplayedTable"];
        } break;
        case 2: { // alter columns
            $_SESSION["AlterColumn"] = $_POST["ColumnName"];
            $ButtonID = "alter-column";
            $ButtonLabel = "Alter";
            $BackTo = $_SESSION["DisplayedTable"];
        }
    }
print
"<div id='tbl-structure-menu' class='default-menu'>
    <div id='back-icon' backto='$BackTo'>
        <img class='back-arrow' src='img/Arrow.png'></img>
    </div>
    <div id='title'>Column Structure</div>";
if(isset($_POST["TableName"])) {
print   
    "<div class='add-icon-wrapper' id='add-columns'>
        <img class='add-icon' src='img/Add.png'></img>
    </div>";
}
print 
"</div>
<div id='structure-form-wrapper'>
    <form id='table-structure' method='post'>
        <div id='table-wrapper' style='overflow: scroll;'>
            <table id='structure-table'>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Length/Values</th>
                    <th>Default</th>
                    <th>Attributes</th>
                    <th>Null</th>";
if ($_POST["FormMode"] != 2) { 
print               "<th>Index</th>"; 
}
print               "<th>A_I</th>
                    <th>Comments</th>
                </tr>";
for($i = 0; $i < $_POST["NumberOfColumns"]; $i++) {
print           
                "<tr class='tableStructureRow'>
                    <td>
                        <input name='Entry_Name' class='tbl-str-field Entry_Name' type='text'/>
                    </td>
                    <td>
                        <select name='Entry_Type' class='Entry_Type'>
                            <option>INT</option>
                            <option>VARCHAR</option>
                        </select>
                    </td>
                    <td>
                        <input name='Entry_LenVal' class='tbl-str-field Entry_LenVal' type='text'/>
                    </td>
                    <td>
                        <select name='Entry_Default' class='tbl-str-field Entry_Default'>
                            <option>None</option>
                            <option>NULL</option>
                        </select>
                    </td>
                    <td>
                        <select name='Entry_Attributes' class='tbl-str-field Entry_Attributes'>
                            <option></option>
                            <option>BINARY</option>
                            <option>UNSIGNED</option>
                            <option>UNSIGNED ZEROFILL</option>
                        </select>
                    </td>
                    <td>
                        <input name='Entry_Null' class='tbl-str-field Entry_Null' type='checkbox'/>
                    </td>";
if ($_POST["FormMode"] != 2) {
print                    
                    "<td>
                        <select name='Entry_Index' class='tbl-str-field Entry_Index'>
                            <option>---</option>
                            <option>PRIMARY</option>
                        </select>
                    </td>";
}
print 
                    "<td>
                        <input name='Entry_AI' class='tbl-str-field Entry_AI' type='checkbox'/>
                    </td>
                    <td>
                        <textarea name='Entry_Comments' class='tbl-str-field Entry_Comments' rows='1'></textarea>
                    </td>
                </tr>";
}
print       
            "</table>
        </div>
        <div id='structure-form-footer' class='form-footer'>";
if($_POST["FormMode"] == 0) {
print           
            "<label for='Table_Name'>Table Name</label>
            <input name='Table_Name' id='Table_Name'></input>";
}
print       
            "<button type='submit' id='$ButtonID' class='submit form-button'>$ButtonLabel</button>
        </div>
    </form>
</div>";
}
else header('location: ../../pages/main.php');
